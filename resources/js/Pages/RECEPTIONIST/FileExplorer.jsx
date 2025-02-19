
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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


export default function FileExplorer() {
	const [selectedYear, setSelectedYear] = useState(null)
	const [selectedMonth, setSelectedMonth] = useState(null)
	const [searchQuery, setSearchQuery] = useState("") // For handling search input
	
	const currentDate = new Date()
	const currentYear = currentDate.getFullYear()
	const currentMonth = currentDate.toLocaleString("default", { month: "long" })
	const currentDay = currentDate.getDate()
	
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
	
	// Sample files grouped by month with a specific date (you can replace with dynamic data)
	const files = {
	  January: {
		17: ["report1.pdf", "summary.docx"],
		18: ["data.xlsx", "notes.docx"],
	  },
	  February: {
		1: ["summary.docx"],
		10: ["budget.xlsx"],
	  },
	  // Add more months and files as needed
	}
	
	const handleSearchChange = (e) => {
	  setSearchQuery(e.target.value)
	}
  
	return (
	  <div className="p-5 bg-white shadow-md rounded-lg mt-5">
			
		<div className="flex justify-between items-center mb-10">
		  <Breadcrumb>
			<BreadcrumbList>
			  <BreadcrumbItem>
				<BreadcrumbLink className="cursor-pointer text-blue-500" onClick={resetNavigation}>
				  Home
				</BreadcrumbLink>
			  </BreadcrumbItem>
			  {selectedYear && (
				<>
				  <BreadcrumbSeparator />
				  <BreadcrumbItem>
					<BreadcrumbLink className="cursor-pointer text-blue-500" onClick={() => handleYearClick(selectedYear)}>
					  {selectedYear}
					</BreadcrumbLink>
				  </BreadcrumbItem>
				</>
			  )}
			  {selectedMonth && (
				<>
				  <BreadcrumbSeparator />
				  <BreadcrumbItem>
					<BreadcrumbLink className="cursor-pointer text-blue-500" onClick={() => handleMonthClick(selectedMonth)}>
					  {selectedMonth}
					</BreadcrumbLink>
				  </BreadcrumbItem>
				</>
			  )}
			</BreadcrumbList>
		  </Breadcrumb>
		<div className="flex-shrink-0 ml-4">
		  <input
			type="text"
			placeholder="Search"
			value={searchQuery}
			onChange={handleSearchChange}
			className="p-2 border border-gray-300 rounded-md"
		  />
		</div>
	  </div>
  
  
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
  
		{/* Display Files by Date */}
		{selectedMonth && (
		  <div className="bg-gray-100 p-4 rounded-md mt-4">
			<h3 className="font-semibold mb-2">📄 Files for {selectedMonth}, {selectedYear}</h3>
  
			{Object.keys(files[selectedMonth] || {})
			  .sort((a, b) => b - a) // Sorting the days in descending order
			  .map((day) => {
				const fileList = files[selectedMonth][day];
				return (
				  <div key={day}>
					<h4 className="font-semibold">{day} {selectedMonth}, {selectedYear}</h4>
					<ul>
					  {fileList.sort().map((file) => (
						<li key={file} className="p-2 bg-white shadow rounded-md mb-2">
						  📄 {file}
						</li>
					  ))}
					</ul>
				  </div>
				);
			  })}
			{Object.keys(files[selectedMonth] || {}).length === 0 && (
			  <p>No files available for this month.</p>
			)}
		  </div>
		)}
	  </div>
	)
  }
  
  