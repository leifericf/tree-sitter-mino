; Literals
(nil) @constant.builtin
(boolean) @boolean
(number) @number
(string) @string
(escape_sequence) @string.escape
(keyword) @string.special.symbol

; Comments
(comment) @comment

; Brackets
["(" ")" "[" "]" "{" "}" "#{"] @punctuation.bracket

; Reader macro prefixes
["'" "`" "~" "~@"] @punctuation.special

; Symbols (generic, overridden below for special forms)
(symbol) @variable

; Function calls: first symbol in a list
(list . (symbol) @function.call)

; Special forms and standard macros override function.call
(list . (symbol) @keyword
  (#any-of? @keyword
    "def" "defmacro" "if" "do" "let" "fn" "loop" "recur"
    "try" "catch" "quote" "quasiquote"
    "when" "cond" "and" "or" "->" "->>"))

; Name being defined after def
(list
  . (symbol) @_kw
  . (symbol) @variable.definition
  (#eq? @_kw "def"))

; Name being defined after defmacro
(list
  . (symbol) @_kw
  . (symbol) @function.macro
  (#eq? @_kw "defmacro"))
