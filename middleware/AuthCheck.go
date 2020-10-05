package middleware

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/sarthakpranesh/HummingNote/models"
	"github.com/sarthakpranesh/HummingNote/models/user"
)

// AuthCheck makes sure if the request is authenticated or not
func AuthCheck(next http.HandlerFunc) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		res.Header().Add("content-type", "application/json")
		auth := req.Header.Values("Authorization")
		if len(auth) == 0 {
			log.Println("Unauthorized request")
			res.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(res).Encode(models.ErrorResponse{Status: 3, Message: "Unauthorized"})
			return
		}
		var token string
		token = strings.ReplaceAll(auth[0], "Bearer ", "")
		if token == "" {
			log.Println("Unauthorized request")
			res.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(res).Encode(models.ErrorResponse{Status: 3, Message: "Unauthorized"})
			return
		}
		does, err := user.UserExists(token)
		if err != nil || does == false {
			log.Println("Unauthorized request")
			res.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(res).Encode(models.ErrorResponse{Status: 3, Message: "Unauthorized"})
			return
		}
		next(res, req)
	}
}
