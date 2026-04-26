.PHONY: generate test highlight clean

generate:
	tree-sitter generate

test: generate
	tree-sitter test

highlight: generate
	tree-sitter highlight example.clj

clean:
	rm -rf build
