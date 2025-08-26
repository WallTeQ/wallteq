import { Search } from "lucide-react"
import { Category } from "../../types/category-type"

interface FiltersSectionProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedCategory: string
    setSelectedCategory: (category: string) => void
    apiCategories: Category[]
}

const FiltersSection = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    apiCategories
}: FiltersSectionProps) => {
    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-6">Filters</h3>

            {/* Search */}
            <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-2">Search</label>
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
            <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-3">Categories</label>
                <div className="space-y-1">
                    {apiCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`w-full capitalize text-left px-3 py-2 rounded transition-colors text-sm ${selectedCategory === category.name
                                ? "bg-blue-600 text-white"
                                : "text-gray-400 hover:text-white hover:bg-gray-700"
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FiltersSection