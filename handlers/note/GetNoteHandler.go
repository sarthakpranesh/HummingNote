package note

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/sarthakpranesh/HummingNote/models/responses"

	"github.com/sarthakpranesh/HummingNote/models/note"
)

// GetNoteHandler can be used to retrive a single note
func GetNoteHandler(response http.ResponseWriter, request *http.Request) {
	log.Println("DeleteNote Request")
	uid := strings.ReplaceAll(request.Header.Values("Authorization")[0], "Bearer ", "")
	id := request.URL.Query().Get("id")
	if id == "" {
		log.Println("Error in GetNoteHandler, no id provided")
		response.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(response).Encode(responses.ErrorResponse{Status: 4, Message: "Bad Request"})
		return
	}

	n, err := note.Get(id, uid)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(response).Encode(responses.ErrorResponse{Status: 3, Message: err.Error()})
		return
	}

	json.NewEncoder(response).Encode(responses.SuccessResponse{
		Status:  1,
		Message: "Note retrived",
		Payload: responses.GetNotePayload{
			Note: n,
		},
	})
}
