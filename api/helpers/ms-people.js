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
const authHeader = "Authorization"
const method = "post"

module.exports = {

  friendlyName: 'MS People API Helper',
  description: 'Fetches relevant people using Microsoft API for the token bearer user.  https://docs.microsoft.com/en-us/graph/people-example',

  inputs: {
    token: {
      type: "string",
      description: "Microsoft Graph Access token for the specified user",
      required: true
    }
  },

  fn: async function(inputs) {
    const queryURL = apiURL + _.join(parameters, paramSeparator);
    try {
      const response = await fetch(queryURL, {
        method: method,
        body: {},
        headers: {
          authHeader: inputs.token
        },
      });
      return await response.json()
    } catch (e) {
      return e.message;
    }
  }
};