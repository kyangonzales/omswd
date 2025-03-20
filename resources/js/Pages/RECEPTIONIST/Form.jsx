import React, { useState } from "react";
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
import { PlusCircle, Trash2 } from "lucide-react";
import { currentDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import InputLabel from "@/Components/InputLabel";
import Checkbox from "@/Components/Checkbox";
export default function Form({
    formData,
    setFormData,
    setContent,
    setEdit,
    resetForm,
    inquiryList,
    setInquiryList,
    setViewData,
}) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState(""); // State to store missing fields
    const handleSelectChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckBoxChange = (value) => {
        setFormData({ ...formData, is_patient: value });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.toUpperCase(),
        }));
    };

    const handleFamilyChange = (index, e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const updatedFamilyMembers = [...prevData.family_members];
            updatedFamilyMembers[index] = {
                ...updatedFamilyMembers[index],
                [name]: value.toUpperCase(),
            };
            return { ...prevData, family_members: updatedFamilyMembers };
        });
    };

    const handleFamilyMemberChange = (index, value) => {
        setFormData((prevData) => {
            const updatedFamilyMembers = [...prevData.family_members];
            updatedFamilyMembers[index] = {
                ...updatedFamilyMembers[index],
                is_patient: value,
            };
            return { ...prevData, family_members: updatedFamilyMembers };
        });
    };

    const handleAddFamilyMember = () => {
        setFormData((prevData) => ({
            ...prevData,
            family_members: [
                ...prevData.family_members,
                {
                    id: null,
                    fullname: "",
                    is_patient: null,
                    relation_to_client: "",
                    birthdate: "",
                    sex: "",
                    civil_status: "",
                    educ_attain: "",
                    occupation: "",
                    income: "",
                },
            ],
        }));
    };

    const handleDeleteFamilyMember = (index) => {
        setFormData((prevData) => {
            const deletedMember = prevData.family_members[index];

            return {
                ...prevData,
                family_members: prevData.family_members.filter(
                    (_, i) => i !== index
                ),
                deleted_family_members: deletedMember.id
                    ? [
                          ...(prevData.deleted_family_members || []),
                          deletedMember,
                      ] // Ensure it's an array
                    : prevData.deleted_family_members || [],
            };
        });
    };

    const validateForm = (data) => {
        let missingFields = [];

        // Required fields for the main form
        const requiredFields = [
            { key: "fullname", label: "Full Name" },
            { key: "birthdate", label: "Birthdate" },
            { key: "contact_number", label: "Contact Number" },
            { key: "sex", label: "Sex" },
            { key: "purok", label: "Purok" },
            { key: "barangay", label: "Barangay" },
            { key: "civil_status", label: "Civil Status" },
        ];

        // Check missing fields in the main form
        requiredFields.forEach(({ key, label }) => {
            if (!data[key]) {
                missingFields.push(label);
            }
        });

        // Validate family members
        data.family_members.forEach((member, index) => {
            const familyRequiredFields = [
                {
                    key: "fullname",
                    label: `Family Member ${index + 1}: Full Name`,
                },
                {
                    key: "birthdate",
                    label: `Family Member ${index + 1}: Birthdate`,
                },
                { key: "sex", label: `Family Member ${index + 1}: Sex` },
                {
                    key: "civil_status",
                    label: `Family Member ${index + 1}: Civil Status`,
                },
                {
                    key: "relation_to_client",
                    label: `Family Member ${index + 1}: Relationship`,
                },
            ];

            // Check if at least one field is filled in the family member
            const hasData = familyRequiredFields.some(({ key }) => member[key]);

            if (hasData) {
                // If at least one field is filled, check for missing required fields
                familyRequiredFields.forEach(({ key, label }) => {
                    if (!member[key]) {
                        missingFields.push(label);
                    }
                });
            }
        });

        return missingFields;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const missingFields = validateForm(formData);
        if (missingFields.length > 0) {
            setText(
                `Please fill in the following fields: \n${missingFields.join(
                    ", \n"
                )}`
            ); // Update state with missing fields
            return;
        }

        try {
            setLoading(true);
            if (formData.id == null) {
                const res = await axios.post("/inquire", formData);
                setInquiryList((prevList) => [...prevList, res.data.payload]);
                toast({
                    variant: "success",
                    title: "Request Sent",
                    description: "Your request has been sent successfully.",
                });
                resetForm();
                setContent("main");
            } else {
                const res = await axios.post(
                    `/updateInquire/${formData?.id}`,
                    formData
                );
                setViewData(res.data.inquiry);
                setInquiryList((prevList) =>
                    prevList.map((item) =>
                        item.id === formData.id ? res.data.inquiry : item
                    )
                );
                toast({
                    variant: "success",
                    title: "Successfully Edited",
                    description: "Details has been edited successfully.",
                });
                setEdit(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setText("");
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full  shadow-lg bg-white mx-auto mt-3">
            <div className="flex items-center justify-center pl-10 pt-10 pr-10">
                <img
                    src="/storage/mswd.png"
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
                    src="/storage/tinio.png"
                    alt="Logo"
                    className="w-20 h-20 ml-2 mb-10"
                />
            </div>

            <div className="w-full flex justify-center">
                <b className="text-xl text-red-700 text-justify">New Request</b>{" "}
                <br />
            </div>
            <div className="w-full text-xs text-justify px-5">
                Please fill up completely and correctly the required information
                before each item below. For items that are not associated to
                you, leave it blank. Required items are also marked with an
                asterisk (*) so please fill it up correctly. older persons.
            </div>
            <b className=" "></b>
            <div className="w-full text-xs text-red-700 px-5 italic mt-3 mb-3 font-medium">
                * Items with an asterisk (*) are required.
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between mb-4 pl-5 pr-5">
                    <div className="w-1/3">
                        <Label
                            htmlFor="unit_concern"
                            className="font-bold text-sm"
                        >
                            Unit concern
                        </Label>
                        <Select
                            name="unit_concern"
                            value={formData.unit_concern}
                            className="text-xs"
                            onValueChange={(value) =>
                                handleSelectChange("unit_concern", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Office" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Case Study Report">
                                    Case Study Report
                                </SelectItem>
                                <SelectItem value="Aid to Individual in Crisis (AICS)">
                                    Aid to Individual in Crisis (AICS)
                                </SelectItem>
                                <SelectItem value="Special Cases">
                                    Special Cases
                                </SelectItem>
                                <SelectItem value="Person with Disability (PWD)">
                                    Person with Disability (PWD)
                                </SelectItem>
                                <SelectItem value="Solo Parent">
                                    Solo Parent
                                </SelectItem>
                                <SelectItem value="Local Youth Development Office (LYDO)">
                                    Local Youth Development Office (LYDO)
                                </SelectItem>
                                <SelectItem value="Senior Citizen's Affairs (OSCA)">
                                    Senior Citizen's Affairs (OSCA)
                                </SelectItem>
                                <SelectItem value="Referral (Indigency, Ambulance, Philhealth, LCR, PAO)">
                                    Referral (Indigency, Ambulance, Philhealth,
                                    LCR, PAO)
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="w-full">
                            {formData.unit_concern ==
                            "Aid to Individual in Crisis (AICS)" ? (
                                <div className="">
                                    <InputLabel>
                                        Assistance{" "}
                                        <small className="text-red-600 font-extrabold text-lg">
                                            *
                                        </small>
                                        <Select
                                            name="problem_presented"
                                            value={formData.problem_presented}
                                            className="text-xs"
                                            onValueChange={(value) =>
                                                handleSelectChange(
                                                    "problem_presented",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Assistance" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Burial Assistance">
                                                    Burial Assistance
                                                </SelectItem>
                                                <SelectItem value="Medical Assiatnce">
                                                    Medical Assiatnce
                                                </SelectItem>
                                                <SelectItem value="Balik Probinsya">
                                                    Balik Probinsya
                                                </SelectItem>
                                                <SelectItem value="Special Case Assistance">
                                                    Special Case Assistance
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </InputLabel>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="w-1/2 text-right font-bold text-lg">
                        <Label>Date:</Label>{" "}
                        <span className="border-b border-black text-xs">
                            {currentDate}
                        </span>
                    </div>
                </div>
                <p className="text-md text-white font-bold mt-2 px-4 bg-sky-800 p-2 ">
                    I. CLIENTELE IDENTIFYING INFORMATION
                </p>
                <div className="flex space-x-4 pl-5 pr-5">
                    <div className="w-1/2 mt-1 mb-5">
                        <Label htmlFor="fullname" className="text-sm">
                            Full Name{" "}
                            <small className="text-red-600 text-base">*</small>
                        </Label>
                        <Input
                            id="fullname"
                            name="fullname"
                            type="text"
                            className="text-sm"
                            value={formData.fullname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-1/4 mt-1">
                        <Label htmlFor="birthdate" className="text-sm">
                            Birthdate{" "}
                            <small className="text-red-600 text-base">*</small>
                        </Label>
                        <Input
                            id="birthdate"
                            name="birthdate"
                            type="date"
                            value={formData.birthdate}
                            onChange={handleChange}
                            placeholder="Enter Birthday"
                        />
                    </div>
                    <div className="w-1/4 mt-1">
                        <Label htmlFor="num" className="text-sm">
                            Contact #{" "}
                            <small className="text-red-600 text-base">*</small>
                        </Label>
                        <Input
                            id="num"
                            name="contact_number"
                            type="number"
                            value={formData.contact_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-1/4 mt-1">
                        <Label htmlFor="sex" className="">
                            Sex{" "}
                            <small className="text-red-600 text-base">*</small>
                        </Label>
                        <Select
                            name="sex"
                            value={formData.sex}
                            onValueChange={(value) =>
                                handleSelectChange("sex", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex space-x-4 pl-5 pr-5 ">
                    <div className="w-1/3 mb-5">
                        <Label htmlFor="house-number" className="">
                            House #
                        </Label>
                        <Input
                            id="house-number"
                            name="house_number"
                            type="text"
                            value={formData.house_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-1/3">
                        <Label htmlFor="purok" className="">
                            Purok{" "}
                            <small className="text-red-600 text-base">*</small>
                        </Label>
                        <Input
                            id="purok"
                            name="purok"
                            type="text"
                            value={formData.purok}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-1/3">
                        <Label htmlFor="barangay" className="">
                            Barangay{" "}
                            <small className="text-red-600 text-base">*</small>
                        </Label>
                        <Select
                            name="barangay"
                            value={formData.barangay}
                            onValueChange={(value) =>
                                handleSelectChange("barangay", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="" />
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
                                <SelectItem value="Palale">Palale</SelectItem>
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
                        <Label htmlFor={``} className="">
                            Civil Status{" "}
                            <small className="text-red-600 text-base">*</small>
                        </Label>
                        <Select
                            name="civil_status"
                            value={formData.civil_status}
                            onValueChange={(value) =>
                                handleSelectChange("civil_status", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Single">Single</SelectItem>
                                <SelectItem value="Married">Married</SelectItem>
                                <SelectItem value="Widowed">Widowed</SelectItem>
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

                <div className="flex space-x-4 pl-5 pr-5">
                    <div className="w-1/3 mt-1">
                        <Label htmlFor="educ_attain" className="">
                            Educational Attainment{" "}
                        </Label>
                        <Select
                            name="educ_attain"
                            value={formData.educ_attain}
                            onValueChange={(value) =>
                                handleSelectChange("educ_attain", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Not Attended School">
                                    Not Attended School
                                </SelectItem>
                                <SelectItem value="Elementary Level">
                                    Elementary Level
                                </SelectItem>
                                <SelectItem value="Elementary Graduate">
                                    Elementary Graduate
                                </SelectItem>
                                <SelectItem value="High School Level">
                                    High School Level
                                </SelectItem>
                                <SelectItem value="High School Graduate">
                                    High School Graduate
                                </SelectItem>
                                <SelectItem value="Vocational">
                                    Vocational
                                </SelectItem>
                                <SelectItem value="College Level">
                                    College Level
                                </SelectItem>
                                <SelectItem value="College Graduate">
                                    College Graduate
                                </SelectItem>
                                <SelectItem value="Post Graduate">
                                    Post Graduate
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-1/4 mt-1">
                        <Label htmlFor="religion" className="">
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
                                <SelectValue placeholder="" />
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
                                <SelectItem value="Baptist">Baptist</SelectItem>
                                <SelectItem value="Seventh-day Adventist">
                                    Seventh-day Adventist
                                </SelectItem>
                                <SelectItem value="Iemelif">Iemelif</SelectItem>
                                <SelectItem value="Methodist">
                                    Methodist
                                </SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-1/4 mt-1">
                        <Label htmlFor="occupation" className="">
                            Occupation
                        </Label>
                        <Input
                            id="occupation"
                            name="occupation"
                            type="text"
                            value={formData.occupation}
                            onChange={handleChange}
                        />
                    </div>
                    {formData.occupation != "" ? (
                        <div className="w-1/3 mt-1">
                            <Label htmlFor="income" className="">
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
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Below 3,000">
                                        Below 3,000
                                    </SelectItem>
                                    <SelectItem value="3,000 - 5,000">
                                        3,000 - 5,000
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
                    ) : (
                        <></>
                    )}
                </div>
                {formData.unit_concern ==
                "Aid to Individual in Crisis (AICS)" ? (
                    <div className="px-5 text-black">
                        <InputLabel>Is Patient</InputLabel>
                        <div className="flex mt-2 gap-x-2">
                            <Label>
                                Yes{" "}
                                <Checkbox
                                    checked={formData.is_patient === true}
                                    onChange={() => handleCheckBoxChange(true)}
                                />
                            </Label>
                            <Label>
                                No{" "}
                                <Checkbox
                                    checked={formData.is_patient === false}
                                    onChange={() => handleCheckBoxChange(false)}
                                />
                            </Label>
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                <div>
                    <div className="text-base text-white font-bold px-4 mt-2 bg-sky-800 p-2">
                        II. FAMILY COMPOSITION
                    </div>
                    {formData.family_members.map((member, index) => (
                        <div key={index} className="flex space-x-4 text-lg">
                            <div className="w-full  p-4  border-gray-300 rounded-md">
                                {formData.unit_concern ==
                                "Aid to Individual in Crisis (AICS)" ? (
                                    <div className="pt-3">
                                        <Label>
                                            Is Family Member {index + 1} a
                                            Patient?
                                        </Label>

                                        <div className="flex mt-2 gap-x-2">
                                            <Label>
                                                Yes{" "}
                                                <Checkbox
                                                    checked={
                                                        member.is_patient ===
                                                        true
                                                    }
                                                    onChange={() =>
                                                        handleFamilyMemberChange(
                                                            index,
                                                            true
                                                        )
                                                    }
                                                />
                                            </Label>
                                            <Label>
                                                No{" "}
                                                <Checkbox
                                                    checked={
                                                        member.is_patient ===
                                                        false
                                                    }
                                                    onChange={() =>
                                                        handleFamilyMemberChange(
                                                            index,
                                                            false
                                                        )
                                                    }
                                                />
                                            </Label>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div className="flex justify-between items-center">
                                    <div></div>
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
                                    <div className="w-1/4 mt-1 mb-5">
                                        <Label
                                            htmlFor={`family-name-${index}`}
                                            className=""
                                        >
                                            Name{" "}
                                            <small className="text-red-600 text-base">
                                                *
                                            </small>
                                        </Label>
                                        <Input
                                            id={`family-name-${index}`}
                                            name="fullname"
                                            type="text"
                                            value={member?.fullname}
                                            onChange={(e) =>
                                                handleFamilyChange(index, e)
                                            }
                                        />
                                    </div>

                                    <div className="w-1/4 mt-1">
                                        <Label
                                            htmlFor={`family-age-${index}`}
                                            className=""
                                        >
                                            Birthdate{" "}
                                            <small className="text-red-600 text-base">
                                                *
                                            </small>
                                        </Label>
                                        <Input
                                            id={`family-birthdate-${index}`}
                                            name="birthdate"
                                            type="date"
                                            value={member?.birthdate}
                                            onChange={(e) =>
                                                handleFamilyChange(index, e)
                                            }
                                            placeholder="Enter birthday"
                                        />
                                    </div>

                                    <div className="w-1/4 mt-1">
                                        <Label
                                            htmlFor={`family-sex-${index}`}
                                            className=""
                                        >
                                            Sex{" "}
                                            <small className="text-red-600 text-base">
                                                *
                                            </small>
                                        </Label>
                                        <Select
                                            name="sex"
                                            value={member?.sex}
                                            onValueChange={(value) => {
                                                // Update the specific family member's sex
                                                const updatedFamilyMembers = [
                                                    ...formData.family_members,
                                                ];
                                                updatedFamilyMembers[index] = {
                                                    ...updatedFamilyMembers[
                                                        index
                                                    ],
                                                    sex: value,
                                                };
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    family_members:
                                                        updatedFamilyMembers,
                                                }));
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
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
                                            className=""
                                        >
                                            Civil Status{" "}
                                            <small className="text-red-600 text-base">
                                                *
                                            </small>
                                        </Label>
                                        <Select
                                            name="civil_status"
                                            value={member?.civil_status}
                                            onValueChange={(value) => {
                                                const updatedFamilyMembers = [
                                                    ...formData.family_members,
                                                ];
                                                updatedFamilyMembers[index] = {
                                                    ...updatedFamilyMembers[
                                                        index
                                                    ],
                                                    civil_status: value,
                                                };
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    family_members:
                                                        updatedFamilyMembers,
                                                }));
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
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
                                        >
                                            Relationship{" "}
                                            <small className="text-red-600 text-base">
                                                *
                                            </small>
                                        </Label>
                                        <Select
                                            name="relation_to_client"
                                            value={member?.relation_to_client}
                                            onValueChange={(value) => {
                                                const updatedFamilyMembers = [
                                                    ...formData.family_members,
                                                ];
                                                updatedFamilyMembers[index] = {
                                                    ...updatedFamilyMembers[
                                                        index
                                                    ],
                                                    relation_to_client: value,
                                                };
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    family_members:
                                                        updatedFamilyMembers,
                                                }));
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
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
                                        >
                                            Educational Attainment{" "}
                                        </Label>
                                        <Select
                                            name="educ_attain"
                                            value={member?.educ_attain}
                                            onValueChange={(value) => {
                                                const updatedFamilyMembers = [
                                                    ...formData.family_members,
                                                ];
                                                updatedFamilyMembers[index] = {
                                                    ...updatedFamilyMembers[
                                                        index
                                                    ],
                                                    educ_attain: value,
                                                };
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    family_members:
                                                        updatedFamilyMembers,
                                                }));
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Not Attended School">
                                                    Not Attended School
                                                </SelectItem>
                                                <SelectItem value="Elementary Level">
                                                    Elementary Level
                                                </SelectItem>
                                                <SelectItem value="Elementary Graduate">
                                                    Elementary Graduate
                                                </SelectItem>
                                                <SelectItem value="High School Level">
                                                    High School Level
                                                </SelectItem>
                                                <SelectItem value="High School Graduate">
                                                    High School Graduate
                                                </SelectItem>
                                                <SelectItem value="Vocational">
                                                    Vocational
                                                </SelectItem>
                                                <SelectItem value="College Level">
                                                    College Level
                                                </SelectItem>
                                                <SelectItem value="College Graduate">
                                                    College Graduate
                                                </SelectItem>
                                                <SelectItem value="Post Graduate">
                                                    Post Graduate
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="w-1/4 mt-1">
                                        <Label
                                            htmlFor={`family-occupation-${index}`}
                                            className=""
                                        >
                                            Occupation
                                        </Label>
                                        <Input
                                            id={`family-occupation-${index}`}
                                            name="occupation"
                                            type="text"
                                            value={member?.occupation}
                                            onChange={(e) =>
                                                handleFamilyChange(index, e)
                                            }
                                        />
                                    </div>

                                    <div className="w-1/4 mt-1">
                                        <Label htmlFor={`income-${index}`}>
                                            Income Range (Monthly)
                                        </Label>
                                        <Select
                                            name="income"
                                            value={member.income}
                                            onValueChange={(value) => {
                                                const updatedFamilyMembers = [
                                                    ...formData.family_members,
                                                ];
                                                updatedFamilyMembers[index] = {
                                                    ...updatedFamilyMembers[
                                                        index
                                                    ],
                                                    income: value,
                                                };
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    family_members:
                                                        updatedFamilyMembers,
                                                }));
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Below 3,000">
                                                    Below 3,000
                                                </SelectItem>
                                                <SelectItem value="3,000 - 5,000">
                                                    3,000 - 5,000
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
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="w-full px-4 flex justify-end">
                        <Button
                            type="button"
                            onClick={handleAddFamilyMember}
                            className="mt-4 bg-sky-800 hover:bg-sky-950"
                        >
                            <PlusCircle />
                        </Button>
                    </div>
                </div>
                <p className="font-bold mt-2 bg-sky-900 text-white text-base px-5 p-2 mb-5">
                    III. Remarks
                </p>
                <div className="pl-5 pr-5">
                    <Label>
                        <small className="text-red-600 text-base">*</small>
                        <textarea
                            id="remarks"
                            name="remarks"
                            rows="4"
                            className="w-full border-zinc-300 bg-zinc-50 rounded-md p-2"
                            value={formData.remarks}
                            onChange={handleChange}
                            placeholder="Enter your message"
                        ></textarea>
                    </Label>
                </div>

                <div className="w-full flex gap-x-4 pl-4">
                    <Button
                        type="submit"
                        className={`px-8 ${
                            loading
                                ? "bg-sky-300 cursor-not-allowed"
                                : "bg-sky-800"
                        }`}
                        disabled={loading}
                    >
                        Submit
                    </Button>

                    <Button
                        onClick={() => setEdit(false)}
                        type="button"
                        className="text-sky-800 border-sky-400 px-8"
                        variant="outline"
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                </div>
                {loading ? (
                    <small className="pl-4 font-bold text-sky-700">
                        Creating request please wait...
                    </small>
                ) : (
                    <></>
                )}
                <div className="p-4">
                    {text ? (
                        <small className="font-bold text-red-700">{text}</small>
                    ) : (
                        <></>
                    )}
                </div>
            </form>
        </div>
    );
}
