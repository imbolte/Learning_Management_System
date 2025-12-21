"use client";
import React, { useState } from 'react'
import DashboardHeader from '../../../components/Admin/DashboardHeader';
import EditCourse from '../../../components/Admin/Course/EditCourse';

type Props = {}

const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <DashboardHeader open={open} setOpen={setOpen} />
            <EditCourse id={id} />
        </div>
    )
}

export default page
