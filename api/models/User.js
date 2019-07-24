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
    },
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
    jobTitle: {
      type: 'string'
    },
    image: {
      type: 'string'
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
    scores: {
      type: 'json',
      defaultsTo: {
        average: 0,
        thoughtful: 0,
        open: 0,
        adaptable: 0,
        smart: 0,
        trusted: 0
      }
    },
    received_feedbacks: {
      collection: 'feedback',
      via: 'to'
    },
    posted_feedbacks: {
      collection: 'feedback',
      via: 'from'
    },
    role: {
      type: 'string',
      defaultsTo: 'user'
    }

  },

};