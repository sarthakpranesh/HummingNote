package note

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/sarthakpranesh/HummingNote/models/responses"

	"github.com/sarthakpranesh/HummingNote/models"

	"github.com/sarthakpranesh/HummingNote/models/note"
	"github.com/sarthakpranesh/HummingNote/models/requests"
)

// EditNoteHandler handles all request that modify the existing notes in the database
func EditNoteHandler(response http.ResponseWriter, request *http.Request) {
	log.Println("EditNote Request")
	uid := strings.ReplaceAll(request.Header.Values("Authorization")[0], "Bearer ", "")

	var enr requests.EditNoteRequest
	err := json.NewDecoder(request.Body).Decode(&enr)
	if err != nil {
		log.Println("Error in EditNoteHandler:", err.Error())
		response.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(response).Encode(models.ErrorResponse{Status: 3, Message: err.Error()})
		return
	}

	n, err := note.Edit(enr, uid)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(response).Encode(models.ErrorResponse{Status: 5, Message: err.Error()})
		return
	}

	json.NewEncoder(response).Encode(responses.SuccessResponse{
		Status:  1,
		Message: "Note updated!",
		Payload: responses.EditNotePayload{
			Note: n,
		},
	})
}
