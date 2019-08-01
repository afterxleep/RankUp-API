const recordsPerpage = 100

module.exports = {

  friendlyName: 'Find',
  description: 'Find feedback.',

  inputs: {
    from: {
      description: 'Initial Date',
      type: 'number'
    },
    to: {
      description: 'Final Date',
      type: 'number'
    },
    page: {
      description: 'Page to display',
      type: 'number'
    },
    value: {
      description: 'Company value to filter data',
      type: 'string'
    },
    isPrivate: {
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

    if (!inputs.skip) {
      inputs.skip = 0
    }

    if (!inputs.limit) {
      inputs.limit = recordsPerpage
    }

    return {
      feedbacks: await Feedback.find({
          where: inputs
        })
        .populate('from')
        .populate('to')
        .populate('value'),

      totalRecords: await Feedback.count(),
      skipped: inputs.skip,
      limit: inputs.limit
    }

  }


};