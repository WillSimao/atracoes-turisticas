const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserify = require('browserify');
const Babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');

const paths = {
    html: {
        all: 'src/templates/**/*.html'
    },

    img: {
       all: 'src/assets/images/**',
    },

    styles: {
        all: 'src/styles/**/*.scss',
        main: 'src/styles/main.scss',
    },

    scripts: {
        all: 'src/scripts/**/*.js',
        main: 'src/scripts/app.js',
    },

    utilities: {
        all: 'src/scripts/utilities/*.js'
    },

    output: 'dist',
};

function html () {
  return src(paths.html.all).pipe(dest(paths.output)).pipe(connect.reload());
}

function styles() {
    return src(paths.styles.main).pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)).pipe(dest(paths.output)).pipe(connect.reload());
  };


  function server () {
      connect.server({
          root: 'dist',
          livereload: true,
          port: 3000,
        })
    }

    function sentinel () {
      watch(paths.html.all, {ignoreInitial: false}, html);
      watch(paths.styles.all, {ignoreInitial: false}, styles);
      watch(paths.scripts.all, {ignoreInitial: false}, scripts);
      watch(paths.img.all, {ignoreInitial: false}, img);
      watch(paths.utilities.all, {ignoreInitial: false}, utilities);
    }

    function utilities () {
        return src(paths.utilities.all).pipe(dest(paths.output));
    }

    function scripts () {
      return browserify(paths.scripts.main).transform(Babelify.configure({presets: ['@babel/preset-env']})).bundle().pipe(source('bundle.js')).pipe(buffer()).pipe(uglify()).pipe(dest(paths.output)).pipe(connect.reload());
    }

    function img () {
        return src(paths.img.all).pipe(dest(paths.output));
    }

  exports.default = parallel (server, sentinel);
