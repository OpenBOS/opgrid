const mix = require('laravel-mix');
const tailwind = require('tailwindcss')
const path = require('path')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .postCss('resources/css/app.css', 'public/css', [
    //    require('postcss-import'),
       require('autoprefixer'),
       tailwind(path.resolve(__dirname, './tailwind.config.js'))
   ]);

mix.webpackConfig({
    devServer: {
        disableHostCheck: true
    }
})

