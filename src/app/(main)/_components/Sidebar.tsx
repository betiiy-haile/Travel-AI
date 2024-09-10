'use client'

import React, { useEffect, useState } from 'react';
import { MdOutlineSearch, MdLogout, MdOutlineAdd } from "react-icons/md";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { getAllChats } from '@/actions/chats';
import { useRouter } from "next/navigation"
import { signOut } from '@/actions/auth'
import LogoutModal from './LogoutModal';
import ChatList from './ChatLists';
import { createClient } from '@/utils/supabase/client';

interface Message {
    parts: { text: string }[];
    role: 'user' | 'model';
}

interface Chat {
    id: string,
    created_at: string,
    name: string,
    chat: Message[],
    user_id: string
}


const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [chats, setChats] = useState<Chat[]>([])
    const [showLogoutModal, setShowLogoutModal] = useState(false); 
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [avatorPic, setAvatorPic] = useState('');
    const supabase = createClient();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            setUserName(user?.user_metadata?.full_name || '');
            setAvatorPic(user?.user_metadata?.avatar_url || '');
            if (error || !user) {
                router.push('/login'); // Redirect to login if there's no session
            }
        };

        checkAuth();
    }, []);

    const fetchChats = async () => {
        const { data, error } = await getAllChats();
        console.log("data", data)
        setChats(data as any || [])
    }

    useEffect(() => {
        fetchChats();
    }, [])


    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true); 
    };

    const handleLogoutConfirm = async () => {
        setShowLogoutModal(false); 
        const res = await signOut();
        router.push('/login'); // Redirect to login after successful logout
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false); // Close the modal
    };

    return (
        <div className={`h-screen bg-gray-800  text-white p-5 transition-all duration-300 ${isExpanded ? 'w-[340px]' : 'w-24'}`}>
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
            <ChatList filteredChats={filteredChats as Chat[]} isExpanded={isExpanded} fetchChats={fetchChats}/>
            <div className="mt-4 flex flex-col gap-4">
                <div className='flex items-center gap-4 w-full'>
                    {/* <div className='bg-green-700 flex items-center justify-center p-4 w-12 h-12 rounded-full'>B</div> */}
                    <img
                        src={avatorPic}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full"
                    />
                    {
                        isExpanded && <span>{userName}</span>
                    }
                </div>
                <button className="button-gradient text-white p-2 rounded-lg w-full  transition" onClick={() => router.push('/chat')}>
                    <span className="flex items-center justify-center gap-2"> <MdOutlineAdd className='text-2xl p-1' /> {isExpanded && 'New Chat'}</span>
                </button>
                <button className=" text-red-500 text-center p-2 rounded-lg w-full transition bg-transparent border border-red-500 hover:scale-105" onClick={handleLogoutClick}>
                    <span className="flex items-center justify-center gap-2"> <MdLogout className='text-2xl p-1'/> {isExpanded && 'Logout'}</span> 
                </button>
            </div>

            {showLogoutModal && (
                <LogoutModal
                    onConfirm={handleLogoutConfirm}
                    onCancel={handleLogoutCancel}
                />
            )}

        </div>
    );
};

export default Sidebar;