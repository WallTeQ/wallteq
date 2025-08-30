import React from "react"
import { Eye, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import { Template } from "../../../types/template-type"

interface TemplateCardProps {
    template: Template
    selectedTemplates: string[]
    publishingTemplates: Set<string>
    unpublishingTemplates: Set<string>
    handleEditTemplate: (template: Template) => void
    handleDeleteTemplate: (templateId: string) => void
    showConfirmationDialog: (templateId: string, action: 'publish' | 'unpublish') => void
    getStatusBadge: (status: string) => string
}

const TemplateCard: React.FC<TemplateCardProps> = ({
    template,
    publishingTemplates,
    unpublishingTemplates,
    handleEditTemplate,
    handleDeleteTemplate,
    showConfirmationDialog,
    getStatusBadge
}) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
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
                <div className="flex flex-col space-y-2">
                    <div className="flex justify-between space-x-2">
                        {/* <button
                            onClick={() => {
                                // Navigate to template detail view
                                console.log("View template:", template.id)
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600"
                            title="View Details"
                        >
                            <Eye className="h-4 w-4" />
                        </button> */}
                        <button
                            onClick={() => handleEditTemplate(template)}
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

                    {/* Publish/Unpublish Buttons */}
                    <div className="flex justify-between space-x-2">
                        {template.status === "pending" && (
                            <button
                                onClick={() => showConfirmationDialog(template.id, 'publish')}
                                disabled={publishingTemplates.has(template.id)}
                                className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
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

                        {template.status === "published" && (
                            <button
                                onClick={() => showConfirmationDialog(template.id, 'unpublish')}
                                disabled={unpublishingTemplates.has(template.id)}
                                className="flex items-center space-x-1 px-3 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {unpublishingTemplates.has(template.id) ? (
                                    <>
                                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                        <span>Unpublishing...</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="h-3 w-3" />
                                        <span>Unpublish</span>
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
        </div>
    )
}

export default TemplateCard