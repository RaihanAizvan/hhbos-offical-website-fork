import { useLayoutEffect, useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Eye, Heart, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
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
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70svh] flex items-center justify-center overflow-hidden bg-black mt-20">
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
            <source src="/video/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
          {/* Bottom fade gradient mask */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
        </div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,107,31,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,31,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative z-10 container-custom text-center px-6">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="about-hero-text flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-primary" />
              <span className="text-primary text-sm uppercase tracking-[0.3em]">About Us</span>
              <div className="h-px w-16 bg-primary" />
            </div>
            
            <h1 className="about-hero-text text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Your Trusted Partner in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Financial and Data Solutions</span>
            </h1>
            
            <p className="about-hero-text text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
             HH Back Office Services Pvt Ltd provides expert outsourcing in RCM, Finance & Accounts, and Database Administration.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-zinc-950">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Our <span className="text-primary">Story</span>
              </h2>
              <p className="text-white/70 leading-relaxed">
                With a team of experienced professionals and industry-standard technology, we ensure accuracy, compliance, and efficiency in every service we deliver.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Mission:</strong> To empower businesses with reliable, data-driven solutions that enhance productivity and profitability.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Vision:</strong> To become a globally recognized outsourcing partner for financial and data management excellence.
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
                <div key={index} className="flex items-center gap-3 p-4 bg-black/50 border border-white/10 rounded-lg hover:border-primary/50 transition-colors duration-300">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="section-padding bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px]" />
        
        <div className="relative container-custom">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3 px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-white/60 text-sm uppercase tracking-widest">Our Values</span>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              What Drives Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Forward</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="value-card group relative">
                  <div className="relative h-full bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:bg-zinc-900/50">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-primary to-transparent" />
                    
                    <div className="relative space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
                    </div>

                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-lg group-hover:border-primary/30 transition-colors duration-500" />
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
