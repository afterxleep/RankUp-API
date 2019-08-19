/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    msid: {
      type: 'string',
      required: true,
      unique: true
    },
    name: {
      type: 'string',
      allowNull: true
    },
    email: {
      type: 'string',
      allowNull: true
    },
    jobTitle: {
      type: 'string',
      allowNull: true
    },
    image: {
      type: 'string',
      defaultsTo: ''
    },
    rank: {
      type: 'number'
    },
    location: {
      model: 'location'
    },
    area: {
      model: 'area',
    },
    valuePoints: {
      type: 'json',
      defaultsTo: {}
    },
    role: {
      type: 'string',
      defaultsTo: 'user'
    },
    is_registered: {
      type: 'boolean',
      defaultsTo: false
    },
    transactions: {
      collection: 'transaction',
      via: 'user'
    }
  },

  // Transaction signup
  afterCreate: function(user, proceed) {
    Transaction.signup(user)
    return proceed();
  }
};