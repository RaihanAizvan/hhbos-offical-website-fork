import { lenis } from "@/lib/lenis";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
