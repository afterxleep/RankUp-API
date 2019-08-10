const recordsPerpage = 100

module.exports = {

  friendlyName: 'Create',
  description: 'Create feedback.',

  inputs: {
    msid: {
      description: 'Microsoft ID of the receiving user',
      type: 'string',
      required: true
    },
    comment: {
      description: 'Feedback Comment',
      type: 'string',
      required: true
    },
    value: {
      description: 'Value for feedback',
      type: 'string',
      required: true
    },
    isPositive: {
      description: 'Whether the feedback is positive or not',
      type: 'boolean',
      required: true
    },
    isPublic: {
      description: 'Wether the feedback is public or not',
      type: 'boolean',
      required: true
    }
  },


  exits: {},
  fn: async function(inputs) {

    // Finds the user in the local DB
    var destinationUser = await User.findOne({
      'msid': inputs.msid
    })

    // If no User, fetches a Microsoft user
    if (!destinationUser) {
      try {
        let msUser = await MSGraphUser.findById(inputs.msid, this.req.headers.authorization)
        destinationUser = await User.create(msUser).fetch()
      } catch (e) {
        return this.res.status(404).send({
          error: {
            code: 400,
            message: "The specified user does not exist in Active Directory"
          }
        });
      }
    }

    // Validate Provided Value
    let value = await Value.count({
      'id': inputs.value
    })
    if (!value) {
      return this.res.status(400).send({
        error: {
          code: 400,
          message: "The specified value does not exist"
        }
      });
    }

    // Proceed with feedback creation
    let feedback = {
      from: this.req.user.id,
      to: destinationUser.id,
      value: inputs.value,
      comment: inputs.comment,
      isPublic: inputs.isPublic,
      isPositive: inputs.isPositive,
      sortIndex: Date.now() / 1000 | 0
    }

    if (feedback.from == feedback.to) {
      return this.res.status(400).send({
        error: {
          code: 400,
          message: "You cannot give feedback to yourself"
        }
      });
    }

    let createdFeedback = await Feedback.create(feedback).fetch()

    // Return the created complete feedback object
    return this.res.status(201).send(
      await Feedback.findOne(createdFeedback.id)
      .populate('from')
      .populate('to')
      .populate('value'))
  }

};