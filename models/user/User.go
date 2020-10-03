package user

import (
	"context"
	"log"
	"time"

	"github.com/sarthakpranesh/HummingNote/server/connect"
)

// User struct represents the authenticated/registered user
type User struct {
	UID    string   `json:"uid" bson:"uid,omitempty"`
	Email  string   `json:"email" bson:"email,omitempty"`
	Labels []string `json:"labels" bson:"labels,omitempty"`
}

// UserExists verifies if a user already exists
func UserExists(uid string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := connect.Collection("test", "users")
	n, err := collection.CountDocuments(ctx, User{UID: uid})
	if err != nil {
		log.Println("Error in UserExits user:", err.Error())
		return false, err
	}
	if n == 0 {
		return false, nil
	}
	return true, nil
}

// Get retrives the registered user
func Get(uid string) (User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := connect.Collection("test", "users")
	result := collection.FindOne(ctx, User{UID: uid})

	var u User
	err := result.Decode(&u)
	if err != nil {
		log.Println("Error in Get user:", err.Error())
		return User{}, err
	}
	return u, nil
}

// Set is used to register a new user
func Set(u User) (User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := connect.Collection("test", "users")
	_, err := collection.InsertOne(ctx, u)
	if err != nil {
		log.Println("Error in Set user:", err.Error())
		return User{}, err
	}

	return u, nil
}
