import { useState, useEffect } from "react"
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    Ticket,
    FileText,
    BarChart3,
    Settings,
    Globe,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Package,
    CreditCard,
    TrendingUp,
    UserCheck,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useUsers } from "../../hook/useUser"
import { useTemplates } from "../../hook/useTemplate"
import {useTickets} from "../../hook/useTicket"
interface SidebarProps {
    onLogout: () => void
}

export function Sidebar({ onLogout }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [userInfo, setUserInfo] = useState({ name: "Admin User", email: "admin@wall-teq.com" })
    const location = useLocation()

    // Get user data from the hook
    const { users, loading: usersLoading } = useUsers()
    const { templates, loading: templatesLoading } = useTemplates()
    const { tickets, loading: ticketsLoading } = useTickets()
    const userCount = users.length
    const templateCount = templates.length
    const ticketCount = tickets.length

    // Define menu items inside component to access userCount
    const menuItems = [
        {
            title: "Overview",
            icon: LayoutDashboard,
            href: "/dashboard",
            badge: null,
        },
        {
            title: "Users",
            icon: Users,
            href: "/dashboard/users",
            badge: usersLoading ? "..." : userCount.toString(),
        },
        {
            title: "Templates",
            icon: Package,
            href: "/dashboard/templates",
            badge: templatesLoading ? "..." : templateCount.toString(),
        },
        {
            title: "Tickets",
            icon: Ticket,
            href: "/dashboard/tickets",
            badge: ticketsLoading ? "..." : ticketCount.toString(),
        },
        // {
        //     title: "Orders",
        //     icon: CreditCard,
        //     href: "/dashboard/orders",
        //     badge: "8",
        // },
        // {
        //     title: "Reports",
        //     icon: BarChart3,
        //     href: "/dashboard/reports",
        //     badge: null,
        // },
        // {
        //     title: "Settings",
        //     icon: Settings,
        //     href: "/dashboard/settings",
        //     badge: null,
        // },
    ]

    useEffect(() => {
        // Get user info from localStorage (works with both real and mock data)
        const user = localStorage.getItem("user")
        if (user) {
            try {
                const userData = JSON.parse(user)
                setUserInfo({
                    name: userData.name || "Admin User",
                    email: userData.email || "admin@wall-teq.com",
                })
            } catch (e) {
                console.log("Error parsing user data:", e)
            }
        }
    }, [])

    return (
        <div
            className={`bg-gray-900 border-r border-gray-800 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"
                } flex flex-col h-max-screen`}
        >
            {/* Header */}
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <Link to="/" className="flex items-center space-x-2">
                            <img src="/logo.png" alt="" className="h-8 w-8" />
                            <span className="text-xl font-bold text-white">Wall-Teq</span>
                        </Link>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                    >
                        {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                                }`}
                        >
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            {!isCollapsed && (
                                <>
                                    <span className="flex-1">{item.title}</span>
                                    {item.badge && (
                                        <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">{item.badge}</span>
                                    )}
                                </>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <UserCheck className="h-4 w-4 text-black" />
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1">
                            <p className="text-white text-sm font-medium">{userInfo.name}</p>
                            <p className="text-gray-400 text-xs">{userInfo.email}</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    )
}
