// Tous les boutons de l'interface
let btnstart = document.getElementById("btnstart");
let btnstop = document.getElementById("btnstop");
let btnwaypoint = document.getElementById("btnwaypoint");

let tab_trace = []; // Le tableau qui contiendra tous les points du tracé
let tab_waypoint = []; // Le tableau qui contiendra tous les waypoints

var watchID; // Contient l'élément de mise à jour de la position

// Lance la mise à jour de la position
function startGeoloc() {
	watchID = navigator.geolocation.watchPosition(traiteChangement, traiteError,
		{enableHighAccuracy: true});

	btnstart.disabled = true;
	btnstop.disabled = false;
	btnwaypoint.disabled = false;
}

// Arrête la mise à jour de la position et affiche le tracé
function stopGeoloc() {
	navigator.geolocation.clearWatch(watchID);
	
	btnstart.disabled = false;
	btnstop.disabled = true;
	btnwaypoint.disabled = true;

	// Création du GPX qui contiendra le tracé
	let gpx = "";
	gpx = gpx + `<?xml version="1.0"?>
	<gpx xmlns:wptx1="http://www.garmin.com/xmlschemas/WaypointExtension/v1" xmlns:gpxedw="http://www.gpxeditor.co.uk/xmlschemas/WaypointExtension/v1" xmlns:gpxedts="http://www.gpxeditor.co.uk/xmlschemas/TrackSegExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" creator="GPXEditor" version="1.1" xmlns="http://www.topografix.com/GPX/1/1">
	<rte>
	<name>Chemin!</name>`
	
	// Pour chaque point dans la trace
	tab_trace.forEach((point) => {
		gpx = gpx + `
		<rtept lat="${point.lat}" lon="${point.lon}">
			<name />
			<cmt />
		</rtept>`
	})

	gpx = gpx + `\n</rte>`

	// Pour chaque Waypoint
	tab_waypoint.forEach((point) => {
		gpx = gpx + `
		<wpt lat="${point.lat}" lon="${point.lon}">
			<ele />
			<name />
	    </wpt>`
	})

	gpx = gpx + '</gpx>'


	console.log(gpx)

	// Téléchargement du fichier GPX
	download(`trace_${Date.now}.gpx`, gpx)

	// Lancement de l'affichage de la carte
	afficherCarte(gpx)
}

// Utilisé quand on ajouter un waypoint
function addWaypoint() {
	// Recherche de la position
    navigator.geolocation.getCurrentPosition((pos) => {
		// Ajout de la position au tableau
		tab_waypoint.push({lat: pos.coords.latitude, lon: pos.coords.longitude, acc: pos.coords.accuracy});
		
		// Affichage de la position à l'écran
		document.getElementById("waypoint").innerHTML += `\n{lat: ${pos.coords.latitude}, lon: ${pos.coords.longitude}, acc: ${pos.coords.accuracy}}`
    }, traiteError, {enableHighAccuracy: true})
}

// Traite les changements de position
function traiteChangement(pos) {
	// Ajoute la nouvelle position au tableau
	tab_trace.push({lat: pos.coords.latitude, lon: pos.coords.longitude, acc: pos.coords.accuracy})

	// Affichage de la position à l'écran
	document.getElementById("trace").innerHTML += `\n{lat: ${pos.coords.latitude}, lon: ${pos.coords.longitude}, acc: ${pos.coords.accuracy}}`
}

// En cas d'erreur, l'affiche
function traiteError(err) {
    console.log(err)
}

// Fonction qui affiche la carte
function afficherCarte(gpx) {
	// Création de la carte, avec point de départ à la position 0 du trace
	var map = L.map('map').setView([tab_trace[0].lat, tab_trace[0].lon], 13);;
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	// Ajout du tracé à partir du fichier GPX
	new L.GPX(gpx, {
		async: true,
		marker_options: {
			startIconUrl: 'img/pin-icon-start.png',
			endIconUrl: 'img/pin-icon-end.png',
			shadowUrl: 'img/pin-shadow.png',
			iconUrl: "img/pin-icon-wpt.png"
		}
	}).on('loaded', function(e) {
		map.fitBounds(e.target.getBounds());
	}).addTo(map);
}

// Fonction permetant de directement télécharger un fichier texte
// (Récupérée sur StackOverflow)
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
  
	element.style.display = 'none';
	document.body.appendChild(element);
  
	element.click();
  
	document.body.removeChild(element);
}