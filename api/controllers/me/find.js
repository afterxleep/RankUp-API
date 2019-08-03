const notRegisteredError = "User is not registered in the database.  Please register"

module.exports = {

  friendlyName: "User Information",
  description: "Get details of the currently logged in user",

  inputs: {
    id: {
      type: 'string',
      description: 'User ID'
    }
  },

  fn: async function() {
    var user = await User.findOne({
        msid: this.req.user.msid,
        is_registered: true
      })
      .populate("location")
      .populate("area")

    // iF user is not registered, send out a 404
    if (!user) {
      let u = this.req.user
      return this.res.status(404).send({
        code: 404,
        error: notRegisteredError,
        data: {
          user: this.req.user
        }
      });
    }

    // Get feedback status
    user.feedbacksReceived = await Feedback.count({
      'to': user.id
    })

    user.feedbacksGiven = await Feedback.count({
      'from': user.id
    })

    // Last feedback Received and given
    let lastFeedbackReceived = await Feedback.findOne({
      'to': user.id
    })
    let lastFeedbackGiven = await Feedback.findOne({
      'from': user.id
    })
    user.lastFeedbackReceived = (!lastFeedbackReceived) ? 0 : lastFeedbackReceived.createdAt
    user.lastFeedbackGiven = (!lastFeedbackGiven) ? 0 : lastFeedbackGiven.createdAt

    return user
  }
}