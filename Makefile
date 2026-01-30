up:
	sudo docker compose up $(ARGS)

down:
	sudo docker compose down $(ARGS)

build:
	sudo docker compose build $(ARGS)
