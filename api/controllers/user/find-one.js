module.exports = {


  friendlyName: 'Find one',
  description: '',

  inputs: {
    id: {
      type: 'string',
      description: 'Microsoft User ID',
      required: true
    }
  },


  exits: {},

  fn: async function(inputs) {

    let userData = await User.findOne({
        msid: inputs.id
      })
      .populate('location')
      .populate('area')

    if (userData) {
      return userData
    }

    // No user was found, try MSGraph or fail completely

    try {
      let msUser = await MSGraphUser.findById(inputs.id, this.req.headers.authorization)
      msUser.area = null
      msUser.location = null
      msUser.rank = 0
      msUser.valuePoints = {}
      msUser.role = 'user'
      msUser.is_registered = false
      return msUser
    } catch (e) {
      return this.res.status(404).send({
        error: {
          code: 404,
          message: "The requested user does not exist"
        }
      });
    }
  }
};