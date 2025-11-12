'use client';
import { motion, useTransform, MotionValue, useSpring } from 'motion/react';
import { Cog } from 'lucide-react';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Plane, useTexture } from '@react-three/drei';

const Glow = ({ colorVar }: { colorVar: string }) => (
  <motion.div
    className='absolute inset-0 blur-2xl'
    style={{ background: `var(${colorVar})`, opacity: 0.4 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    transition={{ duration: 1, delay: 0.5 }}
  />
);

// Foundation Visual: Logo
const LogoTile = ({
  i,
  j,
  numTiles,
  texture,
  progress,
}: {
  i: number;
  j: number;
  numTiles: number;
  texture: THREE.Texture;
  progress: MotionValue<number>;
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  const tileSize = 1 / numTiles;

  const [startPosition] = useState(() => new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8));
  const endPosition = useMemo(
    () => new THREE.Vector3((i - numTiles / 2 + 0.5) * tileSize * 3, ((numTiles - 1 - j) - numTiles / 2 + 0.5) * tileSize * 3, 0),
    [i, j, numTiles, tileSize]
  );

  const animationProgress = useTransform(progress, [0.1, 0.8], [0, 1]);

  useFrame(() => {
    const p = animationProgress.get();
    if (ref.current) {
      ref.current.position.lerpVectors(startPosition, endPosition, p);
    }
  });

  const clonedTexture = useMemo(() => {
    const clone = texture.clone();
    clone.needsUpdate = true;
    clone.repeat.set(1 / numTiles, 1 / numTiles);
    clone.offset.set(i / numTiles, 1 - (j + 1) / numTiles);
    return clone;
  }, [texture, i, j, numTiles]);

  return (
    <Plane ref={ref} args={[tileSize * 3, tileSize * 3]}>
      <meshBasicMaterial map={clonedTexture} transparent={true} />
    </Plane>
  );
};

const FoundationScene = ({ progress }: { progress: MotionValue<number> }) => {
  const logoTexture = useTexture('/images/swiftware-logo.png');
  const numTiles = 8;

  return (
    <group>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      {Array.from({ length: numTiles * numTiles }).map((_, index) => {
        const i = index % numTiles;
        const j = Math.floor(index / numTiles);
        return <LogoTile key={index} i={i} j={j} numTiles={numTiles} texture={logoTexture} progress={progress} />;
      })}
    </group>
  );
}

const FoundationVisual = ({ progress }: { progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity }} className='absolute inset-0'>
      <div className='relative w-full h-full'>
        <Glow colorVar='--color-service-brand' />
        <Canvas camera={{ position: [0, 0, 5], fov: 25 }}>
          <FoundationScene progress={progress} />
        </Canvas>
      </div>
    </motion.div>
  );
};

