.PHONY: build
default: help
VERSION=0.2.2
DOCKER_IMAGE=registry.fairbank.io/public-site

docker: ## Build docker image
	npm build
	rm build/static/js/*.map
	docker build -t $(DOCKER_IMAGE):$(VERSION) .

clean: ## Remove temporary files
	@rm -rf build
	@rm -rf node_modules
	@rm -rf coverage
	@rm -rf src/assets/css

build: ## Build for production
	npm run build

start: ## Run dev server
	npm run start

deps: ## Install required dependencies
	npm install

deps-update: ## Update dependencies
	ncu -ua
	npm install

help: ## Display available make targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[33m%-16s\033[0m %s\n", $$1, $$2}'