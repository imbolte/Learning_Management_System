"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import React from "react";
import { useRouter } from "next/navigation";

interface ProtectedProps {
    children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
    const { user } = useSelector((state: any) => state.auth);
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        // Give time for user to load from Redux
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    React.useEffect(() => {
        if (!isLoading && !user) {
            router.push("/");
        } else if (!isLoading && user && user.role !== "admin") {
            router.push("/");
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!user || user.role !== "admin") {
        return null;
    }

    return <>{children}</>;
}
