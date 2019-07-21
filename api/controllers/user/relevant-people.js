module.exports = {

  friendlyName: "Relevant People",
  description: "Get list of relevant people for the logged in user",

  fn: async function() {
    try {
      let result = await MSGraphUser.relevantPeople(this.req.headers.authorization)
      return result
    } catch (e) {
      return res.status(e.code).send(e.error);
    }
  }
}