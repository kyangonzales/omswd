import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { User } from "lucide-react";
import { useState } from "react";

const quicklinks = [
    {label: 'sample', url: '#', description: 'sample', icon: User},
    {label: 'sample', url: '#', description: 'sample', icon: User},
    {label: 'sample', url: '#', description: 'sample', icon: User},
    {label: 'sample', url: '#', description: 'sample', icon: User},
    {label: 'sample', url: '#', description: 'sample', icon: User},
    {label: 'sample', url: '#', description: 'sample', icon: User},
    {label: 'sample', url: '#', description: 'sample', icon: User},
    {label: 'sample', url: '#', description: 'sample', icon: User},
    {label: 'sample', url: '#', description: 'sample', icon: User},
    {label: 'sample', url: '#', description: 'sample', icon: User},
];
export default function Dashboard({auth}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Welcome Admin
                </h2>
            }
        >
            <Head title="Dashboard" />
            <h1 className="pl-6 pt-6 pb-2 font-bold text-xl">Welcome {auth?.user?.name}</h1>
            <div className="w-full grid grid-cols-4 gap-2 pl-6 pr-6">
               {quicklinks.map((items,index)=>(
                <div key={index} className="w-full border shadow-sm h-32 hover:shadow-lg hover:shadow-blue-50 transition-all">
                    {items.label}
                </div>
               ))} 
            </div>
        </AuthenticatedLayout>
    );
}
