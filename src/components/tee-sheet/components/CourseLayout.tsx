'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Flag, MapPin } from 'lucide-react';

interface Hole {
  number: number;
  par: number;
  yardage: number;
  difficulty: 'easy' | 'medium' | 'hard';
  status?: 'open' | 'busy' | 'maintenance';
}

interface CourseLayoutProps {
  className?: string;
}

// Mock 18-hole course data
const mockHoles: Hole[] = [
  { number: 1, par: 4, yardage: 385, difficulty: 'easy', status: 'busy' },
  { number: 2, par: 3, yardage: 165, difficulty: 'medium', status: 'open' },
  { number: 3, par: 5, yardage: 520, difficulty: 'hard', status: 'busy' },
  { number: 4, par: 4, yardage: 410, difficulty: 'medium', status: 'open' },
  { number: 5, par: 3, yardage: 140, difficulty: 'easy', status: 'busy' },
  { number: 6, par: 4, yardage: 395, difficulty: 'medium', status: 'open' },
  { number: 7, par: 5, yardage: 485, difficulty: 'hard', status: 'busy' },
  { number: 8, par: 4, yardage: 375, difficulty: 'easy', status: 'open' },
  { number: 9, par: 4, yardage: 420, difficulty: 'medium', status: 'busy' },
  { number: 10, par: 4, yardage: 405, difficulty: 'medium', status: 'busy' },
  { number: 11, par: 3, yardage: 175, difficulty: 'hard', status: 'open' },
  { number: 12, par: 5, yardage: 545, difficulty: 'hard', status: 'busy' },
  { number: 13, par: 4, yardage: 390, difficulty: 'easy', status: 'open' },
  { number: 14, par: 3, yardage: 155, difficulty: 'medium', status: 'busy' },
  { number: 15, par: 4, yardage: 425, difficulty: 'medium', status: 'open' },
  { number: 16, par: 5, yardage: 510, difficulty: 'hard', status: 'busy' },
  { number: 17, par: 3, yardage: 180, difficulty: 'hard', status: 'open' },
  { number: 18, par: 4, yardage: 440, difficulty: 'medium', status: 'busy' },
];

