import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatsShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState({
    years: 0,
    clients: 0,
    projects: 0,
    accuracy: 0
  });

  const stats = [
    { 
      id: 'years',
      end: 15, 
      suffix: '+', 
      label: 'Years of Excellence', 
      description: 'Delivering world-class outsourcing solutions',
      color: 'from-orange-500 to-red-600'
    },
    { 
      id: 'clients',
      end: 250, 
      suffix: '+', 
      label: 'Global Clients', 
      description: 'Trusted by businesses worldwide',
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      id: 'projects',
      end: 500, 
      suffix: '+', 
      label: 'Projects Completed', 
      description: 'Successful implementations delivered',
      color: 'from-purple-500 to-pink-600'
    },
    { 
      id: 'accuracy',
      end: 98, 
      suffix: '%', 
      label: 'Accuracy Rate', 
      description: 'Precision in every transaction',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate numbers on scroll
      stats.forEach((stat) => {
        gsap.to(counts, {
          [stat.id]: stat.end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            onEnter: () => {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: stat.end,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                  setCounts(prev => ({
                    ...prev,
                    [stat.id]: Math.floor(obj.val)
                  }));
                }
              });
            }
          }
        });
      });

      // Animate cards with stagger
      const cards = sectionRef.current?.querySelectorAll('.stat-card');
      gsap.fromTo(
        cards,
        { 
          opacity: 0, 
          y: 80,
          scale: 0.9,
          rotateX: 45
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-black overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              top: `${i * 5}%`,
              left: 0,
              right: 0,
              animation: `slide-${i % 2 === 0 ? 'right' : 'left'} ${8 + i * 0.5}s linear infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-white/60 text-sm uppercase tracking-widest">By The Numbers</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Proven Track <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Record</span>
          </h2>
          
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Numbers that speak to our commitment, expertise, and the trust our clients place in us
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="stat-card group relative"
              style={{ perspective: '1000px' }}
            >
              <div className="relative h-full bg-zinc-950/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:border-white/30 hover:bg-zinc-900/50">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${stat.color}`} />
                
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Content */}
                <div className="relative space-y-6">
                  {/* Number */}
                  <div className="space-y-2">
                    <div className={`text-6xl md:text-7xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                      {counts[stat.id as keyof typeof counts]}{stat.suffix}
                    </div>
                    <div className="h-1 w-16 bg-gradient-to-r from-primary to-transparent rounded-full" />
                  </div>

                  {/* Label */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-lg group-hover:border-white/30 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-lg group-hover:border-white/30 transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-white/40 text-sm mb-4">
            Join hundreds of satisfied clients worldwide
          </p>
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-white/60 text-sm ml-2">Rated 4.9/5 by our clients</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes slide-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
};

export default StatsShowcase;
