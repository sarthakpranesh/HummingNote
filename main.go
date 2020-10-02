package main

import (
	"log"
	"net/http"
	"os"

	"github.com/sarthakpranesh/HummingNote/server/handlers"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/sarthakpranesh/HummingNote/server/connect"
)

func main() {
	godotenv.Load(".env")
	log.Println("Starting server!!!")

	cancel := connect.Mongo()
	defer cancel()

	router := mux.NewRouter()
	router.HandleFunc("/auth", handlers.AuthHandler).Methods("POST")

	err := http.ListenAndServe("0.0.0.0:"+os.Getenv("PORT"), router)
	if err != nil {
		log.Fatalln("Unable to start server!, Error:", err.Error())
	}
}
