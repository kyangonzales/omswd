import { Button } from "@/Components/ui/button";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Welcome" />
            <div
                style={{
                    background:
                        "linear-gradient(90deg, rgba(84,93,153,1) 0%, rgba(112,124,203,1) 24%, rgba(126,139,228,1) 48%, rgba(126,140,229,1) 61%, rgba(140,156,255,1) 84%)",
                }}
            >
                <div className="relative flex text-white min-h-screen flex-cols  items-center justify-center selection:bg-[#20ffbc] selection:text-white">
                    <div className="w-full p-10 ">
                        <h1 className="font-extrabold text-5xl text-border">
                            MUNICIPAL OF SOCIAL WELFARE AND DEVELOPMENT OFFICE
                        </h1>
                        <p className="text-border">
                            The Municipal Social Welfare and Development (MSWD)
                            is dedicated to uplifting the lives of vulnerable
                            sectors by providing inclusive social services,
                            livelihood programs, and disaster response. We
                            strive to protect the rights and well-being of
                            individuals, especially children, women, senior
                            citizens, and persons with disabilities, fostering a
                            compassionate and empowered community through strong
                            partnerships and sustainable development
                            initiatives.
                        </p>
                    <div className="mt-5">
                    <Link href={route('login')} className="px-6 hover:shadow-xl hover:scale-95 transition-all shadow-2xl  border p-3 rounded">Get Started</Link>
                    </div>
                    </div>
                    <div className="w-4/6 relative flex">
                    <img src="storage/tinio.png" alt="" className="w-[15rem] h-[15rem]"/>
                    <img src="storage/mswd.png" alt="" className="w-[15rem] h-[15rem]"/>
                    </div>
                </div>
            </div>
        </>
    );
}
