/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Alarm, WeatherTheme } from './types';
import WeatherEffects from './components/WeatherEffects';
import ClockView from './components/ClockView';
import AlarmList from './components/AlarmList';
import AlarmForm from './components/AlarmForm';
import ActiveAlarmOverlay from './components/ActiveAlarmOverlay';
import ReleasesView from './components/ReleasesView';
import { Bell, Smartphone, Sparkles, Clock, AlertCircle, Volume2, ShieldCheck, Check } from 'lucide-react';

const INITIAL_ALARMS: Alarm[] = [
  {
    id: 'alarm-1',
    time: '07:15',
    label: 'Morning Rise & Shine 🌅',
    enabled: true,
    days: [1, 2, 3, 4, 5], // Mon to Fri
    musicPlatform: 'spotify',
    playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO',
    playlistTitle: 'Morning Acoustic Breeze',
    useMusic: true,
    volume: 80,
    gradualWake: true,
    snoozeCount: 0
  },
  {
    id: 'alarm-2',
    time: '09:30',
    label: 'Slow Weekend Acoustic ☕',
    enabled: true,
    days: [0, 6], // Sat, Sun
    musicPlatform: 'youtube',
    playlistUrl: 'https://www.youtube.com/playlist?list=PL3oW2tjiIxvS1B9H7S9j_K1P5_M17804M',
    playlistTitle: 'Acoustic Morning Coffee',
    useMusic: true,
    volume: 70,
    gradualWake: false,
    snoozeCount: 0
  }
];

