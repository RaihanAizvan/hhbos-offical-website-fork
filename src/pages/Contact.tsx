import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

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
        }
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
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "info@hhbos.com",
      link: "mailto:info@hhbos.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 0484-2917200",
      link: "tel:+914842917200",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Carnival Infopark, Kochi, India",
      link: "#",
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
              Let's Start a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                Conversation
              </span>
            </h1>

            <p className="contact-hero-text text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business operations? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-black">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Contact Information
                </h2>
                <p className="text-white/60 leading-relaxed">
                  Have a question or ready to start a project? Reach out to us
                  through any of these channels.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={index}
                      href={info.link}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start gap-4 p-6 bg-zinc-950 border border-white/10 rounded-xl hover:border-primary/50 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          {info.title}
                        </h3>
                        <p className="text-white/70">{info.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Google Maps Embed - Carnival Infopark */}
              <div className="relative h-[300px] bg-zinc-950 border border-white/10 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.4820892641896!2d76.34782607501686!3d10.017394990090048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d1b4f3d1e17%3A0x7c2e3d0f9c8b5a6d!2sCarnival%20Infopark!5e0!3m2!1sen!2sin!4v1704470400000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(85%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HH Back Office Services - Carnival Infopark Location"
                />
                {/* Dark overlay to match theme */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6 bg-zinc-950 border border-white/10 rounded-2xl p-8"
              >
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
                    placeholder="John Doe"
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
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-white mb-2 text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-black border-white/10 text-white focus:border-primary/50"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-white mb-2 text-sm font-medium">
                    Company Name
                  </label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-black border-white/10 text-white focus:border-primary/50"
                    placeholder="Your Company"
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

                <div className="form-field">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </Button>
                </div>

                <p className="text-white/40 text-xs text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
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
            Schedule a free consultation to discuss how we can help transform your business operations.
          </p>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            <a href="mailto:info@hhbos.com">Schedule a Consultation</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
