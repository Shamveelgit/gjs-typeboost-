NAME=my-extension
DOMAIN=yourdomain.com

.PHONY: all pack install clean

all: dist/extension.js

node_modules: package.json

dist/extension.js dist/prefs.js: node_modules
	tsc

$(NAME).zip: dist/extension.js dist/prefs.js
	@cp metadata.json dist/
	@cp src/stylesheet.css dist/
	@(cd dist && zip ../$(NAME).zip -9r .)

pack: $(NAME).zip

install: $(NAME).zip
	@touch ~/.local/share/gnome-shell/extensions/$(NAME)@$(DOMAIN)
	@rm -rf ~/.local/share/gnome-shell/extensions/$(NAME)@$(DOMAIN)
	@mv dist ~/.local/share/gnome-shell/extensions/$(NAME)@$(DOMAIN)

clean:
	@rm -rf dist node_modules $(NAME).zip