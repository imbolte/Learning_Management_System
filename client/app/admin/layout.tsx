"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/Sidebar/AdminSidebar";
import AdminProtected from "../hooks/useAdminProtected";

type Props = {
    children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="ELearning - Admin"
                    description="ELearning is a platform for students to learn and get help from teachers"
                    keywords="Programming,MERN,Redux,Machine Learning"
                />
                <div className="flex min-h-screen">
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar />
                    </div>
                    <div className="w-[85%] 1500px:w-[84%]">
                        {children}
                    </div>
                </div>
            </AdminProtected>
        </div>
    );
};

export default AdminLayout;
