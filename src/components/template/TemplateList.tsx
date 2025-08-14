// components/TemplateListItem.tsx
import { ShoppingCart, ExternalLink, Plus, Minus } from "lucide-react"
import { Template, Cart } from "../../data/template"
// import { StarRating } from "./StarRating"

interface TemplateListItemProps {
    template: Template
    cart: Cart
    onAddToCart: (templateId: string) => void
    onRemoveFromCart: (templateId: string) => void
}

export const TemplateListItem = ({ template, cart, onAddToCart, onRemoveFromCart }: TemplateListItemProps) => {
    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-200">
            <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-64 h-48 sm:h-40 flex-shrink-0">
                    <img
                        src={template.image}
                        alt={template.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                {template.name}
                            </h3>
                            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                {template.category}
                            </span>
                        </div>
                        {/* <div className="flex items-center space-x-1 mt-2 sm:mt-0">
                            <StarRating rating={template.rating} showNumber />
                        </div> */}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {template.description}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            ${template.price}
                        </span>

                        <div className="flex space-x-2">
                            <button
                                onClick={() => window.open(template.demoUrl, "_blank")}
                                className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center"
                            >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Preview
                            </button>

                            {cart[template.id] ? (
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => onRemoveFromCart(template.id)}
                                        className="border-2 border-gray-300 text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="text-center font-bold text-gray-900 min-w-[2rem]">
                                        {cart[template.id]}
                                    </span>
                                    <button
                                        onClick={() => onAddToCart(template.id)}
                                        className="border-2 border-gray-300 text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => onAddToCart(template.id)}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    <ShoppingCart className="h-4 w-4 mr-1" />
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}