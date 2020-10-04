package responses

import "github.com/sarthakpranesh/HummingNote/server/models/note"

// GetNotesResponse represents the response for GetNotesHandler
type GetNotesResponse struct {
	Status  uint        `json:"status"`
	Message string      `json:"message"`
	Payload []note.Note `json:"payload"`
}
