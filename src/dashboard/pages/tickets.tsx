import { useState } from "react"
import { Search, Filter, Download, Plus, Eye, MessageSquare, Clock, User, Calendar } from "lucide-react"

interface Ticket {
    id: string
    title: string
    description: string
    status: "open" | "in-progress" | "resolved" | "closed"
    priority: "low" | "medium" | "high" | "urgent"
    category: "template-customization" | "technical-support" | "billing" | "general"
    customerName: string
    customerEmail: string
    assignedTo?: string
    createdDate: string
    updatedDate: string
    responseTime: string
    messages: number
}

const mockTickets: Ticket[] = [
    {
        id: "TKT-001",
        title: "Corporate template customization request",
        description: "Need to customize the corporate template with company branding and specific color scheme",
        status: "open",
        priority: "high",
        category: "template-customization",
        customerName: "John Doe",
        customerEmail: "john@company.com",
        assignedTo: "Sarah Wilson",
        createdDate: "2024-01-20T10:30:00Z",
        updatedDate: "2024-01-20T14:15:00Z",
        responseTime: "2h 15m",
        messages: 3,
    },
    {
        id: "TKT-002",
        title: "E-commerce payment integration issue",
        description: "Having trouble integrating PayPal payment gateway with the e-commerce template",
        status: "in-progress",
        priority: "urgent",
        category: "technical-support",
        customerName: "Jane Smith",
        customerEmail: "jane@store.com",
        assignedTo: "Mike Johnson",
        createdDate: "2024-01-19T16:45:00Z",
        updatedDate: "2024-01-20T09:30:00Z",
        responseTime: "45m",
        messages: 7,
    },
    {
        id: "TKT-003",
        title: "Billing inquiry for multiple templates",
        description: "Question about bulk pricing for purchasing 5+ templates for different projects",
        status: "resolved",
        priority: "medium",
        category: "billing",
        customerName: "Robert Brown",
        customerEmail: "robert@agency.com",
        createdDate: "2024-01-18T11:20:00Z",
        updatedDate: "2024-01-19T15:45:00Z",
        responseTime: "1h 30m",
        messages: 5,
    },
    {
        id: "TKT-004",
        title: "Portfolio template mobile responsiveness",
        description: "Portfolio template not displaying correctly on mobile devices, images are not scaling properly",
        status: "open",
        priority: "medium",
        category: "technical-support",
        customerName: "Emily Davis",
        customerEmail: "emily@creative.com",
        createdDate: "2024-01-20T08:15:00Z",
        updatedDate: "2024-01-20T08:15:00Z",
        responseTime: "Pending",
        messages: 1,
    },
    {
        id: "TKT-005",
        title: "General inquiry about custom development",
        description: "Interested in custom website development services beyond templates",
        status: "closed",
        priority: "low",
        category: "general",
        customerName: "David Wilson",
        customerEmail: "david@startup.io",
        createdDate: "2024-01-17T14:30:00Z",
        updatedDate: "2024-01-18T10:20:00Z",
        responseTime: "3h 45m",
        messages: 4,
    },
]

const TicketsPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>(mockTickets)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState<string>("all")
    const [filterPriority, setFilterPriority] = useState<string>("all")
    const [filterCategory, setFilterCategory] = useState<string>("all")
    const [selectedTickets, setSelectedTickets] = useState<string[]>([])
    const [showFilters, setShowFilters] = useState(false)

    const filteredTickets = tickets.filter((ticket) => {
        const matchesSearch =
            ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = filterStatus === "all" || ticket.status === filterStatus
        const matchesPriority = filterPriority === "all" || ticket.priority === filterPriority
        const matchesCategory = filterCategory === "all" || ticket.category === filterCategory

        return matchesSearch && matchesStatus && matchesPriority && matchesCategory
    })

    const handleSelectTicket = (ticketId: string) => {
        setSelectedTickets((prev) => (prev.includes(ticketId) ? prev.filter((id) => id !== ticketId) : [...prev, ticketId]))
    }

    const handleSelectAll = () => {
        setSelectedTickets(
            selectedTickets.length === filteredTickets.length ? [] : filteredTickets.map((ticket) => ticket.id),
        )
    }

    const getStatusBadge = (status: string) => {
        const styles = {
            open: "bg-blue-100 text-blue-800",
            "in-progress": "bg-yellow-100 text-yellow-800",
            resolved: "bg-green-100 text-green-800",
            closed: "bg-gray-100 text-gray-800",
        }
        return styles[status as keyof typeof styles] || styles.open
    }

    const getPriorityBadge = (priority: string) => {
        const styles = {
            low: "bg-gray-100 text-gray-800",
            medium: "bg-blue-100 text-blue-800",
            high: "bg-orange-100 text-orange-800",
            urgent: "bg-red-100 text-red-800",
        }
        return styles[priority as keyof typeof styles] || styles.medium
    }

    const formatDate = (dateString: string) => {
        return (
            new Date(dateString).toLocaleDateString() +
            " " +
            new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        )
    }

    const getTicketStats = () => {
        return {
            total: tickets.length,
            open: tickets.filter((t) => t.status === "open").length,
            inProgress: tickets.filter((t) => t.status === "in-progress").length,
            resolved: tickets.filter((t) => t.status === "resolved").length,
        }
    }

    const stats = getTicketStats()

    return (
        <div className="space-y-6">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <MessageSquare className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.open}</p>
                        </div>
                        <Clock className="h-8 w-8 text-orange-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">In Progress</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                        </div>
                        <User className="h-8 w-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Resolved</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
                        </div>
                        <MessageSquare className="h-8 w-8 text-green-500" />
                    </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search tickets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <Filter className="h-4 w-4" />
                            <span>Filters</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                            <Plus className="h-4 w-4" />
                            <span>New Ticket</span>
                        </button>
                    </div>
                </div>

                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="open">Open</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <select
                                    value={filterPriority}
                                    onChange={(e) => setFilterPriority(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="all">All Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="template-customization">Template Customization</option>
                                    <option value="technical-support">Technical Support</option>
                                    <option value="billing">Billing</option>
                                    <option value="general">General</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        setFilterStatus("all")
                                        setFilterPriority("all")
                                        setFilterCategory("all")
                                        setSearchTerm("")
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Tickets Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedTickets.length === filteredTickets.length && filteredTickets.length > 0}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ticket
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Priority
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Assigned To
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredTickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedTickets.includes(ticket.id)}
                                            onChange={() => handleSelectTicket(ticket.id)}
                                            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                                            <div className="text-sm text-gray-600 max-w-xs truncate">{ticket.title}</div>
                                            <div className="flex items-center mt-1">
                                                <MessageSquare className="h-3 w-3 text-gray-400 mr-1" />
                                                <span className="text-xs text-gray-500">{ticket.messages} messages</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{ticket.customerName}</div>
                                            <div className="text-sm text-gray-500">{ticket.customerEmail}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(ticket.status)}`}
                                        >
                                            {ticket.status.replace("-", " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(ticket.priority)}`}
                                        >
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{ticket.assignedTo || "Unassigned"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {formatDate(ticket.createdDate)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button className="p-1 text-gray-400 hover:text-gray-600">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-blue-600">
                                                <MessageSquare className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                        Showing {filteredTickets.length} of {tickets.length} tickets
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
                        <button className="px-3 py-1 bg-emerald-500 text-white rounded text-sm">1</button>
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketsPage;
