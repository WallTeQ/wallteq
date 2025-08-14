"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface AnimatedSectionProps {
    children: React.ReactNode
    className?: string
    animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right"
    delay?: number
}

export function AnimatedSection({ children, className = "", animation = "fade-up", delay = 0 }: AnimatedSectionProps) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true)
                    }, delay)
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            },
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [delay])

    const getAnimationClasses = () => {
        const baseClasses = "transition-all duration-1000 ease-out"

        if (!isVisible) {
            switch (animation) {
                case "fade-up":
                    return `${baseClasses} opacity-0 translate-y-8`
                case "fade-in":
                    return `${baseClasses} opacity-0`
                case "slide-left":
                    return `${baseClasses} opacity-0 -translate-x-8`
                case "slide-right":
                    return `${baseClasses} opacity-0 translate-x-8`
                default:
                    return `${baseClasses} opacity-0 translate-y-8`
            }
        }

        return `${baseClasses} opacity-100 translate-y-0 translate-x-0`
    }

    return (
        <div ref={ref} className={`${getAnimationClasses()} ${className}`}>
            {children}
        </div>
    )
}
