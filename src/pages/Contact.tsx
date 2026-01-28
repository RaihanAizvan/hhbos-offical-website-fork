import { useLayoutEffect, useEffect, useRef, useState } from "react";
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
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60svh] flex items-center justify-center overflow-hidden bg-black"
      >
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="/video/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
          {/* Bottom fade gradient mask */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
        </div>

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

        <div className="relative z-10 container-custom text-center px-6">
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="contact-hero-text flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-primary" />
              <span className="text-primary text-sm uppercase tracking-[0.3em]">
                Get In Touch
              </span>
              <div className="h-px w-16 bg-primary" />
            </div>

            <h1 className="contact-hero-text text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                Touch
              </span>
            </h1>

            <p className="contact-hero-text text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              We'd love to discuss how we can help your business grow.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-black">
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
                      className={`flex items-start gap-4 p-6 bg-zinc-950 border border-white/10 rounded-xl transition-all duration-300 group hover:border-primary/50`}
                      href={info.link}
                      target={info.mapKey ? "_blank" : undefined}
                    >
                      
                      {/* Left icon */}
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          {/* Email / Phone → clickable */}
                          <h3 className="text-white font-semibold mb-1">
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
                              className="p-1 rounded-md text-white/50 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                              aria-label="Open map"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <p className="text-white/70 text-sm mt-1">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}

                {openMap && (
                  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="relative w-[90%] max-w-4xl h-[70vh] bg-zinc-950 rounded-2xl overflow-hidden border border-white/10">
                      <button
                        onClick={() => setOpenMap(null)}
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center"
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
                          filter:
                            "invert(90%) hue-rotate(180deg) brightness(95%) contrast(85%)",
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
                className="flex flex-col h-full bg-zinc-950 border border-white/10 rounded-2xl p-8"
              >
                <div className="flex flex-col space-y-5 flex-1">
                  <div className="form-field">
                    <label className="block text-white mb-2 text-sm font-medium">
                      Your Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-black border-white/10 text-white focus:border-primary/50"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="form-field">
                    <label className="block text-white mb-2 text-sm font-medium">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-black border-white/10 text-white focus:border-primary/50"
                      placeholder="Your Email Address"
                    />
                  </div>

                  <div className="form-field">
                    <label className="block text-white mb-2 text-sm font-medium">
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
                      className="bg-black border-white/10 text-white focus:border-primary/50"
                      placeholder="e.g. +91 xxxxx xxxxxx"
                    />
                  </div>

                  <div className="form-field">
                    <label className="block text-white mb-2 text-sm font-medium">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-black border-white/10 text-white focus:border-primary/50 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
      <section className="section-padding bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

        <div className="relative container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            Schedule a Free Consultation to discuss how we can help your
            business grow.
          </p>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            <a href="mailto:admin@hhbos.com">Schedule a Free Consultation</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
