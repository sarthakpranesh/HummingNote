package responses

// ErrorResponse struct is the basic response when server encpunters an error
type ErrorResponse struct {
	Status  uint   `json:"status" bson:"-"`
	Message string `json:"message" bson:"-"`
}
