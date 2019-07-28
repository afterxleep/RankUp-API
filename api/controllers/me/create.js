const locationError = "Provided location is invalid"
const locationModel = "location"
const areaError = "Provided area is invalid"
const areaModel = "area"

let _ = require('lodash')

module.exports = {

  friendlyName: "Create a local user",
  description: "Creates a local user with the provided data",

  fn: async function() {

    // Validate location and Area
    let location = await Location.findOne({
      id: this.req.body.location
    })
    if (!location) return this.res.status(400).send(locationError);

    let area = await Area.findOne({
      id: this.req.body.area
    })
    if (!area) return this.res.status(400).send(areaError);

    var user = await User.findOne({
      msid: this.req.user.msid,
      is_registered: true
    })

    // By default set the user data to the Session info
    var u = this.req.user

    // If we've found a user, use it's info
    if (user) {
      u = user
    }
    u.location = location.id
    u.area = area.id
    u.is_registered = true

    // If the user is registered, update it
    var statusCode = 200
    if (user) {
      let result = await User.update({
        msid: user.msid
      }, u)
    } else {
      let result = await User.create(u)
      statusCode = 201
    }

    // Return the user information
    let r = await User.findOne({
        msid: u.msid
      })
      .populate(locationModel)
      .populate(areaModel)
    return this.res.status(statusCode).send(r);
  }
}