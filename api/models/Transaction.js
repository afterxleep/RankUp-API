/**
 * Transaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const welcomeToAppStr = "Welcome to RankMe!"
const feedbackGivenToStr = "Feedback given to "
const feedbackReceivedFromStr = "Feedback received from "
const likedFeedbackString = "You've got a boots from "
const positiveTone = "(Recognition) "
const negativeTone = "(Advise) "
const flaggedGivenFeedbackRemoved = "A feedback you gave was removed because it was innapropiate or fake"
const flaggedReceivedFeedbackRemoved = "A feedback you received was removed because it was innapropiate or fake"

const bonusStr = "bonus"
const pointsStr = "points"
const discointStr = "points"

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
      model: 'value',
    }
  },

  // Transaction points
  afterCreate: function(transaction, proceed) {
    console.log("Transaction created")
    User.updateScore(transaction.user)
    return proceed();
  },

  // Award points to the new user
  signup: async function(user) {
    await this.create({
      user: user.id,
      comments: welcomeToAppStr,
      points: sails.config.app.scoring.signupBonus,
      type: bonusStr,
      value: null
    }).fetch()
  },

  // Award points to the originating and receiving users
  feedback: async function(feedback) {

    // Get users
    let destinationUser = await User.findOne(feedback.to)
    let originatingUser = await User.findOne(feedback.from)

    // Points to originating user
    await this.create({
      user: originatingUser.id,
      comments: feedbackGivenToStr + destinationUser.name,
      points: sails.config.app.scoring.feedbackGiven,
      type: bonusStr,
      value: null
    }).fetch()

    // Points to destination user
    let feedbackTone = (feedback.isPositive) ? positiveTone : negativeTone
    await this.create({
      user: destinationUser.id,
      comments: feedbackTone + feedbackReceivedFromStr + originatingUser.name,
      points: (feedback.isPositive) ? sails.config.app.scoring.positiveFeedbackReceived : sails.config.app.scoring.negativeFeedbackReceived,
      type: pointsStr,
      value: feedback.value
    }).fetch()

  },

  // Awards points to the receiving user
  like: async function(like) {
    let fb = await Feedback.findOne(like.feedback)
    if (fb) {
      let originatingUser = await User.findOne(like.from)
      let destinationUser = await User.findOne(fb.to)
      await this.create({
        user: destinationUser.id,
        comments: likedFeedbackString + originatingUser.name,
        points: sails.config.app.scoring.likeReceived,
        type: bonusStr,
        value: fb.value
      }).fetch()
    }
  },

  // Discounts points when feedback is flagged several times
  flag: async function(flag) {
    let fb = await Feedback.findOne(flag.feedback).populate("flags")

    // Discount only if we've reached the threshhold
    if (fb.flags.length == sails.config.app.general.flagThreshold) {

      let originatingUser = await User.findOne(flag.from)
      let destinationUser = await User.findOne(fb.to)

      // Remove the originating user's points
      await this.create({
        user: originatingUser.id,
        comments: flaggedGivenFeedbackRemoved,
        points: sails.config.app.scoring.feedbackGiven * -1,
        type: bonusStr,
        value: null
      }).fetch()

      // Points to destination user
      await this.create({
        user: destinationUser.id,
        comments: flaggedReceivedFeedbackRemoved,
        points: (fb.isPositive) ? sails.config.app.scoring.positiveFeedbackReceived * -1 : sails.config.app.scoring.negativeFeedbackReceived * -1,
        type: pointsStr,
        value: fb.value
      }).fetch()
    }

  },

  // Apply usage discounts to everyone
  useDiscounts: function() {

  }

};