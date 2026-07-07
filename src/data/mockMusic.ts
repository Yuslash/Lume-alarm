import { Song } from '../types';

export const PLATFORM_PLAYLISTS = {
  spotify: [
    { title: 'Morning Acoustic Breeze', url: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO' },
    { title: 'Feelin\' Good Wake Up', url: 'https://open.spotify.com/playlist/37i9dQZF1DX9XmYvY6mCh9' },
    { title: 'Chill Tracks & Lofi Beats', url: 'https://open.spotify.com/playlist/37i9dQZF1DX88zE6vXify1' },
    { title: 'Gold School Morning Vibes', url: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIG0PB67g' }
  ],
  youtube: [
    { title: 'Lofi Hip Hop Radio - Beats to Relax/Study to', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
    { title: 'Acoustic Guitar Morning Coffee', url: 'https://www.youtube.com/playlist?list=PL3oW2tjiIxvS1B9H7S9j_K1P5_M17804M' },
    { title: 'Upbeat Indie Pop Wake Up', url: 'https://www.youtube.com/playlist?list=PL4fGSI1pDJn5kI81J1GPx_T6uXg_X508f' }
  ],
  apple: [
    { title: 'Today\'s Easy Hits', url: 'https://music.apple.com/playlist/todays-easy-hits/pl.d191199a61ea463a9eb965a329d494e4' },
    { title: 'Acoustic Morning', url: 'https://music.apple.com/playlist/acoustic-morning/pl.67970d4c82b1458e80718d0985eb96df' }
  ],
  ambient: [
    { title: 'Forest Dawn Chorus', url: 'nature_forest' },
    { title: 'Gentle Ocean Ripples', url: 'nature_ocean' },
    { title: 'Zen Singing Bowls', url: 'nature_tibetan' },
    { title: 'Warm Rain On Glass', url: 'nature_rain' }
  ]
};

export const MOCK_SONGS: Record<string, Song[]> = {
  spotify: [
    {
      title: 'Sunrise Glow',
      artist: 'Acoustic Dreams',
      albumArt: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&auto=format&fit=crop&q=60',
      duration: '3:42'
    },
    {
      title: 'Good Vibrations',
      artist: 'The Electric Light Duo',
      albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60',
      duration: '4:05'
    },
    {
      title: 'Awakening Heart',
      artist: 'Solis Collective',
      albumArt: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=300&auto=format&fit=crop&q=60',
      duration: '2:58'
    },
    {
      title: 'Ethereal Mornings',
      artist: 'Luna Eclipse',
      albumArt: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=60',
      duration: '3:20'
    }
  ],
  youtube: [
    {
      title: 'Morning Chill Lofi',
      artist: 'Beatmaster General',
      albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=60',
      duration: '2:45'
    },
    {
      title: 'Golden Sunlight Rays',
      artist: 'Sunlight Symphony',
      albumArt: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300&auto=format&fit=crop&q=60',
      duration: '3:12'
    },
    {
      title: 'Rise and Shine Indie',
      artist: 'Coastal Whistles',
      albumArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=60',
      duration: '3:30'
    }
  ],
  apple: [
    {
      title: 'Unfolding Horizon',
      artist: 'Classical Morning Quartet',
      albumArt: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=60',
      duration: '4:50'
    },
    {
      title: 'Acoustic Coffee Shop',
      artist: 'Theo & The Strings',
      albumArt: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=60',
      duration: '3:15'
    }
  ],
  ambient: [
    {
      title: 'Deep Forest Birds & Brooks',
      artist: 'Nature Solfeggio',
      albumArt: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&auto=format&fit=crop&q=60',
      duration: '10:00'
    },
    {
      title: 'Ocean Surf Meditation',
      artist: 'Oceanic Waves',
      albumArt: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=300&auto=format&fit=crop&q=60',
      duration: '15:00'
    },
    {
      title: 'Vibrational Tibetan Bowl 528Hz',
      artist: 'Eastern Monks',
      albumArt: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=300&auto=format&fit=crop&q=60',
      duration: '20:00'
    },
    {
      title: 'Gentle Pitter Patter Rain',
      artist: 'Therapeutic Rain',
      albumArt: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=300&auto=format&fit=crop&q=60',
      duration: '12:00'
    }
  ]
};

export function getRandomSong(platform: string, playlistTitle?: string): Song {
  const songs = MOCK_SONGS[platform] || MOCK_SONGS.ambient;
  const randomIndex = Math.floor(Math.random() * songs.length);
  const song = { ...songs[randomIndex] };
  
  if (playlistTitle && playlistTitle.trim().length > 0) {
    // Customize based on user's custom playlist title if needed
    if (Math.random() > 0.5) {
      song.title = `${song.title} (Selected from ${playlistTitle})`;
    }
  }
  return song;
}

// Generate realistic simulated web-audio tones for actual alarm buzzer sound
export function playSimulatedAlarmSound(volume: number, audioContextRef: { current: AudioContext | null }, gradual: boolean) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return null;
    
    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    // Create custom synthesizer tones to play a premium melodic chord
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    
    // Gradual volume fade-in
    const targetVol = volume / 100;
    if (gradual) {
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(targetVol, ctx.currentTime + 8); // 8 seconds fade
    } else {
      masterGain.gain.setValueAtTime(targetVol, ctx.currentTime);
    }

    // Melodic sequence generator (Arpeggiator)
    const playNote = (freq: number, start: number, duration: number, type: 'sine' | 'triangle' | 'sine' = 'sine') => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      
      noteGain.gain.setValueAtTime(0, ctx.currentTime + start);
      noteGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + start + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration - 0.05);
      
      osc.connect(noteGain);
      noteGain.connect(masterGain);
      
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration);
    };

    // Keep playing chord sequence on interval
    let timeOffset = 0;
    const playArpeggio = () => {
      // E Major chords (extremely warm, energizing, uplifting)
      const root = 329.63; // E4
      const third = 415.30; // G#4
      const fifth = 493.88; // B4
      const octave = 659.25; // E5
      
      playNote(root, timeOffset + 0.0, 0.6, 'triangle');
      playNote(third, timeOffset + 0.2, 0.6, 'sine');
      playNote(fifth, timeOffset + 0.4, 0.6, 'sine');
      playNote(octave, timeOffset + 0.6, 0.8, 'triangle');
    };

    playArpeggio();
    const interval = setInterval(() => {
      if (ctx.state === 'suspended') return;
      playArpeggio();
    }, 2000);

    return {
      stop: () => {
        clearInterval(interval);
        try {
          ctx.close();
        } catch (e) {}
      }
    };
  } catch (err) {
    console.error('Audio synthesizer init failed', err);
    return null;
  }
}
