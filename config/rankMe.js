module.exports.rankme = {

  general: {
    flagThreshold: 5 // Number of times a feedback is flagged to be hidden
  },


  scoring: {
    positiveFeedbackReceived: 50,
    negativeFeedbackReceived: -50,
    feedbackGiven: 5,
    likeReceived: 10,
    noFeedbackReceivedInWeek: -10,
    signupBonus: 100
  }

}