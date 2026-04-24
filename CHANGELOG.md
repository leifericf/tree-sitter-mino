# Changelog

All notable changes to tree-sitter-mino are documented here.

## Unreleased

- Numeric literals, reader macros, and tagged literals
- Metadata reader syntax
- Anonymous function `#()` and discard `#_` syntax
- Deref `@` reader macro
- Core macro keyword highlighting
- Character literals with full mino reader coverage: `\space`, `\newline`,
  `\tab`, `\return`, `\backspace`, `\formfeed`, `\uNNNN` unicode escape,
  `\oNNN` octal escape, `\{` terminator-as-literal, and UTF-8 multibyte
  characters. Highlight rule added so editors colorize `(character)`.

## v0.1.0

Initial release.

- S-expression grammar (lists, vectors, maps, sets)
- Strings, keywords, symbols, numbers, booleans, nil
- Comments
- Syntax highlighting queries
