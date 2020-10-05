package note

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/sarthakpranesh/HummingNote/models/responses"

	"github.com/sarthakpranesh/HummingNote/models"

	"github.com/sarthakpranesh/HummingNote/models/note"
)

// GetNotesHandler sends back the users notes
func GetNotesHandler(response http.ResponseWriter, request *http.Request) {
	log.Println("GetNotes Request")

	uid := strings.ReplaceAll(request.Header.Values("Authorization")[0], "Bearer ", "")

	notes, err := note.GetAll(uid)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(response).Encode(models.ErrorResponse{Status: 5, Message: err.Error()})
		return
	}

	json.NewEncoder(response).Encode(responses.GetNotesResponse{Status: 1, Message: "Notes retrived", Payload: notes})
}
