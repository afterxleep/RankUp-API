var passport = require('passport')
var BearerStrategy = require('passport-azure-ad').BearerStrategy;

var BEARER_STRATEGY_SETTINGS = {
  identityMetadata: "https://login.microsoftonline.com/endava.onmicrosoft.com/v2.0/.well-known/openid-configuration",
  clientID: "31e5cf9f-5655-43df-bf98-9732798c0a9d",
  //validateIssuer: config.creds.validateIssuer,
  //issuer: config.creds.issuer,
  //passReqToCallback: config.creds.passReqToCallback,
  //isB2C: config.creds.isB2C,
  //policyName: config.creds.policyName,
  //allowMultiAudiencesInToken: config.creds.allowMultiAudiencesInToken,
  //audience: config.creds.audience,
  //loggingLevel: config.creds.loggingLevel,
  //loggingNoPII: config.creds.loggingNoPII,
  //clockSkew: config.creds.clockSkew,
  //scope: config.creds.scope
};
var bearerStrategy = new BearerStrategy(BEARER_STRATEGY_SETTINGS,
  function(token, done) {
    log.info('verifying the user');
    log.info(token, 'was the token retreived');
    findById(token.oid, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        log.info('User was added automatically as they were new. Their oid is: ', token.oid);
        users.push(token);
        owner = token.oid;
        return done(null, token);
      }
      owner = token.oid;
      return done(null, user, token);
    });
  });
passport.use(bearerStrategy);