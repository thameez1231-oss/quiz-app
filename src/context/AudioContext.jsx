import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioContextInstance = createContext();

export function AudioProvider({ children }) {
  const [sfxEnabled, setSfxEnabled] = useState(() => {
    const saved = localStorage.getItem('quizkids_sfx_enabled');
    return saved !== null ? JSON.parse(saved) : true; // Friendly default: on, easily muted
  });

  const [musicEnabled, setMusicEnabled] = useState(() => {
    const saved = localStorage.getItem('quizkids_music_enabled');
    return saved !== null ? JSON.parse(saved) : false; // Muted by default per user request
  });

  const audioCtxRef = useRef(null);
  const musicIntervalRef = useRef(null);

  // Initialize Web Audio Context lazily on first user interaction
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  useEffect(() => {
    localStorage.setItem('quizkids_sfx_enabled', JSON.stringify(sfxEnabled));
  }, [sfxEnabled]);

  useEffect(() => {
    localStorage.setItem('quizkids_music_enabled', JSON.stringify(musicEnabled));
    if (musicEnabled) {
      startBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
    return () => stopBackgroundMusic();
  }, [musicEnabled]);

  // Tactile subtle click
  const playClick = () => {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      console.warn("Audio error", e);
    }
  };

  // Joyful ascending chime for correct answers
  const playCorrect = () => {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + index * 0.08);
        osc.stop(ctx.currentTime + index * 0.08 + 0.35);
      });
    } catch (e) {
      console.warn("Audio error", e);
    }
  };

  // Gentle low warm "bloop" for incorrect answers (encouraging, not harsh!)
  const playIncorrect = () => {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.warn("Audio error", e);
    }
  };

  // Grand celebratory fanfare on completing a quiz
  const playFanfare = () => {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const chord = [523.25, 659.25, 783.99, 1046.50]; // C major fanfare
      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.14, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      });
    } catch (e) {
      console.warn("Audio error", e);
    }
  };

  // Soft ambient background lullaby/melody synthesizer (pentatonic warm bells)
  const startBackgroundMusic = () => {
    stopBackgroundMusic();
    const pentatonicNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C, D, E, G, A, C
    let step = 0;

    const playAmbientNote = () => {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const note = pentatonicNotes[step % pentatonicNotes.length];
        step = (step + 1) % pentatonicNotes.length;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, ctx.currentTime);
        gain.gain.setValueAtTime(0.025, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.8);
      } catch (e) {
        // quiet ignore
      }
    };

    musicIntervalRef.current = setInterval(playAmbientNote, 2400);
    playAmbientNote();
  };

  const stopBackgroundMusic = () => {
    if (musicIntervalRef.current) {
      clearInterval(musicIntervalRef.current);
      musicIntervalRef.current = null;
    }
  };

  return (
    <AudioContextInstance.Provider
      value={{
        sfxEnabled,
        setSfxEnabled,
        musicEnabled,
        setMusicEnabled,
        playClick,
        playCorrect,
        playIncorrect,
        playFanfare,
      }}
    >
      {children}
    </AudioContextInstance.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContextInstance);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
