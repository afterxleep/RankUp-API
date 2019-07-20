module.exports = {

  friendlyName: "Relevant People",
  description: "Get list of relevant people for the logged in user",

  exits: {
    serverError: {
      statusCode: 500
    }
  },

  fn: async function() {
    try {
      let result = await MSGraphUser.relevantPeople(this.req.headers.authorization)
      return result
    } catch (e) {
      throw {
        "serverError": e
      }
    }
  }
}