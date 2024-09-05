'use client'

import React, { useState } from 'react';
import Sidebar from "../_components/Sidebar";
import { IoSend } from 'react-icons/io5';

import Markdown from 'markdown-to-jsx'

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { text: 'How do you define usability testing in UX design?', type: 'user' },
        { text: 'Usability testing is a technique used in UX design to evaluate a product by testing it with real users. The purpose is to identify usability problems, collect data, and assess user satisfaction.', type: 'response' },
       
    ]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add user message to state
        setMessages([...messages, { text: input, type: 'user' }]);
        setInput('');

        // Send message to API
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });
            console.log("res", res)
            const data = await res.json();
            console.log("data from the gemini", data)

            // Add response message to state
            setMessages((prevMessages) => [...prevMessages, { text: data?.response, type: 'response' }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex-1 pt-16 pb-8 px-40">
                <div className="shadow-lg rounded-lg p-6 h-full relative ">
                    <h2 className="text-2xl font-bold mb-4 text-white">Chat with Gemini</h2>
                    <div className="flex flex-col space-y-4 overflow-y-auto h-[calc(100%-7rem)]">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start ${msg.type === 'response' ? 'bg-gray-700' : 'bg-blue-600'} p-3 rounded-lg`}>
                                <p className="font-semibold text-white">{msg.type === 'response' ? 'Response:' : 'You:'}</p>
                                { /*<p>{msg.text}</p> */ }
                                <Markdown>{msg.text}</Markdown>
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