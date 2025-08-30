import React from "react"
import { X, Upload, ImageIcon } from "lucide-react"
import { ImageUploadProgress } from "../../../types/template-type"

interface ImageUploadSectionProps {
    isEditing: boolean
    existingImages: any[]
    uploadedImages: File[]
    uploadProgress: ImageUploadProgress
    formErrors: Record<string, string>
    isSubmitting: boolean
    uploadingImages: boolean
    handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
    removeImage: (index: number) => void
    removeExistingImage: (index: number) => void
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
    isEditing,
    existingImages,
    uploadedImages,
    uploadProgress,
    formErrors,
    isSubmitting,
    uploadingImages,
    handleImageUpload,
    removeImage,
    removeExistingImage
}) => {
    return (
        <div>
            {/* Existing Images (for editing) */}
            {isEditing && existingImages.length > 0 && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Images</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {existingImages.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image.fileUrl}
                                    alt={image.fileName}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(index)}
                                    disabled={isSubmitting}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:opacity-50"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                                <p className="text-xs text-gray-500 mt-1 truncate">{image.fileName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isEditing ? 'Add New Images' : 'Template Images'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">
                        {isEditing ? 'Upload additional template images' : 'Upload template screenshots and preview images'}
                    </p>
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

                {/* New Image Preview */}
                {uploadedImages.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">New Images to Upload</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImageUploadSection