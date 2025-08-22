import { useCallback, useMemo, useState } from "react"
import {
    Search,
    Filter,
    Download,
    Plus,
    MessageSquare,
    Clock,
    User,
    Calendar,
    Send,
    X,
    CheckCircle,
} from "lucide-react"
import { useTickets } from "../../hook/useTicket"
import {useEffect} from "react"
import Loader from "../../components/Loader"

interface Ticket {
    id: string
    ticketNumber: string
    inquiry: string
    status: "OPEN" | "IN_PROGRESS" | "CLOSED" | "FINALIZED"
    adminResponse?: string
    user: {
        id: string
        name: string
        email: string
    }
    templates: Array<{
        id: string
        title: string
        price: number
        category?: {
            id: string
            name: string
        }
    }>
    createdAt: string
    updatedAt: string
}

const TicketStatus = {
    OPEN: "OPEN",
    IN_PROGRESS: "IN_PROGRESS",
    CLOSED: "CLOSED",
    FINALIZED: "FINALIZED",
} as const

const statusColors = {
    OPEN: "bg-blue-100 text-blue-800",
    IN_PROGRESS: "bg-yellow-100 text-yellow-800",
    CLOSED: "bg-gray-100 text-gray-800",
    FINALIZED: "bg-green-100 text-green-800",
} as const

