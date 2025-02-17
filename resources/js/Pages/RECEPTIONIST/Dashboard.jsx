import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
export default function Dashboard() {
    const currentDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {/* GENERAL INTAKE */}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="w-full h-[11in] p-10 border shadow-lg bg-white mx-auto mt-3">
                <div className="flex justify-between items-center mb-4">
                    <img src="storage/mswd.jpg" alt="Logo" className="w-20 h-20 mt-[-30px]" />
                    <div className="text-center">
                        <h2 className="text-xl font-bold">MUNICIPAL SOCIAL WELFARE & DEVELOPMENT OFFICE</h2>
                        <h2 className="text-xl font-bold">GENERAL TINIO, NUEVA ECIJA</h2>
                        <h2 className="text-xl font-bold">INTAKE SHEET</h2>
                    </div>
                    <img src="storage/gt-logo.jpg" alt="Logo" className="w-20 h-20  mt-[-30px]" />
                </div>
                <div className="flex justify-between mb-4">
                        <div className="w-1/2">
                        <Label htmlFor="office"  className="text-lg">Select Office</Label>
                        <Select>
                            <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Select Office" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="mswd">MSWD</SelectItem>
                            <SelectItem value="aics">Aid to Individual in Crisis (AICS)</SelectItem>
                            <SelectItem value="special_cases">Special Cases</SelectItem>
                            <SelectItem value="pwd">Person with Disability (PWD)</SelectItem>
                            <SelectItem value="solo_parent">Solo Parent</SelectItem>
                            <SelectItem value="lydo">Local Youth Development Office (LYDO)</SelectItem>
                            <SelectItem value="osca">Senior Citizen's Affairs (OSCA)</SelectItem>
                            <SelectItem value="referral">Referral (Indigency, Ambulance, Philhealth, LCR, PAO)</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                            <div className="w-1/2 text-right font-bold text-lg">
                                <Label>Date:</Label> <span className="border-b border-black text-xs">{currentDate}</span>
                            </div>
                    </div>
                    <p className="text-sm font-bold mt-2 bg-zinc-200 p-2 ">I. IDENTIFYING INFORMATION</p>

                    <form className="space-y-4">
                        <div className="flex space-x-4 text-lg" >
                            <div className="w-1/3 mt-1">
                                <Label htmlFor="name" className="text-lg">Full Name</Label>
                                <Input id="name" type="text" placeholder="Enter full name" />
                            </div>
                            <div className="w-1/3">
                                <Label htmlFor="bday"  className="text-lg">Birthdate</Label>
                                <Input id="bday" type="date" placeholder="Enter Birthday" />
                            </div>
                            <div className="w-1/3 mt-1">
                                <Label htmlFor="age" className="text-lg">Age</Label>
                                <Input id="age" type="number" placeholder="Enter age" />
                            </div>
                            
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <Label htmlFor="problem"  className="text-lg">Problem Presented</Label>
                                <Input id="problem" type="text" placeholder="Enter Problem Presented" />
                            </div>
                        
                        </div>                    
                        <div>
                            <Label htmlFor="address" className="text-lg">Address</Label>
                            <Input id="address" type="text" placeholder="Enter Address" />
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/3 mt-1" >
                                <Label htmlFor="num" className="text-lg">Contact Number</Label>
                                <Input id="num" type="number" placeholder="Enter Contact Number" />
                            </div>
                            <div className="w-1/2">
                                <Label htmlFor="religion" className="text-lg">Religion</Label>
                                <Input id="religion" type="text" placeholder="Enter Religion" />
                            </div>
                        </div>   
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                            <Label htmlFor="civil-status" className="text-lg">Civil Status</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Civil Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="single">Single</SelectItem>
                                    <SelectItem value="married">Married</SelectItem>
                                    <SelectItem value="widowed">Widowed</SelectItem>
                                    <SelectItem value="separated">Separated</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
                            <div className="w-1/2">
                                <Label htmlFor="educational" className="text-lg">Educational Attaintment</Label>
                                <Input id="educational" type="text" placeholder="Enter Educational Attainment" />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <Label htmlFor="occupation" className="text-lg">Occupation</Label>
                                <Input id="occupation" type="text" placeholder="Enter Occupation" />
                            </div>
                            <div className="w-1/2">
                                <Label htmlFor="income" className="text-lg">Income</Label>
                                <Input id="income" type="number" placeholder="Enter Income" />
                            </div>
                        </div> 
                        <div>
                            <Label htmlFor="message" className="text-lg">Remarks</Label>
                        <textarea
                            id="message"
                            rows="4"
                            className="w-full border rounded-md p-2"
                            placeholder="Enter your message"
                        ></textarea>
                        </div>
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </div>
        </AuthenticatedLayout>
    );
}
