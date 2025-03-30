"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNotesStore } from "@/app/_store/notes";

type GraphSectionProps = {
    noteId: number;
}

// type GraphData = {
//     vad_img_url: string;
//     emo_sum_img_url: string;
// };

const GraphSection = ({ noteId }: GraphSectionProps) => {
    const { notes } = useNotesStore();
    const [imageUrl, setImageUrl] = useState("");
    const [data, setData] = useState({vad_img_url: "", emo_sum_img_url: ""});
    const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null);

    // Fetch image URL based on noteId
    useEffect(() => {
        const fetchImageUrl = async () => {
            if (noteId === -1) {
                // Fetch from API for overall graph
                const response = await fetch("/api/generate_vad_graph", {
                    method: "GET",
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch image URL");
                }
                const data = await response.json();
                setData(data);
                setImageUrl(data.vad_img_url);
            } else {
                // Get URL directly from notes
                const note = notes.find(note => note.note_id === noteId);
                if (note) {
                    setImageUrl(note.img_url);
                }
            }
        };

        fetchImageUrl();
    }, [noteId, notes]);

    // Fetch and process the actual image
    useEffect(() => {
        const fetchImage = async () => {
            if (!imageUrl) return;
            
            try {
                const response = await fetch(imageUrl, {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    }
                });
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);
                setImageObjectUrl(objectUrl);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchImage();

        return () => {
            if (imageObjectUrl) {
                URL.revokeObjectURL(imageObjectUrl);
            }
        };
    }, [imageUrl]);

    const toggleImage = () => {
        if (noteId === -1) {
            if (imageUrl === data.vad_img_url) {
                setImageUrl(data.emo_sum_img_url);
            } else {
                setImageUrl(data.vad_img_url);
            }
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-auto h-full relative">
            <h2 className="font-bold absolute top-0 left-0 right-0 p-4 z-10 font-bold font-semibold text-2xl">
                {noteId === -1 ? 
                    "Your Emotional Graph" : 
                    notes.find(note => note.note_id === noteId)?.title || 'No note found'
                }
            </h2>
            <div className="flex flex-col overflow-auto h-full">
                {imageUrl !== "" ? (
                    <div className="flex-1 flex flex-col overflow-auto h-full">
                        {imageObjectUrl ? (
                            <img src={imageObjectUrl} alt="Graph" className="h-full object-contain pt-4" />
                        ) : (
                            <div className="flex justify-center items-center h-full">Loading...</div>
                        )}
                    </div>
                ) : (
                    <div className="flex pt-12 pl-20">Sorry, no image available</div>
                )}
            </div>
            {noteId === -1 && (
                <Button 
                    className="absolute top-4 right-4 p-4 z-10 bg-white text-black hover:bg-gray-300"
                    onClick={toggleImage}
                >
                    Trend
                </Button>
            )}
        </div>
    );
}

export default GraphSection;