/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // Non specified stuff, goes always innacesible
  '*': ['isAuthenticated', 'isAdmin'],

  AreaController: {
    'find': ['isAuthenticated'],
  },

  LocationController: {
    'find': ['isAuthenticated']
  },

  MeController: {
    '*': ['isAuthenticated']
  },

  FeedbackController: {
    'find': ['isAuthenticated'],
    //'create': ['isAuthenticated']
  },

  ValueController: {
    'find': ['isAuthenticated']
  }


};