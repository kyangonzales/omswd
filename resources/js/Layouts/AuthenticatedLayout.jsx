import { AppSidebar } from "@/Components/app-sidebar";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Calendar,
    ChartNoAxesCombined,
    GitPullRequest,
    Home,
    Inbox,
    LayoutDashboardIcon,
    Search,
    Settings,
    Settings2,
    User,
    UserRoundPen,
} from "lucide-react";
export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const routesByUser = {
        admin: [
            { label: "Dashboard", url: "#", icon: LayoutDashboardIcon },
            { label: "User Management", url: "manage-user", icon: User },
            { label: "Analytics", url: "#", icon: ChartNoAxesCombined },
            { label: "Settings", url: "#", icon: Settings2 },
        ],
        lydo_admin: [
            { label: "Dashboard", url: "#", icon: LayoutDashboardIcon },
            { label: "Request", url: "#", icon: GitPullRequest },
            { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "#", icon: Settings2 },
        ],
        osca_admin: [
            { label: "Dashboard", url: "#", icon: LayoutDashboardIcon },
            { label: "Request", url: "#", icon: GitPullRequest },
            { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "#", icon: Settings2 },
        ],
        aics_admin: [
            { label: "Dashboard", url: "#", icon: LayoutDashboardIcon },
            { label: "Request", url: "#", icon: GitPullRequest },
            { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "#", icon: Settings2 },
        ],
        receptionist: [
            { label: "Dashboard", url: "/receptionist/dashboard", icon: LayoutDashboardIcon },
            { label: "Request", url: "/receptionist/request", icon: GitPullRequest },
            { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "#", icon: Settings2 },
        ],
        lydo_aics_admin: [
            { label: "Dashboard", url: "#", icon: LayoutDashboardIcon },
            { label: "Request", url: "#", icon: GitPullRequest },
            { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "#", icon: Settings2 },
        ],
    };
    const routes = routesByUser[user.role] || [];
    return (
        <div className="min-h-screen flex">
            <SidebarProvider>
                <AppSidebar routes={routes} user={user} />
                <main className="w-full mx-12">{children}</main>
            </SidebarProvider>
        </div>
    );
}
