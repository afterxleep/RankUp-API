/**
 * Transaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user: {
      model: 'user'
    },
    value: {
      model: 'value'
    },
    comment: {
      type: 'string'
    },
    points: {
      type: 'number'
    }
  },

};