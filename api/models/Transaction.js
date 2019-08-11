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
    comment: {
      type: 'string'
    },
    points: {
      type: 'number'
    },
    value: {
      type: 'string'
    }
  },

  // Award points to the new user
  signup: async function(user) {
      console.log(user)
      let t = await this.create({
        user: user.id,
        comments: "Welcome to RankMe - Thanks for signing up!",
        points: sails.config.scoring.signupBonus,
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