module.exports = {


  friendlyName: 'Update',
  description: 'Update feedback.',
  inputs: {},
  exits: {},


  fn: async function(inputs) {
    let feedback = await Feedback.findOne(this.req.params.feedbackId).populate('flags')

    if (feedback) {

      // If this user has already flagged this feedback, throw an error


      // If the feedback has reached the required number of flags, softly Delete it
      if (feedback.flags.length >= sails.config.rankme.general.flagThreshold) {
        await Feedback.update({
          id: feedback.id
        }).set({
          'isDeleted': true
        })
      }

      return await Flags.create({
        'from': this.req.user.id,
        'feedback': this.req.params.feedbackId
      }).fetch()
    }
  }
};