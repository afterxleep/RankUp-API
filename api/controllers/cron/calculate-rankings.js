module.exports = {


  friendlyName: 'Calculate rankings',
  description: '',


  inputs: {},

  exits: {},

  fn: async function(inputs) {

    var updateRank = async function(user, rank) {
      await User.update(user.toString()).set({
        rank: rank
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
        results.forEach(function(user) {
          updateRank(user._id.user, rank)
          rank++
        })
      });

  }


};