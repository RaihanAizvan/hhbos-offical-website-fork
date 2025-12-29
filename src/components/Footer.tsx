import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
  };

  return (
  <footer className="bg-secondary text-foreground">
      <div className="container-custom py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-5">
            <Link to="/" className="inline-flex items-center space-x-2">
              <img 
                className="h-12 w-12 sm:h-14 sm:w-14" 
                src={"/images/logo.png"}
                alt="Company Logo"
              />
            </Link>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pr-0 sm:pr-4">
              Professional outsourcing solutions for Revenue Cycle Management,
              Finance & Accounts, and Database Administration.
            </p>

            {/* Certification Badge */}
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Award className="h-5 w-5 text-primary shrink-0" />
              <span className="font-medium">ISO 27001 Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="text-base sm:text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-muted-foreground hover:text-primary transition-colors inline-block"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-5 sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-bold">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 sm:mt-1 shrink-0" />
                <a
                  href="mailto:info@hhbos.com"
                  className="text-muted-foreground hover:text-primary transition-colors break-all sm:break-normal"
                >
                  info@hhbos.com
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 sm:mt-1 shrink-0" />
                <a
                  href="tel:+914842917200"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +91 0484-2917200
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 sm:mt-1 shrink-0" />
                <span className="text-muted-foreground">
                  Carnival Infopark, Kochi, India
                </span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="pt-2 sm:pt-3">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-custom py-4 sm:py-5 md:py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} HH Back Office Services Pvt Ltd. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
