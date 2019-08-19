module.exports = {


  friendlyName: 'Calculate rankings',
  description: '',


  inputs: {},

  exits: {

  },


  fn: async function(inputs) {

    // All done.
    let users = User.find().populate('transactions')
    return users;

  }


};