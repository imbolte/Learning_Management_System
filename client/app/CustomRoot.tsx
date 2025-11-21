"use client";

import { useEffect } from "react";
import socketIO from "socket.io-client";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";

const CustomRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  useEffect(() => {
    if (!ENDPOINT) return;

    const socket = socketIO(ENDPOINT, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      // optional: console.log("socket connected", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default CustomRoot;
