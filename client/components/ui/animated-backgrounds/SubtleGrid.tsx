import React from 'react';

const SubtleGrid = () => {
    return (
        <div className="absolute inset-0 bg-ivory dark:bg-slate-950 overflow-hidden transition-colors duration-500">
            <style>
                {`
          @keyframes grid-pulse {
            0%, 100% { opacity: 0.15; }
            50% { opacity: 0.25; }
          }
          @keyframes beam-move {
            0% { transform: translateY(-100%) translateX(-100%); opacity: 0; }
            50% { opacity: 0.3; }
            100% { transform: translateY(100%) translateX(100%); opacity: 0; }
          }
          @keyframes float-particle {
            0% { transform: translateY(0) translateX(0); opacity: 0.2; }
            50% { transform: translateY(-20px) translateX(10px); opacity: 0.4; }
            100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          }
          .animate-grid-pulse { animation: grid-pulse 4s ease-in-out infinite; }
          .animate-beam { animation: beam-move 8s linear infinite; }
          .animate-float { animation: float-particle 6s ease-in-out infinite; }
        `}
            </style>

            {/* Stronger Grid Pattern with Emerald */}
            <div className="absolute inset-0 animate-grid-pulse"
                style={{
                    backgroundImage: `
                linear-gradient(to right, rgba(46, 204, 113, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(46, 204, 113, 0.2) 1px, transparent 1px)
             `,
                    backgroundSize: '50px 50px'
                }}>
            </div>

            {/* Emerald Dots Pattern */}
            <div className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(46, 204, 113, 0.15) 1px, transparent 1px)`,
                    backgroundSize: '25px 25px'
                }}>
            </div>

            {/* Radial Gradient Focus */}
            <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent dark:from-slate-950 dark:via-transparent dark:to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-ivory via-transparent to-transparent dark:from-slate-950 dark:via-transparent dark:to-transparent"></div>

            {/* Stronger Glowing Beam Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-[200%] h-[200%] -ml-[50%] -mt-[50%] bg-gradient-to-br from-transparent via-emerald-500/20 to-transparent rotate-45 animate-beam"></div>
            </div>

            {/* Floating Emerald Particles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-emerald-500/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-[60%] left-[30%] w-3 h-3 bg-lime-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-[40%] left-[70%] w-2 h-2 bg-emerald-500/25 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
                <div className="absolute top-[80%] left-[50%] w-3 h-3 bg-lime-400/15 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-[30%] left-[85%] w-2 h-2 bg-emerald-500/20 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
            </div>
        </div>
    );
};

export default SubtleGrid;
