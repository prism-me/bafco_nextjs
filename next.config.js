module.exports = {
    basePath: process.env.NODE_ENV === 'production' ? `/react/molla/demo-${process.env.NEXT_PUBLIC_DEMO}` : '',
    // basePath: process.env.NODE_ENV === 'production' ? '' : '',
    trailingSlash: true,
    env: {
        PUBLIC_URL: process.env.NODE_ENV === 'production' ? '/' : '/',
        APP_URL: process.env.NODE_ENV === 'production' ? 'https://bafco-next.herokuapp.com/' : 'https://bafco-next.herokuapp.com/'
        // APP_URL: process.env.NODE_ENV === 'production' ? 'https://d-themes.com/react/molla/' : 'http://localhost/'
    },
    i18n: {
        // providing the locales supported by your application
       locales: ["en-US", "es-ES", "it-IT","fr","ar"],
       defaultLocale: "en-US",
     },
}