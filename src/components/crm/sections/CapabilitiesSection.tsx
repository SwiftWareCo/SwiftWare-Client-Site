"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import type { CapabilityTile } from "@/types/content";
import { motion, useReducedMotion, useInView, AnimatePresence, useScroll, useTransform } from "motion/react";
import Icon from "@/components/ui/Icon";
import clsx from "clsx";

type Props = { tiles: CapabilityTile[]; title?: string };

const PREFERRED_ORDER = ["Essentials", "Advanced", "Integrations"];

function sortCategories(categories: string[]): string[] {
  const preferred = categories.filter((c) => PREFERRED_ORDER.includes(c));
  const remaining = categories.filter((c) => !PREFERRED_ORDER.includes(c)).sort((a, b) => a.localeCompare(b));
  const ordered: string[] = [];
  for (const name of PREFERRED_ORDER) if (preferred.includes(name)) ordered.push(name);
  return [...ordered, ...remaining];
}

function getCategory(tile: CapabilityTile): string {
  return tile.category?.trim() || "Essentials";
}

export default function CapabilitiesSection({ tiles }: Props) {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });
  
  // Scroll-based animation for neural nodes
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"]
  });
  
  const nodeOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const nodeScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);
  
  // Convert motion values to regular numbers for component props
  const [opacityValue, setOpacityValue] = useState(0);
  const [scaleValue, setScaleValue] = useState(0.3);

  const categories = useMemo(() => {
    const uniq = Array.from(new Set(tiles.map(getCategory)));
    return sortCategories(uniq);
  }, [tiles]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    const unsubscribeOpacity = nodeOpacity.on("change", (latest) => {
      setOpacityValue(latest);
      if (latest > 0.1 && !hasScrolled) {
        setHasScrolled(true);
      }
    });
    const unsubscribeScale = nodeScale.on("change", (latest) => {
      setScaleValue(latest);
    });
    
    return () => {
      unsubscribeOpacity();
      unsubscribeScale();
    };
  }, [nodeOpacity, nodeScale, hasScrolled]);
  const activeCategory = categories[activeIdx] ?? categories[0] ?? "Essentials";

  const filtered = useMemo(
    () => tiles.filter((t) => getCategory(t) === activeCategory),
    [tiles, activeCategory]
  );

  // Generate positions - Horizontal for mobile, neural network for desktop
  const nodePositions = useMemo(() => {
    const positions: Array<{x: number, y: number, tile: CapabilityTile}> = [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const containerWidth = isMobile ? 350 : 800;
    const containerHeight = isMobile ? 150 : 200;
    
    if (isMobile) {
      // Mobile: Simple horizontal layout
      const spacing = 80;
      const startX = 40;
      const centerY = containerHeight / 2;
      
      filtered.forEach((tile, i) => {
        const x = startX + (i * spacing);
        positions.push({ x, y: centerY, tile });
      });
    } else {
      // Desktop: Neural network layout
      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;
      
      const highlightedItems = filtered.filter(tile => tile.highlight);
      const normalItems = filtered.filter(tile => !tile.highlight);
      
      // Place highlighted items in center
      highlightedItems.forEach((tile, i) => {
        if (i === 0) {
          positions.push({ x: centerX, y: centerY, tile });
        } else {
        // Additional highlighted items in a small circle around center
        const angle = (i - 1) * (2 * Math.PI) / Math.max(highlightedItems.length - 1, 1);
        const radius = 90; // Increased from 60
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        positions.push({ x, y, tile });
        }
      });
      
      // Arrange normal items in organized hexagonal clusters
      normalItems.forEach((tile, i) => {
        const clustersPerLayer = [6, 12]; // Fewer layers due to reduced height
        let layer = 0;
        let indexInLayer = i;
        
        // Determine which layer this node belongs to
        for (const nodesInLayer of clustersPerLayer) {
          if (indexInLayer < nodesInLayer) break;
          indexInLayer -= nodesInLayer;
          layer++;
        }
        
        const currentLayerNodes = clustersPerLayer[layer] || 18;
        const angle = (indexInLayer * 2 * Math.PI) / currentLayerNodes;
        const baseRadius = 200 + layer * 100; // Further increased spacing between layers
        
        // Add slight variation for organic feel
        const radiusVariation = Math.sin(i * 1.618) * 15; // Increased variation
        const angleVariation = Math.cos(i * 2.618) * 0.15; // Increased angle variation
        
        const radius = baseRadius + radiusVariation;
        const finalAngle = angle + angleVariation;
        
        const x = centerX + Math.cos(finalAngle) * radius;
        const y = centerY + Math.sin(finalAngle) * radius;
        
        positions.push({ 
          x: Math.max(100, Math.min(700, x)), 
          y: Math.max(60, Math.min(140, y)), 
          tile 
        });
      });
    }
    
    return positions;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- activeCategory intentionally included to regenerate layout on change
  }, [filtered, activeCategory]);

  // Canvas neural connections (desktop only)
  useEffect(() => {
    if (!canvasRef.current || reduce || !inView) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Update canvas size
    const isMobile = window.innerWidth < 768;
    canvas.width = isMobile ? 350 : 800;
    canvas.height = isMobile ? 150 : 200;

    // Skip connections on mobile
    if (isMobile) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between nodes (desktop only)
      nodePositions.forEach((node, i) => {
        nodePositions.forEach((otherNode, j) => {
          if (i >= j) return;
          
          // Calculate distance between node centers
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          
          // Only draw connections for nearby nodes (increased distance for better spacing)
          if (distance < 250) {
            const opacity = Math.max(0.1, 1 - distance / 250);
            const time = Date.now() * 0.001;
            const pulse = (Math.sin(time + i * 0.5) + 1) * 0.5;
            
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * pulse * 0.2})`;
            ctx.lineWidth = 0.5 + pulse * 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [nodePositions, reduce, inView]);

  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" ref={sectionRef} className="py-2 relative overflow-hidden w-full">
      {/* Neural background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 size-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-80 bg-purple-500/8 rounded-full blur-3xl" />
        
        {/* Floating particles */}
        {!reduce && inView && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute size-1 bg-blue-400/40 rounded-full"
                style={{
                  left: `${20 + (i * 7) % 60}%`,
                  top: `${10 + (i * 11) % 80}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto  px-0 md:px-4 lg:px-6 relative w-full">
        {/* Neural Network Header */}
        <div className="text-center mb-16">
          <h2 id="capabilities-heading" className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Neural Capabilities
          </h2>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Interconnected systems that learn, adapt, and evolve with your business
          </p>
          {/* Interactive prompt */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-white/10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="size-2 bg-blue-400 rounded-full"
            />
            <span className="text-sm text-zinc-300">Hover nodes to explore capabilities</span>
          </motion.div>
        </div>

        {/* Category Neural Selectors - Mobile Responsive */}
        <div className="flex justify-center mb-12 md:mb-20  px-4 md:px-0">
          <div className="flex items-center gap-1 md:gap-2 p-1 md:p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl backdrop-blur-sm border border-white/10 overflow-x-auto max-w-full">
            {categories.map((cat, idx) => {
              const selected = idx === activeIdx;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveIdx(idx)}
                  className={clsx(
                    "relative hover:cursor-pointer px-4 py-2 md:px-8 md:py-4 text-xs md:text-sm font-medium rounded-xl transition-all duration-500 whitespace-nowrap shrink-0",
                    "before:absolute before:inset-0 before:rounded-xl before:transition-all before:duration-500",
                    selected
                      ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white shadow-lg shadow-blue-500/20"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-1 md:gap-2">
                    <div className={clsx(
                      "size-1.5 md:size-2 rounded-full transition-all duration-500",
                      selected ? "bg-blue-400 shadow-lg shadow-blue-400/50" : "bg-zinc-600"
                    )} />
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Neural Network Visualization - Mobile Responsive */}
        <div className="relative px-4 md:px-0 h-[200px] md:h-[300px] mb-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="relative"
            >
              {/* Neural connections canvas - Mobile responsive */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 mx-auto pointer-events-none w-full h-full"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              
              {/* Capability nodes container - Horizontal mobile, neural desktop */}
              <motion.div 
                className="relative h-[150px] md:h-[200px] mx-auto max-w-full md:max-w-[800px]"
                style={{ 
                  opacity: reduce ? 1 : opacityValue,
                  scale: reduce ? 1 : scaleValue
                }}
              >
                {/* Mobile: Horizontal scrollable container */}
                <div className="md:hidden overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] h-full">
                  <div className="flex items-center h-full gap-4 px-4 min-w-max">
                    <AnimatePresence>
                      {nodePositions.map(({ tile }, i) => (
                        <div key={`${activeCategory}-${tile.title}`} className="shrink-0">
                          <NeuralCapabilityNode
                            tile={tile}
                            x={0} // Reset x for horizontal layout
                            y={0} // Reset y for horizontal layout
                            index={i}
                            reduce={reduce}
                            isHovered={hoveredNode === tile.title}
                            onHover={(hovered) => setHoveredNode(hovered ? tile.title : null)}
                            isMobileHorizontal={true}
                          />
                        </div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Desktop: Neural network positioned nodes */}
                <div className="hidden md:block h-[300px] relative  overflow-hidden">
                  <AnimatePresence>
                    {nodePositions.map(({ x, y, tile }, i) => (
                      <NeuralCapabilityNode
                        key={`${activeCategory}-${tile.title}`}
                        tile={tile}
                        x={x}
                        y={y}
                        index={i}
                        reduce={reduce}
                        isHovered={hoveredNode === tile.title}
                        onHover={(hovered) => setHoveredNode(hovered ? tile.title : null)}
                        isMobileHorizontal={false}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hovered Node Details - Absolute positioned to prevent layout shift */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ 
                opacity: 0, 
                x: typeof window !== 'undefined' && window.innerWidth >= 768 ? (Math.random() > 0.5 ? -100 : 100) : 0,
                y: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 0
              }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                y: 0 
              }}
              exit={{ 
                opacity: 0, 
                x: typeof window !== 'undefined' && window.innerWidth >= 768 ? (Math.random() > 0.5 ? -50 : 50) : 0,
                y: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 0
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 z-20 mt-4 mx-4 md:mx-0 p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/20 backdrop-blur-sm shadow-2xl"
            >
              {(() => {
                const tile = tiles.find(t => t.title === hoveredNode);
                return tile ? (
                  <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4 text-white">{tile.title}</h3>
                    <p className="text-lg text-zinc-300 mb-6">{tile.summary}</p>
                    {tile.badges && (
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        {tile.badges.map((badge, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-200 rounded-full text-sm"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null;
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function NeuralCapabilityNode({ 
  tile, 
  x, 
  y, 
  index, 
  reduce, 
  isHovered, 
  onHover,
  isMobileHorizontal = false
}: { 
  tile: CapabilityTile; 
  x: number; 
  y: number; 
  index: number; 
  reduce: boolean;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  isMobileHorizontal?: boolean;
}) {
  const nodeSize = isMobileHorizontal 
    ? (tile.highlight ? 80 : 60)
    : (tile.highlight ? 100 : 70); // Reduced sizes for smaller container
  
  const containerStyle = isMobileHorizontal 
    ? { 
        width: nodeSize,
        height: nodeSize
      }
    : { 
        left: x - nodeSize/2, 
        top: y - nodeSize/2,
        width: nodeSize,
        height: nodeSize
      };

  return (
    <motion.div
      className={`cursor-pointer group ${isMobileHorizontal ? 'relative' : 'absolute'}`}
      style={containerStyle}
      initial={reduce ? false : { 
        opacity: 0, 
        scale: 0,
        rotate: -180,
        y: isMobileHorizontal ? 0 : -50
      }}
      animate={{ 
        opacity: 1, 
        scale: isHovered ? 1.1 : 1,
        rotate: 0,
        y: 0
      }}
      exit={reduce ? undefined : {
        opacity: 0,
        scale: 0.8,
        rotate: 180,
        y: isMobileHorizontal ? 0 : 50,
        transition: { duration: 0.3 }
      }}
      transition={{ 
        duration: 0.4,
        delay: reduce ? 0 : index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Neural node core with enhanced clickability */}
      <motion.div
        className={clsx(
          "relative w-full h-full rounded-full border-2 backdrop-blur-sm overflow-hidden",
          "flex items-center justify-center cursor-pointer transition-all duration-300",
          tile.highlight
            ? "border-purple-400/50 bg-gradient-to-br from-purple-500/30 to-blue-500/30"
            : "border-blue-400/50 bg-gradient-to-br from-blue-500/20 to-purple-500/20",
          "hover:border-white/60 hover:scale-105"
        )}
        animate={!reduce ? {
          boxShadow: isHovered ? [
            `0 0 ${tile.highlight ? '40px' : '30px'} rgba(59, 130, 246, 0.6)`,
            `0 0 ${tile.highlight ? '50px' : '40px'} rgba(147, 51, 234, 0.7)`,
            `0 0 ${tile.highlight ? '40px' : '30px'} rgba(59, 130, 246, 0.6)`
          ] : [
            `0 0 ${tile.highlight ? '25px' : '15px'} rgba(59, 130, 246, 0.2)`,
            `0 0 ${tile.highlight ? '35px' : '25px'} rgba(147, 51, 234, 0.3)`,
            `0 0 ${tile.highlight ? '25px' : '15px'} rgba(59, 130, 246, 0.2)`
          ],
          scale: isHovered ? [1, 1.02, 1] : [1, 0.98, 1]
        } : {}}
        transition={{ 
          boxShadow: { duration: isHovered ? 1 : 3, repeat: Infinity },
          scale: { duration: isHovered ? 0.5 : 4, repeat: Infinity }
        }}
      >
        {/* Icon */}
        <motion.div
          className="relative z-10"
          animate={isHovered && !reduce ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Icon 
            name={tile.icon} 
            className={clsx(
              "text-white",
              tile.highlight 
                ? (isMobileHorizontal ? "w-6 h-6" : "w-8 h-8")
                : (isMobileHorizontal ? "w-4 h-4" : "w-5 h-5")
            )} 
          />
        </motion.div>

        {/* Pulse rings on hover */}
        <AnimatePresence>
          {isHovered && !reduce && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border border-blue-400/30"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-purple-400/30"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
            </>
          )}
        </AnimatePresence>

      </motion.div>

      {/* Node label */}
      <motion.div
        className={clsx(
          "absolute -bottom-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap",
          "px-2 py-1 bg-black/60 rounded text-xs text-white opacity-0 group-hover:opacity-100",
          "pointer-events-none transition-opacity duration-300"
        )}
      >
        {tile.title}
      </motion.div>

      {/* Hoverable indicator that appears periodically */}
      {!isHovered && !reduce && (
        <motion.div
          className="absolute -top-2 -right-2 size-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: index * 0.5,
            repeatDelay: 3
          }}
        >
          <div className="size-2 bg-white rounded-full" />
        </motion.div>
      )}


      {/* Connection indicators for highlighted nodes */}
      {tile.highlight && !reduce && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: [
              "conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.2) 60deg, transparent 120deg)",
              "conic-gradient(from 60deg, transparent 0deg, rgba(147, 51, 234, 0.2) 60deg, transparent 120deg)",
              "conic-gradient(from 120deg, transparent 0deg, rgba(59, 130, 246, 0.2) 60deg, transparent 120deg)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ transform: "scale(1.3)" }}
        />
      )}
    </motion.div>
  );
}


