module.exports = {

  friendlyName: "Sync Me",
  description: "Get details of the currently logged in user",

  fn: async function() {

    var user = await User.find({
        msid: this.req.user.msid
      })
      .populate("location")
      .populate("area")
    if (!user[0]) {
      return this.res.status(404).send("Provided User does not exist in the local database yet.  Please register.");
    }
    return user[0]

  }
}