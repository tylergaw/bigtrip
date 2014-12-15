## Building with Gulp

This project, created with the [Groundwork Yeoman generator][generator], includes a large number of build tasks for the [Gulp][gulp] streaming build system for [NodeJS][nodejs].

## Gulp Tasks

The bulk of the generator is a powerful set of [Gulp][gulp] tasks.

Now that these tasks are part of your project, they are fully customizable for your project-specific uses. If you do customize them, realize that any further use of `yo groundwork` will result in conflict(s).

Each task and sub-task can be executed via `gulp task-name` and multiple tasks can be executed via `gulp task-name task-name-again`. Just calling `gulp` will run the `default` task.

### Configuration

The file `gulp/config.js` is used as a source of configuration for all gulp tasks. Most of this won't need to be changed unless you're heavily customizing things.

The `assets.images.sizes` configuration is an exception and is detailed below.

### help

Using the command `gulp help` you can get a listing of all tasks available in projects started with the generator.

### clean

Wipes out any generated/temporary files and directories.

### html

Copies `.html` files from `src` to `dist`.

### scss

1.  Calls `scss-lint` sub-task.
1.  Preprocesses `.scss` files into `.css`.
1.  Auto-prefixes CSS3 properties (e.g., adding `-webkit`, `-moz`, etc. to properties like `border-radius`).

### s3

Runs the `default` task to compile the project and then uploads the contents of the `dist` directory to the AWS S3 bucket specified in the `S3_BUCKET` environment variable.

To use this task you will need to have an S3 bucket created. You will also need to have the following environment variables set in the shell you are running the command:

```
GW_AWS_ACCESS_KEY_ID=your_key_here
GW_AWS_SECRET_ACCESS_KEY=your_secret
GW_S3_BUCKET=the_s3_bucket
GW_S3_REGION=the_region
```

These environment variables are customizable in `config.js`.

If you want to set these permanently, you can do that in your `.bashrc` or `.bash_profile` file (assuming you use Bash) by adding lines like:

```
export GW_AWS_ACCESS_KEY_ID=your_key_here
export GW_AWS_SECRET_ACCESS_KEY=your_secret
export GW_S3_BUCKET=the_s3_bucket
export GW_S3_REGION=the_region
```

#### Sub-Tasks

##### scss-lint

Performs code quality/standards checks against `.scss` source files.

### js

1.  Runs the `js-quality` sub-task.
1.  Compiles `.js` files using [browserify][browserify].
1.  If the `NODE_ENV` environment variable is `"production"`, the browserify bundle is minified using [uglifyjs][uglifyjs].

    This can be set in your terminal like so:

    ```bash
    export NODE_ENV='production'
    ```

1.  Saves the result to `dist/js`.

#### Sub-Tasks

##### js-lint

Performs linting of `.js` files, looking for code quality issues.

##### js-style

Performs checks to ensure the style of code (e.g., spacing, brackets, etc) is correct.

##### js-quality

Combines `js-lint` and `js-style` sub-tasks into one.

### assets

1.  Runs the `assets-fonts` sub-task.
2.  Runs the `assets-images-process` sub-task.

#### Sub-Tasks

##### assets-fonts

Copies font files from `src/fonts` to `dist/fonts`.

##### assets-images-copy

Used during `watch` to simply copy over images with no resizing or optimization at all.

##### assets-images-process

Calls dynamic `assets-images-*` sub-tasks for customizable resizing and optimizing of images.

##### assets-images-*

Using the `assets.images.sizes` configuration in `gulp/config.js`, a builder can configure a custom set of image sizes and formats to be output.

These are run against all image types.

The `assets.images.sizes` config is an object. The keys of this object are used to define the custom sub-task names as well as appended to the generated image filename. The values of this object are objects which can be passed to [`gulp-image-resize`][gulp-image-resize].

By way of an example, given the following configuration:

```javascript
{
  thumb: {
    crop: true,
    height: 100,
    width: 100
  },
  'phone-2x': {
    height: 480,
    width: 480
  }
}
```

...we would have two custom sub-tasks listed in `gulp help`:

- `assets-images-thumb`: For each image in `src/img`, creates a new image in `dist/img` whose size is exactly 100 pixels by 100 pixels (cropping as necessary). These images would have `thumb` appended to their name, so `foo.jpg` would be output as `foo-thumb.jpg`.
- `assets-images-phone-2x`: For each image in `src/img`, creates a new image in `dist/img` whose size is no more than 480 pixels by 480 pixels (aspect ratio is preserved). These images would have `phone-2x` appended to their name, so `foo.jpg` would be output as `foo-phone-2x.jpg`.

### watch

Runs tasks appropriate to a given file type when any file of that type changes.

For example, saving a `.scss` file will trigger the `scss` task and saving a `.js` file will trigger the `js` task.

### serve

Starts web server process at [http://localhost:8005][http://localhost:8005]. Changes will cause your page to automatically reload.

Because this is a long-running process, it should be run in its own terminal window or tab.

## Travis Config

A [Travis CI][travis] configuration file is included. It's a complete config, but includes a number of the requirements for building a project built with
the generator.

If you are not using Travis with the project, the `.travis.yml` can be removed.

[browserify]: http://browserify.org/
[generator]: https://github.com/thegroundwork/generator-groundwork
[gulp]: http://gulpjs.com/
[gulp-image-resize]: https://www.npmjs.org/package/gulp-image-resize
[nodejs]: http://nodejs.org
[travis]: https://travis-ci.org/
[uglifyjs]: https://github.com/mishoo/UglifyJS2/
