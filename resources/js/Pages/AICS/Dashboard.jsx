import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { MessageCircle } from "lucide-react";
import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/Components/ui/button";

const quicklinks = [
    {
        label: "Inquiries",
        count: 1000,
        icon: MessageCircle,
        description: "Total Number of Inquiries",
    },
    {
        label: "Pending",
        count: 1000,
        icon: MessageCircle,
        description: "sample description",
    },
    {
        label: "Completed",
        count: 1000,
        icon: MessageCircle,
        description: "sample description",
    },
];

export default function Dashboard({ recentInquiries }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="w-full p-7 ">
                <h1 className="text-2xl font-bold text-zinc-800 mb-5">
                    <b className="text-sky-800">Hello</b> Aics Admin!
                </h1>
                <div className="w-full grid grid-cols-3 gap-2">
                    {quicklinks.map((items, index) => (
                        <div key={index} className="w-full h-[10rem] p-3 shadow-sm hover:shadow-lg border transition-all">
                            <h1 className="text-lg">{items.label}</h1>
                            <b className="text-3xl text-sky-800">
                                {items.count}
                            </b>
                            <p className="text-sm">{items.description}</p>
                        </div>
                    ))}
                </div>

                <div className="w-full mt-5">
                    <h1 className="text-xl font-bold text-sky-800">
                        Recent Inquiries
                    </h1>
                    <Table className="border shadow-lg">
                        <TableCaption>No recent record.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Unit Concern</TableHead>
                                <TableHead>Requested At</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentInquiries.map((items, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {items.fullname}
                                    </TableCell>
                                    <TableCell>{items.unit_concern}</TableCell>
                                    <TableCell>{formatDateTime(items.created_at)}</TableCell>
                                    <TableCell>
                                        <Button className="text-xs" variant="outline">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
