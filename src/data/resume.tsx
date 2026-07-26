import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Ayush",
  initials: "A",
  url: "https://ayush-editsfx.vercel.app",
  location: "Remote",
  locationLink: "https://google.com/maps",
  description:
    "Professional Video Editor & Motion Designer specializing in high-impact short-form videos, promotional SaaS campaigns, and engaging storytelling.",
  summary:
    "I help brands, creators, and SaaS companies stand out through dynamic video editing, visual effects, and seamless motion design.",
  avatarUrl: "/me.png",
  whoIam: ["Video Editor", "Motion Designer"],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "ayushedits.fx@gmail.com",
    tel: "+917572077736",
    social: {
      X: {
        name: "X",
        url: "https://x.com/editsxayush",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:ayushedits.fx@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [] as any[],
  education: [] as any[],
  hackathons: [] as any[],
  projects: {
    shortForm: [
      {
        id: "sf-1",
        video: "https://res.cloudinary.com/daqjqpva/video/upload/v1785019665/RedCarpet_Sample1_xww1tr.mp4",
      },
      {
        id: "sf-2",
        video: "https://res.cloudinary.com/daqjqpva/video/upload/v1785019668/branding_cut_qbaoai.mp4",
      },
      {
        id: "sf-3",
        video: "https://res.cloudinary.com/daqjqpva/video/upload/v1785018665/Real_01_lpamlu.mp4",
      },
      {
        id: "sf-4",
        video: "https://res.cloudinary.com/daqjqpva/video/upload/v1785018678/Real_04_fdvz2k.mp4",
      },
      {
        id: "sf-5",
        video: "https://res.cloudinary.com/daqjqpva/video/upload/v1785018681/Real_03_qbjoeh.mp4",
      },
      {
        id: "sf-6",
        video: "https://res.cloudinary.com/dnkycods9/video/upload/v1782799817/1_phomd9.mp4",
      },
      {
        id: "sf-7",
        video: "https://res.cloudinary.com/dnkycods9/video/upload/v1782799859/2_zvxyzd.mp4",
      },
      {
        id: "sf-8",
        video: "https://res.cloudinary.com/dnkycods9/video/upload/v1782800409/10_k2prtb.mp4",
      },
    ],
    longForm: [
      {
        id: "lf-1",
        video: "https://res.cloudinary.com/daqjqpva/video/upload/v1785021510/Video_1_qqmydl.mp4",
      },
      {
        id: "lf-2",
        video: "https://res.cloudinary.com/dnkycods9/video/upload/v1782908119/long_6_re_swzeed.mp4",
      },
      {
        id: "lf-3",
        video: "https://res.cloudinary.com/dnkycods9/video/upload/v1782897028/long_4_sbajgv.mp4",
      },
      {
        id: "lf-4",
        video: "https://res.cloudinary.com/dnkycods9/video/upload/v1782908125/long_5_re_vihqtc.mp4",
      },
    ],
    saas: [
      {
        id: "saas-1",
        video: "https://res.cloudinary.com/daqjqpva/video/upload/v1785021235/wix_inspired_final_l2mdbz.mp4",
      },
      {
        id: "saas-2",
        video: "https://res.cloudinary.com/daqjqpva/video/upload/v1785021234/framer_final_qcxj9j.mp4",
      },
      {
        id: "saas-3",
        video: "https://res.cloudinary.com/daqjqpva/video/upload/v1785020022/Final_Render_rusfum.mp4",
      },
      {
        id: "saas-4",
        video: "https://res.cloudinary.com/daqjqpva/video/upload/v1785020012/glammer_ktpy6q.mp4",
      },
      {
        id: "saas-5",
        video: "https://res.cloudinary.com/daqjqpva/video/upload/v1785019279/59568373_opysvm.mp4",
      },
    ],
  },
} as const;
