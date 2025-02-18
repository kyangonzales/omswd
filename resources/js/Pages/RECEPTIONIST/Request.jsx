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
import { ChevronLeft, Trash2 } from "lucide-react";
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

export default function Request() {
    const [inquiryList, setInquiryList] = useState([]);
    const [content, setContent] = useState("main");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("inquireList");
                setInquiryList(res.payload);
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
        } catch (error) {
            console.log(error);
        }
    };

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
				<Table className="border">
					{inquiryList.length === 0 ?  <TableCaption>No record.</TableCaption>: <></>}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inquiryList.map((items, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    INV001
                                </TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right">
                                    $250.00
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
}
