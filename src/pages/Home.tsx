import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SplitText from "@/components/SplitText";

import {
  DollarSign,
  Calculator,
  Database,
  TrendingUp,
  Shield,
  Users,
  Zap,
  Award,
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
import heroImage from "@/assets/hero-image.jpg";
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
      title: "Revenue Cycle Management",
      subtext:
        "Increase reimbursement efficiency and reduce claim denials with our structured RCM workflows.",
      cta: "Explore RCM Services",
      link: "/services",
    },
    {
      image: carouselFinance,
      title: "Finance & Accounts Outsourcing",
      subtext:
        "End-to-end accounting support designed for accuracy and compliance.",
      cta: "View Finance Services",
      link: "/services",
    },
    {
      image: carouselDatabase,
      title: "Database Administration",
      subtext:
        "Secure, scalable, and performance-optimized database solutions.",
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
    { icon: Users, text: "Expert Professionals" },
    { icon: Zap, text: "Technology Driven" },
    { icon: Shield, text: "ISO-aligned Data Security" },
    { icon: TrendingUp, text: "Proven Results" },
    { icon: Award, text: "Global Delivery Model" },
  ];

  return (
    <div className="min-h-screen">
      {/* Main Carousel */}
      <section className="relative w-full">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {carouselSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[500px] md:h-[600px] w-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-background/60" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="container-custom">
                      <div className="max-w-2xl space-y-6 text-white">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                          {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl text-white/90">
                          {slide.subtext}
                        </p>
                        <motion.div
                          whileHover={{ scale: 1.1, opacity: 1 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-block"
                        >
                          <Button
                            asChild
                            size="lg"
                            variant="secondary"
                            className="hover-scale"
                          >
                            <Link to={slide.link}>{slide.cta}</Link>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-subtle">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />

        <div className="container-custom section-padding relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <SplitText
                text="Empowering Businesses with Precision, Efficiency, and Data Intelligence"
                className="py-2 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
                delay={70}
                duration={0.8}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
                onLetterAnimationComplete={handleAnimationComplete}
              />

              <motion.p
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "tween",
                  stiffness: 100,
                  delay: 0.3,
                }}
                className="text-lg text-muted-foreground"
              >
                We provide end-to-end Finance & Accounts, Revenue Cycle
                Management, and Database Administration solutions that
                streamline your operations and drive measurable growth.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "tween",
                  stiffness: 100,
                  delay: 0.4,
                }}
              >
                <Button
                  asChild
                  size="lg"
                  className="gradient-hero hover-scale focus:ring-2 focus:ring-offset-2"
                >
                  <Link to="/contact">Get a Free Consultation</Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                delay: 0.3,
                stiffness: 70,
                damping: 16,
              }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={heroImage}
                alt="Team of finance and IT professionals collaborating in modern office"
                className="w-full h-auto object-cover"
                loading="lazy"
                width={1440}
                height={900}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why work with us Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
              }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Why Work With Us
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
                delay: 0.1,
              }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Experience the advantages of partnering with a trusted outsourcing
              leader
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 16,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <Card className="border border-border hover:border-primary transition-all duration-300 overflow-hidden group bg-card">
                  <CardContent className="p-6 space-y-4 relative">
                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />

                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 12,
                        delay: index * 0.05,
                      }}
                      className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors relative z-10"
                    >
                      <card.icon className="h-6 w-6 text-primary" />
                    </motion.div>

                    <h3 className="text-xl font-semibold text-foreground relative z-10">
                      {card.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed relative z-10">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Service Cards Section */}
      <section className="section-padding gradient-subtle">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Our Service Excellence
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
                delay: 0.1,
              }}
              className="text-lg text-muted-foreground"
            >
              Real solutions delivering measurable results
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {imageServiceCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 16,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-shadow duration-500 group cursor-pointer">
                  <div className="relative h-64 overflow-hidden">
                    {/* Image Parallax */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 15,
                      }}
                      className="h-full w-full"
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Gradient overlay */}
                    <motion.div
                      initial={{ opacity: 0.85 }}
                      whileHover={{ opacity: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-gradient-to-t from-primary/95 to-transparent"
                    />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 text-white flex flex-col justify-end">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 80,
                          damping: 18,
                          delay: index * 0.05,
                        }}
                      >
                        <h3 className="text-2xl font-bold mb-2 relative">
                          {card.title}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500"></span>
                        </h3>

                        <p className="text-white/90 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                          {card.description}
                        </p>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="mt-4 flex gap-3"
                        >
                          <div className="text-center">
                            <div className="text-lg font-bold">98%</div>
                            <div className="text-xs text-white/80">
                              Accuracy
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold">24/7</div>
                            <div className="text-xs text-white/80">Support</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold">100+</div>
                            <div className="text-xs text-white/80">Clients</div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Core Service */}
      <section className="section-padding bg-background">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding gradient-subtle">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Leadership Team
            </h2>
            <p className="text-lg text-muted-foreground">
              Experienced professionals driving excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 400 },
                }}
              >
                <Card
                  key={index}
                  className="h-full text-center border-2 hover:border-primary transition-all duration-300 hover-scale animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="h-full p-6 space-y-4 min-h-full">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium">{member.title}</p>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Insights & Resources
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay informed with our latest articles and industry insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => {
              // animation rules
              const fromLeft = index === 0;
              const fromBottom = index === 1;
              const fromRight = index === 2;
              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: fromLeft ? -120 : fromRight ? 120 : 0,
                    y: fromBottom ? 120 : 0,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-2 hover:border-primary transition-all duration-300 hover-scale group">
                    <CardContent className="h-full flex flex-col p-6 space-y-4">
                      {/* Top metadata */}
                      <div className="text-sm text-primary font-medium">
                        {post.date}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-muted-foreground flex-1">
                        {post.excerpt}
                      </p>

                      {/* Sticky footer area */}
                      <div className="flex items-center text-primary font-medium mt-auto">
                        <span>Read more</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section-padding gradient-subtle">
        <div className="container-custom">
          <Card className="bg-secondary border-none">
            <CardContent className="p-8 md:p-12 text-center">
              <p className="text-xl md:text-2xl text-foreground italic mb-6">
                "Partnering with HH Back Office Services Pvt Ltd helped us
                achieve 30% faster financial reporting."
              </p>
              <p className="text-muted-foreground font-medium">— Client, CFO</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-hero">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help streamline your operations and drive
            growth.
          </p>
          <Button asChild size="lg" variant="secondary" className="hover-scale">
            <Link to="/contact">Schedule a Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
