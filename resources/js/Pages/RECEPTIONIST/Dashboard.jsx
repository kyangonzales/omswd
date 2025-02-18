import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
<<<<<<< Updated upstream
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Printer } from 'lucide-react';
  

import React, { useState, useEffect } from 'react';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"





function FileExplorer() {
    const [selectedYear, setSelectedYear] = useState(null)
    const [selectedMonth, setSelectedMonth] = useState(null)
    
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
  
    // Generate full months dynamically
    const generateMonths = (year) => {
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
      return year === currentYear ? months.slice(0, currentDate.getMonth() + 1) : months
    }
  
    const handleYearClick = (year) => {
      setSelectedYear(year)
      setSelectedMonth(null)
    }
  
    const handleMonthClick = (month) => {
      setSelectedMonth(month)
    }
  
    const resetNavigation = () => {
      setSelectedYear(null)
      setSelectedMonth(null)
    }
  
    // Dummy files grouped by date
    const files = [
      { name: "report1.pdf", date: "2025-02-18" },
      { name: "notes.docx", date: "2025-02-18" },
      { name: "summary.txt", date: "2025-02-17" },
      { name: "data.xlsx", date: "2025-02-16" },
    ]
  
    // Filter and sort files based on selected month and year
    const filteredFiles = files.filter(file => {
      const fileDate = new Date(file.date)
      return (
        fileDate.getFullYear() === selectedYear &&
        fileDate.toLocaleString("default", { month: "long" }) === selectedMonth
      )
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
  
    return (
      <div className="p-5 bg-white shadow-md rounded-lg mt-5">
        {/* Breadcrumb Navigation */}
        <div className="mb-4 text-blue-500 cursor-pointer" onClick={resetNavigation}>
          Home {selectedYear && `> ${selectedYear}`} {selectedMonth && `> ${selectedMonth}`}
        </div>
  
        {/* Year Selection */}
        {!selectedYear && (
          <div className="flex flex-wrap gap-3 mt-4">
            {Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => (
              <button
                key={year}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-blue-400 hover:text-white"
                onClick={() => handleYearClick(year)}
              >
                📂 {year}
              </button>
            ))}
          </div>
        )}
  
        {/* Month Selection */}
        {selectedYear && !selectedMonth && (
          <div className="flex flex-wrap gap-3 mt-4">
            {generateMonths(selectedYear).map((month) => (
              <button
                key={month}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-green-400 hover:text-white"
                onClick={() => handleMonthClick(month)}
              >
                📂 {month}
              </button>
            ))}
          </div>
        )}
  
        {/* Display Files (Grouped by Date) */}
        {selectedMonth && (
          <div className="bg-gray-100 p-4 rounded-md mt-4">
            <h3 className="font-semibold mb-2">📄 Files for {selectedMonth}, {selectedYear}</h3>
            {filteredFiles.length > 0 ? (
              filteredFiles.reduce((grouped, file) => {
                const fileDate = new Date(file.date).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric"
                })
                if (!grouped[fileDate]) grouped[fileDate] = []
                grouped[fileDate].push(file)
                return grouped
              }, {})
            ) : (<p>No files available.</p>)}
            {
              Object.entries(
                filteredFiles.reduce((grouped, file) => {
                  const fileDate = new Date(file.date).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric"
                  })
                  if (!grouped[fileDate]) grouped[fileDate] = []
                  grouped[fileDate].push(file)
                  return grouped
                }, {})
              ).map(([date, files]) => (
                <div key={date} className="mb-4">
                  <h4 className="font-semibold text-gray-600">{date}</h4>
                  <ul>
                    {files.map((file, index) => (
                      <li key={index} className="p-2 bg-white shadow rounded-md mb-2">📄 {file.name}</li>
                    ))}
                  </ul>
                </div>
              ))
            }
          </div>
        )}
      </div>
    )
  }





=======
import { useEffect, useState } from 'react';
>>>>>>> Stashed changes

export default function Dashboard() {
    const currentDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

<<<<<<< Updated upstream
    const handlePrint = () => {
        const printContent = document.querySelector(".printable-item").innerHTML;
        const originalContent = document.body.innerHTML;
    
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    };
=======
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Ensure window.Echo is available
        if (window.Echo) {
            const channel = window.Echo.channel('chat');
            channel.listen('.message.sent', (event) => {
                console.log('New message received:', event.message);
                setMessages((prevMessages) => [...prevMessages, event.message]);
            });
            return () => {
                window.Echo.leaveChannel('chat'); // Properly leave the channel
            };
        }
    }, []);

>>>>>>> Stashed changes
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {/* GENERAL INTAKE */}
                </h2>
            }
        >
            <Head title="Dashboard" />

<<<<<<< Updated upstream
            {/* <div className=''>
                <p>
                    📂2024
                </p>
                <p>
                    📂2023
                </p> 
                <p>
                    📂2022
                </p>
                <p>
                    📂2021
                </p> 
            </div> */}
