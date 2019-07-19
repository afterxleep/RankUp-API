var passport = require('passport');

module.exports = async function(req, res, proceed) {

  passport.authenticate('oauth-bearer', {
      session: false
    }),
    function(req, res) {
      return proceed()
      return res.forbidden()
    };

};