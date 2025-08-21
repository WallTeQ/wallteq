import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Save, Upload, X, ArrowLeft, ImageIcon } from "lucide-react"
import { useTemplates } from "../../hook/useTemplate"
import { useCategories } from "../../hook/useCategories"
import {checkAuthToken, redirectToLogin} from "../../lib/auth-utils"

interface TemplateFormData {
    title: string
    description: string
    categoryId: string
    price: number
    demoUrl: string
}

const initialFormData: TemplateFormData = {
    title: "",
    description: "",
    categoryId: "",
    price: 0,
    demoUrl: "",
}

const AddTemplatePage = () => {
    const navigate = useNavigate()
    const { createTemplate, uploadTemplateMedia, loading, error } = useTemplates()
    const { categories, loading: categoriesLoading, fetchCategories } = useCategories()

    const [formData, setFormData] = useState<TemplateFormData>(initialFormData)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploadedImages, setUploadedImages] = useState<File[]>([])
    const [uploadingImages, setUploadingImages] = useState(false)
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

    // Fetch categories on mount
    useEffect(() => {
        fetchCategories()
    }, [])

    const handleInputChange = (field: keyof TemplateFormData, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))

        // Clear field error when user starts typing
        if (formErrors[field]) {
            setFormErrors((prev) => ({
                ...prev,
                [field]: "",
            }))
        }
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            const newImages = Array.from(files).filter(
                (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024, // 5MB limit
            )

            if (newImages.length !== files.length) {
                setFormErrors((prev) => ({
                    ...prev,
                    images: "Some files were skipped. Only images under 5MB are allowed.",
                }))
            }

            setUploadedImages((prev) => [...prev, ...newImages])
        }
    }

    const removeImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index))
        // Clear any image-related errors
        if (formErrors.images) {
            setFormErrors((prev) => ({
                ...prev,
                images: "",
            }))
        }
    }

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {}

        if (!formData.title.trim()) {
            errors.title = "Template title is required"
        }

        if (!formData.description.trim()) {
            errors.description = "Template description is required"
        }

        if (!formData.categoryId) {
            errors.categoryId = "Please select a category"
        }

        if (formData.price <= 0) {
            errors.price = "Price must be greater than 0"
        }

        if (!formData.demoUrl ) {
            errors.demoUrl = "Please enter a valid URL"
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValidUrl = (url: string): boolean => {
        try {
            new URL(url)
            return true
        } catch {
            return false
        }
    }

    const uploadImages = async (templateId: string): Promise<boolean> => {
        if (uploadedImages.length === 0) return true

        setUploadingImages(true)
        let allUploadsSuccessful = true

        try {
            console.log(`📸 Starting upload of ${uploadedImages.length} images for template ${templateId}`)

            for (let i = 0; i < uploadedImages.length; i++) {
                const image = uploadedImages[i]
                const progressKey = `${templateId}-${i}`

                try {
                    setUploadProgress((prev) => ({ ...prev, [progressKey]: 0 }))

                    console.log(`⬆️ Uploading image ${i + 1}/${uploadedImages.length}: ${image.name}`)

                    const result = await uploadTemplateMedia(templateId, image, "image")

                    if (result) {
                        setUploadProgress((prev) => ({ ...prev, [progressKey]: 100 }))
                        console.log(`✅ Successfully uploaded: ${image.name}`)
                    } else {
                        throw new Error("Upload failed - no result returned")
                    }
                } catch (uploadError: any) {
                    console.error(`❌ Failed to upload image ${image.name}:`, uploadError)
                    setUploadProgress((prev) => ({ ...prev, [progressKey]: -1 })) // -1 indicates error
                    allUploadsSuccessful = false

                    // Set error message for this specific image
                    setFormErrors((prev) => ({
                        ...prev,
                        [`image-${i}`]: `Failed to upload ${image.name}: ${uploadError.message || "Unknown error"}`,
                    }))
                }
            }

            if (!allUploadsSuccessful) {
                setFormErrors((prev) => ({
                    ...prev,
                    images: "Some images failed to upload. The template was created but you may need to upload images manually.",
                }))
            }
        } catch (error: any) {
            console.error("❌ Error during image upload process:", error)
            setFormErrors((prev) => ({
                ...prev,
                images: `Image upload failed: ${error.message || "Unknown error"}`,
            }))
            allUploadsSuccessful = false
        } finally {
            setUploadingImages(false)
        }

        return allUploadsSuccessful
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)
        setFormErrors({}) // Clear any previous errors

        try {
            console.log("🚀 Creating template with data:", formData)

            // Create the template first
            const newTemplate = await createTemplate(formData)

            if (newTemplate) {
                console.log("✅ Template created successfully:", newTemplate)

                // Upload images if any
                if (uploadedImages.length > 0) {
                    console.log(`📸 Uploading ${uploadedImages.length} images...`)
                    const uploadSuccess = await uploadImages(newTemplate.id)

                    if (uploadSuccess) {
                        console.log("✅ All images uploaded successfully")
                    } else {
                        console.warn("⚠️ Some images failed to upload, but template was created")
                    }
                }

                // Redirect to templates list after a short delay to show success
                setTimeout(() => {
                    navigate("/dashboard/templates")
                }, 1000)
            } else {
                throw new Error("Failed to create template - no template data returned")
            }
        } catch (error: any) {
            console.error("❌ Error creating template:", error)
            setFormErrors((prev) => ({
                ...prev,
                submit: error.message || "Failed to create template. Please try again.",
            }))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                </button>
            </div>

            {/* Error Display */}
            {(error || formErrors.submit) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <X className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error creating template</h3>
                            <p className="mt-1 text-sm text-red-700">{error || formErrors.submit}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {isSubmitting && !error && !formErrors.submit && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Creating template...</h3>
                            <p className="mt-1 text-sm text-blue-700">
                                {uploadingImages ? "Uploading images..." : "Setting up your template..."}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
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

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Template Images</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 mb-4">Upload template screenshots and preview images</p>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                                disabled={isSubmitting}
                            />
                            <label
                                htmlFor="image-upload"
                                className={`inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 cursor-pointer ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Images
                            </label>
                            <p className="text-xs text-gray-500 mt-2">Max 5MB per image • JPG, PNG, GIF supported</p>
                        </div>
                        {formErrors.images && <p className="mt-2 text-sm text-red-600">{formErrors.images}</p>}

                        {/* Image Preview */}
                        {uploadedImages.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                {uploadedImages.map((image, index) => {
                                    const progressKey = `template-${index}`
                                    const progress = uploadProgress[progressKey]
                                    const hasError = progress === -1
                                    const isUploading = uploadingImages && progress !== undefined && progress < 100 && progress !== -1

                                    return (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(image) || "/placeholder.svg"}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />

                                            {/* Upload Progress Overlay */}
                                            {isUploading && (
                                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                                    <div className="text-white text-sm">
                                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-1"></div>
                                                        Uploading...
                                                    </div>
                                                </div>
                                            )}

                                            {/* Success Indicator */}
                                            {progress === 100 && (
                                                <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1">
                                                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            )}

                                            {/* Error Indicator */}
                                            {hasError && (
                                                <div className="absolute inset-0 bg-red-500 bg-opacity-75 rounded-lg flex items-center justify-center">
                                                    <div className="text-white text-xs text-center p-2">
                                                        <X className="h-4 w-4 mx-auto mb-1" />
                                                        Upload Failed
                                                    </div>
                                                </div>
                                            )}

                                            {/* Remove Button */}
                                            {!isSubmitting && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            )}

                                            <p className="text-xs text-gray-500 mt-1 truncate">{image.name}</p>
                                            <p className="text-xs text-gray-400">{(image.size / 1024 / 1024).toFixed(2)} MB</p>

                                            {formErrors[`image-${index}`] && (
                                                <p className="text-xs text-red-600 mt-1">{formErrors[`image-${index}`]}</p>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Template Preview */}
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

                            {uploadedImages.length > 0 && (
                                <div className="grid grid-cols-3 gap-2">
                                    {uploadedImages.slice(0, 3).map((image, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(image) || "/placeholder.svg"}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-20 object-cover rounded"
                                        />
                                    ))}
                                    {uploadedImages.length > 3 && (
                                        <div className="w-full h-20 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                                            +{uploadedImages.length - 3} more
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-6">
                <button
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span>Cancel</span>
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || loading || categoriesLoading}
                    className="flex items-center space-x-2 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save className="h-4 w-4" />
                    <span>
                        {isSubmitting ? (uploadingImages ? "Uploading Images..." : "Creating Template...") : "Create Template"}
                    </span>
                </button>
            </div>
        </div>
    )
}

export default AddTemplatePage