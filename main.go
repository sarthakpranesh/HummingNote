package main

import (
	"log"
	"net/http"
	"os"

	"github.com/sarthakpranesh/HummingNote/handlers/note"
	"github.com/sarthakpranesh/HummingNote/middleware"

	"github.com/sarthakpranesh/HummingNote/handlers"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/sarthakpranesh/HummingNote/connect"
)

func main() {
	godotenv.Load(".env")
	log.Println("Starting !!!")

	cancel := connect.Mongo()
	defer cancel()

	router := mux.NewRouter()
	router.HandleFunc("/auth", handlers.AuthHandler).Methods("POST")
	router.HandleFunc("/auth/addnote", middleware.AuthCheck(note.AddNoteHandler)).Methods("POST")
	router.HandleFunc("/auth/notes", middleware.AuthCheck(note.GetNotesHandler)).Methods("GET")
	router.HandleFunc("/auth/deletenote", middleware.AuthCheck(note.DeleteNoteHandler)).Methods("DELETE")
	router.HandleFunc("/auth/editnote", middleware.AuthCheck(note.EditNoteHandler)).Methods("POST")

	err := http.ListenAndServe("0.0.0.0:"+os.Getenv("PORT"), router)
	if err != nil {
		log.Fatalln("Unable to start server!, Error:", err.Error())
	}
}
