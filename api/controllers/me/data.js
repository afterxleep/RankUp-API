module.exports = {

  friendlyName: "Me",
  description: "Get details of the currently logged in user",

  exits: {
    serverError: {
      statusCode: 500
    }
  },

  fn: async function() {
    return this.req.user
  }
}