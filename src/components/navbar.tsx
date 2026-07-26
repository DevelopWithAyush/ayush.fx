"use client";

import { useState, useEffect } from "react";
import { DATA } from "@/data/resume";
import { FloatingDock } from "@/components/magicui/floating-dock";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    ...DATA.navbar.map((item) => ({
      title: item.label,
      icon: <item.icon className="h-full w-full" />,
      href: item.href,
    })),
    ...Object.entries(DATA.contact.social)
      .filter(([_, social]) => social.navbar)
      .map(([name, social]) => {
        const isExternal = social.url.startsWith("http");
        return {
          title: name,
          icon: <social.icon className="h-full w-full" />,
          href: social.url,
          target: isExternal ? "_blank" : undefined,
          rel: isExternal ? "noopener noreferrer" : undefined,
        };
      }),
    {
      title: "Theme",
      icon: !mounted ? (
        <div className="relative h-full w-full flex items-center justify-center">
          <SunIcon className="h-full w-full dark:hidden" />
          <MoonIcon className="hidden h-full w-full dark:block" />
        </div>
      ) : (
        <div className="relative h-full w-full flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {resolvedTheme === "dark" ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center text-neutral-500 dark:text-neutral-300 [&>svg]:size-full"
              >
                <MoonIcon />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center text-neutral-500 dark:text-neutral-300 [&>svg]:size-full"
              >
                <SunIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
      onClick: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center">
      <div className="pointer-events-auto">
        <FloatingDock items={links} />
      </div>
    </div>
  );
}
