// global store api - notes
import {create} from "zustand";

export const useNotesStore = create((set) => ({
    notes: [],
    setNotes: (notes) => set({notes}),

    createNote: async (newNote) => {
        const res = await fetch("/api/notes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
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
        // console.log("testtest_store",data); //test
        return {success: data.success, message: data.message, note_id: data.note_id};
    },

    generateVAD: async (note_id) => {
        const res = await fetch(`/api/generate_vad/${note_id}`, {
            method: "POST", // anything works in django backend
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await res.json();      //generated vad file
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return {success: data.success, message: data.message, description: data.description};
    },

    updateNote: async (note_id, updatedNote) => {
        const res = await fetch(`/api/notes/${note_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedNote)
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        set((state) => {
            const updatedNotes = state.notes.map((note) => {
                if (note.note_id === note_id) {
                    return {...note, ...updatedNote};
                }
                return note;
            });
            return {notes: updatedNotes};
        });
        return {success: data.success, message: data.message};
    },

    fetchAllNotes: async () => {
        // console.log("fetch all notes"); //debug
        const res = await fetch("/api/notes/",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        console.log("fetch all notes res: ",res);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        // const data = {notes:[{note_id:1, title:"test"},{note_id:2, title:"testlalala"}]}; // test!!!
        await set({notes: data.notes});
        return {data};
    },

    fetchNote: async (note_id) => {
        const res = await fetch(`/api/notes/${note_id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        console.log("fetch one note data: ",data);
        return data.note;
    },

    deleteNote: async (note_id) => {
        const res = await fetch(`/api/notes/${note_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
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