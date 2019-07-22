/**
 * Location.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    geolocation: {
      //{ "type": "Point", "coordinates": [ lat, lng] }
      type: 'json',
      required: true
    },
  }
};