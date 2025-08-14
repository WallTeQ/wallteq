import { useState, useEffect } from "react"
import { AnimatedSection } from "../components/AnimatedSection"
import { ShoppingCartComponent } from "../components/template/ShoppingCart"
import { FiltersComponent } from "../components/template/Filters"
import { MobileActionBar } from "../components/template/MobileAction"
import { MobileFilters } from "../components/template/MobileFilter"
import { MobileCart } from "../components/template/MobileCart"
import { ViewModeToggle } from "../components/template/ViewMode"
import { TemplatesGrid } from "../components/template/TemplatGrid"
import { templates } from "../data/template"
import { Template, Cart, ViewMode, SortBy } from "../data/template"

const TemplatesPage = () => {
  const [cart, setCart] = useState<Cart>({})
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortBy>("name")
  const [filteredTemplates, setFilteredTemplates] = useState(templates)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showMobileCart, setShowMobileCart] = useState(false)

  useEffect(() => {
    let filtered = templates

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((template) => template.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredTemplates(filtered)
  }, [selectedCategory, searchTerm, sortBy])

  const addToCart = (templateId: string) => {
    setCart((prev) => ({ ...prev, [templateId]: (prev[templateId] || 0) + 1 }))
  }

  const removeFromCart = (templateId: string) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[templateId] > 1) {
        newCart[templateId]--
      } else {
        delete newCart[templateId]
      }
      return newCart
    })
  }

  const generateTicket = () => {
    const cartItems = Object.entries(cart).map(([id, quantity]) => {
      const template = templates.find((t) => t.id === id)
      return { template, quantity }
    })

    console.log("Generating ticket for templates:", cartItems)
    alert("Template ticket generated! Our team will customize your selected templates and contact you shortly.")
    setCart({})
    setShowMobileCart(false)
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSearchTerm("")
    setShowMobileFilters(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-16">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-8 lg:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent mb-6">
            Premium Templates
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our curated collection of professional website templates. Each design is crafted for excellence
            and customized to match your brand perfectly.
          </p>
        </AnimatedSection>

        {/* Mobile Action Bar */}
        <MobileActionBar
          cart={cart}
          showMobileFilters={showMobileFilters}
          onToggleFilters={() => setShowMobileFilters(!showMobileFilters)}
          onToggleCart={() => setShowMobileCart(!showMobileCart)}
        />

        {/* Mobile Filters Dropdown */}
        <MobileFilters
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          showMobileFilters={showMobileFilters}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortBy}
          onClose={() => setShowMobileFilters(false)}
          onClearFilters={clearFilters}
        />

        {/* Mobile Cart */}
        <MobileCart
          cart={cart}
          showMobileCart={showMobileCart}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          onGenerateTicket={generateTicket}
          onClose={() => setShowMobileCart(false)}
        />

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Desktop Sidebar - Cart + Filters */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <AnimatedSection animation="slide-right" delay={200}>
              <div className="sticky top-24 space-y-6">
                <ShoppingCartComponent
                  cart={cart}
                  onAddToCart={addToCart}
                  onRemoveFromCart={removeFromCart}
                  onGenerateTicket={generateTicket}
                />
                <FiltersComponent
                  searchTerm={searchTerm}
                  selectedCategory={selectedCategory}
                  sortBy={sortBy}
                  viewMode={viewMode}
                  onSearchChange={setSearchTerm}
                  onCategoryChange={setSelectedCategory}
                  onSortChange={setSortBy}
                  onViewModeChange={setViewMode}
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Templates Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-gray-300 font-medium">
                Showing <span className="text-white font-bold">{filteredTemplates.length}</span> of{" "}
                <span className="text-white font-bold">{templates.length}</span> templates
              </p>

              <ViewModeToggle
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>

            <TemplatesGrid
              templates={filteredTemplates}
              cart={cart}
              viewMode={viewMode}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplatesPage