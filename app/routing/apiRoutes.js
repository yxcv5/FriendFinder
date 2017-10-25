//Import data
var friendsList = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsList);
  });

  app.post("/api/friends", function(req, res) {
    var opts = req.body['opts']; 
    console.log(opts);
    // var keys = Object.keys(req.body);
    // console.log(keys);
    //Find the best matching friend
    var min_diff = 1000;
    var best_match_index = 0;
    friendsList.forEach(function (friend, friend_ind) {
      console.log(friend.scores);
      console.log("index", friend_ind)
      var diffArr = friend.scores.map(function(score, ind) {
        return Math.abs(score - parseInt(opts[ind]));
      });
      console.log(diffArr);
      var diff = diffArr.reduce(function(tot, num) {
        return tot + num;
      });
      console.log(diff);
      if(diff < min_diff) {
        min_diff = diff;
        best_match_index = friend_ind;
      }
    });

    var best_match = {
      name: friendsList[best_match_index].name,
      photo: friendsList[best_match_index].photo
    };

    res.json(best_match);

  });

};