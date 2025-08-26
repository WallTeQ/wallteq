import { ExternalLink, ShoppingCart, Minus, Loader2 } from "lucide-react"
import { Template } from "../../types/template-type"

interface TemplateCardProps {
    template: Template
    isTemplateInCart: boolean
    isTemplateLoading: boolean
    handleAddToCart: (templateId: string) => void
    handleRemoveFromCart: (templateId: string) => void
    mobile?: boolean
}

const TemplateCard = ({
    template,
    isTemplateInCart,
    isTemplateLoading,
    handleAddToCart,
    handleRemoveFromCart,
    mobile = false
}: TemplateCardProps) => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors">
            {/* Template Image */}
            <div className="relative bg-gray-700 h-48">
                {template.media && template.media.length > 0 ? (
                    <img
                        src={template.media[0]?.fileUrl}
                        alt={template.media[0]?.fileName}
                        className="w-full h-48 object-cover"
                    />
                ) : (
                    <img
                        src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(template.title)}`}
                        alt={template.title}
                        className="w-full h-48 object-cover"
                    />
                )}
                <div className="absolute top-3 left-3">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {template?.category?.name || "Template"}
                    </span>
                </div>
            </div>

            {/* Template Info */}
            <div className="py-6 px-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">{template?.title}</h3>
                    <span className="text-lg font-bold text-blue-400">${template?.price}</span>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-2">{template?.description}</p>

                <div className="flex flex-col gap-3">
                    {template?.demoUrl && (
                        <a
                            href={template?.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full border-2 border-blue-500 text-white hover:bg-blue-500 hover:text-white py-2 px-3 rounded font-medium transition-all duration-200 flex items-center justify-center text-sm"
                        >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Live Demo
                        </a>
                    )}

                    {isTemplateInCart ? (
                        <button
                            onClick={() => handleRemoveFromCart(template.id)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded font-medium transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50"
                            disabled={isTemplateLoading}
                        >
                            {isTemplateLoading ? (
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
                            disabled={isTemplateLoading}
                        >
                            {isTemplateLoading ? (
                                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                                <ShoppingCart className="h-4 w-4 mr-1" />
                            )}
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TemplateCard