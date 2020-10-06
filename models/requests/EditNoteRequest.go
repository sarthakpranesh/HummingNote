package requests

// EditNoteRequest represents expected request body on editnote request
type EditNoteRequest struct {
	ID       string `json:"_id" bson:"_id"`
	Title    string `json:"title,omitempty" bson:"title,omitempty"`
	Data     string `json:"data,omitempty" bson:"data,omitempty"`
	IsPinned bool   `json:"ispinned,omitempty" bson:"ispinned,omitempty"`
	Label    string `json:"label,omitempty" bson:"label,omitempty"`
	Color    string `json:"color,omitempty" bson:"color, omitempty"`
}
