.PHONY: build
default: help
VERSION=0.2.1

docker: ## Build docker image
	yarn build
	rm build/static/js/*.map
	docker build -t registry.fairbank.io/public-site:$(VERSION) .

clean: ## Remove temporary files
	@rm -rf build
	@rm -rf node_modules
	@rm -rf coverage
	@rm -rf src/assets/css

build: ## Build for production
	yarn run build

start: ## Run dev server
	yarn run start

deps: ## Install required dependencies
	yarn install

deps-update: ## Update dependencies
	ncu -ua
	yarn install

help: ## Display available make targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[33m%-16s\033[0m %s\n", $$1, $$2}'