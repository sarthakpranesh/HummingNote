package models

import "time"

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
