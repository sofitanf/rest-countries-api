module.exports = {
    purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'dm-dark-blue': 'hsl(209, 23%, 22%)',
                'dm-very-dark-blue': 'hsl(207, 26%, 17%)',
                'lm-very-dark-blue': 'hsl(200, 15%, 8%)',
                'lm-dark-gray': 'hsl(0, 0%, 52%)',
                'lm-very-light-gray': 'hsl(0, 0%, 98%)',
            },
            fontFamily: {
                nunito: ['nunito', 'sans-serif'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}