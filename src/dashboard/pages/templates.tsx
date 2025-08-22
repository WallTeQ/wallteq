// import { Header } from "@/components/dashboard/header"
import { useEffect, useState } from "react"
import { Search, Filter, Download, Plus, Edit, Trash2, Eye, Star, Package, TrendingUp, CheckCircle } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useTemplates } from "../../hook/useTemplate"
import { useCategories } from "../../hook/useCategories"
import Loader from "../../components/Loader"


interface Template {
    id: string
    title: string
    description: string
    price: number
    status: "pending" | "published" | "rejected"
    media?: Array<{
        id: string
        fileName: string
        fileUrl: string
        mimeType: string
        fileSize: number
    }>
    categoryId: string
    category?: {
        id: string
        name: string
    }
    user?: {
        id: string
        name: string
        email: string
    }
    demoUrl?: string
    publishedAt?: string
    createdAt: string
    updatedAt: string
}

const TemplatesPage = () => {
    const navigate = useNavigate()
    const { templates, loading, error, fetchTemplates, publishTemplate, deleteTemplate, fetchTemplateMedia } = useTemplates()
    const { categories, loading: categoriesLoading, fetchCategories } = useCategories()

    const [searchTerm, setSearchTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState<string>("all")
    const [filterStatus, setFilterStatus] = useState<string>("all")
    const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])
    const [showFilters, setShowFilters] = useState(false)
    const [publishingTemplates, setPublishingTemplates] = useState<Set<string>>(new Set())
    const [showConfirmDialog, setShowConfirmDialog] = useState<string | null>(null)

    // Fetch data on mount
    useEffect(() => {
        fetchTemplates()
        fetchCategories()
    }, [])

    const filteredTemplates = templates.filter((template) => {
        const matchesSearch =
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = filterCategory === "all" || template.category?.id === filterCategory
    const matchesStatus = filterStatus === "all" || template.status === filterStatus.toUpperCase()

        return matchesSearch && matchesCategory && matchesStatus
    })

    const handleSelectTemplate = (templateId: string) => {
        setSelectedTemplates((prev) =>
            prev.includes(templateId) ? prev.filter((id) => id !== templateId) : [...prev, templateId],
        )
    }

    const handleSelectAll = () => {
        setSelectedTemplates(
            selectedTemplates.length === filteredTemplates.length ? [] : filteredTemplates.map((template) => template.id),
        )
    }

    const handlePublishTemplate = async (templateId: string) => {
        setPublishingTemplates((prev) => new Set(prev).add(templateId))

        try {
            const success = await publishTemplate(templateId)
            if (success) {
                console.log("✅ Template published successfully")
                // Refresh templates to get updated data
                await fetchTemplates()
            }
        } catch (error) {
            console.error("❌ Failed to publish template:", error)
        } finally {
            setPublishingTemplates((prev) => {
                const newSet = new Set(prev)
                newSet.delete(templateId)
                return newSet
            })
            setShowConfirmDialog(null)
        }
    }

    const handleDeleteTemplate = async (templateId: string) => {
        if (window.confirm("Are you sure you want to delete this template? This action cannot be undone.")) {
            const success = await deleteTemplate(templateId)
            if (success) {
                console.log("✅ Template deleted successfully")
                // Remove from selected templates if it was selected
                setSelectedTemplates((prev) => prev.filter((id) => id !== templateId))
            }
        }
    }

    const getStatusBadge = (status: string) => {
        const styles = {
            published: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            rejected: "bg-red-100 text-red-800",
        }
        return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800"
    }

    const getStatusCounts = () => {
        return {
            total: templates.length,
            published: templates.filter((t) => t.status === "published").length,
            pending: templates.filter((t) => t.status === "pending").length,
            rejected: templates.filter((t) => t.status === "rejected").length,
        }
    }

    const statusCounts = getStatusCounts()

    if (loading && templates.length === 0) {
       <Loader />
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-800 mb-4">{error}</p>
                    <button
                        onClick={() => fetchTemplates()}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Templates</p>
                            <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
                        </div>
                        <Package className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Published</p>
                            <p className="text-2xl font-bold text-gray-900">{statusCounts.published}</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-gray-900">{statusCounts.pending}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Rejected</p>
                            <p className="text-2xl font-bold text-gray-900">{statusCounts.rejected}</p>
                        </div>
                        <Star className="h-8 w-8 text-red-500" />
                    </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
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
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                        </button>
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

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                        <div
                            key={template.id}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="relative">
                                {template.media && template.media.length > 0 ? (
                                    <img
                                        src={template.media[0].fileUrl}
                                        alt={template.media[0].fileName}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <img
                                        src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(template.title)}`}
                                        alt={template.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="absolute top-2 left-2">
                                    <span
                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(template.status)}`}
                                    >
                                        {template.status}
                                    </span>
                                </div>
                                <div className="absolute top-2 right-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedTemplates.includes(template.id)}
                                        onChange={() => handleSelectTemplate(template.id)}
                                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>

                        <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">{template.title}</h3>
                                <span className="text-lg font-bold text-emerald-600">${template.price}</span>
                            </div>

                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.description}</p>

                            <div className="flex items-center mb-3 text-sm text-gray-500">
                                <span className="truncate">
                                    {template.category?.name || "Uncategorized"} • by {template.user?.name || "Unknown"}
                                </span>
                            </div>

                            <div className="text-xs text-gray-500 mb-4">
                                <p>Created: {new Date(template.createdAt).toLocaleDateString()}</p>
                                {template.publishedAt && <p>Published: {new Date(template.publishedAt).toLocaleDateString()}</p>}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => {
                                            // Navigate to template detail view
                                            console.log("View template:", template.id)
                                        }}
                                        className="p-1 text-gray-400 hover:text-gray-600"
                                        title="View Details"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            // Navigate to edit template
                                            console.log("Edit template:", template.id)
                                        }}
                                        className="p-1 text-gray-400 hover:text-gray-600"
                                        title="Edit Template"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTemplate(template.id)}
                                        className="p-1 text-gray-400 hover:text-red-600"
                                        title="Delete Template"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Publish Button for Pending Templates */}
                                {template.status === "pending" && (
                                    <button
                                        onClick={() => setShowConfirmDialog(template.id)}
                                        disabled={publishingTemplates.has(template.id)}
                                        className="flex items-center space-x-1 px-3 py-1 bg-black text-white text-sm rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {publishingTemplates.has(template.id) ? (
                                            <>
                                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                                <span>Publishing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="h-3 w-3" />
                                                <span>Publish</span>
                                            </>
                                        )}
                                    </button>
                                )}

                                {/* Demo Link */}
                                {template.demoUrl && (
                                    <a
                                        href={template.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-600 hover:text-emerald-700 text-sm"
                                    >
                                        Demo →
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredTemplates.length === 0 && !loading && (
                <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">No templates found matching your criteria.</p>
                    <p className="text-gray-400 mb-4">Try adjusting your search or filters.</p>
                    <button
                        onClick={() => {
                            setFilterCategory("all")
                            setFilterStatus("all")
                            setSearchTerm("")
                        }}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded font-medium"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Publication</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to publish this template? Once published, it will be visible to all users in the
                            marketplace.
                        </p>
                        <div className="flex items-center justify-end space-x-3">
                            <button
                                onClick={() => setShowConfirmDialog(null)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handlePublishTemplate(showConfirmDialog)}
                                disabled={publishingTemplates.has(showConfirmDialog)}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                            >
                                {publishingTemplates.has(showConfirmDialog) ? "Publishing..." : "Publish Template"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default TemplatesPage
