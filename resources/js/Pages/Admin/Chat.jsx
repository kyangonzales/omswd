import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { getMessengerTimestamp, getTimeGap, hasTimeGap } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

function UserList({ users, user, selectedUser, setSelectedUser, unread_senders }) {
    console.log("UserList", unread_senders);

    return (
        <div className="flex flex-col w-1/4 border-l shadow-sm">
            <div className="text-lg px-5 font-semibold text-zinc-500 overflow-y-auto h-16 border-b shadow-sm flex items-center">
                <MessageCircle className="h-6 w-6" /> Messages
            </div>
            {users
                .filter((item) => item.role !== user.role)
                .map((item) => {
                    // Hanapin kung may unread messages ang user
                    const unread = unread_senders?.find(
                        (sender) => sender.sender_id === item.id
                    );

                    return (
                        <button
                            key={item.id}
                            className={`px-4 py-2 text-sm gap-x-2 items-center text-left flex w-full hover:bg-gray-100 ${
                                selectedUser?.id === item.id ? "bg-gray-100" : ""
                            }`}
                            onClick={() => setSelectedUser(item)}
                        >
                            <Avatar>
                                <AvatarImage
                                    src={
                                        item?.profile
                                            ? `/${item?.profile}`
                                            : "https://github.com/shadcn.png"
                                    }
                                    alt="User Profile"
                                />
                                <AvatarFallback>
                                    {item?.name?.charAt(0) || "CN"}
                                </AvatarFallback>
                            </Avatar>

                            <div className="w-full flex justify-between items-center">
                                <div>
                                    <h1>{item.name}</h1>
                                    {unread && unread.unread_count > 0 && (
                                    <p className="text-xs text-zinc-500">
                                        You have {unread.unread_count} unread messages
                                    </p>
                                )}
                                </div>
                            </div>
                        </button>
                    );
                })}
        </div>
    );
}


function ChatWindow({ selectedUser, messages, user }) {
    const chatContainerRef = useRef(null);

    // Function to keep scroll at the bottom
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    };

    // Auto-scroll when a new message arrives
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="w-full h-screen flex flex-col">
            {/* Header */}
            <div className="w-full h-16 flex items-center px-4 border-b shadow-sm">
                {selectedUser ? selectedUser.name : "Select a user"}
            </div>

            {/* Chat Messages Container */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto flex flex-col-reverse p-4"
            >
                {messages ? (
                    <div className="space-y-3 flex flex-col-reverse">
                        {selectedUser ? (
                            messages.map((msg, index) => {
                                const isSentByUser = msg.sender_id === user.id;
                                const prevMsg =
                                    index < messages.length - 1
                                        ? messages[index - 1]
                                        : null; // Ensure prevMsg is valid

                                console.log(`PrevMsg: $`, prevMsg);

                                // // Check if prevMsg exists and has created_at
                                // const hasGap = hasTimeGap(prevMsg.created_at, msg.created_at) ;

                                //     console.log(hasGap);

                                return (
                                    <div key={index}>
                                        {/* Display Time Gap if necessary */}
                                        {/* {hasGap && (
                                            <p className="text-gray-400 text-xs text-center w-full my-2">
                                                {formatMessengerTime(
                                                    msg.created_at
                                                )}
                                            </p>
                                        )} */}

                                        {/* Message Bubble */}
                                        <div
                                            className={`flex ${
                                                isSentByUser
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}
                                        >
                                            <div>
                                                <div className="flex items-center gap-x-2">
                                                    {isSentByUser ? (
                                                        <></>
                                                    ) : (
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={
                                                                    selectedUser?.profile
                                                                        ? `/${selectedUser?.profile}`
                                                                        : "https://github.com/shadcn.png"
                                                                }
                                                                alt="User Profile"
                                                            />
                                                            <AvatarFallback>
                                                                {selectedUser?.name?.charAt(
                                                                    0
                                                                ) || "CN"}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )}

                                                    <p className={`py-2 text-xs ${isSentByUser ? "bg-blue-700 text-white px-4 rounded-md" : "bg-zinc-500 text-white px-4 rounded-md"}`}>{msg.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-gray-500 text-center">
                                Select a user to start chatting
                            </p>
                        )}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
}

function ChatInput({ input, setInput, sendMessage, selectedUser }) {
    return (
        <div className="flex items-center p-4 bg-white border-t border-gray-300">
            <input
                type="text"
                className="flex-1 p-3 rounded-lg border text-xs border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                disabled={!selectedUser}
                placeholder="Type a message..."
            />
            <button
                className="ml-4 px-4 py-2 bg-blue-600 text-white text-xs rounded-lg disabled:bg-gray-400"
                onClick={sendMessage}
                disabled={!selectedUser}
            >
                Send
            </button>
        </div>
    );
}

export default function Chat({ user, unread_senders }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");


    console.log("CHat", unread_senders);
    

    const handleMessageData = async (receiver_id) => {
        const res = await axios.get(`/messages/${receiver_id}`);
        console.log(res.data.messages);

        setMessages(res.data.messages.data);
    };
    useEffect(() => {
        if (window.Echo && user?.id) {
            const channelName = `chat.${user.id}`;
            const channel = window.Echo.channel(channelName);
            const messageHandler = (event) => {
                setMessages((prevMessages) => [event.message, ...prevMessages]);
                const audio = new Audio(`${window.location.origin}/storage/sounds/pingding.mp3`);
                audio.play();
            };
            channel.listen(".message.sent", messageHandler);
            return () => {
                channel.stopListening(".message.sent", messageHandler);
                window.Echo.leaveChannel(channelName);
            };
        }
    }, []);

    useEffect(() => {
        if (selectedUser) {
            handleMessageData(selectedUser.id);
        }
    }, [selectedUser]);

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
            formData.append("receiver_id", selectedUser?.id);
            try {
                const response = await axios.post("/sendMessage", formData);
                console.log("Response:", response.data);
                setMessages((prevMessages) => [response.data, ...prevMessages]);
                setInput("");
            } catch (error) {}
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
                        user={user}
                    />

                    <ChatInput
                        input={input}
                        setInput={setInput}
                        sendMessage={sendMessage}
                        selectedUser={selectedUser}
                    />
                </div>
                <UserList
                unread_senders={unread_senders}
                    users={users}
                    user={user}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            </div>
        </AuthenticatedLayout>
    );
}
