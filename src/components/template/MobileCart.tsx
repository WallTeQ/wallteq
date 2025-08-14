// components/MobileCart.tsx
import { X } from "lucide-react"
import { Cart } from "../../data/template"
import { ShoppingCartComponent } from "./ShoppingCart"

interface MobileCartProps {
    cart: Cart
    showMobileCart: boolean
    onAddToCart: (templateId: string) => void
    onRemoveFromCart: (templateId: string) => void
    onGenerateTicket: () => void
    onClose: () => void
}

export const MobileCart = ({
    cart,
    showMobileCart,
    onAddToCart,
    onRemoveFromCart,
    onGenerateTicket,
    onClose,
}: MobileCartProps) => {
    if (!showMobileCart) return null

    return (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50 pt-16" onClick={onClose}>
            <div className="bg-gray-900 h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white text-lg font-semibold">Your Cart</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <ShoppingCartComponent
                        cart={cart}
                        onAddToCart={onAddToCart}
                        onRemoveFromCart={onRemoveFromCart}
                        onGenerateTicket={onGenerateTicket}
                    />
                </div>
            </div>
        </div>
    )
}