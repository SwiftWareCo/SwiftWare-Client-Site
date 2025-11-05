'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Users, Car, MapPin } from 'lucide-react';

interface TeeTime {
  id: string;
  time: string;
  hole: number;
  players: string[];
  status: 'available' | 'booked' | 'pending';
  memberType?: 'member' | 'guest' | 'tournament';
  cartRequested?: boolean;
}

interface TeeTimeGridProps {
  className?: string;
}

// Mock data for demonstration
const generateMockTeeSheet = (): TeeTime[] => {
  const times = [];
  const startHour = 6;
  const endHour = 18;
  const interval = 8; // 8-minute intervals

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const hole = Math.random() > 0.5 ? 1 : 10; // Tee off from hole 1 or 10

      // Random booking status
      const rand = Math.random();
      let status: TeeTime['status'];
      let players: string[] = [];
      let memberType: TeeTime['memberType'] | undefined;

      if (rand < 0.4) {
        status = 'booked';
        const playerCount = Math.floor(Math.random() * 4) + 1;
        players = Array.from(
          { length: playerCount },
          () =>
            [
              'Smith',
              'Johnson',
              'Williams',
              'Brown',
              'Jones',
              'Garcia',
              'Miller',
            ][Math.floor(Math.random() * 7)]
        );
        memberType = Math.random() > 0.7 ? 'guest' : 'member';
      } else if (rand < 0.5) {
        status = 'pending';
        players = ['Pending...'];
      } else {
        status = 'available';
      }

      times.push({
        id: `${timeStr}-${hole}`,
        time: timeStr,
        hole,
        players,
        status,
        memberType,
        cartRequested: Math.random() > 0.6,
      });
    }
  }

  return times;
};

export default function TeeTimeGrid({ className = '' }: TeeTimeGridProps) {
  const [teeSheet, setTeeSheet] = useState<TeeTime[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentTime] = useState(new Date());

  // Generate mock data on mount
  useEffect(() => {
    setTeeSheet(generateMockTeeSheet());
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTeeSheet((prev) =>
        prev.map((teeTime) => {
          // Randomly update some tee times
          if (Math.random() > 0.95) {
            const newStatus = Math.random() > 0.5 ? 'booked' : 'available';
            return {
              ...teeTime,
              status: newStatus,
              players: newStatus === 'booked' ? ['New Booking'] : [],
            };
          }
          return teeTime;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentTimeStr = useMemo(() => {
    return `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
  }, [currentTime]);

  const getStatusColor = (status: TeeTime['status']) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300';
      case 'booked':
        return 'bg-blue-500/20 border-blue-400/50 text-blue-300';
      case 'pending':
        return 'bg-yellow-500/20 border-yellow-400/50 text-yellow-300';
      default:
        return 'bg-zinc-700/20 border-zinc-600/50 text-zinc-400';
    }
  };

  const getMemberTypeIcon = (memberType?: TeeTime['memberType']) => {
    switch (memberType) {
      case 'guest':
        return <Users className='w-3 h-3 text-purple-400' />;
      case 'tournament':
        return <MapPin className='w-3 h-3 text-gold-400' />;
      default:
        return <Users className='w-3 h-3 text-blue-400' />;
    }
  };

  return (
    <div className={`${className}`}>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-white flex items-center gap-2'>
          <Clock className='w-5 h-5 text-emerald-400' />
          Live Tee Sheet
        </h3>
        <div className='text-sm text-zinc-300'>Current: {currentTimeStr}</div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto custom-scrollbar'>
        <AnimatePresence>
          {teeSheet.slice(0, 20).map((teeTime) => (
            <motion.div
              key={teeTime.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`
                relative p-3 rounded-lg border backdrop-blur-sm cursor-pointer
                transition-all duration-200 hover:scale-105
                ${getStatusColor(teeTime.status)}
                ${selectedTime === teeTime.id ? 'ring-2 ring-blue-400/50' : ''}
              `}
              onClick={() =>
                setSelectedTime(selectedTime === teeTime.id ? null : teeTime.id)
              }
            >
              {/* Time and Hole */}
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center gap-2'>
                  <span className='font-mono text-sm font-medium'>
                    {teeTime.time}
                  </span>
                  <span className='text-xs px-2 py-1 bg-zinc-700/50 rounded-full'>
                    Hole {teeTime.hole}
                  </span>
                </div>
                {teeTime.cartRequested && (
                  <Car className='w-3 h-3 text-zinc-400' />
                )}
              </div>

              {/* Players */}
              <div className='flex items-center gap-2 text-xs'>
                {teeTime.memberType && getMemberTypeIcon(teeTime.memberType)}
                <span className='truncate'>
                  {teeTime.status === 'available'
                    ? 'Available'
                    : teeTime.players.join(', ')}
                </span>
              </div>

              {/* Status indicator */}
              <div className='absolute top-2 right-2'>
                <div
                  className={`
                  w-2 h-2 rounded-full
                  ${
                    teeTime.status === 'available'
                      ? 'bg-emerald-400'
                      : teeTime.status === 'booked'
                        ? 'bg-blue-400'
                        : 'bg-yellow-400'
                  }
                `}
                />
              </div>

              {/* Hover/Selected details */}
              <AnimatePresence>
                {selectedTime === teeTime.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className='mt-3 pt-3 border-t border-white/10'
                  >
                    <div className='text-xs space-y-1 text-zinc-300'>
                      <div>Status: {teeTime.status}</div>
                      {teeTime.memberType && (
                        <div>Type: {teeTime.memberType}</div>
                      )}
                      {teeTime.cartRequested && <div>Cart: Requested</div>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className='mt-4 flex flex-wrap gap-4 text-xs'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-emerald-400 rounded-full' />
          <span className='text-zinc-300'>Available</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-blue-400 rounded-full' />
          <span className='text-zinc-300'>Booked</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-yellow-400 rounded-full' />
          <span className='text-zinc-300'>Pending</span>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(39, 39, 42, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.8);
        }
      `}</style>
    </div>
  );
}
