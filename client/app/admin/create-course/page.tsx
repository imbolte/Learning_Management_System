"use client";
import React, { useState } from 'react'
import CreateCourse from '../../components/Admin/Course/CreateCourse';
import DashboardHeader from '../../components/Admin/DashboardHeader';

type Props = {}

const page = (props: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <DashboardHeader open={open} setOpen={setOpen} />
            <CreateCourse />
        </div>
    )
}

export default page
