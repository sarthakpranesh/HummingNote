package requests

// AuthRequest struct represents the POST method's request body structure
type AuthRequest struct {
	Email string `json:"email" bson:"email"`
	UID   string `json:"uid" bson:"uid"`
}
