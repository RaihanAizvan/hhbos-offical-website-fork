import { useLayoutEffect, useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import {
  HeartPulse,
  DollarSign,
  Database,
  CheckCircle,
  TrendingUp,
  Shield,
  Users,
  Globe,
  Settings,
} from "lucide-react";
import serviceHealthcare from "@/assets/service-healthcare.jpg";
import serviceFinance from "@/assets/service-finance.jpg";
import serviceDatabase from "@/assets/service-database.jpg";

gsap.registerPlugin(ScrollTrigger);

const Industries = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-hero-text",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      if (servicesRef.current) {
        const cards = servicesRef.current.querySelectorAll(".service-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const industries = [
    {
      id: "healthcare",
      title: "Healthcare",
      tagline: "Smarter Revenue, Better Patient Outcomes",
      image: serviceHealthcare,
      description:
        "We help hospitals, clinics, and healthcare providers maximize revenue while reducing administrative burden and compliance risk.",

      problems: [
        "High claim denial rates",
        "Delayed reimbursements",
        "Complex coding & billing rules",
        "Data security & HIPAA compliance",
      ],

      solutions: [
        "End-to-end Revenue Cycle Management",
        "Medical coding & billing automation",
        "Denial management and AR recovery",
        "HIPAA compliant data handling",
      ],

      outcomes: [
        "30–40% faster reimbursements",
        "Lower claim rejection rate",
        "Higher cash flow stability",
      ],
    },

    {
      id: "finance",
      title: "Finance & Banking",
      tagline: "Accuracy, Compliance, and Financial Intelligence",
      image: serviceFinance,
      description:
        "We support banks, NBFCs, and finance teams with accounting, compliance, reporting, and financial intelligence.",

      problems: [
        "Manual accounting errors",
        "Regulatory compliance pressure",
        "Delayed financial reports",
        "Data silos",
      ],

      solutions: [
        "Automated bookkeeping & reconciliations",
        "Compliance-ready financial reporting",
        "Payroll & tax support",
        "Financial analytics dashboards",
      ],

      outcomes: [
        "Audit-ready financials",
        "Lower compliance risk",
        "Real-time financial visibility",
      ],
    },

    {
      id: "retail",
      title: "Retail & E-commerce",
      tagline: "Real-Time Insights for High-Volume Businesses",
      image: serviceDatabase,
      description:
        "We help retailers and e-commerce brands manage finance, inventory, payments, and customer data at scale.",

      problems: [
        "High transaction volumes",
        "Payment reconciliation issues",
        "Inventory data mismatches",
        "Revenue leakage",
      ],

      solutions: [
        "Sales & payment reconciliation",
        "Inventory finance tracking",
        "Revenue & margin reporting",
        "Customer and order database management",
      ],

      outcomes: [
        "Accurate daily revenue",
        "Better margin control",
        "Reduced financial leakage",
      ],
    },

    {
      id: "it",
      title: "IT & Software",
      tagline: "Scalable Data and Financial Operations",
      image: serviceDatabase,
      description:
        "We support SaaS, IT services, and software companies with financial ops and data infrastructure.",

      problems: [
        "Subscription revenue tracking",
        "Complex billing cycles",
        "Rapid data growth",
        "Security risks",
      ],

      solutions: [
        "Subscription revenue accounting",
        "Usage-based billing support",
        "Database optimization",
        "Data security & backups",
      ],

      outcomes: [
        "Accurate MRR & ARR",
        "Scalable backend operations",
        "Lower system downtime",
      ],
    },

    {
      id: "manufacturing",
      title: "Manufacturing",
      tagline: "Cost Control & Operational Visibility",
      image: serviceFinance,
      description:
        "We help manufacturers control costs, manage finance, and gain visibility into production economics.",

      problems: [
        "High operational costs",
        "Inventory valuation issues",
        "Manual accounting",
        "Delayed financial insights",
      ],

      solutions: [
        "Cost accounting",
        "Inventory & asset tracking",
        "Payroll and vendor payments",
        "Financial reporting",
      ],

      outcomes: [
        "Better cost control",
        "Improved profit margins",
        "Faster management reporting",
      ],
    },

    {
      id: "real-estate",
      title: "Real Estate",
      tagline: "Financial Clarity Across Properties",
      image: serviceFinance,
      description:
        "We help real estate companies manage leasing, payments, expenses, and property-level profitability.",

      problems: [
        "Rent tracking",
        "Expense management",
        "Property-wise profitability",
        "Tax & compliance complexity",
      ],

      solutions: [
        "Rent & payment reconciliation",
        "Property accounting",
        "Tax & compliance support",
        "Financial dashboards",
      ],

      outcomes: [
        "Clear cash flow",
        "Higher asset ROI",
        "Simpler financial operations",
      ],
    },
  ];


  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70svh] flex items-center justify-center overflow-hidden bg-black"
      >
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="/video/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
          {/* Bottom fade gradient mask */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
        </div>

        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,107,31,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,31,0.2) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 container-custom text-center px-6">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="services-hero-text flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-primary" />
              <span className="text-primary text-sm uppercase tracking-[0.3em]">
                Industries We Serve
              </span>
              <div className="h-px w-16 bg-primary" />
            </div>

            <h1 className="services-hero-text text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Powering Businesses Across{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                Multiple Industries
              </span>
            </h1>

            <p className="services-hero-text text-lg md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Helping organizations improve profitability, compliance, and
              operational efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section ref={servicesRef} className="section-padding bg-black">
        <div className="container-custom space-y-20">
          {industries.map((industry, index) => {
            const isReverse = index % 2 !== 0;
            return (
              <div
                key={industry.id}
                className={`service-card grid lg:grid-cols-2 gap-12 items-center`}
              >
                {/* Image */}
                <div className={isReverse ? "lg:order-2" : ""}>
                  <div className="relative group overflow-hidden rounded-2xl">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-[420px] object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${isReverse ? "lg:order-1" : ""}`}>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    {industry.title}
                  </h2>

                  <p className="text-primary font-semibold uppercase tracking-wider text-sm">
                    {industry.tagline}
                  </p>

                  <p className="text-white/70 text-lg leading-relaxed">
                    {industry.description}
                  </p>

                  {/* Problems */}
                  <div className="pt-4">
                    <h3 className="text-white font-semibold mb-2">
                      Industry Challenges
                    </h3>
                    <ul className="space-y-2 text-white/70">
                      {industry.problems.map((p, i) => (
                        <li key={i}>• {p}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-white font-semibold mb-2">
                      How We Help
                    </h3>
                    <ul className="space-y-2 text-primary">
                      {industry.solutions.map((s, i) => (
                        <li key={i}>✔ {s}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcomes */}
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-white font-semibold mb-2">
                      Business Outcomes
                    </h3>
                    <ul className="space-y-2 text-green-400">
                      {industry.outcomes.map((o, i) => (
                        <li key={i}>▲ {o}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Industries;
