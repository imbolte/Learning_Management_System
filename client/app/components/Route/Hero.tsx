// import React from "react";

// const Hero = () => {
//   return (
//     <div className="w-full min-h-screen flex items-center bg-[#0f1524] relative overflow-hidden">
//       <div className="w-full 1000px:flex items-center container mx-auto px-4 relative">

//         {/* Left Side - Image with Circular Background */}
//         <div className="1000px:w-[40%] flex items-center justify-center 1000px:justify-start pt-[70px] 1000px:pt-0 relative mb-10 1000px:mb-0">
//           {/* Large Circular Background */}
//           <div className="absolute left-1/2 transform -translate-x-1/2 1000px:left-0 1000px:translate-x-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] 800px:w-[450px] 800px:h-[450px] 1000px:w-[500px] 1000px:h-[500px] 1100px:w-[600px] 1100px:h-[600px] 1500px:w-[700px] 1500px:h-[700px] rounded-full bg-gradient-to-br from-[#1e3a8a] via-[#1e2a5e] to-[#0f1524] opacity-90"></div>

//           {/* Illustration Image - stays relative to circle on mobile, overlaps on desktop */}
//           <img
//             src="https://edmy-react.hibootstrap.com/images/banner/banner-img-1.png"
//             alt="Learning illustration"
//             className="relative z-10 object-contain w-[320px] 800px:w-[380px] 1000px:w-[450px] 1000px:absolute 1000px:left-[-50px] 1100px:w-[500px] 1100px:left-[-30px] 1500px:w-[580px] 1500px:left-0 h-auto"
//           />
//         </div>

//         {/* Right Side - Content */}
//         <div className="1000px:w-[60%] flex flex-col items-center 1000px:items-start 1000px:mt-0 text-center 1000px:text-left mt-[20px] z-10 relative">
//           <h2 className="text-white text-[28px] px-3 w-full 800px:text-[45px] 1000px:text-[55px] 1500px:text-[70px] font-semibold py-2 leading-tight 1000px:leading-[65px] 1500px:leading-[80px] 1500px:w-[90%]">
//             Improve Your Online Learning Experience Better Instantly
//           </h2>

//           <br />

//           <p className="text-gray-300 font-normal text-[15px] 800px:text-[17px] 1000px:text-[18px] 1500px:w-[85%] 1100px:w-[90%] px-3 1000px:px-0">
//             We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them.
//           </p>

//           <br />
//           <br />

//           {/* Search Bar */}
//           <div className="1500px:w-[85%] 1100px:w-[90%] w-[90%] mb-8">
//             <div className="flex items-center bg-[#282d3e] rounded-lg overflow-hidden shadow-lg">
//               <input
//                 type="text"
//                 placeholder="Search Courses..."
//                 className="flex-1 bg-transparent text-white px-4 800px:px-6 py-3 800px:py-4 outline-none placeholder-gray-500 text-[15px] 800px:text-[16px]"
//               />
//               <button className="bg-[#3b82f6] p-3 px-5 800px:p-4 800px:px-6 hover:bg-[#2563eb] transition">
//                 <svg className="w-5 h-5 800px:w-6 800px:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Avatars and Text */}
//           <div className="1500px:w-[85%] 1100px:w-[90%] w-[90%] flex flex-col 800px:flex-row items-center gap-3 800px:gap-4">
//             <div className="flex items-center">
//               <img
//                 src="https://edmy-react.hibootstrap.com/images/banner/client-1.jpg"
//                 alt="Client"
//                 className="rounded-full w-10 h-10 800px:w-12 800px:h-12 border-2 border-[#0f1524]"
//               />
//               <img
//                 src="https://edmy-react.hibootstrap.com/images/banner/client-2.jpg"
//                 alt="Client"
//                 className="rounded-full w-10 h-10 800px:w-12 800px:h-12 border-2 border-[#0f1524] ml-[-12px] 800px:ml-[-15px]"
//               />
//               <img
//                 src="https://edmy-react.hibootstrap.com/images/banner/client-3.jpg"
//                 alt="Client"
//                 className="rounded-full w-10 h-10 800px:w-12 800px:h-12 border-2 border-[#0f1524] ml-[-12px] 800px:ml-[-15px]"
//               />
//             </div>
//             <p className="text-gray-300 text-[15px] 800px:text-[16px] 1000px:text-[18px] font-medium">
//               500K+ People already trusted us.{" "}
//               <a href="/courses" className="text-[#46e256] hover:underline">
//                 View Courses
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React from "react";