export default function CourseLayout({ className = '' }: CourseLayoutProps) {
  const [selectedHole, setSelectedHole] = useState<number | null>(null);
  const [holes, setHoles] = useState<Hole[]>(mockHoles);
  const svgRef = useRef<SVGSVGElement>(null);

  // Simulate real-time hole status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setHoles((prev) =>
        prev.map((hole) => {
          if (Math.random() > 0.9) {
            const statuses: ('open' | 'busy' | 'maintenance')[] = [
              'open',
              'busy',
            ];
            const newStatus =
              statuses[Math.floor(Math.random() * statuses.length)];
            return { ...hole, status: newStatus };
          }
          return hole;
        })
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getDifficultyColor = (difficulty: Hole['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return '#10B981'; // emerald-500
      case 'medium':
        return '#F59E0B'; // amber-500
      case 'hard':
        return '#EF4444'; // red-500
    }
  };

  const getStatusColor = (status?: 'open' | 'busy' | 'maintenance') => {
    switch (status) {
      case 'open':
        return '#10B981'; // emerald-500
      case 'busy':
        return '#F59E0B'; // amber-500
      case 'maintenance':
        return '#EF4444'; // red-500
      default:
        return '#6B7280'; // gray-500
    }
  };

  // Generate course layout coordinates (simplified)
  const generateHolePosition = (holeNumber: number) => {
    const row = Math.floor((holeNumber - 1) / 6);
    const col = (holeNumber - 1) % 6;
    const x = 50 + col * 80;
    const y = 50 + row * 100;
    return { x, y };
  };

  return (
    <div className={`${className}`}>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-white flex items-center gap-2'>
          <MapPin className='w-5 h-5 text-emerald-400' />
          Course Status
        </h3>
        <div className='flex items-center gap-4 text-xs text-zinc-300'>
          <div className='flex items-center gap-1'>
            <div className='w-2 h-2 bg-emerald-500 rounded-full' />
            Open
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-2 h-2 bg-amber-500 rounded-full' />
            Busy
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-2 h-2 bg-red-500 rounded-full' />
            Maintenance
          </div>
        </div>
      </div>

      {/* Course Map */}
      <div className='relative bg-gradient-to-br from-emerald-900/20 to-emerald-700/10 rounded-lg p-4 border border-emerald-500/20'>
        <svg
          ref={svgRef}
          viewBox='0 0 600 400'
          className='w-full h-64 md:h-80'
          style={{
            background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
          }}
        >
          {/* Course background elements */}
          <defs>
            <pattern
              id='grass'
              patternUnits='userSpaceOnUse'
              width='20'
              height='20'
            >
              <rect width='20' height='20' fill='#065f46' />
              <circle cx='10' cy='10' r='1' fill='#10b981' opacity='0.3' />
            </pattern>
          </defs>
          <rect width='600' height='400' fill='url(#grass)' />

          {/* Course holes */}
          {holes.map((hole) => {
            const { x, y } = generateHolePosition(hole.number);
            const isSelected = selectedHole === hole.number;

            return (
              <g key={hole.number}>
                {/* Hole area */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 25 : 20}
                  fill={getDifficultyColor(hole.difficulty)}
                  fillOpacity={0.3}
                  stroke={getDifficultyColor(hole.difficulty)}
                  strokeWidth={isSelected ? 3 : 2}
                  className='cursor-pointer'
                  onClick={() =>
                    setSelectedHole(isSelected ? null : hole.number)
                  }
                  animate={{
                    scale: isSelected ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />

                {/* Hole number */}
                <text
                  x={x}
                  y={y - 5}
                  textAnchor='middle'
                  className='text-xs font-bold fill-white cursor-pointer'
                  onClick={() =>
                    setSelectedHole(isSelected ? null : hole.number)
                  }
                >
                  {hole.number}
                </text>

                {/* Par indicator */}
                <text
                  x={x}
                  y={y + 8}
                  textAnchor='middle'
                  className='text-xs fill-emerald-200 cursor-pointer'
                  onClick={() =>
                    setSelectedHole(isSelected ? null : hole.number)
                  }
                >
                  Par {hole.par}
                </text>

                {/* Hole status indicator */}
                {hole.status && (
                  <motion.circle
                    cx={x + 15}
                    cy={y - 15}
                    r={4}
                    fill={getStatusColor(hole.status)}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* Connecting paths (simplified) */}
          {holes.slice(0, -1).map((hole, index) => {
            const start = generateHolePosition(hole.number);
            const end = generateHolePosition(holes[index + 1].number);

            return (
              <line
                key={`path-${hole.number}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke='#10b981'
                strokeWidth='1'
                strokeOpacity='0.3'
                strokeDasharray='3,3'
              />
            );
          })}
        </svg>
      </div>

      {/* Selected hole details */}
      {selectedHole && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-4 p-4 bg-zinc-900/50 border border-zinc-700/50 rounded-lg backdrop-blur-sm'
        >
          {(() => {
            const hole = holes.find((h) => h.number === selectedHole);
            if (!hole) return null;

            return (
              <div>
                <div className='flex items-center justify-between mb-3'>
                  <h4 className='text-white font-semibold flex items-center gap-2'>
                    <Flag className='w-4 h-4 text-emerald-400' />
                    Hole {hole.number}
                  </h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      hole.difficulty === 'easy'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : hole.difficulty === 'medium'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {hole.difficulty}
                  </span>
                </div>

                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <span className='text-zinc-400'>Par:</span>
                    <span className='ml-2 text-white'>{hole.par}</span>
                  </div>
                  <div>
                    <span className='text-zinc-400'>Yardage:</span>
                    <span className='ml-2 text-white'>{hole.yardage}</span>
                  </div>
                </div>

                {hole.status && (
                  <div className='mt-3 pt-3 border-t border-zinc-700/50'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2 text-sm'>
                        <Flag className='w-4 h-4 text-emerald-400' />
                        <span className='text-zinc-300'>Status:</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs text-zinc-400 capitalize'>
                          {hole.status}
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            hole.status === 'open'
                              ? 'bg-emerald-500'
                              : hole.status === 'busy'
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* Course statistics */}
      <div className='mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
        <div className='text-center'>
          <div className='text-emerald-400 font-semibold'>Par 72</div>
          <div className='text-xs text-zinc-400'>Course Par</div>
        </div>
        <div className='text-center'>
          <div className='text-blue-400 font-semibold'>6,847</div>
          <div className='text-xs text-zinc-400'>Total Yards</div>
        </div>
        <div className='text-center'>
          <div className='text-amber-400 font-semibold'>73.2</div>
          <div className='text-xs text-zinc-400'>Course Rating</div>
        </div>
        <div className='text-center'>
          <div className='text-purple-400 font-semibold'>128</div>
          <div className='text-xs text-zinc-400'>Slope Rating</div>
        </div>
      </div>
    </div>
  );
}
