import { ShoppingCart, Send, X } from "lucide-react"
import { Loader2 } from "lucide-react"
import { Cart } from "../../types/cart-type"

interface CartSectionProps {
    cart: Cart | null
    getCartItemCount: () => number
    getCartTotal: () => number
    cartLoading: boolean
    handleRemoveFromCart: (templateId: string) => void
    setShowTicketModal: (show: boolean) => void
    isTemplateLoading: (templateId: string) => boolean
    mobile?: boolean
}

const CartSection = ({
    cart,
    getCartItemCount,
    getCartTotal,
    cartLoading,
    handleRemoveFromCart,
    setShowTicketModal,
    isTemplateLoading,
    mobile = false
}: CartSectionProps) => {
    if (mobile) {
        return (
            <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="flex items-center text-white text-lg font-semibold">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Cart ({getCartItemCount()}){cartLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    </h3>
                    <span className="text-blue-400 font-bold">${getCartTotal()}</span>
                </div>

                {getCartItemCount() === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-2">No templates selected</p>
                ) : (
                    <>
                        <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
                            {cart?.templates.map((template) => (
                                <div
                                    key={template.id}
                                    className="flex justify-between items-center bg-gray-700 p-2 rounded text-sm"
                                >
                                    <span className="text-white truncate flex-1">{template.title}</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-blue-400 font-medium">${template.price}</span>
                                        <button
                                            onClick={() => handleRemoveFromCart(template.id)}
                                            className="text-red-400 hover:text-red-300 p-1"
                                            disabled={isTemplateLoading(template.id)}
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium flex items-center justify-center transition-all duration-200 disabled:opacity-50"
                            onClick={() => setShowTicketModal(true)}
                            disabled={cartLoading}
                        >
                            {cartLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="mr-2 h-4 w-4" />
                            )}
                            Create Ticket
                        </button>
                    </>
                )}
            </div>
        )
    }

    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
            <h3 className="flex items-center text-white text-lg font-semibold mb-4">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Cart ({getCartItemCount()}){cartLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </h3>

            {getCartItemCount() === 0 ? (
                <div className="text-center py-6">
                    <ShoppingCart className="h-10 w-10 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No templates selected</p>
                </div>
            ) : (
                <>
                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                        {cart?.templates.map((template) => (
                            <div
                                key={template.id}
                                className="flex justify-between items-center bg-gray-700 p-3 rounded text-sm"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-white truncate">{template.title}</p>
                                    <p className="text-xs text-gray-400">{template.category?.name || "Uncategorized"}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <p className="font-bold text-blue-400">${template.price}</p>
                                    <button
                                        onClick={() => handleRemoveFromCart(template.id)}
                                        className="text-red-400 hover:text-red-300 p-1"
                                        disabled={isTemplateLoading(template.id)}
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-600 pt-4">
                        <div className="flex justify-between items-center text-lg font-bold mb-4">
                            <span className="text-white">Total:</span>
                            <span className="text-blue-400">${getCartTotal()}</span>
                        </div>

                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded font-medium flex items-center justify-center transition-all duration-200 disabled:opacity-50"
                            onClick={() => setShowTicketModal(true)}
                            disabled={cartLoading}
                        >
                            {cartLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="mr-2 h-4 w-4" />
                            )}
                            Create Ticket
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default CartSection