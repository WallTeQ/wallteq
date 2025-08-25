import { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, ExternalLink, Calendar, DollarSign, Tag, Globe, ImageIcon, FileText, Eye, X } from "lucide-react"
import { useTickets } from "../../hook/useTicket"
import Loader from "../../components/Loader"
import { Template } from "../../types/template-type"

interface TicketTemplate {
    id: string
    ticketNumber: string
    user: {
        id: string
        name: string
        email: string
    }
    templates: Template[]
    inquiry: string
    adminResponse: string | null
    status: string
    createdAt: string
    updatedAt: string
}

const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    published: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
}

const TicketTemplatesPage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { tickets, loading } = useTickets()
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
    const [showTemplateModal, setShowTemplateModal] = useState(false)

    const ticketId = params.ticketId as string

    // Find the specific ticket
    const ticket = useMemo(() => {
        return tickets.find((t) => t.id === ticketId)
    }, [tickets, ticketId])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getTotalValue = () => {
        return ticket?.templates.reduce((sum, template) => sum + template.price, 0) || 0
    }

    const handleViewTemplate = (template: Template) => {
        setSelectedTemplate(template)
        setShowTemplateModal(true)
    }

    const handleDemoClick = (demoUrl: string) => {
        if (demoUrl) {
            window.open(demoUrl.startsWith("http") ? demoUrl : `https://${demoUrl}`, "_blank")
        }
    }

    if (loading) {
        return <Loader />
    }

    if (!ticket) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket Not Found</h2>
                    <p className="text-gray-600 mb-4">The ticket you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Back to Tickets
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => navigate("/dashboard/tickets")}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Tickets
                    </button>
                    <div className="text-sm text-gray-500">Created: {formatDate(ticket.createdAt)}</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Ticket: {ticket.ticketNumber}</h1>
                        <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="font-medium">Customer:</span>
                                <span className="ml-2">{ticket.user.name}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="font-medium">Email:</span>
                                <span className="ml-2">{ticket.user.email}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="font-medium">Status:</span>
                                <span className="ml-2 capitalize">{ticket.status.replace("_", " ")}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-2">Customer Inquiry</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{ticket.inquiry}</p>
                        {ticket.adminResponse && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <h4 className="font-medium text-gray-900 mb-2">Admin Response</h4>
                                <p className="text-gray-700 text-sm leading-relaxed">{ticket.adminResponse}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Templates Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Templates ({ticket.templates.length})</h2>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600">
                            Total Value: <span className="font-semibold text-green-600">${getTotalValue()}</span>
                        </div>
                    </div>
                </div>

                {ticket.templates.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No templates associated with this ticket.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ticket.templates.map((template) => (
                            <div
                                key={template.id}
                                className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                {/* Template Image/Preview */}
                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                    {template.media && template.media.length > 0 ? (
                                        <img
                                            src={template.media[0].fileUrl || "/placeholder.svg"}
                                            alt={template.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-500">No preview available</p>
                                        </div>
                                    )}
                                </div>

                                {/* Template Details */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900 text-lg truncate">{template.title}</h3>
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[template.status]}`}
                                        >
                                            {template.status}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Price:</span>
                                            <span className="font-semibold text-green-600">${template.price}</span>
                                        </div>
                                        {template.category && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Category:</span>
                                                <span className="text-gray-700">{template.category.name}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Created:</span>
                                            <span className="text-gray-700">{new Date(template.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleViewTemplate(template)}
                                            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
                                        >
                                            <Eye className="h-4 w-4 mr-1" />
                                            View Details
                                        </button>
                                        {template.demoUrl && (
                                            <button
                                                onClick={() => handleDemoClick(template.demoUrl!)}
                                                className="bg-gray-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors flex items-center justify-center"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Template Detail Modal */}
            {showTemplateModal && selectedTemplate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Template Details</h2>
                            <button onClick={() => setShowTemplateModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Template Preview */}
                                <div>
                                    <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                                        {selectedTemplate.media && selectedTemplate.media.length > 0 ? (
                                            <img
                                                src={selectedTemplate.media[0].fileUrl || "/placeholder.svg"}
                                                alt={selectedTemplate.title}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                                                <p className="text-gray-500">No preview available</p>
                                            </div>
                                        )}
                                    </div>

                                    {selectedTemplate.media && selectedTemplate.media.length > 1 && (
                                        <div className="grid grid-cols-3 gap-2">
                                            {selectedTemplate.media.slice(1, 4).map((media, index) => (
                                                <div key={media.id} className="bg-gray-100 rounded h-20 overflow-hidden">
                                                    <img
                                                        src={media.fileUrl || "/placeholder.svg"}
                                                        alt={`${selectedTemplate.title} ${index + 2}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Template Information */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedTemplate.title}</h3>
                                        <span
                                            className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${statusColors[selectedTemplate.status]
                                                }`}
                                        >
                                            {selectedTemplate.status}
                                        </span>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                                        <p className="text-gray-700 leading-relaxed">{selectedTemplate.description}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Price</h4>
                                            <div className="flex items-center">
                                                <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                                                <span className="text-xl font-bold text-green-600">{selectedTemplate.price}</span>
                                            </div>
                                        </div>
                                        {selectedTemplate.category && (
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">Category</h4>
                                                <div className="flex items-center">
                                                    <Tag className="h-4 w-4 text-gray-600 mr-1" />
                                                    <span className="text-gray-700">{selectedTemplate.category.name}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Timeline</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 text-gray-600 mr-2" />
                                                <span className="text-gray-600">Created:</span>
                                                <span className="ml-2 text-gray-900">{formatDate(selectedTemplate.createdAt)}</span>
                                            </div>
                                            {selectedTemplate.publishedAt && (
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 text-gray-600 mr-2" />
                                                    <span className="text-gray-600">Published:</span>
                                                    <span className="ml-2 text-gray-900">{formatDate(selectedTemplate.publishedAt)}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 text-gray-600 mr-2" />
                                                <span className="text-gray-600">Last Updated:</span>
                                                <span className="ml-2 text-gray-900">{formatDate(selectedTemplate.updatedAt)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedTemplate.demoUrl && (
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Demo</h4>
                                            <button
                                                onClick={() => handleDemoClick(selectedTemplate.demoUrl!)}
                                                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                <Globe className="h-4 w-4 mr-2" />
                                                View Live Demo
                                                <ExternalLink className="h-4 w-4 ml-1" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                            <button
                                onClick={() => setShowTemplateModal(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                Close
                            </button>
                            {selectedTemplate.demoUrl && (
                                <button
                                    onClick={() => handleDemoClick(selectedTemplate.demoUrl!)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    View Demo
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default TicketTemplatesPage
