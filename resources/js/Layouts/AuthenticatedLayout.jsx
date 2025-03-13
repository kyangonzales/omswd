import { AppSidebar } from "@/Components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    ChartNoAxesCombined,
    GitPullRequest,
    LayoutDashboardIcon,
    MessageCircle,
    Settings,
    Settings2,
    User,
    UserRoundPen,
} from "lucide-react";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { splitByTwentyChars } from "@/lib/utils";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const total_unread = usePage().props.total_unread_messages;

    const currentRoute = usePage().url;

    useEffect(() => {
        if (!window.Echo || !user?.id) return;
        const channel = window.Echo.channel(`request.${user.id}`);
        const listener = (event) => {
            toast.info("New Request", {
                description: event.data.unit_concern,
                duration: 15000,
                position: "top-right",
                action: {
                    label: "view",
                    onClick: () => {
                        localStorage.setItem(
                            "dataToPrint",
                            JSON.stringify(event.data)
                        );
                        router.visit("request");
                    },
                },
            });
        };
        const audio = new Audio(`${window.location.origin}/storage/sounds/pingding.mp3`);
        audio.play();
        channel.listen(".request.sent", listener);
        return () => {
            channel.stopListening(".request.sent");
        };
    }, [user?.id]);

    useEffect(() => {
        if (window.Echo && user?.id) {
            const channelName = `chat.${user?.id}`;
            const channel = window.Echo.channel(channelName);
            const messageHandler = (event) => {
                console.log(event.message);
                // Gumamit ng absolute URL
                const audio = new Audio(
                    `${window.location.origin}/storage/sounds/pingding.mp3`
                );
                audio.play();
                const ruta =
                    user.role == "admin"
                        ? "/admin/messages"
                        : user.role == "lydo_aics_admin"
                        ? "/lydo/messages"
                        : user.role == "lydo_admin"
                        ? "/lydo/messages"
                        : user.role == "aics_admin"
                        ? "/aics/messages"
                        : user.role == "receptionist"
                        ? "/receptionist/messages"
                        : user.role == "osca_admin"
                        ? "/osca/messages"
                        : "";

                if (currentRoute !== ruta) {
                    toast.info("New Message", {
                        description: splitByTwentyChars(event.message.message),
                        duration: 15000,
                        position: "bottom-right",
                        action: {
                            label: "view",
                            onClick: () => {
                                localStorage.setItem(
                                    "userId",
                                    JSON.stringify(event.message)
                                );
                                router.visit("messages");
                            },
                        },
                    });
                }
            };
            channel.listen(".message.sent", messageHandler);
            return () => {
                channel.stopListening(".message.sent", messageHandler);
                window.Echo.leaveChannel(channelName);
            };
        }
    }, []);

    const routesByUser = {
        admin: [
            { label: "Dashboard", url: "dashboard", icon: LayoutDashboardIcon },
            { label: "User Management", url: "manage-user", icon: User },
            { label: "Messages", url: "messages", icon: MessageCircle },
            { label: "Request", url: "request", icon: GitPullRequest },
            { label: "Analytics", url: "#", icon: ChartNoAxesCombined },
            { label: "Settings", url: "settings", icon: Settings },
        ],
        lydo_admin: [
            { label: "Dashboard", url: "/lydo/dashboard", icon: LayoutDashboardIcon },
            { label: "Request", url: "/lydo/request", icon: GitPullRequest },
            { label: "Messages", url: "/lydo/messages", icon: MessageCircle },
            // { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "/lydo/settings", icon: Settings },
        ],
        osca_admin: [
            {
                label: "Dashboard",
                url: "/osca/dashboard",
                icon: LayoutDashboardIcon,
            },
            { label: "Request", url: "/osca/request", icon: GitPullRequest },
            { label: "Messages", url: "/osca/messages", icon: MessageCircle },
            // { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "/osca/settings", icon: Settings },
        ],
        aics_admin: [
            { label: "Dashboard", url: "/aics/dashboard", icon: LayoutDashboardIcon },
            { label: "Request", url: "/aics/request", icon: GitPullRequest },
            { label: "Messages", url: "/aics/messages", icon: MessageCircle },
            // { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "/aics/settings", icon: Settings },
        ],
        receptionist: [
            {
                label: "Dashboard",
                url: "/receptionist/dashboard",
                icon: LayoutDashboardIcon,
            },
            {
                label: "Request",
                url: "/receptionist/request",
                icon: GitPullRequest,
            },
            {
                label: "Messages",
                url: "/receptionist/messages",
                icon: MessageCircle,
            },

            // { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "/receptionist/settings", icon: Settings },
        ],
        lydo_aics_admin: [
            { label: "Dashboard", url: "/lydo_acis/dashboard", icon: LayoutDashboardIcon },
            { label: "Request", url: "/lydo_acis/request", icon: GitPullRequest },
            { label: "Messages", url: "/lydo_acis/messages", icon: MessageCircle },
            // { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "/lydo_acis/settings", icon: Settings },
        ],
        pdao_admin: [
            { label: "Dashboard", url: "/pdao/dashboard", icon: LayoutDashboardIcon },
            { label: "Request", url: "/pdao/request", icon: GitPullRequest },
            { label: "Messages", url: "/pdao/messages", icon: MessageCircle },
            // { label: "Account", url: "#", icon: UserRoundPen },
            { label: "Settings", url: "/pdao/settings", icon: Settings },
        ],
    };
    const routes = routesByUser[user.role] || [];
    return (
        <div className="min-h-screen flex">
            <SidebarProvider>
                <AppSidebar routes={routes} user={user} total={total_unread} />
                <Toaster
                    toastOptions={{
                        className: "w-full  mb-3 font-sans text-base shadow-sm",
                    }}
                />
                <main className="w-full pb-10">{children}</main>
            </SidebarProvider>
        </div>
    );
}
