import React from 'react';

const AuthBlobs = () => {
  return (
    <div className="absolute inset-0 bg-ivory dark:bg-slate-950 overflow-hidden transition-colors duration-500">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-lime-50/50 to-ivory dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>

      {/* Floating Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <style>
          {`
            @keyframes float-slow {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              33% { transform: translate(30px, -50px) rotate(10deg); }
              66% { transform: translate(-20px, 20px) rotate(-5deg); }
            }
            @keyframes float-medium {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(-40px, 30px) scale(1.1); }
            }
            @keyframes float-fast {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(40px, -40px) scale(0.9); }
            }
            .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
            .animate-float-medium { animation: float-medium 15s ease-in-out infinite; }
            .animate-float-fast { animation: float-fast 12s ease-in-out infinite; }
          `}
        </style>

        {/* Blob 1 - Top Left */}
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] min-w-[300px] min-h-[300px] bg-emerald-300/30 dark:bg-emerald-600/20 rounded-full blur-3xl animate-float-slow mix-blend-multiply dark:mix-blend-screen filter"></div>

        {/* Blob 2 - Bottom Right */}
        <div className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] min-w-[300px] min-h-[300px] bg-lime-300/30 dark:bg-lime-600/20 rounded-full blur-3xl animate-float-medium mix-blend-multiply dark:mix-blend-screen filter animation-delay-2000"></div>

        {/* Blob 3 - Center Offset */}
        <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] min-w-[200px] min-h-[200px] bg-emerald-200/30 dark:bg-emerald-600/20 rounded-full blur-3xl animate-float-fast mix-blend-multiply dark:mix-blend-screen filter animation-delay-4000"></div>
      </div>

      {/* Glassmorphism Overlay (Optional, for texture) */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
    </div>
  );
};

export default AuthBlobs;
