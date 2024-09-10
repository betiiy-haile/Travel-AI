'use client'

import React, { useEffect, useState, useRef } from 'react';
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
  const [title, setTitle] = useState<string>("😊 Hello, How can I help you?");

  const { chatId } = useParams();
  useEffect(() => {
    const fetchChat = async () => {
      if (chatId) {
        const { chat, name } = await fetchChatHistory(chatId as string);
        setTitle(name || "😊 Hello, How can I help you?");
        setContents(chat as Message[]);
      }
    }   
   fetchChat();
  }, [chatId])

  // console.log("contents", contents)

  const handleSend = async () => {
    if (!input.trim()) return;

    // console.log("handle send message", input)
    const updatedContents = JSON.parse(JSON.stringify([...contents, { role: "user", parts: [{ text: input }] }]));
    // console.log("updated contents", updatedContents)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents: updatedContents, message: input }),
      });

      console.log("res from gemini api", res)
      const data = await res.json();
      const modelResponse = data?.response || '';
      

      await handleNewMessage(chatId as string, input, modelResponse);

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

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [contents]);


  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1  pb-8 px-40 flex flex-col">
        <div className="shadow-lg rounded-lg p-6 h-full relative flex flex-col justify-between ">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>

          <div className="flex-1 py-24 overflow-y-auto pr-4" style={{ scrollbarWidth: 'none' }}>
            {contents && contents.map((msg, index) => (
              <div key={index} className={`flex items-start mb-4 ${msg.role === 'model' ? 'justify-start' : 'justify-end'}`}>
                <div key={index} className={`p-6 text-slate-400 rounded-lg w-[85%] ${msg.role === 'model' ? 'bg-gray-800' : 'bg-blue-600'}`}>
                  <p className="font-semibold mb-1">{msg.role === 'model' ? 'Response:' : 'You:'}</p>
                  <Markdown >{msg.parts[0].text}</Markdown>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          <div className="flex items-center mt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask questions, or type / for commands"
              className="flex-1 border border-gray-600 rounded-lg p-3 bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
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