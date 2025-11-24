import React, { useEffect, useRef, useState } from 'react';
import { EraTheme } from '../types';

interface EffectLayerProps {
  theme: EraTheme;
  opacity: number;
}

// Sub-component that renders the specific visual logic for a theme
const EffectLayer: React.FC<EffectLayerProps> = ({ theme, opacity }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- CANVAS EFFECT: RETRO & CONVERSATIONAL ---
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // --- LOGIC: RETRO MATRIX ---
    if (theme === EraTheme.RETRO) {
      const fontSize = 20;
      const columns = Math.ceil(canvas.width / fontSize);
      const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = `bold ${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
          const char = String.fromCharCode(0x30A0 + Math.random() * 96);
          if (Math.random() > 0.98) {
               ctx.fillStyle = '#fff';
               ctx.shadowBlur = 10;
               ctx.shadowColor = '#fff';
          } else {
               ctx.fillStyle = '#00ff41';
               ctx.shadowBlur = 0;
          }

          ctx.fillText(char, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        animationFrameId = requestAnimationFrame(draw);
      };
      draw();
    }

    // --- LOGIC: CONVERSATIONAL PARTICLES ---
    if (theme === EraTheme.CONVERSATIONAL) {
      interface Particle { x: number; y: number; speed: number; size: number; alpha: number; }
      const particles: Particle[] = [];
      const particleCount = 150;

      for(let i=0; i<particleCount; i++) {
          particles.push({
              x: Math.random() * canvas.width,
              y: canvas.height + Math.random() * 500,
              speed: 2 + Math.random() * 5,
              size: 2 + Math.random() * 3,
              alpha: 0.1 + Math.random() * 0.5
          });
      }

      const draw = () => {
         ctx.clearRect(0,0, canvas.width, canvas.height);
         
         const grad = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - 300);
         grad.addColorStop(0, 'rgba(14, 165, 233, 0.4)');
         grad.addColorStop(1, 'transparent');
         ctx.fillStyle = grad;
         ctx.fillRect(0, 0, canvas.width, canvas.height);

         ctx.fillStyle = '#38bdf8'; 

         particles.forEach(p => {
             p.y -= p.speed;
             if (p.y < -50) {
                 p.y = canvas.height + Math.random() * 100;
                 p.x = Math.random() * canvas.width;
             }
             ctx.globalAlpha = p.alpha;
             ctx.beginPath();
             ctx.rect(p.x, p.y, 2, p.size * 5); 
             ctx.fill();
         });
         ctx.globalAlpha = 1;
         animationFrameId = requestAnimationFrame(draw);
      };
      draw();
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);


  const renderContent = () => {
    switch (theme) {
      case EraTheme.RETRO:
        return (
          <div className="absolute inset-0 bg-black">
             <div className="absolute bottom-0 w-full h-[60%] overflow-hidden retro-perspective z-0">
                <div className="retro-grid"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
             </div>
             <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-[60%] z-10 mix-blend-screen opacity-80" />
             <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,#000_100%)] z-20" />
          </div>
        );

      case EraTheme.NEURAL:
        return (
          <div className="absolute inset-0 bg-black overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black animate-pulse-fast" />
             <div className="absolute -left-20 top-0 bottom-0 w-1/2 bg-gradient-to-r from-rose-900/40 to-transparent blur-3xl opacity-60 animate-pulse" />
             <div className="absolute -right-20 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-900/40 to-transparent blur-3xl opacity-60 animate-pulse" style={{animationDelay: '0.5s'}} />
             <svg className="absolute inset-0 w-full h-full opacity-60">
                 <g strokeWidth="2" strokeDasharray="20 20">
                    <line x1="0" y1="20%" x2="100%" y2="80%" stroke="url(#gradConn1)" className="animate-dash" strokeOpacity="0.5" />
                    <line x1="0" y1="80%" x2="100%" y2="20%" stroke="url(#gradConn2)" className="animate-dash" strokeOpacity="0.5" />
                    <line x1="20%" y1="0" x2="80%" y2="100%" stroke="url(#gradConn1)" className="animate-dash" strokeOpacity="0.3" />
                 </g>
                 <circle cx="50%" cy="50%" r="200" fill="url(#gradCenter)" filter="blur(60px)" className="animate-pulse" />
                 <defs>
                   <linearGradient id="gradConn1" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#f43f5e" />
                     <stop offset="100%" stopColor="#3b82f6" />
                   </linearGradient>
                   <linearGradient id="gradConn2" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#3b82f6" />
                     <stop offset="100%" stopColor="#f43f5e" />
                   </linearGradient>
                   <radialGradient id="gradCenter">
                      <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="transparent" />
                   </radialGradient>
                 </defs>
             </svg>
          </div>
        );

      case EraTheme.TRANSFORMER:
        return (
          <div className="absolute inset-0 bg-[#020410] overflow-hidden">
            <div className="absolute inset-0" style={{ 
                backgroundImage: 'radial-gradient(white 1px, transparent 1px)', 
                backgroundSize: '60px 60px', 
                opacity: 0.2 
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative w-[150vw] h-[150vw] animate-[spin_60s_linear_infinite] opacity-30">
                    {Array.from({ length: 12 }).map((_, i) => (
                       <div key={i} className="absolute top-1/2 left-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent origin-left" style={{ transform: `rotate(${i * 30}deg)` }} />
                    ))}
                 </div>
            </div>
            {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="absolute bg-blue-400/50 blur-sm rounded-full animate-ping"
                   style={{
                       top: `${Math.random() * 100}%`,
                       left: `${Math.random() * 100}%`,
                       width: '4px', height: '4px',
                       animationDuration: `${1 + Math.random() * 2}s`
                   }}
                />
            ))}
          </div>
        );

      case EraTheme.CREATIVE:
        return (
          <div className="absolute inset-0 bg-black overflow-hidden">
             <div className="absolute top-[-50%] left-[-20%] w-[120%] h-[120%] bg-purple-600 rounded-full liquid-blob opacity-60" />
             <div className="absolute bottom-[-50%] right-[-20%] w-[120%] h-[120%] bg-orange-500 rounded-full liquid-blob opacity-60" style={{animationDelay: '-5s'}} />
             <div className="absolute top-[20%] right-[20%] w-[80%] h-[80%] bg-pink-600 rounded-full liquid-blob opacity-50 mix-blend-overlay" style={{animationDelay: '-2s'}} />
             <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay contrast-150 brightness-100" />
             <div className="absolute inset-0 backdrop-blur-[50px]" />
          </div>
        );

      case EraTheme.CONVERSATIONAL:
        return (
          <div className="absolute inset-0 bg-[#0f172a] overflow-hidden">
             <canvas ref={canvasRef} className="absolute inset-0 z-0" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]/80 pointer-events-none" />
          </div>
        );

      case EraTheme.MULTIMODAL:
        return (
          <div className="absolute inset-0 bg-black overflow-hidden perspective-[1000px]">
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-[100vw] h-[100vw] border-[1px] border-orange-500/10 rounded-full animate-[spin_40s_linear_infinite]">
                     <div className="absolute inset-0 border border-orange-500/20 rounded-full scale-[0.8]" />
                     <div className="absolute inset-0 border border-orange-500/20 rounded-full scale-[0.6] rotate-45" />
                 </div>
             </div>
             <div className="absolute top-[60%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(rgba(249,115,22,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.1)_1px,transparent_1px)] bg-[size:100px_100px] transform rotate-x-60 animate-[pulse_8s_infinite]" />
             {Array.from({length: 5}).map((_, i) => (
                 <div key={i} className="absolute border border-orange-500/30 bg-orange-500/5 backdrop-blur-sm animate-float"
                   style={{
                       width: `${100 + Math.random() * 200}px`,
                       height: `${100 + Math.random() * 200}px`,
                       left: `${Math.random() * 100}%`,
                       top: `${Math.random() * 80}%`,
                       animationDelay: `${i * -2}s`,
                       transform: `rotate(${Math.random() * 360}deg)`
                   }}
                 />
             ))}
          </div>
        );

      default:
        return <div className="bg-black inset-0" />;
    }
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
      style={{ opacity }}
    >
      {renderContent()}
    </div>
  );
};


// --- MAIN CONTAINER ---
interface VisualEffectsProps {
  theme: EraTheme;
}

const VisualEffects: React.FC<VisualEffectsProps> = ({ theme }) => {
  const [activeTheme, setActiveTheme] = useState(theme);
  const [prevTheme, setPrevTheme] = useState<EraTheme | null>(null);

  useEffect(() => {
    if (theme !== activeTheme) {
      setPrevTheme(activeTheme);
      setActiveTheme(theme);
      
      const timer = setTimeout(() => {
        setPrevTheme(null);
      }, 1000); // Sync with transition duration
      
      return () => clearTimeout(timer);
    }
  }, [theme, activeTheme]);

  return (
    <div className="fixed inset-0 z-0">
      {prevTheme && (
        <EffectLayer key={prevTheme} theme={prevTheme} opacity={0} /> 
        // Note: We want the OLD one to fade OUT. 
        // Actually, opacity is controlled by class transition.
        // A simpler way: Render both stacked. Control opacity via state?
        // With 'transition-opacity' on the class, changing style opacity triggers it.
      )}
      
      {/* 
        Better Cross-fade Logic: 
        Render PREVIOUS layer (opacity 1 -> 0)
        Render ACTIVE layer (opacity 0 -> 1) is hard to coord.
        
        Alternative: Just stack them.
        Layer 1 (Z=0): Current Theme. Always Opacity 1.
        Layer 2 (Z=1): If switching, Old Theme stays here with Opacity 1 -> 0.
      */}
      
      {/* Active Theme (Always at bottom, fully visible) */}
       <EffectLayer key={activeTheme} theme={activeTheme} opacity={1} />

      {/* Fading Out Theme (On top, fades out) */}
      {prevTheme && (
        <div className="absolute inset-0 z-10 animate-[fadeOut_1s_ease-out_forwards] pointer-events-none">
           <EffectLayer theme={prevTheme} opacity={1} />
        </div>
      )}
    </div>
  );
};

export default VisualEffects;