# JavaScript Coding Guidelines

>   "Part of being a good steward to a successful project is realizing that writing code for yourself is a Bad Idea™. If thousands of people are using your code, then write your code for maximum clarity, not your personal preference of how to get clever within the spec."
>
>   _Idan Gazit_

The Groundwork follows a strict, but fair coding style for JavaScript. We do so to maintain code integrity and familiarity between projects. Nobody on the team - present or future - should be able to look at raw code and say "John Doe wrote this" or "Jane Smith wrote that."

We use [JSHint][jshint] and [JSCS][jscs] to help enforce our chosen styles. Those both have configuration files where the rules are set: [.jshintrc][jshintrc] and [.jscsrc][jscsrc]. The options in these configuration files are in alphabetical order, so specific rules are easy to find.

This is a living document. It will and should change over time to meet our needs. It's meant to make our work easier. If anything in it becomes a legitimate source of fragile or broken code, we should work together to make necessary changes.

Having said that, the styles we decide on may not match your preferred style. You may have to make compromises while working on Groundwork projects. These rules mostly culled from industry/community best practices and are decided upon with an eye toward what is best for our team and whoever inherits our code in the future.

## Contents
1.  [Linter Rules](#linter-rules)
2.  [Code Style Rules](#code-style-rules)
3.  [Editor Setup](#editor-setup)

## Linter Rules

JSHint is used to identify mistakes and potential sources of problems that are not stylistic in nature.

The following list contains JSHint rules in use with a link to their relevant documentation and any special reasoning or extra detail beyond that provided by the [JSHint options documentation][jshint-options].

-   [browser][jshint-browser]
-   [eqeqeq][jshint-eqeqeq]
-   [forin][jshint-forin]
-   [freeze][jshint-freeze]

    Modifying native prototypes is a particularly dangerous practice. There is almost always a better way to achieve your goals!

-   [latedef][jshint-latedef]
-   [maxdepth][jshint-maxdepth]: 3

    Deeply nested code is a form of [code smell][code-smell]. The goal is not to arbitrarily limit nesting, but to prevent fragile design decisions. Code with high [cyclomatic complexity][cyclomatic-complexity] is often harder to reason about and test, so this option helps limit the number of potential execution paths in your code.

-   [maxparams][jshint-maxparams]: 3

    Similar to "maxdepth," functions with many arguments are [code smells][code-smell] because it is difficult to make certain parameters optional and unnamed arguments are difficult to identify. If your function needs many parameters, consider breaking it into smaller functions or passing an options object, which is a method of passing many parameters to a function using a single argument (a popular style among jQuery plugins).

    Feel free, however, to mix normal arguments with a catch-all/named options object as a final argument. This is another useful practice.

    **Don't**

    In this example, parameter meanings are unclear without referring back to the declaration of `foo` and the second argument cannot be optional:

    ```javascript
    foo('bar', 'baz', 1, true);
    ```

    **Do**

    In this example, parameter meanings are clear and any parameter can be optional.

    ```javascript
    foo({
        name: 'bar',
        count: 1,
        all: true
    });
    ```

-   [newcap][jshint-newcap]
-   [noarg][jshint-noarg]
-   [noempty][jshint-noempty]

    Empty blocks are not actively harmful, but there is also no reason to keep dead code around!

-   [nonew][jshint-nonew]

    While there may be a few cases where not assigning objects created by constructors to variables, they are rare and likely to look like a mistake or otherwise cause confusion.

-   [node][jshint-node]

    Even though most of our code is written for the browser, we are using [browserify][browserify] which uses Node/CommonJS module conventions - so, this prevents JSHint from reporting errors for uses of these names.

-   [strict][jshint-strict]
-   [undef][jshint-undef]
-   [unused][jshint-unused]

## Code Style Rules

JSCS is used to enforce a common coding style rather than identify actual problems in code. This gives code consistency no matter who wrote it.

### Line Length and Indentation

-   [`disallowMixedSpacesAndTabs`][jscs-disallowMixedSpacesAndTabs]
-   [`maximumLineLength`][jscs-maximumLineLength]
-   [`validateIndentation`][jscs-validateIndentation]

Keep lines to **80** characters or fewer. URL comments and regexes are allowed to break the limit to remain on a single line.

Indentation is **2 spaces**. You should set you editor to use expand tabs to spaces (or use "soft tabs").

### Whitespace/Newline Formatting

-   [`disallowTrailingWhitespace`][jscs-disallowTrailingWhitespace]
-   [`requireLineFeedAtFileEnd`][jscs-requireLineFeedAtFileEnd]
-   [`validateLineBreaks`][jscs-validateLineBreaks]

Newlines/EOLs should be Unix-style (`LF`).

All lines should end in a non-whitespace character and all files should end with a single newline/EOL character.

These rules are primarily important because they help avoid meaningless diffs in version control.

Also, ending files with an EOL allows files to be more Unix-friendly (this has been a Unix best practice for decades). For example, `cat`ing a file that does not end in a newline can cause ugliness either in stdout or a resulting file.

### Naming

-   [`requireCamelCaseOrUpperCaseIdentifiers`][jscs-requireCamelCaseOrUpperCaseIdentifiers]
-   [`requireCapitalizedConstructors`][jscs-requireCapitalizedConstructors]

Identifiers should be:

-   `lowerCamelCase` for most things
-   `UPPERCASE_WITH_UNDERSCORES` for pseudo-constants
-   `UpperCamelCase` for constructors

**Don't:**
```javascript
var lower_case = 1;
var Mixed_case = 2;
var mixed_case = 3;
```

**Do:**
```javascript
var camelCase = 1;
var UPPER_CASE = 2;
var MyConstructor = function () {};
```

### Variable Declaration

-   [`disallowTrailingComma`][jscs-disallowTrailingComma]
-   [`requireCommaBeforeLineBreak`][jscs-requireCommaBeforeLineBreak]
-   [`requireMultipleVarDecl`][jscs-requireMultipleVarDecl]

There should only be one `var` statement per block, with one variable per line and commas at the end of each line.

A comma should never be the final element of an array or object literal.

**Don't:**
```javascript
var foo = 1;
var bar = 2;
var obj = {
        one: 1
    , two: 2
};
var arr = [1, 2,];
```

**Do:**
```javascript
var foo = 1,
    bar = 2,
    obj = {
        one: 1,
        two: 2
    },
    arr = [1, 2];
```

### Quote Marks

-   [`validateQuoteMarks`][jscs-validateQuoteMarks]

Use single quotes everywhere - even if you have to escape them!

**Don't:**
```javascript
var a = "This is a string in double quotes";
var b = "This is Dave's string.";
```

**Do:**
```javascript
var a = 'This is a string in single quotes';
var b = 'This is Darla\'s string.';
```

### Curly Braces

-   [`requireCurlyBraces`][jscs-requireCurlyBraces]

Curly braces are required after statements.

**Don't:**
```javascript
while (foo)
    changeFoo();

if (!foo)
    changeFoo();
```

**Do:**
```javascript
while (foo) {
    changeFoo();
}

if (!foo) {
    changeFoo();
}
```

### Operators

-   [`requireOperatorBeforeLineBreak`][jscs-requireOperatorBeforeLineBreak]
-   [`requireSpaceAfterBinaryOperators`][jscs-requireSpaceAfterBinaryOperators]
-   [`requireSpaceBeforeBinaryOperators`][jscs-requireSpaceBeforeBinaryOperators]
-   [`disallowSpaceAfterPrefixUnaryOperators`][jscs-disallowSpaceAfterPrefixUnaryOperators]
-   [`disallowSpaceBeforePostfixUnaryOperators`][jscs-disallowSpaceBeforePostfixUnaryOperators]

These options are set to make sure proper spacing is included around operators like `+`, `-`, `===`, et al.

**Don't:**
```javascript
x = y
    ? 1 : 2;

x +y;

x!== y;

x = ! y; y = ++ z;

x = y ++; y = z --;
```

**Do:**
```javascript
x = y ? 1 : 2;
x = y ?
    1 : 2;

x + y;

x !== y;

x = !y; y = ++z;

x = y++; y = z--;
```

### Object Properties

-   [`requireDotNotation`][jscs-requireDotNotation]

Use dot notation when possible; however, it's required to use bracket notation for reserved words.

**Don't:**
```javascript
var a = obj['foo'];
```

**Do:**
```javascript
var a = obj.foo;
var a = obj['while'];
```

### Keywords

-   [`requireSpaceAfterKeywords`][jscs-requireSpaceAfterKeywords]

All keywords (e.g., `for`, `if`, `return`, `function`, etc.) should be followed by a single space.

**Don't:**
```javascript
if(foo) {
    doStuff();
}

for(...) {
    doStuff();
}
```

**Do:**
```javascript
if (foo) {
    doStuff();
}

for (...) {
    doStuff();
}
```

### Block Statements

-   [`requireSpaceBeforeBlockStatements`][jscs-requireSpaceBeforeBlockStatements]
-   [`requireBlocksOnNewline`][jscs-requireBlocksOnNewline]
-   [`disallowNewlineBeforeBlockStatements`][jscs-disallowNewlineBeforeBlockStatements]
-   [`requireKeywordsOnNewLine`][jscs-requireKeywordsOnNewLine]

Blocks that are more than one line should begin and end with a newline. There should be no newline before the opening bracket of each block. The "else" keyword should appear on its own line. There should be a single space after a paren and before the opening bracket of a block.

**Don't:**
```javascript
if (cond){
    foo();
}

for (var e in elements){
    bar(e);
}

if (true) { doSomething(); doSomethingElse(); }

function doStuff ()
{
    stuff();
}

if (x < 0) {
    x++;
} else {
    x--;
}
```

**Do:**
```javascript
if (cond) {
    foo();
}

for (var e in elements) {
    bar(e);
}

if (true) {
    doSomething();
    doSomethingElse();
}

if (true) { doSomething(); }

function doStuff () {
    stuff();
}

if (x < 0) {
    x++;
}
else {
    x--;
}
```

### Conditional Expressions / Ternary Operators

-   [`requireSpacesInConditionalExpression`][jscs-requireSpacesInConditionalExpression]

A space should be before and after `?` and `:` in conditional expressions.

**Don't:**
```javascript
var a = b? c : d;
var a = b ?c : d;
var a = b ? c: d;
var a = b ? c :d;
```

**Do:**
```javascript
var a = b ? c : d;
```

### Functions

-   [`disallowKeywords`][jscs-disallowKeywords]
-   [`requireSpacesInAnonymousFunctionExpression`][jscs-requireSpacesInAnonymousFunctionExpression]
-   [`requireSpacesInFunctionDeclaration`][jscs-requireSpacesInFunctionDeclaration]
-   [`requireSpacesInFunctionExpression`][jscs-requireSpacesInFunctionExpression]
-   [`requireSpacesInNamedFunctionExpression`][jscs-requireSpacesInNamedFunctionExpression]

Anonymous function declarations and expressions should have a space on either side of the parens. Named function declarations and expressions should have a space before the opening brace but _not_ the opening paren. This is in alignment with [Crockford's style][crockford-style].

The `with` keyword is never to be used!

**Don't:**
```javascript
function doStuff() {
    ...
}

function doStuff (){
    ...
}

function() {
    ...
}

function (){
    ...
}
```

**Do:**
```javascript
function doStuff () {
    ...
}

function () {
    ...
}
```

### Function Parameters

-   [`validateParameterSeparator`][jscs-validateQuoteMarks]

Function parameters should be separated with a comma followed by a single space: `, `.

**Don't:**
```javascript
function doStuff(a , b ,c) {}
```

**Do:**
```javascript
function doStuff(a, b, c) {}
```

### IIFE

-   [`requireParenthesesAroundIIFE`][jscs-requireParenthesesAroundIIFE]

We require parentheses around immediately invoked function expressions.

**Don't:**
```javascript
var a = function () { return 1; }();
var b = !function () { return 2; }();
```

**Do:**
```javascript
var a = (function(){ return 1; })();
var b = (function(){ return 2; }());
```

### Bracket/Paren, Comma, Colon Style

-   [`disallowSpacesInsideParentheses`][jscs-disallowSpacesInsideParentheses]
-   [`disallowSpacesInsideArrayBrackets`][jscs-disallowSpacesInsideArrayBrackets]
-   [`disallowSpacesInsideObjectBrackets`][jscs-disallowSpacesInsideObjectBrackets]
-   [`disallowSpaceAfterObjectKeys`][jscs-disallowSpaceAfterObjectKeys]
-   [`requireSpaceBeforeObjectValues`][jscs-requireSpaceBeforeObjectValues]

Generally, follow English grammar style with brackets/parens (no spaces inside them) and commas/colons (always followed, but never preceded by a single space).

**Don't:**
```javascript
var x = foo( a, b, c );

var x = [ [ 1 ] ];

var x = { a: { b: 1 } };

var x = {a : 1};

var x = {a:1};
```

**Do:**
```javascript
var x = foo(a, b, c);

var x = [[1]];

var x = {a: {b: 1}};

var x = {a: 1};

var x = {a: 1};
```

### Blank Lines

-   [`disallowMultipleLineBreaks`][jscs-disallowMultipleLineBreaks]

There should never be multiple blank lines in a row.

**Don't:**
```javascript
var x = 1;


x++;
```

**Do:**
```javascript
var x = 1;

x++;
```

### Multi-line Strings

-   [`disallowMultipleLineStrings`][jscs-disallowMultipleLineStrings]

Multi-line strings should not be used without concatenation or array `join`ing.

**Don't:**
```javascript
var x = 'multi \
    line';
```

**Do:**
```javascript
var x = 'multi' +
    'line';
var y = [
    'multi',
    'line'
].join('');
```

## Editor Setup

The following outlines configuration for popular editors that will aid you in following these rules.

### Sublime Text

    {
        "default_encoding": "UTF-8",
        "default_line_ending": "unix",
        "detect_indentation": false,
        "ensure_newline_at_eof_on_save": true,
        "rulers": [80],
        "tab_size": 2,
        "translate_tabs_to_spaces": true,
        "trim_trailing_white_space_on_save": true,
        "word_wrap": false,
        "wrap_width": 80
    }

[browserify]: http://browserify.org
[code-smell]: http://en.wikipedia.org/wiki/Code_smell
[crockford-style]: http://javascript.crockford.com/code.html
[cyclomatic-complexity]: http://en.wikipedia.org/wiki/Cyclomatic_complexity
[jscs]: https://github.com/jscs-dev/node-jscs
[jscs-disallowKeywords]: https://github.com/jscs-dev/node-jscs#disallowkeywords
[jscs-disallowMixedSpacesAndTabs]: https://github.com/jscs-dev/node-jscs#disallowmixedspacesandtabs
[jscs-disallowMultipleLineBreaks]: https://github.com/jscs-dev/node-jscs#disallowmultiplelinebreaks
[jscs-disallowMultipleLineStrings]: https://github.com/jscs-dev/node-jscs#disallowmultiplelinestrings
[jscs-disallowNewlineBeforeBlockStatements]: https://github.com/jscs-dev/node-jscs#disallownewlinebeforeblockstatements
[jscs-disallowSpaceAfterObjectKeys]: https://github.com/jscs-dev/node-jscs#disallowspaceafterobjectkeys
[jscs-disallowSpaceAfterPrefixUnaryOperators]: https://github.com/jscs-dev/node-jscs#disallowspaceafterprefixunaryoperators
[jscs-disallowSpaceBeforePostfixUnaryOperators]: https://github.com/jscs-dev/node-jscs#disallowspacebeforepostfixunaryoperators
[jscs-disallowSpacesInsideArrayBrackets]: https://github.com/jscs-dev/node-jscs#disallowspacesinsidearraybrackets
[jscs-disallowSpacesInsideObjectBrackets]: https://github.com/jscs-dev/node-jscs#disallowspacesinsideobjectbrackets
[jscs-disallowSpacesInsideParentheses]: https://github.com/jscs-dev/node-jscs#disallowspacesinsideparentheses
[jscs-disallowTrailingComma]: https://github.com/jscs-dev/node-jscs#disallowtrailingcomma
[jscs-disallowTrailingWhitespace]: https://github.com/jscs-dev/node-jscs#disallowtrailingwhitespace
[jscs-maximumLineLength]: https://github.com/jscs-dev/node-jscs#maximumlinelength
[jscs-requireBlocksOnNewline]: https://github.com/jscs-dev/node-jscs#requireblocksonnewline
[jscs-requireCamelCaseOrUpperCaseIdentifiers]: https://github.com/jscs-dev/node-jscs#requirecamelcaseoruppercaseidentifiers
[jscs-requireCapitalizedConstructors]: https://github.com/jscs-dev/node-jscs#requirecapitalizedconstructors
[jscs-requireCommaBeforeLineBreak]: https://github.com/jscs-dev/node-jscs#requirecommabeforelinebreak
[jscs-requireCurlyBraces]: https://github.com/jscs-dev/node-jscs#requirecurlybraces
[jscs-requireDotNotation]: https://github.com/jscs-dev/node-jscs#requiredotnotation
[jscs-requireLineFeedAtFileEnd]: https://github.com/jscs-dev/node-jscs#requirelinefeedatfileend
[jscs-requireKeywordsOnNewLine]: https://github.com/jscs-dev/node-jscs#requirekeywordsonnewline
[jscs-requireMultipleVarDecl]: https://github.com/jscs-dev/node-jscs#requiremultiplevardecl
[jscs-requireOperatorBeforeLineBreak]: https://github.com/jscs-dev/node-jscs#requireoperatorbeforelinebreak
[jscs-requireParenthesesAroundIIFE]: https://github.com/jscs-dev/node-jscs#requireparenthesesaroundiife
[jscs-requireSpaceAfterBinaryOperators]: https://github.com/jscs-dev/node-jscs#requirespaceafterbinaryoperators
[jscs-requireSpaceAfterKeywords]: https://github.com/jscs-dev/node-jscs#requirespaceafterkeywords
[jscs-requireSpaceBeforeBinaryOperators]: https://github.com/jscs-dev/node-jscs#requirespacebeforebinaryoperators
[jscs-requireSpaceBeforeBlockStatements]: https://github.com/jscs-dev/node-jscs#requirespacebeforeblockstatements
[jscs-requireSpaceBeforeObjectValues]: https://github.com/jscs-dev/node-jscs#requirespacebeforeobjectvalues
[jscs-requireSpacesInAnonymousFunctionExpression]: https://github.com/jscs-dev/node-jscs#requirespacesinanonymousfunctionexpression
[jscs-requireSpacesInConditionalExpression]: https://github.com/jscs-dev/node-jscs#requirespacesinconditionalexpression
[jscs-requireSpacesInFunctionDeclaration]: https://github.com/jscs-dev/node-jscs#requirespacesinfunctiondeclaration
[jscs-requireSpacesInFunctionExpression]: https://github.com/jscs-dev/node-jscs#requirespacesinfunctiondeclaration
[jscs-requireSpacesInNamedFunctionExpression]: https://github.com/jscs-dev/node-jscs#requirespacesinnamedfunctionexpression
[jscs-validateIndentation]: https://github.com/jscs-dev/node-jscs#validateindentation
[jscs-validateLineBreaks]: https://github.com/jscs-dev/node-jscs#validatelinebreaks
[jscs-validateParameterSeparator]: https://github.com/jscs-dev/node-jscs#validateparameterseparator
[jscs-validateQuoteMarks]: https://github.com/jscs-dev/node-jscs#validatequotemarks
[jscsrc]: https://github.com/thegroundwork/chromosphere/blob/master/.jscsrc
[jshint]: http://jshint.org/
[jshint-browser]: http://jshint.org/docs/options/#browser
[jshint-eqeqeq]: http://jshint.org/docs/options/#eqeqeq
[jshint-forin]: http://jshint.org/docs/options/#forin
[jshint-freeze]: http://jshint.org/docs/options/#freeze
[jshint-latedef]: http://jshint.org/docs/options/#latedef
[jshint-maxdepth]: http://jshint.org/docs/options/#maxdepth
[jshint-maxparams]: http://jshint.org/docs/options/#maxparams
[jshint-newcap]: http://jshint.org/docs/options/#newcap
[jshint-noarg]: http://jshint.org/docs/options/#noarg
[jshint-noempty]: http://jshint.org/docs/options/#noempty
[jshint-nonew]: http://jshint.org/docs/options/#nonew
[jshint-node]: http://jshint.org/docs/options/#node
[jshint-options]: http://jshint.org/docs/options/
[jshint-strict]: http://jshint.org/docs/options/#strict
[jshint-undef]: http://jshint.org/docs/options/#undef
[jshint-unused]: http://jshint.org/docs/options/#unused
[jshintrc]: https://github.com/thegroundwork/chromosphere/blob/master/.jshintrc
