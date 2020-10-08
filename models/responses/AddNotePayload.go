package responses

import "github.com/sarthakpranesh/HummingNote/models/note"

// AddNotePayload represents the payload for successfull response of AddNoteHandler
type AddNotePayload struct {
	Note note.Note `json:"note"`
}
