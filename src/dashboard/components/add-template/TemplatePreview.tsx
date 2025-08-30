import React from "react"
import { TemplateFormData } from "../../../types/template-type"

interface TemplatePreviewProps {
    formData: TemplateFormData
    categories: any[]
    existingImages: any[]
    uploadedImages: File[]
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
    formData,
    categories,
    existingImages,
    uploadedImages
}) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Preview</h3>
            <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-900">{formData.title || "Template Title"}</h4>
                    <span className="text-2xl font-bold text-emerald-600">${formData.price || 0}</span>
                </div>

                <p className="text-gray-600 mb-4">{formData.description || "Template description will appear here..."}</p>

                <div className="flex items-center space-x-4 mb-4">
                    <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {categories.find((c) => c.id === formData.categoryId)?.name || "Category"}
                    </span>
                    {formData.demoUrl && (
                        <a
                            href={formData.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 text-sm"
                        >
                            View Demo →
                        </a>
                    )}
                </div>

                {/* Preview existing and new images */}
                {(existingImages.length > 0 || uploadedImages.length > 0) && (
                    <div className="grid grid-cols-3 gap-2">
                        {/* Show existing images first */}
                        {existingImages.slice(0, 3).map((image, index) => (
                            <img
                                key={`existing-${index}`}
                                src={image.fileUrl}
                                alt={image.fileName}
                                className="w-full h-20 object-cover rounded"
                            />
                        ))}

                        {/* Show new images */}
                        {uploadedImages.slice(0, 3 - existingImages.length).map((image, index) => (
                            <img
                                key={`new-${index}`}
                                src={URL.createObjectURL(image) || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-20 object-cover rounded"
                            />
                        ))}

                        {(existingImages.length + uploadedImages.length) > 3 && (
                            <div className="w-full h-20 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                                +{(existingImages.length + uploadedImages.length) - 3} more
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TemplatePreview