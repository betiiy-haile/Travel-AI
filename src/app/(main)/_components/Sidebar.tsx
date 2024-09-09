'use client'

import React, { useEffect, useState } from 'react';
import { MdOutlineSearch, MdLogout, MdOutlineAdd } from "react-icons/md";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { getAllChats } from '@/actions/chats';
import Link from 'next/link';
import { useRouter } from "next/navigation"
import { signOut } from '@/actions/auth';

interface Message {
    parts: { text: string }[];
    role: 'user' | 'model';
}

interface Chat {
    id: string,
    created_At: string,
    name: string,
    chat: Message[]
}


const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [chats, setChats] = useState<Chat[]>([])
    const router = useRouter();

    useEffect(() => {
        const fetchChats = async () => {
            const { data, error } = await getAllChats();
            console.log("data", data)
            setChats(data as any || [])
        }
        fetchChats();
    }, [])


    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLogout = async () => {
        const res = await signOut()
    }

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
            <div className="space-y-2 overflow-y-auto h-[calc(100vh-320px)]">
                {filteredChats.map((chat: any, index: any) => (
                
                    <Link
                        href={`/chat/${chat.id}`}
                        key={index}
                        className="block p-2 rounded-lg  hover:bg-gray-700 transition w-full cursor-pointer"
                    >
                        <div className="flex justify-between mb-1">
                            <span className={`${isExpanded ? 'block' : 'hidden'}`}>{chat.name}</span>
                            <span className="text-gray-400 text-sm">{chat.created_At}</span>
                        </div>
                        <p className={`text-gray-300 text-sm ${isExpanded ? 'block' : 'hidden'}`}>{chat.chat[0].parts[0].text}</p>
                    </Link>
                ))}
            </div>
            <div className="mt-4 flex flex-col gap-4">
                <div className='flex items-center gap-4 w-full'>
                    <div className='bg-green-700 flex items-center justify-center p-4 w-12 h-12 rounded-full'>B</div>
                    {
                        isExpanded && <span>Betelhem Haile</span>
                    }
                </div>
                <button className="button-gradient text-white p-2 rounded-lg w-full  transition" onClick={() => router.push('/chat')}>
                    <span className="flex items-center justify-center gap-2"> <MdOutlineAdd className='text-2xl p-1' /> {isExpanded && 'New Chat'}</span>
                </button>
                <button className=" text-red-500 text-center p-2 rounded-lg w-full transition bg-transparent border border-red-500 hover:scale-105" onClick={handleLogout}>
                    <span className="flex items-center justify-center gap-2"> <MdLogout className='text-2xl p-1'/> {isExpanded && 'Logout'}</span> 
                </button>
            </div>
        </div>
    );
};

export default Sidebar;