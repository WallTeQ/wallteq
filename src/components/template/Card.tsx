// components/TemplateCard.tsx
import { ShoppingCart, ExternalLink, Plus, Minus } from "lucide-react"
import { Template, Cart } from "../../data/template"
// import { StarRating } from "./StarRating"

interface TemplateCardProps {
    template: Template
    cart: Cart
    onAddToCart: (templateId: string) => void
    onRemoveFromCart: (templateId: string) => void
}

export const TemplateCard = ({ template, cart, onAddToCart, onRemoveFromCart }: TemplateCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group border border-gray-200">
            <div className="relative overflow-hidden h-48">
                <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        {template.category}
                    </span>
                </div>
                {/* <div className="absolute top-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                        <StarRating rating={template.rating} />
                    </div>
                </div> */}
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {template.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {template.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        ${template.price}
                    </span>
                    {/* <div className="flex items-center space-x-1">
                        <StarRating rating={template.rating} showNumber />
                    </div> */}
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => window.open(template.demoUrl, "_blank")}
                        className="w-full border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                    >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Preview
                    </button>

                    <div className="flex items-center space-x-2">
                        {cart[template.id] ? (
                            <div className="flex items-center space-x-3 w-full">
                                <button
                                    onClick={() => onRemoveFromCart(template.id)}
                                    className="border-2 border-gray-300 text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors flex-shrink-0"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="text-center font-bold text-gray-900 min-w-[3rem] text-lg">
                                    {cart[template.id]}
                                </span>
                                <button
                                    onClick={() => onAddToCart(template.id)}
                                    className="border-2 border-gray-300 text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors flex-shrink-0"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => onAddToCart(template.id)}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}