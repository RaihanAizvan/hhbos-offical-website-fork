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
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img className="h-14 w-14" src={"/images/logo.png"} />
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional outsourcing solutions for Revenue Cycle Management,
              Finance & Accounts, and Database Administration.
            </p>

            {/* Certification Badge */}
            <div className="flex items-center gap-2 text-sm">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-medium">ISO 27001 Certified</span>
            </div>      
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-primary mt-1 shrink-0" />
                <a
                  href="mailto:info@hhbos.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@hhbos.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-1 shrink-0" />
                <a
                  href="tel:+914842917200"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +91 0484-2917200
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground">
                  Carnival Infopark, Kochi, India
                </span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="pt-2">
              <h4 className="font-semibold mb-3 text-sm">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover-scale"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover-scale"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover-scale"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-custom py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HH Back Office Services Pvt Ltd. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
