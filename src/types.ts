export interface Alarm {
  id: string;
  time: string; // "HH:MM" 24h format internally for easy calculations
  label: string;
  enabled: boolean;
  days: number[]; // 0 = Sun, 1 = Mon, etc. Empty means one-time alarm
  musicPlatform: 'spotify' | 'youtube' | 'apple' | 'ambient';
  playlistUrl: string;
  playlistTitle: string;
  useMusic: boolean;
  volume: number; // 0 to 100
  gradualWake: boolean; // gradual volume fade-in
  snoozeCount: number;
}

export type WeatherTheme = 'morning' | 'rainy' | 'midnight' | 'misty' | 'sunset' | 'auto';

export interface Song {
  title: string;
  artist: string;
  albumArt: string;
  duration: string;
  audioUrl?: string;
}

export interface WeatherEffectState {
  type: WeatherTheme;
  title: string;
  gradient: string;
  textColor: string;
  iconName: string;
}
