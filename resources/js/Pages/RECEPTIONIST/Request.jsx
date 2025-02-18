import { useState } from "react";
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
import { Trash2 } from "lucide-react";
import axios from "axios";

export default function Request() {
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

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    GENERAL INTAKE
                </h2>
            }
        >
            <Head title="Request" />

            <div className="w-full h-full p-10 border shadow-lg bg-white mx-auto mt-3">
                <div className="flex items-center justify-center mb-4">
                    <img
                        src="/storage/mswd.jpg"
                        alt="Logo"
                        className="w-20 h-20 mr-2 mb-10"
                    />
                    <div className="text-center">
                        <h2 className="text-xl font-bold">
                            MUNICIPAL SOCIAL WELFARE & DEVELOPMENT OFFICE
                        </h2>
                        <h2 className="text-xl font-bold">
                            GENERAL TINIO, NUEVA ECIJA
                        </h2>
                        <h2 className="text-xl font-bold">INTAKE SHEET</h2>
                    </div>
                    <img
                        src="/storage/gt-logo.jpg"
                        alt="Logo"
                        className="w-20 h-20 ml-2 mb-10"
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-between mb-4">
                        <div className="w-1/3">
                            <Label htmlFor="unitConcern" className="text-lg">
                                Unit concern
                            </Label>
                            <Select
                                name="unitConcern"
                                value={formData.unitConcern}
                                onValueChange={(value) =>
                                    handleSelectChange("unitConcern", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Office" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="case_study">
                                        Case Study Report
                                    </SelectItem>
                                    <SelectItem value="aics">
                                        Aid to Individual in Crisis (AICS)
                                    </SelectItem>
                                    <SelectItem value="special_cases">
                                        Special Cases
                                    </SelectItem>
                                    <SelectItem value="pwd">
                                        Person with Disability (PWD)
                                    </SelectItem>
                                    <SelectItem value="solo_parent">
                                        Solo Parent
                                    </SelectItem>
                                    <SelectItem value="lydo">
                                        Local Youth Development Office (LYDO)
                                    </SelectItem>
                                    <SelectItem value="osca">
                                        Senior Citizen's Affairs (OSCA)
                                    </SelectItem>
                                    <SelectItem value="referral">
                                        Referral (Indigency, Ambulance,
                                        Philhealth, LCR, PAO)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-1/2 text-right font-bold text-lg">
                            <Label>Date:</Label>{" "}
                            <span className="border-b border-black text-xs">
                                {currentDate}
                            </span>
                        </div>
                    </div>
                    <p className="text-sm font-bold mt-2 bg-zinc-200 p-2 ">
                        I. CLIENTELE IDENTIFYING INFORMATION
                    </p>
                    <div className="flex space-x-4 text-lg">
                        <div className="w-1/2 mt-1">
                            <Label htmlFor="name" className="text-lg">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                            />
                        </div>
                        <div className="w-1/4 mt-1">
                            <Label htmlFor="bday" className="text-lg">
                                Birthdate
                            </Label>
                            <Input
                                id="bday"
                                name="bday"
                                type="date"
                                value={formData.bday}
                                onChange={handleChange}
                                placeholder="Enter Birthday"
                            />
                        </div>
                        <div className="w-1/4 mt-1">
                            <Label htmlFor="num" className="text-lg">
                                Contact Number
                            </Label>
                            <Input
                                id="num"
                                name="contactNumber"
                                type="number"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="Enter Contact Number"
                            />
                        </div>
                        <div className="w-1/4 mt-1">
                            <Label htmlFor="sex" className="text-lg">
                                Sex
                            </Label>
                            <Select
                                name="sex"
                                value={formData.sex}
                                onValueChange={(value) =>
                                    handleSelectChange("sex", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Sex" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">
                                        Female
                                    </SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-1/3">
                            <Label htmlFor="house-number" className="text-lg">
                                House Number
                            </Label>
                            <Input
                                id="house-number"
                                name="houseNumber"
                                type="text"
                                value={formData.houseNumber}
                                onChange={handleChange}
                                placeholder="Enter House Number"
                            />
                        </div>
                        <div className="w-1/3">
                            <Label htmlFor="purok" className="text-lg">
                                Purok
                            </Label>
                            <Input
                                id="purok"
                                name="purok"
                                type="text"
                                value={formData.purok}
                                onChange={handleChange}
                                placeholder="Enter Purok"
                            />
                        </div>
                        <div className="w-1/3">
                            <Label htmlFor="barangay" className="text-lg">
                                Barangay
                            </Label>
                            <Select
                                name="barangay"
                                value={formData.barangay}
                                onValueChange={(value) =>
                                    handleSelectChange("barangay", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Barangay" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Padolina">
                                        Padolina
                                    </SelectItem>
                                    <SelectItem value="Poblacion East">
                                        Poblacion East
                                    </SelectItem>
                                    <SelectItem value="Poblacion Central">
                                        Poblacion Central
                                    </SelectItem>
                                    <SelectItem value="Poblacion West">
                                        Poblacion West
                                    </SelectItem>
                                    <SelectItem value="Pulong Matong">
                                        Pulong Matong
                                    </SelectItem>
                                    <SelectItem value="San Pedro">
                                        San Pedro
                                    </SelectItem>
                                    <SelectItem value="Sampaguita">
                                        Sampaguita
                                    </SelectItem>
                                    <SelectItem value="Pias">Pias</SelectItem>
                                    <SelectItem value="Rio Chico">
                                        Rio Chico
                                    </SelectItem>
                                    <SelectItem value="Bago">Bago</SelectItem>
                                    <SelectItem value="Palale">
                                        Palale
                                    </SelectItem>
                                    <SelectItem value="Nazareth">
                                        Nazareth
                                    </SelectItem>
                                    <SelectItem value="Concepcion">
                                        Concepcion
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-1/4 ">
                            <Label htmlFor={``} className="text-lg">
                                Civil Status
                            </Label>
                            <Select
                                name="civilStatus"
                                value={formData.civilStatus}
                                onValueChange={(value) =>
                                    handleSelectChange("civilStatus", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Civil Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Single">
                                        Single
                                    </SelectItem>
                                    <SelectItem value="Married">
                                        Married
                                    </SelectItem>
                                    <SelectItem value="Widowed">
                                        Widowed
                                    </SelectItem>
                                    <SelectItem value="Divorced">
                                        Divorced
                                    </SelectItem>
                                    <SelectItem value="Separated">
                                        Separated
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex space-x-4 text-lg">
                        <div className="w-1/3 mt-1">
                            <Label htmlFor="education" className="text-lg">
                                Educational Attainment
                            </Label>
                            <Select
                                name="education"
                                value={formData.education}
                                onValueChange={(value) =>
                                    handleSelectChange("education", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Educational Attainment" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="No Formal Education">
                                        No Formal Education
                                    </SelectItem>
                                    <SelectItem value="Primary">
                                        Primary (Elementary)
                                    </SelectItem>
                                    <SelectItem value="High School">
                                        High School
                                    </SelectItem>
                                    <SelectItem value="Vocational">
                                        Vocational
                                    </SelectItem>
                                    <SelectItem value="College">
                                        College
                                    </SelectItem>
                                    <SelectItem value="Postgraduate">
                                        Postgraduate
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-1/3 mt-1">
                            <Label htmlFor="income" className="text-lg">
                                Income Range (Monthly)
                            </Label>

                            <Select
                                name="income"
                                value={formData.income}
                                onValueChange={(value) =>
                                    handleSelectChange("income", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Income Range (Monthly)" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Below 5,000">
                                        Below 5,000
                                    </SelectItem>
                                    <SelectItem value="5,000 - 10,000">
                                        5,000 - 10,000
                                    </SelectItem>
                                    <SelectItem value="10,001 - 15,000">
                                        10,001 - 15,000
                                    </SelectItem>
                                    <SelectItem value="15,001 - 20,000">
                                        15,001 - 20,000
                                    </SelectItem>
                                    <SelectItem value="20,001 - 30,000">
                                        20,001 - 30,000
                                    </SelectItem>
                                    <SelectItem value="30,001 - 40,000">
                                        30,001 - 40,000
                                    </SelectItem>
                                    <SelectItem value="Above 40,000">
                                        Above 40,000
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-1/4 mt-1">
                            <Label htmlFor="religion" className="text-lg">
                                Religion
                            </Label>
                            <Select
                                name="religion"
                                value={formData.religion}
                                onValueChange={(value) =>
                                    handleSelectChange("religion", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Religion" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Roman Catholic">
                                        Roman Catholic
                                    </SelectItem>
                                    <SelectItem value="Iglesia ni Cristo">
                                        Iglesia ni Cristo
                                    </SelectItem>
                                    <SelectItem value="Born Again">
                                        Born Again
                                    </SelectItem>
                                    <SelectItem value="Baptist">
                                        Baptist
                                    </SelectItem>
                                    <SelectItem value="Seventh-day Adventist">
                                        Seventh-day Adventist
                                    </SelectItem>
                                    <SelectItem value="Iemelif">
                                        Iemelif
                                    </SelectItem>
                                    <SelectItem value="Methodist">
                                        Methodist
                                    </SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-1/4 mt-1">
                            <Label htmlFor="occupation" className="text-lg">
                                Occupation
                            </Label>
                            <Input
                                id="occupation"
                                name="occupation"
                                type="text"
                                value={formData.occupation}
                                onChange={handleChange}
                                placeholder="Enter Occupation"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="text-sm font-bold mt-2 bg-zinc-200 p-2">
                            II. FAMILY COMPOSITION
                        </div>
                        {formData.familyMembers.map((member, index) => (
                            <div key={index} className="flex space-x-4 text-lg">
                                <div className="w-full mt-4 p-4 border border-gray-300 rounded-md">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold">
                                            Family Member {index + 1}
                                        </h3>
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteFamilyMember(index)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>

                                    <div className="flex space-x-4">
                                        <div className="w-1/4 mt-1">
                                            <Label
                                                htmlFor={`family-name-${index}`}
                                                className="text-lg"
                                            >
                                                Family Member Name
                                            </Label>
                                            <Input
                                                id={`family-name-${index}`}
                                                name="name"
                                                type="text"
                                                value={member.name}
                                                onChange={(e) =>
                                                    handleFamilyChange(index, e)
                                                }
                                                placeholder="Enter family member's name"
                                            />
                                        </div>

                                        <div className="w-1/4 mt-1">
                                            <Label
                                                htmlFor={`family-age-${index}`}
                                                className="text-lg"
                                            >
                                                Age
                                            </Label>
                                            <Input
                                                id={`family-birthdate-${index}`}
                                                name="birthdate"
                                                type="date"
                                                value={member.birthdate}
                                                onChange={(e) =>
                                                    handleFamilyChange(index, e)
                                                }
                                                placeholder="Enter birthday"
                                            />
                                        </div>

                                        <div className="w-1/4 mt-1">
                                            <Label
                                                htmlFor={`family-sex-${index}`}
                                                className="text-lg"
                                            >
                                                Sex
                                            </Label>
                                            <Select
                                                name="sex"
                                                value={member.sex}
                                                onValueChange={(value) => {
                                                    // Update the specific family member's sex
                                                    const updatedFamilyMembers =
                                                        [
                                                            ...formData.familyMembers,
                                                        ];
                                                    updatedFamilyMembers[
                                                        index
                                                    ] = {
                                                        ...updatedFamilyMembers[
                                                            index
                                                        ],
                                                        sex: value,
                                                    };
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        familyMembers:
                                                            updatedFamilyMembers,
                                                    }));
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Sex" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Male">
                                                        Male
                                                    </SelectItem>
                                                    <SelectItem value="Female">
                                                        Female
                                                    </SelectItem>
                                                    <SelectItem value="Other">
                                                        Other
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="w-1/4 mt-1">
                                            <Label
                                                htmlFor={`family-civil-status-${index}`}
                                                className="text-lg"
                                            >
                                                Civil Status
                                            </Label>
                                            <Select
                                                name="civilStatus"
                                                value={member.civilStatus}
                                                onValueChange={(value) => {
                                                    const updatedFamilyMembers =
                                                        [
                                                            ...formData.familyMembers,
                                                        ];
                                                    updatedFamilyMembers[
                                                        index
                                                    ] = {
                                                        ...updatedFamilyMembers[
                                                            index
                                                        ],
                                                        civilStatus: value,
                                                    };
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        familyMembers:
                                                            updatedFamilyMembers,
                                                    }));
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Civil Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Single">
                                                        Single
                                                    </SelectItem>
                                                    <SelectItem value="Married">
                                                        Married
                                                    </SelectItem>
                                                    <SelectItem value="Widowed">
                                                        Widowed
                                                    </SelectItem>
                                                    <SelectItem value="Divorced">
                                                        Divorced
                                                    </SelectItem>
                                                    <SelectItem value="Separated">
                                                        Separated
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="flex space-x-4">
                                        <div className="w-1/4 mt-1">
                                            <Label
                                                htmlFor={`family-relationship-${index}`}
                                                className="text-lg"
                                            >
                                                Relationship to Client
                                            </Label>
                                            <Select
                                                name="relationship"
                                                value={member.relationship}
                                                onValueChange={(value) => {
                                                    const updatedFamilyMembers =
                                                        [
                                                            ...formData.familyMembers,
                                                        ];
                                                    updatedFamilyMembers[
                                                        index
                                                    ] = {
                                                        ...updatedFamilyMembers[
                                                            index
                                                        ],
                                                        relationship: value,
                                                    };
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        familyMembers:
                                                            updatedFamilyMembers,
                                                    }));
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Relationship" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Child">
                                                        Child
                                                    </SelectItem>
                                                    <SelectItem value="Spouse">
                                                        Spouse
                                                    </SelectItem>
                                                    <SelectItem value="Parent">
                                                        Parent
                                                    </SelectItem>
                                                    <SelectItem value="Sibling">
                                                        Sibling
                                                    </SelectItem>
                                                    <SelectItem value="Nephew">
                                                        Nephew
                                                    </SelectItem>
                                                    <SelectItem value="Niece">
                                                        Niece
                                                    </SelectItem>
                                                    <SelectItem value="Grandfather">
                                                        Grandfather
                                                    </SelectItem>
                                                    <SelectItem value="Grandmother">
                                                        Grandmother
                                                    </SelectItem>
                                                    <SelectItem value="Uncle">
                                                        Uncle
                                                    </SelectItem>
                                                    <SelectItem value="Aunt">
                                                        Aunt
                                                    </SelectItem>
                                                    <SelectItem value="Cousin">
                                                        Cousin
                                                    </SelectItem>
                                                    <SelectItem value="Common Law Wife">
                                                        Common Law Wife
                                                    </SelectItem>
                                                    <SelectItem value="Common Law Husband">
                                                        Common Law Husband
                                                    </SelectItem>
                                                    <SelectItem value="Other">
                                                        Other
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="w-1/4 mt-1">
                                            <Label
                                                htmlFor={`family-education-${index}`}
                                                className="text-lg"
                                            >
                                                Educational Attainment
                                            </Label>
                                            <Select
                                                name="education"
                                                value={member.education}
												onValueChange={(value) => {
                                                    const updatedFamilyMembers =
                                                        [
                                                            ...formData.familyMembers,
                                                        ];
                                                    updatedFamilyMembers[
                                                        index
                                                    ] = {
                                                        ...updatedFamilyMembers[
                                                            index
                                                        ],
                                                        education: value,
                                                    };
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        familyMembers:
                                                            updatedFamilyMembers,
                                                    }));
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Educational Attainment" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="No Formal Education">
                                                        No Formal Education
                                                    </SelectItem>
                                                    <SelectItem value="Primary">
                                                        Primary (Elementary)
                                                    </SelectItem>
                                                    <SelectItem value="Undergraduate High School">
                                                        Undergraduate High
                                                        School
                                                    </SelectItem>
                                                    <SelectItem value="High School">
                                                        High School
                                                    </SelectItem>
                                                    <SelectItem value="Vocational">
                                                        Vocational
                                                    </SelectItem>
                                                    <SelectItem value="Undergraduate College">
                                                        Undergraduate College
                                                    </SelectItem>
                                                    <SelectItem value="College">
                                                        College
                                                    </SelectItem>
                                                    <SelectItem value="Postgraduate">
                                                        Postgraduate
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="w-1/4 mt-1">
                                            <Label
                                                htmlFor={`income-${index}`}
                                                className="text-lg"
                                            >
                                                Income Range (Monthly)
                                            </Label>
                                            <Select
                                                name="income"
                                                value={member.income}
                                                onValueChange={(value) => {
                                                    const updatedFamilyMembers =
                                                        [
                                                            ...formData.familyMembers,
                                                        ];
                                                    updatedFamilyMembers[
                                                        index
                                                    ] = {
                                                        ...updatedFamilyMembers[
                                                            index
                                                        ],
                                                        income: value,
                                                    };
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        familyMembers:
                                                            updatedFamilyMembers,
                                                    }));
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Income Range (Monthly)" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Below 5,000">
                                                        Below 5,000
                                                    </SelectItem>
                                                    <SelectItem value="5,000 - 10,000">
                                                        5,000 - 10,000
                                                    </SelectItem>
                                                    <SelectItem value="10,001 - 15,000">
                                                        10,001 - 15,000
                                                    </SelectItem>
                                                    <SelectItem value="15,001 - 20,000">
                                                        15,001 - 20,000
                                                    </SelectItem>
                                                    <SelectItem value="20,001 - 30,000">
                                                        20,001 - 30,000
                                                    </SelectItem>
                                                    <SelectItem value="30,001 - 40,000">
                                                        30,001 - 40,000
                                                    </SelectItem>
                                                    <SelectItem value="Above 40,000">
                                                        Above 40,000
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="w-1/4 mt-1">
                                            <Label
                                                htmlFor={`family-occupation-${index}`}
                                                className="text-lg"
                                            >
                                                Occupation
                                            </Label>
                                            <Input
                                                id={`family-occupation-${index}`}
                                                name="occupation"
                                                type="text"
                                                value={member.occupation}
                                                onChange={(e) =>
                                                    handleFamilyChange(index, e)
                                                }
                                                placeholder="Enter occupation"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={handleAddFamilyMember}
                            className="mt-4"
                        >
                            Add Family Member
                        </Button>
                    </div>
                    <div>
                        <p className="text-sm font-bold mt-2 bg-zinc-200 p-2 mb-3">
                            III. Remarks
                        </p>
                        <textarea
                            id="remarks"
                            name="remarks"
                            rows="4"
                            className="w-full border rounded-md p-2"
                            value={formData.remarks}
                            onChange={handleChange}
                            placeholder="Enter your message"
                        ></textarea>
                    </div>

                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
