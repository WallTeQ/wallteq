// components/MobileFilters.tsx
import { X, Search } from "lucide-react"
import { SortBy } from "../../data/template"
import { categories } from "../../data/template"

interface MobileFiltersProps {
    searchTerm: string
    selectedCategory: string
    sortBy: SortBy
    showMobileFilters: boolean
    onSearchChange: (value: string) => void
    onCategoryChange: (category: string) => void
    onSortChange: (sort: SortBy) => void
    onClose: () => void
    onClearFilters: () => void
}

export const MobileFilters = ({
    searchTerm,
    selectedCategory,
    sortBy,
    showMobileFilters,
    onSearchChange,
    onCategoryChange,
    onSortChange,
    onClose,
    onClearFilters,
}: MobileFiltersProps) => {
    if (!showMobileFilters) return null

    return (
        <div className="lg:hidden mb-6">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-semibold">Filters</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Quick Search */}
                <div className="mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
                        />
                    </div>
                </div>

                {/* Category Pills */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {categories.slice(0, 8).map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    onCategoryChange(category)
                                    if (category !== "All") onClose()
                                }}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    {categories.length > 8 && (
                        <button className="text-blue-400 text-sm mt-2 hover:text-blue-300">
                            Show all categories
                        </button>
                    )}
                </div>

                {/* Sort */}
                <div className="mb-4">
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as SortBy)}
                        className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400"
                    >
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                        <option value="rating">Sort by Rating</option>
                    </select>
                </div>

                <button
                    onClick={onClearFilters}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-colors"
                >
                    Clear All Filters
                </button>
            </div>
        </div>
    )
}