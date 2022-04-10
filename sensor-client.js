/*window.addEventListener ("deviceorientation", traccia, false);
function traccia(evento){
  document.querySelector('div.alpha span').innerHTML =
    Math.round(evento.alpha);
  document.querySelector('div.beta span').innerHTML =
    Math.round(evento.beta);
  document.querySelector('div.gamma span').innerHTML =
    Math.round(evento.gamma);
}*/

/*ABSOLUTE = true if the orientation data in instanceOfDeviceOrientationEvent is provided as the difference between the Earth's coordinate frame and the device's coordinate frame
false if the orientation data is being provided in reference to some arbitrary, device-determined coordinate frame.*/

/*ALPHA  = Rotation around the z axis -- that is, twisting the device -- causes the alpha rotation angle to change:
The alpha angle is 0° when top of the device is pointed directly toward the Earth's north pole, and increases as the device is rotated toward the left.

BETA = Rotation around the x axis -- that is, tipping the device away from or toward the user -- causes the beta rotation angle to change:The beta angle is 0° when the device's top and bottom are the same distance from the Earth's surface; it increases toward 180° as the device is tipped forward toward the user, and it decreases toward -180° as the device is tipped backward away from the user.

GAMMA = Rotation around the y axis -- that is, tilting the device toward the left or right -- causes the gamma rotation angle to change:The gamma angle is 0° when the device's left and right sides are the same distance from the surface of the Earth, and increases toward 90° as the device is tipped toward the right, and toward -90° as the device is tipped toward the left.
*/

var socket = new WebSocket('wss://192.168.1.208:1234');
socket.addEventListener('open', prontoPerMuovere, false);
function prontoPerMuovere() {
  window.addEventListener('deviceorientation', muovi, false);
}
function muovi(evento) {
  socket.send(
    JSON.stringify({
      alpha: evento.alpha,
      beta: evento.beta,
      gamma: evento.gamma,
    })
  );
}
