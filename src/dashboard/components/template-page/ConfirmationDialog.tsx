import React from "react"

interface ConfirmationDialogProps {
    showConfirmDialog: string | null
    confirmAction: 'publish' | 'unpublish' | null
    publishingTemplates: Set<string>
    unpublishingTemplates: Set<string>
    setShowConfirmDialog: (dialog: string | null) => void
    setConfirmAction: (action: 'publish' | 'unpublish' | null) => void
    handleConfirmAction: () => void
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    showConfirmDialog,
    confirmAction,
    publishingTemplates,
    unpublishingTemplates,
    setShowConfirmDialog,
    setConfirmAction,
    handleConfirmAction
}) => {
    if (!showConfirmDialog || !confirmAction) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {confirmAction === 'publish' ? 'Confirm Publication' : 'Confirm Unpublication'}
                </h3>
                <p className="text-gray-600 mb-6">
                    {confirmAction === 'publish'
                        ? "Are you sure you want to publish this template? Once published, it will be visible to all users in the marketplace."
                        : "Are you sure you want to unpublish this template? It will no longer be visible to users in the marketplace."
                    }
                </p>
                <div className="flex items-center justify-end space-x-3">
                    <button
                        onClick={() => {
                            setShowConfirmDialog(null)
                            setConfirmAction(null)
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmAction}
                        disabled={publishingTemplates.has(showConfirmDialog) || unpublishingTemplates.has(showConfirmDialog)}
                        className={`px-4 py-2 text-white rounded-lg disabled:opacity-50 ${confirmAction === 'publish'
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-orange-500 hover:bg-orange-600'
                            }`}
                    >
                        {(publishingTemplates.has(showConfirmDialog) || unpublishingTemplates.has(showConfirmDialog))
                            ? (confirmAction === 'publish' ? "Publishing..." : "Unpublishing...")
                            : (confirmAction === 'publish' ? "Publish Template" : "Unpublish Template")
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationDialog