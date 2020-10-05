package responses

type SuccessResponse struct {
	Status  uint        `json:"status"`
	Message string      `json:"message"`
	Payload interface{} `json:"Payload"`
}
