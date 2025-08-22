import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "../config/axiosInstance";

export const useRequestStore = create<chatsState>()(
    devtools(
        (set) => ({
            chats: [] as ChatBody[],
            answerResult: "",
            transcribedText: "",
            aiAnswer: null,
            getAllChats: async () => {
                const response = await axiosInstance.get<ChatBody[]>("/");
                const chats = response.data;
                set(() => ({ chats }), false, { type: "getAllChats", payload: chats });
            },
            sendRequest: async (
                userName: string,
                textMessage?: string,
                audioRequest?: Blob,
                voiceAnswer?: boolean
            ) => {
                if (!textMessage && !audioRequest) {
                    throw new Error("Either requestText or audioRequest must be provided");
                }
                try {
                    if (textMessage) {
                        await axiosInstance.post<ChatBody>("/text", {
                            textMessage: textMessage,
                            userName: userName,
                        });

                        set(
                            {
                                answerResult:
                                    "Your request successfully send and saved in database",
                            },
                            false,
                            {
                                type: "sendRequest",
                                payload: "Your request successfully send and saved in database",
                            }
                        );
                    } else {
                        const formData = new FormData();
                        if (audioRequest) {
                            formData.append("audio", audioRequest, "record.mp3");
                        }
                        formData.append("userName", userName);
                        formData.append("voiceAnswer", String(voiceAnswer ?? false));

                        const response = await axiosInstance.post<ChatBody>("/stt", formData, {
                            headers: { "Content-Type": "multipart/form-data" },
                        });

                        set({ transcribedText: response.data.textMessage }, false, {
                            type: "sendRequest",
                            payload: response.data.textMessage,
                        });
                    }
                } catch (error: any) {
                    console.error("Error sending request:", error);
                    set(
                        {
                            answerResult:
                                error?.response?.data?.message || "Failed to send request",
                        },
                        false,
                        {
                            type: "sendRequest",
                            payload: error?.response?.data?.message || "Failed to send request",
                        }
                    );
                }
            },
        }),
        {
            store: "requestsStore",
            enabled: process.env.NODE_ENV === "development",
        }
    )
);
