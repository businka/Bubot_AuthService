const config = {
  // https: true,
  // host: '0.0.0.0',
  // port: 8080,
  port: 8081,
  open: false, // opens browser window automatically
  proxy: {
    '/AuthService/api/': {
      target: 'http://localhost:8080'
    },
    '/AuthService/public_api/': {
      target: 'http://localhost:8080'
    },
    '/AuthService/i18n/': {
      target: 'http://localhost:8080'
    },
    '/AuthService/form/': {
      target: 'http://localhost:8080'
    },
    '/AuthService/ws': {
      target: 'ws://localhost',
      changeOrigin: true,
      ws: true
    },
    // '/auth': {
    //   target: 'http://localhost:8081'
    // },
    // '/jr': {
    //   target: 'http://localhost:8081'
    // },

  },
  // before: function (app, server) {
  //   require('./core')(app, server)
  // }
  // before: function (app, server) {
  //   require('./auth')(app, server)
  // }

}

module.exports = config
