import React from "react";
import Chat from "../Admin/Chat";

export default function Messages({ auth }) {
    return <Chat user={auth.user} />;
}
