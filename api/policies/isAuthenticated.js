const apiURL = sails.config.msgraph.apiURL
const currentUserPath = sails.config.msgraph.currentUserPath

// TODO.  Move this to passport-azure-ad
// Right now is just fetching the user and barely handling errors
module.exports = async function(req, res, proceed) {

  if (!req.headers.authorization) {
    return res.forbidden()
  }
  try {
    let result = await MSGraphUser.me(req.headers.authorization)
    req.user = result
    return proceed()
  } catch (e) {
    throw {
      "serverError": e
    }
  }

}