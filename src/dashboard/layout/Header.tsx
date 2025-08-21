


import { useState } from "react"
import { Search, Bell, User, ChevronDown } from "lucide-react"

interface HeaderProps {
    title: string
    subtitle?: string
}

const Header = ({ title, subtitle }: HeaderProps) => {
    const [showNotifications, setShowNotifications] = useState(false)
    const [showProfile, setShowProfile] = useState(false)

    const notifications = [
        { id: 1, message: "New ticket submitted", time: "2 min ago", unread: true },
        { id: 2, message: "User registration completed", time: "5 min ago", unread: true },
        { id: 3, message: "Template purchase completed", time: "10 min ago", unread: false },
        { id: 4, message: "Monthly report generated", time: "1 hour ago", unread: false },
    ]

    const unreadCount = notifications.filter((n) => n.unread).length

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Title */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
                </div>

                
            </div>
        </header>
    )
}

export default Header