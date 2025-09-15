'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  AlertTriangle,
} from 'lucide-react';

interface WeatherData {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  alerts: string[];
  forecast: {
    time: string;
    condition: 'sunny' | 'cloudy' | 'rainy';
    temp: number;
  }[];
}

interface WeatherWidgetProps {
  className?: string;
}

// Mock weather data
const mockWeatherData: WeatherData = {
  condition: 'sunny',
  temperature: 72,
  humidity: 45,
  windSpeed: 8,
  visibility: 10,
  alerts: [],
  forecast: [
    { time: '9 AM', condition: 'sunny', temp: 68 },
    { time: '12 PM', condition: 'sunny', temp: 75 },
    { time: '3 PM', condition: 'cloudy', temp: 78 },
    { time: '6 PM', condition: 'cloudy', temp: 74 },
  ],
};

export default function WeatherWidget({ className = '' }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData>(mockWeatherData);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Simulate weather updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWeather((prev) => {
        const conditions: WeatherData['condition'][] = [
          'sunny',
          'cloudy',
          'rainy',
          'stormy',
        ];
        const newCondition =
          Math.random() > 0.8
            ? conditions[Math.floor(Math.random() * conditions.length)]
            : prev.condition;

        // Generate alerts based on conditions
        const alerts: string[] = [];
        if (newCondition === 'stormy') {
          alerts.push('Lightning Alert - Course Closed');
        } else if (newCondition === 'rainy') {
          alerts.push('Cart Path Only');
        }

        return {
          ...prev,
          condition: newCondition,
          temperature: Math.max(
            60,
            Math.min(85, prev.temperature + (Math.random() - 0.5) * 4)
          ),
          humidity: Math.max(
            20,
            Math.min(80, prev.humidity + (Math.random() - 0.5) * 10)
          ),
          windSpeed: Math.max(
            0,
            Math.min(25, prev.windSpeed + (Math.random() - 0.5) * 6)
          ),
          visibility:
            newCondition === 'rainy'
              ? Math.max(3, prev.visibility - 2)
              : newCondition === 'stormy'
                ? Math.max(1, prev.visibility - 4)
                : Math.min(10, prev.visibility + 1),
          alerts,
        };
      });
      setLastUpdated(new Date());
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (
    condition: WeatherData['condition'],
    size = 'w-8 h-8'
  ) => {
    const iconClass = `${size} text-white`;

    switch (condition) {
      case 'sunny':
        return <Sun className={`${iconClass} text-yellow-400`} />;
      case 'cloudy':
        return <Cloud className={`${iconClass} text-gray-300`} />;
      case 'rainy':
        return <CloudRain className={`${iconClass} text-blue-400`} />;
      case 'stormy':
        return <CloudRain className={`${iconClass} text-purple-400`} />;
      default:
        return <Sun className={iconClass} />;
    }
  };

  const getConditionColor = (condition: WeatherData['condition']) => {
    switch (condition) {
      case 'sunny':
        return 'from-yellow-500/20 to-orange-500/10';
      case 'cloudy':
        return 'from-gray-500/20 to-gray-600/10';
      case 'rainy':
        return 'from-blue-500/20 to-blue-600/10';
      case 'stormy':
        return 'from-purple-500/20 to-red-500/10';
      default:
        return 'from-blue-500/20 to-purple-500/10';
    }
  };

  const getPlayabilityStatus = () => {
    if (weather.condition === 'stormy') {
      return { status: 'Closed', color: 'text-red-400', bg: 'bg-red-500/20' };
    } else if (weather.condition === 'rainy') {
      return {
        status: 'Cart Path Only',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/20',
      };
    } else {
      return {
        status: 'Open',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/20',
      };
    }
  };

  const playability = getPlayabilityStatus();

  return (
    <div className={`${className}`}>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-white flex items-center gap-2'>
          {getWeatherIcon(weather.condition, 'w-5 h-5')}
          Course Conditions
        </h3>
        <div className='text-xs text-zinc-400'>
          Updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {/* Weather alerts */}
      {weather.alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-4 p-3 bg-red-500/20 border border-red-400/50 rounded-lg'
        >
          <div className='flex items-center gap-2 text-red-300'>
            <AlertTriangle className='w-4 h-4' />
            <span className='font-medium'>Course Alert</span>
          </div>
          {weather.alerts.map((alert, index) => (
            <div key={index} className='text-sm text-red-200 mt-1'>
              {alert}
            </div>
          ))}
        </motion.div>
      )}

      {/* Current conditions */}
      <div
        className={`relative p-4 rounded-lg bg-gradient-to-br ${getConditionColor(weather.condition)} border border-white/10 backdrop-blur-sm`}
      >
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-3'>
            {getWeatherIcon(weather.condition)}
            <div>
              <div className='text-2xl font-bold text-white'>
                {Math.round(weather.temperature)}°F
              </div>
              <div className='text-sm text-zinc-300 capitalize'>
                {weather.condition}
              </div>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-full ${playability.bg} ${playability.color} text-sm font-medium`}
          >
            {playability.status}
          </div>
        </div>

        {/* Weather details grid */}
        <div className='grid grid-cols-2 gap-4 text-sm'>
          <div className='flex items-center gap-2'>
            <Droplets className='w-4 h-4 text-blue-400' />
            <span className='text-zinc-300'>Humidity:</span>
            <span className='text-white'>{weather.humidity}%</span>
          </div>

          <div className='flex items-center gap-2'>
            <Wind className='w-4 h-4 text-gray-400' />
            <span className='text-zinc-300'>Wind:</span>
            <span className='text-white'>{weather.windSpeed} mph</span>
          </div>

          <div className='flex items-center gap-2'>
            <Eye className='w-4 h-4 text-green-400' />
            <span className='text-zinc-300'>Visibility:</span>
            <span className='text-white'>{weather.visibility} mi</span>
          </div>

          <div className='flex items-center gap-2'>
            <Thermometer className='w-4 h-4 text-red-400' />
            <span className='text-zinc-300'>Feels like:</span>
            <span className='text-white'>
              {Math.round(weather.temperature + 2)}°F
            </span>
          </div>
        </div>
      </div>

      {/* Hourly forecast */}
      <div className='mt-4'>
        <h4 className='text-sm font-medium text-zinc-300 mb-3'>
          Today's Forecast
        </h4>
        <div className='flex gap-3 overflow-x-auto'>
          {weather.forecast.map((forecast, index) => (
            <motion.div
              key={forecast.time}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className='flex-shrink-0 text-center p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50 min-w-[80px]'
            >
              <div className='text-xs text-zinc-400 mb-2'>{forecast.time}</div>
              <div className='flex justify-center mb-2'>
                {getWeatherIcon(forecast.condition, 'w-5 h-5')}
              </div>
              <div className='text-sm font-medium text-white'>
                {forecast.temp}°
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Course impact summary */}
      <div className='mt-4 p-3 bg-zinc-900/50 rounded-lg border border-zinc-700/50'>
        <h4 className='text-sm font-medium text-zinc-300 mb-2'>
          Course Impact
        </h4>
        <div className='text-xs text-zinc-400 space-y-1'>
          {weather.condition === 'sunny' && (
            <div>• Excellent playing conditions</div>
          )}
          {weather.condition === 'cloudy' && (
            <div>• Good playing conditions, comfortable temperature</div>
          )}
          {weather.condition === 'rainy' && (
            <>
              <div>• Cart path only restrictions in effect</div>
              <div>• Consider rain gear for players</div>
            </>
          )}
          {weather.condition === 'stormy' && (
            <>
              <div>• Course closed for safety</div>
              <div>• All tee times suspended</div>
            </>
          )}
          {weather.windSpeed > 15 && (
            <div>• Strong winds may affect ball flight</div>
          )}
        </div>
      </div>
    </div>
  );
}
