import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Alarm } from '../types';
import { playSimulatedAlarmSound } from '../data/mockMusic';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WeatherEffects from './WeatherEffects';

interface ActiveAlarmOverlayProps {
  alarm: Alarm;
  onSnooze: (alarm: Alarm) => void;
  onDismiss: (alarm: Alarm) => void;
}

export default function ActiveAlarmOverlay({ alarm, onSnooze, onDismiss }: ActiveAlarmOverlayProps) {
  const [currentTime, setCurrentTime] = useState('');
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundStopFnRef = useRef<(() => void) | null>(null);

  // Time ticking for screen
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Set up song and play simulated synthesised chord
  useEffect(() => {
    // Play physical sound
    const soundInstance = playSimulatedAlarmSound(alarm.volume, audioContextRef, alarm.gradualWake);
    if (soundInstance) {
      soundStopFnRef.current = soundInstance.stop;
    }

    return () => {
      try {
        if (soundStopFnRef.current) {
          soundStopFnRef.current();
          soundStopFnRef.current = null;
        }
      } catch (err) {
        console.error('Failed to stop sound in cleanup:', err);
      }
    };
  }, [alarm]);

  // Single Unified gesture for Stop (swipe left) vs. Snooze (swipe right)
  const dragX = useMotionValue(0);
  const swipeThreshold = 55; // Pixels to drag to trigger either side (highly responsive!)
  const [swipeTriggered, setSwipeTriggered] = useState(false);

  // Background opacity transformations for elegant feedback
  const leftBgOpacity = useTransform(dragX, [-swipeThreshold, 0], [0.3, 0]);
  const rightBgOpacity = useTransform(dragX, [0, swipeThreshold], [0, 0.3]);

  // Gentle label drift translations
  const labelSnoozeX = useTransform(dragX, [0, swipeThreshold], [0, 8]);
  const labelDismissX = useTransform(dragX, [-swipeThreshold, 0], [-8, 0]);

  // Unified trigger handler (works for swipe or instant click)
  const handleAction = (type: 'stop' | 'snooze') => {
    if (swipeTriggered) return;
    setSwipeTriggered(true);
    
    try {
      if (soundStopFnRef.current) {
        soundStopFnRef.current();
        soundStopFnRef.current = null;
      }
    } catch (err) {
      console.error('Failed to stop sound during action:', err);
    }

    setTimeout(() => {
      if (type === 'snooze') {
        onSnooze(alarm);
      } else {
        onDismiss(alarm);
      }
    }, 150);
  };

  // Instant responsive drag tracker
  const handleDrag = () => {
    if (swipeTriggered) return;
    const currentX = dragX.get();
    
    if (currentX >= swipeThreshold) {
      handleAction('snooze');
    } else if (currentX <= -swipeThreshold) {
      handleAction('stop');
    }
  };

  // Handle drag end as a fallback safety
  const handleDragEnd = (event: any, info: any) => {
    if (swipeTriggered) return;
    const currentX = dragX.get();
    const offsetX = info?.offset?.x || 0;
    const finalX = Math.abs(currentX) > Math.abs(offsetX) ? currentX : offsetX;
    
    if (finalX >= swipeThreshold) {
      handleAction('snooze');
    } else if (finalX <= -swipeThreshold) {
      handleAction('stop');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col justify-between p-8 pb-16 overflow-hidden select-none text-white bg-black"
    >
      {/* Hardware Accelerated Weather Animation Background (Highly Performant, Luxurious) */}
      <WeatherEffects theme="auto" />

      {/* Elegant Dark Subtle Vignette for maximum text contrast */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none -z-5" />
      
      {/* Subtle Glowing Center Accent (Breathing Light effect) */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none -z-5"
      />

      <div /> {/* Spacer to center the content perfectly */}

      {/* Large Gorgeous Centered Premium Clock face */}
      <div className="flex flex-col items-center text-center z-10 py-12">
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl font-normal leading-none tracking-tight text-white/95 text-shadow-sm"
        >
          {currentTime}
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-[10px] uppercase tracking-[0.4em] text-slate-300 font-bold"
        >
          Active Routine
        </motion.p>
      </div>

      {/* Premium Minimalist Controls Panel: Single Glass Slider with instant Tap fallback */}
      <div className="w-full max-w-sm mx-auto z-20">
        
        <div className="relative h-16 w-full rounded-full bg-white/[0.04] border border-white/10 overflow-hidden backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          
          {/* Active progress track glows */}
          <motion.div
            style={{ opacity: leftBgOpacity }}
            className="absolute inset-y-0 left-0 right-1/2 bg-red-500/10 pointer-events-none"
          />
          <motion.div
            style={{ opacity: rightBgOpacity }}
            className="absolute inset-y-0 right-0 left-1/2 bg-emerald-500/10 pointer-events-none"
          />

          {/* Leftside Stop Label - Tap-to-activate */}
          <button 
            type="button"
            onClick={() => handleAction('stop')}
            className="absolute left-0 top-0 bottom-0 w-2/5 flex items-center justify-start pl-7 text-left focus:outline-none cursor-pointer z-20 pointer-events-auto"
          >
            <motion.div
              style={{ x: labelDismissX }}
              className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Stop</span>
            </motion.div>
          </button>

          {/* Rightside Snooze Label - Tap-to-activate */}
          <button 
            type="button"
            onClick={() => handleAction('snooze')}
            className="absolute right-0 top-0 bottom-0 w-2/5 flex items-center justify-end pr-7 text-right focus:outline-none cursor-pointer z-20 pointer-events-auto"
          >
            <motion.div
              style={{ x: labelSnoozeX }}
              className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Snooze</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </motion.div>
          </button>

          {/* Centered Resting Handle */}
          <motion.div
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            dragSnapToOrigin={true}
            dragElastic={0.06}
            style={{ x: dragX, left: 'calc(50% - 28px)' }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.05 }}
            className="absolute top-1 bottom-1 w-14 rounded-full bg-white/15 border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)] cursor-grab active:cursor-grabbing flex items-center justify-center backdrop-blur-md z-30 pointer-events-auto"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

