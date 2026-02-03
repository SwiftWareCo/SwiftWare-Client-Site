"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { CapabilityTile } from "@/types/content";
import {
    motion,
    useReducedMotion,
    useInView,
    AnimatePresence,
} from "motion/react";
import Icon from "@/components/ui/Icon";
import clsx from "clsx";

type Props = { tiles: CapabilityTile[]; title?: string };

// Golf course stations order
const GOLF_STATIONS = ["Pro Shop", "Tee Box", "Fairway", "Green", "Clubhouse"];

function sortGolfStations(categories: string[]): string[] {
    const preferred = categories.filter((c) => GOLF_STATIONS.includes(c));
    const remaining = categories
        .filter((c) => !GOLF_STATIONS.includes(c))
        .sort((a, b) => a.localeCompare(b));
    const ordered: string[] = [];
    for (const name of GOLF_STATIONS)
        if (preferred.includes(name)) ordered.push(name);
    return [...ordered, ...remaining];
}

function getGolfStation(tile: CapabilityTile): string {
    return tile.category?.trim() || "Pro Shop";
}

export default function GolfCapabilitiesSection({ tiles }: Props) {
    const reduce = useReducedMotion() ?? false;
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });

    const stations = useMemo(() => {
        const uniq = Array.from(new Set(tiles.map(getGolfStation)));
        return sortGolfStations(uniq);
    }, [tiles]);

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const [activeIdx, setActiveIdx] = useState(0);

    const activeStation = stations[activeIdx] ?? stations[0] ?? "Pro Shop";

    const filtered = useMemo(
        () =>
            isMobile
                ? tiles.filter((t) => getGolfStation(t) === activeStation)
                : tiles,
        [tiles, activeStation, isMobile],
    );

    // Generate golf course hole layout positions
    const nodePositions = useMemo(() => {
        const positions: Array<{
            x: number;
            y: number;
            tile: CapabilityTile;
            nodeSize: number;
        }> = [];
        const isMobile =
            typeof window !== "undefined" && window.innerWidth < 768;
        const containerWidth = isMobile ? 350 : 900;
        const containerHeight = isMobile ? 180 : 500;

        if (isMobile) {
            // Mobile: Simple horizontal layout like tee markers
            const spacing = 80;
            const startX = 40;
            const centerY = containerHeight / 2;

            filtered.forEach((tile, i) => {
                const x = startX + i * spacing;
                const nodeSize = tile.highlight ? 60 : 45;
                positions.push({ x, y: centerY, tile, nodeSize });
            });
        } else {
            // Desktop: Golf course hole layout (tee to green flow)
            const centerX = containerWidth / 2;
            const centerY = containerHeight / 2;

            // Create a golf course flow: tee -> fairway -> green pattern
            filtered.forEach((tile, i) => {
                const station = getGolfStation(tile);
                let x: number, y: number, nodeSize: number;

                switch (station) {
                    case "Pro Shop":
                        // Pro shop at entrance (left side)
                        x = 80 + (i % 2) * 60;
                        y = 100 + Math.floor(i / 2) * 80;
                        nodeSize = tile.highlight ? 85 : 70;
                        break;
                    case "Tee Box":
                        // Tee boxes at starting positions
                        x = 200 + (i % 3) * 70;
                        y = 80 + Math.floor(i / 3) * 100;
                        nodeSize = tile.highlight ? 80 : 65;
                        break;
                    case "Fairway":
                        // Fairway in the middle, spread out
                        x = centerX + ((i % 4) - 1.5) * 90;
                        y = centerY + (Math.floor(i / 4) - 0.5) * 80;
                        nodeSize = tile.highlight ? 90 : 70;
                        break;
                    case "Green":
                        // Greens toward the end (right side)
                        x = containerWidth - 150 + (i % 2) * 60;
                        y = 120 + Math.floor(i / 2) * 90;
                        nodeSize = tile.highlight ? 85 : 70;
                        break;
                    case "Clubhouse":
                        // Clubhouse at the end (bottom right)
                        x = containerWidth - 100 + (i % 2) * 40;
                        y = containerHeight - 100 + Math.floor(i / 2) * 50;
                        nodeSize = tile.highlight ? 95 : 75;
                        break;
                    default:
                        // Default circular arrangement
                        const angle = (i * 2 * Math.PI) / filtered.length;
                        const radius = 150;
                        x = centerX + Math.cos(angle) * radius;
                        y = centerY + Math.sin(angle) * radius;
                        nodeSize = tile.highlight ? 80 : 65;
                }

                // Ensure positions stay within bounds
                positions.push({
                    x: Math.max(50, Math.min(containerWidth - 50, x)),
                    y: Math.max(30, Math.min(containerHeight - 30, y)),
                    tile,
                    nodeSize,
                });
            });
        }

        return positions;
    }, [filtered]);

    // Canvas golf course connections (desktop only)
    useEffect(() => {
        if (!canvasRef.current || reduce || !inView) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const isMobile = window.innerWidth < 768;
        const container = canvas.parentElement;
        if (container) {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        } else {
            canvas.width = isMobile ? 350 : 900;
            canvas.height = isMobile ? 180 : 500;
        }

        if (isMobile) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw golf course flow connections
            nodePositions.forEach((node, i) => {
                nodePositions.forEach((otherNode, j) => {
                    if (i >= j) return;

                    const nodeStation = getGolfStation(node.tile);
                    const otherStation = getGolfStation(otherNode.tile);

                    // Only connect nodes in logical golf course flow
                    const shouldConnect =
                        (nodeStation === "Pro Shop" &&
                            otherStation === "Tee Box") ||
                        (nodeStation === "Tee Box" &&
                            otherStation === "Fairway") ||
                        (nodeStation === "Fairway" &&
                            otherStation === "Green") ||
                        (nodeStation === "Green" &&
                            otherStation === "Clubhouse") ||
                        nodeStation === otherStation; // Same station nodes

                    if (!shouldConnect) return;

                    const distance = Math.sqrt(
                        Math.pow(node.x - otherNode.x, 2) +
                            Math.pow(node.y - otherNode.y, 2),
                    );

                    if (distance < 200 && distance > 20) {
                        const angle = Math.atan2(
                            otherNode.y - node.y,
                            otherNode.x - node.x,
                        );
                        const startRadius = node.nodeSize / 2;
                        const endRadius = otherNode.nodeSize / 2;

                        const startX = node.x + Math.cos(angle) * startRadius;
                        const startY = node.y + Math.sin(angle) * startRadius;
                        const endX = otherNode.x - Math.cos(angle) * endRadius;
                        const endY = otherNode.y - Math.sin(angle) * endRadius;

                        const opacity = Math.max(0.2, 1 - distance / 200);
                        const time = Date.now() * 0.0008;
                        const pulse = (Math.sin(time + i * 0.3) + 1) * 0.5;

                        // Use golf course green color theme
                        ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * pulse * 0.8})`;
                        ctx.lineWidth = 1.5 + pulse * 0.5;

                        const midX = (startX + endX) / 2;
                        const midY = (startY + endY) / 2;
                        const curveOffset = Math.sin(time + i) * 8;

                        ctx.beginPath();
                        ctx.moveTo(startX, startY);
                        ctx.quadraticCurveTo(
                            midX + curveOffset,
                            midY + curveOffset,
                            endX,
                            endY,
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
            id="capabilities"
            aria-labelledby="capabilities-heading"
            ref={sectionRef}
            className="py-2 relative overflow-hidden w-full"
        >
            {/* Golf course background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 right-1/4 size-96 bg-emerald-500/8 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 size-80 bg-green-500/6 rounded-full blur-3xl" />

                {/* Floating golf elements */}
                {!reduce && inView && (
                    <>
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute size-1 bg-emerald-400/50 rounded-full"
                                style={{
                                    left: `${25 + ((i * 9) % 50)}%`,
                                    top: `${35 + ((i * 127) % 60)}%`,
                                }}
                                animate={{
                                    y: [0, -15, 0],
                                    opacity: [0.4, 0.9, 0.4],
                                }}
                                transition={{
                                    duration: 4 + i * 0.3,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                }}
                            />
                        ))}
                    </>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-0 md:px-4 lg:px-6 relative w-full">
                {/* Golf Course Header */}
                <div className="text-center mb-16">
                    <h2
                        id="capabilities-heading"
                        className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-100 to-green-100 bg-clip-text text-transparent"
                    >
                        Course Operations
                    </h2>
                    <p className="text-xl p-2 text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                        From tee to green, every aspect of your golf course
                        operations working in perfect harmony
                    </p>
                </div>

                {/* Golf Station Selectors - Mobile Only */}
                {isMobile && (
                    <div className="flex justify-center mb-12 md:mb-20 px-4 md:px-0">
                        <div className="flex items-center gap-1 md:gap-2 p-1 md:p-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl backdrop-blur-sm border border-white/10 overflow-x-auto max-w-full">
                            {stations.map((station, idx) => {
                                const selected = idx === activeIdx;
                                return (
                                    <button
                                        key={station}
                                        onClick={() => setActiveIdx(idx)}
                                        className={clsx(
                                            "relative hover:cursor-pointer px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium rounded-xl transition-all duration-500 whitespace-nowrap shrink-0",
                                            "before:absolute before:inset-0 before:rounded-xl before:transition-all before:duration-500",
                                            selected
                                                ? "bg-gradient-to-r from-emerald-500/30 to-green-500/30 text-white shadow-lg shadow-emerald-500/20"
                                                : "text-zinc-400 hover:text-white hover:bg-white/5",
                                        )}
                                    >
                                        <span className="relative z-10 flex items-center gap-1 md:gap-2">
                                            <div
                                                className={clsx(
                                                    "size-1.5 md:size-2 rounded-full transition-all duration-500",
                                                    selected
                                                        ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                                                        : "bg-zinc-600",
                                                )}
                                            />
                                            {station}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Golf Course Visualization */}
                <div
                    ref={containerRef}
                    className="relative px-4 md:px-0 h-[200px] md:h-[500px] mb-8"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStation}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.23, 1, 0.32, 1],
                            }}
                            className="relative"
                        >
                            <motion.div className="relative h-[180px] md:h-[500px] mx-auto max-w-full md:max-w-[900px]">
                                {/* Golf course connections canvas */}
                                <canvas
                                    ref={canvasRef}
                                    className="absolute inset-0 pointer-events-none z-0"
                                    style={{ width: "100%", height: "100%" }}
                                />

                                {/* Mobile: Horizontal scrollable */}
                                <div className="md:hidden overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] h-[120px]">
                                    <div className="flex items-center justify-center h-full gap-4 px-4 min-w-max">
                                        <AnimatePresence>
                                            {nodePositions.map(
                                                ({ tile, nodeSize }, i) => (
                                                    <div
                                                        key={`${activeStation}-${tile.title}`}
                                                        className="shrink-0"
                                                    >
                                                        <GolfCapabilityNode
                                                            tile={tile}
                                                            x={0}
                                                            y={0}
                                                            index={i}
                                                            reduce={reduce}
                                                            isMobileHorizontal={
                                                                true
                                                            }
                                                            nodeSize={nodeSize}
                                                        />
                                                    </div>
                                                ),
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Desktop: Golf course positioned nodes */}
                                <div className="hidden md:block h-[500px] relative">
                                    <AnimatePresence>
                                        {nodePositions.map(
                                            ({ x, y, tile, nodeSize }, i) => (
                                                <GolfCapabilityNode
                                                    key={`${activeStation}-${tile.title}`}
                                                    tile={tile}
                                                    x={x}
                                                    y={y}
                                                    index={i}
                                                    reduce={reduce}
                                                    isMobileHorizontal={false}
                                                    nodeSize={nodeSize}
                                                />
                                            ),
                                        )}
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

function GolfCapabilityNode({
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
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const nodeRef = useRef<HTMLDivElement>(null);

    const isTooltipVisible = isMobile ? isClicked : isHoveredInternal;

    useEffect(() => {
        if (!isMobile) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                nodeRef.current &&
                !nodeRef.current.contains(event.target as Node)
            ) {
                setIsClicked(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobile]);

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
                top = rect.bottom + gap;
                left = rect.left + rect.width / 2 - tooltipWidth / 2;
                tooltipBelow = true;
            } else {
                const preferredTop =
                    rect.top - tooltipHeight - arrowHeight - gap;
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

            left = Math.max(
                10,
                Math.min(window.innerWidth - tooltipWidth - 10, left),
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
                className={`cursor-pointer group ${isMobileHorizontal ? "relative" : "absolute"}`}
                style={{
                    ...containerStyle,
                    zIndex: isTooltipVisible ? 50 : 20,
                }}
                initial={
                    reduce
                        ? false
                        : {
                              opacity: 0,
                              scale: 0,
                              rotate: -90,
                              y: isMobileHorizontal ? 0 : -30,
                          }
                }
                animate={{
                    opacity: 1,
                    scale: isHoveredInternal ? 1.05 : 1,
                    rotate: 0,
                    y: 0,
                }}
                exit={
                    reduce
                        ? undefined
                        : {
                              opacity: 0,
                              scale: 0.9,
                              rotate: 90,
                              y: isMobileHorizontal ? 0 : 30,
                              transition: { duration: 0.3 },
                          }
                }
                transition={{
                    duration: 0.4,
                    delay: reduce ? 0 : index * 0.08,
                    type: "spring",
                    stiffness: 280,
                    damping: 25,
                }}
                onMouseEnter={() => !isMobile && setIsHoveredInternal(true)}
                onMouseLeave={() => !isMobile && setIsHoveredInternal(false)}
                onClick={() => isMobile && setIsClicked(!isClicked)}
            >
                {/* Golf-themed node */}
                <motion.div
                    className={clsx(
                        "relative w-full h-full rounded-full border-2 backdrop-blur-sm overflow-hidden",
                        "flex items-center justify-center cursor-pointer transition-all duration-300",
                        tile.highlight
                            ? "border-emerald-400/60 bg-gradient-to-br from-emerald-500/40 to-green-500/30"
                            : "border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 to-green-500/15",
                        "hover:border-white/70 hover:scale-105",
                    )}
                    animate={
                        !reduce
                            ? {
                                  boxShadow: isHoveredInternal
                                      ? [
                                            `0 0 ${tile.highlight ? "35px" : "25px"} rgba(16, 185, 129, 0.4)`,
                                            `0 0 ${tile.highlight ? "45px" : "35px"} rgba(34, 197, 94, 0.5)`,
                                            `0 0 ${tile.highlight ? "35px" : "25px"} rgba(16, 185, 129, 0.4)`,
                                        ]
                                      : [
                                            `0 0 ${tile.highlight ? "20px" : "12px"} rgba(16, 185, 129, 0.2)`,
                                            `0 0 ${tile.highlight ? "30px" : "20px"} rgba(34, 197, 94, 0.3)`,
                                            `0 0 ${tile.highlight ? "20px" : "12px"} rgba(16, 185, 129, 0.2)`,
                                        ],
                                  scale: isHoveredInternal
                                      ? [1, 1.01, 1]
                                      : [1, 0.99, 1],
                              }
                            : {}
                    }
                    transition={{
                        boxShadow: {
                            duration: isHoveredInternal ? 1.2 : 3.5,
                            repeat: Infinity,
                        },
                        scale: {
                            duration: isHoveredInternal ? 0.6 : 4.5,
                            repeat: Infinity,
                        },
                    }}
                >
                    {/* Icon */}
                    <motion.div
                        className="relative z-10"
                        animate={
                            isHoveredInternal && !reduce
                                ? { rotate: [0, 3, -3, 0] }
                                : {}
                        }
                        transition={{ duration: 0.6 }}
                    >
                        <Icon
                            name={tile.icon}
                            className={clsx(
                                "text-white",
                                tile.highlight
                                    ? isMobileHorizontal
                                        ? "w-5 h-5"
                                        : "w-8 h-8"
                                    : isMobileHorizontal
                                      ? "w-3.5 h-3.5"
                                      : "w-5 h-5",
                            )}
                        />
                    </motion.div>

                    {/* Golf ball pulse rings on hover */}
                    <AnimatePresence>
                        {isHoveredInternal && !reduce && (
                            <>
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-emerald-400/40"
                                    initial={{ scale: 1, opacity: 0.7 }}
                                    animate={{ scale: 1.4, opacity: 0 }}
                                    exit={{ scale: 1, opacity: 0 }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                    }}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-green-400/40"
                                    initial={{ scale: 1, opacity: 0.7 }}
                                    animate={{ scale: 1.8, opacity: 0 }}
                                    exit={{ scale: 1, opacity: 0 }}
                                    transition={{
                                        duration: 1.8,
                                        repeat: Infinity,
                                        delay: 0.3,
                                    }}
                                />
                            </>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Golf flag indicator */}
                {!isHoveredInternal && !reduce && (
                    <motion.div
                        className="absolute -top-2 -right-2 size-4 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1.1, 1, 0],
                            rotate: [0, 90, 180],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: index * 0.4,
                            repeatDelay: 4,
                        }}
                    >
                        <div className="size-2 bg-white rounded-full" />
                    </motion.div>
                )}
            </motion.div>

            {/* Tooltip Portal */}
            {tooltipPosition &&
                isTooltipVisible &&
                createPortal(
                    <motion.div
                        key={`tooltip-${tile.title}`}
                        initial={{ opacity: 0, scale: 0.8, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="fixed w-64 h-32 p-4 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-xl pointer-events-none"
                        style={{
                            top: tooltipPosition.top,
                            left: tooltipPosition.left,
                            zIndex: 9999,
                        }}
                    >
                        <div className="h-full flex flex-col justify-between">
                            <div>
                                <h4 className="text-white font-semibold text-sm mb-1 truncate">
                                    {tile.title}
                                </h4>
                                <p className="text-zinc-300 text-xs leading-relaxed line-clamp-2">
                                    {tile.summary}
                                </p>
                            </div>
                            {tile.badges && tile.badges.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {tile.badges.slice(0, 2).map((badge, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-0.5 bg-emerald-500/20 text-emerald-200 rounded-full text-xs truncate"
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Arrow */}
                        {!isMobile && (
                            <>
                                {tooltipPosition.tooltipBelow ? (
                                    <div
                                        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0"
                                        style={{
                                            borderLeft: "8px solid transparent",
                                            borderRight:
                                                "8px solid transparent",
                                            borderBottom:
                                                "8px solid rgb(63, 63, 70)",
                                        }}
                                    >
                                        <div
                                            className="absolute top-[1px] left-[-7px] w-0 h-0"
                                            style={{
                                                borderLeft:
                                                    "7px solid transparent",
                                                borderRight:
                                                    "7px solid transparent",
                                                borderBottom:
                                                    "7px solid rgb(24, 24, 27)",
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0"
                                        style={{
                                            borderLeft: "8px solid transparent",
                                            borderRight:
                                                "8px solid transparent",
                                            borderTop:
                                                "8px solid rgb(63, 63, 70)",
                                        }}
                                    >
                                        <div
                                            className="absolute bottom-[1px] left-[-7px] w-0 h-0"
                                            style={{
                                                borderLeft:
                                                    "7px solid transparent",
                                                borderRight:
                                                    "7px solid transparent",
                                                borderTop:
                                                    "7px solid rgb(24, 24, 27)",
                                            }}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>,
                    document.body,
                )}
        </>
    );
}
