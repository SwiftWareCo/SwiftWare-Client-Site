'use client';
import React, { useMemo, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { CapabilityTile } from '@/types/content';
import {
  motion,
  useReducedMotion,
  useInView,
  AnimatePresence,
} from 'motion/react';
import Icon from '@/components/ui/Icon';
import clsx from 'clsx';

type Props = { tiles: CapabilityTile[]; title?: string };

const PREFERRED_ORDER = ['Essentials', 'Advanced', 'Integrations'];

function sortCategories(categories: string[]): string[] {
  const preferred = categories.filter((c) => PREFERRED_ORDER.includes(c));
  const remaining = categories
    .filter((c) => !PREFERRED_ORDER.includes(c))
    .sort((a, b) => a.localeCompare(b));
  const ordered: string[] = [];
  for (const name of PREFERRED_ORDER)
    if (preferred.includes(name)) ordered.push(name);
  return [...ordered, ...remaining];
}

function getCategory(tile: CapabilityTile): string {
  return tile.category?.trim() || 'Essentials';
}

export default function CapabilitiesSection({ tiles }: Props) {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { margin: '-20% 0px -20% 0px' });

  const categories = useMemo(() => {
    const uniq = Array.from(new Set(tiles.map(getCategory)));
    return sortCategories(uniq);
  }, [tiles]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [activeIdx, setActiveIdx] = useState(0);

  const activeCategory = categories[activeIdx] ?? categories[0] ?? 'Essentials';

  const filtered = useMemo(
    () =>
      isMobile ? tiles.filter((t) => getCategory(t) === activeCategory) : tiles,
    [tiles, activeCategory, isMobile]
  );

  // Generate positions - Horizontal for mobile, neural network for desktop
  const nodePositions = useMemo(() => {
    const positions: Array<{
      x: number;
      y: number;
      tile: CapabilityTile;
      nodeSize: number;
    }> = [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const containerWidth = isMobile ? 350 : 800;
    const containerHeight = isMobile ? 180 : 400;

    if (isMobile) {
      // Mobile: Simple horizontal layout
      const spacing = 80;
      const startX = 40;
      const centerY = containerHeight / 2;

      filtered.forEach((tile, i) => {
        const x = startX + i * spacing;
        // FIX: Add nodeSize to positions for mobile
        const nodeSize = tile.highlight ? 60 : 45; // Smaller sizes for mobile
        positions.push({ x, y: centerY, tile, nodeSize });
      });
    } else {
      // Desktop: Neural network layout for all nodes
      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;

      const highlightedItems = filtered.filter((tile) => tile.highlight);
      const normalItems = filtered.filter((tile) => !tile.highlight);

      // Place highlighted items in center
      highlightedItems.forEach((tile, i) => {
        const nodeSize = 90; // Desktop highlighted size
        if (i === 0) {
          positions.push({ x: centerX, y: centerY, tile, nodeSize });
        } else {
          // Additional highlighted items in a circle around center
          const angle =
            ((i - 1) * (2 * Math.PI)) /
            Math.max(highlightedItems.length - 1, 1);
          const radius = 120; // Larger radius for more space
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          positions.push({ x, y, tile, nodeSize });
        }
      });

      // Arrange normal items in organized clusters with more layers
      normalItems.forEach((tile, i) => {
        const nodeSize = 65; // Desktop normal size
        const clustersPerLayer = [8, 12, 16, 20]; // More nodes per layer for larger layout
        let layer = 0;
        let indexInLayer = i;

        // Determine which layer this node belongs to
        for (const nodesInLayer of clustersPerLayer) {
          if (indexInLayer < nodesInLayer) break;
          indexInLayer -= nodesInLayer;
          layer++;
        }

        const currentLayerNodes = clustersPerLayer[layer] || 24;
        const angle = (indexInLayer * 2 * Math.PI) / currentLayerNodes;
        const baseRadius = 180 + layer * 80; // Larger spacing for taller container

        // Add slight variation for organic feel
        const radiusVariation = Math.sin(i * 1.618) * 15; // Increased variation
        const angleVariation = Math.cos(i * 2.618) * 0.2; // Increased angle variation

        const radius = baseRadius + radiusVariation;
        const finalAngle = angle + angleVariation;

        const x = centerX + Math.cos(finalAngle) * radius;
        const y = centerY + Math.sin(finalAngle) * radius;

        // Wider bounds for larger layout
        positions.push({
          x: Math.max(50, Math.min(750, x)),
          y: Math.max(30, Math.min(370, y)),
          tile,
          nodeSize,
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

    // Update canvas size to match container
    const isMobile = window.innerWidth < 768;
    const container = canvas.parentElement;
    if (container) {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    } else {
      // Fallback
      canvas.width = isMobile ? 350 : 800;
      canvas.height = isMobile ? 180 : 240;
    }

    // Skip connections on mobile
    if (isMobile) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nodes (desktop only)
      // FIX: Account for node radius when drawing lines
      nodePositions.forEach((node, i) => {
        nodePositions.forEach((otherNode, j) => {
          if (i >= j) return;

          // Calculate distance between node centers
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) +
              Math.pow(node.y - otherNode.y, 2)
          );

          // Only draw connections for nearby nodes - FIX: Increased max distance to connect more nodes
          if (distance < 280 && distance > 20) {
            // Calculate line endpoints at edge of circles, not centers
            const angle = Math.atan2(
              otherNode.y - node.y,
              otherNode.x - node.x
            );
            const startRadius = node.nodeSize / 2;
            const endRadius = otherNode.nodeSize / 2;

            const startX = node.x + Math.cos(angle) * startRadius;
            const startY = node.y + Math.sin(angle) * startRadius;
            const endX = otherNode.x - Math.cos(angle) * endRadius;
            const endY = otherNode.y - Math.sin(angle) * endRadius;

            const opacity = Math.max(0.3, 1 - distance / 280);
            const time = Date.now() * 0.001;
            const pulse = (Math.sin(time + i * 0.5) + 1) * 0.5;

            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * pulse * 1})`; // FIX: Increased base opacity multiplier for better visibility
            ctx.lineWidth = 1 + pulse * 0.5;

            // Draw line from edge to edge with curve
            const midX = (startX + endX) / 2;
            const midY = (startY + endY) / 2;
            const curveOffset = Math.sin(time + i) * 5;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.quadraticCurveTo(
              midX + curveOffset,
              midY + curveOffset,
              endX,
              endY
            );
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
    <section
      id='capabilities'
      aria-labelledby='capabilities-heading'
      ref={sectionRef}
      className='py-2 relative overflow-hidden w-full'
    >
      {/* Neural background */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-1/4 right-1/4 size-96 bg-blue-500/5 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 left-1/4 size-80 bg-purple-500/8 rounded-full blur-3xl' />

        {/* Floating particles */}
        {!reduce && inView && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute size-1 bg-blue-400/40 rounded-full'
                style={{
                  left: `${20 + ((i * 7) % 60)}%`,
                  top: `${30 + ((i * 115) % 80)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className='max-w-7xl mx-auto  px-0 md:px-4 lg:px-6 relative w-full'>
        {/* Neural Network Header */}
        <div className='text-center mb-16'>
          <h2
            id='capabilities-heading'
            className='text-4xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent'
          >
            Capabilities
          </h2>
          <p className='text-xl p-2 text-zinc-300 max-w-3xl mx-auto leading-relaxed'>
            Interconnected systems that learn, adapt, and evolve with your
            business
          </p>
        </div>

        {/* Category Neural Selectors - Mobile Only */}
        {isMobile && (
          <div className='flex justify-center mb-12 md:mb-20  px-4 md:px-0'>
            <div className='flex items-center gap-1 md:gap-2 p-1 md:p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl backdrop-blur-sm border border-white/10 overflow-x-auto max-w-full'>
              {categories.map((cat, idx) => {
                const selected = idx === activeIdx;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveIdx(idx)}
                    className={clsx(
                      'relative hover:cursor-pointer px-4 py-2 md:px-8 md:py-4 text-xs md:text-sm font-medium rounded-xl transition-all duration-500 whitespace-nowrap shrink-0',
                      'before:absolute before:inset-0 before:rounded-xl before:transition-all before:duration-500',
                      selected
                        ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white shadow-lg shadow-blue-500/20'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <span className='relative z-10 flex items-center gap-1 md:gap-2'>
                      <div
                        className={clsx(
                          'size-1.5 md:size-2 rounded-full transition-all duration-500',
                          selected
                            ? 'bg-blue-400 shadow-lg shadow-blue-400/50'
                            : 'bg-zinc-600'
                        )}
                      />
                      {cat}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Neural Network Visualization - Mobile Responsive */}
        <div
          ref={containerRef}
          className='relative px-4 md:px-0 h-[200px] md:h-[400px] mb-8'
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className='relative'
            >
              {/* Capability nodes container - Horizontal mobile, neural desktop */}
              <motion.div className='relative h-[180px] md:h-[400px] mx-auto max-w-full md:max-w-[800px]'>
                {/* Neural connections canvas - Moved inside the sized container for correct alignment */}
                <canvas
                  ref={canvasRef}
                  className='absolute inset-0 pointer-events-none z-0'
                  style={{ width: '100%', height: '100%' }}
                />

                {/* Mobile: Horizontal scrollable container */}
                <div className='md:hidden overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] h-[120px]'>
                  <div className='flex items-center justify-center h-full gap-4 px-4 min-w-max'>
                    <AnimatePresence>
                      {nodePositions.map(({ tile, nodeSize }, i) => (
                        <div
                          key={`${activeCategory}-${tile.title}`}
                          className='shrink-0'
                        >
                          <NeuralCapabilityNode
                            tile={tile}
                            x={0} // Reset x for horizontal layout
                            y={0} // Reset y for horizontal layout
                            index={i}
                            reduce={reduce}
                            isMobileHorizontal={true}
                            nodeSize={nodeSize}
                          />
                        </div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Desktop: Neural network positioned nodes */}
                <div className='hidden md:block h-[400px] relative'>
                  <AnimatePresence>
                    {nodePositions.map(({ x, y, tile, nodeSize }, i) => (
                      <NeuralCapabilityNode
                        key={`${activeCategory}-${tile.title}`}
                        tile={tile}
                        x={x}
                        y={y}
                        index={i}
                        reduce={reduce}
                        isMobileHorizontal={false}
                        nodeSize={nodeSize}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
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
  isMobileHorizontal = false,
  nodeSize,
}: {
  tile: CapabilityTile;
  x: number;
  y: number;
  index: number;
  reduce: boolean;
  isHovered?: boolean;
  onHover?: (hovered: boolean) => void;
  isMobileHorizontal?: boolean;
  nodeSize: number;
}) {
  const [isHoveredInternal, setIsHoveredInternal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
    tooltipBelow: boolean;
  } | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const nodeRef = useRef<HTMLDivElement>(null);

  // On mobile, use click instead of hover
  const isTooltipVisible = isMobile ? isClicked : isHoveredInternal;

  // Close tooltip when clicking outside on mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
        setIsClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  // Update tooltip position when visibility changes
  useEffect(() => {
    if (isTooltipVisible && nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      const tooltipWidth = 256;
      const tooltipHeight = 128;
      const arrowHeight = 8;
      const gap = 12;

      let top = 0;
      let left = 0;
      let tooltipBelow = false;

      if (isMobile) {
        // Mobile: Always position below
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        tooltipBelow = true;
      } else {
        // Desktop: Try above first, then below if needed
        const preferredTop = rect.top - tooltipHeight - arrowHeight - gap;
        if (preferredTop >= 0) {
          top = preferredTop;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          tooltipBelow = false;
        } else {
          top = rect.bottom + gap;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          tooltipBelow = true;
        }
      }

      // Ensure tooltip doesn't go off-screen horizontally
      left = Math.max(
        10,
        Math.min(window.innerWidth - tooltipWidth - 10, left)
      );

      setTooltipPosition({ top, left, tooltipBelow });
    } else {
      setTooltipPosition(null);
    }
  }, [isTooltipVisible, isMobile]);

  const containerStyle = isMobileHorizontal
    ? {
        width: nodeSize,
        height: nodeSize,
      }
    : {
        left: x - nodeSize / 2,
        top: y - nodeSize / 2,
        width: nodeSize,
        height: nodeSize,
      };

  return (
    <>
      <motion.div
        ref={nodeRef}
        className={`cursor-pointer group ${isMobileHorizontal ? 'relative' : 'absolute'}`}
        style={{
          ...containerStyle,
          zIndex: isTooltipVisible ? 50 : 20, // FIX: Higher z-index when tooltip is visible
        }}
        initial={
          reduce
            ? false
            : {
                opacity: 0,
                scale: 0,
                rotate: -180,
                y: isMobileHorizontal ? 0 : -50,
              }
        }
        animate={{
          opacity: 1,
          scale: isHoveredInternal ? 1.1 : 1,
          rotate: 0,
          y: 0,
        }}
        exit={
          reduce
            ? undefined
            : {
                opacity: 0,
                scale: 0.8,
                rotate: 180,
                y: isMobileHorizontal ? 0 : 50,
                transition: { duration: 0.3 },
              }
        }
        transition={{
          duration: 0.4,
          delay: reduce ? 0 : index * 0.05,
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
        onMouseEnter={() => !isMobile && setIsHoveredInternal(true)}
        onMouseLeave={() => !isMobile && setIsHoveredInternal(false)}
        onClick={() => isMobile && setIsClicked(!isClicked)}
      >
        {/* Neural node core with enhanced clickability */}
        <motion.div
          className={clsx(
            'relative w-full h-full rounded-full border-2 backdrop-blur-sm overflow-hidden',
            'flex items-center justify-center cursor-pointer transition-all duration-300',
            tile.highlight
              ? 'border-purple-400/50 bg-gradient-to-br from-purple-500/30 to-blue-500/30'
              : 'border-blue-400/50 bg-gradient-to-br from-blue-500/20 to-purple-500/20',
            'hover:border-white/60 hover:scale-105'
          )}
          animate={
            !reduce
              ? {
                  boxShadow: isHoveredInternal
                    ? [
                        `0 0 ${tile.highlight ? '40px' : '30px'} rgba(59, 130, 246, 0.6)`,
                        `0 0 ${tile.highlight ? '50px' : '40px'} rgba(147, 51, 234, 0.7)`,
                        `0 0 ${tile.highlight ? '40px' : '30px'} rgba(59, 130, 246, 0.6)`,
                      ]
                    : [
                        `0 0 ${tile.highlight ? '25px' : '15px'} rgba(59, 130, 246, 0.2)`,
                        `0 0 ${tile.highlight ? '35px' : '25px'} rgba(147, 51, 234, 0.3)`,
                        `0 0 ${tile.highlight ? '25px' : '15px'} rgba(59, 130, 246, 0.2)`,
                      ],
                  scale: isHoveredInternal ? [1, 1.02, 1] : [1, 0.98, 1],
                }
              : {}
          }
          transition={{
            boxShadow: {
              duration: isHoveredInternal ? 1 : 3,
              repeat: Infinity,
            },
            scale: { duration: isHoveredInternal ? 0.5 : 4, repeat: Infinity },
          }}
        >
          {/* Icon */}
          <motion.div
            className='relative z-10'
            animate={
              isHoveredInternal && !reduce ? { rotate: [0, 5, -5, 0] } : {}
            }
            transition={{ duration: 0.5 }}
          >
            <Icon
              name={tile.icon}
              className={clsx(
                'text-white',
                tile.highlight
                  ? isMobileHorizontal
                    ? 'w-5 h-5'
                    : 'w-8 h-8'
                  : isMobileHorizontal
                    ? 'w-3.5 h-3.5'
                    : 'w-5 h-5'
              )}
            />
          </motion.div>

          {/* Pulse rings on hover */}
          <AnimatePresence>
            {isHoveredInternal && !reduce && (
              <>
                <motion.div
                  className='absolute inset-0 rounded-full border border-blue-400/30'
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className='absolute inset-0 rounded-full border border-purple-400/30'
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* REMOVED: Old black label tooltip - we only need the main tooltip above */}

        {/* Hoverable indicator that appears periodically */}
        {!isHoveredInternal && !reduce && (
          <motion.div
            className='absolute -top-2 -right-2 size-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5,
              repeatDelay: 3,
            }}
          >
            <div className='size-2 bg-white rounded-full' />
          </motion.div>
        )}

        {/* Connection indicators for highlighted nodes */}
        {tile.highlight && !reduce && (
          <motion.div
            className='absolute inset-0 rounded-full'
            animate={{
              background: [
                'conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.2) 60deg, transparent 120deg)',
                'conic-gradient(from 60deg, transparent 0deg, rgba(147, 51, 234, 0.2) 60deg, transparent 120deg)',
                'conic-gradient(from 120deg, transparent 0deg, rgba(59, 130, 246, 0.2) 60deg, transparent 120deg)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{ transform: 'scale(1.3)' }}
          />
        )}
      </motion.div>

      {/* Tooltip Portal - Renders outside clipped containers */}
      {tooltipPosition &&
        isTooltipVisible &&
        createPortal(
          <motion.div
            key={`tooltip-${tile.title}`}
            initial={{ opacity: 0, scale: 0.8, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 5 }}
            transition={{ duration: 0.15 }}
            className='fixed w-64 h-32 p-4 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-xl pointer-events-none'
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              zIndex: 9999,
            }}
          >
            <div className='h-full flex flex-col justify-between'>
              <div>
                <h4 className='text-white font-semibold text-sm mb-1 truncate'>
                  {tile.title}
                </h4>
                <p className='text-zinc-300 text-xs leading-relaxed line-clamp-2'>
                  {tile.summary}
                </p>
              </div>
              {tile.badges && tile.badges.length > 0 && (
                <div className='flex flex-wrap gap-1 mt-2'>
                  {tile.badges.slice(0, 2).map((badge, i) => (
                    <span
                      key={i}
                      className='px-2 py-0.5 bg-blue-500/20 text-blue-200 rounded-full text-xs truncate'
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Arrow pointing correctly - hidden on mobile */}
            {!isMobile && (
              <>
                {tooltipPosition.tooltipBelow ? (
                  // Arrow pointing up (tooltip is below bubble)
                  <div
                    className='absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0'
                    style={{
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderBottom: '8px solid rgb(63, 63, 70)', // zinc-700
                    }}
                  >
                    <div
                      className='absolute top-[1px] left-[-7px] w-0 h-0'
                      style={{
                        borderLeft: '7px solid transparent',
                        borderRight: '7px solid transparent',
                        borderBottom: '7px solid rgb(24, 24, 27)', // zinc-900
                      }}
                    />
                  </div>
                ) : (
                  // Arrow pointing down (tooltip is above bubble)
                  <div
                    className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0'
                    style={{
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderTop: '8px solid rgb(63, 63, 70)', // zinc-700
                    }}
                  >
                    <div
                      className='absolute bottom-[1px] left-[-7px] w-0 h-0'
                      style={{
                        borderLeft: '7px solid transparent',
                        borderRight: '7px solid transparent',
                        borderTop: '7px solid rgb(24, 24, 27)', // zinc-900
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </motion.div>,
          document.body
        )}
    </>
  );
}
