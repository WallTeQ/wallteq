
export interface Template {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  demoUrl: string;
  features: string[];
  tags: string[];
}

export type ViewMode = "grid" | "list";
export type SortBy = "name" | "price" | "rating";
export type Cart = { [key: string]: number };

export const templates: Template[] = [
  {
    id: "1",
    name: "Corporate Pro",
    description:
      "Professional company representation with brand identity and services showcase",
    price: 299,
    rating: 5,
    image:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Corporate",
    demoUrl: "#demo-corporate-pro",
    features: [
      "Responsive Design",
      "Contact Forms",
      "Service Pages",
      "About Section",
    ],
    tags: ["business", "professional", "corporate"],
  },
  {
    id: "2",
    name: "E-Commerce Elite",
    description:
      "Complete online store with product catalogs and payment integration",
    price: 499,
    rating: 5,
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "E-commerce",
    demoUrl: "#demo-ecommerce-elite",
    features: [
      "Shopping Cart",
      "Payment Gateway",
      "Product Catalog",
      "User Accounts",
    ],
    tags: ["ecommerce", "shop", "online store"],
  },
  {
    id: "3",
    name: "Creative Portfolio",
    description:
      "Stunning showcase for artists, designers, and creative professionals",
    price: 199,
    rating: 4,
    image:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Portfolio",
    demoUrl: "#demo-creative-portfolio",
    features: ["Gallery", "Project Showcase", "Contact Form", "Blog"],
    tags: ["portfolio", "creative", "artist"],
  },
  {
    id: "4",
    name: "Restaurant Deluxe",
    description:
      "Food service business with menu display and reservation system",
    price: 349,
    rating: 5,
    image:
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Restaurant",
    demoUrl: "#demo-restaurant-deluxe",
    features: ["Menu Display", "Reservations", "Location Map", "Reviews"],
    tags: ["restaurant", "food", "dining"],
  },
  {
    id: "5",
    name: "Real Estate Pro",
    description:
      "Property listings with advanced search and filter functionality",
    price: 599,
    rating: 5,
    image:
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Real Estate",
    demoUrl: "#demo-realestate-pro",
    features: [
      "Property Search",
      "Listings",
      "Agent Profiles",
      "Mortgage Calculator",
    ],
    tags: ["real estate", "property", "listings"],
  },
  {
    id: "6",
    name: "Healthcare Plus",
    description: "Medical practice with appointment booking and patient portal",
    price: 449,
    rating: 4,
    image:
      "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Healthcare",
    demoUrl: "#demo-healthcare-plus",
    features: [
      "Appointment Booking",
      "Patient Portal",
      "Services",
      "Doctor Profiles",
    ],
    tags: ["healthcare", "medical", "clinic"],
  },
  {
    id: "7",
    name: "Education Hub",
    description:
      "School or university with course management and student portal",
    price: 399,
    rating: 5,
    image:
      "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Education",
    demoUrl: "#demo-education-hub",
    features: ["Course Catalog", "Student Portal", "Faculty", "Events"],
    tags: ["education", "school", "university"],
  },
  {
    id: "8",
    name: "Fitness Center",
    description:
      "Gym or fitness center with class schedules and membership management",
    price: 329,
    rating: 4,
    image:
      "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fitness",
    demoUrl: "#demo-fitness-center",
    features: [
      "Class Schedules",
      "Membership Plans",
      "Trainer Profiles",
      "Booking",
    ],
    tags: ["fitness", "gym", "health"],
  },
  {
    id: "9",
    name: "Travel Explorer",
    description: "Travel agency with booking system and destination guides",
    price: 549,
    rating: 5,
    image:
      "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Travel",
    demoUrl: "#demo-travel-explorer",
    features: [
      "Destination Guides",
      "Booking System",
      "Reviews",
      "Itineraries",
    ],
    tags: ["travel", "tourism", "vacation"],
  },
  {
    id: "10",
    name: "Tech Blog Pro",
    description:
      "Technology blog with article management and newsletter integration",
    price: 249,
    rating: 4,
    image:
      "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Blog",
    demoUrl: "#demo-tech-blog-pro",
    features: ["Article Management", "Newsletter", "Comments", "Categories"],
    tags: ["blog", "technology", "news"],
  },
  {
    id: "11",
    name: "Law Firm Elite",
    description: "Legal practice with case studies and consultation booking",
    price: 479,
    rating: 5,
    image:
      "https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Legal",
    demoUrl: "#demo-law-firm-elite",
    features: [
      "Case Studies",
      "Consultation Booking",
      "Attorney Profiles",
      "Practice Areas",
    ],
    tags: ["legal", "law", "attorney"],
  },
  {
    id: "12",
    name: "Nonprofit Impact",
    description:
      "Charity organization with donation system and volunteer portal",
    price: 299,
    rating: 5,
    image:
      "https://images.pexels.com/photos/6590818/pexels-photo-6590818.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Nonprofit",
    demoUrl: "#demo-nonprofit-impact",
    features: [
      "Donation System",
      "Volunteer Portal",
      "Events",
      "Impact Stories",
    ],
    tags: ["nonprofit", "charity", "donation"],
  },
  {
    id: "13",
    name: "Fashion Boutique",
    description:
      "Fashion and clothing store with style gallery and shopping features",
    price: 429,
    rating: 4,
    image:
      "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Fashion",
    demoUrl: "#demo-fashion-boutique",
    features: ["Style Gallery", "Shopping Cart", "Size Guide", "Lookbook"],
    tags: ["fashion", "clothing", "boutique"],
  },
  {
    id: "14",
    name: "Construction Pro",
    description:
      "Construction company with project portfolio and service showcase",
    price: 379,
    rating: 5,
    image:
      "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Construction",
    demoUrl: "#demo-construction-pro",
    features: ["Project Portfolio", "Services", "Team", "Quote Request"],
    tags: ["construction", "building", "contractor"],
  },
  {
    id: "15",
    name: "Photography Studio",
    description: "Professional photography with gallery and booking system",
    price: 319,
    rating: 4,
    image:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Photography",
    demoUrl: "#demo-photography-studio",
    features: ["Photo Gallery", "Booking System", "Packages", "Client Portal"],
    tags: ["photography", "studio", "gallery"],
  },
];

export const categories = [
  "All",
  "Corporate",
  "E-commerce",
  "Portfolio",
  "Restaurant",
  "Real Estate",
  "Healthcare",
  "Education",
  "Fitness",
  "Travel",
  "Blog",
  "Legal",
  "Nonprofit",
  "Fashion",
  "Construction",
  "Photography",
];
