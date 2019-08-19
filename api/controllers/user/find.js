module.exports = {

  friendlyName: 'Find',
  description: 'Find User (Using MSGraph)',


  inputs: {
    query: {
      type: 'string',
      description: 'Search Term'
    },
    skip: {
      description: 'Items to skip',
      type: 'number',
    },
    limit: {
      description: 'Limit query to specific number of items',
      type: 'number',
    },
    sort: {
      type: 'string',
      description: "Sort Criteria for the result"
    }
  },


  exits: {},

  fn: async function(inputs) {

    // If we are running a search, use graph by default
    if (inputs.query) {
      try {
        let searchResults = await MSGraphUser.find(inputs.query, this.req.headers.authorization)
        return searchResults
      } catch (e) {
        return this.res.status(e.code).send(e.error);
      }
    }

    return await User.find(inputs)
      .sort(inputs.sort)
  }

};