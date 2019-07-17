const missingHeaderError = "An authorization header was not found.  Please provide a valid MS-Graph Auth Header"

module.exports = {

  friendlyName: "User Sync",
  description: "Sync user details with MS APIs",

  exits: {
    forbidden: {
      statusCode: 403,
      message: "tes"
    },
    serverError: {
      statusCode: 500,
    },
  },

  fn: async function(exits) {

    try {
      // Fetch Relevant People via Model
      if (!this.req.headers.authorization) throw "forbidden";
      let result = await MSGraphPeople.findRelevantPeople({
        token: this.req.headers.authorization
      })
      return result
    } catch (e) {
      throw {
        serverError: e
      }
    }
  }
};