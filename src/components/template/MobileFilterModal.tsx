import { Search, ChevronDown } from "lucide-react"
import { Category } from "../../types/category-type"

interface MobileFiltersProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedCategory: string
    setSelectedCategory: (category: string) => void
    sortBy: string
    setSortBy: (sort: string) => void
    apiCategories: Category[]
    clearAllFilters: () => void
}

const MobileFilters = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    apiCategories,
    clearAllFilters
}: MobileFiltersProps) => {
    return (
        <div className="lg:hidden mb-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-semibold">Filters</h3>
            </div>

            {/* Content */}
            <div className="space-y-4">
                {/* Search */}
                <div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-blue-400"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <label className="block text-white text-sm font-medium mb-2">Categories</label>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === "All"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                        >
                            All
                        </button>
                        {apiCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`px-3 capitalize py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.name
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort By */}
                <div>
                    <label className="block text-white text-sm font-medium mb-2">Sort By</label>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded appearance-none focus:outline-none focus:border-blue-400 pr-10"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="price">Sort by Price</option>
                            <option value="category">Sort by Category</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                    </div>
                </div>

                {/* Clear Filters Button */}
                <button
                    onClick={clearAllFilters}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded font-medium transition-colors"
                >
                    Clear All Filters
                </button>
            </div>
        </div>
    )
}

export default MobileFilters