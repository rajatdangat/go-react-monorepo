package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "backend is running"})
	})

	log.Println("starting backend on port 8080")
	app.Listen(":8080")
}
