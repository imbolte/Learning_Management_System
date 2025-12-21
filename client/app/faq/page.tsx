"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { styles } from "../styles/styles";

const Page = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(4); // Faq is index 4 in navItemsdata
    const [route, setRoute] = useState("Login");

    const faqs = [
        {
            question: "How do I get started?",
            answer: "Simply sign up for an account and browse our catalog of courses. Most courses are available for immediate enrollment."
        },
        {
            question: "Are the courses self-paced?",
            answer: "Yes, all our courses are fully self-paced, allowing you to learn at your own speed and on your own schedule."
        },
        {
            question: "Do I receive a certificate?",
            answer: "Yes, upon successful completion of any paid course, you will receive a verifiable digital certificate."
        }
    ];

    return (
        <div className="min-h-screen">
            <Heading
                title="FAQ - ELearning"
                description="Frequently asked questions about ELearning platform"
                keywords="FAQ, help, support, learning"
            />
            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                setRoute={setRoute}
                route={route}
            />

            <div className="w-[95%] 800px:w-[85%] m-auto mt-10 min-h-[70vh]">
                <h1 className={`${styles.title} text-left mb-8`}>
                    Frequently Asked Questions
                </h1>

                <div className="space-y-8 mb-20">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-charcoal/10 dark:border-white/10 shadow-sm transition-all hover:shadow-md">
                            <h3 className="text-[20px] font-[600] text-charcoal dark:text-white mb-3">
                                {faq.question}
                            </h3>
                            <p className="text-charcoal/80 dark:text-gray-300 text-[16px] leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Page;
