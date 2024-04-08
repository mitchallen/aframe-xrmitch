# Author: Mitch Allen
# Usage:
#    make
#    make server
#    make serve PORT=8001

PORT ?= 8000

serve:
	@echo "Starting HTTP server on port $(PORT)"
	@python3 -m http.server $(PORT)

.PHONY: serve