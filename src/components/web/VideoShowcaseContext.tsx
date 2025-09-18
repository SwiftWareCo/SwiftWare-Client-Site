"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface ClientProject {
  name: string;
  logo: string;
  description: string;
  metrics: string;
  website: string;
  desktopVideo: string;
  mobileVideo: string;
  poster: string;
  mobilePoster: string;
  techStack: string[];
  industry: string;
  lighthouseImage?: string;
  isApp?: boolean;
}

interface VideoShowcaseContextType {
  activeProject: number;
  setActiveProject: (index: number) => void;
  projects: ClientProject[];
}

const VideoShowcaseContext = createContext<VideoShowcaseContextType | undefined>(undefined);

export const projects: ClientProject[] = [
  {
    name: "VHD",
    logo: "/images/vhdlogo.webp",
    description: "HVAC company achieving 140% conversion increase",
    metrics: "+140% conversions",
    website: "https://vancouverventcleaning.ca",
    desktopVideo: "/videos/vhd-demo.mp4",
    mobileVideo: "/videos/vhd-mobile-demo.mp4",
    poster: "/images/vhd-demo.jpg",
    mobilePoster: "/images/vhd-mobile-demo.PNG",
    techStack: ["React", "Next.js", "TypeScript"],
    industry: "HVAC/Trades",
    lighthouseImage: "/images/lighthouse-vhd.png"
  },
  {
    name: "CJS Academy",
    logo: "/images/cjslogo.png",
    description: "Golf lesson booking platform driving more student enrollment",
    metrics: "3x more bookings",
    website: "https://www.cjsgolfacademy.ca/",
    desktopVideo: "/videos/cjs-demo.mp4",
    mobileVideo: "/videos/cjs-mobile-demo.mp4",
    poster: "/images/cjs-demo.jpg",
    mobilePoster: "/images/cjs-mobile-demo.PNG",
    techStack: ["React", "Next.js", "Stripe"],
    industry: "Sports & Education"
  },
  {
    name: "Beacon",
    logo: "/images/beacon-logo.webp",
    description: "Location-based mobile app with seamless user experience",
    metrics: "App store ready",
    website: "https://beacon-topaz.vercel.app",
    desktopVideo: "/videos/beacon-demo.mp4",
    mobileVideo: "/videos/beacon-mobile-demo.mp4",
    poster: "/images/beacon-demo.jpg",
    mobilePoster: "/images/beacon-mobile-demo.PNG",
    techStack: ["React Native", "TypeScript", "Firebase"],
    industry: "Mobile App",
    isApp: true
  },
];

export function VideoShowcaseProvider({ children }: { children: ReactNode }) {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <VideoShowcaseContext.Provider value={{
      activeProject,
      setActiveProject,
      projects
    }}>
      {children}
    </VideoShowcaseContext.Provider>
  );
}

export function useVideoShowcase() {
  const context = useContext(VideoShowcaseContext);
  if (context === undefined) {
    throw new Error('useVideoShowcase must be used within a VideoShowcaseProvider');
  }
  return context;
}
