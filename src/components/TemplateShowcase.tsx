import { useState } from "react"
import { AnimatedSection } from "./AnimatedSection"
import { ShoppingCart, Star, ExternalLink, FileText, Plus, Minus, Clock, Zap } from "lucide-react"
import { Link } from "react-router-dom"

interface Template {
    id: string
    name: string
    description: string
    price: number
    rating: number
    image: string
    category: string
    demoUrl: string
}

const templates: Template[] = [
    {
        id: "1",
        name: "Corporate Website",
        description: "Professional company representation with brand identity and services showcase",
        price: 299,
        rating: 5,
        image: "https://unsplash.com/photos/turned-on-macbook-pro-beside-gray-mug-Px3iBXV-4TU",
        category: "Business",
        demoUrl: "#demo-corporate",
    },
    {
        id: "2",
        name: "E-Commerce Store",
        description: "Complete online store with product catalogs and payment integration",
        price: 499,
        rating: 5,
        image: "/placeholder.svg?height=200&width=350&text=E-Commerce+Store",
        category: "E-commerce",
        demoUrl: "#demo-ecommerce",
    },
    {
        id: "3",
        name: "Portfolio Website",
        description: "Creative showcase for artists, designers, and professionals",
        price: 199,
        rating: 4,
        image: "/placeholder.svg?height=200&width=350&text=Portfolio+Website",
        category: "Portfolio",
        demoUrl: "#demo-portfolio",
    },
    {
        id: "5",
        name: "Real Estate Website",
        description: "Property listings with advanced search and filter functionality",
        price: 599,
        rating: 5,
        image: "/placeholder.svg?height=200&width=350&text=Real+Estate+Website",
        category: "Real Estate",
        demoUrl: "#demo-realestate",
    },
    {
        id: "6",
        name: "Healthcare Website",
        description: "Medical practice with appointment booking and patient portal",
        price: 449,
        rating: 4,
        image: "/placeholder.svg?height=200&width=350&text=Healthcare+Website",
        category: "Healthcare",
        demoUrl: "#demo-healthcare",
    },
]

const TemplateShowcase = () => {
    const [cart, setCart] = useState<{ [key: string]: number }>({})

    const addToCart = (templateId: string) => {
        setCart((prev) => ({ ...prev, [templateId]: (prev[templateId] || 0) + 1 }))
    }

    const removeFromCart = (templateId: string) => {
        setCart((prev) => {
            const newCart = { ...prev }
            if (newCart[templateId] > 1) {
                newCart[templateId]--
            } else {
                delete newCart[templateId]
            }
            return newCart
        })
    }

    const getTotal = () => {
        return Object.entries(cart).reduce((total, [id, quantity]) => {
            const template = templates.find((t) => t.id === id)
            return total + (template?.price || 0) * quantity
        }, 0)
    }

    const generateTicket = () => {
        const cartItems = Object.entries(cart).map(([id, quantity]) => {
            const template = templates.find((t) => t.id === id)
            return { template, quantity }
        })

        console.log("Generating ticket for templates:", cartItems)
        alert("Template ticket generated! Our team will customize your selected templates and contact you shortly.")
        setCart({}) // Clear cart after generating ticket
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
        ))
    }

    return (
        <section id="templates" className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <AnimatedSection animation="fade-up" className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-6">Professional Website Templates</h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Choose from our collection of professionally designed templates. Each template is fully customizable .
                    </p>
                </AnimatedSection>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Templates Grid */}
                    <div className="lg:col-span-3">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {templates.map((template, index) => (
                                <AnimatedSection key={template.id} animation="fade-up" delay={index * 50}>
                                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                                        {/* Template Image */}
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={template.image || "/placeholder.svg"}
                                                alt={template.name}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                                                    {template.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Template Info */}
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{template.name}</h3>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>

                                            {/* Rating */}
                                            <div className="flex items-center mb-3">
                                                <div className="flex items-center space-x-1">{renderStars(template.rating)}</div>
                                                <span className="ml-2 text-sm text-gray-500">({template.rating}.0)</span>
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-xl font-bold text-gray-900">${template.price}</span>
                                                <span className="text-sm text-gray-500">One-time</span>
                                            </div>

                                            {/* Buttons */}
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => window.open(template.demoUrl, "_blank")}
                                                    className="w-full border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-3 rounded font-medium transition-all duration-200 flex items-center justify-center text-sm"
                                                >
                                                    <ExternalLink className="h-4 w-4 mr-1" />
                                                    Live Demo
                                                </button>

                                                <div className="flex items-center space-x-2">
                                                    {cart[template.id] ? (
                                                        <>
                                                            <button
                                                                onClick={() => removeFromCart(template.id)}
                                                                className="border border-gray-300 text-gray-600 hover:bg-gray-100 p-2 rounded flex-shrink-0"
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </button>
                                                            <span className="text-center font-medium text-gray-900 min-w-[2rem]">
                                                                {cart[template.id]}
                                                            </span>
                                                            <button
                                                                onClick={() => addToCart(template.id)}
                                                                className="border border-gray-300 text-gray-600 hover:bg-gray-100 p-2 rounded flex-shrink-0"
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button
                                                            onClick={() => addToCart(template.id)}
                                                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded font-medium transition-all duration-200 flex items-center justify-center text-sm"
                                                        >
                                                            <ShoppingCart className="h-4 w-4 mr-1" />
                                                            Add to Cart
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>

                    {/* Cart Section */}
                    <div className="lg:col-span-1">
                        <AnimatedSection animation="slide-left" delay={300}>
                            <div className="sticky top-24 bg-gray-800 border border-gray-700 rounded-lg">
                                <div className="p-6">
                                    <h3 className="flex items-center text-white text-lg font-semibold mb-4">
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Template Cart
                                    </h3>
                                    {Object.keys(cart).length === 0 ? (
                                        <div className="text-center py-8">
                                            <ShoppingCart className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                                            <p className="text-gray-400">No templates selected</p>
                                            <p className="text-gray-500 text-sm mt-2">Add templates to get started</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-4 mb-4">
                                                {Object.entries(cart).map(([id, quantity]) => {
                                                    const template = templates.find((t) => t.id === id)
                                                    if (!template) return null
                                                    return (
                                                        <div key={id} className="flex justify-between items-center">
                                                            <div className="flex-1">
                                                                <p className="font-medium text-white text-sm">{template.name}</p>
                                                                <p className="text-xs text-gray-400">
                                                                    {template.category} • Qty: {quantity}
                                                                </p>
                                                            </div>
                                                            <p className="font-bold text-blue-400">${template.price * quantity}</p>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <hr className="border-gray-600 my-4" />
                                            <div className="flex justify-between items-center text-lg font-bold mb-6">
                                                <span className="text-white">Total:</span>
                                                <span className="text-blue-400">${getTotal()}</span>
                                            </div>
                                            <button
                                                className="w-full bg-blue-500 hover:bg-blue-600 text-black py-3 px-4 rounded font-medium flex items-center justify-center transition-all duration-200"
                                                onClick={generateTicket}
                                            >
                                                <FileText className="mr-2 h-5 w-5" />
                                                Generate Ticket
                                            </button>
                                            <p className="text-xs text-gray-400 mt-3 text-center">
                                                Our team will customize your templates and contact you within 24 hours
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </AnimatedSection>
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