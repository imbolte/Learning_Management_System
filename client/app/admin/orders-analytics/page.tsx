"use client";
import React, { useState } from 'react'
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar';
import Heading from '../../utils/Heading';
import DashboardHeader from '../../components/Admin/DashboardHeader';
import OrderAnalytics from '../../components/Admin/Analytics/OrderAnalytics';

type Props = {}

const page = (props: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <DashboardHeader open={open} setOpen={setOpen} />
            <OrderAnalytics />
        </div>
    )
}

export default page
