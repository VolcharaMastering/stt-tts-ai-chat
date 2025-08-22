import React, { useState, useRef } from "react";
import "./AudioRecorder.scss";

interface AudioRecorderProps {
    onRecordComplete: (file: Blob) => void; // callback to handle the recorded audio file
    isAudioRequest?: boolean; // optional prop to indicate if this is an audio request
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordComplete, isAudioRequest }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);

            audioChunksRef.current = [];
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
                setAudioUrl(URL.createObjectURL(audioBlob));
                onRecordComplete(audioBlob);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone", err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <div
            className={isAudioRequest ? "audio-recorder audio-recorder__preview" : "audio-recorder"}
        >
            {isAudioRequest && (
                <div className="audio-recorder__preview">
                    <audio className="audio-recorder__audio" controls src={audioUrl ?? undefined} />
                </div>
            )}
            {!isRecording ? (
                <button type="button" onClick={startRecording}>
                    🎙 Record
                </button>
            ) : (
                <button type="button" onClick={stopRecording}>
                    ⏹ Stop
                </button>
            )}
        </div>
    );
};

export default AudioRecorder;
