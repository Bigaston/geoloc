let tab_trace = [];
let tab_waypoint = [];

var watchID;
function startGeoloc() {
	watchID = navigator.geolocation.watchPosition(traiteChangement, traiteError,
		{enableHighAccuracy: true});
}

function stopGeoloc() {
    navigator.geolocation.clearWatch(watchID);

	let gpx = "";
	gpx = gpx + `<?xml version="1.0"?>
	<gpx xmlns:wptx1="http://www.garmin.com/xmlschemas/WaypointExtension/v1" xmlns:gpxedw="http://www.gpxeditor.co.uk/xmlschemas/WaypointExtension/v1" xmlns:gpxedts="http://www.gpxeditor.co.uk/xmlschemas/TrackSegExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" creator="GPXEditor" version="1.1" xmlns="http://www.topografix.com/GPX/1/1">
	<rte>
	<name>Chemin!</name>`
	
	tab_trace.forEach((point) => {
		gpx = gpx + `
		<rtept lat="${point.lat}" lon="${point.lon}">
			<name />
			<cmt />
		</rtept>`
	})

	gpx = gpx + `\n</rte>`

	tab_waypoint.forEach((point) => {
		gpx = gpx + `
		<wpt lat="${point.lat}" lon="${point.lon}">
			<ele />
			<name />
	    </wpt>`
	})

	gpx = gpx + '</gpx>'

	console.log(gpx)
	download("saluuuut.gpx", gpx)
	afficherCarte(gpx)
}

function addWaypoint() {
    navigator.geolocation.getCurrentPosition((pos) => {
		tab_waypoint.push({lat: pos.coords.latitude, lon: pos.coords.longitude, acc: pos.coords.accuracy});
		document.getElementById("waypoint").innerHTML += `\n{lat: ${pos.coords.latitude}, lon: ${pos.coords.longitude}, acc: ${pos.coords.accuracy}}`
    }, traiteError, {enableHighAccuracy: true})
}

function traiteChangement(pos) {
	tab_trace.push({lat: pos.coords.latitude, lon: pos.coords.longitude, acc: pos.coords.accuracy})
	document.getElementById("trace").innerHTML += `\n{lat: ${pos.coords.latitude}, lon: ${pos.coords.longitude}, acc: ${pos.coords.accuracy}}`
}

function traiteError(err) {
    console.log(err)
}

function afficherCarte(gpx) {
	var map = L.map('map').setView([tab_trace[0].lat, tab_trace[0].lon], 13);;
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	var gpx = gpx; // URL to your GPX file or the GPX itself
	new L.GPX(gpx, {async: true}).on('loaded', function(e) {
		map.fitBounds(e.target.getBounds());
	}).addTo(map);
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
  
	element.style.display = 'none';
	document.body.appendChild(element);
  
	element.click();
  
	document.body.removeChild(element);
}