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

    return {
      feedbacks: await Feedback.find({
          where: inputs
        })
        .populate('from')
        .populate('to')
        .populate('value')
        .limit(limit)
        .skip(skip)
        .sort('sortIndex DESC'),
      totalRecords: await Feedback.count({
        where: inputs
      }),
      skipped: skip,
      limit: limit
    }
  }
};