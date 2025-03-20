import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { BookmarkCheck, ChartArea, Loader2, MessageCircle, Settings, User } from "lucide-react";
import { useState } from "react";


export default function Dashboard({ auth,total_users,unread_messages, pending_inquiry,completed_inquiry }) {
    const quicklinks = [
        { label: "Users", url: "#", description: "Current list of users...", icon: User , count: total_users, link: '/messages'},
        { label: "Messages", url: "#", description: "total of unread messages...", icon: MessageCircle,count: unread_messages,link: '/manage-user'},
        { label: "Pending Request", url: "#", description: "Current list of pending requests...", icon: Loader2, count: pending_inquiry,link: '/request'},
        { label: "Completed Request", url: "#", description: "Count of request completed...", icon: BookmarkCheck, count: completed_inquiry,link: '/messages'},
        { label: "Analytics", url: "#", description: "sample", icon: ChartArea, count: 121,link: '/analytics'},
        { label: "Settings", url: "#", description: "sample", icon: Settings, count: 121,link: '/settings'},
    ];
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Welcome Admin
                </h2>
            }
        >
            <Head title="Dashboard" />
            <h1 className="pl-6 pt-6 pb-2 font-bold text-xl">
                Welcome {auth?.user?.name}
            </h1>
            <div className="w-full grid grid-cols-4 gap-2 pl-6 pr-6">
                {quicklinks.map((items, index) => (
                    <div
                        key={index}
                        className="w-full border hover:scale-95 p-4 shadow-sm h-32 hover:shadow-lg transition-all"
                    >
                        <div className="w-full flex justify-between">
                        <h1 className="text-lg font-medium">{items.label}</h1>
                   
                        <items.icon/>
                        </div>
                        {items.label == "Analytics" || items.label == "Settings" ? <></> :   <b className="text-4xl text-sky-800 font-bold">{items.count}</b>}
                      
                        <p className="text-xs">{items.description}</p>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
