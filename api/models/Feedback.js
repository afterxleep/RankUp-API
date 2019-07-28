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
      model: 'value'
    },
    pushes: {
      type: 'number',
      defaultsTo: 0
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