import gulp from 'gulp';
import gulpif from 'gulp-if';
import browserSync  from 'browser-sync';
import * as sassPkg  from 'sass';
import gulpSass  from 'gulp-sass';
import cssImport from 'gulp-cssimport';
// import {deleteAsync} from 'del';
import {deleteSync} from 'del';
import htmlmin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import sourcemaps from 'gulp-sourcemaps';
import gulpImg from 'gulp-image';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';

const prepros = true;
const sass = gulpSass(sassPkg);
let dev = false;

export const develop = async () => {
  dev = true;
};

export const html = () => gulp
  .src('src/*.html')
  .pipe(
    gulpif(
      !dev,
      htmlmin({
        removeComments: true,
        collapseWhitespace: true,
      }),
    )
  )
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());

export const css = () => gulp
  .src('src/css/style.css')
  .pipe(cssImport({
    extensions: ['css'],
  }))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());

export const style = () => gulp
  // .src('src/scss/**/*.scss')
  .src('src/scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(
    gulpif(
      !dev,
      cleanCSS({
        2: {			// уровень 2 (группирует медиа-запросы)
          specialComments: 0,
        },
      }),
    ),
  )
  .pipe(
    gulpif(
      !dev,
      autoprefixer({
        cascade: false,
        grid: false,
      }),
    ),
  )
  .pipe(sourcemaps.write('../maps'))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());

export const js = () => gulp
  .src('src/js/**/*.js')
  .pipe(sourcemaps.init())
/*   .pipe(babel({
    presets: ['@babel/preset-env'],
  })) */
  .pipe(terser())
  .pipe(sourcemaps.write('../maps'))
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());

export const img = () => gulp
  .src('src/img/**/*.{jpg,jpeg,png,gif,svg}')
  .pipe(
    gulpif(
      !dev,
      gulpImg({
        optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
        pngquant: ['--speed=1', '--force', 256],
        zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
        jpegRecompress: [
          '--strip',
          '--quality',
          'medium',
          '--min',
          40,
          '--max',
          80,
        ],
        mozjpeg: ['-optimize', '-progressive'],
        gifsicle: ['--optimize'],
        svgo: true,
      }),
    ),
  )
  .pipe(gulp.dest('dist/img'))
  .pipe(
    browserSync.stream({
      once: true,
    }),
  );

export const copy = () => gulp
  .src([
    'src/fonts/**/*',
    // 'src/img/**/*',
  ], {
    base: 'src',
  })
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream({
    once: true,
  }));

export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    // tunnel: true,			// используем редко
    server: {
      baseDir: 'dist',
    },
  });

  gulp.watch('./src/**/*.html', html);
  //gulp.watch('./src/css/**/*.css', css);
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./src/js/**/*.js', js);
  gulp.watch([
    // './src/img/**/*',
    './src/fonts/**/*'
  ], copy);
  gulp.watch('src/img/**/*.{jpg,jpeg,png,gif,svg}', img);
};

// export const clear = () => del('dist/**/*', {force: true});

export const clear = (done) => {
  deleteSync(['dist/**/*'], {
    force: true,
  });
  done();
};

export const base = gulp.parallel(html, style, js, copy, img);

export const build = gulp.series(clear, base);

export default gulp.series(develop, base, server);
