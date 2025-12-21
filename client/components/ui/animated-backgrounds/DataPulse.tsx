import React from 'react';

const DataPulse = () => {
    return (
        <div className="absolute inset-0 bg-ivory dark:bg-slate-950 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-ivory via-emerald-50/20 to-ivory dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>

            <svg className="absolute inset-0 w-full h-full opacity-20">
                <pattern id="pattern-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" className="text-emerald-500 fill-current opacity-30" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-dots)" />

                {/* Random pulsing nodes */}
                <circle cx="15%" cy="25%" r="3" className="fill-emerald-400 animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="45%" cy="15%" r="2" className="fill-lime-400 animate-ping" style={{ animationDelay: '1.5s', animationDuration: '4s' }} />
                <circle cx="75%" cy="35%" r="4" className="fill-emerald-500 animate-ping" style={{ animationDelay: '0.5s', animationDuration: '5s' }} />
                <circle cx="25%" cy="65%" r="2" className="fill-lime-500 animate-ping" style={{ animationDelay: '2.5s', animationDuration: '3.5s' }} />
                <circle cx="65%" cy="75%" r="3" className="fill-emerald-400 animate-ping" style={{ animationDelay: '1s', animationDuration: '4.5s' }} />
                <circle cx="85%" cy="85%" r="2" className="fill-lime-400 animate-ping" style={{ animationDelay: '3s', animationDuration: '4s' }} />

                {/* Connecting lines */}
                <path d="M100,100 L300,200" stroke="rgba(46, 204, 113, 0.2)" strokeWidth="1" />
                <path d="M500,100 L700,300" stroke="rgba(163, 230, 53, 0.2)" strokeWidth="1" />
                <path d="M200,500 L400,400" stroke="rgba(46, 204, 113, 0.2)" strokeWidth="1" />
            </svg>
        </div>
    );
};

export default DataPulse;
