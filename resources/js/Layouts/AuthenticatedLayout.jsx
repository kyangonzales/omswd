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
import { Toaster } from "sonner";
import { toast } from "sonner"
import { router } from "@inertiajs/react";


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [notification, setNotification] = useState([]);
    const [newMessage, setNewMessage] = useState(null); // Track new message

    useEffect(() => {
        if (!window.Echo || !user?.id) return; // Ensure Echo is available and user exists

        const channel = window.Echo.channel(`request.${user.id}`);

        const listener = (event) => {
            console.log("New message received:", event.data);
            setNewMessage(event.data); // Update newMessage state to trigger re-run
        };

        channel.listen(".request.sent", listener);

        return () => {
            channel.stopListening(".request.sent");
        };
    }, [user?.id]); // Runs when user.id changes

    // This useEffect will re-run whenever newMessage changes
    useEffect(() => {
        if (newMessage) {
            setNotification((prevMessages) => [...prevMessages, newMessage]); // Append new event
             // Show toast notification for each new message
             toast.info("New Request", {
                description: newMessage.unit_concern || "You have a new notification!",
                duration: 15000, // Auto-dismiss in 5 seconds
                position: "top-right", // Change position if needed
                action: {
                    label: "Open", // Text of the button
                    onClick: () => {
                        router.visit('osca.request')
                        // You can navigate or open a modal here
                    },}
            });
        }
    }, [newMessage]); // Runs when newMessage updates


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
                <Toaster 
                 toastOptions={{
                    className: "w-full  mb-3 font-sans text-base shadow-", // Adjust width, height & padding
                  }}
                />
                <main className="w-full ">{children}</main>
            </SidebarProvider>
        </div>
    );
}
