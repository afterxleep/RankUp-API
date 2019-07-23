module.exports = {

  friendlyName: "Create a local user",
  description: "Creates a local user with the provided data",

  fn: async function() {

    var user = await User.find({
      msid: this.req.user.msid
    })
    if (user[0]) {
      return this.res.status(400).send("The provided user is already registered.  No action taken.");
    }

    let location = await Location.findOne({
      id: this.req.body.location
    })
    if (!location) return this.res.status(400).send("Provided location is invalid");

    let area = await Area.findOne({
      id: this.req.body.area
    })
    if (!area) return this.res.status(400).send("Provided area is invalid");

    var user = this.req.user
    user.location = location.id
    user.area = area.id
    return await User.create(user).fetch()
  }
}