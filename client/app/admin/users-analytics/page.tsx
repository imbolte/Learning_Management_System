"use client";
import React, { useState } from 'react'
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar';
import Heading from '../../utils/Heading';
import DashboardHeader from '../../components/Admin/DashboardHeader';
import UsersAnalytics from '../../components/Admin/Analytics/UsersAnalytics';

type Props = {}

const page = (props: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <DashboardHeader open={open} setOpen={setOpen} />
            <UsersAnalytics />
        </div>
    )
}

export default page
