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
  Clock,
  Users,
} from "lucide-react";
import serviceHealthcare from "@/assets/service-healthcare.jpg";
import serviceFinance from "@/assets/service-finance.jpg";
import serviceDatabase from "@/assets/service-database.jpg";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
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

  const services = [
    {
      icon: HeartPulse,
      title: "Revenue Cycle Management",
      description:
        "End-to-end RCM solutions for healthcare providers. From patient registration to final payment, we optimize every step.",
      image: serviceHealthcare,
      features: [
        "Medical Billing & Coding",
        "Claims Processing",
        "Denial Management",
        "Payment Posting",
        "AR Follow-up",
        "Credentialing",
      ],
      stats: { value: "40%", label: "Revenue Increase" },
    },
    {
      icon: DollarSign,
      title: "Finance & Accounts",
      description:
        "Comprehensive bookkeeping and financial management services. We handle your finances so you can focus on growth.",
      image: serviceFinance,
      features: [
        "Accounts Payable/Receivable",
        "Payroll Processing",
        "Financial Reporting",
        "Tax Preparation",
        "Budgeting & Forecasting",
        "Audit Support",
      ],
      stats: { value: "98%", label: "Accuracy Rate" },
    },
    {
      icon: Database,
      title: "Database Administration",
      description:
        "Expert database management and optimization. We ensure your data is secure, accessible, and performing at peak efficiency.",
      image: serviceDatabase,
      features: [
        "Database Design & Setup",
        "Performance Optimization",
        "Backup & Recovery",
        "Security Management",
        "24/7 Monitoring",
        "Migration Services",
      ],
      stats: { value: "99.9%", label: "Uptime" },
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Increased Efficiency",
      description: "Streamlined processes and faster turnaround times",
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "ISO 27001 certified with enterprise-grade encryption",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock monitoring and assistance",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Certified professionals with industry expertise",
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
              Expert services in RCM, Finance, and Database Administration tailored to your business needs
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section ref={servicesRef} className="section-padding bg-black">
        <div className="container-custom space-y-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isReverse = index % 2 !== 0;

            return (
              <div
                key={index}
                className={`service-card grid lg:grid-cols-2 gap-12 items-center ${
                  isReverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Side */}
                <div className={`${isReverse ? "lg:order-2" : ""}`}>
                  <div className="relative group overflow-hidden rounded-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    {/* Stats Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                        <div className="text-4xl font-bold text-primary mb-1">
                          {service.stats.value}
                        </div>
                        <div className="text-white/60 text-sm uppercase tracking-wider">
                          {service.stats.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`space-y-6 ${isReverse ? "lg:order-1" : ""}`}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    {service.title}
                  </h2>

                  <p className="text-white/70 text-lg leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-white/80 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="h-full bg-black/50 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6 space-y-4">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
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
