import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const InsightsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const insights = [
    {
      id: 1,
      category: "RCM Services",
      title: "Revenue Cycle Management",
      subtitle: "End-to-end RCM support",
      description:
        "Patient registration, eligibility verification, medical coding & billing, claims submission & follow-up, denial management, and AR reporting.",
      tags: ["Healthcare", "Billing", "AR"],
      size: "medium-wide", // 2x1
    },
    {
      id: 2,
      category: "Finance & Accounts",
      title: "Accounting Outsourcing",
      subtitle: "Streamline your financial operations",
      description:
        "Bookkeeping, AP/AR, payroll processing, budgeting & forecasting, tax compliance, audit support, and financial analysis.",
      tags: ["Bookkeeping", "AP/AR", "Payroll"],
      size: "medium", // 1x2
    },
    {
      id: 3,
      category: "Database Management",
      title: "Database Administration",
      subtitle: "Secure, scalable data solutions",
      description:
        "Setup & configuration (SQL, Oracle, MySQL), tuning & optimization, backup & recovery, migration & integration, and access control.",
      tags: ["SQL", "Oracle", "MySQL"],
      size: "small", // 1x1
    },
    {
      id: 4,
      category: "Services Overview",
      title: "Specialized Support",
      subtitle: "Across key industries",
      description:
        "Healthcare, Finance & Banking, Retail & E-commerce, IT & Software, Manufacturing, and Real Estate.",
      tags: ["Healthcare", "Finance", "IT & Software"],
      size: "small", // 1x1
    },
    {
      id: 5,
      category: "Why Choose Us",
      title: "Reliable Delivery",
      subtitle: "Accuracy, security, and efficiency",
      description:
        "Expert professionals, technology-driven workflows, ISO 27001-aligned data protection policies, proven results, and a global delivery model.",
      tags: ["Security", "Automation", "Global"],
      size: "medium", // 2x1
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.insight-card');
      
      // Animate header elements first
      const headerElements = sectionRef.current?.querySelectorAll('.header-content > *');
      
      gsap.to(headerElements, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

      // Simple, professional reveal (no scrub/rotation)
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.06,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getGridClass = (size: string, index: number) => {
    switch(size) {
      case 'large':
        return 'col-span-1 md:col-span-2 row-span-2';
      case 'medium-wide':
        return 'col-span-1 md:col-span-2 row-span-1';
      case 'medium':
        return index === 1 ? 'col-span-1 row-span-2' : 'col-span-1 md:col-span-2 row-span-1';
      case 'small':
        return 'col-span-1 row-span-1';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-black overflow-x-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 header-content">
          <div className="flex items-center gap-4 mb-6 opacity-0">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-white/40 text-sm uppercase tracking-[0.3em]">Overview</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white text-center mb-6 tracking-tight opacity-0">
            What We Do
          </h2>
          
          <p className="text-white/50 text-center text-lg max-w-2xl mx-auto opacity-0">
            A quick overview of our services, industries, and delivery approach
          </p>
        </div>

        {/* Bento Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-4"
        >
          {insights.map((insight, index) => (
            <div
              key={insight.id}
              className={`insight-card group ${getGridClass(insight.size, index)}`}
              onMouseEnter={() => setHoveredCard(insight.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link to="/contact" className="block h-full">
                <div className="relative h-full bg-zinc-950 border border-white/5 rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:bg-zinc-900">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-transparent" />
                  </div>

                  {/* Noise texture */}
                  <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
                  }} />

                  {/* Content */}
                  <div className="relative h-full flex flex-col">
                    {/* Top section */}
                    <div className="flex items-start justify-between mb-auto">
                      <span className="text-primary/60 text-xs uppercase tracking-widest font-medium">
                        {insight.category}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-primary group-hover:rotate-45">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="space-y-3 mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300">
                        {insight.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {insight.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-white/40 text-sm leading-relaxed mb-4">
                      {insight.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {insight.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/5 rounded-md text-white/60 text-xs border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover border glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-3xl border border-primary/20 blur-sm" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
