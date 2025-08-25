import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubItems, setOpenSubItems] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Templates", link: "/templates", subItems: [] },

    {
      name: "Company",
      link: "/about",
      subItems: [
        { name: "About Us", route: "/about" },
        // { name: "Our Team", route: "/team" },
        { name: "Why us", route: "/why-us" },
        // { name: "Careers", route: "/careers" },
      ],
    },
    {
      name: "Services",
      link: "/services",
      subItems: [
        { name: "Hardware Installation", route: "/services/hardware-installation" },
        { name: "IP Network Installation", route: "/services/network-surveillance" },
        { name: "IT Deployment", route: "/services/it-deployment" },
        { name: "Equipment Maintenance", route: "/services/equipment-maintenance" },
        { name: "Mobile & Software Development", route: "/services/software-development" },
        {name: "Website Development", route: "/services/web-development"},
        { name: "Network Cabling", route: "/services/network-cabling" },
        { name: "IT Upgrades", route: "/services/it-upgrades" },
      ],
    },
    // {
    //   name: "Case Studies",
    //   subItems: [
    //     { name: "Success Stories", route: "/success-stories" },
    //     { name: "Client Testimonials", route: "/client-testimonials" },
    //   ],
    // },
    // {
    //   name: "IT Blog",
    //   link: "/",
    //   subItems: [
    //     { name: "Tech News", route: "/tech-news" },
    //     { name: "Industry Insights", route: "/industry-insights" },
    //   ],
    // },
    {
      name: "Contact Us",
      link: "/contact-us",
      subItems: [
        { name: "Get Started", route: "/contact-us" },
        // { name: "Support", route: "/support" },
      ],
    },
  ];

  const handleLinkClick = (linkName, route) => {
    setActiveLink(linkName);
    if (route) {
      window.scrollTo(0, 0); // Scroll to top before navigation
      navigate(route);
      // Only close the mobile menu when actually navigating to a route
      setIsMobileMenuOpen(false);
    }
  };

  const toggleSubItems = (linkName) => {
    if (openSubItems === linkName) {
      setOpenSubItems(null);
    } else {
      setOpenSubItems(linkName);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center py-3 lg:py-4">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="WallTeQ Logo"
                className="h-8 w-auto lg:h-10"
              />
              <span className="text-xl lg:text-2xl font-bold text-blue-950 tracking-tight">
                WALLTEQ
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div className="relative group" key={link.name}>
                <button
                  className={`flex items-center space-x-1 py-2 text-sm font-medium transition-colors ${
                    activeLink === link.name
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={() => handleLinkClick(link.name)}
                >
                  <Link to={link.link}>
                    <span>{link.name}</span>
                  </Link>
                  {link.subItems.length > 0 && (
                    <svg
                      className="w-4 h-4 transition-transform group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
                {link.subItems.length > 0 && (
                  <div className="absolute left-0 mt-2 w-48 z-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-2 bg-white rounded-lg shadow-xl border border-gray-100">
                      {link.subItems.map((subItem) => (
                        <a
                          key={subItem.name}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(subItem.name, subItem.route);
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* login or logout button based on user state */}
            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex bg-blue-800 items-center gap-3 text-white px-5 py-1 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 group "
              >
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="inline-flex bg-blue-800 items-center gap-3 text-white px-5 py-1 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 group "
              >
                <span>Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="bg-gray-50 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="border-b border-gray-200 last:border-0"
            >
              <button
                className={`w-full flex justify-between items-center py-3 text-sm font-medium ${
                  activeLink === link.name ? "text-blue-600" : "text-gray-700"
                }`}
                onClick={() => {
                  if (link.subItems.length > 0) {
                    toggleSubItems(link.name);
                  } else {
                    handleLinkClick(link.name, link.link);
                  }
                }}
              >
                {link.name}
                {link.subItems.length > 0 && (
                  <svg
                    className="w-4 h-4 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      transform:
                        openSubItems === link.name
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>
              {link.subItems.length > 0 && openSubItems === link.name && (
                <div className="ml-4 mb-3">
                  {link.subItems.map((subItem) => (
                    <a
                      key={subItem.name}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(subItem.name, subItem.route);
                      }}
                      className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                    >
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className="inline-flex bg-blue-800 items-center gap-3 text-white px-5 py-1 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 group "
            >
              <span>Logout</span>
            </button>
          ) : (
            <Link
              to="/auth"
              className="inline-flex bg-blue-800 items-center gap-3 text-white px-5 py-1 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 group "
            >
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
