package note

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/sarthakpranesh/HummingNote/models"
	"github.com/sarthakpranesh/HummingNote/models/note"

	"github.com/sarthakpranesh/HummingNote/models/requests"
)

// AddNoteHandler can be used by authenticated users to create notes
func AddNoteHandler(response http.ResponseWriter, request *http.Request) {
	uid := strings.ReplaceAll(request.Header.Values("Authorization")[0], "Bearer ", "")
	var anr requests.AddNoteRequest
	err := json.NewDecoder(request.Body).Decode(&anr)
	if err != nil {
		log.Println("Error while decoding request body in AddNoteHandler:", err.Error())
		response.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(response).Encode(models.ErrorResponse{Status: 4, Message: err.Error()})
		return
	}

	n, err := note.Set(note.Note{UID: uid, Title: anr.Title, Data: anr.Data, LastModified: time.Now()})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(response).Encode(models.ErrorResponse{Status: 5, Message: err.Error()})
		return
	}

	json.NewEncoder(response).Encode(n)
}
