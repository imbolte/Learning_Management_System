import { redirect } from "next/navigation";
import userAuth from "@/app/hooks/userAuth";
import React from "react";

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const isAuthenticated = userAuth();

  return isAuthenticated ? children : redirect("/");
};

export default Protected;
