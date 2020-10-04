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
	Title        string    `json:"title" bson:"title,omitempty"`
	Data         string    `json:"data" bson:"data,omitempty"`
	LastModified time.Time `json:"lastModified" bson:"lastModified,omitempty"`
	IsPinned     bool      `json:"isPinned" bson:"isPinned,omitempty"`
	Label        string    `json:"labels" bson:"labels,omitempty"`
	Color        string    `json:"color" bson:"color,omitempty"`
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

// GetAll all notes
func GetAll(uid string) ([]Note, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := connect.Collection("test", "notes")
	cursor, err := collection.Find(ctx, Note{UID: uid})
	if err != nil {
		log.Println("Error in GetAll note:", err.Error())
		return []Note{}, err
	}

	var notes []Note
	for cursor.Next(ctx) {
		var n Note
		cursor.Decode(&n)
		notes = append(notes, n)
	}

	return notes, nil
}
