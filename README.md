# tree-sitter-mino

A [tree-sitter](https://tree-sitter.github.io/) grammar for the [mino](https://github.com/leifericf/mino) language.

Provides syntax highlighting, bracket matching, structural navigation, and code folding in any editor that supports tree-sitter.

## Editor Setup

### Neovim

Add mino to your nvim-treesitter configuration:

```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
parser_config.mino = {
  install_info = {
    url = "https://github.com/leifericf/tree-sitter-mino",
    files = { "src/parser.c" },
    branch = "main",
  },
  filetype = "mino",
}

vim.filetype.add({ extension = { mino = "mino" } })
```

Then run `:TSInstall mino`.

### Helix

Add to `~/.config/helix/languages.toml`:

```toml
[[language]]
name = "mino"
scope = "source.mino"
file-types = ["mino"]
comment-token = ";"
indent = { tab-width = 2, unit = "  " }

[[grammar]]
name = "mino"
source = { git = "https://github.com/leifericf/tree-sitter-mino", rev = "main" }
```

Then run `hx --grammar fetch && hx --grammar build`.

### Zed

Create a language extension or add to your settings:

```json
{
  "languages": {
    "mino": {
      "grammar": "mino",
      "file_types": ["mino"]
    }
  }
}
```

### Emacs (29+)

```elisp
(add-to-list 'treesit-language-source-alist
             '(mino "https://github.com/leifericf/tree-sitter-mino"))
(treesit-install-language-grammar 'mino)
```

## Development

Requires [tree-sitter-cli](https://github.com/tree-sitter/tree-sitter/blob/master/cli/README.md).

```
make generate    # compile grammar.js to C parser
make test        # run test corpus
make highlight   # preview highlighting on example.mino
```

## License

MIT
