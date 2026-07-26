import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DATA } from "@/data/resume";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});


export const metadata: Metadata = {
  title: "Shani - Portfolio",
  description: "Shani - Professional Video Editor specializing in short-form videos, long-form videos, and SaaS product showcases. Expert in editing, pacing, and visual storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-50">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-0 max-w-3xl mx-auto py-12 pb-24 sm:py-24 border-x border-solid border-neutral-200 dark:border-neutral-800 ">
               <div
                    className='absolute w-6 border-r border-solid border-neutral-200 dark:border-neutral-800   pointer-events-none z-10 m-auto h-full top-0 left-0 bg-size-[10px_10px]'
                    style={{
                        backgroundImage: 'repeating-linear-gradient(315deg, var(--pattern-color) 0, var(--pattern-color) 1px, transparent 0, transparent 50%)'
                    }}
                />
                <div
                    className='absolute w-6 border-l border-solid border-neutral-200 dark:border-neutral-800   pointer-events-none z-10 m-auto h-full top-0 right-0 bg-size-[10px_10px]'
                    style={{
                        backgroundImage: 'repeating-linear-gradient(315deg, var(--pattern-color) 0, var(--pattern-color) 1px, transparent 0, transparent 50%)'
                    }}
                />
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
