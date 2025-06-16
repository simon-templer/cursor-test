"use client";
import { useEffect } from "react";

export function ForceBodyScroll() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
    
        document.body.style.overflow = "auto";
      
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);
  return null;
} 