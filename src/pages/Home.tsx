import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

const Home = () => {
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  /* ---------------- Hero Carousel ---------------- */
  const carouselSlides = [
    {
      image: carouselRcm,
      title: "Revenue Cycle Management",
      subtext:
        "Increase reimbursement efficiency and reduce claim denials with structured RCM workflows.",
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

  /* ---------------- Feature Cards ---------------- */
  const featureCards = [
    {
      icon: Settings,
      title: "Automation Ready",
      description:
        "Reduce manual workflows and increase productivity through automation.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Dashboards",
      description: "Live insights and performance visibility.",
    },
    {
      icon: Handshake,
      title: "Dedicated Support",
      description: "A personalized support model tailored to your business.",
    },
    {
      icon: CheckCircle2,
      title: "Quality Audits",
      description: "Multi-level checks ensure accuracy and compliance.",
    },
    {
      icon: Globe,
      title: "Global Operations",
      description: "Flexible engagement models across time zones.",
    },
    {
      icon: Lock,
      title: "Secure Infrastructure",
      description: "Enterprise-grade security aligned with ISO standards.",
    },
  ];

  /* ---------------- Image Services ---------------- */
  const imageServiceCards = [
    {
      image: serviceHealthcare,
      title: "End-to-End RCM Operations",
      description:
        "Revenue-optimized billing life cycles for healthcare providers.",
    },
    {
      image: serviceFinance,
      title: "Finance & Accounts Outsourcing",
      description:
        "Compliance-driven accounting with reduced operational overhead.",
    },
    {
      image: serviceDatabase,
      title: "Database Administration",
      description:
        "24/7 monitoring, security, and disaster recovery solutions.",
    },
  ];

  /* ---------------- Case Studies ---------------- */
  const caseStudies = [
    {
      title: "Healthcare RCM",
      icon: Activity,
      metrics: [
        "Reduced AR days across payer groups",
        "Claim approval rate improved to 96%",
        "Automated claim workflows",
      ],
    },
    {
      title: "Finance Outsourcing",
      icon: Briefcase,
      metrics: [
        "40% operational cost reduction",
        "Error-free monthly closings",
        "Improved audit readiness",
      ],
    },
    {
      title: "Database Management",
      icon: Database,
      metrics: [
        "99.9% uptime SLA",
        "Optimized query performance",
        "Cloud migration success",
      ],
    },
  ];

  /* ---------------- Team ---------------- */
  const teamMembers = [
    {
      image: teamFounder,
      name: "Hitesh H",
      title: "Founder & Director",
      bio: "15+ years in outsourcing, RCM operations, and enterprise transformation.",
    },
    {
      image: teamRcm,
      name: "Senior RCM Manager",
      title: "Operations Lead",
      bio: "Expert in US medical billing and AR management.",
    },
    {
      image: teamDatabase,
      name: "Database Architect",
      title: "Technical Lead",
      bio: "Specialist in SQL, cloud migration, and data security.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO CAROUSEL */}
      <section className="relative">
        <Carousel opts={{ loop: true }}>
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
                    <div className="container-custom max-w-3xl text-white space-y-6">
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        {slide.title}
                      </h2>
                      <p className="text-lg md:text-xl">{slide.subtext}</p>
                      <Button asChild size="lg" variant="secondary">
                        <Link to={slide.link}>{slide.cta}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* FEATURE CARDS */}
      <section className="section-padding bg-background">
        <div className="container-custom grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 hover:border-primary transition">
                <CardContent className="p-6 space-y-4">
                  <card.icon className="h-8 w-8 text-primary" />
                  <h3 className="font-bold text-xl">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMAGE SERVICE CARDS */}
      <section className="section-padding gradient-subtle">
        <div className="container-custom grid md:grid-cols-3 gap-8">
          {imageServiceCards.map((card, index) => (
            <Card key={index} className="overflow-hidden shadow-lg">
              <img
                src={card.image}
                alt={card.title}
                className="h-64 w-full object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">{card.title}</h3>
                <p className="text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-hero text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Business?
        </h2>
        <Button asChild size="lg" variant="secondary">
          <Link to="/contact">Schedule a Free Consultation</Link>
        </Button>
      </section>
    </div>
  );
};

export default Home;
