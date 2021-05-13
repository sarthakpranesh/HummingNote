package connect

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client *mongo.Client
)

// Mongo returns a context.CancelFunc and connects to the Mongo Database
func Mongo() context.CancelFunc {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	var err error
	client, err = mongo.NewClient(options.Client().ApplyURI(os.Getenv("MONGO_URL")))
	if err != nil {
		log.Fatalln("Unable to create mongo client!, Error:", err.Error())
		return cancel
	}
	err = client.Connect(ctx)
	if err != nil {
		log.Fatalln("Unable to Connect to mongo!, Error:", err.Error())
		return cancel
	}
	log.Println("Database Successfully Connected")
	return cancel
}

// Collection returns a Collection type to the specific database
func Collection(db, col string) *mongo.Collection {
	return client.Database(db).Collection(col)
}
