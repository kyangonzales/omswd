import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CheckCheck, Printer } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
    formatDateTime,
    formatDob,
    formatLetter,
    formatWord,
    getAge,
} from "@/lib/utils";

export default function PrintableForm({ viewData }) {
    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handlePrint = () => {
        const printContent =
            document.querySelector(".printable-item").innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    };
    return (
        <div className="w-full h-full p-10 border shadow-lg bg-white mx-auto mt-3 printable-item">
            <div className="flex items-center justify-center mb-4 header-container">
                <img
                    src="/storage/mswd.png"
                    alt="Logo"
                    className="w-20 h-20 mr-2 mb-10 header-logo"
                />
                <div className="text-center print-header">
                    <h2 className="text-xl font-bold print-header">
                        MUNICIPAL SOCIAL WELFARE & DEVELOPMENT OFFICE
                    </h2>
                    <h2 className="text-xl font-bold print-header">
                        GENERAL TINIO, NUEVA ECIJA
                    </h2>
                    <h2 className="text-xl font-bold print-header">
                        INTAKE SHEET
                    </h2>
                </div>
                <img
                    src="/storage/tinio.png"
                    alt="Logo"
                    className="w-20 h-20 ml-2 mb-10 header-logo"
                />
            </div>

            <div className="flex justify-between mb-4 ">
                <div className="w-1/2">
                    <p className="font-bold">
                        Unit Concern:
                        <span
                            className="ms-2 underline font-normal relative"
                            style={{ textUnderlineOffset: "3px" }}
                        >
                            {viewData?.unit_concern}
                        </span>
                    </p>
                </div>
                <div className="w-1/2 text-right font-bold">
                    <label>Date:</label>{" "}
                    <span className="border-b border-black">{currentDate}</span>
                </div>
            </div>

            <div className="p-4">
                <p className="text-sm font-bold bg-gray-200 p-2 rounded header-bg">
                    I. IDENTIFYING INFORMATION
                </p>
                <table className="w-full mt-4 text-md">
                    <tbody>
                        <tr className="border-b">
                            <td className="font-bold w-1/3">Name of Client:</td>
                            <td className="border-b w-2/3 flex gap-x-5 items-center">
                                {formatLetter(viewData?.fullname)}{" "}
                                {viewData?.is_patient == 1 || viewData?.is_patient == true ? (
                                    <small className="flex items-center gap-x-2">
                                        /Patient{" "}
                                        <CheckCheck className="h-5 w-5 text-green-700" />
                                    </small>
                                ) : (
                                    <></>
                                )}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="font-bold">Age:</td>
                            <td className="border-b">
                                {getAge(viewData?.birthdate)}
                            </td>
                        </tr>
                        {viewData?.unit_concern ==
                        "Aid to Individual in Crisis (AICS)" ? (
                            <tr className="border-b">
                                <td className="font-bold">
                                    Problem Presented:
                                </td>
                                <td className="border-b">
                                    {formatLetter(viewData?.problem_presented)}
                                </td>
                            </tr>
                        ) : (
                            <></>
                        )}
                        <tr className="border-b">
                            <td className="font-bold">Address:</td>
                            <td className="border-b">
                                {formatLetter(viewData?.house_number)}{" "}
                                {formatLetter(viewData?.purok)}{" "}
                                {formatLetter(viewData?.barangay)}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="font-bold">Contact Number:</td>
                            <td className="border-b">
                                {viewData?.contact_number}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="font-bold">Birthdate:</td>
                            <td className="border-b">
                                {formatDob(viewData?.birthdate)}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="font-bold">Religion:</td>
                            <td className="border-b">
                                {formatLetter(viewData?.religion)}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="font-bold">Civil Status:</td>
                            <td className="border-b">
                                {formatLetter(viewData?.civil_status)}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="font-bold">
                                Educational Attainment:
                            </td>
                            <td className="border-b">
                                {formatLetter(viewData?.educ_attain)}
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="font-bold">Occupation:</td>
                            <td className="border-b">
                                {formatLetter(viewData?.occupation)}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold border-b">Income:</td>
                            <td className="border-b">
                                ₱ {formatLetter(viewData?.income)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="p-4">
                <p className="text-sm font-bold bg-zinc-200 p-2  header-bg">
                    II. FAMILY COMPOSITION
                </p>
                <table className="w-full border-collapse rounded-lg mt-3 text-xs">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-center border p-2 custom-table">#</th>
                            <th className="border p-2 text-xs custom-table">Name</th>
                            <th className="border p-2 custom-table">Age</th>
                            <th className="border p-2 custom-table">Sex</th>
                            <th className="border p-2 custom-table">Civil Status</th>
                            <th className="border p-2 custom-table">Relation to Client</th>
                            <th className="border p-2 custom-table">
                                Educational Attainment
                            </th>
                            <th className="border p-2 custom-table">Occupation</th>
                            <th className="border p-2 custom-table">Monthly Income</th>
                            <th className="border p-2 custom-table">Patient</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewData?.family_members?.map((member, index) => (
                            <tr key={index} className="border-b">
                                <td className="text-center font-medium custom-table border p-2">
                                    {index + 1}.
                                </td>
                                <td className="font-medium border p-2 custom-table">
                                    {formatLetter(member?.fullname)}
                                </td>
                                <td className="border p-2 custom-table">
                                    {getAge(member?.birthdate)}
                                </td>
                                <td className="border p-2 custom-table">
                                    {formatLetter(member?.sex)}
                                </td>
                                <td className="border p-2 custom-table">
                                    {formatLetter(member?.civil_status)}
                                </td>
                                <td className="border p-2 custom-table">
                                    {formatLetter(member?.relation_to_client)}
                                </td>
                                <td className="border p-2 custom-table">
                                    {formatLetter(member?.educ_attain)}
                                </td>
                                <td className="border p-2 custom-table">
                                    {formatLetter(member?.occupation)}
                                </td>
                                <td className="border p-2 custom-table">
                                    ₱{formatLetter(member?.income)}
                                </td>
                                <td className="flex justify-center border p-2">
                                    {member?.is_patient == 1 || member?.is_patient ==  true? (
                                        <CheckCheck className="h-5 w-5 text-green-600" />
                                    ) : <></>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-sm text-gray-500 t-caption p-2 text-center mt-2">
                    Family Composition: (Include all members of the family who
                    live in one household).
                </p>
            </div>

            <div className="grid w-full gap-1.5 mt-4 p-4">
                <p className="text-sm font-bold bg-gray-200 p-2 rounded header-bg">
                    III. Remarks
                </p>
                <div className="space-y-4 mt-2">
                    <span className="text-gray-700 text-sm t-caption border-b-2 border-gray-700 text-justify w-full">
                        {viewData?.remarks}
                    </span>
                </div>
            </div>

            <div className="flex justify-center mt-5 print-button">
                <Button
                    onClick={handlePrint}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    <Printer /> Print
                </Button>
            </div>
        </div>
    );
}
