package responses

import "github.com/sarthakpranesh/HummingNote/models/note"

// EditNotePayload represents the editnote's success response payload
type EditNotePayload struct {
	Note note.Note `json:"note"`
}
