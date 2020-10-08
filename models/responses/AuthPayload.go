package responses

import (
	"github.com/sarthakpranesh/HummingNote/models/user"
)

// AuthPayload represents the successful response for Auth request
type AuthPayload struct {
	User user.User `json:"user"`
}
