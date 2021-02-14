package middleware

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/sarthakpranesh/HummingNote/models/responses"
	"github.com/sarthakpranesh/HummingNote/models/user"
)

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

// AuthCheck makes sure if the request is authenticated or not
func AuthCheck(next http.HandlerFunc) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		setupResponse(&res, req)
		if req.Method == "OPTIONS" {
			return
		}

		res.Header().Add("content-type", "application/json")
		auth := req.Header.Values("Authorization")
		if len(auth) == 0 {
			log.Println("Unauthorized request")
			res.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(res).Encode(responses.ErrorResponse{Status: 3, Message: "Unauthorized"})
			return
		}
		var token string
		token = strings.ReplaceAll(auth[0], "Bearer ", "")
		if token == "" {
			log.Println("Unauthorized request")
			res.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(res).Encode(responses.ErrorResponse{Status: 3, Message: "Unauthorized"})
			return
		}
		does, err := user.UserExists(token)
		if err != nil || does == false {
			log.Println("Unauthorized request")
			res.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(res).Encode(responses.ErrorResponse{Status: 3, Message: "Unauthorized"})
			return
		}
		next(res, req)
	}
}
