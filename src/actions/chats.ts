"use server";
import { createClient } from "@/utils/supabase/server";

interface Message {
  parts: { text: string }[];
  role: "user" | "model";
}

export const getAllChats = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .order("id", { ascending: false });
  return { data, error };
};

export const createNewChat = async (messages: Message[], name?: string) => {
  const defaultName = name || "New Chat";
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  // Insert the new chat with the user's ID
  const { data, error } = await supabase
    .from("chats")
    .insert([{ chat: messages, name: defaultName, user_id: userId }])
    .select("id"); // Request to return the 'id' of the newly inserted row

  if (error) {
    console.log("Error saving chat History:", error);
    throw new Error("Failed to create chat");
  }

  console.log("data", data);
  return data ? data[0].id : null; // Return the 'id' of the newly created chat
};

export const saveChatHistory = async (messages: Message[]) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chats")
    .insert([{ chat: messages }]);

  if (error) {
    console.error("Error saving chat history:", error);
  } else {
    console.log("Chat history saved:", data);
  }
};

export const fetchChatHistory = async (chatId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .single();

  console.log("chats from fetchchats", data);

  if (error) {
    throw new Error(`Error fetching chat: ${error.message}`);
  }

  return data || [];
};

export const updateChatHistory = async (
  chatId: string,
  updatedChat: Message[]
) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("chats")
    .update({ chat: updatedChat })
    .eq("id", chatId);

  if (error) {
    throw new Error(`Error updating chat: ${error.message}`);
  }
};

export const handleNewMessage = async (
  chatId: string,
  userMessage: string,
  modelResponse: string
) => {
  try {
    const { chat: existingChat } = await fetchChatHistory(chatId);

    console.log("existingChat", existingChat);

    const newUserMessage = { role: "user", parts: [{ text: userMessage }] };
    const newModelMessage = { role: "model", parts: [{ text: modelResponse }] };

    const updatedChat = [...existingChat, newUserMessage, newModelMessage];

    await updateChatHistory(chatId, updatedChat);
  } catch (error) {
    console.error("Error handling new message:", error);
    throw error;
  }
};

export const deleteChat = async (chatId: string) => {
  const supabase = await createClient();

  // Get the currently logged-in user's ID
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  const userId = user?.id;

  if (authError || !userId) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("chats").delete().eq("id", chatId);

  if (error) {
    throw new Error(`Error deleting chat: ${error.message}`);
  }

  return { success: true, message: "Chat deleted successfully" };
};
