import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", path: "/about" },
      { label: "Services", path: "/services" },
      { label: "Case Studies", path: "/contact" },
      { label: "Careers", path: "/contact" },
    ],
    services: [
      { label: "Revenue Cycle Management", path: "/services" },
      { label: "Finance & Accounts", path: "/services" },
      { label: "Database Administration", path: "/services" },
      { label: "Consulting", path: "/contact" },
    ],
    resources: [
      { label: "Knowledge Hub", path: "/contact" },
      { label: "Whitepapers", path: "/contact" },
      { label: "Case Studies", path: "/contact" },
      { label: "Blog", path: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", path: "/" },
      { label: "Terms of Service", path: "/" },
      { label: "Cookie Policy", path: "/" },
      { label: "Data Security", path: "/" },
    ],
  };

  const socialLinks = [
    { name: "LinkedIn", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", url: "#" },
    { name: "Twitter", icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z", url: "#" },
    { name: "Facebook", icon: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z", url: "#" },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px]" />
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
        @keyframes wave {
          0% { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); }
          50% { clip-path: polygon(0 60%, 100% 80%, 100% 100%, 0 100%); }
          100% { clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0 100%); }
        }
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        @keyframes expandLine {
          0% { transform: scaleX(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes rotate3D {
          0% { transform: translate(-50%, -50%) rotateY(0deg) rotateX(20deg); }
          100% { transform: translate(-50%, -50%) rotateY(360deg) rotateX(20deg); }
        }
      `}</style>

      {/* Main footer content */}
      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Single Footer Section - Big Text + Nav Links */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 py-12">
          {/* Left: Big Typography with Height Reveal - Takes more space */}
          <div className="flex-1 lg:flex-[1.5]">
            <div className="space-y-1">
              {/* HH */}
              <div className="relative group cursor-pointer overflow-hidden">
                <h2 className="relative text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black leading-[0.9] tracking-tight text-white z-10" style={{ fontFamily: '"Sansita", sans-serif' }}>
                  HH
                </h2>
                <div className="absolute bottom-0 left-0 right-0 bg-primary/30 h-0 group-hover:h-full transition-all duration-700 ease-out" />
              </div>

              {/* BACK */}
              <div className="relative group cursor-pointer overflow-hidden">
                <h2 className="relative text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black leading-[0.9] tracking-tight text-white z-10" style={{ fontFamily: '"Sansita", sans-serif' }}>
                  BACK
                </h2>
                <div className="absolute bottom-0 left-0 right-0 bg-primary/30 h-0 group-hover:h-full transition-all duration-700 ease-out" />
              </div>

              {/* OFFICE */}
              <div className="relative group cursor-pointer overflow-hidden">
                <h2 className="relative text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black leading-[0.9] tracking-tight text-white z-10" style={{ fontFamily: '"Sansita", sans-serif' }}>
                  OFFICE
                </h2>
                <div className="absolute bottom-0 left-0 right-0 bg-primary/30 h-0 group-hover:h-full transition-all duration-700 ease-out" />
              </div>
            </div>
          </div>

          {/* Right: Content + Nav Links */}
          <div className="flex-1 space-y-12">
            {/* Top Content */}
            <div className="space-y-8">
              {/* Tagline */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Empowering Your Business
                </h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-md">
                  Precision, efficiency, and data intelligence through world-class outsourcing solutions. Trusted by 250+ global clients.
                </p>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <div className="text-sm text-white/80">
                  <a href="mailto:info@hhbos.com" className="hover:text-primary transition-colors">
                    info@hhbos.com
                  </a>
                </div>
                <div className="text-sm text-white/80">
                  <a href="tel:+914842917200" className="hover:text-primary transition-colors">
                    +91 0484-2917200
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-10 h-10 flex items-center justify-center"
                    aria-label={social.name}
                  >
                    <div className="absolute inset-0 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors duration-300" />
                    <svg className="relative w-5 h-5 text-white/60 group-hover:text-primary transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom: Nav Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-6 xl:gap-8">
              {/* Company */}
              <div>
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                  Company
                </h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm text-white/60 hover:text-primary transition-colors duration-300 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                  Services
                </h3>
                <ul className="space-y-3">
                  {footerLinks.services.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm text-white/60 hover:text-primary transition-colors duration-300 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm text-white/60 hover:text-primary transition-colors duration-300 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                  Legal
                </h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm text-white/60 hover:text-primary transition-colors duration-300 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <p>
              © {currentYear} HH Back Office Services Pvt Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/" className="hover:text-white/60 transition-colors">
                Sitemap
              </Link>
              <Link to="/" className="hover:text-white/60 transition-colors">
                Accessibility
              </Link>
              <Link to="/contact" className="hover:text-white/60 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
