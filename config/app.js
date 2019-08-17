module.exports.app = {

  general: {
    flagThreshold: 5, // Number of times a feedback is flagged to be hidden
    likeBoost: 3600, // 1h boost on likes
    domain: "endava.com"
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