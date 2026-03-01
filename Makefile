PREFIX ?= /usr/local

install:
	@echo "Installing GEC++ Secure Compiler..."
	@cd cli && npm install && npm run build-linux
	@mkdir -p $(DESTDIR)$(PREFIX)/bin
	@cp cli/bin/gecpp $(DESTDIR)$(PREFIX)/bin/gecpp
	@chmod +x $(DESTDIR)$(PREFIX)/bin/gecpp
	@echo "--------------------------------------------------"
	@echo "GEC++ Compiler successfully installed to $(PREFIX)/bin/gecpp"
	@echo "Try running: gecpp --help"
	@echo "--------------------------------------------------"

uninstall:
	@rm -f $(DESTDIR)$(PREFIX)/bin/gecpp
	@echo "Uninstalled GEC++."
