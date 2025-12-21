import React, { FC, useEffect, useState } from "react";
import { useGetUserOrdersQuery } from "@/redux/features/orders/ordersApi";
import { format } from "timeago.js";
import { styles } from "@/app/styles/styles";
import Loader from "../Loader/Loader";

type Props = {};

const PurchaseHistory: FC<Props> = (props) => {
    const { data, isLoading } = useGetUserOrdersQuery({});
    const [orders, setOrders] = useState<any>([]);

    useEffect(() => {
        if (data) {
            setOrders(data.orders);
        }
    }, [data]);

    return (
        <div className="w-full pl-7 800px:px-10 800px:pl-8 mt-[80px]">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full">
                    <h1 className={`${styles.title} !text-start mb-5`}>
                        Purchase History
                    </h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-slate-900 border dark:border-[#ffffff1d] border-[#00000014] rounded-lg overflow-hidden">
                            <thead className="bg-[#f5f5f5] dark:bg-slate-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Course Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Transaction ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-[#ffffff1d]">
                                {orders &&
                                    orders.map((item: any, index: number) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {item.courseId?.name || "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                ${item.courseId?.price || 0}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {item.payment_info?.id?.slice(0, 10)}...
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {format(item.createdAt)}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {orders?.length === 0 && (
                            <p className="text-center py-5 dark:text-white text-black">You haven't purchased any courses yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseHistory;
