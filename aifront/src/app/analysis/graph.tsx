"use client"  // Make sure this is in a Next.js component or an app that uses client-side rendering

import { useEffect, useState } from "react";

export default function GraphSection() {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the image URL from your backend API
    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await fetch("/api/generate_vad_graph");
                if (!response.ok) {
                    throw new Error("Failed to fetch image URL");
                }
                const data = await response.json();
                setImageUrl(data.vad_img_url);  // emo_sum_img_url
                console.log("Image URL:", data.vad_img_url);
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

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <h2>Visualization</h2>
            {imageUrl ? (
                <img src={imageUrl} alt="Graph" />
            ) : (
                <div>No image available</div>
            )}
        </div>
    );
}
