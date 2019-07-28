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
    score: {
      type: 'number'
    },
    location: {
      model: 'location'
    },
    area: {
      model: 'area',
    },
    valueScore: {
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
    role: {
      type: 'string',
      defaultsTo: 'user'
    }
  },
};