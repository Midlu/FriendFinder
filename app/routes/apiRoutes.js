module.exports = function(app, path, data) {
  app.get("/api/friends", function(req, res) {
    res.sendFile(path.join(__dirname, "../data/friends.js"));
  });

  app.post("/api/friends", function(req, res) {
    var userScore = [];
    var opponent = [];

    for (i = 0; i < 12; i++) {
      if (isNaN(parseInt(req.body[i]))) {
        console.log("NaN, " + req.body[i]);
      } else {
        console.log("Is a number, " + req.body[i]);
        userScore.push(req.body[i]);
      }
    }

    for (i = 0; i < 10; i++) {
      var difference = 0;

      for (j = 0; j < 10; j++) {
        difference += Math.abs(userScore[i] - data[i].scores[j]);
      }

      opponent.push(difference);
    }

    var lowest = 100;

    opponent.forEach(element => {
      if (parseInt(element) < lowest) {
        lowest = parseInt(element);
      }
    });

    var response = [
      data[opponent.indexOf(lowest)].name,
      data[opponent.indexOf(lowest)].photo
    ];
    res.send(response);
  });
};
