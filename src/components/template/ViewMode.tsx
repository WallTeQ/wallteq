// components/ViewModeToggle.tsx
import { Grid, List } from "lucide-react"
import { ViewMode } from "../../data//template"

interface ViewModeToggleProps {
    viewMode: ViewMode
    onViewModeChange: (mode: ViewMode) => void
}

export const ViewModeToggle = ({ viewMode, onViewModeChange }: ViewModeToggleProps) => {
    return (
        <div className="flex items-center space-x-3">
            <span className="text-gray-400 text-sm">View:</span>
            <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
                <button
                    onClick={() => onViewModeChange("grid")}
                    className={`p-2 rounded ${viewMode === "grid"
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-400 hover:text-white"
                        }`}
                >
                    <Grid className="h-4 w-4" />
                </button>
                <button
                    onClick={() => onViewModeChange("list")}
                    className={`p-2 rounded ${viewMode === "list"
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-400 hover:text-white"
                        }`}
                >
                    <List className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}