import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

function UserList({ users,user, selectedUser, setSelectedUser }) {
    return (
        <div className="flex flex-col w-1/4 border-l shadow-sm">
            <div className="text-lg px-5 font-semibold mb-4 h-16 border-b shadow-sm flex items-center">
                Messages
            </div>
            {users.filter(item => item.role !== user.role).map((item) => {
                    return (
                        <button
                            key={item.id}
                            className={`px-4 py-2 text-sm gap-x-2 items-center text-left flex w-full hover:bg-gray-100 ${
                                selectedUser?.id === item.id
                                    ? "bg-gray-100"
                                    : ""
                            }`}
                            onClick={() => setSelectedUser(item)} // Set full user object
                        >
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="w-full">
                                <h1>{item.name}</h1>
                                <p className="text-xs">{item.email}</p>
                            </div>
                        </button>
                    );
                }
            )}
        </div>
    );
}

function ChatWindow({ selectedUser, messages }) {
    return (
        <div className="w-full h-screen ">
            <div className="w-full h-16 flex items-center px-4 border-b shadow-sm">
                {selectedUser ? selectedUser.name : "Select a user"}{" "}
                {/* Display user's name */}
            </div>
            <div className="flex-1  p-6 overflow-y-auto">
                <div className="h-full space-y-4">
                    {selectedUser ? (
                        (messages[selectedUser.id] || []).map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    msg.sender === "You"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-xs p-4 rounded-lg ${
                                        msg.sender === "You"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    <div className="font-semibold">
                                        {msg.sender}
                                    </div>
                                    <div>{msg.text}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">
                            Select a user to start chatting
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function ChatInput({ input, setInput, sendMessage, selectedUser }) {
    return (
        <div className="flex items-center p-4 bg-white border-t border-gray-300">
            <input
                type="text"
                className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                disabled={!selectedUser}
                placeholder="Type a message..."
            />
            <button
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
                onClick={sendMessage}
                disabled={!selectedUser}
            >
                Send
            </button>
        </div>
    );
}

export default function Chat({ user }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    // useEffect(() => {
    //     // Ensure window.Echo is available
    //     if (window.Echo) {
    //         const channel = window.Echo.channel(`chat.${user.id}`);
    //         channel.listen('.message.sent', (event) => {
    //             console.log('New message received:', event.message);
    //             setMessages((prevMessages) => [...prevMessages, event.message]);
    //         });
    //         return () => {
    //             window.Echo.leaveChannel('chat'); // Properly leave the channel
    //         };
    //     }
    // }, []);

    useEffect(() => {
        if (user && window.Echo) {
            const channel = window.Echo.channel(`chat.${user.id}`);
            channel.listen(".message.sent", (event) => {
                console.log("New message received:", event);
                setMessages([...messages, event]);
            });
            return () => {
                window.Echo.leaveChannel(`chat.${user.id}`);
            };
        }
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/getUser");
                setUsers(res.data.payload);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const sendMessage = async () => {
        if (input.trim() && selectedUser) {
            const formData = new FormData();
            formData.append("message", input);
            formData.append("id", selectedUser?.id);

            try {
                const response = await axios.post("/send-message", formData);
                console.log("Response:", response.data);

                setMessages((prevMessages) => ({
                    ...prevMessages,
                    [selectedUser.id]: [
                        ...(prevMessages[selectedUser.id] || []),
                        { text: input, sender: "You" },
                    ],
                }));

                setInput(""); // Clear input after sending
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    return (
        <AuthenticatedLayout user={user}>
            <div className="flex h-screen w-full">
                {/* Chat Window */}
                <div className="flex-1 flex flex-col w-full">
                    <ChatWindow
                        selectedUser={selectedUser}
                        messages={messages}
                    />

                    {/* Chat Input */}
                    <ChatInput
                        input={input}
                        setInput={setInput}
                        sendMessage={sendMessage}
                        selectedUser={selectedUser}
                    />
                </div>
                {/* User List */}
                <UserList
                    users={users}
                    user={user}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            </div>
        </AuthenticatedLayout>
    );
}
