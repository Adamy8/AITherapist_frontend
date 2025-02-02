"use client";



export default function TextComment() {

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <h2>Text Comment</h2>
            <div className="flex-1 p-4 border-r border-gray-300 overflow-auto">
                <textarea className="w-full h-96 p-4 bg-gray-100" readOnly>
                Valence (Emotion Polarity) 😊 → Measures how positive or negative your emotion is. A higher value means happiness (🥳), while a lower value indicates sadness (😢).
                Arousal (Activation Level) ⚡ → Represents the energy intensity of your emotion. A high value means excitement (🤩🔥), while a low value indicates calmness (😌🌿).
                Dominance (Sense of Control) 🎛 → Measures how much control you feel over your emotions. A higher value means confidence (💪😎), while a lower value suggests helplessness (😞🤯).
                ✨ Simply put: The VAD model helps you understand your emotional state by analyzing its polarity, intensity, and control level! 💖📊
                </textarea>
            </div>
        </div>
    );
}