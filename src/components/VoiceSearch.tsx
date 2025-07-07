"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BiMicrophone } from "react-icons/bi";

const VoiceSearch = () => {
    const [listening, setListening] = useState(false);
    const router = useRouter();

    const handleVoiceSearch = () => {
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported in your browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setListening(true);
        recognition.onend = () => setListening(false);

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript.toLowerCase().trim();
            console.log("you said:", transcript);
            alert(`you said: ${transcript}`);
            router.push(`/search?query=${encodeURIComponent(transcript)}`);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            alert("Speech recognition failed. Try again.");
            setListening(false);
        };

        recognition.start();
    };

    return (
        <button
            onClick={handleVoiceSearch}
            className={`p-2 rounded-full transition-colors ${listening ? "bg-red-200" : "bg-[#129575]"
                }`}
            title="Search by voice"
        >
            <BiMicrophone className="text-white text-xl" />
        </button>
    );
};

export default VoiceSearch;