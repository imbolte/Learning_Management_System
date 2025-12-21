'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AnimatedBackground from './AnimatedBackground';

const GlobalBackground = () => {
    const pathname = usePathname();
    const [variant, setVariant] = useState<'landing' | 'auth' | 'ui' | 'dashboard' | 'admin'>('landing');

    useEffect(() => {
        if (!pathname) return;

        // Use landing animation for most pages to show the beautiful Emerald Aurora
        if (pathname === '/' ||
            pathname === '/about' ||
            pathname === '/policy' ||
            pathname === '/faq' ||
            pathname.startsWith('/course') ||
            pathname.startsWith('/profile') ||
            pathname.startsWith('/dashboard') ||
            pathname.startsWith('/user') ||
            pathname.startsWith('/admin')) {
            setVariant('landing');
        } else if (pathname.startsWith('/login') || pathname.startsWith('/sign-up') || pathname.startsWith('/register')) {
            setVariant('auth');
        } else {
            // Default fallback for other pages
            setVariant('ui');
        }
    }, [pathname]);

    return <AnimatedBackground variant={variant} />;
};

export default GlobalBackground;
