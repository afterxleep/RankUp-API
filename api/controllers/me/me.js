const moment = require('moment')
const updateInterval = 86400000 // 1 day

module.exports = {

  friendlyName: "Me",
  description: "Get details of the currently logged in user",

  exits: {
    serverError: {
      statusCode: 500
    }
  },

  fn: async function() {

    var user = await User.find({
      msid: this.req.user.msid
    })

    // If the user does not exist in the local store yet create it
    if (!user[0]) {
      user = await User.create(this.req.user).fetch()
    } else {
      // Update the local user data once every 24h
      let refreshDate = new Date().getTime()
      if (user.updatedAt <= refreshDate - updateInterval) {
        user = await User.update({
            msid: this.req.user.msid
          })
          .set({
            name: this.req.user.name,
            email: this.req.user.email,
            jobTitle: this.req.user.jobTitle,
            image: this.req.user.image,
          })
          .fetch()
      }
    }

    return user[0]

  }
}