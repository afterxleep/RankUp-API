/**
 * FeedbackLikes.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    from: {
      model: 'user'
    },
    feedback: {
      model: 'feedback'
    }

  },

  // Transaction points
  afterCreate: function(like, proceed) {
    Transaction.like(like)
    return proceed();
  }

};