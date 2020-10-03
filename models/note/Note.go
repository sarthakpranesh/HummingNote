package note

import (
	"context"
	"log"
	"time"

	"github.com/sarthakpranesh/HummingNote/server/connect"
)

// Note type is the basic struct type that represents a user note
type Note struct {
	UID          string    `json:"uid" bson:"uid"`
	Title        string    `json:"title" bson:"title"`
	Data         string    `json:"data" bson:"data"`
	LastModified time.Time `json:"lastModified" bson:"lastModified"`
	IsPinned     bool      `json:"isPinned" bson:"isPinned"`
	Label        string    `json:"labels" bson:"labels"`
	Color        string    `json:"color" bson:"color"`
}

// Set is used to create a new note
func Set(n Note) (Note, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := connect.Collection("test", "notes")
	_, err := collection.InsertOne(ctx, n)
	if err != nil {
		log.Println("Error in Set note:", err.Error())
		return Note{}, err
	}

	return n, nil
}
