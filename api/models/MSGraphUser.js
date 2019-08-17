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
const usersPath = sails.config.msgraph.usersPath
const peoplePath = currentUserPath + sails.config.msgraph.peoplePath
const photoPath = sails.config.msgraph.photoPath
const relevantUsersParameters = [
  "$select=displayName,jobTitle,scoredEmailAddresses,companyName", // Get Display Name, score email, and job title
  "$top=50", // Get top 50 users
  "$filter=personType/class eq 'Person' and personType/subclass eq 'OrganizationUser'" // Filter to active users from current organization
]
const findUsersParameters = {
  base: [
    "$select=id,displayName,mail",
    "$top=50"
  ],
  filter: "$filter=(startswith(displayName,'query') or startswith(surname,'query') or startswith(mail,'query') or startswith(userPrincipalName,'query'))",
  searchTermPlaceholder: "query"
}
const pathSeparator = "/"
const paramSeparator = "&"
const urlParamSeparator = "?"
const msGraphErrorPrefix = "MSGraph Error: "
const invalidTokenError = "InvalidAuthenticationToken"
const resourceNotFoundError = "Request_ResourceNotFound"
const scoreFilterHigherThan = 200

// Handles error for MSGraph calls
// params: error (MSGraphError) - MS Graph Error Message
let handleError = function(error) {
  let e = msGraphErrorPrefix + error.message

  switch (error.code) {
    case invalidTokenError:
      throw {
        error: e,
        code: 401
      }
      break;
    case resourceNotFoundError:
      throw {
        error: e,
        code: 404
      }
      break;
    default:
      throw {
        error: e,
        code: 500
      }
  }
}

// Parses and MSGraph User object
let parseUser = function(json) {
  let user = {
    msid: json.id,
    name: json.displayName,
    jobTitle: json.jobTitle,
    email: json.mail.toLowerCase(),
    image: apiURL + usersPath + pathSeparator + json.id + photoPath
  }
  return user
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

    return parseUser(json)
  },

  findById: async function(msid, token) {
    const queryURL = apiURL + usersPath + '/' + msid
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

    return parseUser(json)
  },

  // Find People using a search term
  find: async function(searchString, token) {

    let regex = "/" + findUsersParameters.searchTermPlaceholder + "/g"
    let filter = findUsersParameters.filter.replace(eval(regex), searchString)
    let searchParams = _.join(findUsersParameters.base, paramSeparator) + paramSeparator + filter
    const queryURL = apiURL + usersPath + urlParamSeparator + searchParams;
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

    // Add images
    json.value.map(function(person) {
      person.image = apiURL + usersPath + pathSeparator + person.id + photoPath
    })

    return json.value
  },

  // Find relevant people to a token holder
  // params: token (string) - MS Graph Access token
  relevantPeople: async function(token) {
    const queryURL = apiURL + peoplePath + _.join(relevantUsersParameters, paramSeparator);
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
      .filter(person => person.scoredEmailAddresses[0].relevanceScore > scoreFilterHigherThan)
      .map(function(person) {
        return {
          msid: person.id,
          name: person.displayName,
          jobTitle: person.jobTitle,
          email: person.scoredEmailAddresses[0].address.toLowerCase(),
          //relevance: person.scoredEmailAddresses[0].relevanceScore,
          image: apiURL + usersPath + pathSeparator + person.id + photoPath
        }
      })
  }
};