import { AppSidebar } from "@/Components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    Calendar,
    ChartNoAxesCombined,
    GitPullRequest,
    Home,
    Inbox,
    LayoutDashboardIcon,
    MessageCircle,
    Search,
    Settings,
    Settings2,
    User,
    UserRoundPen,
} from "lucide-react";
import Echo from "laravel-echo";
export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
     useEffect(() => {
            // if (window.Echo) {
                const channel = window.Echo.channel(`request.${user.id}`);
                channel.listen(".request.sent", (event) => {
                    console.log("New message received:", event);
                    // setMessages([...messages, event]);
                });
                // return () => {
                //     window.Echo.leaveChannel(`chat.${user.id}`);
                // };
                // window.Echo.private(`request.${user.id}`)
                // .listen('RequestSent', (event) => {
                //     console.log('New request received:', event.data);
                // });
            // }
        }, []);


    const routesByUser = {
        admin: [
            { label: "Dashboard", url: "dashboard", icon: LayoutDashboardIcon },
            { label: "User Management", url: "manage-user", icon: User },
            { label: "Messages", url: "messages", icon: MessageCircle },
            { label: "Analytics", url: "#", icon: ChartNoAxesCombined },
            { label: "Settings", url: "#", icon: Settings2 },
        ],
        lydo_admin: [
            { label: "Dashboard", url: "#", icon: LayoutDashboardIcon },
            { label: "Request", url: "#", icon: GitPullRequest },
            { label: "Messages", url: "manage-user", icon: MessageCircle },
            { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "#", icon: Settings2 },
        ],
        osca_admin: [
            { label: "Dashboard", url: "#", icon: LayoutDashboardIcon },
            { label: "Request", url: "#", icon: GitPullRequest },
            { label: "Messages", url: "/osca/messages", icon: MessageCircle },
            { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "#", icon: Settings2 },
        ],
        aics_admin: [
            { label: "Dashboard", url: "#", icon: LayoutDashboardIcon },
            { label: "Request", url: "#", icon: GitPullRequest },
            { label: "Messages", url: "manage-user", icon: MessageCircle },
            { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "#", icon: Settings2 },
        ],
        receptionist: [

            { label: "Dashboard", url: "/receptionist/dashboard", icon: LayoutDashboardIcon },
            { label: "Request", url: "/receptionist/request", icon: GitPullRequest },
            { label: "Messages", url: "/receptionist/messages", icon: MessageCircle },

            { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "#", icon: Settings2 },
        ],
        lydo_aics_admin: [
            { label: "Dashboard", url: "#", icon: LayoutDashboardIcon },
            { label: "Request", url: "#", icon: GitPullRequest },
            { label: "Messages", url: "manage-user", icon: MessageCircle },
            { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "#", icon: Settings2 },
        ],
    };
    const routes = routesByUser[user.role] || [];
    return (
        <div className="min-h-screen flex">
            <SidebarProvider>
                <AppSidebar routes={routes} user={user} />
                <main className="w-full ">{children}</main>
            </SidebarProvider>
        </div>
    );
}
