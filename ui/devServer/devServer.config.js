const config = {
  // https: true,
  // host: '0.0.0.0',
  // port: 8080,
  port: 8081,
  open: false, // opens browser window automatically
  proxy: {
    '/api': {
      target: 'http://localhost'
    },
    '/i18n': {
      target: 'http://localhost'
    },
    // '/form': {
    //   target: 'http://localhost'
    // },
    // '/auth': {
    //   target: 'http://localhost:8081'
    // },
    // '/jr': {
    //   target: 'http://localhost:8081'
    // },
    // '/ws': {
    //   target: 'ws://localhost',
    //   changeOrigin: true,
    //   ws: true
    // }
  },
  // before: function (app, server) {
  //   require('./core')(app, server)
  // }
  // before: function (app, server) {
  //   require('./auth')(app, server)
  // }

}

module.exports = config
