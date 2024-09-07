'use client'

import React, { useEffect, useState } from 'react';
import Sidebar from '../../_components/Sidebar';
import { IoSend } from 'react-icons/io5';
import { handleNewMessage, fetchChatHistory } from '@/actions/chats';
import { useParams } from 'next/navigation';
import Markdown from 'markdown-to-jsx'

interface Message {
  parts: { text: string }[];
  role: 'user' | 'model';
}

const ChatDetailPage = () => {
  const [contents, setContents] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const { chatId } = useParams();
  useEffect(() => {
    const fetchChat = async () => {
      if (chatId) {
        const { chat } = await fetchChatHistory(chatId as string);
        setContents(chat as Message[]);
      }
    }   
   fetchChat();
  }, [chatId])

  console.log("contents", contents)

  const handleSend = async () => {
    if (!input.trim()) return;

    const updatedContents = JSON.parse(JSON.stringify([...contents, { role: "user", parts: [{ text: input }] }]));


    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents: updatedContents, message: input }),
      });

      const data = await res.json();
      const modelResponse = data?.response || '';

      await handleNewMessage("4", input, modelResponse);

      setInput('');
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
                { /*<p>{msg.text}</p> */}
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

export default ChatDetailPage;