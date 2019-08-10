module.exports = {


  friendlyName: 'Update',
  description: 'Update feedback.',
  inputs: {},
  exits: {},


  fn: async function(inputs) {
    let feedback = await Feedback.findOne(this.req.params.feedbackId)
    if (feedback) {
      return await Likes.create({
        'from': this.req.user.id,
        'feedback': this.req.params.feedbackId
      })
    }
  }
};