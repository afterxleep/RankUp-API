module.exports = {


  friendlyName: 'Create',
  description: 'Create location.',

  inputs: {

  },


  exits: {
    invalidLocation: {
      description: 'Provided Location was invalid',
      responseType: 'badRequest'
    }
  },


  fn: async function(inputs) {

    if (!this.req.body.geolocation.latitude || !this.req.body.geolocation.longitude) {
      throw {
        invalidLocation: {
          error: "Provided Location was invalid.  Verify the format",
          code: 400
        }
      }
    }

    let geolocation = {
      type: "Point",
      coordinates: [this.req.body.geolocation.longitude, this.req.body.geolocation.latitude]
    }
    let l = {
      name: this.req.body.name,
      geolocation: geolocation
    }
    return Location.create(l).fetch()

  }


};