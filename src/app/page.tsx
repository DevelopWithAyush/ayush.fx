"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import Badge from "@/components/magicui/badge";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh  mx-auto flex flex-col gap-14 relative px-10  ">
      <section id="hero">
        <div className="mx-auto w-full  space-y-8">
          <div className="gap-y-6 flex flex-col md:flex-row justify-start gap-4">
            <BlurFade delay={BLUR_FADE_DELAY} className="">
              <Avatar className="size-24 border rounded-xl shadow-lg ring-4 ring-muted">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>

            <div className="gap-2 flex flex-col">
              <div className="flex flex-row items-end gap-4">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                  yOffset={8}
                  text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
                />
                <BlurFade className="">
                  <Badge />
                </BlurFade>
              </div>
              <BlurFadeText
                className="text-muted-foreground max-w-150 text-sm md:text-base "
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="short-form">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <ProjectsSection category="shortForm" />
        </BlurFade>
      </section>

      <section id="long-form">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <ProjectsSection category="longForm" />
        </BlurFade>
      </section>

      <section id="saas-video">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <ProjectsSection category="saas" />
        </BlurFade>
      </section>

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
