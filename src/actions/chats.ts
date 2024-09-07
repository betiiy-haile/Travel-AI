'use server'
import { createClient } from "@/utils/supabase/server";

// export const getChats = async () => {
//     const supabase = await createClient();

//     const { data, error } = await supabase
//         .from("chats")
//         .select("*")
//         .order("id", { ascending: false });
//     return { data, error };
// }


export const saveChatHistory = async (messages: any) => {
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


export const fetchChatHistory = async (chatId: number) => {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('chats')
        .select('chat')
        .eq('id', chatId)
        .single();

    if (error) {
        throw new Error(`Error fetching chat: ${error.message}`);
    }

    return data.chat || [];
};


export const updateChatHistory = async (chatId: number, updatedChat: any[]) => {
    const supabase = await createClient()
    const { error } = await supabase
        .from('chats')
        .update({ chat: updatedChat })
        .eq('id', chatId);

    if (error) {
        throw new Error(`Error updating chat: ${error.message}`);
    }
};


export const handleNewMessage = async (chatId: number, userMessage: string, modelResponse: string) => {
    const supabase = await createClient()
    try {
        const existingChat = await fetchChatHistory(chatId);

        const newUserMessage = { role: "user", parts: [{ text: userMessage }] };
        const newModelMessage = { role: "model", parts: [{ text: modelResponse }] };

        const updatedChat = [...existingChat, newUserMessage, newModelMessage];

        await updateChatHistory(chatId, updatedChat);
    } catch (error) {
        console.error('Error handling new message:', error);
        throw error; 
    }
};


