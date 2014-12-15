# Environment Setup

This document describes how to set up your environment for working with this project.

## Git

If you don't have Git installed, you can do the following:

-   On Mac OS X, [install Xcode Command Line Tools][xcode-clt], which comes with Git included.

    You may want to install Git via [Homebrew][homebrew] as it will make installing and managing packages _much_ easier on a Mac.

-   On Linux, use your package manager (e.g., `apt-get`).
-   As a last resort, refer to [git-scm.com][git-scm] for manual install.

## NodeJS/NPM

If your machine does _not_ include NodeJS/NPM, you may have to install them yourself. They are included together and can be installed in a few ways:

-   **Preferred:** package managers for your OS (`brew`, `apt-get`, etc).
-   Downloadable installer from [nodejs.org][nodejs].
-   [nvm][nvm], if you need to run multiple NodeJS versions. It can be installed with `curl` or `wget`.

Some global modules should be installed:

-   [bower][bower]
-   [browserify][browserify]
-   [gulp][gulp]

```bash
npm install -g bower@1.3.x browserify@6.0.x gulp@3.8.x
```

### Bower

You may have a need to install third-party libraries in a way that NPM doesn't support - for example, non-JavaScript assets.

The recommended approach to install third-party assets _which are not available via NPM_ is to use [Bower][bower].

Similar to NPM's `package.json` file, there is a `bower.json` file provided by default. This is where you can outline your dependencies - or add them automatically via the `--save` flag during `bower install`. Packages are installed to `bower_components`.

It's up to the developer to point to these resources because, unlike NPM, Bower is intended for use with all kinds of front-end assets. There is no standard structure for Bower packages (in fact, most are just Git repositories).

[bower]: http://bower.io/
[bower-json]: http://bower.io/docs/creating-packages/#bowerjson
[browserify]: http://browserify.org/
[git-scm]: http://git-scm.com/
[gulp]: http://gulpjs.com/
[gulp-image-resize]: https://www.npmjs.org/package/gulp-image-resize
[homebrew]: http://brew.sh/
[nodejs]: http://nodejs.or/g
[npm-link]: https://www.npmjs.org/doc/cli/npm-link.html
[nvm]: https://github.com/creationix/nvm/
[ruby-gems]: http://rubygems.org/
[ruby-lang]: http://ruby-lang.org/
[uglifyjs]: https://github.com/mishoo/UglifyJS2/
[yeoman]: http://yeoman.io/
[travis]: https://travis-ci.org/
[xcode-clt]: http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/
