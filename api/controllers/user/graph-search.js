module.exports = {

  friendlyName: 'Find',
  description: 'Find User (Using MSGraph)',


  inputs: {
    query: {
      type: 'string',
      description: 'Search Term'
    }
  },


  exits: {},

  fn: async function(inputs) {
    if (!inputs.query) {
      let e = {
        error: "Query string is required",
        code: 400
      }
      return this.res.status(e.code).send(e.error);
    }
    try {
      let searchResults = await MSGraphUser.find(inputs.query, this.req.headers.authorization)
      return searchResults
    } catch (e) {
      return this.res.status(e.code).send(e.error);
    }

  }


};