const Hero = () => {
  return (
    <div className="w-full min-h-screen flex items-center bg-[#0f1524] relative overflow-hidden">
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[1600px] mx-auto px-4 py-10 flex flex-col lg:flex-row items-center lg:justify-between gap-12">
        
        {/* LEFT SECTION */}
        <div className=" lg:ml-40 left-section w-full lg:w-1/2 flex items-center justify-center lg:justify-start relative pt-[40px] lg:pt-0">
          
          {/* Circle Background (Slightly Larger to Match Bigger Image) */}
          <div
            className="circle-background hero_animation absolute
              left-1/2 -translate-x-1/2 lg:left-[-60px] lg:translate-x-0
              top-1/2 -translate-y-1/2
              w-[350px] h-[350px]
              sm:w-[420px] sm:h-[420px]
              lg:w-[500px] lg:h-[500px]
              xl:w-[560px] xl:h-[560px]
              rounded-full"
          ></div>

          {/* Increased Illustration Image */}
          <img
            src="https://edmy-react.hibootstrap.com/images/banner/banner-img-1.png"
            //src="https://www.freepik.com/free-vector/e-learning-isometric-concept_4189151.htm#fromView=search&page=1&position=43&uuid=b9fb7374-a41e-4de4-bed6-27fe03c22f6d&query=elearning.png"
            alt="Learning illustration"
            className="relative z-10 object-contain
              w-[300px]
              sm:w-[360px]
              lg:w-[440px]
              xl:w-[520px]
              2xl:w-[560px]
              h-auto"
          />
        </div>

        {/* RIGHT SECTION (unchanged) */}
        <div className="right-section w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10 relative max-w-[550px]">

          <h2 className="text-white font-bold mb-4 lg:mb-5 
            text-[24px] sm:text-[32px] lg:text-[38px] xl:text-[44px]
            leading-tight sm:leading-[38px] lg:leading-[46px]
            px-3 lg:px-0">
            Improve Your Online Learning Experience Better Instantly
          </h2>

          <p className="text-gray-300 font-normal mb-6 lg:mb-8
            text-[14px] sm:text-[15px] lg:text-[16px]
            px-3 lg:px-0">
            We have 40k+ Online courses &amp; 500K+ Online registered student.
            Find your desired Courses from them.
          </p>

          <div className="w-full sm:w-[80%] lg:w-[95%] mb-6 lg:mb-8">
            <div className="flex items-center bg-[#282d3e] rounded-3xl overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Search Courses..."
                className="flex-1 bg-transparent text-white px-4 py-3 outline-none placeholder-gray-500 text-[14px]"
              />
              <button className="bg-[#3b82f6] p-3 px-5 hover:bg-[#2563eb] transition">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="flex items-center">
              <img
                src="https://edmy-react.hibootstrap.com/images/banner/client-1.jpg"
                alt="Client"
                className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-2 border-[#0f1524]"
              />
              <img
                src="https://edmy-react.hibootstrap.com/images/banner/client-2.jpg"
                alt="Client"
                className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-2 border-[#0f1524] ml-[-10px]"
              />
              <img
                src="https://edmy-react.hibootstrap.com/images/banner/client-3.jpg"
                alt="Client"
                className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-2 border-[#0f1524] ml-[-10px]"
              />
            </div>

            <p className="text-gray-300 text-[14px] sm:text-[15px] lg:text-[16px] font-semibold text-center sm:text-left">
              500K+ People already trusted us.{" "}
              <a href="/courses" className="text-[#46e256] hover:underline">
                View Courses
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;



