module.exports = {


  friendlyName: 'Update',
  description: 'Update feedback.',
  inputs: {},
  exits: {},

  fn: async function(inputs) {
    let feedback = await Feedback.findOne(this.req.params.feedbackId)
    if (feedback) {

      // Update the feedback sortIndex to push it up
      await Feedback.update({
        id: feedback.id
      }).set({
        sortIndex: feedback.sortIndex + sails.config.app.general.likeBoost
      })

      return await Likes.create({
        'from': this.req.user.id,
        'feedback': this.req.params.feedbackId
      }).fetch() // Fetch required to trigger afterCreate
    }
  }
};