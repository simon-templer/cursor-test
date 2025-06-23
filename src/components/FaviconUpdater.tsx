"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function FaviconUpdater() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    // This effect runs on the client and ensures the favicon updates
    // when the theme changes via the on-page toggle.
    const currentTheme = theme === "system" ? resolvedTheme : theme;
    
    // Forcefully remove any existing favicon links to prevent conflicts
    document.querySelectorAll("link[rel='icon']").forEach((el) => el.remove());

    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";

    if (currentTheme === "dark") {
      link.href = "/images/black_ikonoto_icon_only.svg";
    } else {
      link.href = "/images/green_ikonoto_icon_only.svg";
    }

    document.head.appendChild(link);
  }, [theme, resolvedTheme]);

  return null;
} 