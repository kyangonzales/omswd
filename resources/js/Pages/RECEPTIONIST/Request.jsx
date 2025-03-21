import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    LucideChevronLeft,
    LucideChevronRight,
    LucideChevronsLeft,
    LucideChevronsRight,
    PenLineIcon,
    Plus,
    Search,
    Trash2,
    X,
} from "lucide-react";
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
import { Badge } from "@/Components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { DatePickerWithRange } from "@/Components/ui/datepicker-with-range";

export default function Request() {
    const [inquiryList, setInquiryList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const [dateRange, setDateRange] = useState({ from: "", to: "" });
    const [unitConcern, setUnitConcern] = useState("");

    // Function to handle API filtering
    const handleFilterChange = () => {
        let query = "";
        if (dateRange.from) query += `&from=${dateRange.from}`;
        if (dateRange.to) query += `&to=${dateRange.to}`;
        if (unitConcern) query += `&unit_concern=${unitConcern}`;

        fetchInquiries(query); // Pass updated filters to API
    };

    // const fetchInquiries = async (query = "") => {
    //     try {
    //         const response = await axios.get(
    //             `/inquireList?page=${currentPage}&per_page=${rowsPerPage}&search=${query}`
    //         );
    //         const data = response.data.payload;
    //         setInquiryList(data.data);
    //         setTotalPages(data.last_page);
    //         setTotalRecords(data.total);
    //     } catch (error) {
    //         console.error("Error fetching inquiries:", error);
    //     }
    // };

    const fetchInquiries = async (query = "") => {
        setLoading(true);
        console.log(searchQuery);

        try {
            const response = await axios.get("/inquireList", {
                params: {
                    page: currentPage,
                    per_page: rowsPerPage, // Dapat tama ang parameter name
                    search: query, // Kung walang search query, huwag isama
                    from: dateRange.from || undefined,
                    to: dateRange.to || undefined,
                    unit_concern: unitConcern || undefined,
                },
            });
            const data = response.data.payload;
            setInquiryList(data.data);
            setTotalPages(data.last_page);
            setTotalRecords(data.total);
        } catch (error) {
            console.error("Error fetching inquiries:", error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchInquiries();
    // }, [currentPage, rowsPerPage]);
    useEffect(() => {
        fetchInquiries();
    }, [currentPage, rowsPerPage, dateRange, unitConcern]);

    // const handleRowsPerPageChange = (e) => {
    //     setRowsPerPage(parseInt(e.target.value));
    //     setCurrentPage(1); // Reset to first page
    // };
    const handleRowsPerPageChange = (e) => {
        const newRowsPerPage = parseInt(e.target.value);
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to first page kapag nagpalit ng rows per page
    };

    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    // const handleSearch = () => {
    //     setIsFilter(true);
    //     fetchInquiries(searchQuery); // Pass search query
    // };
    const handleSearch = () => {
        setIsFilter(true);
        setCurrentPage(1); // Reset sa page 1 para makita agad ang resulta
        fetchInquiries(searchQuery);
    };

    const [isFilter, setIsFilter] = useState(false);
    const handleClear = () => {
        setIsFilter(false);
        setSearchQuery("");
        fetchInquiries(""); // Pass search query
    };
    const [content, setContent] = useState("main");
    const initialFormData = {
        id: null,
        unit_concern: "",
        problem_presented: "",
        is_patient: false,
        fullname: "",
        birthdate: "",
        contact_number: "",
        house_number: "",
        purok: "",
        barangay: "",
        educ_attain: "",
        sex: "",
        civil_status: "",
        religion: "",
        occupation: "",
        income: "",
        remarks: "",
        deleted_family_members: [],
        family_members: [
            {
                id: null,
                fullname: "",
                is_patient: false,
                relation_to_client: "",
                birthdate: "",
                sex: "",
                civil_status: "",
                educ_attain: "",
                occupation: "",
                income: "",
            },
        ],
    };

    const [formData, setFormData] = useState(initialFormData);
    

    // Reset function
    const resetForm = () => {
        setFormData(initialFormData);
    };
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await axios.get("/inquireList");
    //             console.log(res);

    //             setInquiryList(res.data.payload);
    //         } catch (error) {}
    //     };
    //     fetchData();
    // }, []);

    const [viewData, setViewData] = useState();
    const handleView = (data) => {
        setViewData(data);
        setContent("view");
    };

    const [edit, setEdit] = useState(false);
    const editForm = (data) => {
        setFormData({
            id: data.id,
            unit_concern: data.unit_concern || "",
            problem_presented: data.problem_presented || "",
            is_patient: data.is_patient || "",
            fullname: data.fullname || "",
            birthdate: data.birthdate || "",
            contact_number: data.contact_number || "",
            house_number: data.house_number || "",
            purok: data.purok || "",
            barangay: data.barangay || "",
            educ_attain: data.educ_attain || "",
            sex: data.sex || "",
            civil_status: data.civil_status || "",
            religion: data.religion || "",
            occupation: data.occupation || "",
            income: data.income || "",
            remarks: data.remarks || "",
            deleted_family_members: [],
            family_members: data.family_members?.length
                ? data.family_members.map((member) => ({
                      id: member.id || "",
                      fullname: member.fullname || "",
                      is_patient: member.is_patient || "",
                      relation_to_client: member.relation_to_client || "",
                      birthdate: member.birthdate || "",
                      sex: member.sex || "",
                      civil_status: member.civil_status || "",
                      educ_attain: member.educ_attain || "",
                      occupation: member.occupation || "",
                      income: member.income || "",
                  }))
                : [
                      {
                          id: null,
                          fullname: "",
                          is_patient: false,
                          relation_to_client: "",
                          birthdate: "",
                          sex: "",
                          civil_status: "",
                          educ_attain: "",
                          occupation: "",
                          income: "",
                      },
                  ],
        });
        setEdit(true);
    };

    const closeForm = () => {
        resetForm();
        setEdit(false);
        setContent("main");
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
                <div className="w-full flex justify-between p-3 pt-10">
                    <h1 className="font-bold text-2xl">Inquiries</h1>
                    <Button
                        onClick={() => setContent("request")}
                        className="text-xs bg-sky-800"
                    >
                        <Plus />
                        New Request
                    </Button>
                </div>
                <div className="w-full flex justify-between p-3">
                    <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="border px-3 rounded w-64"
                        />
                        <Button
                            onClick={handleSearch}
                            className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            <Search />
                        </Button>
                    </div>

                    <div className="flex gap-x-2">
                        <DatePickerWithRange
                            onChange={(date) => {
                                console.log("Selected Date:", date);
                                setDateRange(date); // Update state with selected range
                                handleFilterChange(); // Apply filter
                            }}
                        />

                        <Select
                            onValueChange={(value) => {
                                setUnitConcern(value);
                                handleFilterChange();
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Unit Concern" />
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
                    </div>
                </div>

                <div className="w-full pl-3 pr-3">
                    <Table className="border w-full">
                        {inquiryList.length === 0 && (
                            <TableCaption className="text-gray-500">
                                No records found.
                            </TableCaption>
                        )}
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="text-center">
                                    ID
                                </TableHead>
                                <TableHead>NAME</TableHead>
                                <TableHead>UNITE CONCERN</TableHead>
                                <TableHead>STATUS</TableHead>
                                <TableHead>ADDRESS</TableHead>
                                <TableHead className="text-center"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inquiryList.map((item, index) => (
                                <TableRow
                                    key={item?.id}
                                    className="hover:bg-gray-50 text-gray-700"
                                >
                                    <TableCell className="text-center">
                                        {(currentPage - 1) * rowsPerPage +
                                            index +
                                            1}
                                    </TableCell>
                                    <TableCell>
                                        <p className="uppercase font-medium">
                                            {formatWord(item?.fullname)}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <p>{item?.unit_concern}</p>
                                        <p className="text-xs text-zinc-700">
                                            Created at:{" "}
                                            {formatDateTime(item?.created_at)}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`${
                                                item?.status == "printed"
                                                    ? "bg-green-200 text-green-800 hover:text-green-900 hover:bg-green-400"
                                                    : item?.status ==
                                                      "in progress"
                                                    ? "bg-blue-200 text-blue-800 hover:text-blue-900 hover:bg-blue-400"
                                                    : item?.status == "pending"
                                                    ? "bg-red-200 text-red-800 hover:text-red-900 hover:bg-red-400"
                                                    : ""
                                            }`}
                                        >
                                            {item?.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {item?.house_number} {item?.purok}{" "}
                                        {item?.barangay}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleView(item)}
                                            className="px-3 rounded-md hover:bg-gray-200 text-xs"
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex items-center justify-between bottom-0 mt-4 text-sm pl-2">
                        <span>Total Inquiries: {totalRecords}</span>
                        <div className="flex items-center gap-1">
                            <span>Rows per page</span>
                            <select
                                value={rowsPerPage}
                                onChange={handleRowsPerPageChange}
                                className="border-none p-1 px-7 text-xs rounded-sm"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => handleClick(1)}
                                disabled={currentPage === 1}
                                className="py-1 px-2 shadow-sm border rounded"
                            >
                                <LucideChevronsLeft size={15} />
                            </button>
                            <button
                                onClick={() => handleClick(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="py-1 px-2 shadow-sm border rounded"
                            >
                                <ChevronLeft size={15} />
                            </button>
                            <button
                                onClick={() => handleClick(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="py-1 px-2 shadow-sm border rounded"
                            >
                                <ChevronRight size={15} />
                            </button>
                            <button
                                onClick={() => handleClick(totalPages)}
                                disabled={currentPage === totalPages}
                                className="py-1 px-2 shadow-sm border rounded"
                            >
                                <LucideChevronsRight size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    if (content === "request") {
        return (
            <div className="w-full flex justify-center p-10 bg-zinc-800">
                <div className="w-[80%] m-5">
                    <Head title="Request" />
                    <div className="w-full flex justify-end gap-x-2">
                        <Button
                            onClick={() => setContent("main")}
                            className="bg-zinc-700"
                        >
                            <X />
                        </Button>
                    </div>
                    <Form
                        setViewData={setViewData}
                        inquiryList={inquiryList}
                        setInquiryList={setInquiryList}
                        formData={formData}
                        setContent={setContent}
                        setFormData={setFormData}
                        resetForm={resetForm}
                    />
                </div>
            </div>
        );
    }

    if (content == "view") {
        return (
            <div className="w-full flex justify-center  p-10 bg-zinc-800">
                <div className="w-[80%] m-10">
                    <Head title="Request" />
                    <div className="w-full flex justify-end gap-x-2">
                        <Button
                            onClick={() => editForm(viewData)}
                            className="ml-2 bg-blue-800"
                        >
                            <PenLineIcon />
                        </Button>
                        <Button
                            onClick={() => closeForm()}
                            className="bg-zinc-700"
                        >
                            <X />
                        </Button>
                    </div>
                    {!edit ? (
                        <PrintableForm viewData={viewData} />
                    ) : (
                        <Form
                            setViewData={setViewData}
                            inquiryList={inquiryList}
                            setEdit={setEdit}
                            setInquiryList={setInquiryList}
                            setContent={setContent}
                            formData={formData}
                            setFormData={setFormData}
                            resetForm={resetForm}
                        />
                    )}
                </div>
            </div>
        );
    }
}
