let _ = require("lodash")

var createUsers = async function(users) {
  console.log(usersº)
}

module.exports = {

  friendlyName: "Relevant People",
  description: "Get list of relevant people for the logged in user",

  fn: async function() {
    try {
      let relevantPeople = await MSGraphUser.relevantPeople(this.req.headers.authorization)
      return relevantPeople
    } catch (e) {
      return this.res.status(e.code).send(e.error);
    }
  }
}