import { Link } from "react-router-dom"
import { AnimatedSection } from "./AnimatedSection"

const businessTypes = [
    {
        name: "Corporate Website",
        description:
            "Professional company representation with brand identity, services showcase, and contact information to build trust and credibility.",
        offset: "mt-0",
    },
    {
        name: "E-Commerce Website",
        description:
            "Complete online stores with product catalogs, shopping carts, payment processing, and inventory management systems.",
        offset: "mt-8",
    },
    {
        name: "Portfolio Website",
        description:
            "Creative showcases for artists, designers, photographers, and professionals to display their work and attract clients.",
        offset: "mt-4",
    },
    {
        name: "Nonprofit Website",
        description:
            "Mission-driven platforms for organizations to share their cause, collect donations, and engage with supporters and volunteers.",
        offset: "mt-12",
    },
    {
        name: "Blog / Content Website",
        description:
            "Publishing platforms for articles, news, guides, and multimedia content to inform and engage target audiences.",
        offset: "mt-2",
    },
    {
        name: "Service-Based Business",
        description: "Professional service promotion for consultants, agencies, freelancers, and local service providers.",
        offset: "mt-10",
    },
    {
        name: "Government Website",
        description:
            "Public sector platforms providing citizen services, information resources, and government transparency tools.",
        offset: "mt-6",
    },
    {
        name: "Educational Website",
        description:
            "Learning management systems, course platforms, and educational resources for schools, universities, and training providers.",
        offset: "mt-14",
    },
    {
        name: "Real Estate Website",
        description:
            "Property listing platforms with advanced search filters, virtual tours, and lead generation tools for agents and brokers.",
        offset: "mt-4",
    },
    {
        name: "Membership Website",
        description:
            "Exclusive content platforms requiring user registration for access to premium resources, communities, and benefits.",
        offset: "mt-8",
    },
    {
        name: "Directory / Listing",
        description:
            "Comprehensive databases of businesses, services, or resources with search, filter, and categorization functionality.",
        offset: "mt-0",
    },
    {
        name: "Event Website",
        description:
            "Event management platforms with registration, ticketing, scheduling, and attendee engagement features.",
        offset: "mt-12",
    },
    {
        name: "Landing Page",
        description:
            "Focused marketing pages designed for specific campaigns, products, or services to maximize conversion rates.",
        offset: "mt-6",
    },
    {
        name: "Media / News Website",
        description:
            "Content publishing platforms for news organizations, magazines, and media companies with multimedia support.",
        offset: "mt-10",
    },
    {
        name: "SaaS Website",
        description:
            "Software as a Service platforms showcasing features, pricing, and onboarding for subscription-based solutions.",
        offset: "mt-2",
    },
    {
        name: "Crowdfunding Website",
        description:
            "Project funding platforms connecting creators with backers, featuring campaign management and payment processing.",
        offset: "mt-8",
    },
    {
        name: "Job Board Website",
        description:
            "Employment platforms connecting job seekers with employers, featuring application tracking and candidate management.",
        offset: "mt-4",
    },
    {
        name: "Travel & Tourism",
        description:
            "Booking platforms and destination guides for hotels, flights, tours, and travel experiences with reservation systems.",
        offset: "mt-14",
    },
    {
        name: "Health & Wellness",
        description:
            "Healthcare platforms providing medical information, appointment booking, telemedicine, and wellness resources.",
        offset: "mt-6",
    },
    {
        name: "Community / Forum",
        description:
            "Discussion platforms and social networks facilitating user interaction, content sharing, and community building.",
        offset: "mt-10",
    },
]

const ServiceType = () => {
    return (
        <section id="templates" className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <AnimatedSection animation="fade-up" className="text-center mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Industries We Build For</h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        From healthcare to e-commerce, education to finance, we design and develop custom web and mobile apps that drive success across every sector.
                    </p>

                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-items-center">
                    {businessTypes.map((type, index) => (
                        <AnimatedSection
                            key={index}
                            animation="fade-up"
                            delay={index * 100}
                            className={`w-full max-w-sm ${type.offset}`}
                        >
                            <div className="bg-gray-800 border border-gray-700 hover:bg-gray-750 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/10 group h-full">
                                <div className="p-6">
                                    <h3 className="text-xl text-white font-semibold leading-tight group-hover:text-blue-400 transition-colors duration-300 ">
                                        {type.name}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">{type.description}</p>
                                   
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection animation="fade-up" delay={500} className="text-center mt-16">
                    <Link to="/templates" className="bg-blue-500 hover:opacity-80 text-white font-semibold px-8 py-3 transition-all duration-300 hover:scale-105 rounded-md">
                        View Available Templates
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    )
}
export default ServiceType
