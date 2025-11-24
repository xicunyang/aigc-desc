
import React from 'react';
import { EraTheme } from '../types';

interface TechAnimationProps {
  theme: EraTheme;
  color: string;
}

const TechAnimation: React.FC<TechAnimationProps> = ({ theme, color }) => {
  const renderAnimation = () => {
    switch (theme) {
      case EraTheme.RETRO:
        // Logic Tree / Circuit Flow
        return (
          <svg className="w-full h-full bg-black/50" viewBox="0 0 200 200">
            <defs>
              <filter id="glow-retro">
                <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Paths */}
            <path d="M100 20 V 60" stroke={color} strokeWidth="2" className="opacity-30" />
            <path d="M100 60 L 60 100" stroke={color} strokeWidth="2" className="opacity-30" />
            <path d="M100 60 L 140 100" stroke={color} strokeWidth="2" className="opacity-30" />
            <path d="M60 100 L 40 150" stroke={color} strokeWidth="2" className="opacity-30" />
            <path d="M60 100 L 80 150" stroke={color} strokeWidth="2" className="opacity-30" />
            <path d="M140 100 L 120 150" stroke={color} strokeWidth="2" className="opacity-30" />
            <path d="M140 100 L 160 150" stroke={color} strokeWidth="2" className="opacity-30" />

            {/* Nodes */}
            <circle cx="100" cy="20" r="4" fill={color} className="animate-pulse" />
            <rect x="95" y="55" width="10" height="10" stroke={color} fill="none" />
            
            {/* Signal Flow Animation */}
            <circle cx="100" cy="60" r="3" fill="#fff" filter="url(#glow-retro)">
              <animate attributeName="cy" values="20;60;60" keyTimes="0;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
            
            <circle r="3" fill="#fff" filter="url(#glow-retro)">
              <animate attributeName="cx" values="100;60" dur="2s" begin="0.3s" repeatCount="indefinite" />
              <animate attributeName="cy" values="60;100" dur="2s" begin="0.3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="2s" begin="0.3s" repeatCount="indefinite" />
            </circle>
            
            <circle r="3" fill="#fff" filter="url(#glow-retro)">
              <animate attributeName="cx" values="100;140" dur="2s" begin="0.3s" repeatCount="indefinite" />
              <animate attributeName="cy" values="60;100" dur="2s" begin="0.3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="2s" begin="0.3s" repeatCount="indefinite" />
            </circle>
            
            {/* Blinking leaf nodes */}
            <rect x="35" y="150" width="10" height="10" fill={color} opacity="0.2">
               <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" begin="1s" repeatCount="indefinite" />
            </rect>
             <rect x="155" y="150" width="10" height="10" fill={color} opacity="0.2">
               <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" begin="1.2s" repeatCount="indefinite" />
            </rect>
          </svg>
        );

      case EraTheme.NEURAL:
        // GAN: Generator vs Discriminator Collision
        return (
          <svg className="w-full h-full bg-black/50" viewBox="0 0 200 200">
             <defs>
              <filter id="blur-neural">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>
            
            {/* Left Force (Generator) */}
            <circle cx="60" cy="100" r="30" fill={color} fillOpacity="0.6" filter="url(#blur-neural)">
               <animate attributeName="cx" values="60;90;60" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
            </circle>
             <circle cx="60" cy="100" r="15" fill="#fff">
               <animate attributeName="cx" values="60;90;60" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
            </circle>

            {/* Right Force (Discriminator) - Blue/Opposite */}
            <circle cx="140" cy="100" r="30" fill="#3b82f6" fillOpacity="0.6" filter="url(#blur-neural)">
               <animate attributeName="cx" values="140;110;140" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
            </circle>
             <circle cx="140" cy="100" r="15" fill="#fff">
               <animate attributeName="cx" values="140;110;140" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
            </circle>

            {/* Collision Flash */}
            <rect x="95" y="0" width="10" height="200" fill="white" opacity="0">
                <animate attributeName="opacity" values="0;0.8;0" dur="3s" keyTimes="0;0.5;1" repeatCount="indefinite" />
                <animate attributeName="width" values="10;50;10" dur="3s" keyTimes="0;0.5;1" repeatCount="indefinite" />
                <animate attributeName="x" values="95;75;95" dur="3s" keyTimes="0;0.5;1" repeatCount="indefinite" />
            </rect>
            
            {/* Sparks */}
            <path d="M100 100 L 80 80" stroke="white" strokeWidth="2" opacity="0">
                <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1.4s" repeatCount="indefinite" />
                <animate attributeName="d" values="M100 100 L 100 100; M100 100 L 70 50" dur="3s" begin="1.4s" repeatCount="indefinite" />
            </path>
            <path d="M100 100 L 120 120" stroke="white" strokeWidth="2" opacity="0">
                <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1.4s" repeatCount="indefinite" />
                <animate attributeName="d" values="M100 100 L 100 100; M100 100 L 130 150" dur="3s" begin="1.4s" repeatCount="indefinite" />
            </path>

          </svg>
        );

      case EraTheme.TRANSFORMER:
        // Attention Mechanism: Nodes connecting + Next Token Prediction
        return (
          <svg className="w-full h-full bg-black/50" viewBox="0 0 200 200">
             {/* Grid of Tokens */}
             {Array.from({length: 4}).map((_, i) => (
                 <circle key={`in-${i}`} cx={40 + i*40} cy="150" r="4" fill="#555" />
             ))}
             {Array.from({length: 4}).map((_, i) => (
                 <circle key={`out-${i}`} cx={40 + i*40} cy="50" r="4" fill={i===3 ? color : "#555"} className={i===3 ? "animate-pulse" : ""} />
             ))}

             {/* Attention Lines (Fading in and out) */}
             <g stroke={color} strokeWidth="1" opacity="0.5">
                 <line x1="40" y1="150" x2="160" y2="50" opacity="0">
                    <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
                 </line>
                 <line x1="80" y1="150" x2="160" y2="50" opacity="0">
                    <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="0.2s" repeatCount="indefinite" />
                 </line>
                 <line x1="120" y1="150" x2="160" y2="50" opacity="0">
                    <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="0.4s" repeatCount="indefinite" />
                 </line>
                  <line x1="160" y1="150" x2="160" y2="50" opacity="0">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.6s" repeatCount="indefinite" />
                 </line>
             </g>

             {/* "Predicting" the next block */}
             <rect x="150" y="40" width="20" height="20" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2">
                 <animate attributeName="stroke-dashoffset" values="0;100" dur="2s" repeatCount="indefinite" />
             </rect>
             <rect x="154" y="44" width="12" height="12" fill={color} opacity="0">
                 <animate attributeName="opacity" values="0;0;1;0" dur="2s" keyTimes="0;0.8;0.9;1" repeatCount="indefinite" />
             </rect>
          </svg>
        );

      case EraTheme.CREATIVE:
        // Diffusion: Letter "A" emerging from Noise
        return (
          <svg className="w-full h-full bg-black/50" viewBox="0 0 200 200">
             <defs>
                 <filter id="diffusion-noise">
                     {/* 1. Generate heavy noise */}
                     <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise">
                         <animate attributeName="baseFrequency" values="0.9;0.01;0.9" dur="6s" repeatCount="indefinite" />
                     </feTurbulence>
                     
                     {/* 2. Displace the text heavily based on noise */}
                     <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G">
                         <animate attributeName="scale" values="50;0;50" dur="6s" repeatCount="indefinite" />
                     </feDisplacementMap>
                     
                     {/* 3. Blur slightly */}
                     <feGaussianBlur stdDeviation="6">
                         <animate attributeName="stdDeviation" values="8;0;8" dur="6s" repeatCount="indefinite" />
                     </feGaussianBlur>
                 </filter>
                 
                 <linearGradient id="scan-grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="white" />
                    <stop offset="100%" stopColor="transparent" />
                 </linearGradient>
             </defs>

             {/* The "Target" Image - Letter A */}
             <text 
                x="100" 
                y="150" 
                fontSize="140" 
                textAnchor="middle" 
                fill={color} 
                fontFamily="serif" 
                fontWeight="bold"
                filter="url(#diffusion-noise)"
                opacity="0.9"
             >
                A
             </text>
             
             {/* Scanning Bar Overlay */}
             <rect x="0" y="-20" width="200" height="20" fill="url(#scan-grad)" opacity="0.4">
                 <animate attributeName="y" values="-20;220" dur="3s" repeatCount="indefinite" />
             </rect>
             
             <text x="100" y="180" fontSize="10" textAnchor="middle" fill="#fff" opacity="0.6" letterSpacing="2">DIFFUSION</text>
          </svg>
        );

      case EraTheme.CONVERSATIONAL:
        // Chat Bubbles Streaming
        return (
          <svg className="w-full h-full bg-black/50" viewBox="0 0 200 200">
             {/* User Bubble (Left) */}
             <rect x="20" y="140" width="60" height="40" rx="10" fill="#334155">
                 <animate attributeName="y" values="200;140" dur="0.5s" fill="freeze" />
                 <animate attributeName="opacity" values="0;1" dur="0.5s" fill="freeze" />
             </rect>

             {/* AI Bubble (Right) */}
             <g>
                <rect x="80" y="40" width="100" height="80" rx="10" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1" />
                
                {/* Streaming Text Lines */}
                <line x1="90" y1="60" x2="170" y2="60" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeDasharray="80">
                   <animate attributeName="stroke-dashoffset" values="80;0" dur="0.5s" begin="0.5s" fill="freeze" />
                </line>
                <line x1="90" y1="75" x2="160" y2="75" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeDasharray="70">
                   <animate attributeName="stroke-dashoffset" values="70;0" dur="0.5s" begin="0.8s" fill="freeze" />
                </line>
                <line x1="90" y1="90" x2="175" y2="90" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeDasharray="85">
                   <animate attributeName="stroke-dashoffset" values="85;0" dur="0.5s" begin="1.1s" fill="freeze" />
                </line>
                
                {/* Blinking Cursor */}
                <circle cx="90" cy="105" r="3" fill="#fff">
                    <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" />
                </circle>
             </g>
          </svg>
        );

      case EraTheme.MULTIMODAL:
        // World Sim: Physics Drop, Ripples, Floating Screens
        return (
          <svg className="w-full h-full bg-black/50" viewBox="0 0 200 200">
             <defs>
                 <radialGradient id="orb-grad">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="100%" stopColor={color} />
                 </radialGradient>
                 <filter id="glow-multi">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                       <feMergeNode in="coloredBlur" />
                       <feMergeNode in="SourceGraphic" />
                    </feMerge>
                 </filter>
             </defs>
             
             {/* Perspective Grid Floor */}
             <g transform="translate(100, 150) scale(1, 0.4)">
                {/* Concentric ripples/grid lines */}
                <circle cx="0" cy="0" r="80" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />
                <circle cx="0" cy="0" r="50" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />
                <circle cx="0" cy="0" r="20" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.2" />
                
                {/* Crosshairs */}
                <line x1="-100" y1="0" x2="100" y2="0" stroke={color} strokeOpacity="0.3" />
                <line x1="0" y1="-100" x2="0" y2="100" stroke={color} strokeOpacity="0.3" />
             </g>

             {/* Falling/Bouncing Orb */}
             <circle cx="100" cy="40" r="15" fill="url(#orb-grad)" filter="url(#glow-multi)">
                 <animate attributeName="cy" values="40;150;110;150" dur="2s" keyTimes="0;0.5;0.75;1" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 1 1; 0 0 0.2 1; 0.4 0 1 1" />
                 <animate attributeName="r" values="15;15;14;15" dur="2s" keyTimes="0;0.45;0.5;1" repeatCount="indefinite" />
             </circle>

             {/* Impact Ripples */}
             <g transform="translate(100, 150) scale(1, 0.3)">
                <ellipse cx="0" cy="0" rx="10" ry="10" stroke="#fff" fill="none" strokeWidth="2" opacity="0">
                     <animate attributeName="rx" values="10;100" dur="2s" begin="0.5s" repeatCount="indefinite" />
                     <animate attributeName="ry" values="10;100" dur="2s" begin="0.5s" repeatCount="indefinite" />
                     <animate attributeName="opacity" values="1;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="0" cy="0" rx="5" ry="5" stroke={color} fill="none" strokeWidth="2" opacity="0">
                     <animate attributeName="rx" values="5;70" dur="2s" begin="0.6s" repeatCount="indefinite" />
                     <animate attributeName="ry" values="5;70" dur="2s" begin="0.6s" repeatCount="indefinite" />
                     <animate attributeName="opacity" values="0.8;0" dur="2s" begin="0.6s" repeatCount="indefinite" />
                </ellipse>
             </g>

             {/* Floating Video Frames (rising up) */}
             <rect x="30" y="100" width="30" height="20" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.1">
                 <animate attributeName="y" values="140;60" dur="4s" repeatCount="indefinite" />
                 <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
             </rect>
             <rect x="140" y="120" width="40" height="25" stroke="white" strokeWidth="1" fill="white" fillOpacity="0.1">
                 <animate attributeName="y" values="160;80" dur="3s" begin="1s" repeatCount="indefinite" />
                 <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1s" repeatCount="indefinite" />
             </rect>
             <rect x="80" y="80" width="20" height="15" stroke={color} strokeWidth="1" fill="none">
                 <animate attributeName="y" values="100;40" dur="5s" begin="0.5s" repeatCount="indefinite" />
                 <animate attributeName="opacity" values="0;0.5;0" dur="5s" begin="0.5s" repeatCount="indefinite" />
             </rect>

          </svg>
        );

      default:
        return <div className="w-full h-full bg-gray-800" />;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-black/50 to-black/80">
      {renderAnimation()}
    </div>
  );
};

export default TechAnimation;
