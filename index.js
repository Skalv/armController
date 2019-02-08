'use strict'

var five = require("johnny-five")
const keypress = require('keypress')

var board = new five.Board()

var Servo1
var currentStep = 0
var step = 5
var rangeMin = 0
var rangeMax = 180

function up () {
  console.log('turn left')
  if (currentStep == rangeMin) return
  currentStep -= step
  Servo1.to(currentStep)
}

function down () {
  console.log('turn right')
  if (currentStep == rangeMax) return
  currentStep += step
  Servo1.to(currentStep)
}

board.on("ready", function() {
  console.log("Démarrage du bras.")
  console.log('||--------------------||')
  console.log('||    Contrôles :     ||')
  console.log('||      q = quit      ||')
  console.log('||   haut = up        ||')
  console.log('||    bas = down      ||')
  console.log('||--------------------||')

  Servo1 = new five.Servo({
    address: 0x40,
    controller: "PCA9685",
    range: [rangeMin, rangeMax],
    pin: 1,
  })
  Servo1.min()

  keypress(process.stdin)
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.setRawMode(true)

  process.stdin.on('keypress', function (ch, key) {
    if (!key) { return }

    if (key.name === "q") {
      Servo1.min()
      process.exit()
    } else if ( key.name === 'up') {
      console.log("up")
      up()
    } else if ( key.name === 'down') {
      console.log("down")
      down()
    }
  });
});




