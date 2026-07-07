import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Alarm, WeatherTheme } from '../types';
import { PLATFORM_PLAYLISTS } from '../data/mockMusic';
import { Music, Volume2, Info, ChevronRight, Check, Clock, X, Plus, Calendar, Disc, Globe, Speaker } from 'lucide-react';

interface AlarmFormProps {
  alarm: Alarm | null; // null if creating a new alarm
  onSave: (alarm: Alarm) => void;
  onClose: () => void;
}

export default function AlarmForm({ alarm, onSave, onClose }: AlarmFormProps) {
  // Parsing existing time or setting default
  const [hour, setHour] = useState('07');
  const [minute, setMinute] = useState('30');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const [label, setLabel] = useState('Wake Up');
  const [days, setDays] = useState<number[]>([]); // Mon = 1, Tue = 2... Sun = 0
  
  const [useMusic, setUseMusic] = useState(true);
  const [musicPlatform, setMusicPlatform] = useState<Alarm['musicPlatform']>('spotify');
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [volume, setVolume] = useState(80);
  const [gradualWake, setGradualWake] = useState(true);

  // Load alarm values if editing
  useEffect(() => {
    if (alarm) {
      setLabel(alarm.label);
      setDays(alarm.days);
      setUseMusic(alarm.useMusic);
      setMusicPlatform(alarm.musicPlatform);
      setPlaylistUrl(alarm.playlistUrl);
      setPlaylistTitle(alarm.playlistTitle);
      setVolume(alarm.volume);
      setGradualWake(alarm.gradualWake);

      // Parse 24h internal "time" format "HH:MM" into 12h representation
      const [hStr, mStr] = alarm.time.split(':');
      let hNum = parseInt(hStr, 10);
      const ampm = hNum >= 12 ? 'PM' : 'AM';
      if (hNum > 12) hNum -= 12;
      if (hNum === 0) hNum = 12;
      
      setHour(hNum.toString().padStart(2, '0'));
      setMinute(mStr);
      setPeriod(ampm);
    }
  }, [alarm]);

  // Handle weekday chip toggles
  const toggleDay = (day: number) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day].sort());
    }
  };

  // Preset music selection helper
  const selectPreset = (title: string, url: string) => {
    setPlaylistTitle(title);
    setPlaylistUrl(url);
  };

  // Convert current 12h select to 24h internal "HH:MM"
  const get24HourTime = () => {
    let hNum = parseInt(hour, 10);
    if (period === 'PM' && hNum < 12) hNum += 12;
    if (period === 'AM' && hNum === 12) hNum = 0;
    return `${hNum.toString().padStart(2, '0')}:${minute}`;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsedTime = get24HourTime();
    
    const savedAlarm: Alarm = {
      id: alarm?.id || Math.random().toString(36).substring(2, 9),
      time: parsedTime,
      label: label.trim() || 'Alarm',
      enabled: true,
      days,
      musicPlatform,
      playlistUrl: useMusic ? (playlistUrl.trim() || PLATFORM_PLAYLISTS[musicPlatform][0].url) : '',
      playlistTitle: useMusic ? (playlistTitle.trim() || PLATFORM_PLAYLISTS[musicPlatform][0].title) : '',
      useMusic,
      volume,
      gradualWake,
      snoozeCount: 0
    };

    onSave(savedAlarm);
  };

  const weekdayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-6"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 20, stiffness: 120 }}
        className="w-full max-w-lg glass-dark rounded-t-[32px] md:rounded-[32px] max-h-[92vh] overflow-y-auto no-select border-t border-white/10 md:border border-white/5 flex flex-col shadow-2xl"
      >
        {/* Form Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-950/40 sticky top-0 backdrop-blur-md z-10">
          <div>
            <h2 className="font-sans text-base font-semibold tracking-tight text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              {alarm ? 'Edit Alarm' : 'New Alarm'}
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5 uppercase tracking-wider font-bold">Wakeup Routine</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6 flex-1">
          
          {/* Time Picker Block */}
          <div className="flex flex-col items-center py-5 bg-white/5 rounded-2xl border border-white/5">
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-3 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Select Alarm Time
            </label>
            <div className="flex items-center gap-4">
              {/* Hour Scroll */}
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  maxLength={2}
                  value={hour}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val === '') setHour('');
                    else {
                      const num = parseInt(val, 10);
                      if (num >= 1 && num <= 12) setHour(val);
                    }
                  }}
                  onBlur={() => {
                    if (hour === '' || parseInt(hour, 10) === 0) setHour('12');
                    else setHour(hour.padStart(2, '0'));
                  }}
                  className="w-16 h-18 text-center text-4xl font-mono font-light rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
                <span className="text-[10px] text-slate-500 font-bold mt-1.5 uppercase tracking-wider">Hour</span>
              </div>

              <span className="text-3xl font-light text-slate-600 animate-pulse">:</span>

              {/* Minute Scroll */}
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  maxLength={2}
                  value={minute}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val === '') setMinute('');
                    else {
                      const num = parseInt(val, 10);
                      if (num >= 0 && num <= 59) setMinute(val);
                    }
                  }}
                  onBlur={() => {
                    if (minute === '') setMinute('00');
                    else setMinute(minute.padStart(2, '0'));
                  }}
                  className="w-16 h-18 text-center text-4xl font-mono font-light rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-colors"
                />
                <span className="text-[10px] text-slate-500 font-bold mt-1.5 uppercase tracking-wider">Minute</span>
              </div>

              {/* AM / PM selector */}
              <div className="flex flex-col gap-1.5 ml-2">
                {(['AM', 'PM'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      period === p
                        ? 'bg-white/10 text-white border-white/15 font-bold shadow-sm'
                        : 'bg-slate-950 text-slate-500 border-white/5 hover:border-white/10'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Weekday Recurrence */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" /> Repeat Recurrence
              </span>
              <span className="text-xs text-slate-400">
                {days.length === 7 ? 'Every day' : days.length === 0 ? 'Once (Today)' : `${days.length} days selected`}
              </span>
            </div>
            <div className="flex justify-between gap-1.5">
              {weekdayNames.map((name, index) => {
                const isSelected = days.includes(index);
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggleDay(index)}
                    className={`flex-1 h-10 rounded-xl text-xs font-semibold transition-all flex items-center justify-center border ${
                      isSelected
                        ? 'bg-white/15 text-white border-white/20 font-bold'
                        : 'bg-slate-900 text-slate-500 border-white/5 hover:border-white/10'
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Alarm Name/Label input */}
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-300 uppercase block">
              Alarm Label
            </label>
            <input
              type="text"
              placeholder="Good morning, rise and shine!"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Spotify & YouTube Music Sync */}
          <div className="space-y-4 border-t border-white/5 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold tracking-wide text-white flex items-center gap-2">
                  <Music className="w-4 h-4 text-emerald-400" /> Playlist Alarm Sync
                </span>
                <p className="text-xs text-slate-400 mt-0.5">Play dynamic random songs from custom feeds</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={useMusic}
                  onChange={(e) => setUseMusic(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-slate-950 peer-checked:bg-emerald-500" />
              </label>
            </div>

            {useMusic && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                {/* Platform Selector Grid */}
                <div className="grid grid-cols-4 gap-2">
                  {(['spotify', 'youtube', 'apple', 'ambient'] as const).map((platform) => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => {
                        setMusicPlatform(platform);
                        // Default to first preset of new platform
                        const presets = PLATFORM_PLAYLISTS[platform];
                        setPlaylistTitle(presets[0].title);
                        setPlaylistUrl(presets[0].url);
                      }}
                      className={`py-2 px-1 rounded-xl text-[10px] font-bold tracking-wide uppercase flex flex-col items-center justify-center gap-1.5 transition-all border ${
                        musicPlatform === platform
                          ? platform === 'spotify'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50'
                            : platform === 'youtube'
                            ? 'bg-red-500/10 text-red-400 border-red-500/50'
                            : platform === 'apple'
                            ? 'bg-pink-500/10 text-pink-400 border-pink-500/50'
                            : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/50'
                          : 'bg-slate-900 text-slate-400 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <Disc className={`w-4 h-4 ${musicPlatform === platform ? 'animate-spin-slow' : ''}`} />
                      {platform}
                    </button>
                  ))}
                </div>

                {/* Playlist URL Input */}
                <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-semibold flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" /> Link or Playlist Title
                    </span>
                    <span className="text-slate-500 font-medium">Optional Custom Feed</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Paste Spotify/YT playlist URL, or enter title..."
                    value={playlistUrl}
                    onChange={(e) => {
                      setPlaylistUrl(e.target.value);
                      // Set simulated title if not filled
                      if (!playlistTitle) {
                        setPlaylistTitle('Custom Wakeup Collection');
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  
                  {/* Playlist Name Field */}
                  <input
                    type="text"
                    placeholder="Give this playlist a name (e.g. My Heavy Rock Wakeup)"
                    value={playlistTitle}
                    onChange={(e) => setPlaylistTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />

                  {/* Preset quick links to help user pick immediately */}
                  <div className="mt-2.5">
                    <span className="text-[10px] uppercase text-slate-500 tracking-wider font-extrabold block mb-1.5">
                      Or select quick curated preset playlists
                    </span>
                    <div className="flex flex-col gap-1">
                      {PLATFORM_PLAYLISTS[musicPlatform].map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectPreset(p.title, p.url)}
                          className={`px-2.5 py-1.5 rounded-lg text-left text-xs transition-all flex items-center justify-between ${
                            playlistTitle === p.title
                              ? 'bg-white/10 text-white font-bold border border-white/15'
                              : 'bg-slate-900/60 text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="truncate max-w-[280px]">{p.title}</span>
                          {playlistTitle === p.title ? <Check className="w-3.5 h-3.5 text-white shrink-0" /> : <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Alarm Volume Settings */}
          <div className="space-y-4 border-t border-white/5 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-slate-400" /> Wakeup Alarm Volume
                </span>
                <span className="text-xs font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">
                  {volume}%
                </span>
              </div>
              <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-white/5">
                <Speaker className="w-4 h-4 text-slate-500 shrink-0" />
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value, 10))}
                  className="w-full accent-white h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Gradual Volume Option */}
            <div className="flex items-center justify-between p-3.5 bg-slate-900/50 rounded-xl border border-white/5">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-slate-400" /> Gradual Awakening Fade-In
                </span>
                <p className="text-[10px] text-slate-500 max-w-[280px]">
                  Fades volume in slowly over 8 seconds for a refreshing, stress-free morning wakeup.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={gradualWake}
                  onChange={(e) => setGradualWake(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:bg-[#090b10] peer-checked:bg-white" />
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-3 pt-4 sticky bottom-0 bg-slate-950/60 p-3 rounded-xl backdrop-blur-md">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer border border-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-xl text-sm font-bold bg-white hover:bg-slate-100 text-slate-950 transition-all cursor-pointer shadow-lg"
            >
              {alarm ? 'Update Alarm' : 'Activate Alarm'}
            </button>
          </div>

        </form>
      </motion.div>
    </motion.div>
  );
}
