import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SplitText from "@/components/SplitText";

import {
  DollarSign,
  Calculator,
  Database,
  TrendingUp,
  Users,
  Settings,
  BarChart3,
  Handshake,
  CheckCircle2,
  Globe,
  Lock,
  ArrowRight,
  Activity,
  Briefcase,
  Stethoscope,
  Receipt,
  FileArchive,
  FileCode,
  ClipboardList,
  CircleDollarSign,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StickyVideoHero from "@/components/StickyVideoHero";
import LeadershipSection from "@/components/LeadershipSection";
import PortalCTA from "@/components/PortalCTA";
import InsightsSection from "@/components/InsightsSection";
import carouselRcm from "@/assets/carousel-rcm.jpg";
import carouselFinance from "@/assets/carousel-finance.jpg";
import carouselDatabase from "@/assets/carousel-database.jpg";
import serviceHealthcare from "@/assets/service-healthcare.jpg";
import serviceFinance from "@/assets/service-finance.jpg";
import serviceDatabase from "@/assets/service-database.jpg";
import teamFounder from "@/assets/team-founder.jpg";
import teamRcm from "@/assets/team-rcm.jpg";
import teamDatabase from "@/assets/team-database.jpg";
import { container } from "@/lib/animate";
import { useLayoutEffect } from "react";
import AnimatedContent from "@/components/AnimatedContent";
import ScrollReveal from "@/components/ScrollReveal";

const Home = () => {
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const carouselSlides = [
    {
      image: carouselRcm,
      title: "💰 RCM Services",
      subtext: "Optimize your revenue and billing processes.",
      cta: "Explore RCM Services",
      link: "/services",
    },
    {
      image: carouselFinance,
      title: "💼 Finance & Accounts Outsourcing",
      subtext: "Simplify your financial operations.",
      cta: "View Finance Services",
      link: "/services",
    },
    {
      image: carouselDatabase,
      title: "🖥️ Database Management",
      subtext: "Ensure your data is secure, scalable, and efficient.",
      cta: "Learn More",
      link: "/services",
    },
  ];

  const featureCards = [
    {
      icon: Settings,
      title: "Automation Ready",
      description:
        "Reduce manual workflow and increase productivity through automated solutions.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Dashboards",
      description:
        "Get clarity and visibility through live performance metrics.",
    },
    {
      icon: Handshake,
      title: "Dedicated Support Team",
      description:
        "A personalized support model tailored to your business needs.",
    },
    {
      icon: CheckCircle2,
      title: "Quality Audits",
      description:
        "Multiple-level quality checks ensure accuracy and compliance.",
    },
    {
      icon: Globe,
      title: "Global Operational Support",
      description:
        "Flexible engagement models suitable for international time zones.",
    },
    {
      icon: Lock,
      title: "Secure Infrastructure",
      description:
        "Enterprise-grade encryption and data handling aligned with ISO standards.",
    },
  ];

  const imageServiceCards = [
    {
      image: serviceHealthcare,
      title: "End-to-End RCM Operations",
      description:
        "Supporting healthcare providers with revenue-optimized billing life cycles.",
    },
    {
      image: serviceFinance,
      title: "Finance & Accounts Outsourcing",
      description:
        "Maintain compliance, streamline finance, and reduce operational overhead.",
    },
    {
      image: serviceDatabase,
      title: "Database Administration",
      description:
        "Ensure secure data handling with 24/7 monitoring and disaster recovery support.",
    },
  ];

  const caseStudies = [
    {
      title: "Healthcare RCM",
      icon: Activity,
      metrics: [
        "Reduced AR days across key payer groups",
        "Improved claim approval rate to 96% total",
        "Automated claim routing and workflows",
      ],
    },
    {
      title: "Finance Outsourcing",
      icon: Briefcase,
      metrics: [
        "Reduced operational cost by nearly 40%",
        "Delivered monthly closings error-free",
        "Improved audit readiness and timelines",
      ],
    },
    {
      title: "Database Management",
      icon: Database,
      metrics: [
        "Achieved stable uptime SLA of 99.9%",
        "Optimized SQL queries for faster loads",
        "Migrated production data to cloud",
      ],
    },
    {
      title: "Medical Billing Services",
      icon: Stethoscope,
      metrics: [
        "Improved clean claim submissions to 92%",
        "Reduced billing rework by close to 34%",
        "Centralized dashboard for visibility",
      ],
    },
    {
      title: "Finance & Accounts",
      icon: Calculator,
      metrics: [
        "Delivered monthly reports fully on time",
        "Reduced manual entries by nearly 48%",
        "Improved year-end close cycle by 7 days",
      ],
    },
    {
      title: "Scanning & Indexing",
      icon: FileArchive,
      metrics: [
        "Digitized 500K+ records with 98% accuracy",
        "Reduced search and access time for data",
        "Implemented secure search-ready archive",
      ],
    },
    {
      title: "Medical Coding",
      icon: FileCode,
      metrics: [
        "Improved coding accuracy to nearly 97%",
        "Reduced coding denials by almost 41%",
        "Provided ICD-10 & CPT compliance support",
      ],
    },
    {
      title: "A/R Follow-up",
      icon: ClipboardList,
      metrics: [
        "Recovered outstanding payments worth $2.1M",
        "Accelerated follow-up cycle by 55% total",
        "Improved denial appeal success to 83%",
      ],
    },
    {
      title: "Payment Posting",
      icon: CircleDollarSign,
      metrics: [
        "Automated posting using EOB and ERA files",
        "Reduced manual posting time by 62% total",
        "Improved reconciliation speed by 50%",
      ],
    },
  ];

  const teamMembers = [
    {
      image: teamFounder,
      name: "Hitesh H",
      title: "Founder & Director",
      bio: "15+ years in outsourcing, revenue cycle operations, and enterprise transformation.",
    },
    {
      image: teamRcm,
      name: "Senior RCM Manager",
      title: "Operations Lead",
      bio: "Expert in US medical billing, AR management, and coding compliance.",
    },
    {
      image: teamDatabase,
      name: "Database Architect",
      title: "Technical Lead",
      bio: "Specialist in SQL, Oracle, cloud migrations, and data security.",
    },
  ];

  const blogPosts = [
    {
      title: "Why Outsourcing Finance Functions Improves Profitability",
      excerpt:
        "Discover how strategic outsourcing can reduce costs and enhance financial accuracy.",
      date: "Dec 2024",
    },
    {
      title: "Top RCM Trends Shaping the Healthcare Industry in 2025",
      excerpt:
        "Stay ahead with the latest developments in revenue cycle management and healthcare billing.",
      date: "Nov 2024",
    },
    {
      title: "Database Security Best Practices Every Business Should Know",
      excerpt:
        "Essential strategies to protect your data infrastructure from modern threats.",
      date: "Oct 2024",
    },
  ];

  const highlights = [
    {
      icon: DollarSign,
      title: "RCM Services",
      description:
        "Optimize your revenue and billing processes with end-to-end Revenue Cycle Management solutions.",
    },
    {
      icon: Calculator,
      title: "Finance & Accounts Outsourcing",
      description:
        "Simplify your financial operations with expert bookkeeping, payroll, and compliance services.",
    },
    {
      icon: Database,
      title: "Database Management",
      description:
        "Ensure your data is secure, scalable, and efficient with 24/7 monitoring and support.",
    },
  ];

  const whyChooseUs = [
    {
      icon: Users,
      text: "Expert Professionals",
      subtext: "Skilled accountants, RCM specialists, and DBAs",
    },
    {
      icon: Settings,
      text: "Technology Driven",
      subtext: "Latest software tools and automation",
    },
    {
      icon: Lock,
      text: "Data Security",
      subtext: "ISO 27001-aligned data protection policies",
    },
    {
      icon: TrendingUp,
      text: "Proven Results",
      subtext: "Demonstrated ROI and efficiency gains",
    },
    {
      icon: Globe,
      text: "Global Delivery Model",
      subtext: "Seamless support for clients worldwide",
    },
  ];

  const { scrollY } = useScroll();
  // Video moves upward slower (60% speed) - negative values for upward movement
  const videoY = useTransform(scrollY, [0, 2000], [0, -1200]);

  return (
    <div className="min-h-[100svh] relative">
      {/* Global Video Background - Parallax Effect */}
      <motion.div
        className="fixed inset-0 -z-50 w-screen h-[100svh] overflow-hidden"
        style={{ y: videoY }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        >
          <source src="/video/background.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Sticky Video Hero with Parallax */}
      <StickyVideoHero />

      {/* Services Showcase - Tall Cards */}
      <section className="section-padding relative bg-transparent -mt-32">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Services
            </h2>
            <p className="text-lg text-white/70">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 - RCM */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative overflow-hidden rounded-lg bg-zinc-900 min-h-[500px] flex flex-col cursor-pointer group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={serviceHealthcare}
                  alt="Revenue Cycle Management"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="text-xs uppercase tracking-wider text-primary mb-3">
                  HEALTHCARE
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight mb-4">
                  Revenue Cycle Management
                </h3>
                <p className="text-white/70 mb-6 flex-1">
                  Supporting healthcare providers with revenue-optimized billing
                  life cycles. End-to-end RCM operations for maximum efficiency.
                </p>
                <Link
                  to="/services"
                  className="text-primary flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  <span>Learn more</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8 4L16 12L8 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Card 2 - Finance */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative overflow-hidden rounded-lg bg-zinc-900 min-h-[500px] flex flex-col cursor-pointer group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={serviceFinance}
                  alt="Finance & Accounts"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="text-xs uppercase tracking-wider text-primary mb-3">
                  FINANCE
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight mb-4">
                  Finance & Accounts Outsourcing
                </h3>
                <p className="text-white/70 mb-6 flex-1">
                  Maintain compliance, streamline finance, and reduce
                  operational overhead with expert bookkeeping and financial
                  management.
                </p>
                <Link
                  to="/services"
                  className="text-primary flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  <span>Learn more</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8 4L16 12L8 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Card 3 - Database */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative overflow-hidden rounded-lg bg-zinc-900/50 backdrop-blur-sm min-h-[500px] flex flex-col cursor-pointer group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={serviceDatabase}
                  alt="Database Administration"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="text-xs uppercase tracking-wider text-primary mb-3">
                  TECHNOLOGY
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight mb-4">
                  Database Administration
                </h3>
                <p className="text-white/70 mb-6 flex-1">
                  Ensure secure data handling with 24/7 monitoring and disaster
                  recovery support. Scalable and performance-optimized
                  solutions.
                </p>
                <Link
                  to="/services"
                  className="text-primary flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  <span>Learn more</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8 4L16 12L8 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Core Service */}
      {/* <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 400 },
                }}
              >
                <Card
                  key={index}
                  className="h-full border-2 hover:border-primary transition-all duration-300 hover-scale animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="h-full p-6 space-y-4">
                    <div className="h-14 w-14 rounded-lg bg-secondary flex items-center justify-center">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                    <Link
                      to="/services"
                      className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                      Learn more →
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Industries We Serve */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized outsourcing support across key industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Healthcare",
              "Finance & Banking",
              "Retail & E-commerce",
              "IT & Software",
              "Manufacturing",
              "Real Estate",
            ].map((industry) => (
              <div
                key={industry}
                className="rounded-xl border border-border bg-card px-6 py-5 text-center"
              >
                <p className="font-semibold text-foreground">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding gradient-subtle">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose HH Back Office Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Your trusted partner for business excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center text-center space-y-3 p-4"
              >
                <motion.div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-primary" />
                </motion.div>
                <p className="font-semibold text-foreground">{item.text}</p>
                {item.subtext && (
                  <p className="text-sm text-muted-foreground">
                    {item.subtext}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <LeadershipSection />

      {/* Portal CTA Section */}
      <PortalCTA />

      {/* Insights Tiles Section */}
      <InsightsSection />

      {/* Testimonial Section */}
      <section className="section-padding gradient-subtle">
        <div className="container-custom">
          <Card className="bg-secondary border-none">
            <CardContent className="p-8 md:p-12 text-center">
              <p className="text-xl md:text-2xl text-foreground italic mb-6">
                Partnering with
                <span className="font-bold text-orange-500 px-2">HH</span>
                Back Office Services Pvt Ltd. helped us achieve 30% faster
                financial reporting."
              </p>
              <p className="text-muted-foreground font-medium">— Client, CFO</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
