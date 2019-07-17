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
const apiURL = "https://graph.microsoft.com/v1.0/me/people/?"
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

  findRelevantPeople: async function(inputs) {
    const queryURL = apiURL + _.join(parameters, paramSeparator);

    const response = await fetch(queryURL, {
      method: method,
      headers: {
        "Authorization": inputs.token,
      },
    });
    const json = await response.json();

    if (json.error) {
      if (json.error.code == invalidTokenError) {
        throw {
          error: json.error.message,
          code: 403
        }
      } else {
        throw {
          error: msGraphErrorPrefix + json.error.message,
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
          relevance: person.scoredEmailAddresses[0].relevanceScore
        }
      })
      .filter(function(person) {
        return person.email.indexOf(emailFilteringCriteria) !== -1
      })


  }
};