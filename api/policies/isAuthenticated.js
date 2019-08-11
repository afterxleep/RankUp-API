const apiURL = sails.config.msgraph.apiURL
const currentUserPath = sails.config.msgraph.currentUserPath

// TODO.  Move this to passport-azure-ad
// Right now is just fetching the user and barely handling errors
module.exports = async function(req, res, proceed) {

  if (!req.headers.authorization) {
    return res.status(401).send("Authentication token not provided");
  }
  try {
    let result = await MSGraphUser.me(req.headers.authorization)
    req.user = result

    // Look for the user in the local DB and return if exists
    let localUser = await User.findOne({
      'msid': req.user.msid
    })
    if (localUser) {
      // Always update the user from graph after fetching
      await User.update({
        msid: req.user.msid
      }).set(req.user).fetch()
      req.user = localUser
    }
    return proceed()
  } catch (e) {
    return res.status(e.code).send(e.error);
  }
}