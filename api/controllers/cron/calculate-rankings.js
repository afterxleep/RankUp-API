module.exports = {


  friendlyName: 'Calculate rankings',
  description: '',


  inputs: {},

  exits: {},

  // NOTE- DO NOT USE!!!!!!
  // This shit is crap and needs a complete refactor!

  fn: async function(inputs) {

    // Update the rank for a user
    var updateRankAndPoints = async function(user, rank, points) {
      console.log("updating" + user)
      await User.update(user.toString()).set({
        rank: rank,
        score: points
      })

    }

    var db = sails.getDatastore().manager;
    db.collection('transaction').aggregate(
        [{
            $group: {
              _id: {
                user: "$user",
              },
              points: {
                $sum: "$points"
              }
            },
          },
          {
            $sort: {
              "points": -1
            }
          }
        ])
      .toArray(function(err, results) {
        if (err) return this.res.serverError(err);
        var rank = 1

        // Loop over existing users and give them the ranking
        let usersToUpdate = []
        results.forEach(function(user) {
          let u = {
            id: user._id.user,
            rank: rank,
            score: user.points
          }
          updateRankAndPoints(user._id.user, rank, user.points)
          rank++
        })
      });

  }


};