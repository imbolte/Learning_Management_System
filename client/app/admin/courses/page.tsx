"use client";
import React, { useState } from 'react'
import DashboardHeader from '../../components/Admin/DashboardHeader';
import AllCourses from '../../components/Admin/Course/AllCourses';

type Props = {}

const page = (props: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <DashboardHeader open={open} setOpen={setOpen} />
            <AllCourses />
        </div>
    )
}

export default page
