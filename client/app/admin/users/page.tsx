"use client";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AllUsers from "@/app/components/Admin/Users/AllUsers";
import React, { useState } from "react";

type Props = {};

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <DashboardHeader open={open} setOpen={setOpen} />
            <AllUsers />
        </div>
    );
};

export default Page;
