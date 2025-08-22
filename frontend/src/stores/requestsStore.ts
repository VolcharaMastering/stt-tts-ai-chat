import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "../config/axiosInstance";
import { socket } from "../config/socket";
import { base64ToBlob } from "../utils/base64";

export const useRequestStore = create<chatsState>()(
    devtools(
        (set) => ({
            chats: [] as ChatBody[],
            answerResult: "",
            transcribedText: "",
            aiAnswer: null,
            loadingTranscribe: false,
            loadingGpt: false,
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
                                loadingTranscribe: false,
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
                        set({ loadingTranscribe: true, transcribedText: "" }, false, {
                            type: "sendRequest",
                            payload: "",
                        });
                        const response = await axiosInstance.post<ChatBody>("/stt", formData, {
                            headers: { "Content-Type": "multipart/form-data" },
                        });

                        console.log("Response from /stt:", response.data); // посмотри ключи
                        set(
                            {
                                transcribedText:
                                    response.data.textMessage ?? response.data.textMessage ?? "",
                                loadingTranscribe: false,
                            },
                            false,
                            {
                                type: "sendRequest",
                                payload:
                                    response.data.textMessage ?? response.data.textMessage ?? "",
                            }
                        );
                    }
                } catch (error: any) {
                    console.error("Error sending request:", error);
                    set(
                        {
                            answerResult:
                                error?.response?.data?.message || "Failed to send request",
                            loadingTranscribe: false,
                        },
                        false,
                        {
                            type: "sendRequest",
                            payload: error?.response?.data?.message || "Failed to send request",
                        }
                    );
                }

                if (!userName) throw new Error("User name is required for socket connection");

                // if socket is not connected, connect and join room
                if (!socket.connected) {
                    socket.connect();

                    socket.once("connect", () => {
                        console.log(
                            "Socket connected (once):",
                            socket.id,
                            "joining room:",
                            userName
                        );
                        socket.emit("join", userName);

                        // log connection errors
                        socket.on("connect_error", (err) => {
                            console.error("Socket connect_error:", err);
                            set({ loadingGpt: false }, false, {
                                type: "socketConnectError",
                                payload: err,
                            });
                        });
                    });
                } else {
                    // re-join room if already connected
                    console.log("Socket already connected, joining:", userName);
                    socket.emit("join", userName);
                }
                set({ loadingGpt: true }, false, { type: "socketConnect", payload: userName });
                // disconnect previous listeners to avoid duplicates
                socket.off("gptAnswer");
                socket.on("gptAnswer", (data: { text: string; audio?: string }) => {
                    console.log("Received gptAnswer via socket.io", data);

                    if (data.audio) {
                        try {
                            const blob = base64ToBlob(data.audio, "audio/mpeg");
                            set(
                                {
                                    answerResult: data.text,
                                    aiAnswer: blob,
                                    loadingGpt: false,
                                },
                                false,
                                { type: "gptAnswer", payload: data }
                            );
                        } catch (e) {
                            console.error("Failed to convert base64 audio to Blob:", e);
                            set(
                                {
                                    answerResult: data.text,
                                    aiAnswer: null,
                                    loadingGpt: false,
                                },
                                false,
                                { type: "gptAnswer", payload: data }
                            );
                        }
                    } else {
                        set(
                            {
                                answerResult: data.text,
                                aiAnswer: null,
                                loadingGpt: false,
                            },
                            false,
                            { type: "gptAnswer", payload: data }
                        );
                    }
                });
            },
        }),
        {
            store: "requestsStore",
            enabled: process.env.NODE_ENV === "development",
        }
    )
);
