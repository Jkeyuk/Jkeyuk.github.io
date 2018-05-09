/**
 * Leaflet Map initialization code
 */

//Variable to hold map object
var myMap = L.map('map', { maxBoundsViscosity: 1 }).setView([51.505, -0.09], 7);

//Variable to hold marker group, used for removing markers.
var markerGroup = L.layerGroup().addTo(myMap);

//Adds layer to map to display terrain
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	minZoom: 1,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1Ijoiam9ua2VybyIsImEiOiJjamd4emxzdGgxM2g2MndsNnNqajg4cHJuIn0.v6QrJp4UoYt3DGNzqtRqfQ'
}).addTo(myMap);

/**
 * Adds a marker to a given map at a given location and adds the marker to a marker group
 * @param {Number} lat - latitude for marker
 * @param {Number} long - longitude for marker
 * @param {String} popUpString - String for marker popup
 * @param {Object} map - leaflet map object
 */
function setMarker(lat, long, popUpString, map) {
	L.marker([lat, long]).addTo(map).bindPopup(popUpString).addTo(markerGroup);
}

//Load Table and set Events when document finished loading
$(document).ready(function () {
	/**
	 * Initializes table with data from meteorData.js
	 */
	var t = $('#table_id').DataTable({
		data: data,
		deferRender: true,
		"aaSorting": []
	});

	/**
	 * click event listener for table rows: removes old markers, 
	 * adds marker for selected row and centers map at location
	 */
	$('body').on("click", '#table_id tbody tr', function () {
		markerGroup.clearLayers();
		var name = $(this).children("td:eq( 0 )").text();
		var year = $(this).children("td:eq( 1 )").text();
		var mass = $(this).children("td:eq( 2 )").text();
		var lat = $(this).children("td:eq( 3 )").text();
		var lng = $(this).children("td:eq( 4 )").text();
		var popUpString = '<p>Name: ' + name + '</p><p>Year: ' + year + '</p><p>Mass(g): ' + mass + '</p>';
		if (lat != 'null' && lng != 'null') {
			setMarker(Number(lat), Number(lng), popUpString, myMap);
			myMap.flyTo([Number(lat), Number(lng)]);
		}
	});

	/**
	 * hover event listeners to mark row for user
	 */
	$('body').on("mouseenter", '#table_id tbody tr', function () {
		$(this).css("background-color", "#AA759F");
	});
	$('body').on("mouseleave", '#table_id tbody tr', function () {
		$(this).css("background-color", "#ffffff");
	});
});