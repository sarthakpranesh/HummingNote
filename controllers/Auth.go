package controllers

import (
	"github.com/sarthakpranesh/HummingNote/models/requests"
	"github.com/sarthakpranesh/HummingNote/models/user"
)

// Auth handles the actual logic of registering and signing in a user
func Auth(ahr requests.AuthRequest) (user.User, error) {
	does, err := user.UserExists(ahr.UID)
	if err != nil {
		return user.User{}, err
	}

	var u user.User
	if does {
		u, err = user.Get(ahr.UID)
	} else {
		u, err = user.Set(user.User{UID: ahr.UID, Email: ahr.Email})
	}

	if err != nil {
		return user.User{}, err
	}
	return u, nil
}
