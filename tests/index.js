var test = require('tape')
var config = require('../config')
var app = require('../index')(config)

// Our dataset for testing, which should not already exist
var TEST_HOST = config.host || 'http://127.0.0.1:8001/api/'
var USERNAME = config.username || 'admin'
var PASSWORD = config.password || 'sodasoda'

/*
 * LOG IN
 */
// Assume that we already have a superuser names USERNAME with password 'sodasoda'
test('get all players', function (t) {
  console.log("sending request")
  app.getPlayers({}, function (err, res) {
    console.log("response returned")
    t.notOk(err)
    t.ok(res)
    console.log("res:", res)
    t.end()
  })
})

