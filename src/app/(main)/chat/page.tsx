'use client'

import React, { useState } from 'react';
import Sidebar from "../_components/Sidebar";
import { IoSend } from 'react-icons/io5';
import { saveChatHistory, handleNewMessage } from '@/actions/chats';
import Markdown from 'markdown-to-jsx'

interface Message {
    parts: { text: string }[];
    role: 'user' | 'model';
}

const ChatPage = () => {
    const [contents, setContents] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const createChatMessage = (role: string, text: string) => ({
        role,
        parts: [{ text }]
    });

    // const handleSend = async () => {
    //     if (!input.trim()) return;

        // const newMessage = createChatMessage("user", input);
        // const updatedContents = JSON.parse(JSON.stringify([...contents, newMessage])); // Ensure plain objects

        // setContents(updatedContents);

    //     try {
    //         // Insert the chat to Supabase
    //         const addChatResponse = await saveChatHistory(updatedContents); // Use updatedContents here
    //         console.log("Response from addChat:", addChatResponse);
            

    //         // Clear the input
    //         setInput('');

    //         // Send the user message to your chat API (e.g., Gemini)
    //         const res = await fetch('/api/chat', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ contents: updatedContents, message: input }),
    //         });

    //         const data = await res.json();
    //         console.log("Response from Gemini:", data);

    //         // Add the model's response to the chat
    //         setContents((prevMessages) => [
    //             ...prevMessages,
    //             createChatMessage("model", data?.response),
    //         ] as Message[]);
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //     }
    // };


    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessage = createChatMessage("user", input);
        const updatedContents = JSON.parse(JSON.stringify([...contents, newMessage])); // Ensure plain objects

        // setContents(updatedContents);

        try {
            // Send the user message to your chat API (e.g., Gemini)
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contents: updatedContents, message: input }),
            });

            const data = await res.json();
            const modelResponse = data?.response || ''; // Get the model's response

            // Update chat history in the database
            await handleNewMessage(3, input, modelResponse); // Replace with the actual chat ID

            // Clear the input
            setInput('');

            // Optionally, update local state to reflect the new messages
            setContents((prevMessages) => [
                ...prevMessages,
                { role: "user", parts: [{ text: input }] },
                { role: "model", parts: [{ text: modelResponse }] },
            ]);
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
                        {contents.map((msg, index) => (
                            <div key={index} className={`flex items-start ${msg.role == 'model' ? 'bg-gray-700' : 'bg-blue-600'} p-3 rounded-lg`}>
                                <p className="font-semibold text-white">{msg.role == 'model' ? 'Response:' : 'You:'}</p>
                                { /*<p>{msg.text}</p> */ }
                                <Markdown>{msg.parts[0].text}</Markdown>
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