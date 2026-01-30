import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PortalCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!sectionRef.current || !portalRef.current) return;

    const ctx = gsap.context(() => {
      // Portal expansion animation on scroll
      gsap.fromTo(
        portalRef.current,
        { scale: 0, opacity: 0, rotateZ: 0 },
        {
          scale: 1,
          opacity: 1,
          rotateZ: 360,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          }
        }
      );

      // Floating animation for portal
      gsap.to(portalRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 50;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 50;
      setMousePosition({ x, y });
    }
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-32 bg-background overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,107,31,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,31,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }} />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center">
          {/* Portal effect */}
          <div 
            ref={portalRef}
            className="relative mb-12"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
            }}
          >
            {/* Outer rings */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="w-80 h-80 rounded-full border-2 border-primary/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="w-72 h-72 rounded-full border border-primary/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="w-64 h-64 rounded-full border border-primary/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Middle ring - counter rotation */}
            <div className="absolute inset-0 animate-spin-reverse">
              <div className="w-56 h-56 rounded-full border-2 border-primary/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="w-48 h-48 rounded-full border border-primary/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Inner portal core */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent backdrop-blur-sm flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-black/80 border border-primary/50 flex items-center justify-center backdrop-blur-xl">
                  <svg className="w-16 h-16 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Particles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/60 rounded-full"
                style={{
                  animation: `orbit-${i + 1} ${3 + i * 0.5}s linear infinite`,
                  transformOrigin: '0 0'
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="text-center max-w-3xl space-y-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-primary bg-[length:200%] animate-gradient">Transform</span>?
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Enter a new dimension of operational excellence. Let's discuss how we can revolutionize your business processes.
            </p>

            {/* CTA Button with portal effect */}
            <div className="pt-8">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-primary border-2 border-primary/50 rounded-full text-white font-bold text-lg overflow-hidden transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/30"
              >
                {/* Button background effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <span className="relative">Start Your Journey</span>
                
                <svg className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>

                {/* Glow effect */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-primary/30" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-12 pt-12 text-white/40 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Trusted Service</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>  Worldwide Clients</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          to { transform: rotate(-360deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
        .animate-gradient { animation: gradient 3s ease infinite; }
        
        ${[...Array(8)].map((_, i) => `
          @keyframes orbit-${i + 1} {
            0% { transform: translate(0, 0) rotate(${i * 45}deg) translateX(140px) rotate(-${i * 45}deg); }
            100% { transform: translate(0, 0) rotate(${i * 45 + 360}deg) translateX(140px) rotate(-${i * 45 + 360}deg); }
          }
        `).join('\n')}
      `}</style>
    </section>
  );
};

export default PortalCTA;
