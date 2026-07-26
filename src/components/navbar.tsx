"use client";

import { DATA } from "@/data/resume";
import { FloatingDock } from "@/components/magicui/floating-dock";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

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
      icon: (
        <>
          <SunIcon className="h-full w-full dark:hidden" />
          <MoonIcon className="hidden h-full w-full dark:block" />
        </>
      ),
      onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
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
