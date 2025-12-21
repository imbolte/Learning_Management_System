'use client';

import React from 'react';
import LandingWave from './LandingWave';
import AuthBlobs from './AuthBlobs';
import SubtleGrid from './SubtleGrid';
import FlowingLines from './FlowingLines';
import DataPulse from './DataPulse';

type Variant = 'landing' | 'auth' | 'ui' | 'dashboard' | 'admin';

interface AnimatedBackgroundProps {
    variant: Variant;
    className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant, className = '' }) => {
    const [scrollY, setScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const renderBackground = () => {
        switch (variant) {
            case 'landing':
                return <LandingWave />;
            case 'auth':
                return <AuthBlobs />;
            case 'ui':
                return <SubtleGrid />;
            case 'dashboard':
                return <FlowingLines />;
            case 'admin':
                return <DataPulse />;
            default:
                return null;
        }
    };

    return (
        <div
            className={`fixed inset-0 -z-50 overflow-hidden pointer-events-none ${className}`}
            style={{
                transform: `translateY(-${scrollY * 0.1}px)`, // Subtle parallax effect
                transition: 'transform 0.1s ease-out'
            }}
        >
            {renderBackground()}
        </div>
    );
};

export default AnimatedBackground;
