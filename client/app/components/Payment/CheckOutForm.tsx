import { styles } from "@/app/styles/styles";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
    LinkAuthenticationElement,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    setOpen: any;
    data: any;
    user: any;
};

const CheckOutForm = ({ setOpen, data, user }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<any>(null);
    const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message);
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsLoading(false);
            createOrder({ courseId: data._id, payment_info: paymentIntent });
        }
    };

    useEffect(() => {
        if (orderData) {
            setOpen(false);
            toast.success("Course purchased successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [orderData, error]);

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text" className={`${styles.button} mt-2 !h-[35px]`}>
                    {isLoading ? "Paying..." : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && (
                <div id="payment-message" className="text-[red] pt-2">
                    {message}
                </div>
            )}
        </form>
    );
};

export default CheckOutForm;
