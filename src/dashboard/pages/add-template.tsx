import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Save, Upload, X, ArrowLeft } from "lucide-react"
import { useTemplates } from "../../hook/useTemplate"
import { useCategories } from "../../hook/useCategories"
import { toast } from "react-toastify"
import TemplateForm from "../components/add-template/TemplateForm"
import ImageUploadSection from "../components/add-template/ImageUplaod"
import TemplatePreview from "../components/add-template/TemplatePreview"
import { TemplateFormData, ImageUploadProgress} from "../../types/template-type"

const initialFormData: TemplateFormData = {
    title: "",
    description: "",
    categoryId: "",
    price: 0,
    demoUrl: "",
}

const AddTemplatePage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { createTemplate, updateTemplate, uploadTemplateMedia, loading, error } = useTemplates()
    const { categories, loading: categoriesLoading, fetchCategories } = useCategories()

    // Check if we're editing an existing template
    const editTemplate = location.state?.editTemplate
    const isEditing = !!editTemplate

    const [formData, setFormData] = useState<TemplateFormData>(
        isEditing ? {
            title: editTemplate.title || "",
            description: editTemplate.description || "",
            categoryId: editTemplate.category?.id || "",
            price: editTemplate.price || 0,
            demoUrl: editTemplate.demoUrl || "",
        } : initialFormData
    )
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploadedImages, setUploadedImages] = useState<File[]>([])
    const [existingImages, setExistingImages] = useState(isEditing ? editTemplate.media || [] : [])
    const [uploadingImages, setUploadingImages] = useState(false)
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const [uploadProgress, setUploadProgress] = useState<ImageUploadProgress>({})

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

    const removeExistingImage = (index: number) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index))
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

        if (formData.demoUrl && !isValidUrl(formData.demoUrl)) {
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
            if (isEditing) {
                // Update existing template
                console.log("🔄 Updating template with data:", formData)

                const updatedTemplate = await updateTemplate(editTemplate.id, formData)

                if (updatedTemplate) {
                    console.log("✅ Template updated successfully:", updatedTemplate)

                    // Upload new images if any
                    if (uploadedImages.length > 0) {
                        console.log(`📸 Uploading ${uploadedImages.length} new images...`)
                        const uploadSuccess = await uploadImages(updatedTemplate.id)

                        if (uploadSuccess) {
                            console.log("✅ All new images uploaded successfully")
                        } else {
                            console.warn("⚠️ Some images failed to upload, but template was updated")
                        }
                    }

                    toast.success("✅ Template updated successfully", {
                        position: "top-right",
                    })

                    // Redirect to templates list after a short delay
                    setTimeout(() => {
                        navigate("/dashboard/templates")
                    }, 1000)
                } else {
                    throw new Error("Failed to update template - no template data returned")
                }
            } else {
                // Create new template
                console.log("🚀 Creating template with data:", formData)

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

                    toast.success("✅ Template created successfully", {
                        position: "top-right",
                    })

                    // Redirect to templates list after a short delay
                    setTimeout(() => {
                        navigate("/dashboard/templates")
                    }, 1000)
                } else {
                    throw new Error("Failed to create template - no template data returned")
                }
            }
        } catch (error: any) {
            console.error(`❌ Error ${isEditing ? 'updating' : 'creating'} template:`, error)
            setFormErrors((prev) => ({
                ...prev,
                submit: error.message || `Failed to ${isEditing ? 'update' : 'create'} template. Please try again.`,
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
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditing ? 'Edit Template' : 'Add New Template'}
                </h1>
            </div>

            {/* Error Display */}
            {(error || formErrors.submit) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <X className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                Error {isEditing ? 'updating' : 'creating'} template
                            </h3>
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
                            <h3 className="text-sm font-medium text-blue-800">
                                {isEditing ? 'Updating template...' : 'Creating template...'}
                            </h3>
                            <p className="mt-1 text-sm text-blue-700">
                                {uploadingImages ? "Uploading images..." : `Setting up your template...`}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="space-y-6">
                    <TemplateForm
                        formData={formData}
                        formErrors={formErrors}
                        categories={categories}
                        categoriesLoading={categoriesLoading}
                        isSubmitting={isSubmitting}
                        handleInputChange={handleInputChange}
                    />

                    <ImageUploadSection
                        isEditing={isEditing}
                        existingImages={existingImages}
                        uploadedImages={uploadedImages}
                        uploadProgress={uploadProgress}
                        formErrors={formErrors}
                        isSubmitting={isSubmitting}
                        uploadingImages={uploadingImages}
                        handleImageUpload={handleImageUpload}
                        removeImage={removeImage}
                        removeExistingImage={removeExistingImage}
                    />

                    <TemplatePreview
                        formData={formData}
                        categories={categories}
                        existingImages={existingImages}
                        uploadedImages={uploadedImages}
                    />
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
                        {isSubmitting
                            ? (uploadingImages ? "Uploading Images..." : `${isEditing ? 'Updating' : 'Creating'} Template...`)
                            : `${isEditing ? 'Update' : 'Create'} Template`
                        }
                    </span>
                </button>
            </div>
        </div>
    )
}

export default AddTemplatePage