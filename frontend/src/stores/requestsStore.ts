import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "../config/axiosInstance";

export const useRequestStore = create<chatsState>()(
    devtools(
        (set) => ({
            chats: [] as ChatBody[],

            getAllChats: async () => {
                const response = await axiosInstance.get<ChatBody[]>("/");
                const chats = response.data;
                set(() => ({ chats }), false, { type: "getAllChats", payload: chats });
            },
            sendRequest: async (requestText: string, username: string, voiceAnswer: boolean) => {
                const response = await axiosInstance.post<ChatBody>("/send", {
                    requestText,
                    username,
                    voiceAnswer,
                });
                const newChat = response.data;
                set(
                    (state) => ({
                        chats: [...state.chats, newChat],
                    }),
                    false,
                    { type: "sendRequest", payload: newChat }
                );
            },
        }),
        {
            store: "requestsStore",
            enabled: process.env.NODE_ENV === "development",
        }
    )
);
