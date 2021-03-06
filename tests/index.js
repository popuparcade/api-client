var test = require('tape')
var config = require('../config')
var app = require('../index')(config)

// Our dataset for testing, which should not already exist
var TEST_HOST = config.host || 'http://127.0.0.1:8001/api/'
var USERNAME = config.username || 'admin'
var PASSWORD = config.password || 'sodasoda'

/*
 * GET Players
 */
// Assume that we already have a superuser names USERNAME with password 'sodasoda'
test('get all players', function (t) {
  app.getPlayers({}, function (err, res) {
    t.notOk(err)
    t.ok(res)
    console.log(JSON.parse(res))
    t.end()
  })
})

test('get lead players', function (t) {
  app.getLeaderPlayers({}, function (err, res) {
    t.notOk(err)
    t.ok(res)
    console.log(JSON.parse(res))
    t.end()
  })
})

var newPlayer = {
  "PlayerId": 0,
  "CodeName": "New Goat3",
  "PicURL": "NULL",
  "ConsoleId": "1",
  "StartTime": "2016-03-19T11:40:20",
  "EndTime": " 2016-03-19T11:40:20",
  "Score": "3",
  "Status": 3
}

test('add a new player', function (t) {
  app.putPlayer({ body: newPlayer }, function (err) {
    console.log(err)
    t.notOk(err)
    t.end()
  })
})

test('get a specific player', function (t) {
  app.getPlayer({ "playerId": "14" }, function (err, res) {
    t.notOk(err)
    t.ok(res)
    // console.log(JSON.parse(res))
    console.log(JSON.parse(res))
    t.end()
  })
})

var playerUpdate = {
  "PlayerId": 14,
  // PlayerSession info:
  "ConsoleId": "3", // When player has completed console 3, they are no longer active
  "StartTime": "2016-03-19T11:40:20",
  "EndTime": " 2016-03-19T11:40:20",
  "Score": "103"
}

test('update an existing player\'s PlayerSession', function (t) {
  app.putPlayer({ body: playerUpdate }, function (err) {
    t.notOk(err)

    // Double check our update by finding our player and printer their sessions:
    app.getPlayer({ "playerId": playerUpdate.PlayerId }, function (err, res) {
      t.notOk(err)
      t.ok(res)
      var updatedPlayer = JSON.parse(res)
      t.ok(updatedPlayer.Id == playerUpdate.PlayerId)
      console.log("Updated player:", updatedPlayer)
      t.end()
    })
  })
})

test('get lead players again for verification', function (t) {
  app.getLeaderPlayers({}, function (err, res) {
    t.notOk(err)
    t.ok(res)
    console.log(JSON.parse(res))
    t.end()
  })
})

