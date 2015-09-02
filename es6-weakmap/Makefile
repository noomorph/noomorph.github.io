default: index.md
	pandoc -s -f markdown -t html -o index.html < index.md
	juice index.html index.inlined.html
	mv index.inlined.html index.html
