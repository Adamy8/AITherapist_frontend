// import Navbar1 from "../_components/navbar1";
// import Navbar from "../_components/navbar2";
"use client"

import { useEffect, useState } from "react"
import { useNotesStore } from "@/app/_store/notes"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const NoteMainPage = () => {
  const { fetchAllNotes, notes, fetchNote, createNote, generateVAD, deleteNote, updateNote } = useNotesStore()
  const [selectedNote, setSelectedNote] = useState<{ title: string; content: string } | null>(null)
  const [isCreatingNote, setIsCreatingNote] = useState(false)
  const [newNote, setNewNote] = useState({ title: "", content: "" })

  useEffect(() => {
    fetchAllNotes()
  }, [fetchAllNotes]);

  const handleNoteClick = async (noteId:number) => {
    const note = await fetchNote(noteId)
    setSelectedNote(note)
    setIsCreatingNote(false)
  }

  const handleCreateNote = () => {
    setIsCreatingNote(true)
    setSelectedNote(null)
  }

  const handleSubmitNote = async (e: React.FormEvent) => {
    e.preventDefault()
    const {success, message, note_id} = await createNote(newNote)
    setNewNote({ title: "", content: "" })
    setIsCreatingNote(false)
    fetchAllNotes() // Refresh the list of notes
    if (success) {
        const {success, message, description} = await generateVAD(note_id);
        if (success) {
            console.log("VAD generated successfully for note", note_id, "\ndescription:", description);
            // toast description!!!
        } else {
            console.error("VAD generation failed for note", note_id, ":", message, description);
        }
    }
  }

    const handlefetchAllNotes = async () => {
        const data = await fetchAllNotes();
        console.log("fetchAllNotes data:", data); //debug
    }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-border flex flex-col">
        <Button onClick={handleCreateNote} className="m-4">
          New Note
        </Button>
        <Button onClick={handlefetchAllNotes} className="m-4">
            Refresh
        </Button>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {notes.map((note) => (
              <Button
                key={note.note_id}
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => handleNoteClick(note.note_id)}
              >
                {note.title}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        {isCreatingNote ? (
          <Card>
            <form onSubmit={handleSubmitNote}>
              <CardHeader>
                <CardTitle>Create New Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    required
                    className="min-h-[200px]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Create Note</Button>
              </CardFooter>
            </form>
          </Card>
        ) : selectedNote ? (
          <Card>
            <CardHeader>
              <CardTitle>{selectedNote.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{selectedNote.content}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a note to view its content or create a new note
          </div>
        )}
      </div>
    </div>
  )
}

export default NoteMainPage;