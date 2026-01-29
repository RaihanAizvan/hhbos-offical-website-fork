import { useLayoutEffect, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { getHeroVideoSrc } from "@/lib/theme";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Eye, Heart, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const heroVideo = getHeroVideoSrc(resolvedTheme);
  const valuesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-hero-text",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        }
      );
      
      if (valuesRef.current) {
        const cards = valuesRef.current.querySelectorAll('.value-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 70%",
            }
          }
        );
      }
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: Target,
      title: "Integrity & Transparency",
      description: "Open communication and honest practices in every interaction",
    },
    {
      icon: Eye,
      title: "Accuracy & Timeliness",
      description: "Delivering precise results on schedule, every time",
    },
    {
      icon: Heart,
      title: "Innovation & Growth",
      description: "Continuous improvement and forward-thinking solutions",
    },
    {
      icon: CheckCircle,
      title: "Customer-Centric Approach",
      description: "Your success is our priority—tailored solutions that work",
    },
  ];

  const whyChooseUs = [
    "Expert professionals across Finance, RCM, and Database Administration",
    "Technology-driven workflows and automation",
    "ISO 27001-aligned data protection policies",
    "Proven results through efficiency-focused delivery",
    "Global delivery model with seamless support",
  ];

  return (
    <div className={`min-h-screen ${isLight ? "bg-background" : "bg-black"}`}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`relative min-h-[70svh] flex items-center justify-center overflow-hidden pt-20 ${
          isLight ? "bg-background" : "bg-black"
        }`}
      >
        <div className="absolute inset-0">
          <video
            key={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover ${
              isLight ? "opacity-35" : "opacity-30"
            }`}
          >
            <source src={heroVideo} type={isLight ? "video/mp4" : "video/webm"} />
          </video>
          <div className={`absolute inset-0 ${isLight ? "bg-white/35" : "bg-black/60"}`} />
          {/* Bottom fade gradient mask */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-40 pointer-events-none ${
              isLight
                ? "bg-gradient-to-t from-white via-white/80 to-transparent"
                : "bg-gradient-to-t from-black via-black/70 to-transparent"
            }`}
          />
        </div>
        
        {!isLight && (
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
        )}
        
        <div className="relative z-10 container-custom text-center px-6">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="about-hero-text flex items-center justify-center gap-4 mb-6">
              <div className={`h-px w-16 ${isLight ? "bg-orange-400" : "bg-primary"}`} />
              <span className={`text-sm uppercase tracking-[0.3em] ${isLight ? "text-orange-500" : "text-primary"}`}>
                About Us
              </span>
              <div className={`h-px w-16 ${isLight ? "bg-orange-400" : "bg-primary"}`} />
            </div>
            
            <h1
              className={`about-hero-text text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              Your Trusted Partner in
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  isLight
                    ? "from-primary via-orange-500 to-amber-500"
                    : "from-primary to-orange-500"
                }`}
              >
                {" "}
                Financial and Data Solutions
              </span>
            </h1>
            
            <p
              className={`about-hero-text text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
                isLight ? "text-slate-600" : "text-white/70"
              }`}
            >
             HH Back Office Services Pvt Ltd provides expert outsourcing in RCM, Finance & Accounts, and Database Administration.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={`section-padding ${isLight ? "bg-background" : "bg-zinc-950"}`}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className={`text-4xl md:text-5xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                Our <span className="text-primary">Story</span>
              </h2>
              <p className={`${isLight ? "text-slate-600" : "text-white/70"} leading-relaxed`}>
                With a team of experienced professionals and industry-standard technology, we ensure accuracy, compliance, and efficiency in every service we deliver.
              </p>
              <p className={`${isLight ? "text-slate-600" : "text-white/70"} leading-relaxed`}>
                <strong className={isLight ? "text-slate-900" : "text-white"}>Mission:</strong> To empower businesses with reliable, data-driven solutions that enhance productivity and profitability.
              </p>
              <p className={`${isLight ? "text-slate-600" : "text-white/70"} leading-relaxed`}>
                <strong className={isLight ? "text-slate-900" : "text-white"}>Vision:</strong> To become a globally recognized outsourcing partner for financial and data management excellence.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {whyChooseUs.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-4 border rounded-lg transition-colors duration-300 ${
                    isLight
                      ? "bg-white border-slate-200 hover:border-orange-200"
                      : "bg-black/50 border-white/10 hover:border-primary/50"
                  }`}
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className={isLight ? "text-slate-600" : "text-white/80"}>
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={valuesRef}
        className={`section-padding relative overflow-hidden ${isLight ? "bg-slate-50" : "bg-zinc-950"}`}
      >
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] ${isLight ? "bg-orange-200/40" : "bg-primary/5"}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] ${isLight ? "bg-orange-100/50" : "bg-orange-500/5"}`} />
        
        <div className="relative container-custom">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div
                className={`flex items-center gap-3 px-6 py-2 border rounded-full ${
                  isLight
                    ? "bg-white border-slate-200"
                    : "bg-white/5 backdrop-blur-sm border-white/10"
                }`}
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className={`${isLight ? "text-slate-500" : "text-white/60"} text-sm uppercase tracking-widest`}>
                  Our Values
                </span>
              </div>
            </div>
            
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              What Drives Us
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  isLight
                    ? "from-primary via-orange-500 to-amber-500"
                    : "from-primary to-orange-500"
                }`}
              >
                {" "}
                Forward
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="value-card group relative">
                  <div
                    className={`relative h-full border rounded-2xl p-8 overflow-hidden transition-all duration-500 ${
                      isLight
                        ? "bg-white border-slate-200 hover:border-orange-200"
                        : "bg-black/50 backdrop-blur-sm border-white/10 hover:border-primary/50 hover:bg-zinc-900/50"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${
                        isLight ? "from-orange-300 to-transparent" : "from-primary to-transparent"
                      }`}
                    />
                    
                    <div className="relative space-y-4">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          isLight
                            ? "bg-orange-100 group-hover:bg-orange-200"
                            : "bg-primary/10 group-hover:bg-primary/20"
                        }`}
                      >
                        <Icon className={isLight ? "h-8 w-8 text-orange-500" : "h-8 w-8 text-primary"} />
                      </div>
                      <h3
                        className={`text-xl font-bold transition-colors duration-300 ${
                          isLight
                            ? "text-slate-900 group-hover:text-orange-500"
                            : "text-white group-hover:text-primary"
                        }`}
                      >
                        {value.title}
                      </h3>
                      <p className={`${isLight ? "text-slate-600" : "text-white/60"} text-sm leading-relaxed`}>
                        {value.description}
                      </p>
                    </div>

                    <div
                      className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg transition-colors duration-500 ${
                        isLight
                          ? "border-slate-200 group-hover:border-orange-200"
                          : "border-white/10 group-hover:border-primary/30"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
