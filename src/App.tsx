import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import ServiceFeatureDetail from "@/pages/ServiceFeatureDetail";
import Specialties from "@/pages/Specialties";
import Contact from "@/pages/Contact";
import Careers from "@/pages/Careers";
import NotFound from "@/pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SmoothScroll />
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers/>} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug/:feature" element={<ServiceFeatureDetail />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/specialties" element={<Specialties />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTopButton />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
