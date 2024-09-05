'use client'

import React, { useState } from 'react';
import { MdOutlineSearch } from "react-icons/md";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";


const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const chats = [
        { title: "Cosmic Evolution", time: "9:34 PM", description: "Some 15 billion years ago the universe emerged from a hot, dense sea of..." },
        { title: "Warning Messages Samples", time: "Now", description: "Sure! Here are three different versions of 404 error messages for an ecommerce..." },
        { title: "Competitive Analysis research", time: "Thu", description: "A competitive analysis of restaurant delivery mobile applications reveals key insights..." },
        { title: "User Personas Research", time: "Mon", description: "User persona research is a process of creating fictional but realistic representation..." },
        { title: "Call To Action texts", time: "17 Oct", description: "Here are a few examples of CTA button text 1. 'Get started now'..." },
     ];

    const filteredChats = chats.filter(chat =>
        chat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`h-screen bg-gray-800  text-white p-5 transition-all duration-300 ${isExpanded ? 'w-80' : 'w-24'}`}>
            <div className='flex items-center justify-center mb-4'>
                <h2 className={`text-lg flex-1 font-bold  transition-opacity duration-300 ${isExpanded ? 'visible' : 'hidden'}`}>My Chats</h2>
                {isExpanded ? <GoSidebarExpand size={32} onClick={toggleSidebar} className="text-gray-400" /> : <GoSidebarCollapse size={32} onClick={toggleSidebar} className="text-gray-400" />}
            </div>
            <div className="flex items-center justify-center mb-4">
                {
                    isExpanded ? <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}
                    /> : <MdOutlineSearch onClick={toggleSidebar} className="text-gray-400" size={32} />
                }
                
            </div>
            <div className="space-y-2 overflow-y-auto h-[calc(100vh-270px)]">
                {filteredChats.map((chat, index) => (
                    <div key={index} className="p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition">
                        <div className="flex justify-between mb-1">
                            <span className={`${isExpanded ? 'block' : 'hidden'}`}>{chat.title}</span>
                            <span className="text-gray-400 text-sm">{chat.time}</span>
                        </div>
                        <p className={`text-gray-300 text-sm ${isExpanded ? 'block' : 'hidden'}`}>{chat.description}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex flex-col gap-4">
                <div className='flex items-center gap-4 w-full'>
                    {/* user profile images goes here */}
                    <div className='bg-green-700 flex items-center justify-center p-4 w-12 h-12 rounded-full'>B</div>
                    {
                        isExpanded && <span>Betelhem Haile</span>
                    }
                </div>
                <button className="button-gradient text-white p-2 rounded-lg w-full  transition" onClick={toggleSidebar}>
                    {isExpanded ? '+ New Chat' : '+'}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;