export default function TicketsPage() {
    const { tickets, loading, error, createTicket, respondToTicket, finalizeSale, getTicketStats } = useTickets()

    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState<string>("all")
    const [selectedTickets, setSelectedTickets] = useState<string[]>([])
    const [showFilters, setShowFilters] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showResponseModal, setShowResponseModal] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
    const [newTicketInquiry, setNewTicketInquiry] = useState("")
    const [adminResponse, setAdminResponse] = useState("")
    const [createSuccess, setCreateSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Memoize filtered tickets to prevent unnecessary recalculations
    const filteredTickets = useMemo(() => {
        return tickets.filter((ticket) => {
            const matchesSearch =
                ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.inquiry.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus = filterStatus === "all" || ticket.status === filterStatus

            return matchesSearch && matchesStatus
        })
    }, [tickets, searchTerm, filterStatus])

    // Memoize stats to prevent unnecessary recalculations
    const stats = useMemo(() => getTicketStats(), [tickets])

    const handleSelectTicket = useCallback((ticketId: string) => {
        setSelectedTickets((prev) => (prev.includes(ticketId) ? prev.filter((id) => id !== ticketId) : [...prev, ticketId]))
    }, [])

    const handleSelectAll = useCallback(() => {
        setSelectedTickets(
            selectedTickets.length === filteredTickets.length ? [] : filteredTickets.map((ticket) => ticket.id),
        )
    }, [selectedTickets.length, filteredTickets])

    const getStatusBadge = useCallback((status: string) => {
        return statusColors[status as keyof typeof statusColors] || statusColors[TicketStatus.OPEN]
    }, [])

    const formatDate = useCallback((dateString: string) => {
        return (
            new Date(dateString).toLocaleDateString() +
            " " +
            new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        )
    }, [])

    const handleCreateTicket = useCallback(async () => {
        if (!newTicketInquiry.trim()) {
            alert("Please enter an inquiry")
            return
        }

        setIsSubmitting(true)
        try {
            await createTicket({ inquiry: newTicketInquiry })
            setCreateSuccess(true)
            setNewTicketInquiry("")
            setTimeout(() => {
                setShowCreateModal(false)
                setCreateSuccess(false)
            }, 3000)
        } catch (error) {
            console.error("Failed to create ticket:", error)
            alert("Failed to create ticket. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }, [newTicketInquiry, createTicket])

    const handleRespondToTicket = useCallback(async () => {
        if (!adminResponse.trim() || !selectedTicket) {
            alert("Please enter a response")
            return
        }

        setIsSubmitting(true)
        try {
            await respondToTicket(selectedTicket.id, { adminResponse })
            setShowResponseModal(false)
            setAdminResponse("")
            setSelectedTicket(null)
        } catch (error) {
            console.error("Failed to respond to ticket:", error)
            alert("Failed to respond to ticket. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }, [adminResponse, selectedTicket, respondToTicket])

    const handleFinalizeSale = useCallback(
        async (ticketId: string) => {
            if (!confirm("Are you sure you want to finalize this sale? This action cannot be undone.")) {
                return
            }

            setIsSubmitting(true)
            try {
                await finalizeSale(ticketId)
            } catch (error) {
                console.error("Failed to finalize sale:", error)
                alert("Failed to finalize sale. Please try again.")
            } finally {
                setIsSubmitting(false)
            }
        },
        [finalizeSale],
    )

    const clearFilters = useCallback(() => {
        setFilterStatus("all")
        setSearchTerm("")
    }, [])

    // Only fetch tickets once on mount - removed fetchTickets from dependency array
    useEffect(() => {
        // The useTickets hook should handle initial data fetching
        // No need to call fetchTickets here if the hook does it automatically
    }, [])

    if (loading) {
        <Loader />
    }

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
                            <p className="text-sm font-medium text-gray-600">Finalized</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.finalized}</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex flex-col md:flex-row items-center space-x-4">
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
                            className="w-full md:w-auto mt-3 md:mt-0 flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                        >
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
                                    <option value={TicketStatus.OPEN}>Open</option>
                                    <option value={TicketStatus.IN_PROGRESS}>In Progress</option>
                                    <option value={TicketStatus.CLOSED}>Closed</option>
                                    <option value={TicketStatus.FINALIZED}>Finalized</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button onClick={clearFilters} className="px-4 py-2 text-gray-600 hover:text-gray-900">
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
                                    Templates
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
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
                                            <div className="text-sm font-medium text-gray-900">{ticket.ticketNumber}</div>
                                            <div className="text-sm text-gray-600 max-w-xs truncate">{ticket.inquiry}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{ticket.user.name}</div>
                                            <div className="text-sm text-gray-500">{ticket.user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {ticket.templates.length} template(s)
                                            <div className="text-xs text-gray-500">
                                                Total: ${ticket.templates.reduce((sum, t) => sum + t.price, 0)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(ticket.status)}`}
                                        >
                                            {ticket.status.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {formatDate(ticket.createdAt)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedTicket(ticket)
                                                    setShowResponseModal(true)
                                                }}
                                                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                disabled={isSubmitting}
                                            >
                                                <MessageSquare className="h-4 w-4" />
                                            </button>
                                            {ticket.status !== TicketStatus.FINALIZED && (
                                                <button
                                                    onClick={() => handleFinalizeSale(ticket.id)}
                                                    className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                                    disabled={isSubmitting}
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredTickets.length === 0 && (
                    <div className="text-center py-12">
                        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                            {searchTerm || filterStatus !== "all"
                                ? "No tickets found matching your criteria"
                                : "No tickets available"}
                        </p>
                    </div>
                )}

                {/* Pagination */}
                <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-xs text-gray-700">
                        Showing {filteredTickets.length} of {tickets.length} tickets
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50 disabled:opacity-50"
                            disabled
                        >
                            Previous
                        </button>
                        <button className="px-3 py-1 bg-emerald-500 text-white rounded text-xs">1</button>
                        <button
                            className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50 disabled:opacity-50"
                            disabled
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Create Ticket Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-lg w-full">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Create New Ticket</h2>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                                disabled={isSubmitting}
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            {createSuccess ? (
                                <div className="text-center py-8">
                                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ticket Created Successfully!</h3>
                                    <p className="text-gray-600">The ticket has been created and will use templates from your cart.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-medium mb-2">Inquiry Description:</label>
                                        <textarea
                                            value={newTicketInquiry}
                                            onChange={(e) => setNewTicketInquiry(e.target.value)}
                                            placeholder="Describe your inquiry or customization requirements..."
                                            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <button
                                        onClick={handleCreateTicket}
                                        disabled={isSubmitting || !newTicketInquiry.trim()}
                                        className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Creating Ticket...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4" />
                                                Create Ticket
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Response Modal */}
            {showResponseModal && selectedTicket && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Respond to Ticket</h2>
                            <button
                                onClick={() => setShowResponseModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                                disabled={isSubmitting}
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6 max-h-96 overflow-y-auto">
                            <div className="mb-4">
                                <h3 className="font-medium text-gray-900 mb-2">Ticket: {selectedTicket.ticketNumber}</h3>
                                <p className="text-gray-600 mb-4">{selectedTicket.inquiry}</p>

                                <div className="mb-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Templates:</h4>
                                    <div className="space-y-2">
                                        {selectedTicket.templates.map((template) => (
                                            <div key={template.id} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-700">{template.title}</span>
                                                <span className="text-emerald-600">${template.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {selectedTicket.adminResponse && (
                                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                        <h4 className="font-medium text-gray-900 mb-1">Previous Response:</h4>
                                        <p className="text-gray-600 text-sm">{selectedTicket.adminResponse}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2">Admin Response:</label>
                                <textarea
                                    value={adminResponse}
                                    onChange={(e) => setAdminResponse(e.target.value)}
                                    placeholder="Enter your response to the customer..."
                                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <button
                                onClick={handleRespondToTicket}
                                disabled={isSubmitting || !adminResponse.trim()}
                                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Sending Response...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        Send Response
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">{error}</p>
                </div>
            )}
        </div>
    )
}

