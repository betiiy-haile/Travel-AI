// "use client";

// import React, { useState } from "react";
// import { IoSend } from "react-icons/io5";
// // import { createNewChat, handleNewMessage } from "@/actions/chats";
// import { useRouter } from "next/navigation";
// import Markdown from "markdown-to-jsx";
// // import { createClient } from '@/utils/supabase/client';

// interface Message {
//   parts: { text: string }[];
//   role: "user" | "model";
// }

// const ChatPage = () => {
//   const [contents, setContents] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const router = useRouter();

//   const createChatMessage = (role: "user" | "model", text: string) => ({
//     role,
//     parts: [{ text }],
//   });

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const newMessage = createChatMessage("user", input);
//     const updatedContents = [...contents, newMessage];

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ contents: updatedContents, message: input }),
//       });

//       const { response, title } = await res.json();
//       console.log("title response from gemini", title);
//       // const modelResponse = data?.response || '';

//       //   if (!chatId) {
//       //     const newChatId = await createNewChat(
//       //       [...updatedContents, createChatMessage("model", response)],
//       //       title
//       //     );
//       //     setChatId(newChatId);
//       //     router.push(`/chat/${newChatId}`);
//       //   } else {
//       //     await handleNewMessage(chatId, input, response);
//       //   }

//       setContents((prevMessages) => [
//         ...prevMessages,
//         { role: "user", parts: [{ text: input }] },
//         { role: "model", parts: [{ text: response }] },
//       ]);

//       // Clear input after sending the message
//       setInput("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen">

//       <div className="flex-1 pt-8 pb-8 px-4 md:px-8 lg:px-16 xl:px-40">
//         <div className="shadow-lg rounded-lg p-6 h-full relative ">
//           <div className="flex  justify-between items-center">
//             <h2 className="text-2xl font-bold mb-4 text-white">
//               😊 Hello, How can I help you?
//             </h2>
//             <button
//               onClick={() => router.push("/search")}
//               className="px-6 py-2 rounded-lg button-gradient "
//             >
//               Search Place{" "}
//             </button>
//           </div>

//           <div className="flex flex-col py-8 md:py-12 space-y-4 overflow-y-auto h-[calc(100%-7rem)]">
//             {contents &&
//               contents.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-start mb-4 ${
//                     msg.role === "model" ? "justify-start" : "justify-end"
//                   }`}
//                 >
//                   <div
//                     className={`p-4 md:p-6 text-slate-400 rounded-lg w-[75%] lg:w-[85%] ${
//                       msg.role === "model" ? "bg-gray-800" : "bg-blue-600"
//                     }`}
//                   >
//                     {/* <p className="font-semibold mb-1">
//                       {msg.role === "model" ? "Response:" : "You:"}
//                     </p> */}
//                     <Markdown>{msg.parts[0].text}</Markdown>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           <div className="flex mt-4 absolute bottom-6 left-6 right-6 items-center">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask questions, or type / for commands"
//               className="flex-1 border border-gray-700 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow duration-300"
//             />
//             <button
//               onClick={handleSend}
//               className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg ml-3 hover:from-blue-600 hover:to-purple-600 transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
//             >
//               <IoSend size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Markdown from "markdown-to-jsx";

interface Message {
  parts: { text: string }[];
  role: "user" | "model";
}

interface Place {
  id?: string;
  name: string;
  address?: string;
  location?: { lat: number; lng: number };
  distanceMeters?: number;
}

const ChatPage = () => {
  const [contents, setContents] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // 1️⃣ Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Geolocation error:", error);
        }
      );
    }
  }, []);

  const createChatMessage = (role: "user" | "model", text: string) => ({
    role,
    parts: [{ text }],
  });

  const handleSend = async () => {
    if (!input.trim() || !userLocation) return;

    const newMessage = createChatMessage("user", input);
    const updatedContents = [...contents, newMessage];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: updatedContents,
          message: input,
          lat: userLocation.lat,
          lng: userLocation.lng,
        }),
      });

      const { response, nearbyPlaces: places } = await res.json();
      setNearbyPlaces(places || []);

      setContents((prevMessages) => [
        ...prevMessages,
        { role: "user", parts: [{ text: input }] },
        { role: "model", parts: [{ text: response }] },
      ]);

      setInput("");

      // Scroll to bottom after message
      setTimeout(() => {
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[80vh] overflow-auto">
      <div className="flex-1 pt-8 pb-8 px-4 md:px-8 lg:px-16 xl:px-40">
        <div className="shadow-lg rounded-lg p-6 h-full relative">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">
              😊 Hello, How can I help you?
            </h2>
            <button
              onClick={() => router.push("/search")}
              className="px-6 py-2 rounded-lg button-gradient"
            >
              Search Place
            </button>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="flex flex-col py-8 md:py-12 space-y-4 overflow-y-auto h-[calc(100%-7rem)]"
          >
            {contents.map((msg, index) => {
              let messageText = msg.parts[0].text;

              // If model response and we have nearbyPlaces, replace place names with links
              if (msg.role === "model" && nearbyPlaces.length > 0) {
                nearbyPlaces.forEach((place) => {
                  if (place.location && place.name) {
                    const placeLink = `https://www.openstreetmap.org/?mlat=${place.location.lat}&mlon=${place.location.lng}#map=18/${place.location.lat}/${place.location.lng}`;
                    // Replace exact match of place name with markdown link
                    const regex = new RegExp(`\\b${place.name}\\b`, "g");
                    messageText = messageText.replace(
                      regex,
                      `[${place.name}](${placeLink})`
                    );
                  }
                });
              }

              return (
                <div
                  key={index}
                  className={`flex items-start mb-4 ${
                    msg.role === "model" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`p-4 md:p-6 text-slate-400 rounded-lg w-[75%] lg:w-[85%] ${
                      msg.role === "model" ? "bg-gray-800" : "bg-blue-600"
                    }`}
                  >
                    <Markdown>{messageText}</Markdown>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="flex mt-4 absolute bottom-6 left-6 right-6 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask questions, or type / for commands"
              className="flex-1 border border-gray-700 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow duration-300"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
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
