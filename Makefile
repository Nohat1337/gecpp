PREFIX ?= /usr/local

install:
	@echo "Installing GEC++ Compiler..."
	@cd cli && npm install && npm run build-linux
	@mkdir -p $(DESTDIR)$(PREFIX)/bin
	@cp cli/bin/gecpp $(DESTDIR)$(PREFIX)/bin/gecpp
	@chmod +x $(DESTDIR)$(PREFIX)/bin/gecpp
	@echo "Done. You can now use 'gecpp' command."

uninstall:
	@rm -f $(DESTDIR)$(PREFIX)/bin/gecpp
	@echo "Uninstalled GEC++."
