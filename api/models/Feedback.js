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
      type: 'number',
      defaultsTo: 0
    },
    isLikedByuser: {
      type: 'boolean'
    },
    flags: {
      type: 'number'
    },
    isFlaggedByUser: {
      type: 'boolean'
    },
    isPositive: {
      type: 'boolean'
    }
  }
};