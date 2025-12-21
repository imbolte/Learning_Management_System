import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

type Props = {
    setOpen: any;
    data: any;
    stripePromise: any;
    clientSecret: string;
    user: any;
}

const CheckOutModal = ({ setOpen, data, stripePromise, clientSecret, user }: Props) => {
    return (
        <div className="w-full flex justify-center">
            <div className="w-[500px] h-[min-content] bg-white rounded-xl shadow p-3">
                <div className="w-full flex justify-end">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer text-black"
                        onClick={() => setOpen(false)}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                {stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckOutForm setOpen={setOpen} data={data} user={user} />
                    </Elements>
                )}
            </div>
        </div>
    )
}

export default CheckOutModal
