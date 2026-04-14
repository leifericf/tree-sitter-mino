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
        $.list,
        $.vector,
        $.map,
        $.set,
        $.quote,
        $.quasiquote,
        $.unquote_splicing,
        $.unquote,
        $.deref,
      ),

    nil: ($) => "nil",

    boolean: ($) => choice("true", "false"),

    number: ($) =>
      token(prec(1, seq(optional(choice("+", "-")), /\d+(\.\d*)?([eE][+-]?\d+)?/))),

    keyword: ($) => token(seq(":", /[^\s,;()\[\]{}'"`~]+/)),

    symbol: ($) => token(/[^\s,;()\[\]{}'"`~@\d:#][^\s,;()\[\]{}'"`~@]*/),

    string: ($) =>
      seq('"', repeat(choice($.escape_sequence, /[^"\\]+/)), '"'),

    escape_sequence: ($) => token.immediate(/\\./),

    list: ($) => seq("(", repeat($._form), ")"),

    vector: ($) => seq("[", repeat($._form), "]"),

    map: ($) => seq("{", repeat($._form), "}"),

    set: ($) => seq("#{", repeat($._form), "}"),

    quote: ($) => seq("'", $._form),

    quasiquote: ($) => seq("`", $._form),

    unquote_splicing: ($) => seq("~@", $._form),

    unquote: ($) => seq("~", $._form),

    deref: ($) => seq("@", $._form),

    comment: ($) => token(seq(";", /.*/)),
  },
});
