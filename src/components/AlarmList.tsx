import { motion, AnimatePresence } from 'motion/react';
import { Alarm } from '../types';
import { Trash2, Edit3, Volume2, Music, Youtube, Play, Power, Bell, Disc, ExternalLink, Calendar } from 'lucide-react';

interface AlarmListProps {
  alarms: Alarm[];
  onToggleEnabled: (id: string) => void;
  onEdit: (alarm: Alarm) => void;
  onDelete: (id: string) => void;
  onTriggerTest: (alarm: Alarm) => void;
  onAddNewClick: () => void;
}

export default function AlarmList({
  alarms,
  onToggleEnabled,
  onEdit,
  onDelete,
  onTriggerTest,
  onAddNewClick
}: AlarmListProps) {
  
  // Convert 24h internal "HH:MM" into 12h representation for UI
  const formatTime12h = (time24: string) => {
    const [hStr, mStr] = time24.split(':');
    let hNum = parseInt(hStr, 10);
    const period = hNum >= 12 ? 'PM' : 'AM';
    if (hNum > 12) hNum -= 12;
    if (hNum === 0) hNum = 12;
    return {
      time: `${hNum.toString().padStart(2, '0')}:${mStr}`,
      period
    };
  };

  const getDayLabel = (dayIndex: number) => {
    const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return names[dayIndex];
  };

  const weekdayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="w-full max-w-xl mx-auto space-y-5 select-none pb-12">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
          Your Wakeup Alarms ({alarms.length})
        </h3>
        <button
          onClick={onAddNewClick}
          className="text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all cursor-pointer shadow-sm"
        >
          + Add Alarm
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {alarms.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass p-10 rounded-3xl text-center text-slate-400 border border-white/5 flex flex-col items-center gap-4"
          >
            <Bell className="w-8 h-8 text-slate-500 animate-bounce" />
            <p className="text-sm font-semibold text-white/90">No active morning routines</p>
            <p className="text-xs max-w-xs leading-relaxed text-slate-400/80">
              Create your first customized morning routine to wake up energized to custom Spotify & YouTube playlists.
            </p>
            <button
              onClick={onAddNewClick}
              className="mt-2 px-6 py-3 rounded-2xl text-xs font-semibold bg-white/10 text-white border border-white/15 hover:bg-white/15 transition-all cursor-pointer shadow-md"
            >
              Add Premium Alarm Now
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {alarms.map((alarm) => {
              const formatted = formatTime12h(alarm.time);
              return (
                <motion.div
                  key={alarm.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: 'spring', damping: 18 }}
                  className={`glass p-6 rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between gap-5 ${
                    alarm.enabled
                      ? 'border-white/10 hover:border-white/15 bg-white/[0.04]'
                      : 'border-white/5 opacity-40 bg-white/[0.01]'
                  }`}
                >
                  {/* Alarm Time & Label & Toggle */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1.5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-5xl font-normal tracking-tight text-white leading-none">
                          {formatted.time}
                        </span>
                        <span className="text-xs font-sans font-bold text-slate-400 uppercase tracking-widest leading-none">
                          {formatted.period}
                        </span>
                      </div>
                      
                      {/* Alarm Label */}
                      <p className="text-xs text-slate-300 font-medium tracking-wide">
                        {alarm.label}
                      </p>
                    </div>

                    {/* Enable Toggle Switch (Premium Monochromatic Minimalist Style) */}
                    <button
                      onClick={() => onToggleEnabled(alarm.id)}
                      className={`w-12 h-6.5 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${
                        alarm.enabled ? 'bg-white' : 'bg-white/10 border border-white/5'
                      }`}
                    >
                      <motion.div
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className={`w-5.5 h-5.5 rounded-full flex items-center justify-center shadow-md ${
                          alarm.enabled ? 'bg-[#090b10]' : 'bg-slate-400'
                        }`}
                        style={{ marginLeft: alarm.enabled ? '1.375rem' : '0' }}
                      />
                    </button>
                  </div>

                  {/* Recurrence Repeat Days */}
                  <div className="flex gap-1.5">
                    {weekdayNames.map((name, idx) => {
                      const isSelected = alarm.days.includes(idx);
                      return (
                        <div
                          key={idx}
                          className={`w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center border ${
                            isSelected
                              ? 'bg-white/10 text-white border-white/10 font-bold'
                              : 'bg-transparent text-slate-600 border-transparent'
                          }`}
                        >
                          {name}
                        </div>
                      );
                    })}
                  </div>

                  {/* Divider line */}
                  <div className="border-t border-white/5" />

                  {/* Footer Stats, Playlist Info & Edit/Delete Buttons */}
                  <div className="flex justify-between items-center text-xs">
                    {/* Playlist sync info */}
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium truncate max-w-[200px]">
                      {alarm.useMusic ? (
                        <>
                          <Music className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">
                            {alarm.playlistTitle || 'Curated Vibes'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Celestial Chord Synth</span>
                        </>
                      )}
                      <span className="text-[10px] text-slate-600 font-mono">•</span>
                      <Volume2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{alarm.volume}%</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Simulation Trigger button */}
                      {alarm.enabled && (
                        <button
                          onClick={() => onTriggerTest(alarm)}
                          title="Trigger full test wake-up simulation"
                          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold text-[10px] flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
                        >
                          <Play className="w-2.5 h-2.5 fill-white text-white" /> Live Test
                        </button>
                      )}
                      
                      <button
                        onClick={() => onEdit(alarm)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Edit alarm settings"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      
                      <button
                        onClick={() => onDelete(alarm.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/15 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete alarm"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
