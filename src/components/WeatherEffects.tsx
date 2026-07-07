import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WeatherTheme } from '../types';

interface WeatherEffectsProps {
  theme: WeatherTheme;
}

export default function WeatherEffects({ theme }: WeatherEffectsProps) {
  const [resolvedTheme, setResolvedTheme] = useState<Exclude<WeatherTheme, 'auto'>>('morning');

  useEffect(() => {
    if (theme === 'auto') {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 11) {
        setResolvedTheme('morning');
      } else if (hour >= 11 && hour < 17) {
        setResolvedTheme('sunset'); // Warm afternoon
      } else if (hour >= 17 && hour < 21) {
        setResolvedTheme('sunset');
      } else {
        setResolvedTheme('midnight');
      }
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  // Generate some persistent elements for particle animations
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Re-generate elements depending on theme - lower counts for maximum 60fps performance
    const count = resolvedTheme === 'midnight' ? 15 : resolvedTheme === 'morning' ? 8 : resolvedTheme === 'rainy' ? 12 : 6;
    const items = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (resolvedTheme === 'midnight' ? 2 : resolvedTheme === 'morning' ? 4 : 2) + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + (resolvedTheme === 'rainy' ? 2 : 6)
    }));
    setParticles(items);
  }, [resolvedTheme]);

  // Dynamic theme gradients - muted, elegant Apple glass aesthetics (not overly bright/saturated)
  const gradients = {
    morning: 'from-[#0e1118] via-[#151926] to-[#1d1e2a]',
    rainy: 'from-[#0a0c10] via-[#0f131a] to-[#14171f]',
    midnight: 'from-[#050608] via-[#0a0c12] to-[#10121a]',
    misty: 'from-[#0c0d12] via-[#12141c] to-[#181a24]',
    sunset: 'from-[#0f1016] via-[#181720] to-[#221c24]'
  };

  return (
    <div className="absolute inset-0 overflow-hidden -z-10 no-select">
      {/* High-Performance Hardware Accelerated Keyframe Animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.95; }
        }
        @keyframes rainFall {
          0% { transform: translateY(-50px) skewX(-10deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(105vh) skewX(-10deg); opacity: 0; }
        }
        @keyframes sunDust {
          0% { transform: translateY(105vh) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-5vh) translateX(15px); opacity: 0; }
        }
        @keyframes mistDrift {
          0% { transform: translateX(-20%); opacity: 0; }
          10% { opacity: 0.15; }
          90% { opacity: 0.15; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @keyframes sunsetDrift {
          0% { transform: translateY(105vh) translateX(0); opacity: 0; }
          10% { opacity: 0.35; }
          90% { opacity: 0.35; }
          100% { transform: translateY(-5vh) translateX(20px); opacity: 0; }
        }
      `}</style>

      {/* Dynamic Base Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradients[resolvedTheme]} transition-colors duration-1000`} />

      {/* Decorative Weather Elements */}
      <AnimatePresence mode="wait">
        {resolvedTheme === 'morning' && (
          <motion.div
            key="morning-sun"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-t from-white/5 via-white/[0.01] to-transparent blur-[110px] opacity-30 pointer-events-none"
          />
        )}

        {resolvedTheme === 'sunset' && (
          <motion.div
            key="sunset-sun"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.5 }}
            className="absolute bottom-20 left-1/3 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-white/5 via-white/[0.01] to-transparent blur-3xl opacity-20 pointer-events-none"
          />
        )}

        {resolvedTheme === 'midnight' && (
          <motion.div
            key="midnight-moon"
            initial={{ opacity: 0, x: 50, y: -50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: -50 }}
            transition={{ duration: 1.5 }}
            className="absolute top-20 right-[15%] w-16 h-16 rounded-full bg-white blur-[4px] opacity-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Animated Light Rays for Morning / Sunset */}
      {(resolvedTheme === 'morning' || resolvedTheme === 'sunset') && (
        <div className="absolute inset-0 mix-blend-overlay pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 right-0 h-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.3)_0%,transparent_70%)] animate-pulse duration-[8000ms]" />
        </div>
      )}

      {/* Particle Overlay with Hardware-Accelerated CSS Transitions */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => {
          if (resolvedTheme === 'midnight') {
            // Twinkling stars
            return (
              <div
                key={p.id}
                className="absolute bg-white rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  boxShadow: p.size > 2 ? '0 0 8px rgba(255,255,255,0.8)' : 'none',
                  animation: `twinkle ${p.duration / 3}s ease-in-out infinite ${p.delay}s`,
                  willChange: 'opacity'
                }}
              />
            );
          } else if (resolvedTheme === 'rainy') {
            // Falling raindrops
            return (
              <div
                key={p.id}
                className="absolute bg-white/30"
                style={{
                  left: `${p.x}%`,
                  top: 0,
                  width: '1px',
                  height: `${p.size * 12}px`,
                  animation: `rainFall ${p.duration / 3}s linear infinite ${p.delay}s`,
                  willChange: 'transform, opacity'
                }}
              />
            );
          } else if (resolvedTheme === 'morning') {
            // Floating sun dust/sparkles rising up
            return (
              <div
                key={p.id}
                className="absolute rounded-full bg-white/20"
                style={{
                  left: `${p.x}%`,
                  top: 0,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  filter: 'blur(1px)',
                  animation: `sunDust ${p.duration * 1.5}s ease-in-out infinite ${p.delay}s`,
                  willChange: 'transform, opacity'
                }}
              />
            );
          } else if (resolvedTheme === 'misty') {
            // Floating horizontal clouds / fog patches
            return (
              <div
                key={p.id}
                className="absolute bg-white/10 rounded-full"
                style={{
                  top: `${p.y}%`,
                  left: 0,
                  width: `${p.size * 80}px`,
                  height: `${p.size * 30}px`,
                  filter: 'blur(30px)',
                  animation: `mistDrift ${p.duration * 3}s linear infinite ${p.delay}s`,
                  willChange: 'transform, opacity'
                }}
              />
            );
          } else if (resolvedTheme === 'sunset') {
            // Soft warm drift
            return (
              <div
                key={p.id}
                className="absolute rounded-full bg-white/20"
                style={{
                  left: `${p.x}%`,
                  top: 0,
                  width: `${p.size * 1.5}px`,
                  height: `${p.size * 1.5}px`,
                  animation: `sunsetDrift ${p.duration * 2}s ease-in-out infinite ${p.delay}s`,
                  willChange: 'transform, opacity'
                }}
              />
            );
          }
          return null;
        })}
      </div>

      {/* Subtle vignette layer for premium, immersive atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] mix-blend-multiply pointer-events-none" />
    </div>
  );
}
