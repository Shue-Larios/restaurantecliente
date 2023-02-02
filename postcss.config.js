// este tiene toda la configuracion de postcss

const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        // le indicamos donde esta el archivo
        tailwindcss('./tailwind.js'),
        require('autoprefixer')
    ]
}