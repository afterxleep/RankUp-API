module.exports = {

  friendlyName: "User Information",
  description: "Get details of the currently logged in user",

  inputs: {
    msid: {
      description: 'The ID of the user to look up.',
      type: 'string'
    }
  },

  fn: async function() {
    var user = await User.findOne({
        msid: this.req.user.msid,
        is_registered: true
      })
      .populate("location")
      .populate("area")
    if (!user) {
      let u = this.req.user
      return this.res.status(404).send({
        code: 404,
        error: "User is not registered in the database.  Please register",
        data: this.req.user
      });
    }
    return user
  }
}