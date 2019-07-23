module.exports = {

  datastores: {
    default: {
      adapter: 'sails-mongo',
      url: 'mongodb://127.0.0.1/rank-me-development'
    },
  },

  models: {
    migrate: 'safe',
    cascadeOnDestroy: false,
  },

  blueprints: {
    actions: true,
    rest: true,
    shortcuts: true,
  },

  security: {
    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
    },
  },

  session: {
    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },

  },

  sockets: {
    onlyAllowOrigins: [],
  },

  log: {
    level: 'debug'
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
    // trustProxy: true,
  },

  // port: 80,
  // ssl: undefined,

  custom: {},



};