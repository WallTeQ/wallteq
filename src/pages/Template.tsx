import { useState, useEffect } from "react"
import { useTemplates } from "../hook/useTemplate"
import { useCart } from "../hook/useCart"
import { useTickets } from "../hook/useTicket"
import { useCategories } from "../hook/useCategories"
import { useAuth } from "../contexts/AuthContext"
import Loader from "../components/Loader"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CartSection from "../components/template/CartSection"
import FiltersSection from "../components/template/FilterSection"
import TemplateCard from "../components/template/TemplateCard"
import TicketModal from "../components/template/TicketModal"
import MobileFilters from "../components/template/MobileFilterModal"
import { Filter } from "lucide-react"

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
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [ticketInquiry, setTicketInquiry] = useState("")
  const [ticketSuccess, setTicketSuccess] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [templateLoadingStates, setTemplateLoadingStates] = useState<Record<string, boolean>>({})

  const userId = user?.id || null

  useEffect(() => {
    fetchPublishedTemplates()
  }, [])

  const publishedTemplates = templates
  const { categories: apiCategories, loading: categoriesLoading } = useCategories()

  const filteredTemplates = publishedTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || template?.category?.name === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = async (templateId: string) => {
    if (!userId) {
      toast.error("Please log in to add templates to cart", {
        position: "top-right"
      })
      return
    }

    setTemplateLoadingStates(prev => ({ ...prev, [templateId]: true }))

    try {
      await addTemplateToCart(templateId, userId)
      toast.success("Template added to cart successfully", {
        position: "top-right"
      })
    } catch (error) {
      toast.error("Failed to add to cart", {
        position: "top-right"
      })
    } finally {
      setTemplateLoadingStates(prev => ({ ...prev, [templateId]: false }))
    }
  }

  const handleRemoveFromCart = async (templateId: string) => {
    setTemplateLoadingStates(prev => ({ ...prev, [templateId]: true }))

    try {
      await removeFromCart(templateId)
      toast.success("Template removed from cart successfully", {
        position: "top-right"
      })
    } catch (error) {
      console.error("Failed to remove from cart:", error)
    } finally {
      setTemplateLoadingStates(prev => ({ ...prev, [templateId]: false }))
    }
  }

  const handleCreateTicket = async () => {
    if (!ticketInquiry.trim()) {
      toast.error("Please enter your inquiry")
      return
    }

    if (!cart || cart.templates.length === 0) {
      toast.error("Please add templates to your cart before creating a ticket", {
        position: "top-right"
      })
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
      toast.success("Ticket created successfully", {
        position: "top-right"
      })
    } catch (error) {
      console.error("Failed to create ticket:", error)
      toast.error("Failed to create ticket. Please try again.", {
        position: "top-right"
      })
    }
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All")
    setSortBy("name")
  }

  const isTemplateLoading = (templateId: string) => {
    return templateLoadingStates[templateId] || false
  }

  if (templatesLoading && templates.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader />
          <span className="ml-3 text-gray-600">Loading templates...</span>
        </div>
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
              <CartSection
                cart={cart}
                getCartItemCount={getCartItemCount}
                getCartTotal={getCartTotal}
                cartLoading={cartLoading}
                handleRemoveFromCart={handleRemoveFromCart}
                setShowTicketModal={setShowTicketModal}
                isTemplateLoading={isTemplateLoading}
              />

              <FiltersSection
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                apiCategories={apiCategories}
              />
            </div>

            {/* Desktop Templates Grid */}
            <div className="lg:col-span-3 order-2">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-400">Showing {filteredTemplates.length} templates</p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isTemplateInCart={isTemplateInCart(template.id)}
                    isTemplateLoading={isTemplateLoading(template.id)}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Cart - Always Visible at Top */}
          <CartSection
            cart={cart}
            getCartItemCount={getCartItemCount}
            getCartTotal={getCartTotal}
            cartLoading={cartLoading}
            handleRemoveFromCart={handleRemoveFromCart}
            setShowTicketModal={setShowTicketModal}
            isTemplateLoading={isTemplateLoading}
            mobile
          />

          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 text-sm">{filteredTemplates.length} templates</p>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="bg-gray-800 text-white px-4 py-2 rounded flex items-center border border-gray-700"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Mobile Filters - Conditionally Rendered */}
          {showMobileFilters && (
            <MobileFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              apiCategories={apiCategories}
              clearAllFilters={clearAllFilters}
            />
          )}

          {/* Mobile Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isTemplateInCart={isTemplateInCart(template.id)}
                isTemplateLoading={isTemplateLoading(template.id)}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                mobile
              />
            ))}
          </div>
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No templates found matching your criteria.</p>
          </div>
        )}
        

        {/* Ticket Creation Modal */}
        <TicketModal
          showTicketModal={showTicketModal}
          setShowTicketModal={setShowTicketModal}
          ticketInquiry={ticketInquiry}
          setTicketInquiry={setTicketInquiry}
          ticketSuccess={ticketSuccess}
          cart={cart}
          getCartTotal={getCartTotal}
          handleCreateTicket={handleCreateTicket}
          ticketLoading={ticketLoading}
        />
      </div>
    </div>
  )
}

export default TemplatesPage