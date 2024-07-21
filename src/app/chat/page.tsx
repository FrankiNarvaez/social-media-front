'use client'

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/authContext";
import { io } from "socket.io-client";
import { useSearchParams } from "next/navigation";


function Messages ({messages, chatId}) {
    return (
        <ul className="flex flex-col gap-2 py-2">
            {messages.filter((msg) => msg.chatId === chatId).map((msg, index) => (
                <Message key={index} message={msg.message} userId={msg.userId} />
            ))}
        </ul>
    );
}

function Message ({message, userId}) {
    return (
        <li
            className={`py-2 px-6 ${
                userId === localStorage.getItem('loginToken')
                ? 'bg-ligthPurple self-end'
                : 'bg-liquidLava'
            } rounded-xl w-fit max-w-full text-blancoHueso`}
            >
            <p className="w-full text-wrap break-words">{message}</p>
        </li>
    );
}

let socket;

function Chat() {
    const chatId = useSearchParams().get('chatId');
    const { loginToken, register } = useAuth();
    const [messages, setMessages ] = useState([]);


    useEffect(() => {
        if (typeof window === undefined) return 

        
        socket = io('https://8c81mq74-5002.use2.devtunnels.ms/chat', {
            auth: {
                token: localStorage.getItem('loginToken'),
            }});

        socket.on('connect', () => {
            console.log('Connected to server');
        });


        socket.on('receiveMessage', ({message, chatId, userId}) => {
            if (message) { 
                setMessages(prevMessages => [...prevMessages, {message, chatId, userId}]);
            }
        })

        return () => {
            socket.disconnect();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = e.target.message.value
        if (socket) socket.emit('message', message, chatId);
        e.target.message.value = '';
    }
    
    return (
        <main className="flex justify-center items-end w-dvw h-dvh bg-purple-50 dark:bg-darkVoid py-4">
            <div className="w-full max-w-2xl px-4 md:px-0">
                <Messages messages={messages} chatId={chatId}/>
                <form onSubmit={handleSubmit} className="flex">
                    <input type="text" name="message" className="p-2 rounded-s-xl ring-1 ring-white flex-grow     bg-darkVoid text-blancoHueso placeholder:text-blancoHueso focus:outline-none" />
                    <button className="px-4 bg-liquidLava rounded-e-xl ring-1 ring-white text-blancoHueso">Send</button>
                </form>
            </div>
        </main>
    );
}

export default Chat;