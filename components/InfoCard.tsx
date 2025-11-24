
import React from 'react';
import { TimelineEvent, EraTheme } from '../types';
import TechAnimation from './TechAnimation';

interface InfoCardProps {
  event: TimelineEvent;
  isCompact?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ event, isCompact = false }) => {
  
  // Dynamic border styles based on theme
  const getThemeStyles = () => {
    if (isCompact) return 'border-white/10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100';

    switch (event.theme) {
      case EraTheme.RETRO:
        return 'border-green-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] font-mono';
      case EraTheme.NEURAL:
        return 'border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.2)]';
      case EraTheme.TRANSFORMER:
        // Use darker background to fix readability against blue light
        return 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)] backdrop-blur-xl !bg-[#020410]/90';
      case EraTheme.CREATIVE:
        // Fix: Changed bg-white/5 to !bg-[#0f0518]/90 (Dark Purple Black) for better text contrast
        return 'border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)] !bg-[#0f0518]/90 backdrop-blur-md';
      case EraTheme.CONVERSATIONAL:
        return 'border-sky-500/50 shadow-[0_0_30px_rgba(14,165,233,0.2)] rounded-3xl';
      case EraTheme.MULTIMODAL:
        return 'border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.2)]';
      default:
        return 'border-white/10';
    }
  };

  return (
    <div className={`
      relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-md border rounded-2xl transition-all duration-500
      ${isCompact ? 'w-[300px] h-[400px]' : 'w-[90vw] max-w-4xl h-auto md:h-[500px]'}
      ${getThemeStyles()}
    `}>
      
      {/* Background Gradient Mesh (Subtle) */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none mix-blend-screen transition-colors duration-700"
        style={{ backgroundColor: event.color }}
      />

      {/* Decorative Texture for Retro */}
      {event.theme === EraTheme.RETRO && !isCompact && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-20"></div>
      )}

      <div className={`h-full flex ${isCompact ? 'flex-col' : 'flex-col md:flex-row'}`}>
        
        {/* Tech Animation Section (Replaced Image) */}
        <div className={`relative ${isCompact ? 'h-1/2' : 'h-64 md:h-full md:w-1/2'} overflow-hidden group bg-black/40 border-b md:border-b-0 md:border-r border-white/5`}>
           <TechAnimation theme={event.theme} color={event.color} />
           
           {/* Floating Badge */}
           {!isCompact && (
             <div 
               className="absolute top-4 left-4 backdrop-blur-md border px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase text-white shadow-lg z-10"
               style={{ borderColor: `${event.color}40`, backgroundColor: `${event.color}20` }}
             >
                Tech: {event.focus[0]}
             </div>
           )}
        </div>

        {/* Content Section */}
        <div className={`relative z-10 p-6 md:p-10 flex flex-col justify-center ${isCompact ? 'h-1/2' : 'md:w-1/2'}`}>
          
          <div className="mb-auto">
             <div className="flex items-center gap-3 mb-4">
                <span 
                  className="px-2 py-0.5 rounded text-xs font-bold bg-white/5 border"
                  style={{ color: event.color, borderColor: `${event.color}40` }}
                >
                  {event.year}
                </span>
             </div>

             <h2 className={`font-display font-bold leading-none mb-2 ${isCompact ? 'text-2xl' : 'text-4xl md:text-5xl'}`}>
               {event.title}
             </h2>
             <h3 className={`font-light text-gray-400 ${isCompact ? 'text-sm' : 'text-xl'}`}>
               {event.subtitle}
             </h3>
          </div>

          {!isCompact && (
            <div className="space-y-6 mt-6">
              <p className="text-gray-300 leading-relaxed text-sm md:text-base border-l-2 pl-4" style={{ borderColor: event.color }}>
                {event.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {event.focus.map(f => (
                  <span key={f} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-colors">
                    #{f}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                 {event.stats.map((s, i) => (
                   <div key={i}>
                      <div className="text-[10px] uppercase text-gray-500 tracking-wider">{s.label}</div>
                      <div className="text-lg font-bold" style={{ color: event.color }}>{s.value}</div>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {isCompact && (
            <div className="mt-4">
               <div className="text-xs text-gray-400">
                  <span style={{color: event.color}}>●</span> {event.focus[0]}
               </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default InfoCard;
