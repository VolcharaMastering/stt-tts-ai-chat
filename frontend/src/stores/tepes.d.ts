interface ChatBody {
    _id: string;
    userName: string;
    textMessage: string;
    linkToAudio: string;
    date: Date;
    textAnswer: string;
    answerUrl: string;
}

interface chatsState {
    chats: ChatBody[];
    getAllChats: () => Promise<void>;
    sendRequest: (requestText: string, username: string, voiceAnswer: boolean) => Promise<void>;
}
