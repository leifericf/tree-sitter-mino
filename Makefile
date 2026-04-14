.PHONY: generate test highlight clean

generate:
	tree-sitter generate

test: generate
	tree-sitter test

highlight: generate
	tree-sitter highlight example.mino

clean:
	rm -rf build
