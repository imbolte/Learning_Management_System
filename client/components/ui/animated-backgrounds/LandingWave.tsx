'use client';

import React, { useEffect, useState } from 'react';

const LandingWave = () => {
    const [mounted, setMounted] = useState(false);
    const [particles, setParticles] = useState<Array<{
        left: string;
        top: string;
        width: string;
        height: string;
        opacity: number;
        delay: string;
        duration: string;
        shape: 'circle' | 'square' | 'triangle';
    }>>([]);

    useEffect(() => {
        setMounted(true);
        const newParticles = [...Array(20)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: '100%',
            width: `${Math.random() * 10 + 5}px`, // Slightly larger for shapes
            height: `${Math.random() * 10 + 5}px`,
            opacity: Math.random() * 0.3 + 0.1,
            delay: `${Math.random() * 15}s`,
            duration: `${Math.random() * 10 + 15}s`,
            shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 bg-ivory dark:bg-slate-950 overflow-hidden">
            <style>
                {`
          @keyframes aurora-1 {
            0%, 100% { top: 0; left: 0; transform: scale(1); }
            33% { top: -10%; left: -10%; transform: scale(1.2); }
            66% { top: 10%; left: 10%; transform: scale(0.8); }
          }
          @keyframes aurora-2 {
            0%, 100% { top: 0; right: 0; transform: scale(1); }
            33% { top: 10%; right: -10%; transform: scale(1.1); }
            66% { top: -10%; right: 10%; transform: scale(0.9); }
          }
          @keyframes aurora-3 {
            0%, 100% { bottom: 0; left: 20%; transform: scale(1); }
            50% { bottom: -10%; left: 10%; transform: scale(1.3); }
          }
           @keyframes float-particle {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
          }
          .animate-aurora-1 { animation: aurora-1 20s ease-in-out infinite alternate; }
          .animate-aurora-2 { animation: aurora-2 25s ease-in-out infinite alternate; }
          .animate-aurora-3 { animation: aurora-3 30s ease-in-out infinite alternate; }
          .animate-float-particle { animation: float-particle 15s linear infinite; }
        `}
            </style>

            {/* Base Background */}
            <div className="absolute inset-0 bg-ivory dark:bg-[#0f172a]"></div>

            {/* Aurora Mesh Gradients */}
            <div className="absolute inset-0 opacity-60 dark:opacity-40 filter blur-[80px] saturate-150">
                <div className="absolute w-[80vw] h-[80vw] bg-emerald-500/30 rounded-full mix-blend-multiply dark:mix-blend-screen animate-aurora-1"></div>
                <div className="absolute w-[70vw] h-[70vw] bg-lime-400/30 rounded-full mix-blend-multiply dark:mix-blend-screen animate-aurora-2"></div>
                <div className="absolute w-[60vw] h-[60vw] bg-teal-400/20 rounded-full mix-blend-multiply dark:mix-blend-screen animate-aurora-3"></div>
            </div>

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none">
                <svg className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Floating Knowledge Blocks (Particles) */}
            <div className="absolute inset-0 overflow-hidden">
                {mounted && particles.map((p, i) => (
                    <div
                        key={i}
                        className={`absolute bg-emerald-500/20 dark:bg-white/20 backdrop-blur-sm animate-float-particle ${p.shape === 'circle' ? 'rounded-full' : p.shape === 'square' ? 'rounded-sm' : 'rounded-none'
                            }`}
                        style={{
                            left: p.left,
                            top: p.top,
                            width: p.width,
                            height: p.height,
                            opacity: p.opacity,
                            animationDelay: p.delay,
                            animationDuration: p.duration,
                            clipPath: p.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
                        }}
                    />
                ))}
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-ivory dark:from-[#0f172a] to-transparent"></div>
        </div>
    );
};

export default LandingWave;
