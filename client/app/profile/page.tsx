"use client";
import React, { FC, useState, useEffect } from "react";
import Protected from "../components/Auth/Protected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

type Props = {};

const Page: FC<Props> = (props) => {
    const { user } = useSelector((state: any) => state.auth);
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login");

    // Redirect admin to dashboard when they click on profile
    useEffect(() => {
        if (user?.role === "admin") {
            router.replace("/admin");
        }
    }, [user, router]);

    // Don't render profile for admin (they'll be redirected)
    if (user?.role === "admin") {
        return null;
    }

    return (
        <div className="min-h-screen">
            <Protected>
                <Heading
                    title={`${user?.name} profile - Elearning`}
                    description="Elearning is a platform for students to learn and get help from teachers"
                    keywords="Prograaming,MERN,Redux,Machine Learning"
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />
                <Profile user={user} />
            </Protected>
        </div>
    );
};

export default Page;
