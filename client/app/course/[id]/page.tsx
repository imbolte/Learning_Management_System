"use client";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import Heading from "../../utils/Heading";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CourseDetails from "../../components/Course/CourseDetails";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetCourseDetailsQuery(id);

    return (
        <div className="min-h-screen">
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <Heading
                        title={data?.course?.name + " - Elearning"}
                        description={
                            "Elearning is a platform for students to learn and get help from teachers"
                        }
                        keywords={data?.course?.tags}
                    />
                    <Header
                        route={route}
                        setRoute={setRoute}
                        open={open}
                        setOpen={setOpen}
                        activeItem={1}
                    />
                    {data && (
                        <CourseDetails
                            data={data.course}
                            setRoute={setRoute}
                            setOpen={setOpen}
                        />
                    )}
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default Page;
