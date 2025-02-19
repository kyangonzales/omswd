import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Eye, Trash2 } from "lucide-react";
import axios from "axios";
import Form from "./Form";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDateTime, formatWord } from "@/lib/utils";
import PrintableForm from "@/Components/PrintableForm";
export default function Request() {
    const [inquiryList, setInquiryList] = useState([]);
    const [content, setContent] = useState("main");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/inquireList");
                console.log(res);
                
                setInquiryList(res.data.payload);
            } catch (error) {}
        };
        fetchData();
    }, []);
    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const [formData, setFormData] = useState({
        unitConcern: "",
        name: "",
        bday: "",
        contactNumber: "",
        houseNumber: "",
        purok: "",
        barangay: "",
        education: "",
        sex: "",
        civilStatus: "",
        religion: "",
        occupation: "",
        income: "",
        remarks: "",
        familyMembers: [
            {
                name: "",
                relationship: "",
                birthdate: "",
                sex: "",
                civilStatus: "",
                education: "",
                occupation: "",
                income: "",
            },
        ],
    });

    const handleSelectChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleFamilyChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFamilyMembers = [...formData.familyMembers];
        updatedFamilyMembers[index] = {
            ...updatedFamilyMembers[index],
            [name]: value,
        };
        setFormData((prevData) => ({
            ...prevData,
            familyMembers: updatedFamilyMembers,
        }));
    };

    const handleAddFamilyMember = () => {
        setFormData((prevData) => ({
            ...prevData,
            familyMembers: [
                ...prevData.familyMembers,
                {
                    name: "",
                    relationship: "",
                    age: "",
                    sex: "",
                    civilStatus: "",
                    education: "",
                    occupation: "",
                    income: "",
                },
            ],
        }));
    };
    const handleDeleteFamilyMember = (index) => {
        const updatedFamilyMembers = formData.familyMembers.filter(
            (_, i) => i !== index
        );
        setFormData((prevData) => ({
            ...prevData,
            familyMembers: updatedFamilyMembers,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await axios.post("/inquire", formData);
            console.log(res)
            setContent("main")
        } catch (error) {
            console.log(error);
        }
    };
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
					<Button onClick={()=>setContent('request')}>Request</Button>
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
                <Form
                    handleSelectChange={handleSelectChange}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleAddFamilyMember={handleAddFamilyMember}
                    handleDeleteFamilyMember={handleDeleteFamilyMember}
                    handleFamilyChange={handleFamilyChange}
                    formData={formData}
                    setFormData={setFormData}
                    currentDate={currentDate}
                />
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
