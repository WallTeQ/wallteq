
import { Search } from "lucide-react"

interface EmptyStateProps {
    onClearFilters: () => void
}

export const EmptyState = ({ onClearFilters }: EmptyStateProps) => {
    return (
        <div className="text-center py-16">
            <div className="bg-gray-800 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No templates found</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
                We couldn't find any templates matching your criteria. Try adjusting your filters or search terms.
            </p>
            <button
                onClick={onClearFilters}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
                Clear All Filters
            </button>
        </div>
    )
}