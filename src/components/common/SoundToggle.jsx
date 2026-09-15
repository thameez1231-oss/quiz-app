import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export default function SoundToggle({ compact = false }) {
  const { sfxEnabled, setSfxEnabled, musicEnabled, setMusicEnabled, playClick } = useAudio();

  const handleSfxToggle = () => {
    playClick();
    setSfxEnabled(!sfxEnabled);
  };

  const handleMusicToggle = () => {
    playClick();
    setMusicEnabled(!musicEnabled);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
        <button
          onClick={handleSfxToggle}
          title={sfxEnabled ? 'Mute sound effects' : 'Turn on sound effects'}
          aria-label={sfxEnabled ? 'Mute sound effects' : 'Turn on sound effects'}
          className={`p-1.5 rounded-lg transition-all ${
            sfxEnabled ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {sfxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={handleMusicToggle}
          title={musicEnabled ? 'Pause background music' : 'Play soft background music'}
          aria-label={musicEnabled ? 'Pause background music' : 'Play soft background music'}
          className={`p-1.5 rounded-lg transition-all ${
            musicEnabled ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Music className={`w-4 h-4 ${musicEnabled ? 'animate-bounce' : ''}`} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
      <button
        onClick={handleSfxToggle}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
          sfxEnabled
            ? 'bg-white text-brand-600 shadow-sm'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        {sfxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        <span>SFX {sfxEnabled ? 'On' : 'Off'}</span>
      </button>

      <button
        onClick={handleMusicToggle}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
          musicEnabled
            ? 'bg-white text-brand-600 shadow-sm'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Music className={`w-4 h-4 ${musicEnabled ? 'text-brand-600' : ''}`} />
        <span>Music {musicEnabled ? 'On' : 'Off'}</span>
      </button>
    </div>
  );
}
