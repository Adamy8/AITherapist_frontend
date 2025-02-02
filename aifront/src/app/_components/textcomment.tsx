"use client";



export default function TextComment() {

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <h2>
                Comment
            </h2>
            <div className="flex-1 p-4 border-r border-gray-300 overflow-auto">
                <div className="w-full h-full p-4 bg-gray-100">
                Warm colors (Red, Orange, Yellow) 🔥 → Represent high energy & positive emotions, such as excitement, happiness, and motivation.
                <br />
                ✅ Cool colors (Blue, Purple, Cyan) ❄ → Represent low energy, deep thoughts, or negative emotions, such as calmness, sadness, or loneliness.
                <br />
                ✅ Neutral colors (Green, Light Blue) 🌿 → Represent balance, focus, and self-acceptance, ideal for relaxation and stability.
                </div>
            </div>
        </div>
    );
}