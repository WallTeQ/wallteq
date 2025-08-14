// components/TemplatesGrid.tsx
import { Template, Cart, ViewMode } from "../../data/template"
import { TemplateCard } from "./Card"
import { TemplateListItem } from "./TemplateList"
import { EmptyState } from "./EmptyState"
import { AnimatedSection } from "../AnimatedSection"

interface TemplatesGridProps {
    templates: Template[]
    cart: Cart
    viewMode: ViewMode
    onAddToCart: (templateId: string) => void
    onRemoveFromCart: (templateId: string) => void
    onClearFilters: () => void
}

export const TemplatesGrid = ({
    templates,
    cart,
    viewMode,
    onAddToCart,
    onRemoveFromCart,
    onClearFilters,
}: TemplatesGridProps) => {
    if (templates.length === 0) {
        return <EmptyState onClearFilters={onClearFilters} />
    }

    return (
        <div className={
            viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-6"
        }>
            {templates.map((template, index) => (
                <AnimatedSection key={template.id} animation="fade-up" delay={index * 50}>
                    {viewMode === "grid" ? (
                        <TemplateCard
                            template={template}
                            cart={cart}
                            onAddToCart={onAddToCart}
                            onRemoveFromCart={onRemoveFromCart}
                        />
                    ) : (
                        <TemplateListItem
                            template={template}
                            cart={cart}
                            onAddToCart={onAddToCart}
                            onRemoveFromCart={onRemoveFromCart}
                        />
                    )}
                </AnimatedSection>
            ))}
        </div>
    )
}