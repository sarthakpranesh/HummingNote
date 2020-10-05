package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/sarthakpranesh/HummingNote/models/requests"

	"github.com/sarthakpranesh/HummingNote/controllers"

	"github.com/sarthakpranesh/HummingNote/models"
)

// AuthHandler handles all POST requests on the Auth route and expects email and uid in the request body.
// This route can be used to either register a new player or sign in an already registered player
func AuthHandler(response http.ResponseWriter, request *http.Request) {
	log.Println("Auth Request")
	response.Header().Add("content-type", "application/json")
	var ahr requests.AuthRequest
	err := json.NewDecoder(request.Body).Decode(&ahr)
	if err != nil {
		log.Println("Error decoding request body in AuthHandler, Error:", err.Error())
		response.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(response).Encode(models.ErrorResponse{Status: 4, Message: err.Error()})
		return
	}
	if ahr.Email == "" || ahr.UID == "" {
		log.Println("Bad Request")
		response.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(response).Encode(models.ErrorResponse{Status: 4, Message: "Bad Request"})
		return
	}
	user, err := controllers.Auth(ahr)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(response).Encode(models.ErrorResponse{Status: 5, Message: err.Error()})
		return
	}
	json.NewEncoder(response).Encode(user)
}
