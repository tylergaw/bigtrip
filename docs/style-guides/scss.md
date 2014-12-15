# SCSS Coding Guidelines

The Groundwork uses SCSS has its CSS preprocessor. This guide is in place to help
you make decisions about writing CSS.

### 10,000 ft. View: Be Empathetic when writing SCSS
Think about a new designer or developer picking up where you left off. Are your
files clearly named? Are your selectors clear? Have you commented any particularly
troublesome parts of code that may not be apparent?

### Why Do We Need SCSS Guidelines?
- Having standards for things like naming conventions, file organization, bracket style,
etc. helps you–as a writer of SCSS–focus on designing web pages instead of thinking
about those things.
- Familiarity. There will be many, many different apps and sites built on the
foundation that we're creating. Someone who writes SCSS on one app should be
able to immediately jump into the SCSS of another app or site and know what
conventions to use.

### Why SCSS?
We feel that it accomplishes the necessary task better and more efficiently
than the alternatives. See [this issue](https://github.com/thegroundwork/playwell/issues/2)
for some of the reasoning.

## Contents
1. **[Organization](#organization)**
  - [File Structure](#file-structure)
  - [File Naming conventions](#file-naming-conventions)
  - [TOC Files](#toc-files)
2. **[Styleguide](#styleguide)**
  - [Spacing and Indentation](#spacing-and-indentation)
  - [Selectors](#selectors)
  - [ID Selectors](#id-selectors)
  - [Placeholder Selectors](#placeholder-selectors)
  - [Properties](#properties)
  - [Prefixed Properties](#prefixed-properties)
  - [Values](#values)
  - [Nesting](#nesting)
  - [Property/Nesting Order](#property-nesting-order)
  - [Media Queries](#media-queries)

## Organization
Following good file naming and organization is paramount to making it easy for
others to work on SCSS you've written. Staying organized will also help you
remember where you put SCSS months ago.

### File Structure
This is an example file structure.

```
static/
  css/
    styles.css
    scss/
      global.scss
      specific-page.scss
      modules/
        _reset.scss
        _fonts.scss
        _setup.scss
      partials/
        _general.scss
        _banner.scss
        _contentinfo.scss
        _dontate-form.scss
        specific-page/
          _specific-page-general.scss
          _specific-page-banner.scss
```

### File Naming Conventions
Partial SCSS files–files that will only be imported into another `.scss` file–are
prefixed with an underscore "_". Use lowercase with words separated by a dash.

Modules should contain very broad styles and mixins that can be safely imported
into any `.scss` file.

Partials should contain specific styles. This is where the bulk of SCSS will live.
Use a lot of partials and make them as module, page, or feature specific as possible.
Name partials in a way that it is clear what SCSS will be found in them. It is normal
to write SCSS in a general partial to start and then abstract it out into unique
partials.

**Don’t:**
```
_myStyles.scss
_all_the_style.scss
```

**Do:**
```
_donation-form-fields.scss
_main-navigation.scss
```

### TOC Files
The non-prefixed `.scss` files will be compiled
to `.css` files. Those files should not contain SCSS declarations, they should only
contain `@import` statements. They act as a table of contents for the SCSS.

**example global.scss**
```scss
@import "modules/setup";
@import "modules/reset";
@import "partials/general";
@import "partials/banner";
...
```

## Styleguide
These rules are enforced with a SCSS Linter during our build process. The build
will fail if there are mistakes in style. [Learn it. Know it. Live it.](http://youtu.be/iMpTg45k38o)

### Spacing and Indentation
We basically follow the [1TBS](http://en.wikipedia.org/wiki/Indent_style#Variant:_1TBS)

- One space should be after a selector and the opening brace “{”
- Each property should be on its own line
- The closing bracket should be on its own line


Two spaces should be used for indenting properties and nested rules. Be sure to
set your editor to spaces not tabs.

**Don’t:**
```scss
.box{
    color: #fff;
}

.item {list-style: none;}
```

**Do:**
```scss
.box {
  color: #fff;
}

.item {
  color: #fff;
}
```

### Selectors
Use classes as the primary selector. Use attribute selectors less liberally. Use
the child `>` and sibling `+` selectors only when absolutely necessary.

Use your best judgement with pseudo-classes like `:first-child`, `:first-of-type`,
`nth-child`, etc. While they can be helpful, do not try to get too clever with
them. If you can use a class, you probably should for clarity. Also, keep in
mind that a number of pseudo-classes do not have wide browser support.

When in doubt about what type of selector to use, use a class.

- Each selector should be on a new line
- Commas should be trailing with no space before them

**Don’t:**
```scss
.box, .border-box, .headline {
  ...
}
```

**Do:**
```scss
.box,
.border-box,
.headline {
  ...
}
```

### ID Selectors
Do not use IDs as selectors, use classes and attribute selectors. We’re aiming for CSS that is modular and reusable.
Using IDs has CSS couples the CSS to the HTML too tightly. IDs also have too
much specificity. We want to write SCSS in a way that allows styles to be
overridden when needed using the fewest selectors as possible.

**Don’t:**
```scss
#specific-content-box {
  color: #fff;
}
```

**Do:**
```scss
.general-content-box {
  color: #fff;
}

[role="banner"] {
  background-color: blue;
}
```

### Placeholder Selectors
They’re great. Use them! `@extend` them! They are perfect for creating base styles
that many elements can use. If you’re unfamiliar with how they are used, take a
look at this [article](http://thesassway.com/intermediate/understanding-placeholder-selectors).

**Do:**
```scss
%base-btn-styles {
  background-color: blue;
  color: white;
  cursor: pointer;
  text-decoration: none;
}

.big-donate-btn {
  @extend %base-btn-styles;
  background-color: red; // You can override base styles
  font-size: 2em;
}
```

### Properties
Alphabetical property order is preferred and highly recommended. It’s the only property ordering
system that does not require a long explanation. This isn’t a strict requirement though
as it can be hard to keep things in order.

You should put in an effort to maintain order when possible.

**Don’t:**
```scss
.box {
  z-index: 100;
  padding 1em;
  background-color: red;
}
```

**Do:**
```scss
.box {
  background-color: red;
  padding: 1em;
  z-index: 100;
}
```

### Prefixed Properties
Don't worry about those. We use [Autoprefixer](https://github.com/postcss/autoprefixer)
so you can just write the properties a single time. You should familiarize yourself
with the [Autoprefixer docs](https://github.com/postcss/autoprefixer/blob/master/README.md)
as there are some properties that need different handling.

**Don’t:**
```scss
.box {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

**Do:**
```scss
.box {
  border-radius: 5px;
}
```

### Values
- There should be no space before the colon “:”
- There should be one space after the colon “:”
- Zeros should not be followed by a unit
- Floating point values should include a leading 0
- Shorthand values for properties like `padding` and `margin` should specify either two
or four values. Don’t use the three value thing.

**Don’t:**
```scss
.box {
  padding :0px .75em 1px;
}
```

**Do:**
```scss
.box {
  padding: 0 0.75em 1px 0;
}
```

### Nesting

Nesting should be done cautiously. Any more than three levels deep is usually too
deep. Remember that when you nest, you are creating more specific selectors. Each
level of specificity and more CSS that will be output. Only nest when you need
the level of specificity that will be created. Don’t nest as SCSS organization
tactic.

**Don’t:**
```scss
.container {
  .content-container {
    .nav {
      .list-item {
        .common-btn {
          ...
        }
      }
    }
  }
}
```

**Do:**
```scss
.nav .common-btn {
  ...
}
```

### Property/Nesting Order
There are many times where a rule will contain properties for the selector(s) as
well as nested rules. In those cases properties should come before nested rules.

**Don’t:**
```scss
.container {
  .big-button {
    ...
  }

  background-color: red;
  color: white;
}
```

**Do:**
```scss
.container {
  background-color: red;
  color: white;

  .big-button {
    ...
  }
}
```


### Media Queries
[WIP]
