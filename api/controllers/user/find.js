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
    try {
      let searchResults = await MSGraphUser.find(inputs.query, this.req.headers.authorization)
      return searchResults
    } catch (e) {
      return this.res.status(e.code).send(e.error);
    }

  }


};