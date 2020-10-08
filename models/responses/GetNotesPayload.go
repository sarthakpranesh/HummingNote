package responses

import "github.com/sarthakpranesh/HummingNote/models/note"

// GetNotesPayload represents the payload for successful response of GetNotesHandler
type GetNotesPayload struct {
	Notes []note.Note `json:"notes"`
}
