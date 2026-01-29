import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { getHeroVideoSrc } from "@/lib/theme";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const heroVideo = getHeroVideoSrc(resolvedTheme);
  const { toast } = useToast();

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-hero-text",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
      );

      if (formRef.current) {
        const fields = formRef.current.querySelectorAll(".form-field");
        gsap.fromTo(
          fields,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 70%",
            },
          },
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/send-mail.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Mail failed");
      }

      toast({
        title: "Message sent",
        description:
          "Thank you for contacting us. Our team will get back to you shortly.",
        className: "bg-green-600 text-white border-green-700",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Unable to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  type MapLocation = "kochi" | "coimbatore";
  const [openMap, setOpenMap] = useState<MapLocation | null>(null);

  const contactInfo: {
    icon: any;
    title: string;
    value: string;
    link?: string;
    mapKey?: MapLocation;
  }[] = [
    {
      icon: Mail,
      title: "Email Us",
      value: "admin@hhbos.com",
      link: "mailto:admin@hhbos.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "0484 2917200",
      link: "tel:+914842917200",
    },
    {
      icon: MapPin,
      title: "Kochi Office",
      value:
        "Phase-2, Floor-2, Carnival Infopark, Kakkanad, Kochi – 682042, Kerala, India",
      mapKey: "kochi", 
      link: "https://maps.app.goo.gl/bLALnsRoxgscx5A29",
    },
    {
      icon: MapPin,
      title: "Coimbatore Office",
      value:
        "DC 44 & 45, 4th Floor, Tidel Park, Aerodrome P.O, Coimbatore – 641014, Tamil Nadu, India",
      mapKey: "coimbatore",
      link: "https://maps.app.goo.gl/oxCRwMeRXVCMKeWQ7",
    },
  ];

  return (
    <div className={`min-h-screen ${isLight ? "bg-background" : "bg-black"}`}>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`relative min-h-[60svh] flex items-center justify-center overflow-hidden ${
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
            <div className="contact-hero-text flex items-center justify-center gap-4 mb-6">
              <div className={`h-px w-16 ${isLight ? "bg-orange-400" : "bg-primary"}`} />
              <span
                className={`text-sm uppercase tracking-[0.3em] ${
                  isLight ? "text-orange-500" : "text-primary"
                }`}
              >
                Get In Touch
              </span>
              <div className={`h-px w-16 ${isLight ? "bg-orange-400" : "bg-primary"}`} />
            </div>

            <h1
              className={`contact-hero-text text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                Touch
              </span>
            </h1>

            <p
              className={`contact-hero-text text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
                isLight ? "text-slate-600" : "text-white/70"
              }`}
            >
              We'd love to discuss how we can help your business grow.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`section-padding ${isLight ? "bg-background" : "bg-black"}`}>
        <div className="container-custom space-y-20">
          {/* Top: Contact Info + Form */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            {/* Left: Contact Info */}
            <div className="flex flex-col space-y-10">
              <div className="space-y-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;

                  return (
                    <motion.a
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`flex items-start gap-4 p-6 border rounded-xl transition-all duration-300 group ${
                        isLight
                          ? "bg-white border-slate-200 hover:border-orange-200"
                          : "bg-zinc-950 border-white/10 hover:border-primary/50"
                      }`}
                      href={info.link}
                      target={info.mapKey ? "_blank" : undefined}
                    >
                      
                      {/* Left icon */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          isLight
                            ? "bg-orange-100 group-hover:bg-orange-200"
                            : "bg-primary/10 group-hover:bg-primary/20"
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${isLight ? "text-orange-500" : "text-primary"}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          {/* Email / Phone → clickable */}
                          <h3 className={`font-semibold mb-1 ${isLight ? "text-slate-900" : "text-white"}`}>
                          {info.title}
                        </h3>

                          {/* Map icon */}
                          {info.mapKey && (
                            <button
                              type="button"
                              onClick={(event:React.MouseEvent) => {
                                setOpenMap(info.mapKey)
                                event.preventDefault();
                                event.stopPropagation();
                                console.log("Map button clicked");

                              }}
                              className={`p-1 rounded-md transition-all duration-200 ${
                                isLight
                                  ? "text-slate-400 hover:text-orange-500 hover:bg-orange-100"
                                  : "text-white/50 hover:text-primary hover:bg-primary/10"
                              }`}
                              aria-label="Open map"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <p className={`text-sm mt-1 ${isLight ? "text-slate-600" : "text-white/70"}`}>
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}

                {openMap && (
                  <div
                    className={`fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm ${
                      isLight ? "bg-black/40" : "bg-black/70"
                    }`}
                  >
                    <div
                      className={`relative w-[90%] max-w-4xl h-[70vh] rounded-2xl overflow-hidden border ${
                        isLight ? "bg-white border-slate-200" : "bg-zinc-950 border-white/10"
                      }`}
                    >
                      <button
                        onClick={() => setOpenMap(null)}
                        className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                          isLight
                            ? "bg-white/90 text-slate-700 hover:bg-white"
                            : "bg-black/60 hover:bg-black text-white"
                        }`}
                      >
                        ✕
                      </button>

                      <iframe
                        className="w-full h-full"
                        allowFullScreen
                        loading="lazy"
                        src={
                          openMap === "kochi"
                            ? "https://www.google.com/maps?q=Carnival+Infopark+Kakkanad&output=embed"
                            : "https://www.google.com/maps?q=Tidel+Park+Coimbatore&output=embed"
                        }
                        style={{
                          border: 0,
                          filter: isLight
                            ? "none"
                            : "invert(90%) hue-rotate(180deg) brightness(95%) contrast(85%)",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="h-full">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className={`flex flex-col h-full border rounded-2xl p-8 ${
                  isLight
                    ? "bg-white border-slate-200"
                    : "bg-zinc-950 border-white/10"
                }`}
              >
                <div className="flex flex-col space-y-5 flex-1">
                  <div className="form-field">
                    <label
                      className={`block mb-2 text-sm font-medium ${
                        isLight ? "text-slate-700" : "text-white"
                      }`}
                    >
                      Your Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`border focus:border-primary/50 ${
                        isLight
                          ? "bg-white border-slate-200 text-slate-900"
                          : "bg-black border-white/10 text-white"
                      }`}
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="form-field">
                    <label
                      className={`block mb-2 text-sm font-medium ${
                        isLight ? "text-slate-700" : "text-white"
                      }`}
                    >
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`border focus:border-primary/50 ${
                        isLight
                          ? "bg-white border-slate-200 text-slate-900"
                          : "bg-black border-white/10 text-white"
                      }`}
                      placeholder="Your Email Address"
                    />
                  </div>

                  <div className="form-field">
                    <label
                      className={`block mb-2 text-sm font-medium ${
                        isLight ? "text-slate-700" : "text-white"
                      }`}
                    >
                      Phone Number (Please include country code) *
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      inputMode="tel"
                      pattern="^\+?[0-9]{7,15}$"
                      className={`border focus:border-primary/50 ${
                        isLight
                          ? "bg-white border-slate-200 text-slate-900"
                          : "bg-black border-white/10 text-white"
                      }`}
                      placeholder="e.g. +91 xxxxx xxxxxx"
                    />
                  </div>

                  <div className="form-field">
                    <label
                      className={`block mb-2 text-sm font-medium ${
                        isLight ? "text-slate-700" : "text-white"
                      }`}
                    >
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`border focus:border-primary/50 resize-none ${
                        isLight
                          ? "bg-white border-slate-200 text-slate-900"
                          : "bg-black border-white/10 text-white"
                      }`}
                      placeholder="Tell us about your project..."
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full font-bold py-6 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                      isLight
                        ? "bg-orange-500 hover:bg-orange-500/90 text-white hover:shadow-orange-200/70"
                        : "bg-primary hover:bg-primary/90 text-white hover:shadow-primary/30"
                    }`}
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`section-padding relative overflow-hidden ${
          isLight ? "bg-slate-50" : "bg-zinc-950"
        }`}
      >
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] ${
            isLight ? "bg-orange-200/50" : "bg-primary/5"
          }`}
        />

        <div className="relative container-custom text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            Ready to Get Started?
          </h2>
          <p className={`text-lg max-w-2xl mx-auto mb-8 ${isLight ? "text-slate-600" : "text-white/60"}`}>
            Schedule a Free Consultation to discuss how we can help your
            business grow.
          </p>
          <Button
            asChild
            className={`font-bold px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              isLight
                ? "bg-orange-500 hover:bg-orange-500/90 text-white hover:shadow-orange-200/70"
                : "bg-primary hover:bg-primary/90 text-white hover:shadow-primary/30"
            }`}
          >
            <a href="mailto:admin@hhbos.com">Schedule a Free Consultation</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
