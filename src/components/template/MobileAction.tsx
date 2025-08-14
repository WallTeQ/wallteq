// components/MobileActionBar.tsx
import { Filter, ShoppingCart, ChevronDown } from "lucide-react"
import { Cart } from "../../data/template"

interface MobileActionBarProps {
    cart: Cart
    showMobileFilters: boolean
    onToggleFilters: () => void
    onToggleCart: () => void
}

export const MobileActionBar = ({
    cart,
    showMobileFilters,
    onToggleFilters,
    onToggleCart,
}: MobileActionBarProps) => {
    return (
        <div className="lg:hidden mb-6">
            <div className="flex space-x-3">
                <button
                    onClick={onToggleFilters}
                    className="flex-1 bg-gradient-to-r from-gray-800 to-gray-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 border border-gray-600"
                >
                    <Filter className="h-5 w-5" />
                    <span>Filters</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
                </button>
                <button
                    onClick={onToggleCart}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 shadow-lg"
                >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart ({Object.keys(cart).length})</span>
                </button>
            </div>
        </div>
    )
}