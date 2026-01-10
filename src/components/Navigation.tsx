import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ChevronDown, Globe } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", hasDropdown: false },
    { name: "Services", path: "/services", hasDropdown: false },
    { name: "About Us", path: "/about", hasDropdown: false },
    { name: "Industries", path: "/#", hasDropdown: false },
    { name: "Contact", path: "/contact", hasDropdown: false },
  ];

  const isActive = (path: string) => location.pathname === path;
  console.log("is active:", isActive);

  return (
    <nav className="px-6 lg:px-12 py-4 sticky top-0 z-50 border-b border-white/10 backdrop-blur-md glass">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              className="h-12 lg:h-14"
              src={"/images/logo.png"}
              alt="HH Back Office Services"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group flex items-center gap-1 text-sm font-normal text-white/80 hover:text-white transition-colors"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}

                  {/* Bottom Border Animation */}
                  <span
                    className={`
            absolute -bottom-1 left-0 h-[2px] w-full origin-left 
            bg-orange-500 transform scale-x-0 
            transition-transform duration-300 ease-out
            group-hover:scale-x-100
            ${active ? "scale-x-100" : ""}
          `}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side - Search & Location */}
          <div className="hidden lg:flex items-center gap-6">
            <button className="text-white/80 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <Globe></Globe>
              </svg>
              India
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
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
          <div className="lg:hidden py-6 animate-fade-in border-t border-white/10 mt-4">
            {navLinks.map((link) => (
              <>
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-3 block text-base font-normal transition-colors hover:text-white ${
                    isActive(link.path) ? "text-orange-500" : "text-white/80"
                  }`}
                >
                  {link.name}
                </Link>
              </>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
