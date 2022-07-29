//let socket = new WebSocket('wss://192.168.1.208:8000');
let socket = new WebSocket('wss://wssserver.festivalle.it:8000');

socket.addEventListener('open', readyToStart);

// Initializes sensor's Event Listeners
function readyToStart(event) {
  window.addEventListener('deviceorientation', giroscopio);
  window.addEventListener('devicemotion', accellerometro);
}

const buffer_dati = new Array();
const MAX_ROTATION = 1800; // Rotation rate value corresponding to a multiplying factor of MAX_MULTIPLIER of the acceleration.
const BUFFER_LENGTH = 20; // Number of single user data to be stored in the buffer.
const MAX_MULTIPLIER = 1.5; // Maximum value of RotationRate as a weight for the acceleration.

/*
ACCELERATION: An object giving the acceleration of the device on the three axis X, Y and Z. Acceleration is expressed in m/s²
ROTATION RATE: An object giving the rate of change of the device's orientation on the three orientation axis alpha, beta and gamma. Rotation rate is expressed in degrees per seconds.
INTERVAL: A number representing the interval of time, in milliseconds, at which data is obtained from the device.
*/
function accellerometro(event) {
  let rotation_rate = //rescaled value between 1 and 1.5 (according to the value of MAX_ROTATION)
    ((Math.abs(event.rotationRate.alpha) +
      Math.abs(event.rotationRate.beta) +
      Math.abs(event.rotationRate.gamma)) *
      (MAX_MULTIPLIER - 1)) /
      MAX_ROTATION +
    1;

  buffer_dati.push(
    Math.sqrt(
      Math.pow(event.acceleration.x, 2) +
        Math.pow(event.acceleration.y, 2) +
        Math.pow(event.acceleration.z, 2)
    ) * rotation_rate
  );

  if (buffer_dati.length === BUFFER_LENGTH) {
    let sum_acc = buffer_dati.reduce((a, b) => a + b, 0);
    socket.send(sum_acc / buffer_dati.length); //sends to the server the mean of the buffer data
    buffer_dati.length = 0;
  }
}

/*
ABSOLUTE = true if the orientation data in instanceOfDeviceOrientationEvent is provided as the difference between the Earth's coordinate frame and the device's coordinate frame
false if the orientation data is being provided in reference to some arbitrary, device-determined coordinate frame.
ALPHA  = Rotation around the z axis -- that is, twisting the device -- causes the alpha rotation angle to change:
The alpha angle is 0° when top of the device is pointed directly toward the Earth's north pole, and increases as the device is rotated toward the left.
BETA = Rotation around the x axis -- that is, tipping the device away from or toward the user -- causes the beta rotation angle to change:The beta angle is 0° when the device's top and bottom are the same distance from the Earth's surface; it increases toward 180° as the device is tipped forward toward the user, and it decreases toward -180° as the device is tipped backward away from the user.
GAMMA = Rotation around the y axis -- that is, tilting the device toward the left or right -- causes the gamma rotation angle to change:The gamma angle is 0° when the device's left and right sides are the same distance from the surface of the Earth, and increases toward 90° as the device is tipped toward the right, and toward -90° as the device is tipped toward the left.
*/
function giroscopio(evento) {
  document.getElementById('body').style.backgroundColor =
    'rgb(' + evento.alpha + ',' + evento.beta + ',' + evento.gamma + ')';
}
