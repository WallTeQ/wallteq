// components/ShoppingCart.tsx
import { ShoppingCart, Plus, Minus, FileText } from "lucide-react"
import { Cart, Template } from "../../data/template"
import { templates } from "../../data/template"

interface ShoppingCartProps {
    cart: Cart
    onAddToCart: (templateId: string) => void
    onRemoveFromCart: (templateId: string) => void
    onGenerateTicket: () => void
}

export const ShoppingCartComponent = ({
    cart,
    onAddToCart,
    onRemoveFromCart,
    onGenerateTicket
}: ShoppingCartProps) => {
    const getTotal = () => {
        return Object.entries(cart).reduce((total, [id, quantity]) => {
            const template = templates.find((t) => t.id === id)
            return total + (template?.price || 0) * quantity
        }, 0)
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 shadow-2xl">
            <h3 className="flex items-center text-white text-lg font-semibold mb-6">
                <ShoppingCart className="mr-3 h-5 w-5 text-blue-400" />
                Template Cart
                <span className="ml-2 bg-blue-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                    {Object.keys(cart).length}
                </span>
            </h3>

            {Object.keys(cart).length === 0 ? (
                <div className="text-center py-8">
                    <div className="bg-gray-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <ShoppingCart className="h-8 w-8 text-gray-500" />
                    </div>
                    <p className="text-gray-300 font-medium mb-2">Your cart is empty</p>
                    <p className="text-gray-500 text-sm">Add templates to get started</p>
                </div>
            ) : (
                <>
                    <div className="space-y-3 mb-6 max-h-64 overflow-y-auto custom-scrollbar">
                        {Object.entries(cart).map(([id, quantity]) => {
                            const template = templates.find((t) => t.id === id)
                            if (!template) return null
                            return (
                                <div key={id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-medium text-white text-sm leading-tight">{template.name}</h4>
                                        <span className="text-blue-400 font-bold text-sm">${template.price * quantity}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                                            {template.category}
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => onRemoveFromCart(template.id)}
                                                className="bg-gray-700 hover:bg-gray-600 text-gray-300 p-1 rounded transition-colors"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="text-white font-medium min-w-[1.5rem] text-center text-sm">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() => onAddToCart(template.id)}
                                                className="bg-gray-700 hover:bg-gray-600 text-gray-300 p-1 rounded transition-colors"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="border-t border-gray-700 pt-6">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-300 text-lg">Total:</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                ${getTotal()}
                            </span>
                        </div>

                        <button
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-200 mb-4 shadow-lg hover:shadow-xl transform hover:scale-105"
                            onClick={onGenerateTicket}
                        >
                            <FileText className="mr-2 h-5 w-5" />
                            Generate Ticket
                        </button>

                        <p className="text-xs text-gray-400 text-center leading-relaxed">
                            Our team will customize your templates and contact you within 24 hours
                        </p>
                    </div>
                </>
            )}
        </div>
    )
}