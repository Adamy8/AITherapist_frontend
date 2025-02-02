// global store api - notes
import {create} from "zustand";

export const useNotesStore = create((set) => ({
    notes: [],
    setNotes: (notes) => set({notes}),

    createNote: async (newNote) => {
        const res = await fetch("/api/notes", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newNote)
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        set((state) => {
            const updatedNotes = [...state.notes, data];
            return {notes: updatedNotes};
        });

        return {success: data.success, message: data.message, note_id: data.note_id};
    },

    fetchAllNotes: async () => {
        // const res = await fetch("/api/notes");
        // const data = await res.json();
        // if (!res.ok) {
        //     throw new Error(`HTTP error! status: ${res.status}`);
        // }
        const data = {notes:[{note_id:1, title:"test"},{note_id:2, title:"testlalala"}]}; // test!!!
        set({notes: data.notes});
    },

    fetchNote: async (note_id) => {
        const res = await fetch(`/api/notes/${note_id}`);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return data;
    },

    deleteNote: async (note_id) => {
        const res = await fetch(`/api/notes/${note_id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        set((state) => {
            const updatedNotes = state.notes.filter((note) => note.note_id !== note_id);
            return {notes: updatedNotes};
        });
        return {success: data.success, message: data.message};
    },

}));