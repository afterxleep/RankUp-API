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
    text: {
      type: 'string',
      defaultsTo: ''
    },
    value: {
      type: 'string',
      required: true
      // Values:  thoughtful, open, adaptable, smart, trusted
    },
    total_likes: {
      type: 'number',
      defaultsTo: 0
    },
    reply: {
      type: 'string',
      defaultsTo: ''
    },
    is_public: {
      type: 'boolean',
      defaultsTo: false
    },
    is_pinned: {
      type: 'boolean',
      defaultsTo: false
    }
  },

};