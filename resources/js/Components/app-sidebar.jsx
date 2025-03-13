import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Link } from "@inertiajs/react";
import { Handshake } from "lucide-react";

export function AppSidebar({ routes, user, total }) {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <Handshake /> MSWD ASSISTANCE
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {routes.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <div className="w-full flex justify-between items-center">
                                                <div className="w-full flex gap-x-1 items-center">
                                                    <item.icon className="h-5 w-5" />
                                                    <span>{item.label}</span>
                                                </div>
                                                {item.label == "Messages" ? 
                                                <div className="flex items-center p-1 justify-center h-5 w-5 rounded-full bg-sky-700 text-white text-xs font-light">
                                                {total}
                                            </div>
                                                : <></>}
                                            </div>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