// Engine Visual: 3D Gears
// Engine Visual: 2D Funnel
const EngineVisual = ({ progress }: { progress: MotionValue<number> }) => {
  const scale = useTransform(progress, [0, 1], [0.8, 1]);
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const motorRotation = useTransform(progress, [0, 1], [0, 360 * 4]);
  const mainRotation = useTransform(motorRotation, val => -val / 2);
  const secondaryRotation = useTransform(mainRotation, val => -val * 1.5);

  return (
    <motion.div style={{ scale, opacity }} className='absolute inset-0 flex items-center justify-center'>
      <div className='relative w-64 h-48'>
        <Glow colorVar='--color-service-marketing' />
        
        {/* Engine Block */}
        <div className="absolute inset-0 border-2 border-white/10 rounded-xl bg-black/10" />

        <div className="w-full h-full relative">
            {/* Motor Gear (bottom) */}
            <motion.div
                className="absolute bottom-4 left-4"
                style={{ 
                    rotate: motorRotation, 
                    filter: 'drop-shadow(0 0 5px var(--color-service-marketing))'
                }}
            >
                <Cog className="w-16 h-16 text-white/40" strokeWidth={2.5} />
            </motion.div>

            {/* Main Gear (center) */}
            <motion.div
                className="absolute top-1/2 left-1/2"
                style={{ 
                    rotate: mainRotation, 
                    x: "-50%", 
                    y: "-50%",
                    filter: 'drop-shadow(0 0 8px var(--color-service-marketing))'
                }}
            >
                <Cog className="w-24 h-24 text-white/50" strokeWidth={2.5} />
            </motion.div>

            {/* Secondary Gear (top-right) */}
            <motion.div
                className="absolute top-4 right-4"
                style={{ 
                    rotate: secondaryRotation,
                    filter: 'drop-shadow(0 0 5px var(--color-service-marketing))'
                }}
            >
                <Cog className="w-16 h-16 text-white/30" strokeWidth={2.5} />
            </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Framework Visual: 3D
const FramePlane = ({ position, rotation, progress, delay, color }: { position: [number, number, number], rotation: [number, number, number], progress: MotionValue<number>, delay: number, color: string }) => {
    const ref = useRef<THREE.Mesh>(null!);
    const startPos = new THREE.Vector3(position[0], position[1] - 5, position[2]);
    const animProgress = useTransform(progress, [delay, delay + 0.4], [0, 1]);
    useFrame(() => {
        const p = animProgress.get();
        if(ref.current) {
            ref.current.position.lerpVectors(startPos, new THREE.Vector3(...position), p);
        }
    });
    return (
        <Plane ref={ref} args={[2, 2]} position={startPos} rotation={rotation}>
            <meshStandardMaterial color={color} side={THREE.DoubleSide} wireframe={true} emissive={color} emissiveIntensity={0.7} />
        </Plane>
    )
}

const FrameworkScene = ({ progress, color }: { progress: MotionValue<number>, color: string }) => {
  const groupRotation = useTransform(progress, [0, 1], [0, Math.PI * 2]);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
      if(groupRef.current) {
          groupRef.current.rotation.y = groupRotation.get();
      }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <FramePlane position={[-1.2, 0, 0]} rotation={[0, Math.PI/2, 0]} progress={progress} delay={0.1} color={color} />
      <FramePlane position={[1.2, 0, 0]} rotation={[0, -Math.PI/2, 0]} progress={progress} delay={0.2} color={color} />
      <FramePlane position={[0, -1.2, 0]} rotation={[Math.PI/2, 0, 0]} progress={progress} delay={0.3} color={color} />
      <FramePlane position={[0, 1.2, 0]} rotation={[-Math.PI/2, 0, 0]} progress={progress} delay={0.4} color={color} />
    </group>
  );
}

const FrameworkVisual = ({ progress }: { progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const [softwareColor, setSoftwareColor] = useState('#000000');

  useEffect(() => {
    setSoftwareColor(getComputedStyle(document.documentElement).getPropertyValue('--color-service-software').trim() || '#007bff');
  }, []);

  return (
    <motion.div style={{ opacity }} className='absolute inset-0'>
        <div className='relative w-full h-full'>
            <Glow colorVar='--color-service-software' />
            <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
                <FrameworkScene progress={progress} color={softwareColor} />
            </Canvas>
        </div>
    </motion.div>
  );
};


const FlywheelVisual = ({ progress }: { progress: MotionValue<number> }) => {
  const scale = useTransform(progress, [0, 1], [0.8, 1]);
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const rotate = useTransform(progress, [0, 1], [0, 360]);

  return (
    <motion.div style={{ scale, opacity, rotate }} className='absolute inset-0 flex items-center justify-center'>
      <div className='relative w-48 h-48'>
        <Glow colorVar='--color-service-ai' />
        <motion.div
          className='absolute inset-0 rounded-full border-8 border-[var(--color-service-ai)]'
          style={{
            borderStyle: 'dashed',
            borderColor: 'var(--color-service-ai)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <div className='absolute inset-4 rounded-full border-4 border-[var(--color-service-ai)]/50' />
      </div>
    </motion.div>
  );
};

const VisualScene = ({
  VisualComponent,
  scrollYProgress,
  start,
  end,
}: {
  VisualComponent: React.FC<{ progress: MotionValue<number> }>;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}) => {
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);
  return <VisualComponent progress={progress} />;
};

export const SwiftwareWayVisuals = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const numScenes = 4;
  const sceneBreakpoints = Array.from({ length: numScenes }, (_, i) => i / numScenes);

  const visuals: React.FC<{ progress: MotionValue<number> }>[] = [
    FoundationVisual,
    EngineVisual,
    FrameworkVisual,
    FlywheelVisual,
  ];

  return (
    <div className='relative w-full h-64'>
      {visuals.map((Visual, i) => {
        const start = sceneBreakpoints[i];
        const end = sceneBreakpoints[i + 1] ?? 1.0;
        return <VisualScene key={i} VisualComponent={Visual} scrollYProgress={smoothScrollYProgress} start={start} end={end} />;
      })}
    </div>
  );
};
