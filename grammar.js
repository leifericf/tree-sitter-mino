/// <reference types="tree-sitter-cli/dsl" />
// tree-sitter grammar for the mino language.

module.exports = grammar({
  name: "mino",

  extras: ($) => [/[\s,]/, $.comment],

  rules: {
    source: ($) => repeat($._form),

    _form: ($) =>
      choice(
        $.nil,
        $.boolean,
        $.number,
        $.keyword,
        $.symbol,
        $.string,
        $.character,
        $.list,
        $.vector,
        $.map,
        $.set,
        $.quote,
        $.quasiquote,
        $.unquote_splicing,
        $.unquote,
        $.deref,
        $.shorthand_fn,
        $.discard,
        $.metadata,
        $.var_quote,
        $.reader_conditional,
        $.reader_conditional_splice,
        $.tagged_literal,
        $.special_float,
      ),

    nil: ($) => "nil",

    boolean: ($) => choice("true", "false"),

    number: ($) =>
      token(
        prec(
          1,
          choice(
            // Hex: 0xFF, +0xFF, -0xFF
            seq(optional(choice("+", "-")), /0[xX][0-9a-fA-F]+/),
            // Radix: 2r1010, 36rZZ
            seq(optional(choice("+", "-")), /\d{1,2}r[0-9a-zA-Z]+/),
            // Ratio: 1/2, -3/4
            seq(optional(choice("+", "-")), /\d+\/\d+/),
            // Standard decimal with optional N/M suffix
            seq(
              optional(choice("+", "-")),
              /\d+(\.\d*)?([eE][+-]?\d+)?[NM]?/,
            ),
          ),
        ),
      ),

    keyword: ($) => token(seq(":", /[^\s,;()\[\]{}'"`~^]+/)),

    symbol: ($) =>
      token(/[^\s,;()\[\]{}'"`~@\d:#^\\][^\s,;()\[\]{}'"`~@^]*/),

    string: ($) =>
      seq('"', repeat(choice($.escape_sequence, /[^"\\]+/)), '"'),

    escape_sequence: ($) => token.immediate(/\\./),

    character: ($) =>
      token(
        seq(
          "\\",
          choice(
            "space",
            "newline",
            "tab",
            "return",
            "backspace",
            "formfeed",
            /u[0-9a-fA-F]{4}/,
            /o[0-7]{1,3}/,
            /./,
          ),
        ),
      ),

    list: ($) => seq("(", repeat($._form), ")"),

    vector: ($) => seq("[", repeat($._form), "]"),

    map: ($) => seq("{", repeat($._form), "}"),

    set: ($) => seq("#{", repeat($._form), "}"),

    quote: ($) => seq("'", $._form),

    quasiquote: ($) => seq("`", $._form),

    unquote_splicing: ($) => seq("~@", $._form),

    unquote: ($) => seq("~", $._form),

    deref: ($) => seq("@", $._form),

    shorthand_fn: ($) => seq("#(", repeat($._form), ")"),

    discard: ($) => seq("#_", $._form),

    metadata: ($) => seq("^", $._form, $._form),

    var_quote: ($) => seq("#'", $._form),

    reader_conditional: ($) => seq("#?", $.list),

    reader_conditional_splice: ($) => seq("#?@", $.list),

    tagged_literal: ($) => seq("#", $.symbol, $._form),

    special_float: ($) => token(choice("##Inf", "##-Inf", "##NaN")),

    comment: ($) => token(seq(";", /.*/)),
  },
});
