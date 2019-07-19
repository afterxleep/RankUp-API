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
const apiURL = "https://graph.microsoft.com/v1.0"
const peopleAPIPath = "/me/people/?"
const usersPath = "/users/"
const photoPath = "/photo/$value"
const parameters = [
  "$select=displayName,jobTitle,scoredEmailAddresses,companyName", // Get Display Name, score email, and job title
  "$top=50" // Get top 50 users
]
const paramSeparator = "&"
const method = "get"
const emailFilteringCriteria = "endava"
const msGraphErrorPrefix = "MSGraph Error: "
const invalidTokenError = "InvalidAuthenticationToken"

module.exports = {

  attributes: {},
  // Find relevant people to a token holder
  // params: token (string) - MS Graph Access token
  findRelevantPeople: async function(token) {
    const queryURL = apiURL + peopleAPIPath + _.join(parameters, paramSeparator);
    const response = await fetch(queryURL, {
      method: method,
      headers: {
        "Authorization": token,
      },
    });
    const json = await response.json();

    if (json.error) {
      let error = msGraphErrorPrefix + json.error.message
      if (json.error.code == invalidTokenError) {
        throw {
          error: error,
          code: 403
        }
      } else {
        throw {
          error: error,
          code: 500
        }
      }
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
          image: apiURL + usersPath + person.id + photoPath
        }
      })
      .filter(function(person) {
        return person.email.indexOf(emailFilteringCriteria) !== -1
      })
  }
};