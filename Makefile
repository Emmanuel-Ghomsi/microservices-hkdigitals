.SILENT:

.PHONY: install

.env: .env.example ## Copie le fichier .env.example et le renomme en .env à la racine du projet
	cp .env.example .env

./gateway/.env: ./gateway/.env.example
	cp ./gateway/.env.example ./gateway/.env

./users/.env: ./users/.env.example
	cp ./users/.env.example ./users/.env

./resume/.env: ./resume/.env.example
	cp ./resume/.env.example ./resume/.env

./image/.env: ./image/.env.example
	cp ./image/.env.example ./image/.env

./client/.env: ./client/.env.example
	cp ./client/.env.example ./client/.env

install: .env ./gateway/.env ./users/.env ./resume/.env ./image/.env ./client/.env ## Créé le container et rebuild au besoin les images ayant été modifiées
	echo "run docker microservice"
	docker-compose down
	docker-compose build
	docker-compose up -d