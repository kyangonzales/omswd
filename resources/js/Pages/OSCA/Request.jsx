import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Eye, Trash2 } from "lucide-react";
import axios from "axios";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { formatDateTime, formatWord } from "@/lib/utils";
import PrintableForm from "@/Components/PrintableForm";


export default function Request() {
    const [inquiryList, setInquiryList] = useState([]);
    const [content, setContent] = useState("main");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/oscaList");
                console.log("res", res.data.payload);

                
                setInquiryList(res.data.payload);
            } catch (error) {}
        };
        fetchData();
    }, []);

    const [viewData, setViewData] = useState();
    const handleView = (data)=>{
        console.log(data)
        setViewData(data);
        setContent("view");

    }
    if (content === "main") {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        GENERAL INTAKE
                    </h2>
                }
            >
                <Head title="Request" />
				<h1 className="p-3 font-bold text-2xl pt-10">Inquiries</h1>
				<div className="w-full flex justify-between p-3">
					<Input placeholder="Search..." className="w-2/6"/>
				</div>
              
				<div className="w-full pl-3 pr-3">
                    <Table className="border w-full">
                        {inquiryList.length === 0 && (
                            <TableCaption className="text-gray-500">No records found.</TableCaption>
                        )}
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="text-center">No.</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Unit Concern</TableHead>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Contact Number</TableHead>
                                <TableHead className='text-center'>Address</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inquiryList.slice().reverse().map((item, index) => (
                                <TableRow key={index} className="hover:bg-gray-50">
                                    <TableCell className="text-center">
                                        {index + 1} {/* Normal numbering (1, 2, 3, ...) */}
                                    </TableCell>
                                    <TableCell className="w-[10%] text-center">{formatDateTime(item.created_at)}</TableCell>
                                    <TableCell className="font-medium w-[400px]">
                                        {item.unit_concern}
                                    </TableCell>
                                    <TableCell className="w-[15%]">{formatWord(item.fullname)}</TableCell>
                                    <TableCell className="w-[200px]">{item.contact_number}</TableCell>
                                    <TableCell className="text-center">{formatWord(item.address)}</TableCell>
                                    <TableCell className="text-center">
                                        <button onClick={()=>handleView(item)} className="p-1 rounded-md hover:bg-gray-200">
                                            <Eye className="w-5 h-5 text-blue-600" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>


                    </Table>

                </div>

            </AuthenticatedLayout>
        );
    }

    if (content === "request") {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        GENERAL INTAKE
                    </h2>
                }
            >
                <Head title="Request" />
				<Button onClick={()=>setContent('main')}><ChevronLeft /></Button>

            </AuthenticatedLayout>
        );
    }


    if(content=="view"){
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                       Printable Form
                    </h2>
                }
            >
                <Head title="Request" />
				<Button onClick={()=>setContent('main')}><ChevronLeft /></Button>
                <PrintableForm viewData={viewData}/>
            </AuthenticatedLayout>
        );
    }
}
