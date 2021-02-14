package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/sarthakpranesh/HummingNote/models/requests"
	"github.com/sarthakpranesh/HummingNote/models/responses"

	"github.com/sarthakpranesh/HummingNote/controllers"
)

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization")
}

// AuthHandler handles all POST requests on the Auth route and expects email and uid in the request body.
// This route can be used to either register a new player or sign in an already registered player
func AuthHandler(response http.ResponseWriter, request *http.Request) {
	log.Println("Auth Request")
	setupResponse(&response, request)
	if request.Method == "OPTIONS" {
		return
	} else {
		response.Header().Add("content-type", "application/json")

		var ahr requests.AuthRequest
		err := json.NewDecoder(request.Body).Decode(&ahr)
		if err != nil {
			log.Println("Error decoding request body in AuthHandler, Error:", err.Error())
			response.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(response).Encode(responses.ErrorResponse{Status: 4, Message: err.Error()})
			return
		}
		if ahr.Email == "" || ahr.UID == "" {
			log.Println("Bad Request")
			response.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(response).Encode(responses.ErrorResponse{Status: 4, Message: "Bad Request"})
			return
		}

		user, err := controllers.Auth(ahr)
		if err != nil {
			response.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(response).Encode(responses.ErrorResponse{Status: 5, Message: err.Error()})
			return
		}

		json.NewEncoder(response).Encode(responses.SuccessResponse{
			Status:  1,
			Message: "User authenticated",
			Payload: responses.AuthPayload{
				User: user,
			},
		})
	}
}
