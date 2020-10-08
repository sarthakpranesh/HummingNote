package responses

import "github.com/sarthakpranesh/HummingNote/models/note"

// GetNotePayload is the payload for GetNote's successful response
type GetNotePayload struct {
	Note note.Note `json:"note"`
}
