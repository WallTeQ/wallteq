import React from "react"
import { Search, Filter, Download, Plus } from "lucide-react"

interface ActionsBarProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    showFilters: boolean
    setShowFilters: (show: boolean) => void
    filterCategory: string
    setFilterCategory: (category: string) => void
    filterStatus: string
    setFilterStatus: (status: string) => void
    categories: any[]
    categoriesLoading: boolean
    navigate: (path: string) => void
}

const ActionsBar: React.FC<ActionsBarProps> = ({
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    filterCategory,
    setFilterCategory,
    filterStatus,
    setFilterStatus,
    categories,
    categoriesLoading,
    navigate
}) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <Filter className="h-4 w-4" />
                        <span>Filters</span>
                    </button>
                </div>

                <div className="flex items-center space-x-3">
                    
                    <button
                        onClick={() => navigate("/dashboard/templates/add")}
                        className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Add Template</span>
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                disabled={categoriesLoading}
                            >
                                <option value="all">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="all">All Status</option>
                                <option value="published">Published</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    setFilterCategory("all")
                                    setFilterStatus("all")
                                    setSearchTerm("")
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-900"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ActionsBar