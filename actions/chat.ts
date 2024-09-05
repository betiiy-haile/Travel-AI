// "use server";
// import { getDocumentBlocksbyId } from "app/(landing)/actions";
// import { createClient } from "../utils/supabase/server";
// import { autoTag } from "./openai";

// export async function insertBlock(block: any) {
//     try {
//         const supabase = await createClient();
//         const user = await supabase.auth.getUser();
//         const { id, content } = block;
//         const { data, error } = await supabase
//             .from("block")
//             .upsert([
//                 { id, content: content[0]?.text, user_id: user?.data.user?.id },
//             ]);
//         if (error) {
//             console.error(error);
//             return JSON.stringify(error);
//         }
//         return data;
//     } catch (e) {
//         console.error(e);
//         return JSON.stringify(e);
//     }
// }

// export async function deleteBlock(id: string) {
//     try {
//         const supabase = await createClient();
//         const { data, error } = await supabase.from("block").delete().eq("id", id);
//         if (error) {
//             console.error(error);
//             return JSON.stringify(error);
//         }
//         return data;
//     } catch (e) {
//         console.error(e);
//         return JSON.stringify(e);
//     }
// }
