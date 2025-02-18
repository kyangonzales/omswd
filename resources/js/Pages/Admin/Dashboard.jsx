import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
export default function Dashboard() {
    

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                   Welcome Admin
                </h2>
            }
        >
            <Head title="Dashboard" />

         
        </AuthenticatedLayout>
    );
}
