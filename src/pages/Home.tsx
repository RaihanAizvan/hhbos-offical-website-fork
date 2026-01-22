import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  TrendingUp,
  Users,
  Settings,
  Globe,
  Lock,
} from "lucide-react";

import StickyVideoHero from "@/components/StickyVideoHero";
import LeadershipSection from "@/components/LeadershipSection";
import PortalCTA from "@/components/PortalCTA";
import InsightsSection from "@/components/InsightsSection";
import serviceFinance from "@/assets/carousel-finance.jpg";
import serviceRcm from "@/assets/service-rcm.jpg";
import serviceDatabase from "@/assets/service-database.jpg";
import { useLayoutEffect } from "react";
import ServiceCard from "@/components/feature/ServiceCard";

const Home = () => {
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const services = [
    {
      category: "FINANCE",
      title: "Finance & Accounts",
      description:
        " Maintain compliance, streamline finance, and reduce operational overhead with expert bookkeeping and financial management.",
      imageUrl: serviceFinance,
    },
    {
      category: "HEALTHCARE",
      title: "Revenue Cycle Management",
      description:
        "Supporting healthcare providers with revenue-optimized billing life cycles. End-to-end RCM operations for maximum efficiency.",
      imageUrl: serviceRcm,
    },
    {
      category: "TECHNOLOGY",
      title: "Database Administration",
      description:
        "Ensure secure data handling with 24/7 monitoring and disaster recovery support Scalable and performance-optimized solutions.",
      imageUrl: serviceDatabase,
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

  return (
    <div className="min-h-[100svh] relative">
      {/* Global Video Background - Parallax Effect */}
      <div className="absolute inset-0 -z-50 w-screen h-[100svh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        >
          <source src="/video/background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Sticky Video Hero with Parallax */}
      <StickyVideoHero />

      {/* Services Showcase - Tall Cards */}
      <section className="section-padding relative bg-transparent">
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
            {services.map(({ category, title, imageUrl, description }) => {
              return (
                <ServiceCard
                  key={category}
                  category={category}
                  title={title}
                  description={description}
                  imageUrl={imageUrl}
                />
              );
            })}
          </div>
        </div>
      </section>

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
