"use client";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useState } from "react";

export default function TextToSpeechExample() {
  const { start, pause, resume, stop, isSpeaking } = useTextToSpeech();
  const [text, setText] = useState("");
  const [lang, setLang] = useState<"en" | "ar">("en");

  return (
    <div className="p-4 space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Type something..."
      />
      <div className="flex gap-2">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as "en" | "ar")}
          className="border px-2 py-1 rounded"
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
        <button onClick={() => start(text, lang)} className="px-4 py-2 bg-blue-500 text-white rounded">
          Start
        </button>
        <button onClick={pause} className="px-4 py-2 bg-yellow-500 text-white rounded">
          Pause
        </button>
        <button onClick={resume} className="px-4 py-2 bg-green-500 text-white rounded">
          Resume
        </button>
        <button onClick={stop} className="px-4 py-2 bg-red-500 text-white rounded">
          Stop
        </button>
      </div>
      <p>{isSpeaking ? "Speaking..." : "Not speaking."}</p>
    </div>
  );
}
