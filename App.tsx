import React, { useState, useEffect } from 'react';
import { TIMELINE_DATA } from './constants';
import VisualEffects from './components/VisualEffects';
import InfoCard from './components/InfoCard';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentEvent = TIMELINE_DATA[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TIMELINE_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TIMELINE_DATA.length) % TIMELINE_DATA.length);
  };

  const jumpTo = (index: number) => {
    setCurrentIndex(index);
  };

  // Preload images for smoothness
  useEffect(() => {
    TIMELINE_DATA.forEach(event => {
      const img = new Image();
      img.src = event.mediaUrl;
    });
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white selection:bg-white/20">
      
      {/* Background Effects (Managed with cross-fade in component) */}
      <VisualEffects theme={currentEvent.theme} />

      {/* 3D Carousel Container */}
      <div className="relative w-full max-w-[1400px] h-[70vh] flex items-center justify-center perspective-[1200px] z-10">
        {TIMELINE_DATA.map((event, index) => {
          // Calculate distance from current index
          let offset = index - currentIndex;
          
          // Linear constraint for timeline feel
          if (offset < -2) offset += TIMELINE_DATA.length;
          if (offset > 2) offset -= TIMELINE_DATA.length;

          // Determine visibility and transform
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 1; // Only show prev, current, next
          
          if (!isVisible) return null;

          let transformClass = '';
          let opacityClass = '';
          let zIndex = 0;
          let pointerEvents = 'pointer-events-none';

          // Custom Bezier for "Silk" smooth transition
          const transitionClass = "transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]";

          if (offset === 0) {
            // Center Item
            transformClass = 'scale-100 translate-x-0 translate-z-0 rotate-y-0';
            opacityClass = 'opacity-100 blur-none';
            zIndex = 30;
            pointerEvents = 'pointer-events-auto';
          } else if (offset === -1) {
            // Left Item
            transformClass = 'scale-90 -translate-x-[65%] translate-z-[-100px] rotate-y-[15deg] origin-right';
            opacityClass = 'opacity-40 hover:opacity-60 blur-[2px] hover:blur-none grayscale hover:grayscale-0';
            zIndex = 20;
            pointerEvents = 'cursor-pointer pointer-events-auto';
          } else if (offset === 1) {
            // Right Item
            transformClass = 'scale-90 translate-x-[65%] translate-z-[-100px] rotate-y-[-15deg] origin-left';
            opacityClass = 'opacity-40 hover:opacity-60 blur-[2px] hover:blur-none grayscale hover:grayscale-0';
            zIndex = 20;
            pointerEvents = 'cursor-pointer pointer-events-auto';
          }

          return (
            <div
              key={event.id}
              className={`absolute will-change-transform ${transitionClass} ${transformClass} ${opacityClass}`}
              style={{ zIndex }}
              onClick={() => {
                if (offset !== 0) jumpTo(index);
              }}
            >
               <div className={`${pointerEvents}`}>
                  <InfoCard event={event} isCompact={!isActive} />
               </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-0 right-0 z-50 px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          
          {/* Progress Timeline */}
          <div className="flex items-center gap-4 w-full justify-center">
             <span className="text-xs font-mono text-gray-500 whitespace-nowrap hidden sm:block">1950</span>
             <div className="relative h-1 bg-white/10 rounded-full w-full max-w-md overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-[0_0_10px_currentColor]"
                  style={{ 
                    width: `${((currentIndex) / (TIMELINE_DATA.length - 1)) * 100}%`,
                    backgroundColor: currentEvent.color,
                    color: currentEvent.color
                  }}
                />
             </div>
             <span className="text-xs font-mono text-gray-500 whitespace-nowrap hidden sm:block">2024+</span>
          </div>

          {/* Buttons & Dots */}
          <div className="flex items-center justify-between w-full max-w-xs">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur transition-all active:scale-90 group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>

            <div className="flex gap-3">
              {TIMELINE_DATA.map((event, idx) => (
                <button
                  key={event.id}
                  onClick={() => jumpTo(idx)}
                  className={`relative w-2.5 h-2.5 rounded-full transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]`}
                  style={{ 
                    backgroundColor: idx === currentIndex ? event.color : 'rgba(255,255,255,0.2)',
                    transform: idx === currentIndex ? 'scale(1.5)' : 'scale(1)'
                  }}
                >
                  {idx === currentIndex && (
                    <span className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ backgroundColor: event.color }}></span>
                  )}
                </button>
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur transition-all active:scale-90 group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

        </div>
      </div>

      {/* Top Bar */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-start z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="font-display font-bold text-2xl tracking-tighter flex items-center gap-2">
            <span className="w-2 h-8 bg-gradient-to-b from-white to-transparent rounded-full"></span>
            AIGC <span className="text-gray-500">Chronicles</span>
          </h1>
          <p className="text-xs text-gray-400 ml-4 font-mono mt-1">AI 生成内容发展简史</p>
        </div>
        <div className="pointer-events-auto px-4 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors duration-1000" style={{ borderColor: `${currentEvent.color}40` }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentEvent.color }}></div>
          {currentEvent.year}
        </div>
      </header>

    </div>
  );
};

export default App;