package requests

// AddNoteRequest represents the AddNoteHandlers request body structure
type AddNoteRequest struct {
	Title string `json:"title"`
	Data  string `json:"data"`
}
