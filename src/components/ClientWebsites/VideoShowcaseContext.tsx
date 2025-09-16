"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface ClientProject {
  name: string;
  logo: string;
  desktopVideo: string;
  mobileVideo: string;
  poster: string;
  mobilePoster: string;
  techStack: string[];
  industry: string;
}

interface VideoShowcaseContextType {
  activeProject: number;
  setActiveProject: (index: number) => void;
  projects: ClientProject[];
}

const VideoShowcaseContext = createContext<VideoShowcaseContextType | undefined>(undefined);

export const projects: ClientProject[] = [
  {
    name: "E-Commerce Platform",
    logo: "/images/swiftware-logo.png",
    desktopVideo: "/videos/swiftware-demo.mp4",
    mobileVideo: "/videos/swiftware-demo-mobile.mp4",
    poster: "/images/swiftware-demo.jpg",
    mobilePoster: "/images/swiftware-demo-mobile.jpg",
    techStack: ["React", "Next.js", "Shopify"],
    industry: "E-Commerce"
  },
  {
    name: "Restaurant Chain",
    logo: "/images/swiftware-logo.png",
    desktopVideo: "/videos/swiftware-demo.mp4",
    mobileVideo: "/videos/swiftware-demo-mobile.mp4",
    poster: "/images/swiftware-demo.jpg",
    mobilePoster: "/images/swiftware-demo-mobile.jpg",
    techStack: ["Vue.js", "Node.js"],
    industry: "Restaurant"
  },
  {
    name: "Corporate Portfolio",
    logo: "/images/swiftware-logo.png",
    desktopVideo: "/videos/swiftware-demo.mp4",
    mobileVideo: "/videos/swiftware-demo-mobile.mp4",
    poster: "/images/swiftware-demo.jpg",
    mobilePoster: "/images/swiftware-demo-mobile.jpg",
    techStack: ["React", "TypeScript"],
    industry: "Corporate"
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
