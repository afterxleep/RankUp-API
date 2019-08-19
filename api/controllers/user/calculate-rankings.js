module.exports = {


  friendlyName: 'Calculate rankings',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function(inputs) {

    await User.find().populate('transaction')

    // All done.
    return;

  }


};