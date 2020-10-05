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

// DeleteNoteHandler is used to delete notes from database
func DeleteNoteHandler(response http.ResponseWriter, request *http.Request) {
	log.Println("DeleteNote Request")
	uid := strings.ReplaceAll(request.Header.Values("Authorization")[0], "Bearer ", "")
	id := request.URL.Query().Get("id")
	if id == "" {
		log.Println("Error DeleteNoteHandler, id not provided!")
		response.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(response).Encode(models.ErrorResponse{Status: 3, Message: "Bad Request"})
		return
	}

	b, err := note.Delete(id, uid)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(response).Encode(models.ErrorResponse{Status: 5, Message: err.Error()})
		return
	}

	json.NewEncoder(response).Encode(responses.SuccessResponse{
		Status:  1,
		Message: "Operation completed",
		Payload: responses.DeleteNotePayload{
			IsDeleted: b,
		},
	})
}
