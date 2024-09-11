'use client'

import React, { useState, useEffect } from 'react';
import Sidebar from "../_components/Sidebar";
import { IoSend } from 'react-icons/io5';
import { createNewChat, handleNewMessage, fetchChatHistory } from '@/actions/chats';
import { useRouter } from 'next/navigation';
import Markdown from 'markdown-to-jsx'
import { createClient } from '@/utils/supabase/client';

interface Message {
    parts: { text: string }[];
    role: 'user' | 'model';
}

const ChatPage = () => {
    const [contents, setContents] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [chatId, setChatId] = useState<string | null>(null);  
    const router = useRouter();

    const supabase = createClient();

    useEffect(() => {
        const checkAuth = async () => {
            const { data, error} = await supabase.auth.getUser();
            if (error || !data.user) {
                router.push('/login'); // Redirect to login if there's no session
            } else {
                console.log('User authenticated:', data.user);
            }
        };

        checkAuth();
    }, []);


    const createChatMessage = (role: "user" | "model", text: string) => ({
        role,
        parts: [{ text }]
    });

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessage = createChatMessage("user", input);
        const updatedContents = [...contents, newMessage];

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contents: updatedContents, message: input }),
            });

            const { response, title } = await res.json();
            console.log("title response from gemini", title);
            // const modelResponse = data?.response || ''; 

            if (!chatId) {
                const newChatId = await createNewChat([...updatedContents, createChatMessage("model", response)], title);  
                setChatId(newChatId);  
                router.push(`/chat/${newChatId}`);
            } else {
                await handleNewMessage(chatId, input, response); 
            }

            setContents((prevMessages) => [
                ...prevMessages,
                { role: "user", parts: [{ text: input }] },
                { role: "model", parts: [{ text: response }] },
            ]);

            // Clear input after sending the message
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Sidebar />

            <div className="flex-1 pt-8 pb-8 px-4 md:px-8 lg:px-16 xl:px-40">
                <div className="shadow-lg rounded-lg p-6 h-full relative ">
                    <h2 className="text-2xl font-bold mb-4 text-white">😊 Hello, How can I help you?</h2>

                    <div className="flex flex-col py-8 md:py-12 space-y-4 overflow-y-auto h-[calc(100%-7rem)]">
                        {contents && contents.map((msg, index) => (
                            <div key={index} className={`flex items-start mb-4 ${msg.role === 'model' ? 'justify-start' : 'justify-end'}`}>
                                <div className={`p-4 md:p-6 text-slate-400 rounded-lg w-[75%] lg:w-[85%] ${msg.role === 'model' ? 'bg-gray-800' : 'bg-blue-600'}`}>
                                    <p className="font-semibold mb-1">{msg.role === 'model' ? 'Response:' : 'You:'}</p>
                                    <Markdown>{msg.parts[0].text}</Markdown>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex mt-4 absolute bottom-6 left-6 right-6 items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask questions, or type / for commands"
                            className="flex-1 border border-gray-700 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow duration-300"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg ml-3 hover:from-blue-600 hover:to-purple-600 transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                        >
                            <IoSend size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;