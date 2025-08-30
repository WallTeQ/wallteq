import { useEffect, useState } from "react"
import { Package } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useTemplates } from "../../hook/useTemplate"
import { useCategories } from "../../hook/useCategories"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import StatsCards from "../components/template-page/StatsCard"
import ActionsBar from "../components/template-page/ActionBar"
import TemplateCard from "../components/template-page/TemplateCard"
import ConfirmationDialog from "../components/template-page/ConfirmationDialog"
import { StatusCounts, Template } from "../../types/template-type"

const TemplatesPage = () => {
    const navigate = useNavigate()
    const { templates, loading, error, fetchTemplates, publishTemplate, deleteTemplate, unpublishTemplate } = useTemplates()
    const { categories, loading: categoriesLoading, fetchCategories } = useCategories()

    const [searchTerm, setSearchTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState<string>("all")
    const [filterStatus, setFilterStatus] = useState<string>("all")
    const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])
    const [showFilters, setShowFilters] = useState(false)
    const [publishingTemplates, setPublishingTemplates] = useState<Set<string>>(new Set())
    const [unpublishingTemplates, setUnpublishingTemplates] = useState<Set<string>>(new Set())
    const [showConfirmDialog, setShowConfirmDialog] = useState<string | null>(null)
    const [confirmAction, setConfirmAction] = useState<'publish' | 'unpublish' | null>(null)

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

    const handleEditTemplate = (template: Template) => {
        navigate("/dashboard/templates/add", { state: { editTemplate: template } })
    }

    const handlePublishTemplate = async (templateId: string) => {
        setPublishingTemplates((prev) => new Set(prev).add(templateId))

        try {
            const success = await publishTemplate(templateId)
            if (success) {
                toast.success("✅ Template published successfully", {
                    position: "top-right",
                })
                await fetchTemplates()
            }
        } catch (error) {
            toast.error("❌ Failed to publish template", {
                position: "top-right",
            })
        } finally {
            setPublishingTemplates((prev) => {
                const newSet = new Set(prev)
                newSet.delete(templateId)
                return newSet
            })
            setShowConfirmDialog(null)
            setConfirmAction(null)
        }
    }

    const handleUnpublishTemplate = async (templateId: string) => {
        setUnpublishingTemplates((prev) => new Set(prev).add(templateId))

        try {
            const success = await unpublishTemplate(templateId)
            if (success) {
                toast.success("✅ Template unpublished successfully", {
                    position: "top-right",
                })
                await fetchTemplates()
            } else {
                toast.error("❌ Failed to unpublish template", {
                    position: "top-right",
                })
            }
        } catch (error) {
            toast.error("❌ Failed to unpublish template", {
                position: "top-right",
            })
        } finally {
            setUnpublishingTemplates((prev) => {
                const newSet = new Set(prev)
                newSet.delete(templateId)
                return newSet
            })
            setShowConfirmDialog(null)
            setConfirmAction(null)
        }
    }

    const handleDeleteTemplate = async (templateId: string) => {
        if (window.confirm("Are you sure you want to delete this template? This action cannot be undone.")) {
            const success = await deleteTemplate(templateId)
            if (success) {
                toast.success("✅ Template deleted successfully", {
                    position: "top-right",
                })
                setSelectedTemplates((prev) => prev.filter((id) => id !== templateId))
            }
        }
    }

    const showConfirmationDialog = (templateId: string, action: 'publish' | 'unpublish') => {
        setShowConfirmDialog(templateId)
        setConfirmAction(action)
    }

    const handleConfirmAction = () => {
        if (showConfirmDialog && confirmAction) {
            if (confirmAction === 'publish') {
                handlePublishTemplate(showConfirmDialog)
            } else if (confirmAction === 'unpublish') {
                handleUnpublishTemplate(showConfirmDialog)
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

    const getStatusCounts = (): StatusCounts => {
        return {
            total: templates.length,
            published: templates.filter((t) => t.status === "published").length,
            pending: templates.filter((t) => t.status === "pending").length,
            rejected: templates.filter((t) => t.status === "rejected").length,
        }
    }

    const statusCounts = getStatusCounts()

    if (loading && templates.length === 0) {
        return <Loader />
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
            <StatsCards statusCounts={statusCounts} />

            <ActionsBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                categories={categories}
                categoriesLoading={categoriesLoading}
                navigate={navigate}
            />

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                    <TemplateCard
                        key={template.id}
                        template={template}
                        selectedTemplates={selectedTemplates}
                        publishingTemplates={publishingTemplates}
                        unpublishingTemplates={unpublishingTemplates}
                        handleEditTemplate={handleEditTemplate}
                        handleDeleteTemplate={handleDeleteTemplate}
                        showConfirmationDialog={showConfirmationDialog}
                        getStatusBadge={getStatusBadge}
                    />
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

            <ConfirmationDialog
                showConfirmDialog={showConfirmDialog}
                confirmAction={confirmAction}
                publishingTemplates={publishingTemplates}
                unpublishingTemplates={unpublishingTemplates}
                setShowConfirmDialog={setShowConfirmDialog}
                setConfirmAction={setConfirmAction}
                handleConfirmAction={handleConfirmAction}
            />
        </div>
    )
}

export default TemplatesPage