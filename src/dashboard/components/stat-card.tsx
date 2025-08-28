import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string | number
    change?: {
        value: string
        type: "increase" | "decrease"
    }
    icon: LucideIcon
    color?: "blue" | "green" | "yellow" | "red" | "purple"
}

const StatsCard = ({ title, value, change, icon: Icon, color = "blue" }: StatsCardProps) => {
    const colorClasses = {
        blue: "bg-blue-500",
        green: "bg-emerald-500",
        yellow: "bg-yellow-500",
        red: "bg-red-500",
        purple: "bg-purple-500",
    }

    return (
        <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
                    {/* {change && (
                        <div className="flex items-center mt-2">
                            <span className={`text-sm font-medium ${change.type === "increase" ? "text-green-600" : "text-red-600"}`}>
                                {change.type === "increase" ? "+" : "-"}
                                {change.value}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">vs last month</span>
                        </div>
                    )} */}
                </div>
                <div className={`${colorClasses[color]} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    )
}
export default StatsCard