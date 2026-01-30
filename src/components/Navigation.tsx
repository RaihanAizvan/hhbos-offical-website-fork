import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isLight = resolvedTheme === "light";

  const lastScrollY = useRef(0);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Specialties", path: "/Specialties" },
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current + 5) setIsVisible(false);
      if (currentScrollY < lastScrollY.current - 5) setIsVisible(true);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b border-border backdrop-blur-md bg-background/70 transition-transform duration-300 ease-out ${
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

            {/* Desktop links */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                const isServices = link.path === "/services";

                if (!isServices) {
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative group text-sm font-medium transition-colors ${
                        active
                          ? "text-primary"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      {link.name}
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-primary to-orange-500 transform origin-left transition-transform duration-300 ease-out ${
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  );
                }

                return (
                  <div key={link.path} className="relative group pb-3 -mb-3">
                    <Link
                      to={link.path}
                      className={`relative text-sm font-medium transition-colors ${
                        active
                          ? "text-primary"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      {link.name}
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-primary to-orange-500 transform origin-left transition-transform duration-300 ease-out ${
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>

                    <div
                      className={cn(
                        "absolute left-0 top-full mt-0 w-[340px] rounded-3xl border backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.65)] opacity-0 pointer-events-none translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
                        isLight
                          ? "border-slate-200 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.15)]"
                          : "border-white/10 bg-black/95"
                      )}
                      style={{ paddingTop: "0.5rem" }}
                      onMouseLeave={() => {
                        setHoveredService(null);
                        setHoveredIndex(null);
                      }}
                    >
                      <div className="p-5">
                        <p
                          className={cn(
                            "text-xs uppercase tracking-[0.2em]",
                            isLight ? "text-slate-500" : "text-white"
                          )}
                        >
                          Services
                        </p>
                        <div className="mt-3 space-y-2">
                          {services.map((service, index) => (
                            <div key={service.slug} className="relative">
                              <Link
                                to={`/services/${service.slug}`}
                                onMouseEnter={() => {
                                  setHoveredService(service.slug);
                                  setHoveredIndex(index);
                                }}
                                className={cn(
                                  "block px-2 py-1 text-sm transition",
                                  hoveredService === service.slug
                                    ? "text-primary"
                                    : isLight
                                      ? "text-slate-700 hover:text-primary"
                                      : "text-foreground/80 hover:text-primary"
                                )}
                              >
                                {service.title}
                              </Link>

                              {hoveredService === service.slug && (
                                <div
                                  className={cn(
                                    "absolute left-full top-0 ml-4 w-[280px] rounded-2xl border p-4 shadow-[0_25px_60px_rgba(0,0,0,0.35)]",
                                    isLight
                                      ? "border-slate-200 bg-white"
                                      : "border-border bg-popover/95"
                                  )}
                                >
                                  <p
                                    className={cn(
                                      "text-xs uppercase tracking-[0.2em]",
                                      isLight ? "text-slate-400" : "text-foreground/60"
                                    )}
                                  >
                                    Features
                                  </p>
                                  <div className="mt-3 space-y-2">
                                    {service.featureDetails.slice(0, 5).map((feature) => (
                                      <Link
                                        key={feature.slug}
                                        to={`/services/${service.slug}/${feature.slug}`}
                                        className={cn(
                                          "block rounded-xl px-2 py-1 text-xs transition",
                                          isLight
                                            ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                            : "text-foreground/70 hover:text-foreground hover:bg-muted"
                                        )}
                                      >
                                        {feature.title}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/60 text-foreground/70 backdrop-blur hover:text-foreground transition-colors"
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link
                to="/contact"
                className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg hover:opacity-90 transition"
              >
                Request a Consultation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/60 text-foreground/80 backdrop-blur"
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button
                className="text-foreground"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                {isOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-6 border-t border-border mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-base transition-colors ${
                    isActive(link.path)
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 block text-center px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white font-semibold"
              >
                Request a Consultation
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
