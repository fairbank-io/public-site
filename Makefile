default: docker
VERSION=0.1.0

docker:
	yarn build
	docker build -t registry.fairbank.io/website:$(VERSION) .