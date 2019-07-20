/**
 * MSPeople.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// Includes
const _ = require("lodash")
const fetch = require("node-fetch")

// Constants
const apiURL = sails.config.msgraph.apiURL
const currentUserPath = sails.config.msgraph.currentUserPath
const peoplePath = currentUserPath + sails.config.msgraph.peoplePath
const usersPath = sails.config.msgraph.usersPath
const photoPath = sails.config.msgraph.photoPath
const parameters = [
  "$select=displayName,jobTitle,scoredEmailAddresses,companyName", // Get Display Name, score email, and job title
  "$top=50", // Get top 50 users
  "$filter=personType/class eq 'Person' and personType/subclass eq 'OrganizationUser'" // Filter to active users from current organization
]
const pathSeparator = "/"
const paramSeparator = "&"
const msGraphErrorPrefix = "MSGraph Error: "
const invalidTokenError = "InvalidAuthenticationToken"

// Handles error for MSGraph calls
// params: error (MSGraphError) - MS Graph Error Message
function handleError(error) {
  let e = msGraphErrorPrefix + error.message
  if (e.code == invalidTokenError) {
    throw {
      error: e,
      code: 403
    }
  } else {
    throw {
      error: e,
      code: 500
    }
  }
}

module.exports = {

  // Get Current User Details
  // params: token (string) - MS Graph Access token
  me: async function(token) {
    const queryURL = apiURL + currentUserPath
    const response = await fetch(queryURL, {
      method: 'get',
      headers: {
        "Authorization": token,
      },
    });
    const json = await response.json();
    if (json.error) {
      handleError(json.error)
    }

    let user = {
      id: json.id,
      name: json.displayName,
      jobTitle: json.jobTitle,
      mail: json.mail.toLowerCase(),
      image: apiURL + currentUserPath + photoPath
    }
    return user
  },

  // Find relevant people to a token holder
  // params: token (string) - MS Graph Access token
  relevantPeople: async function(token) {
    const queryURL = apiURL + peoplePath + _.join(parameters, paramSeparator);
    const response = await fetch(queryURL, {
      method: 'get',
      headers: {
        "Authorization": token,
      },
    });
    const json = await response.json();

    if (json.error) {
      handleError(json.error)
    }

    // Clean up the results, and returns only users with endava emails
    return json.value
      .map(function(person) {
        return {
          id: person.id,
          name: person.displayName,
          jobTitle: person.jobTitle,
          email: person.scoredEmailAddresses[0].address.toLowerCase(),
          relevance: person.scoredEmailAddresses[0].relevanceScore,
          image: apiURL + usersPath + pathSeparator + person.id + photoPath
        }
      })
  }
};