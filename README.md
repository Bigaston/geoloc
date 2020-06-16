# geoloc
Petit test rapide avec l'API de géolocalisation en JavaScript, et ensuite visualisation du tracé sur une carte OpenStreetMap

[Rejoindre le GPS](https://bigaston.github.io/geoloc/gps.html)

## Fonctionnement
Activez la géolocalisation et rendez vous sur la page du GPS. Vous pouvez démarer votre tracé en cliquant sur le bouton **Démarer**, l'arrêter en cliquant sur le bouton du même non, et enfin ajouter un point sur le parcours en cliquant sur **Ajouter un point**.

Quand vous arrêterez le tracé, un fichier GPX de votre trace sera automatiquement téléchargé, et il sera affiché sur une carte juste en dessous.

## Fichiers
- `gps.html` : La page HTML principale de ce projet.
- `script.js` : Tous le code de gestion du projet et de la géolocalisation
- `img/` : Les images du projets (pour afficher le début, la fin, et les points)

## Libs
- OpenStreetMap
- Leaflet
- [Leaflet GPX](https://github.com/mpetazzoni/leaflet-gpx)

## Crédit
Outil développé par Bigaston : [🐦 Twitter](https://twitter.com/Bigaston) | [💸 uTip](https://utip.io/Bigaston)