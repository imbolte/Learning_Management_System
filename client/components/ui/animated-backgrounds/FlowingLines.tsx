import React from 'react';

const FlowingLines = () => {
  return (
    <div className="absolute inset-0 bg-ivory dark:bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ivory via-emerald-50/20 to-ivory dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>

      <style>
        {`
          @keyframes flow {
            0% { stroke-dashoffset: 1000; }
            100% { stroke-dashoffset: 0; }
          }
          .animate-flow {
            stroke-dasharray: 50 950;
            animation: flow 15s linear infinite;
          }
          .animate-flow-slow {
            stroke-dasharray: 50 950;
            animation: flow 25s linear infinite;
          }
        `}
      </style>

      <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(46, 204, 113, 0)" />
            <stop offset="50%" stopColor="rgba(46, 204, 113, 0.5)" />
            <stop offset="100%" stopColor="rgba(46, 204, 113, 0)" />
          </linearGradient>
        </defs>

        {/* Horizontal flowing lines */}
        <path d="M-100,100 Q400,50 800,150 T2000,100" stroke="url(#line-grad)" strokeWidth="2" fill="none" className="animate-flow" />
        <path d="M-100,300 Q400,350 800,250 T2000,300" stroke="url(#line-grad)" strokeWidth="2" fill="none" className="animate-flow-slow" style={{ animationDelay: '2s' }} />
        <path d="M-100,500 Q400,450 800,550 T2000,500" stroke="url(#line-grad)" strokeWidth="2" fill="none" className="animate-flow" style={{ animationDelay: '5s' }} />
        <path d="M-100,700 Q400,750 800,650 T2000,700" stroke="url(#line-grad)" strokeWidth="2" fill="none" className="animate-flow-slow" style={{ animationDelay: '7s' }} />

        {/* Vertical subtle grid lines for tech feel */}
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(45, 45, 45, 0.03)" strokeWidth="1" />
        <line x1="40%" y1="0" x2="40%" y2="100%" stroke="rgba(45, 45, 45, 0.03)" strokeWidth="1" />
        <line x1="60%" y1="0" x2="60%" y2="100%" stroke="rgba(45, 45, 45, 0.03)" strokeWidth="1" />
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(45, 45, 45, 0.03)" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default FlowingLines;
