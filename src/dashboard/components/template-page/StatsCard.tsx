import React from "react"
import { Package, CheckCircle, TrendingUp, Star } from "lucide-react"
import { StatusCounts } from "../../../types/template-type"

interface StatsCardsProps {
    statusCounts: StatusCounts
}

const StatsCards: React.FC<StatsCardsProps> = ({ statusCounts }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Templates</p>
                        <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-500" />
                </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Published</p>
                        <p className="text-2xl font-bold text-gray-900">{statusCounts.published}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">{statusCounts.pending}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-yellow-500" />
                </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Rejected</p>
                        <p className="text-2xl font-bold text-gray-900">{statusCounts.rejected}</p>
                    </div>
                    <Star className="h-8 w-8 text-red-500" />
                </div>
            </div>
        </div>
    )
}

export default StatsCards