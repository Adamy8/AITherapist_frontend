"use client"
import { Button } from "@/components/ui/button";
import GraphSection from "../_components/graph";
import TextComment from "../_components/textcomment";
import { useNotesStore } from "@/app/_store/notes";
import { useEffect, useState } from "react";


const DisplayPage = () => {
    const { fetchAllNotes, notes } = useNotesStore();
    const [ notestate, setNoteState ] = useState(0);

    useEffect(() => {
        fetchAllNotes();
    }, [fetchAllNotes]);

    const handleNoteClick = (noteId: number) => {
        setNoteState(noteId);
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar (left) */}
            <div className="w-16 bg-gray-800 text-white flex flex-col items-center p-4 h-screen">
            {/* Sidebar content (buttons or links) */}
            <a href="/notes" className="text-white font-semibold">Go to Notes</a>
            {/* You can add more buttons or links here in the future */}
            </div>
                <div className="flex-1 flex flex-col">     {/* Main content (flex container) */}
                    <div className="flex-1 flex flex-col md:flex-row overflow-auto max-h-[66.6667vh]">
                        {/* Left content (top-left) */}
                        <div className="flex-1 flex flex-col overflow-auto h-full relative">
                        {notestate ? (
                            <div className="flex-1 flex flex-col overflow-auto h-full relative">
                            <h2 className="font-bold absolute top-0 left-0 right-0 p-4 z-10 font-bold font-semibold text-2xl">
                            {notes.find(note => note.note_id === notestate)?.title || 'No note found'}
                            </h2>
                            <div className="flex-1 flex flex-col overflow-auto h-full">
                            <img src={"http://49.51.195.205"+notes.find(note => note.note_id === notestate)?.img_url} alt="EmotionGraph" className=" h-full object-contain pt-4" />
                            </div>
                            </div>
                        ) : (
                            <GraphSection />
                        )}
                        </div>
            
                        {/* Right content (top-right) */}
                        <div className="flex-1 p-4 overflow-auto">
                        {notestate ? (
                            <div>
                                <div>
                                    <h2 className="font-bold text-2xl">
                                        Description:
                                    </h2>
                                    <p>This reflection: {notes.find(note => note.note_id === notestate)?.description}</p>
                                </div>
                                <div>
                                    <h2 className="font-bold text-2xl">
                                        Suggestion:
                                    </h2>
                                    <p>{notes.find(note=> note.note_id === notestate)?.suggestion}</p>
                                </div>
                            </div>
                        ):(
                            <TextComment />
                        )}
                        </div>
                    </div>
            
                    {/* Bottom content */}
                    <div className="h-2/5 bg-gray-100 p-4 overflow-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {notes.map((note) => (
                        <Button
                            key={note.note_id}
                            variant="outline"
                            className={`w-full justify-start text-left text-sm font-medium hover:bg-accent focus:bg-accent font-bold font-semibold`}
                            style={{ color: `rgb(${note.color.join(',')})` }} 
                            onClick={() => handleNoteClick(note.note_id)}
                        >
                            {note.title}
                        </Button>
                        ))}
                    </div>
                    <div  className="flex">
                    <Button className="mt-4" variant="link" onClick={() => handleNoteClick(0)}>
                        All notes
                    </Button>
                    </div>
                    </div>
                </div>
        </div>
    );
  };
  
  export default DisplayPage;
  