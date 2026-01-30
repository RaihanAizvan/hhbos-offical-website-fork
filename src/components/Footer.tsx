import { Link } from "react-router-dom";

const Footer = () => {
  // const currentYear = new Date().getFullYear();
  const currentYear = 2020;

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
      { label: "Data Analytics", path: "/services" },
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
    {
      name: "LinkedIn",
      icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
      url: "#",
    },
    {
      name: "Twitter",
      icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
      url: "#",
    },
    {
      name: "Facebook",
      icon: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
      url: "#",
    },
  ];

  return (
    <footer className="relative bg-background text-foreground overflow-hidden">
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
      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-baseline gap-2">
              <span className="text-2xl font-bold text-orange-500">HH</span>
              <span className="text-xl text-muted-foreground">
                Back Office Services Pvt Ltd
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering Businesses with Precision, Efficiency, and Data
              Intelligence.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group w-9 h-9 rounded-md border border-border bg-card/50 
                 hover:bg-orange-400 transition-all duration-300 ease-in-out
                 inline-flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-foreground 
                   transition-all duration-300 ease-out
                   group-hover:text-white
                   group-hover:scale-125"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contact
            </h3>

            <div className="space-y-2 text-sm">
              <a
                href="mailto:info@hhbos.com"
                className="text-muted-foreground hover:text-foreground transition-colors block"
              >
                info@hhbos.com
              </a>
              <a
                href="tel:+914842917200"
                className="text-muted-foreground hover:text-foreground transition-colors block"
              >
                0484-2917200
              </a>
            </div>

            <div className="space-y-3 text-xs text-muted-foreground">
              <div>
                <div className="font-semibold text-foreground">Kochi Office</div>
                <p className="leading-relaxed">
                  Phase-2 Floor-2, Carnival Infopark, Kakkanad, Kochi - 682042,
                  Kerala, India
                </p>
              </div>
              <div>
                <div className="font-semibold text-foreground">
                  Coimbatore Office
                </div>
                <p className="leading-relaxed">
                  Dc 44 & 45, 4th Floor, Tidel Park, Aerodrome Po, Coimbatore -
                  641014, Tamilnadu, India
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  Company
                </h3>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  Services
                </h3>
                <ul className="space-y-2">
                  {footerLinks.services.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              {/* <div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  Resources
                </h3>
                <ul className="space-y-2">
                  {footerLinks.resources.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}

              {/* Legal */}
              {/* <div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  Legal
                </h3>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} HH Back Office Services Pvt Ltd. All rights
              reserved.
            </p>
            <p>Designed and Developed by HHBOS Pvt Ltd</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
