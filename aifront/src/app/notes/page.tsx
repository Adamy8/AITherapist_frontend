"use client"

import { useEffect, useState } from "react"
import { useNotesStore } from "@/app/_store/notes"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
 
const NoteMainPage = () => {
  const { toast } = useToast() // Toast description
  const { fetchAllNotes, notes, fetchNote, createNote, generateVAD, deleteNote, updateNote } = useNotesStore()
  const [selectedNote, setSelectedNote] = useState<{ title: string; content: string; note_id: number } | null>(null)
  const [isCreatingNote, setIsCreatingNote] = useState(false)
  const [newNote, setNewNote] = useState({ title: "", content: "" })
  const [isEditingNote, setIsEditingNote] = useState(false)

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await fetchAllNotes();  // Assuming fetchAllNotes is an async function
      console.log("Note updated successfully initial:", data); //debug
    };
    fetchNotes();
  }, [fetchAllNotes])

  const handleNoteClick = async (noteId: number) => {
    const note = await fetchNote(noteId)
    setSelectedNote(note)
    setIsCreatingNote(false)
    setIsEditingNote(false)
  }

  const handleCreateNote = () => {
    setIsCreatingNote(true)
    setSelectedNote(null)
  }

  const handleSubmitNote = async (e: React.FormEvent) => {
    e.preventDefault()
    const { success, message, note_id } = await createNote(newNote)
    setNewNote({ title: "", content: "" })
    await setIsCreatingNote(false);
    const data = await fetchAllNotes();
    console.log("Note updated successfully after submit:", data); //debug
    toast({
      variant: "success",
      description: "🎉 Note created successfully",
      className: "p-6 text-2xl",
      duration: 800
    })
    if (success) {
      const { success, message, description } = await generateVAD(note_id)
      if (success) {
        console.log("VAD generated successfully for note", note_id, "\ndescription:", description)
        toast({
          description: "🎇 " + description + "🚀",
          className: "p-6 text-2xl"
        })
      } else {
        console.error("VAD generation failed for note", note_id, ":", message, description)
      }
    }
  }

  const handleDeleteNote = async () => {
    if (selectedNote) {
        console.log("Deleting note:", selectedNote);
      const { success } = await deleteNote(selectedNote.note_id)
      if (success) {
        setSelectedNote(null)
        await fetchAllNotes()
      }
    }
  }

  const handleEditNote = () => {
    if (selectedNote) {
      setIsEditingNote(true)
    }
  }

  const handleUpdateNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedNote) {
      const { success, message } = await updateNote(selectedNote.note_id, selectedNote)
      if (success) {
        setIsEditingNote(false);
        const data = await fetchAllNotes(); //debug
        console.log("Note updated successfully:", data); //debug
        const { success, message, description } = await generateVAD(selectedNote.note_id)
        if (success) {
          console.log("VAD generated successfully for note", selectedNote.note_id, "\ndescription:", description)
          toast({
            description: "🎇 " + description + "🚀",
            className: "p-6 text-2xl"
          })
        } else {
          console.error("VAD generation failed for note", selectedNote.note_id, ":", message, description)
        }
      }
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-border flex flex-col bg-white p-4">
        <h2 className="text-xl font-semibold text-muted-foreground mb-4">Notes</h2>
        <Button onClick={handleCreateNote} className="mb-4">
          New Note
        </Button>
        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {notes.map((note) => (
              <Button
                key={note.note_id}
                variant="ghost"
                className="w-full justify-start text-left text-sm font-medium hover:bg-accent focus:bg-accent"
                onClick={async() => await handleNoteClick(note.note_id)}
              >
                {note.title}
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-border">
            <Link href="/analysis">
            <Button variant="outline" className="flex items-center font-sans">
            <span className="bg-gradient-to-r from-purple-400 via-indigo-500 to-pink-500 bg-clip-text text-transparent font-extrabold text-2xl">
                AI
            </span>
            <span className="ml-1 text-lg">Analysis</span>
            </Button>
            </Link>
        </div>
      </div>
      <Toaster />    {/* Hook */}
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
            <CardFooter className="space-x-2">
              {isEditingNote ? (
                <form onSubmit={handleUpdateNote} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <Input
                      id="title"
                      value={selectedNote.title}
                      onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">Content</label>
                    <Textarea
                      id="content"
                      value={selectedNote.content}
                      onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })}
                      required
                      className="min-h-[200px]"
                    />
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              ) : (
                <>
                  <Button onClick={handleEditNote} variant="outline">Edit</Button>
                  <Button onClick={handleDeleteNote} variant="destructive">Delete</Button>
                </>
              )}
            </CardFooter>
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
