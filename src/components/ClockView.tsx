import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { WeatherTheme } from '../types';
import { Sun, CloudRain, Moon, Eye, SunDim, Compass, Sparkles, Smartphone, AlertCircle, Clock } from 'lucide-react';

interface ClockViewProps {
  currentTheme: WeatherTheme;
  onChangeTheme: (theme: WeatherTheme) => void;
  nextAlarmTime: string | null;
}

export default function ClockView({ currentTheme, onChangeTheme, nextAlarmTime }: ClockViewProps) {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = () => {
    return time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
  };

  // Helper info about themes
  const themeDetails = {
    auto: { label: 'Time Sync', icon: Compass, desc: 'Adapts to local morning light' },
    morning: { label: 'Rise', icon: Sun, desc: 'Energizing sunrise & rising light' },
    rainy: { label: 'Rainforest', icon: CloudRain, desc: 'Deep calm rainforest mist' },
    sunset: { label: 'Sunset', icon: SunDim, desc: 'Cozy evening pink & gold glow' },
    midnight: { label: 'Cosmic', icon: Moon, desc: 'Cozy starry galaxy twilight' }
  };

  return (
    <div className="flex flex-col items-center text-center p-6 select-none text-white max-w-lg mx-auto relative w-full">
      
      {/* Main Clock Face with luxurious Playfair Display Serif font */}
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 18 }}
        className="space-y-3 z-10 py-6"
      >
        <h1 className="font-serif text-8xl sm:text-9xl font-normal leading-none tracking-tighter text-white">
          {formatTime().split(' ')[0]}
          <span className="text-xl ml-2 font-sans font-medium text-slate-400 uppercase tracking-[0.2em]">
            {formatTime().split(' ')[1]}
          </span>
        </h1>
        <p className="font-sans text-[11px] font-bold tracking-[0.3em] text-slate-400 uppercase">
          {formatDate()}
        </p>

        {/* Minimal Next Alarm Indicator */}
        {nextAlarmTime ? (
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold pt-2">
            Next Alarm at <span className="text-slate-300 font-mono font-medium">{nextAlarmTime}</span>
          </p>
        ) : (
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold pt-2">
            No Active Alarms
          </p>
        )}
      </motion.div>

      {/* Ambient Theme Selection Tray */}
      <div className="mt-12 w-full z-10">
        <div className="flex items-center justify-between px-1 mb-2.5">
          <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-slate-500">Theme Atmosphere</span>
        </div>
        <div className="flex overflow-x-auto gap-1.5 bg-white/[0.02] p-1.5 rounded-2xl border border-white/5 backdrop-blur-md scrollbar-none snap-x snap-mandatory">
          {(Object.keys(themeDetails) as WeatherTheme[]).map((themeKey) => {
            const detail = themeDetails[themeKey];
            const Icon = detail.icon;
            const isSelected = currentTheme === themeKey;
            return (
              <button
                key={themeKey}
                onClick={() => onChangeTheme(themeKey)}
                title={detail.desc}
                className={`flex-1 min-w-[72px] snap-center flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer border shrink-0 ${
                  isSelected
                    ? 'bg-white/10 border-white/10 text-white font-bold'
                    : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'scale-105 text-white' : 'text-slate-500'}`} />
                <span className="text-[9px] font-bold mt-2 uppercase tracking-wider whitespace-nowrap">{detail.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
