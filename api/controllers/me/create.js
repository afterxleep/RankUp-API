module.exports = {

  friendlyName: "Create a local user",
  description: "Creates a local user with the provided data",

  fn: async function() {

    // Validate location and Area
    let location = await Location.findOne({
      id: this.req.body.location
    })
    if (!location) return this.res.status(400).send("Provided location is invalid");

    let area = await Area.findOne({
      id: this.req.body.area
    })
    if (!area) return this.res.status(400).send("Provided area is invalid");

    var user = await User.findOne({
      msid: this.req.user.msid,
      is_registered: true
    })

    // By default set the user data to the Session info
    var u = this.req.user

    // If we already have a user, use that info
    if (user) {
      u = user
    }
    u.location = location.id
    u.area = area.id
    u.is_registered = true

    // If the user is registered, update it
    if (user) {
      let result = await User.update({
        msid: user.msid
      }, u).fetch()
      return result[0]
    } else {
      let result = await User.create(u).fetch()
      return this.res.status(201).send(result);
    }
  }
}