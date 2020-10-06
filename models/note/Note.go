package note

import (
	"context"
	"log"
	"reflect"
	"strings"
	"time"

	"github.com/sarthakpranesh/HummingNote/models/requests"

	"github.com/sarthakpranesh/HummingNote/connect"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Note type is the basic struct type that represents a user note
type Note struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UID          string             `json:"uid" bson:"uid"`
	Title        string             `json:"title" bson:"title,omitempty"`
	Data         string             `json:"data" bson:"data,omitempty"`
	LastModified time.Time          `json:"lastModified" bson:"lastModified,omitempty"`
	IsPinned     bool               `json:"ispinned" bson:"ispinned,omitempty"`
	Label        string             `json:"label" bson:"label,omitempty"`
	Color        string             `json:"color" bson:"color,omitempty"`
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

// GetAll is used to retrive all notes of the current user
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

// Get is used to retrive note of the current user
func Get(id, uid string) (Note, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	OID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Println("Error in Get note:", err.Error())
		return Note{}, err
	}

	collection := connect.Collection("test", "notes")
	result := collection.FindOne(ctx, Note{UID: uid, ID: OID})

	var n Note
	err = result.Decode(&n)
	if err != nil {
		log.Println("Error in Get note:", err.Error())
		return Note{}, err
	}

	return n, nil
}

// Delete is used to delete a note from database
func Delete(id string, uid string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	OID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Println("Error in Delete note:", err.Error())
		return false, err
	}

	collection := connect.Collection("test", "notes")
	del, err := collection.DeleteOne(ctx, Note{ID: OID, UID: uid})
	if err != nil {
		log.Println("Error in Delete note:", err.Error())
		return false, err
	}

	log.Println(del.DeletedCount)

	return true, nil
}

// Edit is used to update existing note records
func Edit(enr requests.EditNoteRequest, uid string) (Note, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	OID, err := primitive.ObjectIDFromHex(enr.ID)
	if err != nil {
		log.Println("Error in Edit note:", err.Error())
		return Note{}, err
	}

	value := reflect.ValueOf(enr)
	typeOf := value.Type()
	var updateDoc bson.M = make(bson.M)
	for i := 0; i < value.NumField(); i++ {
		if value.Field(i).Interface() != "" && typeOf.Field(i).Name != "ID" {
			updateDoc[strings.ToLower(typeOf.Field(i).Name)] = value.Field(i).Interface()
		}
	}
	updateDoc["lastModified"] = time.Now()

	update := bson.M{
		"$set": updateDoc,
	}
	upsert := true
	after := options.After
	opt := options.FindOneAndUpdateOptions{
		ReturnDocument: &after,
		Upsert:         &upsert,
	}

	var n Note
	collection := connect.Collection("test", "notes")
	err = collection.FindOneAndUpdate(
		ctx,
		Note{UID: uid, ID: OID},
		update,
		&opt,
	).Decode(&n)
	if err != nil {
		log.Println("Error in Edit note:", err.Error())
		return Note{}, err
	}

	return n, nil
}
