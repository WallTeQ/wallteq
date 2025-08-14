// components/Filters.tsx
import { Filter, Search, Grid, List } from "lucide-react"
import { ViewMode, SortBy } from "../../data/template"
import { categories } from "../../data/template"

interface FiltersProps {
    searchTerm: string
    selectedCategory: string
    sortBy: SortBy
    viewMode: ViewMode
    onSearchChange: (value: string) => void
    onCategoryChange: (category: string) => void
    onSortChange: (sort: SortBy) => void
    onViewModeChange: (mode: ViewMode) => void
}

export const FiltersComponent = ({
    searchTerm,
    selectedCategory,
    sortBy,
    viewMode,
    onSearchChange,
    onCategoryChange,
    onSortChange,
    onViewModeChange,
}: FiltersProps) => {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 shadow-2xl">
            <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
                <Filter className="mr-3 h-5 w-5 text-blue-400" />
                Filters & Search
            </h3>

            {/* Search */}
            <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-3">Search Templates</label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search by name or tag..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-3">Categories</label>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`text-left px-3 py-2 rounded-lg transition-all font-medium text-sm ${selectedCategory === category
                                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                                : "text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sort */}
            <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-3">Sort By</label>
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value as SortBy)}
                    className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                >
                    <option value="name">Name (A-Z)</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="rating">Rating (High to Low)</option>
                </select>
            </div>

            {/* View Mode */}
            <div>
                <label className="block text-gray-300 text-sm font-medium mb-3">View Mode</label>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onViewModeChange("grid")}
                        className={`flex-1 p-3 rounded-lg font-medium transition-all ${viewMode === "grid"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                            : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
                            }`}
                    >
                        <Grid className="h-4 w-4 mx-auto" />
                    </button>
                    <button
                        onClick={() => onViewModeChange("list")}
                        className={`flex-1 p-3 rounded-lg font-medium transition-all ${viewMode === "list"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                            : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
                            }`}
                    >
                        <List className="h-4 w-4 mx-auto" />
                    </button>
                </div>
            </div>
        </div>
    )
}