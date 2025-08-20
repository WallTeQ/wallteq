import { useState } from "react"
import { Search, Filter, Download, Eye, Package, DollarSign, Calendar, CreditCard } from "lucide-react"

interface OrderItem {
    id: string
    name: string
    type: "template" | "service"
    price: number
    quantity: number
}

interface Order {
    id: string
    customerName: string
    customerEmail: string
    status: "pending" | "processing" | "completed" | "cancelled" | "refunded"
    paymentStatus: "pending" | "paid" | "failed" | "refunded"
    paymentMethod: "credit_card" | "paypal" | "bank_transfer"
    items: OrderItem[]
    subtotal: number
    tax: number
    total: number
    orderDate: string
    completedDate?: string
    trackingNumber?: string
}

const mockOrders: Order[] = [
    {
        id: "ORD-001",
        customerName: "John Doe",
        customerEmail: "john@company.com",
        status: "completed",
        paymentStatus: "paid",
        paymentMethod: "credit_card",
        items: [
            { id: "1", name: "Corporate Pro Template", type: "template", price: 299, quantity: 1 },
            { id: "2", name: "SEO Optimization", type: "service", price: 149, quantity: 1 },
        ],
        subtotal: 448,
        tax: 35.84,
        total: 483.84,
        orderDate: "2024-01-20T10:30:00Z",
        completedDate: "2024-01-20T14:15:00Z",
        trackingNumber: "TRK-20240120-001",
    },
    {
        id: "ORD-002",
        customerName: "Jane Smith",
        customerEmail: "jane@store.com",
        status: "processing",
        paymentStatus: "paid",
        paymentMethod: "paypal",
        items: [{ id: "3", name: "E-commerce Elite Template", type: "template", price: 499, quantity: 1 }],
        subtotal: 499,
        tax: 39.92,
        total: 538.92,
        orderDate: "2024-01-19T16:45:00Z",
        trackingNumber: "TRK-20240119-002",
    },
    {
        id: "ORD-003",
        customerName: "Robert Brown",
        customerEmail: "robert@agency.com",
        status: "completed",
        paymentStatus: "paid",
        paymentMethod: "credit_card",
        items: [
            { id: "4", name: "Portfolio Creative Template", type: "template", price: 199, quantity: 2 },
            { id: "5", name: "Custom Development", type: "service", price: 1299, quantity: 1 },
        ],
        subtotal: 1697,
        tax: 135.76,
        total: 1832.76,
        orderDate: "2024-01-18T11:20:00Z",
        completedDate: "2024-01-19T15:45:00Z",
        trackingNumber: "TRK-20240118-003",
    },
    {
        id: "ORD-004",
        customerName: "Emily Davis",
        customerEmail: "emily@creative.com",
        status: "pending",
        paymentStatus: "pending",
        paymentMethod: "bank_transfer",
        items: [
            { id: "6", name: "Restaurant Deluxe Template", type: "template", price: 349, quantity: 1 },
            { id: "7", name: "Maintenance Plan", type: "service", price: 99, quantity: 1 },
        ],
        subtotal: 448,
        tax: 35.84,
        total: 483.84,
        orderDate: "2024-01-17T08:15:00Z",
    },
    {
        id: "ORD-005",
        customerName: "David Wilson",
        customerEmail: "david@startup.io",
        status: "cancelled",
        paymentStatus: "refunded",
        paymentMethod: "credit_card",
        items: [{ id: "8", name: "Blog Modern Template", type: "template", price: 149, quantity: 1 }],
        subtotal: 149,
        tax: 11.92,
        total: 160.92,
        orderDate: "2024-01-15T14:30:00Z",
    },
]

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>(mockOrders)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState<string>("all")
    const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>("all")
    const [selectedOrders, setSelectedOrders] = useState<string[]>([])
    const [showFilters, setShowFilters] = useState(false)

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = filterStatus === "all" || order.status === filterStatus
        const matchesPaymentStatus = filterPaymentStatus === "all" || order.paymentStatus === filterPaymentStatus

        return matchesSearch && matchesStatus && matchesPaymentStatus
    })

    const handleSelectOrder = (orderId: string) => {
        setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
    }

    const handleSelectAll = () => {
        setSelectedOrders(selectedOrders.length === filteredOrders.length ? [] : filteredOrders.map((order) => order.id))
    }

    const getStatusBadge = (status: string) => {
        const styles = {
            pending: "bg-yellow-100 text-yellow-800",
            processing: "bg-blue-100 text-blue-800",
            completed: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
            refunded: "bg-gray-100 text-gray-800",
        }
        return styles[status as keyof typeof styles] || styles.pending
    }

    const getPaymentStatusBadge = (status: string) => {
        const styles = {
            pending: "bg-yellow-100 text-yellow-800",
            paid: "bg-green-100 text-green-800",
            failed: "bg-red-100 text-red-800",
            refunded: "bg-gray-100 text-gray-800",
        }
        return styles[status as keyof typeof styles] || styles.pending
    }

    const getPaymentMethodIcon = (method: string) => {
        switch (method) {
            case "credit_card":
                return <CreditCard className="h-4 w-4" />
            case "paypal":
                return <Package className="h-4 w-4" />
            case "bank_transfer":
                return <DollarSign className="h-4 w-4" />
            default:
                return <CreditCard className="h-4 w-4" />
        }
    }

    const formatDate = (dateString: string) => {
        return (
            new Date(dateString).toLocaleDateString() +
            " " +
            new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        )
    }

    const getOrderStats = () => {
        return {
            total: orders.length,
            pending: orders.filter((o) => o.status === "pending").length,
            processing: orders.filter((o) => o.status === "processing").length,
            completed: orders.filter((o) => o.status === "completed").length,
            totalRevenue: orders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.total, 0),
        }
    }

    const stats = getOrderStats()

    return (
        <div className="space-y-6">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <Package className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Processing</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.processing}</p>
                        </div>
                        <Package className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Completed</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                        </div>
                        <Package className="h-8 w-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-emerald-500" />
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
                                placeholder="Search orders..."
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
                    </div>
                </div>

                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="refunded">Refunded</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                                <select
                                    value={filterPaymentStatus}
                                    onChange={(e) => setFilterPaymentStatus(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="all">All Payment Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="failed">Failed</option>
                                    <option value="refunded">Refunded</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        setFilterStatus("all")
                                        setFilterPaymentStatus("all")
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

            {/* Orders Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Items
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrders.includes(order.id)}
                                            onChange={() => handleSelectOrder(order.id)}
                                            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{order.id}</div>
                                            {order.trackingNumber && (
                                                <div className="text-xs text-gray-500">Tracking: {order.trackingNumber}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                                            <div className="text-sm text-gray-500">{order.customerEmail}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{order.items.length} items</div>
                                        <div className="text-xs text-gray-500">
                                            {order.items
                                                .slice(0, 2)
                                                .map((item) => item.name)
                                                .join(", ")}
                                            {order.items.length > 2 && "..."}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</div>
                                        <div className="text-xs text-gray-500">Tax: ${order.tax.toFixed(2)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            {getPaymentMethodIcon(order.paymentMethod)}
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusBadge(order.paymentStatus)}`}
                                            >
                                                {order.paymentStatus}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {formatDate(order.orderDate)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button className="p-1 text-gray-400 hover:text-gray-600">
                                                <Eye className="h-4 w-4" />
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
                        Showing {filteredOrders.length} of {orders.length} orders
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
export default OrdersPage