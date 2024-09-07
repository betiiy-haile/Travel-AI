'use server'
import { createClient } from "@/utils/supabase/server";

interface Message {
    parts: { text: string }[];
    role: 'user' | 'model';
}

// export const getChats = async () => {
//     const supabase = await createClient();

//     const { data, error } = await supabase
//         .from("chats")
//         .select("*")
//         .order("id", { ascending: false });
//     return { data, error };
// }


export const createNewChat = async (messages: Message[]) => {
    const defaultName = "New Chat";
    const supabase = await createClient();

    // Insert the new chat and request the 'id' of the inserted row
    const { data, error } = await supabase
        .from('chats')
        .insert([{ chat: messages, name: defaultName }])
        .select('id')  // Request to return the 'id' of the newly inserted row

    if (error) {
        console.log("Error saving chat History:", error);
        throw new Error("Failed to create chat");
    }

    console.log("data", data);
    return data ? data[0].id : null;  // Return the 'id' of the newly created chat
};


export const saveChatHistory = async (messages: Message[]) => {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('chats')
        .insert([
            { chat: messages }
        ])

    if (error) {
        console.error('Error saving chat history:', error)
    } else {
        console.log('Chat history saved:', data)
    }

     
}


export const fetchChatHistory = async (chatId: String) => {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('chats')
        .select('chat')
        .eq('id', chatId)
        .single();

    console.log("chats", data)

    if (error) {
        throw new Error(`Error fetching chat: ${error.message}`);
    }

    return data || [];
};


export const updateChatHistory = async (chatId: string, updatedChat: any[]) => {
    const supabase = await createClient()
    const { error } = await supabase
        .from('chats')
        .update({ chat: updatedChat })
        .eq('id', chatId);

    if (error) {
        throw new Error(`Error updating chat: ${error.message}`);
    }
};


export const handleNewMessage = async (chatId: string, userMessage: string, modelResponse: string) => {
    const supabase = await createClient()
    try {
        const { chat: existingChat } = await fetchChatHistory(chatId);

        const newUserMessage = { role: "user", parts: [{ text: userMessage }] };
        const newModelMessage = { role: "model", parts: [{ text: modelResponse }] };

        const updatedChat = [...existingChat, newUserMessage, newModelMessage];

        await updateChatHistory(chatId, updatedChat);
    } catch (error) {
        console.error('Error handling new message:', error);
        throw error; 
    }
};


