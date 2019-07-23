module.exports = async function(req, res, proceed) {

  if (req.user.role) {
    return proceed()
  }
  return res.status(401).send("You don't have permission to perform this action");
}