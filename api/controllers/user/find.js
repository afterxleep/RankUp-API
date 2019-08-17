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
      let searchResutls = await MSGraphUser.find(inputs.query, this.req.headers.authorization)
      return searchResutls.filter(function(e) {
        return e.mail.endsWith(sails.config.app.general.domain);
      })
    } catch (e) {
      return this.res.status(e.code).send(e.error);
    }

  }


};