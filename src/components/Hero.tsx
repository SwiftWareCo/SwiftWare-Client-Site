'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

// Particle System Component
const ParticleSystem = () => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
  }>>([]);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mounted]);

  // Always render the same structure - just don't draw anything until mounted
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: mounted ? 1 : 0 }}
      />
      {!mounted && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />
      )}
    </div>
  );
};

// Animated Code Editor Component
const AnimatedCodeEditor = () => {
  const [mounted, setMounted] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const codeLines = [
      'const swiftware = {',
      '  expertise: "Full-Stack Development",',
      '  speed: "Rapid Delivery",',
      '  quality: "Enterprise Grade",',
      '  clients: 127,',
      '  satisfaction: "94%",',
      '  responseTime: "< 24hrs"',
      '};',
      '',
      '// Ready to build your future?',
      'swiftware.startProject();'
    ];

    const interval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setDisplayedCode(prev => prev + codeLines[currentLine] + '\n');
        setCurrentLine(prev => prev + 1);
      } else {
        // Reset after a delay
        setTimeout(() => {
          setCurrentLine(0);
          setDisplayedCode('');
        }, 3000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [mounted, currentLine]);

  // Static code display during SSR
  if (!mounted) {
    const staticCode = `const swiftware = {
  expertise: "Full-Stack Development",
  speed: "Rapid Delivery", 
  quality: "Enterprise Grade",
  clients: 127,
  satisfaction: "94%",
  responseTime: "< 24hrs"
};

// Ready to build your future?
swiftware.startProject();`;

    return (
      <div className="relative bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400 text-sm ml-4">swiftware.js</span>
        </div>
        <pre className="text-green-400 font-mono text-sm leading-relaxed">
          {staticCode}
        </pre>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 text-sm ml-4">swiftware.js</span>
      </div>
      <pre className="text-green-400 font-mono text-sm leading-relaxed">
        {displayedCode}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-white"
        >
          |
        </motion.span>
      </pre>
    </motion.div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [mounted, isInView, end, duration]);

  // Show final value during SSR
  if (!mounted) {
    return <span ref={ref}>{end}</span>;
  }

  return <span ref={ref}>{count}</span>;
};

// Status Indicator Component
const StatusIndicator = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Static version for SSR
  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-green-400">
        <div className="w-2 h-2 bg-green-400 rounded-full" />
        <span className="text-sm font-medium">All Systems Operational</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="flex items-center gap-2 text-green-400"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-2 h-2 bg-green-400 rounded-full"
      />
      <span className="text-sm font-medium">All Systems Operational</span>
    </motion.div>
  );
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <ParticleSystem />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <motion.div
            initial={mounted ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Logo */}
            <motion.div
              initial={mounted ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-none">
                SWIFTWARE
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <p className="text-2xl lg:text-3xl font-light text-gray-300 leading-relaxed">
                We don&apos;t just write code.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                  We architect digital futures.
                </span>
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8 space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-purple-400">
                  <AnimatedCounter end={127} />
                </div>
                <span className="text-gray-300">Projects Delivered</span>
              </div>
              <StatusIndicator />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
              <button className="btn-primary"> test </button>
                <motion.button
                  whileHover={mounted ? { scale: 1.05, y: -2 } : {}}
                  whileTap={mounted ? { scale: 0.95 } : {}}
                  className="btn-primary"
                >
                  Start Your Project
                  <motion.span
                    animate={mounted ? { x: [0, 5, 0] } : {}}
                    transition={mounted ? { duration: 1.5, repeat: Infinity } : {}}
                  >
                    →
                  </motion.span>
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={mounted ? { scale: 1.05, y: -2 } : {}}
                  whileTap={mounted ? { scale: 0.95 } : {}}
                  className="px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-xl hover:bg-purple-400 hover:text-white transition-all duration-300"
                >
                  View Our Work
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Code Editor */}
          <motion.div
            initial={mounted ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <AnimatedCodeEditor />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={mounted ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={mounted ? { y: [0, 10, 0] } : {}}
          transition={mounted ? { duration: 2, repeat: Infinity } : {}}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={mounted ? { y: [0, 12, 0] } : {}}
            transition={mounted ? { duration: 2, repeat: Infinity } : {}}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}