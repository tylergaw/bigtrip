# bigtrip [![Build Status](https://travis-ci.org/tylergaw/bigtrip.svg)](https://travis-ci.org/tylergaw/bigtrip)

## Bundled Documentation

-   [Style Guides][docs-style]

    Coding standards and style guide(s) for HTML, JavaScript, and SCSS.

-   [Environment Setup][docs-env]

    Setting up your environment to work on this project.

-   [Building with Gulp][docs-build]

    Using the built-in Gulp tasks for building and deploying a static site.

## Get Started

Assuming you've got [your environment set up][docs-env], do the following to get started (making replacements as needed):

1.  Clone this repository and `cd` into its directory.

    ```bash
    git clone git@github.com:thegroundwork/bigtrip.git && cd bigtrip
    ```

1.  Install any local NPM and Bower modules.

    ```bash
    npm install && bower install
    ```

1.  Build the project.

    ```bash
    gulp
    ```

1.  Make the project available via a local web server (_optional_: you can also open `dist/index.html` directly in a browser).

    ```bash
    gulp serve
    ```

## Working

For more detail on what Gulp tasks are available, check out ["Building with Gulp"][docs-build].

1.  Watching the `src` and building when changes occur:

    ```bash
    gulp watch
    ```

1.  Serving the site and enabling live reload when changes occur:

    ```bash
    gulp serve
    ```

_Note:_ Sometimes `gulp watch` and `gulp serve` can get out of sync. If that happens, just cancel them (`Ctrl+C`) and re-run them.

[docs-build]: docs/build.md
[docs-env]: docs/environment-setup.md
[docs-style]: docs/style-guides
