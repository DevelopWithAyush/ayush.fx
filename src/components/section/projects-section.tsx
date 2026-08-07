"use client";

import React, { useState, useRef } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { FullscreenVideoPlayer } from "@/components/fullscreen-video-player";
import { motion } from "motion/react";
import { Play } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

type Category = "shortForm" | "longForm" | "saas";

interface ProjectsSectionProps {
  category: Category;
}

interface ProjectVideoCardProps {
  project: any;
  aspectClass: string;
  onClick: () => void;
}

function ProjectVideoCard({ project, aspectClass, onClick }: ProjectVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Generate lightweight poster image from Cloudinary URL
  const posterUrl = project.video?.includes("cloudinary.com")
    ? project.video.replace("/upload/", "/upload/f_auto,q_auto,w_800/").replace(/\.mp4$/, ".jpg")
    : project.video?.replace(/\.mp4$/, ".jpg");

  const optimizedVideoUrl = project.video?.includes("cloudinary.com") && !project.video.includes("f_auto")
    ? project.video.replace("/upload/", "/upload/f_auto,q_auto/")
    : project.video;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 shadow-md cursor-pointer hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 w-full ${aspectClass}`}
    >
      {/* Lightweight Thumbnail Image */}
      {posterUrl && (
        <img
          src={posterUrl}
          alt="Video Thumbnail"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        />
      )}

      {/* Silent preview looping on hover (mounted conditionally to save memory) */}
      {isHovered && (
        <video
          ref={videoRef}
          src={optimizedVideoUrl}
          loop
          muted
          playsInline
          autoPlay
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-10"
        />
      )}

      {/* Play Icon Hover Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 z-20">
        <motion.div
          className="p-4 rounded-full bg-white/20 hover:bg-white/35 text-white backdrop-blur-md border border-white/25 transition-all shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="size-6 fill-white text-white ml-0.5" />
        </motion.div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ category }: ProjectsSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const getCategoryDetails = () => {
    switch (category) {
      case "shortForm":
        return {
          title: "Short Form Video",
          projects: DATA.projects.shortForm || [],
          gridClass: "grid-cols-1 sm:grid-cols-2",
          aspectClass: "aspect-[9/16]",
          wrapperClass: "w-full",
        };
      case "longForm":
        return {
          title: "Long Form Video",
          projects: DATA.projects.longForm || [],
          gridClass: "grid-cols-1 justify-items-center",
          aspectClass: "aspect-[16/9]",
          wrapperClass: "w-full max-w-[640px]",
        };
      case "saas":
        return {
          title: "SaaS Video",
          projects: DATA.projects.saas || [],
          gridClass: "grid-cols-1 ",
          aspectClass: "aspect-[16/9]",
          wrapperClass: "w-full",
        };
    }
  };

  const { title, projects, gridClass, aspectClass, wrapperClass } = getCategoryDetails();

  return (
    <section id={category} className="py-2">
      <div className="flex min-h-0 flex-col gap-y-6">
        {/* Header divider and label */}
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">{title}</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
        </div>

        {/* Video Grid */}
        <div className={`grid gap-4 max-w-200 mx-auto w-full ${gridClass}`}>
          {projects.map((project: any, id: number) => {
            return (
              <BlurFade
                key={project.id}
                delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                className={wrapperClass}
              >
                <ProjectVideoCard
                  project={project}
                  aspectClass={aspectClass}
                  onClick={() => setSelectedVideo(project.video)}
                />
              </BlurFade>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Video Player */}
      <FullscreenVideoPlayer
        videoUrl={selectedVideo || ""}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
}
