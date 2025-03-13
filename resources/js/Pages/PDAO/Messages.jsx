import React from 'react'
import Chat from '../Admin/Chat';

export default function Messages({ auth, total_unread_messages, unread_senders  }) {    
    console.log(unread_senders);
    
    return <Chat user={auth.user} unread_senders={unread_senders}/>;
}
