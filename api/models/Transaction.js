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
    comments: {
      type: 'string'
    },
    type: {
      type: 'string'
      // feedback | discount | bonus
    },
    points: {
      type: 'number'
    },
    value: {
      type: 'string',
      allowNull: true
    }
  },

  // Award points to the new user
  signup: async function(user) {
    let t = await this.create({
      user: user.id,
      comments: "Welcome to RankMe!",
      points: sails.config.scoring.signupBonus,
      type: 'bonus',
      value: null
    })
  },

  // Award points to the originating and receiving users
  feedback: function(feedback) {

  },

  // Awards points to the receiving user
  like: function(feedback) {

  },

  // Discounts points when feedback is flagged several times
  flag: function(feedback) {

  },

  // Apply usage discounts to everyone
  useDiscounts: function() {

  }




};