export default function App() {
  const [alarms, setAlarms] = useState<Alarm[]>(() => {
    const saved = localStorage.getItem('premium_alarms');
    return saved ? JSON.parse(saved) : INITIAL_ALARMS;
  });

  const [currentTheme, setCurrentTheme] = useState<WeatherTheme>(() => {
    return (localStorage.getItem('weather_theme') as WeatherTheme) || 'auto';
  });

  const [currentTab, setCurrentTab] = useState<'clock' | 'releases'>('clock');
  const [activeTestAlarm, setActiveTestAlarm] = useState<Alarm | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAlarm, setEditingAlarm] = useState<Alarm | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save alarms to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('premium_alarms', JSON.stringify(alarms));
  }, [alarms]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('weather_theme', currentTheme);
  }, [currentTheme]);

  // Real-time Alarm Trigger Checker
  const lastTriggeredAlarmTimeRef = useRef<string>('');

  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentHourMin = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const currentDay = now.getDay();

      // Clear the trigger guard when the minute advances
      if (lastTriggeredAlarmTimeRef.current !== currentHourMin) {
        lastTriggeredAlarmTimeRef.current = '';
      }

      // Check if any alarm is enabled and matches current time
      alarms.forEach((alarm) => {
        if (
          alarm.enabled &&
          alarm.time === currentHourMin &&
          lastTriggeredAlarmTimeRef.current !== currentHourMin
        ) {
          // If days list is empty, trigger once any day. Otherwise check day matching
          if (alarm.days.length === 0 || alarm.days.includes(currentDay)) {
            lastTriggeredAlarmTimeRef.current = currentHourMin;
            setActiveTestAlarm(alarm);
          }
        }
      });
    };

    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [alarms]);

  // Toggle alarm state
  const handleToggleEnabled = (id: string) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  // Delete alarm
  const handleDeleteAlarm = (id: string) => {
    setAlarms((prev) => prev.filter((a) => a.id !== id));
  };

  // Add or Update alarm
  const handleSaveAlarm = (savedAlarm: Alarm) => {
    setAlarms((prev) => {
      const exists = prev.some((a) => a.id === savedAlarm.id);
      if (exists) {
        return prev.map((a) => (a.id === savedAlarm.id ? savedAlarm : a));
      } else {
        return [...prev, savedAlarm];
      }
    });
    setIsFormOpen(false);
    setEditingAlarm(null);
  };

  // Edit alarm trigger
  const handleEditAlarm = (alarm: Alarm) => {
    setEditingAlarm(alarm);
    setIsFormOpen(true);
  };

  // Snooze handler
  const handleSnooze = (alarm: Alarm) => {
    setActiveTestAlarm(null);
    
    // Add 5 minutes to current time
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    const snoozeTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Create custom temporary snooze alarm
    const snoozedAlarm: Alarm = {
      ...alarm,
      id: `snooze-${alarm.id}-${Date.now()}`,
      time: snoozeTimeStr,
      label: `Snoozed: ${alarm.label}`,
      days: [], // trigger once
      enabled: true
    };

    setAlarms((prev) => [...prev, snoozedAlarm]);
    
    setToastMessage(`Alarm snoozed. Wake up scheduled for ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Dismiss handler
  const handleDismiss = (alarm: Alarm) => {
    setActiveTestAlarm(null);
    
    // Cleanup if it was a temporary snooze alarm
    if (alarm.id.includes('snooze-')) {
      setAlarms((prev) => prev.filter((a) => a.id !== alarm.id));
    } else if (alarm.days.length === 0) {
      // Disable one-time alarm
      setAlarms((prev) =>
        prev.map((a) => (a.id === alarm.id ? { ...a, enabled: false } : a))
      );
    }

    setToastMessage('Alarm stopped. Enjoy your morning routine.');
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Helper to find the next upcoming alarm time
  const getNextUpcomingAlarmTime = () => {
    const enabledAlarms = alarms.filter((a) => a.enabled);
    if (enabledAlarms.length === 0) return null;

    // Just sort them chronologically by time
    const sorted = [...enabledAlarms].sort((a, b) => {
      return a.time.localeCompare(b.time);
    });

    // Format top chronological time
    const [hStr, mStr] = sorted[0].time.split(':');
    let hNum = parseInt(hStr, 10);
    const period = hNum >= 12 ? 'PM' : 'AM';
    if (hNum > 12) hNum -= 12;
    if (hNum === 0) hNum = 12;
    return `${hNum.toString().padStart(2, '0')}:${mStr} ${period}`;
  };

  return (
    <div className="relative min-h-screen text-white flex flex-col font-sans overflow-x-hidden antialiased sophisticated-bg">
      {/* Decorative Subtle Apple Light Elements */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 blur-[180px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />

      {/* Immersive Animated Weather Background particle effects */}
      <WeatherEffects theme={currentTheme} />

      {/* Header Panel */}
      <header className="w-full max-w-xl mx-auto px-6 pt-10 pb-4 flex flex-col sm:flex-row gap-4 justify-between items-center z-10 no-select">
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-md shrink-0">
            <Clock className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-lg tracking-tight text-white leading-none mb-1">
              Lume Clock
            </h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.15em] leading-none">Android Routine</p>
          </div>
        </div>

        {/* Header Tabs */}
        <div className="flex w-full sm:w-auto bg-white/[0.03] p-1 rounded-full border border-white/5 backdrop-blur-md">
          <button
            onClick={() => setCurrentTab('clock')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
              currentTab === 'clock'
                ? 'bg-white/10 text-white border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 shrink-0" /> <span className="whitespace-nowrap">Dashboard</span>
          </button>
          <button
            onClick={() => setCurrentTab('releases')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
              currentTab === 'releases'
                ? 'bg-white/10 text-white border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0" /> <span className="whitespace-nowrap">APK Releases</span>
          </button>
        </div>
      </header>

      {/* Core Views Container */}
      <main className="flex-1 w-full max-w-xl mx-auto px-6 py-4 z-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentTab === 'clock' ? (
            <motion.div
              key="clock-tab"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Clock & Circadian controls */}
              <ClockView
                currentTheme={currentTheme}
                onChangeTheme={setCurrentTheme}
                nextAlarmTime={getNextUpcomingAlarmTime()}
              />

              {/* Alarms scheduler list */}
              <AlarmList
                alarms={alarms}
                onToggleEnabled={handleToggleEnabled}
                onEdit={handleEditAlarm}
                onDelete={handleDeleteAlarm}
                onTriggerTest={setActiveTestAlarm}
                onAddNewClick={() => {
                  setEditingAlarm(null);
                  setIsFormOpen(true);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="releases-tab"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ReleasesView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button (Only on Clock tab) */}
      {currentTab === 'clock' && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 z-20 md:hidden"
        >
          <button
            onClick={() => {
              setEditingAlarm(null);
              setIsFormOpen(true);
            }}
            className="w-14 h-14 rounded-full bg-white/10 text-white border border-white/20 flex items-center justify-center shadow-2xl active:scale-95 transition-transform cursor-pointer backdrop-blur-md"
          >
            <Bell className="w-5 h-5 stroke-[2px]" />
          </button>
        </motion.div>
      )}

      {/* Alarms Creation/Editing Form Drawer Overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <AlarmForm
            alarm={editingAlarm}
            onSave={handleSaveAlarm}
            onClose={() => {
              setIsFormOpen(false);
              setEditingAlarm(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Full-Screen Immersive Active Alarm/Simulation Screen */}
      <AnimatePresence>
        {activeTestAlarm && (
          <ActiveAlarmOverlay
            alarm={activeTestAlarm}
            onSnooze={handleSnooze}
            onDismiss={handleDismiss}
          />
        )}
      </AnimatePresence>

      {/* Premium Dynamic Energizing Toast/Greeting message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-50 bg-[#090b10]/95 p-4 rounded-2xl border border-white/10 text-white shadow-2xl backdrop-blur-lg flex gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-white/5 text-white flex items-center justify-center shrink-0 border border-white/10">
              <Check className="w-4.5 h-4.5 text-white/80" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lume Clock</h4>
              <p className="text-xs text-white/90 mt-0.5 leading-relaxed font-sans font-medium">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <footer className="py-6 text-center text-[10px] text-slate-500 font-medium tracking-widest uppercase z-10 no-select mt-auto">
        Designed for premium wakeups • Lume Alarm Clock
      </footer>
    </div>
  );
}
