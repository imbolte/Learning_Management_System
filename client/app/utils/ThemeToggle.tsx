// import React, { useState, useEffect } from "react";
// import { Moon, Sun } from "lucide-react";

// const DarkModeDemo = () => {
//   const [isDark, setIsDark] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     setIsMounted(true);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = !isDark;
//     setIsDark(newTheme);
//     console.log(newTheme ? "Dark mode enabled" : "Light mode enabled");
//   };

//   if (!isMounted) return null;

//   // Define colors based on theme
//   const theme = {
//     bg: isDark ? "#0f172a" : "#ffffff",
//     navBg: isDark ? "#1e293b" : "#f3f4f6",
//     text: isDark ? "#ffffff" : "#000000",
//     textSecondary: isDark ? "#cbd5e1" : "#4b5563",
//     border: isDark ? "#334155" : "#e5e7eb",
//     cardBg: isDark ? "#1e293b" : "#ffffff",
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: theme.bg,
//         minHeight: "100vh",
//         transition: "background-color 0.3s",
//       }}
//     >
//       {/* Navbar */}
//       <nav
//         style={{
//           backgroundColor: theme.navBg,
//           borderBottom: `1px solid ${theme.border}`,
//           transition: "background-color 0.3s, border-color 0.3s",
//         }}
//       >
//         <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1rem" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               height: "4rem",
//             }}
//           >
//             {/* Logo */}
//             <div
//               style={{
//                 fontSize: "1.5rem",
//                 fontWeight: "bold",
//                 color: theme.text,
//               }}
//             >
//               Logo
//             </div>

//             {/* Nav Links */}
//             <div
//               style={{
//                 display: "flex",
//                 gap: "2rem",
//               }}
//             >
//               {["Home", "About", "Services"].map((link) => (
//                 <a
//                   key={link}
//                   href="#"
//                   style={{
//                     color: theme.textSecondary,
//                     textDecoration: "none",
//                     transition: "color 0.3s",
//                     cursor: "pointer",
//                   }}
//                   onMouseEnter={(e) => (e.target.style.color = theme.text)}
//                   onMouseLeave={(e) =>
//                     (e.target.style.color = theme.textSecondary)
//                   }
//                 >
//                   {link}
//                 </a>
//               ))}
//             </div>

//             {/* Theme Toggle */}
//             <button
//               onClick={toggleTheme}
//               style={{
//                 padding: "0.5rem",
//                 borderRadius: "0.5rem",
//                 backgroundColor: isDark ? "#374151" : "#e5e7eb",
//                 border: "none",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s",
//               }}
//               onMouseEnter={(e) =>
//                 (e.target.style.backgroundColor = isDark
//                   ? "#4b5563"
//                   : "#d1d5db")
//               }
//               onMouseLeave={(e) =>
//                 (e.target.style.backgroundColor = isDark
//                   ? "#374151"
//                   : "#e5e7eb")
//               }
//               aria-label="Toggle theme"
//             >
//               {isDark ? (
//                 <Sun size={20} color="#eab308" />
//               ) : (
//                 <Moon size={20} color="#374151" />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main
//         style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1rem" }}
//       >
//         <h1
//           style={{
//             fontSize: "2.25rem",
//             fontWeight: "bold",
//             color: theme.text,
//             marginBottom: "1rem",
//           }}
//         >
//           Welcome
//         </h1>
//         <p
//           style={{
//             fontSize: "1.125rem",
//             color: theme.textSecondary,
//             marginBottom: "2rem",
//           }}
//         >
//           Click the toggle button to switch between light and dark modes.
//         </p>

//         {/* Sample Cards */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//             gap: "1.5rem",
//           }}
//         >
//           {[1, 2, 3].map((item) => (
//             <div
//               key={item}
//               style={{
//                 padding: "1.5rem",
//                 backgroundColor: theme.cardBg,
//                 borderRadius: "0.5rem",
//                 border: `1px solid ${theme.border}`,
//                 transition: "background-color 0.3s, border-color 0.3s",
//               }}
//             >
//               <h3
//                 style={{
//                   fontSize: "1.25rem",
//                   fontWeight: "600",
//                   color: theme.text,
//                   marginBottom: "0.5rem",
//                 }}
//               >
//                 Card {item}
//               </h3>
//               <p style={{ color: theme.textSecondary }}>
//                 This card changes color based on the theme.
//               </p>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DarkModeDemo;


// app/components/theme-toggle.tsx (example path)
"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const DarkModeDemo = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const isDark = (resolvedTheme || theme) === "dark";

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    console.log(nextTheme === "dark" ? "Dark mode enabled" : "Light mode enabled");
  };

  const themeColors = {
    bg: isDark ? "#0f172a" : "#ffffff",
    navBg: isDark ? "#1e293b" : "#f3f4f6",
    text: isDark ? "#ffffff" : "#000000",
    textSecondary: isDark ? "#cbd5e1" : "#4b5563",
    border: isDark ? "#334155" : "#e5e7eb",
    cardBg: isDark ? "#1e293b" : "#ffffff",
  };

  return (
    <div
      style={{
        backgroundColor: themeColors.bg,
        minHeight: "100vh",
        transition: "background-color 0.3s",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: themeColors.navBg,
          borderBottom: `1px solid ${themeColors.border}`,
          transition: "background-color 0.3s, border-color 0.3s",
        }}
      >
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "4rem",
            }}
          >
            {/* Logo */}
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: themeColors.text,
              }}
            >
              Logo
            </div>

            {/* Nav Links */}
            <div
              style={{
                display: "flex",
                gap: "2rem",
              }}
            >
              {["Home", "About", "Services"].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    color: themeColors.textSecondary,
                    textDecoration: "none",
                    transition: "color 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.color =
                      themeColors.text;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.color =
                      themeColors.textSecondary;
                  }}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                padding: "0.5rem",
                borderRadius: "0.5rem",
                backgroundColor: isDark ? "#374151" : "#e5e7eb",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = isDark
                  ? "#4b5563"
                  : "#d1d5db";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = isDark
                  ? "#374151"
                  : "#e5e7eb";
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} color="#eab308" /> : <Moon size={20} color="#374151" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main
        style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1rem" }}
      >
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            color: themeColors.text,
            marginBottom: "1rem",
          }}
        >
          Welcome
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: themeColors.textSecondary,
            marginBottom: "2rem",
          }}
        >
          Click the toggle button to switch between light and dark modes.
        </p>

        {/* Sample Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              style={{
                padding: "1.5rem",
                backgroundColor: themeColors.cardBg,
                borderRadius: "0.5rem",
                border: `1px solid ${themeColors.border}`,
                transition: "background-color 0.3s, border-color 0.3s",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: themeColors.text,
                  marginBottom: "0.5rem",
                }}
              >
                Card {item}
              </h3>
              <p style={{ color: themeColors.textSecondary }}>
                This card changes color based on the theme.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DarkModeDemo;

