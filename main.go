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

	// use to set cors
	// func setupResponse(w *http.ResponseWriter, req *http.Request) {
	// 	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	// 	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	// 	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	// }

	router := mux.NewRouter()
	router.HandleFunc("/auth", handlers.AuthHandler).Methods("POST", "OPTIONS")
	router.HandleFunc("/auth/addnote", middleware.AuthCheck(note.AddNoteHandler)).Methods("POST", "OPTIONS")
	router.HandleFunc("/auth/notes", middleware.AuthCheck(note.GetNotesHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/auth/note", middleware.AuthCheck(note.GetNoteHandler)).Methods("GET", "OPTIONS")
	router.HandleFunc("/auth/deletenote", middleware.AuthCheck(note.DeleteNoteHandler)).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/auth/editnote", middleware.AuthCheck(note.EditNoteHandler)).Methods("POST", "OPTIONS")

	err := http.ListenAndServe("0.0.0.0:"+os.Getenv("PORT"), router)
	if err != nil {
		log.Fatalln("Unable to start server!, Error:", err.Error())
	}
}
