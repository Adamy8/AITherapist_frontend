"use client";

import { useNotesStore } from "@/app/_store/notes";
import { useEffect } from "react";
import NoteCard from "./notecard";


export default function Navbar() {
    const { fetchAllNotes, notes } = useNotesStore();

    useEffect(() => {
        fetchAllNotes();
    }, [fetchAllNotes]);
    
    return(
        <div className="flex flex-col h-screen p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold mb-4">Notes</h1>
            <div className="flex-1 overflow-y-auto">
                {notes.map((note) => (
                    <NoteCard key={note.note_id} id={note.note_id} title={note.title} />
                ))}
            </div>
        </div>
    );

}
