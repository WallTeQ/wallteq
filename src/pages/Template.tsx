import { useState, useEffect } from "react"
import { Search, ShoppingCart, Plus, Minus, X, Send, CheckCircle, Loader2, ExternalLink, Filter, ChevronDown } from "lucide-react"
import { useTemplates } from "../hook/useTemplate"
import { useCart } from "../hook/useCart"
import { useTickets } from "../hook/useTicket"
import { Template } from "../types/template-type"
import { useCategories } from "../hook/useCategories"
import { useAuth } from "../contexts/AuthContext"

const TemplatesPage = () => {
  const { templates, loading: templatesLoading, error: templatesError, fetchPublishedTemplates } = useTemplates()
  const {
    cart,
    addTemplateToCart,
    removeFromCart,
    getCartTotal,
    getCartItemCount,
    isTemplateInCart,
    loading: cartLoading,
  } = useCart()
  const { user } = useAuth()
  const { createTicket, loading: ticketLoading } = useTickets()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [ticketInquiry, setTicketInquiry] = useState("")
  const [ticketSuccess, setTicketSuccess] = useState(false)
  const [sortBy, setSortBy] = useState("name")

  const userId = user?.id || null

  // Filter published templates only
  const publishedTemplates = templates.filter((template) => template?.status === "published")
  const { categories: apiCategories, loading: categoriesLoading } = useCategories()

  // Apply filters
  const filteredTemplates = publishedTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || template?.category?.name === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = async (templateId: string) => {
    if (!userId) {
      alert("Please log in to add templates to cart")
      return
    }

    try {
      await addTemplateToCart(templateId, userId)
    } catch (error) {
      console.error("Failed to add to cart:", error)
    }
  }

  const handleRemoveFromCart = async (templateId: string) => {
    try {
      await removeFromCart(templateId)
    } catch (error) {
      console.error("Failed to remove from cart:", error)
    }
  }

  const handleCreateTicket = async () => {
    if (!ticketInquiry.trim()) {
      alert("Please enter your inquiry")
      return
    }

    if (!cart || cart.templates.length === 0) {
      alert("Please add templates to your cart before creating a ticket")
      return
    }

    try {
      await createTicket({ inquiry: ticketInquiry })
      setTicketSuccess(true)
      setTicketInquiry("")
      setTimeout(() => {
        setShowTicketModal(false)
        setTicketSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Failed to create ticket:", error)
      alert("Failed to create ticket. Please try again.")
    }
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All")
    setSortBy("name")
  }

  useEffect(() => {
    fetchPublishedTemplates()
  }, [])

  if (templatesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-16 flex items-center justify-center">
        <div className="text-white text-xl">Loading templates...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent mb-4">
            Premium Templates
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover our curated collection of professional website templates. Each design is crafted for excellence and
            customized to match your brand perfectly.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Desktop Cart & Filters Section - Left Sidebar */}
            <div className="lg:col-span-1 order-1">
              {/* Cart Section */}
              <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
                <h3 className="flex items-center text-white text-lg font-semibold mb-4">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Cart ({getCartItemCount()}){cartLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                </h3>

                {getCartItemCount() === 0 ? (
                  <div className="text-center py-6">
                    <ShoppingCart className="h-10 w-10 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No templates selected</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                      {cart?.templates.map((template) => (
                        <div
                          key={template.id}
                          className="flex justify-between items-center bg-gray-700 p-3 rounded text-sm"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">{template.title}</p>
                            <p className="text-xs text-gray-400">{template.category?.name || "Uncategorized"}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <p className="font-bold text-blue-400">${template.price}</p>
                            <button
                              onClick={() => handleRemoveFromCart(template.id)}
                              className="text-red-400 hover:text-red-300 p-1"
                              disabled={cartLoading}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-600 pt-4">
                      <div className="flex justify-between items-center text-lg font-bold mb-4">
                        <span className="text-white">Total:</span>
                        <span className="text-blue-400">${getCartTotal()}</span>
                      </div>

                      <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded font-medium flex items-center justify-center transition-all duration-200 disabled:opacity-50"
                        onClick={() => setShowTicketModal(true)}
                        disabled={cartLoading}
                      >
                        {cartLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="mr-2 h-4 w-4" />
                        )}
                        Create Ticket
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Desktop Filters */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-white text-lg font-semibold mb-6">Filters</h3>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-3">Categories</label>
                  <div className="space-y-1">
                    {apiCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${selectedCategory === category.name
                          ? "bg-blue-600 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-700"
                          }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Templates Grid */}
            <div className="lg:col-span-3 order-2">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-400">Showing {filteredTemplates.length} templates</p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    {/* Template Image */}
                    <div className="relative bg-gray-700 h-48">
                      {template.media && template.media.length > 0 ? (
                        <img
                          src={template.media[0]?.fileUrl}
                          alt={template.media[0]?.fileName}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <img
                          src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(template.title)}`}
                          alt={template.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                          {template?.category?.name || "Template"}
                        </span>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="py-6 px-4 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-white">{template?.title}</h3>
                        <span className="text-lg font-bold text-blue-400">${template?.price}</span>
                      </div>

                      <p className="text-gray-300 mb-4 line-clamp-2">{template?.description}</p>

                      <div className="flex flex-col gap-3">
                        {template?.demoUrl && (
                          <a
                            href={template?.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full border-2 border-blue-500 text-white hover:bg-blue-500 hover:text-white py-2 px-3 rounded font-medium transition-all duration-200 flex items-center justify-center text-sm"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Live Demo
                          </a>
                        )}

                        {isTemplateInCart(template.id) ? (
                          <button
                            onClick={() => handleRemoveFromCart(template.id)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded font-medium transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50"
                            disabled={cartLoading}
                          >
                            {cartLoading ? (
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <Minus className="h-4 w-4 mr-1" />
                            )}
                            Remove from Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(template.id)}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded font-medium transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50"
                            disabled={cartLoading}
                          >
                            {cartLoading ? (
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            ) : (
                              <ShoppingCart className="h-4 w-4 mr-1" />
                            )}
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Cart - Always Visible at Top */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center text-white text-lg font-semibold">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Cart ({getCartItemCount()}){cartLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              </h3>
              <span className="text-blue-400 font-bold">${getCartTotal()}</span>
            </div>

            {getCartItemCount() === 0 ? (
              <p className="text-gray-400 text-sm text-center py-2">No templates selected</p>
            ) : (
              <>
                <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
                  {cart?.templates.map((template) => (
                    <div
                      key={template.id}
                      className="flex justify-between items-center bg-gray-700 p-2 rounded text-sm"
                    >
                      <span className="text-white truncate flex-1">{template.title}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-400 font-medium">${template.price}</span>
                        <button
                          onClick={() => handleRemoveFromCart(template.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          disabled={cartLoading}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium flex items-center justify-center transition-all duration-200 disabled:opacity-50"
                  onClick={() => setShowTicketModal(true)}
                  disabled={cartLoading}
                >
                  {cartLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Create Ticket
                </button>
              </>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 text-sm">{filteredTemplates.length} templates</p>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="bg-gray-800 text-white px-4 py-2 rounded flex items-center border border-gray-700"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Mobile Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors"
              >
                {/* Template Image */}
                <div className="relative bg-gray-700 h-48">
                  {template.media && template.media.length > 0 ? (
                    <img
                      src={template.media[0]?.fileUrl}
                      alt={template.media[0]?.fileName}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <img
                      src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(template.title)}`}
                      alt={template.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {template?.category?.name || "Template"}
                    </span>
                  </div>
                </div>

                {/* Template Info */}
                <div className="py-6 px-4 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">{template?.title}</h3>
                    <span className="text-lg font-bold text-blue-400">${template?.price}</span>
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-2">{template?.description}</p>

                  <div className="flex flex-col gap-3">
                    {template?.demoUrl && (
                      <a
                        href={template?.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full border-2 border-blue-500 text-white hover:bg-blue-500 hover:text-white py-2 px-3 rounded font-medium transition-all duration-200 flex items-center justify-center text-sm"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live Demo
                      </a>
                    )}

                    {isTemplateInCart(template.id) ? (
                      <button
                        onClick={() => handleRemoveFromCart(template.id)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded font-medium transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50"
                        disabled={cartLoading}
                      >
                        {cartLoading ? (
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        ) : (
                          <Minus className="h-4 w-4 mr-1" />
                        )}
                        Remove from Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(template.id)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded font-medium transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50"
                        disabled={cartLoading}
                      >
                        {cartLoading ? (
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        ) : (
                          <ShoppingCart className="h-4 w-4 mr-1" />
                        )}
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No templates found matching your criteria.</p>
          </div>
        )}

        {/* Mobile Filter Modal - Centered Overlay */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 lg:hidden">
            <div className="bg-slate-800 rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-600">
                <h3 className="text-white text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-700 border border-gray-600 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === "All"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                        }`}
                    >
                      All
                    </button>
                    {apiCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.name
                            ? "bg-blue-600 text-white"
                            : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                          }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                  <button className="text-blue-400 text-sm mt-3 hover:text-blue-300">
                    Show all categories
                  </button>
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-slate-700 border border-gray-600 text-white px-4 py-3 rounded-lg appearance-none focus:outline-none focus:border-blue-400 pr-10"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price">Sort by Price</option>
                      <option value="category">Sort by Category</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-600 space-y-3">
                <button
                  onClick={clearAllFilters}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ticket Creation Modal */}
        {showTicketModal && (
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
                        {cart?.templates.map((template) => (
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
        )}
      </div>
    </div>
  )
}

export default TemplatesPage