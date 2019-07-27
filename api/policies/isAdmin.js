module.exports = async function(req, res, proceed) {

  if (req.user.role == "admin") {
    return proceed()
  }
  return res.status(401).send({
    error: {
      code: 401,
      message: "You don't have permission to perform this action"
    }
  });
}