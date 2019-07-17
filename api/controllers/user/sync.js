const missingHeaderError = "An authorization header was not found.  Please provide a valid MS-Graph Auth Header"

module.exports = {

  friendlyName: "User Sync",
  description: "Sync user details with MS APIs",

  exits: {
    forbidden: {
      statusCode: 403,
    },
    serverError: {
      statusCode: 500,
    },
  },

  fn: async function(exits) {

    // Fetch Relevant People via Model
    if (!this.req.headers.authorization) throw {
      forbidden: missingHeadererror
    };

    try {
      return result = await MSGraphPeople.findRelevantPeople({
        token: this.req.headers.authorization
      })
    } catch (e) {
      throw {
        serverError: e
      }
    }
  }
};