const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const args = require('minimist')(process.argv.slice(2), {
	string: 'env',
	default: { env: process.env.NODE_ENV || 'dev' }
});

const dev = args.env === 'dev';

// eslint
gulp.task('eslint', () => {
	return gulp.src(['**/*.js', '!node_modules/**'])
		.pipe($.plumber())
		.pipe($.eslint())
		.pipe($.eslint.format()) //output console
		.pipe($.eslint.failAfterError());
});

gulp.task('uglify', () => {
	return gulp.src('js/**.js')
		.pipe($.plumber())
		.pipe($.if(dev, $.sourcemaps.init()))
		.pipe($.uglify({
			mangle: true,
			compress: true,
		}))
		.pipe($.if(dev, $.sourcemaps.write()))
		.pipe(gulp.dest('vendor/js/.temp/min'));
});

gulp.task('babel', () => {
	return gulp.src(['es6/**/*.js'])
		.pipe($.plumber())
		.pipe($.if(dev, $.sourcemaps.init()))
		.pipe($.babel({
			presets: ['es2015', 'stage-2']
		}))
		.pipe($.if(dev, $.sourcemaps.write()))
		.pipe(gulp.dest('js'));
});

gulp.task('js', () => {
	return gulp.src(['js/**/*.js'])
		.pipe($.plumber())
		.pipe($.if(dev, $.sourcemaps.init()))
		.pipe($.babel({
			presets: ['es2015']
		}))
		.pipe($.uglify({
			mangle: true,
			compress: true,
		}))
		.pipe($.if(dev, $.sourcemaps.write()))
		.pipe(gulp.dest('vendor/js'));
});

/**
 * sass
 * autoprefixer
 */
gulp.task('sass', () => {
	return gulp.src(['scss/**.scss'])
		.pipe($.plumber())
		.pipe($.if(dev, $.sourcemaps.init()))
		.pipe($.sass.sync({
			outputStyle: 'compressed',
			precision: 10,
			includePaths: ['.']
		}).on('error', $.sass.logError))
		.pipe($.autoprefixer({
			browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
		}))
		.pipe($.if(dev, $.sourcemaps.write()))
		.pipe(gulp.dest(args.env === 'dist' ? 'vendor/css' : 'css'));
});

// SVG Sprite
gulp.task('svg', function() {
	return gulp.src('svg/*.svg')
		.pipe($.plumber())
		.pipe($.svgSprites({
			mode: 'sprite',
			common: 'spdicon',
			baseSize: 12
		}))
		.pipe(gulp.dest('vendor/svg'))
		.pipe(gulp.dest('svgicon'));
});

gulp.task('lint', () => {
	gulp.watch('**/*.js', ['eslint']);
});

gulp.task('es6', () => {
	gulp.watch('es6/**/*.js', ['babel']);
});

gulp.task('dist', [
	'eslint',
	'js',
	'sass'
]);

gulp.task('default', () => {
	gulp.watch('scss/*.scss', ['sass']);
});
