/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  // User Routes
  'GET /api/v1/user/me': {
    action: 'user/me'
  },
  'GET /api/v1/user/me/relevant-people': {
    action: 'user/relevant-people'
  },


};