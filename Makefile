.SILENT:

.PHONY: install copy-env-gateway copy-env-users copy-env-resume copy-env-image copy-env-client run

install: .env ## Copie le fichier .env.example et le renomme en .env à la racine du projet
	cp .env.example .env

copy-env-gateway: ./gateway/.env
	cp ./gateway/.env.example ./gateway/.env

copy-env-users: ./users/.env
	cp ./users/.env.example ./users/.env

copy-env-resume: ./resume/.env
	cp ./resume/.env.example ./resume/.env

copy-env-image: ./image/.env
	cp ./image/.env.example ./image/.env

copy-env-client: ./client/.env
	cp ./client/.env.example ./client/.env

run: install copy-env-gateway copy-env-users copy-env-resume copy-env-image copy-env-client ## Créé le container et rebuild au besoin les images ayant été modifiées
	echo "run docker microservice"
	docker-compose up --build