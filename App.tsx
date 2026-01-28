
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import Scene from './components/Scene';
import UIOverlay from './components/UIOverlay';
import Dashboard from './components/Dashboard';
import Markets from './components/Markets';

export type ViewState = 'landing' | 'overview' | 'mypage' | 'markets';

// Fix: Define 'Color' as an any-typed constant to bypass JSX.IntrinsicElements missing 'color' property
const Color = 'color' as any;

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');

  return (
    <div className="relative w-full h-full bg-[#050505]">
      {/* 3D Scene Layer */}
      <div className="fixed inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 35 }}
          dpr={[1, 2]}
        >
          {/* Fix: Using Color constant instead of lowercase intrinsic element */}
          <Color attach="background" args={['#050505']} />
          {view === 'landing' ? (
            <ScrollControls pages={10} damping={0.2}>
              <Scene view={view} />
              <Scroll html>
                <UIOverlay onLaunch={() => setView('overview')} />
              </Scroll>
            </ScrollControls>
          ) : (
            <Scene view={view} />
          )}
        </Canvas>
      </div>
      
      {/* Fixed Navigation UI */}
      <header className="fixed top-0 left-0 w-full p-6 z-[100] flex justify-between items-center">
        <div 
          onClick={() => setView('landing')}
          className="text-2xl font-bold tracking-tighter text-cyan-400 font-display cursor-pointer"
        >
          AETHERIS
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-widest text-gray-400">
          <button 
            onClick={() => setView('landing')}
            className={`hover:text-cyan-400 transition-colors uppercase ${view === 'landing' ? 'text-cyan-400' : ''}`}
          >
            Vision
          </button>
          <button 
            onClick={() => setView('overview')}
            className={`hover:text-cyan-400 transition-colors uppercase ${view === 'overview' ? 'text-cyan-400' : ''}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setView('markets')}
            className={`hover:text-cyan-400 transition-colors uppercase ${view === 'markets' ? 'text-cyan-400' : ''}`}
          >
            Markets
          </button>
          <button 
            onClick={() => setView('mypage')}
            className={`hover:text-cyan-400 transition-colors uppercase ${view === 'mypage' ? 'text-cyan-400' : ''}`}
          >
            My Page
          </button>
        </nav>
        <button 
          onClick={() => setView(view === 'landing' ? 'overview' : 'landing')}
          className="px-6 py-2 glass rounded-full text-xs font-bold tracking-widest text-white hover:bg-cyan-500/20 transition-all border-cyan-500/30"
        >
          {view === 'landing' ? 'LAUNCH APP' : 'EXIT DASHBOARD'}
        </button>
      </header>

      {/* Conditional Overlays */}
      {view !== 'landing' && (
        <div className="fixed inset-0 z-50 overflow-y-auto pt-24 pb-12 px-6">
          {view === 'markets' ? (
            <Markets />
          ) : (
            <Dashboard view={view} setView={setView} />
          )}
        </div>
      )}

      {/* Background Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-20 mix-blend-overlay z-[60]">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </div>
  );
};

export default App;
