const missingHeaderError = "An authorization header was not found.  Please provide a valid MS-Graph Auth Header"
const invalidHeaderError = "Authorization header was invalid. Please provide a valid MS - Graph Auth Header "

module.exports = {

  friendlyName: "User Sync",
  description: "Sync user details with MS APIs",

  exits: {
    forbidden: {
      statusCode: 403,
    },
  },

  fn: async function(exits) {
    const authHeader = this.req.headers.authorization
    if (!authHeader) throw {
      forbidden: missingHeadererror
    };
    const result = await sails.helpers.msPeople.with({
      token: authHeader
    });
    if (result.error) {
      throw {
        forbidden: invalidHeaderError
      };
    }


  }


};