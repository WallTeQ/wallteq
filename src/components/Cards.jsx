import { Code, PieChart, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeatureCards() {
  const features = [
    {
      title: "What We Do",
      icon: Code,
      description:
        "Technology can be complicated, but we've seen it all before and can help you with any IT issue.",
      cta: "View Our Services",
      href: "/services",
    },
    {
      title: "Who We Help?",
      icon: PieChart,
      description:
        "Our vertical solutions expertise allows your business to streamline workflow, and increase productivity.",
      cta: "Industries We Serve",
      href: "/services",
    },
    {
      title: "Why Choose Us",
      icon: UserCheck,
      description:
        "We have a proven process to help you move your business forward and we're with you every step of the way.",
      cta: "Find Out More",
      href: "/why-us",
    },
  ];

  return (
    <div className="container mx-auto  py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white  shadow-xl p-8 text-center flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold text-[#1a2e4c] mb-6">
              {feature.title}
            </h2>
            <div className="mb-6 p-4 rounded-full bg-[#1a2e4c]/10">
              <feature.icon className="w-8 h-8 text-[#1a2e4c]" />
            </div>
            <p className="text-gray-600 mb-6">{feature.description}</p>
            <Link
              to={feature.href}
              className="text-[#3B82F6] hover:text-[#00bfff]/80 font-medium inline-flex items-center group"
            >
              {feature.cta}
              <svg
                className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
