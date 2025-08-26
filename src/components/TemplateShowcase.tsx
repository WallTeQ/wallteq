import { useEffect, useState } from "react"
import { AnimatedSection } from "./AnimatedSection"
import { ShoppingCart, Star, ExternalLink, Minus, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Template } from "../types/template-type"
import { useCart } from "../hook/useCart"
import { useTemplates } from "../hook/useTemplate"
import { useAuth } from "../contexts/AuthContext"
import Loader from "./Loader"
import { toast } from "react-toastify"

const TemplateShowcase = () => {
    const { user } = useAuth()
    const { templates, loading: templatesLoading, error: templatesError, fetchPublishedTemplates } = useTemplates()
    const {
        cart,
        loading: cartLoading,
        error: cartError,
        addTemplateToCart,
        removeFromCart,
        isTemplateInCart,
    } = useCart()

    const userId = user?.id || ""
    // Add state to track loading for each template
    const [templateLoadingStates, setTemplateLoadingStates] = useState<Record<string, boolean>>({})

    // Fetch published templates on mount
    useEffect(() => {
        fetchPublishedTemplates()
    }, [])

    const handleAddToCart = async (templateId: string) => {
        if (!userId) {
            toast.error("Please log in to add templates to cart", {
                position: "top-right",
            })
            return
        }

        // Set loading state for this specific template
        setTemplateLoadingStates(prev => ({ ...prev, [templateId]: true }))

        try {
            const success = await addTemplateToCart(templateId, userId)
            if (success) {
                toast.success("Template added to cart successfully", {
                    position: "top-right",
                })
            }
        } catch (error) {
            console.error("Failed to add to cart:", error)
        } finally {
            // Clear loading state for this template
            setTemplateLoadingStates(prev => ({ ...prev, [templateId]: false }))
        }
    }

    const handleRemoveFromCart = async (templateId: string) => {
        // Set loading state for this specific template
        setTemplateLoadingStates(prev => ({ ...prev, [templateId]: true }))

        try {
            const success = await removeFromCart(templateId)
            if (success) {
                toast.success("Template removed from cart successfully", {
                    position: "top-right",
                })
            }
        } catch (error) {
            console.error("Failed to remove from cart:", error)
        } finally {
            // Clear loading state for this template
            setTemplateLoadingStates(prev => ({ ...prev, [templateId]: false }))
        }
    }

    // Helper function to check if a template is loading
    const isTemplateLoading = (templateId: string) => {
        return templateLoadingStates[templateId] || false
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
        ))
    }

    if (templatesLoading) {
        return <Loader />
    }

    return (
        <section id="templates" className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <AnimatedSection animation="fade-up" className="text-center mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Professional Website Templates</h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Choose from our collection of professionally designed templates. Each template is fully customizable.
                    </p>
                </AnimatedSection>

                <div className="">
                    {/* Templates Grid */}
                    <div className="">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {templates.slice(0, 4).map((template, index) => {
                                const isLoading = isTemplateLoading(template.id)

                                return (
                                    <AnimatedSection key={template.id} animation="fade-up" delay={index * 30}>
                                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                            <div className="relative overflow-hidden bg-gray-100">
                                                {template.media && template.media.length > 0 ? (
                                                    <img
                                                        src={template.media[0].fileUrl}
                                                        alt={template.media[0].fileName}
                                                        className="w-full h-48 "
                                                    />
                                                ) : (
                                                    <img
                                                        src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(template.title)}`}
                                                        alt={template.title}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                )}
                                                <div className="absolute top-2 left-2">
                                                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                                                        {template.category?.name || "Template"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <h3 className="text-base font-semibold text-gray-900 mb-2">{template.title}</h3>
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>

                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-lg font-bold text-gray-900">${template.price}</span>
                                                    <a
                                                        href={template.demoUrl}
                                                        className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-1 px-3 rounded text-sm transition-all duration-200 flex items-center"
                                                    >
                                                        <ExternalLink className="h-3 w-3 mr-1" />
                                                        Demo
                                                    </a>
                                                </div>

                                                {isTemplateInCart(template.id) ? (
                                                    <button
                                                        onClick={() => handleRemoveFromCart(template.id)}
                                                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded font-medium transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? (
                                                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                                        ) : (
                                                            <Minus className="h-4 w-4 mr-1" />
                                                        )}
                                                        Remove from Cart
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleAddToCart(template.id)}
                                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded font-medium transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? (
                                                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                                        ) : (
                                                            <ShoppingCart className="h-4 w-4 mr-1" />
                                                        )}
                                                        Add to Cart
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <AnimatedSection animation="fade-up" delay={500} className="text-center mt-16">
                    <Link to="/templates" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 transition-all duration-300 hover:scale-105 rounded-md">
                        View All Templates
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    )
}

export default TemplateShowcase