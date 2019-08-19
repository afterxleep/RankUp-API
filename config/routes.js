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

  // Routes for Me Controller
  // Required as automatic routes do not seem to work for shorter than 3 letter controllers
  'get /me': 'MeController.find',
  'post /me': 'MeController.create',
  'put /me': 'MeController.create',

  // Like or flag
  'put /feedback/:feedbackId/like': 'FeedbackController.like',
  'put /feedback/:feedbackId/flag': 'FeedbackController.flag',

  // Get single user
  'get /user/': 'UserController.graph-search',
  'get /user/:id': 'UserController.find-one'

};