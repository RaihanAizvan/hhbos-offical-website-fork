import {
  useLayoutEffect,
  useEffect,
  useRef,
  RefAttributes,
  ForwardRefExoticComponent,
} from "react";
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
  LucideProps,
  CircleCheckBig,
} from "lucide-react";
import serviceHealthcare from "@/assets/service-healthcare.jpg";
import serviceFinance from "@/assets/service-finance.jpg";
import serviceDatabase from "@/assets/service-database.jpg";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
}

const Services = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const benefitsRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".service-card") as HTMLElement[];

      cards.forEach((card) => {
        const image = card.querySelector(".service-image");
        const headingChars = card.querySelectorAll(".char");
        const features = card.querySelectorAll(".feature-item");
        const benefitItems = card.querySelectorAll(".benefit-item");

        gsap.fromTo(
          benefitItems,
          {
            opacity: 0,
            y: 16,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: {
              each: 0.12,
              ease: "power3.out",
            },
            duration: 0.4,
            scrollTrigger: {
              trigger: benefitItems[0],
              start: "top 40%",
              toggleActions: "play none none none",
            },
          },
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
          },
        });

        // Image Mask Reveal
        tl.fromTo(
          image,
          {
            clipPath: "inset(100% 0 0 0)",
            scale: 1.2,
          },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
            willChange: "transform, clip-path",
          },
        );

        // Heading Split Reveal
        tl.from(
          headingChars,
          {
            y: 10,
            opacity: 0,
            stagger: 0.03,
            duration: 0.6,
            ease: "expo.out",
          },
          "-=0.8",
        );

        // Feature List Stagger
        tl.from(
          features,
          {
            opacity: 0,
            x: -10,
            stagger: 0.2,
            duration: 0.3,
            ease: "power3.out",
          },
          "-=0.4",
        );
      });
    },
    { scope: sectionRef },
  );

  const services: Service[] = [
    {
      icon: HeartPulse,
      title: "Revenue Cycle Management (RCM)",
      description:
        "End-to-end RCM solutions that optimize healthcare financial performance.",
      image: serviceHealthcare,
      features: [
        "Patient Registration & Eligibility Verification",
        "Medical Coding & Billing",
        "Claims Submission & Follow-up",
        "Payment Posting & Denial Management",
        "AR Analysis & Reporting",
      ],
      benefits: [
        "Faster reimbursements",
        "Minimized denials",
        "Enhanced revenue transparency",
      ],
    },
    {
      icon: DollarSign,
      title: "Finance & Accounts Services",
      description:
        "Streamline your financial processes with our end-to-end accounting solutions.",
      image: serviceFinance,
      features: [
        "Bookkeeping & General Ledger Maintenance",
        "Accounts Payable & Receivable",
        "Payroll Processing",
        "Financial Planning & Analysis",
        "Tax Compliance & Audit Support",
        "Budgeting & Forecasting",
      ],
      benefits: [
        "Reduced operational cost",
        "Real-time financial insights",
        "Compliance with accounting standards",
      ],
    },
    {
      icon: Database,
      title: "Database Administration & Management",
      description:
        "Secure, scalable, and efficient data solutions for business continuity and analytics.",
      image: serviceDatabase,
      features: [
        "Database Setup & Configuration (SQL, Oracle, MySQL)",
        "Performance Tuning & Optimization",
        "Backup & Recovery Management",
        "Data Migration & Integration",
        "Security & Access Control",
        "24/7 Monitoring & Support",
      ],
      benefits: [
        "Improved data reliability",
        "Minimized downtime",
        "Enhanced decision-making through analytics",
      ],
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: "Expert Professionals",
      description: "Skilled accountants, RCM specialists, and DBAs",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Demonstrated ROI and efficiency gains",
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "ISO 27001-aligned data protection policies",
    },
    {
      icon: Globe,
      title: "Global Delivery Model",
      description: "Seamless support for clients worldwide",
    },
    {
      icon: Settings,
      title: "Technology Driven",
      description: "Latest software tools and automation",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70svh] flex items-center justify-center overflow-hidden bg-black mt-20"
      >
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="/video/web%20bg.webm" type="video/webm" />
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
                Our Services
              </span>
              <div className="h-px w-16 bg-primary" />
            </div>

            <h1 className="services-hero-text text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Comprehensive{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                Outsourcing Solutions
              </span>
            </h1>

            <p className="services-hero-text text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Expert services in RCM, Finance, and Database Administration
              tailored to your business needs
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section ref={sectionRef} className="bg-[#050505] text-white px-6">
        <div
          className="max-w-7xl mx-auto"
          style={{
            paddingBlock: "clamp(4rem, 8vw, 12rem)",
          }}
        >
          {services.map((service, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <div
                key={index}
                className="service-card grid lg:grid-cols-2 items-center gap-20 mb-[clamp(4rem,8vw,10rem)]"
              >
                {/* Image */}
                <div className={`relative ${isReverse ? "lg:order-2" : ""}`}>
                  <div className="service-image clip-hidden transform-gpu will-change-transform rounded-xl overflow-hidden bg-[#1A1A1A] border border-white/10">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${isReverse ? "lg:order-1" : ""}`}>
                  {/* Title */}
                  <h3 className="text-4xl font-semibold tracking-tight leading-tight">
                    {service.title.split("").map((char, i) => (
                      <span key={i} className="char inline-block">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </h3>

                  {/* Description */}
                  <p className="benefit-item text-white/70 leading-relaxed max-w-md">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="feature-item flex items-start gap-3 text-white/80"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-slate-400 to-gray-200 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Benefits */}
                  <div
                    ref={benefitsRef}
                    className="pt-6 border-t border-white/10"
                  >
                    <h4 className="benefit-item  text-lg font-semibold text-primary mb-4">
                      Benefits:
                    </h4>

                    <ul className="grid sm:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, i) => (
                        <li
                          key={i}
                          className="benefit-item flex items-center gap-3 text-white/70"
                        >
                          <CircleCheckBig size={14} color="#fe7216" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px]" />

        <div className="relative container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                Our Services
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Experience the advantages of partnering with industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="group h-full"
                >
                  <Card
                    className="
            h-full
            bg-black/50
            backdrop-blur-sm
            border border-white/10
            hover:border-primary/50
            transition-all
            duration-300
          "
                  >
                    <CardContent className="p-6 space-y-4 h-full flex flex-col">
                      {/* Icon */}
                      <div
                        className="
                w-14 h-14
                rounded-full
                bg-primary/10
                flex items-center justify-center
                group-hover:bg-primary/20
                transition-colors
                duration-300
              "
                      >
                        <Icon className="w-7 h-7 text-primary" />
                      </div>

                      {/* Title */}
                      <h3
                        className="
                text-lg
                md:text-xl
                font-semibold
                text-white
                group-hover:text-primary
                transition-colors
                duration-300
              "
                      >
                        {benefit.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="
                text-white/60
                text-sm
                leading-relaxed
                flex-grow
              "
                      >
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
