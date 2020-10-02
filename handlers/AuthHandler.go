package handlers

import (
	"log"
	"net/http"
)

// AuthHandler handles all POST requests on the Auth route and expects email and uid in the request body.
// This route can be used to either register a new player or sign in an already registered player
func AuthHandler(respone http.ResponseWriter, request *http.Request) {
	log.Println("This is something!")
}
