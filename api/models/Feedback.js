/**
 * Feedback.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    from: {
      model: 'user'
    },
    to: {
      model: 'user'
    },
    value: {
      model: 'value'
    },
    comment: {
      type: 'string',
      defaultsTo: ''
    },
    isPublic: {
      type: 'boolean'
    },
    isPinned: {
      type: 'boolean'
    },
    likes: {
      collection: 'likes',
      via: 'feedback'
    },
    flags: {
      collection: 'flags',
      via: 'feedback'
    },
    isPositive: {
      type: 'boolean'
    },
    sortIndex: {
      type: 'number'
    }
  },

  // Transaction points
  afterCreate: function(feedback, proceed) {
    Transaction.feedback(feedback)
    return proceed();
  }
};