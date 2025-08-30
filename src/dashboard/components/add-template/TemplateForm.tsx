import React from "react"
import { TemplateFormData } from "../../../types/template-type"

interface TemplateFormProps {
    formData: TemplateFormData
    formErrors: Record<string, string>
    categories: any[]
    categoriesLoading: boolean
    isSubmitting: boolean
    handleInputChange: (field: keyof TemplateFormData, value: any) => void
}

const TemplateForm: React.FC<TemplateFormProps> = ({
    formData,
    formErrors,
    categories,
    categoriesLoading,
    isSubmitting,
    handleInputChange
}) => {
    return (
        <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Title *</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${formErrors.title ? "border-red-300" : "border-gray-300"
                            }`}
                        placeholder="Enter template title"
                        required
                        disabled={isSubmitting}
                    />
                    {formErrors.title && <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                        value={formData.categoryId}
                        onChange={(e) => handleInputChange("categoryId", e.target.value)}
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${formErrors.categoryId ? "border-red-300" : "border-gray-300"
                            }`}
                        disabled={categoriesLoading || isSubmitting}
                        required
                    >
                        <option value="">{categoriesLoading ? "Loading categories..." : "Select category"}</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {formErrors.categoryId && <p className="mt-1 text-sm text-red-600">{formErrors.categoryId}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                    <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${formErrors.price ? "border-red-300" : "border-gray-300"
                            }`}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                        disabled={isSubmitting}
                    />
                    {formErrors.price && <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Demo URL</label>
                    <input
                        type="url"
                        value={formData.demoUrl}
                        onChange={(e) => handleInputChange("demoUrl", e.target.value)}
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${formErrors.demoUrl ? "border-red-300" : "border-gray-300"
                            }`}
                        placeholder="https://demo.example.com"
                        disabled={isSubmitting}
                    />
                    {formErrors.demoUrl && <p className="mt-1 text-sm text-red-600">{formErrors.demoUrl}</p>}
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${formErrors.description ? "border-red-300" : "border-gray-300"
                        }`}
                    placeholder="Describe your template..."
                    required
                    disabled={isSubmitting}
                />
                {formErrors.description && <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>}
            </div>
        </div>
    )
}

export default TemplateForm