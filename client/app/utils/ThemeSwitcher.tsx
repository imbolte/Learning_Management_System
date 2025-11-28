"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <div className="w-[40px] h-[40px] mx-2" aria-hidden="true"></div>
        );
    }

    // Get the actual current theme (handles 'system' theme)
    const currentTheme = theme === "system" ? resolvedTheme : theme;
    const isDark = currentTheme === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-[40px] h-[40px] rounded-full 
                 bg-gray-200 dark:bg-gray-700 
                 hover:bg-gray-300 dark:hover:bg-gray-600 
                 transition-all duration-300 ease-in-out
                 focus:outline-none focus:ring-2 focus:ring-[#37a39a] focus:ring-offset-2
                 active:scale-95"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <div className="relative w-[24px] h-[24px]">
                {/* Sun Icon */}
                <BiSun
                    className={`absolute inset-0 text-yellow-500 transition-all duration-300 ${isDark
                            ? "opacity-0 rotate-90 scale-0"
                            : "opacity-100 rotate-0 scale-100"
                        }`}
                    size={24}
                />
                {/* Moon Icon */}
                <BiMoon
                    className={`absolute inset-0 text-blue-400 transition-all duration-300 ${isDark
                            ? "opacity-100 rotate-0 scale-100"
                            : "opacity-0 -rotate-90 scale-0"
                        }`}
                    size={24}
                />
            </div>
        </button>
    );
};
