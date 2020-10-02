package controllers

import (
	"github.com/sarthakpranesh/HummingNote/server/models"
	"github.com/sarthakpranesh/HummingNote/server/models/requests"
)

// Auth handles the actual logic of registering and signing in a user
func Auth(ahr requests.AuthRequest) (models.User, error) {
	does, err := models.UserExists(ahr.UID)
	if err != nil {
		return models.User{}, err
	}

	var u models.User
	if does {
		u, err = models.Get(ahr.UID)
	} else {
		u, err = models.Set(models.User{UID: ahr.UID, Email: ahr.Email})
	}

	if err != nil {
		return models.User{}, err
	}
	return u, nil
}
