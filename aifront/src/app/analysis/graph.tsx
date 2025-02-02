"use client"  // Make sure this is in a Next.js component or an app that uses client-side rendering

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function GraphSection() {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    // Fetch the image URL from backend API
    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await fetch("/api/generate_vad_graph");
                if (!response.ok) {
                    throw new Error("Failed to fetch image URL");
                }
                const data = await response.json();
                setData(data);  // Store the entire data object
                setImageUrl(data.vad_img_url);  // Default to vad_img_url
                console.log("Fetched Data:", data);  // Log to check the structure
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImageUrl();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Toggle between two image URLs
    const toggleImage = () => {
        if (imageUrl === data.vad_img_url) {
            setImageUrl(data.emo_sum_img_url); // Switch to emo_sum_img_url
        } else {
            setImageUrl(data.vad_img_url); // Switch back to vad_img_url
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-auto h-full relative">
          <h2 className="font-bold absolute top-0 left-0 right-0 p-4 z-10 font-bold font-semibold text-2xl">
            Your Emotional Graph
          </h2>
          <div className="flex-1 flex flex-col overflow-auto h-full">
            {imageUrl ? (
              <img src={imageUrl} alt="Graph" className="w-full h-full object-contain p-4" />
            ) : (
              <div>No image available</div>
            )}
          </div>
          <Button 
            className="absolute top-4 right-4 p-4 z-10 bg-white text-black hover:bg-gray-300"
            onClick={toggleImage}  // Toggle image on button click
          >
            Trend
          </Button>
        </div>
    );
}
