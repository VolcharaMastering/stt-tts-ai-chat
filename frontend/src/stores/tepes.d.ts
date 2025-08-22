interface ChatBody {
    _id: string;
    userName: string;
    textMessage?: string;
    textAnswer?: string;
    audioAnswer?: Blob;
}

interface chatsState {
    chats: ChatBody[];
    answerResult: string;
    transcribedText: string | null;
    aiAnswer: Blob | null;
    getAllChats: () => Promise<void>;
    sendRequest: (
        userName: string,
        textMessage?: string,
        audioRequest?: Blob,
        voiceAnswer?: boolean
    ) => Promise<void>;
}
