const recordsPerpage = 100

module.exports = {

  friendlyName: 'Find',
  description: 'Find feedback.',

  inputs: {
    from: {
      description: 'Initial Date',
      type: 'string'
    },
    to: {
      description: 'Final Date',
      type: 'string'
    },
    value: {
      description: 'Company value to filter data',
      type: 'string'
    },
    isPublic: {
      description: 'Include Only Private feedbacks',
      type: 'boolean'
    },
    isPinned: {
      description: 'Include Only Pinned feedbacks',
      type: 'boolean'
    },
    skip: {
      description: 'Items to skip',
      type: 'number',
    },
    limit: {
      description: 'Limit query to specific number of items',
      type: 'number',
    },
  },


  exits: {},
  fn: async function(inputs) {

    let skip = (!inputs.skip) ? 0 : inputs.skip
    let limit = (!inputs.limit) ? recordsPerpage : inputs.limit
    delete inputs.skip
    delete inputs.limit

    // If the user is requesting private feedback, override the 'to' with his
    if (inputs.isPublic == false) {
      inputs.to = this.req.user.id
    }

    let feedbacks = await Feedback.find({
        where: inputs
      })
      .populate('from')
      .populate('to')
      .populate('value')
      .populate('likes')
      .populate('flags')
      .limit(limit)
      .skip(skip)
      .sort('sortIndex DESC')


    let currentUserId = this.req.user.id

    // Likes count and whether if it's liked or flagged by the user
    feedbacks.map(function(feedback) {

      //Defaults to false
      feedback.isLikedByuser = false
      feedback.isFlaggedByuser = false

      if (feedback.likes.length > 0) {
        let likesByUser = feedback.likes.filter(function(like) {
          return like.from === currentUserId
        })
        feedback.isLikedByuser = (likesByUser.length > 0) ? true : false
      }
      if (feedback.flags.length > 0) {
        let flagsByUser = feedback.flags.filter(function(flag) {
          return flag.from === currentUserId
        })
        feedback.isFlaggedByuser = (flagsByUser.length > 0) ? true : false
      }
      feedback.likes = feedback.likes.length
      feedback.flags = feedback.flags.length
    })

    return {
      feedbacks: feedbacks,
      totalRecords: await Feedback.count({
        where: inputs
      }),
      skipped: skip,
      limit: limit
    }
  }
};