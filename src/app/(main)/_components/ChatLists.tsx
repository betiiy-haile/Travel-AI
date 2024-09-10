import { useState } from 'react';
import Link from 'next/link'; // Adjust import based on your routing library
import { FaTrash } from 'react-icons/fa'; // Using react-icons for the trash icon
import { formatDate } from "@/utils/index";
import { deleteChat } from '@/actions/chats';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

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

const ChatList = ({ filteredChats, isExpanded, fetchChats }: { filteredChats: Chat[], isExpanded: boolean, fetchChats: () => void }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [chatToDelete, setChatToDelete] = useState<string | null>(null);
    const { chatId } = useParams();
    const router = useRouter();

    const handleDeleteClick = (chatId: string) => {
        setChatToDelete(chatId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        console.log(`Deleting chat with ID: ${chatToDelete}`);
        const res = await deleteChat(chatToDelete as string);
        console.log("res from delete chat", res)
        setShowDeleteModal(false);
        fetchChats();
        if(chatId === chatToDelete) {
            router.push('/chat');
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    

    return (
        <div className="space-y-2 overflow-y-auto h-[calc(100vh-320px)]">
            {filteredChats.length === 0 && (
                <p className={`text-gray-400 text-sm text-center py-4`}>No chats found</p>
            )}
            {filteredChats.map((chat, index) => (
                <div key={index} className="flex items-center gap-4 rounded-lg hover:bg-gray-700 p-2  justify-between">
                    <Link
                        href={`/chat/${chat.id}`}
                        className="block flex-1  transition w-full cursor-pointer"
                    >
                        <div className="flex justify-between mb-1">
                            <span className={`${isExpanded ? 'block' : 'hidden'}`}>{chat.name}</span>
                            <span className="text-gray-400 text-sm">{formatDate(chat.created_at)}</span>
                        </div>
                        <p className={`text-gray-300 text-sm ${isExpanded ? 'block' : 'hidden'}`}>
                            {chat.chat[0].parts[0].text}
                        </p>
                    </Link>
                    <button
                        onClick={() => handleDeleteClick(chat.id)}
                        className=" text-red-500 hover:text-red-700 transition"
                    >
                        <FaTrash />
                    </button>
                </div>
            ))}

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
                    <div className="bg-gray-800 px-16 py-8 rounded-xl shadow-xl transform transition-all duration-300 scale-105">
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">Confirm Delete</h2>
                        <p className="mb-6 text-gray-400 text-center">Are you sure you want to delete this chat?</p>
                        <div className="flex justify-center gap-6 mt-6">
                            <button
                                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-lg hover:scale-105 hover:from-red-700 hover:to-red-600 transition-transform duration-200"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-gradient-to-r from-gray-300 to-gray-400 text-black px-6 py-2 rounded-lg hover:scale-105 hover:from-gray-400 hover:to-gray-500 transition-transform duration-200"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatList;