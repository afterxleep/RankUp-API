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

    // Feedback Stats
    user.feedbacksReceived = await Feedback.count({
      'to': user.id
    })
    user.feedbacksGiven = await Feedback.count({
      'from': user.id
    })

    let lastFeedbackReceived = await Feedback.find({
      'to': user.id
    }).sort('createdAt DESC').limit(1)
    //console.log(lastFeedbackReceived)

    let lastFeedbackGiven = await Feedback.find({
      'from': user.id
    }).sort('createdAt DESC').limit(1)
    //console.log(lastFeedbackGiven)

    user.lastFeedbackReceived = (lastFeedbackReceived.length) ? lastFeedbackReceived[0].createdAt : 0
    user.lastFeedbackGiven = (lastFeedbackGiven.length) ? lastFeedbackGiven[0].createdAt : 0

    return user
  }
}