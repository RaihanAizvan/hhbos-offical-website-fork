import { useState, useLayoutEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Calculator,
  Database,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Users,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Globe,
  Atom,
  DatabaseIcon,
  LeafyGreen,
  PanelTop,
  Eclipse,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import LogoLoop from "@/components/LogoLoop";

const Services = () => {
  const [expandedService, setExpandedService] = useState<number | null>(0);

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  /* ---------------- Animations ---------------- */
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  /* ---------------- Data ---------------- */
  const services = [
    {
      icon: DollarSign,
      title: "Revenue Cycle Management (RCM)",
      description:
        "End-to-end RCM solutions that optimize healthcare financial performance.",
      services: [
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
      icon: Calculator,
      title: "Finance & Accounts Services",
      description:
        "Streamline your financial processes with our end-to-end accounting solutions.",
      services: [
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
      services: [
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

  const industries = [
    { name: "Healthcare", icon: "🏥" },
    { name: "Finance & Banking", icon: "🏦" },
    { name: "E-commerce", icon: "🛒" },
    { name: "IT & Software", icon: "💻" },
    { name: "Manufacturing", icon: "🏭" },
    { name: "Real Estate", icon: "🏢" },
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: "Expert Professionals",
      description:
        "Skilled accountants, RCM specialists, and database administrators with real-world experience.",
    },
    {
      icon: Cpu,
      title: "Technology Driven",
      description:
        "Powered by the latest software tools, automation, and analytics for efficiency and accuracy.",
    },
    {
      icon: ShieldCheck,
      title: "Data Security",
      description:
        "ISO 27001–aligned data protection policies ensuring confidentiality and compliance.",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description:
        "Demonstrated ROI, improved cash flow, and measurable efficiency gains for clients.",
    },
    {
      icon: Globe,
      title: "Global Delivery Model",
      description:
        "Seamless global support with flexible engagement models for clients worldwide.",
    },
  ];

  const techLogos = [
    { node: <Atom />, title: "React", href: "https://react.dev" },
    { node: <LeafyGreen />, title: "MongoDb", href: "https://nextjs.org" },
    {
      node: <PanelTop />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: <Eclipse />,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="gradient-subtle section-padding text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Comprehensive solutions designed to transform your business operations
        </p>
      </section>

      {/* Services Accordion */}
      <section className="section-padding bg-background">
        <div className="container-custom space-y-6">
          {services.map((service, index) => (
            <Card key={index} className="border-2">
              <CardHeader
                className="cursor-pointer"
                onClick={() =>
                  setExpandedService(expandedService === index ? null : index)
                }
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <service.icon className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-bold">{service.title}</h3>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  {expandedService === index ? <ChevronUp /> : <ChevronDown />}
                </div>
              </CardHeader>

              {expandedService === index && (
                <CardContent className="grid md:grid-cols-2 gap-8">
                  <ul>
                    {service.services.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <ul>
                    {service.benefits.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <motion.div
          className="container-custom grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {whyChooseUs.map((item, i) => (
            <motion.div key={i} variants={cardVariants}>
              <Card className="border-2 text-center p-6">
                <item.icon className="h-8 w-8 mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Industries */}
      <section className="section-padding gradient-subtle">
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
        <motion.div
          className="container-custom grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {industries.map((industry, i) => (
            <motion.div key={i} variants={cardVariants}>
              <Card className="border-2 text-center p-6">
                <div className="text-4xl mb-2">{industry.icon}</div>
                <p className="font-semibold">{industry.name}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-hero text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Let’s Discuss Your Business Needs
        </h2>
        <Button size="lg" variant="secondary" asChild>
          <a href="/contact">Schedule a Free Consultation</a>
        </Button>
      </section>
    </div>
  );
};

export default Services;
