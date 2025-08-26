import { X, Send, CheckCircle } from "lucide-react"

interface TicketModalProps {
    showTicketModal: boolean
    setShowTicketModal: (show: boolean) => void
    ticketInquiry: string
    setTicketInquiry: (inquiry: string) => void
    ticketSuccess: boolean
    cart: any
    getCartTotal: () => number
    handleCreateTicket: () => void
    ticketLoading: boolean
}

const TicketModal = ({
    showTicketModal,
    setShowTicketModal,
    ticketInquiry,
    setTicketInquiry,
    ticketSuccess,
    cart,
    getCartTotal,
    handleCreateTicket,
    ticketLoading
}: TicketModalProps) => {
    if (!showTicketModal) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-lg w-full">
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h2 className="text-xl font-semibold text-white">Create Customization Ticket</h2>
                    <button onClick={() => setShowTicketModal(false)} className="text-gray-400 hover:text-white">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6">
                    {ticketSuccess ? (
                        <div className="text-center py-8">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Ticket Created Successfully!</h3>
                            <p className="text-gray-300">
                                Your customization request has been submitted. Our team will contact you shortly. Your cart has
                                been cleared and the templates are now being prepared for customization.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">
                                <h3 className="text-white font-medium mb-2">Templates in your cart:</h3>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {cart?.templates.map((template: any) => (
                                        <div key={template.id} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-300">{template.title}</span>
                                            <span className="text-blue-400">${template.price}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 mt-2 pt-2">
                                    <div className="flex justify-between items-center font-semibold">
                                        <span className="text-white">Total:</span>
                                        <span className="text-blue-400">${getCartTotal()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-white font-medium mb-2">
                                    Describe your customization requirements:
                                </label>
                                <textarea
                                    value={ticketInquiry}
                                    onChange={(e) => setTicketInquiry(e.target.value)}
                                    placeholder="Please describe what customizations you need for these templates..."
                                    className="w-full h-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                onClick={handleCreateTicket}
                                disabled={ticketLoading || !ticketInquiry.trim()}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {ticketLoading ? (
                                    "Creating Ticket..."
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
    )
}

export default TicketModal