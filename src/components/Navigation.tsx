import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;


   useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at top
      if (currentScrollY < 10) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Scroll down → hide
      if (currentScrollY > lastScrollY.current + 5) {
        setIsVisible(false);
      }

      // Scroll up → show
      if (currentScrollY < lastScrollY.current - 5) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b border-white/10 backdrop-blur-md glass transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="px-6 lg:px-12 py-4">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                className="h-12 lg:h-14"
                src="/images/logo.png"
                alt="HH Back Office Services"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm transition-colors ${
                    isActive(link.path)
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-6">
              <button className="text-white/80 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>

              <button className="text-sm text-white/80 hover:text-white flex items-center gap-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                India
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
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

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-6 border-t border-white/10 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-base transition-colors ${
                    isActive(link.path)
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
