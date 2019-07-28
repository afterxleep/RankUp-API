const notRegisteredError = "User is not registered in the database.  Please register"

module.exports = {

  friendlyName: "User Information",
  description: "Get details of the currently logged in user",

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
        error: notRegisteredError,
        data: {
          user: this.req.user
        }
      });
    } else {
      // Get Relevant People Data
      try {
        let result = await MSGraphUser.relevantPeople(this.req.headers.authorization)
        user.relevantPeople = result
      } catch (e) {
        console.log(e)
        return this.res.status(e.code).send(e.error);
      }
      return user
    }
  }
}