=======
            {/* <div className="w-full h-[11in] p-10 border shadow-lg bg-white mx-auto mt-3">
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
>>>>>>> Stashed changes

<FileExplorer />



            <div className="w-full h-full p-10 border shadow-lg bg-white mx-auto mt-3 printable-item hidden">
                <div className="flex items-center justify-center mb-4">
                        <img src="/storage/mswd.jpg" alt="Logo" className="w-20 h-20 mr-2 mb-10" />
                        <div className="text-center">
                            <h2 className="text-xl font-bold">MUNICIPAL SOCIAL WELFARE & DEVELOPMENT OFFICE</h2>
                            <h2 className="text-xl font-bold">GENERAL TINIO, NUEVA ECIJA</h2>
                            <h2 className="text-xl font-bold">INTAKE SHEET</h2>
                        </div>
                        <img src="/storage/gt-logo.jpg" alt="Logo" className="w-20 h-20 ml-2 mb-10" />
                    </div>
                    <div className="flex justify-between mb-4">
                            <div className="w-1/2">
                                <p className='font-bold'>Unit Concern:
                                    <span className='ms-2 underline font-normal'>Aid to Individual in Crisis (AICS)</span>
                                </p>
                            </div>
                            <div className="w-1/2 text-right font-bold">
                                <Label>Date:</Label> <span className="border-b border-black">{currentDate}</span>
                            </div>

                        </div>
                    
                        <div className="p-4">
                            <p className="text-md font-bold bg-gray-200 p-2 rounded">I. IDENTIFYING INFORMATION</p>
                            <table className="w-full mt-4 text-md">
                                <tbody>
                                    <tr className="border-b">
                                        <td className="font-bold w-1/3">Name of Client:</td>
                                        <td className="border-b w-2/3">Pedro G. De leon</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="font-bold">Age:</td>
                                        <td className="border-b">27</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="font-bold">Address:</td>
                                        <td className="border-b">RCO-0193, Violeta, Rio Chico, General Tinio, Nueva Ecija</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="font-bold">Contact Number:</td>
                                        <td className="border-b">09350480926</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="font-bold">Birthdate:</td>
                                        <td className="border-b">July 11, 2002</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="font-bold">Religion:</td>
                                        <td className="border-b">Islam</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="font-bold">Civil Status:</td>
                                        <td className="border-b">Single</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="font-bold">Educational Attainment:</td>
                                        <td className="border-b">College Graduate</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="font-bold">Occupation:</td>
                                        <td className="border-b">Software Developer</td>
                                    </tr>
                                    <tr>
                                        <td className="font-bold border-b">Income:</td>
                                        <td className="border-b">₱40,000 and above</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                        <div className="text-sm font-bold mt-2 bg-zinc-200 p-2">II. FAMILY COMPOSITION</div>
                            <Table className="w-full rounded-lg mt-3">
                                <TableCaption className="text-sm text-gray-500">
                                    Family Composition: (Include all members of the family, who live in one household).
                                </TableCaption>
                                <TableHeader>
                                    <TableRow className="bg-gray-100">
                                        <TableHead className="w-[300px]">NAME OF FAMILY MEMBERS</TableHead>
                                        <TableHead className="w-[100px] text-center">AGE</TableHead>
                                        <TableHead className="w-[100px] text-center">SEX</TableHead>
                                        <TableHead className="w-[150px] text-center">CIVIL STATUS</TableHead>
                                        <TableHead className="w-[180px] text-center">RELATION TO CLIENT</TableHead>
                                        <TableHead className="w-[200px] text-center">EDUCATIONAL ATTAINMENT</TableHead>
                                        <TableHead className="w-[180px] text-center">OCCUPATION</TableHead>
                                        <TableHead className="w-[150px] text-center">INCOME</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="border-b ">
                                        <TableCell className="font-medium">Juan Dela Cruz</TableCell>
                                        <TableCell className="text-center">22</TableCell>
                                        <TableCell className="text-center">Male</TableCell>
                                        <TableCell className="text-center">Single</TableCell>
                                        <TableCell className="text-center">Son</TableCell>
                                        <TableCell className="text-center">College Graduate</TableCell>
                                        <TableCell className="text-center">Unemployed</TableCell>
                                        <TableCell className="text-center">40,000 above</TableCell>
                                    </TableRow>
                                    
                                </TableBody>
                            </Table>
                        </div>
                        <div className="grid w-full gap-1.5 mt-4">
                            <p className="text-md font-bold bg-gray-200 p-2 rounded">I. Remarks</p>
                            <div className="space-y-4 mt-2">
                                <span className="text-gray-700 border-b-2 border-gray-700 text-justify w-full">
                                    Client's family member has been affected by a natural disaster and requires shelter assistance.    
                                </span>                
                            </div>
                        </div>
                        <div className="flex justify-center mt-5 print-button">
                            <Button onClick={handlePrint} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                <Printer></Printer> Print
                            </Button>
                        </div>
<<<<<<< Updated upstream
                </div> 
=======
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </div> */}



                <h2>Chat Messages</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
>>>>>>> Stashed changes
        </AuthenticatedLayout>
    );
}
