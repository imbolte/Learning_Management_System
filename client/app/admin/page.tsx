"use client";
import React, { useState } from "react";
import DashboardHeader from "../components/Admin/DashboardHeader";
import DashboardWidgets from "../components/Admin/Widgets/DashboardWidgets";

type Props = {};

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <DashboardHeader open={open} setOpen={setOpen} />
            <DashboardWidgets open={open} />
        </div>
    );
};

export default Page;
