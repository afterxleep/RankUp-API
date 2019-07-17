const missingHeaderError = "An authorization header was not found.  Please provide a valid MS-Graph Auth Header"

module.exports = {

  friendlyName: "User Sync",
  description: "Sync user details with MS APIs",

  exits: {
    unauthorized: {
      statusCode: 403,
    },
    serverError: {
      statusCode: 500,
    }
  },


  fn: async function(exits) {

    if (!this.req.headers.authorization) {
      throw {
        "unauthorized": missingHeaderError
      };
    }

    try {
      let result = await MSGraphPeople.findRelevantPeople({
        token: this.req.headers.authorization
      })
      return result

    } catch (e) {
      if (e.code == 403) {
        throw {
          "unauthorized": e.error
        }
      } else {
        throw {
          "serverError": e.error
        }
      }
    }
  }
};