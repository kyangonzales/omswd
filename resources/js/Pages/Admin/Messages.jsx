import React from "react";
import Chat from "./Chat";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Messages({ auth }) {
    return <Chat user={auth.user} />;
}
