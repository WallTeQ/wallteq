
import StatsCard from "../components/stat-card"
import { useMemo } from "react"
import { Users, FileText, MessageSquare, CheckCircle } from "lucide-react"
import { useStats } from "../../hook/useStat"

export default function AnalyticsPage() {
    const { stats, loading, error } = useStats()

    // Calculate analytics based on stats data
    const analytics = useMemo(() => {
        const templateTicketCounts = stats.templateTicketCounts || []

        // Find template with most tickets
        const mostTicketedTemplate = templateTicketCounts.reduce(
            (max, curr) => (curr.ticketCount > max.ticketCount ? curr : max),
            { ticketCount: 0, templateId: "", title: "" },
        )

        // Calculate category analytics from template ticket counts
        const categoryAnalytics = templateTicketCounts
            .slice(0, 5) // Top 5 templates by ticket count
            .map((template) => ({ name: template.title, count: template.ticketCount }))

        // Calculate monthly ticket data for display
        const monthlyData = Object.entries(stats.ticketsPerMonth || {})
            .map(([month, count]) => ({ month, count }))
            .sort((a, b) => a.month.localeCompare(b.month))

        // Calculate weekly ticket data for display
        const weeklyData = Object.entries(stats.ticketsPerWeek || {})
            .map(([week, count]) => ({ week, count }))
            .sort((a, b) => a.week.localeCompare(b.week))

        return {
            mostTicketedTemplate: mostTicketedTemplate.ticketCount > 0 ? mostTicketedTemplate : null,
            categoryAnalytics,
            monthlyData,
            weeklyData,
        }
    }, [stats])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString()
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg">Loading analytics...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg text-red-600">Error loading analytics: {error}</div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers.toLocaleString()}
                    change={{ value: "5.2%", type: "increase" }}
                    icon={Users}
                    color="blue"
                />
                <StatsCard
                    title="Total Templates"
                    value={stats.totalTemplates.toLocaleString()}
                    change={{ value: "12.3%", type: "increase" }}
                    icon={FileText}
                    color="green"
                />
                <StatsCard
                    title="Published Templates"
                    value={stats.totalPublishedTemplates.toLocaleString()}
                    change={{ value: "8.7%", type: "increase" }}
                    icon={CheckCircle}
                    color="green"
                />
                <StatsCard
                    title="Total Tickets"
                    value={stats.totalTickets.toLocaleString()}
                    change={{ value: "15.1%", type: "increase" }}
                    icon={MessageSquare}
                    color="purple"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Template Ticket Distribution */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Templates by Ticket Count</h3>
                    <div className="space-y-4">
                        {analytics.categoryAnalytics.map((template, index) => (
                            <div key={template.name} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-3 h-3 rounded-full ${index === 0
                                                ? "bg-blue-500"
                                                : index === 1
                                                    ? "bg-green-500"
                                                    : index === 2
                                                        ? "bg-yellow-500"
                                                        : index === 3
                                                            ? "bg-purple-500"
                                                            : "bg-red-500"
                                            }`}
                                    ></div>
                                    <span className="text-sm text-gray-900">{template.name}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-gray-900">{template.count}</div>
                                    <div className="text-xs text-gray-500">tickets</div>
                                </div>
                            </div>
                        ))}
                        {analytics.categoryAnalytics.length === 0 && (
                            <p className="text-gray-500 text-sm">No template data available</p>
                        )}
                    </div>
                </div>

                {/* Top Category */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Category</h3>
                    {stats.topCategory ? (
                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">{stats.topCategory.name}</div>
                                <div className="text-sm text-gray-500 mt-2">{stats.topCategory.templateCount} templates</div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No category data available</p>
                    )}
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Most Ticketed Template */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Template with Most Tickets</h3>
                    {analytics.mostTicketedTemplate ? (
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">{analytics.mostTicketedTemplate.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">Template ID: {analytics.mostTicketedTemplate.templateId}</p>
                                </div>
                                <div className="text-right ml-4">
                                    <div className="text-2xl font-bold text-red-600">{analytics.mostTicketedTemplate.ticketCount}</div>
                                    <div className="text-xs text-gray-500">tickets</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No ticket data available</p>
                    )}
                </div>

                {/* Monthly Ticket Trends */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Ticket Trends</h3>
                    <div className="space-y-4">
                        {analytics.monthlyData.map((item) => (
                            <div key={item.month} className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">{item.month}</div>
                                </div>
                                <div className="text-right ml-4">
                                    <div className="text-sm font-medium text-gray-900">{item.count}</div>
                                    <div className="text-xs text-gray-500">tickets</div>
                                </div>
                            </div>
                        ))}
                        {analytics.monthlyData.length === 0 && <p className="text-gray-500 text-sm">No monthly data available</p>}
                    </div>
                </div>
            </div>

            {/* Weekly Insights */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Ticket Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {analytics.weeklyData.slice(0, 4).map((item) => (
                        <div key={item.week} className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{item.count}</div>
                            <div className="text-sm text-gray-500">{item.week}</div>
                        </div>
                    ))}
                    {analytics.weeklyData.length === 0 && (
                        <div className="col-span-4 text-center text-gray-500">No weekly data available</div>
                    )}
                </div>
            </div>
        </div>
    )
}
