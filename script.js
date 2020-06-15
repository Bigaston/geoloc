if ("geolocation" in navigator) {
    console.log("ui")
  } else {
    console.log('no')
}

let tab_trace = [];
let tab_waypoint = [];

var watchID;
function startGeoloc() {
    watchID = navigator.geolocation.watchPosition(traiteChangement, traiteError);
}

function stopGeoloc() {
    navigator.geolocation.clearWatch(watchID);
    console.log(tab_trace);
    console.log(tab_waypoint)
}

function addWaypoint() {
    navigator.geolocation.getCurrentPosition((pos) => {
        alert("Waypoint ajouté!")
        tab_waypoint.push({lat: pos.coords.latitude, lon: pos.coords.longitude});
    }, traiteError)
}

function traiteChangement(pos) {
    tab_trace.push({lat: pos.coords.latitude, lon: pos.coords.longitude})
}

function traiteError(err) {
    console.log(err)
}