// "use client";

// import Link from "next/link";
// import React, { FC, useState, useEffect } from "react";
// import NavItems from "../utils/NavItems";
// import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
// import Login from "../components/Auth/login";
// import SignUp from "../components/Auth/signup";
// import Verification from "../components/Auth/verification";
// import CustomModel from "../utils/CustomModel";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
// import { useSelector } from "react-redux";
// import { useSession } from "next-auth/react";
// import { useLogOutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
// import toast from "react-hot-toast";


// type Props = {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   activeItem: number;
//   route: string;
//   setRoute: (route: string) => void;
// };

// const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
//   const [active, setActive] = useState(false);
//   const [openSidebar, setOpenSidebar] = useState(false);
//   const {
//     data: userData,
//     isLoading,
//     refetch,
//   } = useLoadUserQuery(undefined, {});
//   const { user } = useSelector((state: any) => state.auth);
//   const { data } = useSession();
//   const [socialAuth, { isSuccess }] = useSocialAuthMutation();
//   const [logout, setLogout] = useState(false);
//   const {} = useLogOutQuery(undefined, {
//     skip: !logout ? true : false,
//   });

//   useEffect(() => {
//     if (!isLoading) {
//       if (!userData) {
//         if (data) {
//           socialAuth({
//             email: data?.user?.email,
//             name: data?.user?.name,
//             avatar: data?.user?.image,
//           });
//           refetch();
//         }
//       }
//       if (data === null) {
//         if (isSuccess) {
//           toast.success("Login Successfull");
//         }
//       }
//       if (data === null && !isLoading && !userData) {
//         setLogout(true);
//       }
//     }
//   }, [data, userData, isSuccess, socialAuth, refetch, isLoading]);

//   if (typeof window !== "undefined") {
//     window.addEventListener("scroll", () => {
//       if (window.screenY > 85) {
//         setActive(true);
//       } else {
//         setActive(false);
//       }
//     });
//   }

//   const handleClose = (e: any) => {
//     if (e.target.id === "screen") {
//       {
//         setOpenSidebar(false);
//       }
//     }
//   };

//   return (
//     <div className="w-full relative">
//       <div
//         className={`${
//           active
//             ? "bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
//             : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
//         }`}
//       >
//         <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
//           <div className="w-full h-[80px] flex items-center justify-between p-3">
//             {/* LOGO */}
//             <Link
//               href="/"
//               className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
//             >
//               LMS
//             </Link>

//             <div className="flex items-center gap-3">
//               {/* DESKTOP MENU (hidden on mobile) */}
//               <div className="hidden md:block">
//                 <NavItems activeItem={activeItem} isMobile={false} />
//               </div>

//               {/* MOBILE MENU BUTTON (hidden on desktop) */}
//               <div className="md:hidden">
//                 <HiOutlineMenuAlt3
//                   size={25}
//                   className="cursor-pointer dark:text-white text-black"
//                   onClick={() => setOpenSidebar(true)}
//                 />
//               </div>
//               <HiOutlineUserCircle
//                 size={25}
//                 className="hidden md:block cursor-pointer dark:text-white text-black"
//                 onClick={() => setOpen(true)}
//               />
//             </div>
//           </div>
//         </div>
//         {/* mobile sidebar */}
//         {openSidebar && (
//           <div
//             className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
//             onClick={handleClose}
//             id="screen"
//           >
//             <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
//               <NavItems activeItem={activeItem} isMobile={true} />
//               <HiOutlineUserCircle
//                 size={25}
//                 className="cursor-pointer ml-5 m-2 text-black dark:text-white"
//                 onClick={() => setOpen(true)}
//               />
//               <br></br>
//               <p className="pl-5">
//                 Copyrigth &copy; 2025 Elearning. All rights reserved.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {route === "Login" && (
//         <>
//           {open && (
//             <CustomModel
//               open={open}
//               setOpen={setOpen}
//               setRoute={setRoute}
//               activeItem={activeItem}
//               component={Login}
//               refetch={refetch}
//             />
//           )}
//         </>
//       )}

//       {route === "Sign-Up" && (
//         <>
//           {open && (
//             <CustomModel
//               open={open}
//               setOpen={setOpen}
//               setRoute={setRoute}
//               activeItem={activeItem}
//               component={SignUp}
//             />
//           )}
//         </>
//       )}

//       {route === "Verification" && (
//         <>
//           {open && (
//             <CustomModel
//               open={open}
//               setOpen={setOpen}
//               setRoute={setRoute}
//               activeItem={activeItem}
//               component={Verification}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Header;


"use client";

import Link from "next/link";
import React, { FC, useState, useEffect, MouseEvent } from "react";
import NavItems from "../utils/NavItems";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import Login from "../components/Auth/login";
import SignUp from "../components/Auth/signup";
import Verification from "../components/Auth/verification";
import CustomModel from "../utils/CustomModel";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);

  useLogOutQuery(undefined, {
    skip: !logout,
  });

  // 🔁 Auth / social auth effect
  useEffect(() => {
    if (isLoading) return;

    if (!userData && data) {
      socialAuth({
        email: data?.user?.email,
        name: data?.user?.name,
        avatar: data?.user?.image,
      });
      refetch();
    }

    if (data === null) {
      if (isSuccess) {
        toast.success("Login Successfull");
      }
      if (!userData) {
        setLogout(true);
      }
    }
  }, [data, userData, isSuccess, socialAuth, refetch, isLoading]);


  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // run once on mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            {/* LOGO */}
            <Link
              href="/"
              className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
            >
              LMS
            </Link>

            <div className="flex items-center gap-3">
              {/* DESKTOP MENU */}
              <div className="hidden md:block">
                <NavItems activeItem={activeItem} isMobile={false} />
              </div>

              {/* MOBILE MENU BUTTON */}
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              {/* USER ICON (desktop) */}
              <HiOutlineUserCircle
                size={25}
                className="hidden md:block cursor-pointer dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* MOBILE SIDEBAR */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 m-2 text-black dark:text-white"
                onClick={() => setOpen(true)}
              />
              <br />
              <p className="pl-5 text-sm">
                Copyright &copy; 2025 Elearning. All rights reserved.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* AUTH MODALS */}
      {route === "Login" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          refetch={refetch}
        />
      )}

      {route === "Sign-Up" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}

      {route === "Verification" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </div>
  );
};

export default Header;
