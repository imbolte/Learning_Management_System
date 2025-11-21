import React from "react";
import Link from "next/link";

export const navItemsdata = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "Faq",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8">
        {navItemsdata &&
          navItemsdata.map((item, index) => (
            <Link href={item.url} key={index}>
              <span
                className={`${
                  activeItem === index
                    ? "text-[#37a39a]"
                    : "text-black dark:text-white"
                } text-[18px] font-Poppins font-[400] cursor-pointer hover:text-[#37a39a] transition-colors`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="800px:hidden mt-5 pl-5">
          <div className="w-full text-center py-6">
            <Link href="/" passHref>
            <span className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                LMS
              </span>
            </Link>
          </div>


          {navItemsdata &&
            navItemsdata.map((item, index) => (
              <Link href={item.url} key={index}>
                <span
                  className={`${
                    activeItem === index
                      ? "text-[#37a39a]"
                      : "text-black dark:text-white"
                  } block py-5 text-[18px] font-Poppins font-[400]`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { Moon, Sun } from "lucide-react";

// export const navItemsdata = [
//   {
//     name: "Home",
//     url: "/",
//   },
//   {
//     name: "Courses",
//     url: "/courses",
//   },
//   {
//     name: "About",
//     url: "/about",
//   },
//   {
//     name: "Policy",
//     url: "/policy",
//   },
//   {
//     name: "Faq",
//     url: "/faq",
//   },
// ];

// type Props = {
//   activeItem: number;
//   isMobile: boolean;
// };

// const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
//   const [isDark, setIsDark] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//     // Check if dark mode is already enabled
//     const isDarkMode =
//       localStorage.getItem("theme") === "dark" ||
//       (!localStorage.getItem("theme") &&
//         window.matchMedia("(prefers-color-scheme: dark)").matches);

//     setIsDark(isDarkMode);
//     applyTheme(isDarkMode);
//   }, []);

//   const applyTheme = (dark: boolean) => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const toggleTheme = () => {
//     const newTheme = !isDark;
//     setIsDark(newTheme);
//     applyTheme(newTheme);
//   };

//   return (
//     <>
//       {/* Desktop Navigation */}
//       <div className="hidden lg:flex items-center gap-8">
//         {navItemsdata &&
//           navItemsdata.map((item, index) => (
//             <Link href={item.url} key={index}>
//               <span
//                 className={`${
//                   activeItem === index
//                     ? "text-[#37a39a]"
//                     : "text-black dark:text-white"
//                 } text-[18px] font-Poppins font-[400] cursor-pointer hover:text-[#37a39a] transition-colors`}
//               >
//                 {item.name}
//               </span>
//             </Link>
//           ))}

//         {/* Theme Toggle Button - Desktop */}
//         {isMounted && (
//           <button
//             onClick={toggleTheme}
//             className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//             aria-label="Toggle theme"
//           >
//             {isDark ? (
//               <Sun className="w-5 h-5 text-yellow-500 transition-all duration-300" />
//             ) : (
//               <Moon className="w-5 h-5 text-gray-700 transition-all duration-300" />
//             )}
//           </button>
//         )}
//       </div>

//       {/* Mobile Navigation */}
//       {isMobile && (
//         <div className="lg:hidden w-full text-center py-6">
//           {navItemsdata &&
//             navItemsdata.map((item, index) => (
//               <div key={index} className="my-3">
//                 <Link href={item.url}>
//                   <span
//                     className={`${
//                       activeItem === index
//                         ? "text-[#37a39a]"
//                         : "text-black dark:text-white"
//                     } text-[18px] font-Poppins font-[400] cursor-pointer hover:text-[#37a39a] transition-colors`}
//                   >
//                     {item.name}
//                   </span>
//                 </Link>
//               </div>
//             ))}

//           {/* Theme Toggle Button - Mobile */}
//           <div className="my-5 flex justify-center">
//             {isMounted && (
//               <button
//                 onClick={toggleTheme}
//                 className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//                 aria-label="Toggle theme"
//               >
//                 {isDark ? (
//                   <Sun className="w-5 h-5 text-yellow-500 transition-all duration-300" />
//                 ) : (
//                   <Moon className="w-5 h-5 text-gray-700 transition-all duration-300" />
//                 )}
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default NavItems;
