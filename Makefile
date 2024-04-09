# Author: Mitch Allen
# Usage:
#    make
#    make serve
#    make serve PORT=8001

PORT ?= 8000

serve: build
	@echo "Starting HTTP server on port $(PORT)"
	@python3 -m http.server $(PORT)

update-last-modified:
	@echo "Updating last modified date..."
	@date=`date +%Y-%m-%dT%H:%M:%S` && \
	sed -i.bak 's|<meta name="last-modified" content="[^"]*">|<meta name="last-modified" content="'$$date'">|' index.html && rm index.html.bak

update-commit-id:
	@if [ "$$CF_PAGES" = "1" ]; then \
    	echo "Updating commit-id meta tag... with $$CF_PAGES_COMMIT_SHA"; \
		sed -i.bak -E 's|<meta name="commit-id" content="[^"]*">|<meta name="commit-id" content="'"$$CF_PAGES_COMMIT_SHA"'">|g' index.html && rm index.html.bak; \
	else \
    	echo "CF_PAGES is not set to 1. Skipping update."; \
	fi


build: update-last-modified update-commit-id
	@echo "Building ..."

.PHONY: serve