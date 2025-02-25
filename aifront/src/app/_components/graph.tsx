"use client"  // Make sure this is in a Next.js component or an app that uses client-side rendering

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// type GraphData = {
//     vad_img_url: string;
//     emo_sum_img_url: string;
// };

const GraphSection = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [data, setData] = useState({vad_img_url: "", emo_sum_img_url: ""});

    // Fetch the image URL from backend API
    useEffect(() => {
        const fetchImageUrl = async () => {
          const response = await fetch("/api/generate_vad_graph");
          if (!response.ok) {
              throw new Error("Failed to fetch image URL");
          }
          const data = await response.json();
          setData(data);  // Store the entire data object
          setImageUrl(data.vad_img_url);  // Default to vad_img_url
          console.log("Fetched Data:", data);  // Log to check the structure
        };

        fetchImageUrl();
    }, []);

    // Toggle between two image URLs
    const toggleImage = () => {
        if (imageUrl === data.vad_img_url) {
            setImageUrl(data.emo_sum_img_url); // Switch to emo_sum_img_url
        } else {
            setImageUrl(data.vad_img_url); // Switch back to vad_img_url
        }
    };

    return (
        <div className="flex flex-col overflow-auto h-full relative">
          <h2 className="font-bold absolute top-0 left-0 right-0 p-4 z-10 font-bold font-semibold text-2xl">
            Your Emotional Graph
          </h2>
          <div className="flex flex-col overflow-auto h-full">
            {imageUrl!="" ? (
              <div className="flex-1 flex flex-col overflow-auto h-full">
              <img src={`${imageUrl}`} alt="Graph" className="h-full object-contain pt-4" />
              </div>
            ) : (
              <div className="flex pt-12 pl-20">Sorry, no image available</div>
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


export default GraphSection;