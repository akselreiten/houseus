
var allData = [];

// Variable for the visualization instance
var stationMap;

// Start application by loading the data
loadData();


function loadData() {

	// Removed https - worked better
	var url = 'http://www.thehubway.com/data/stations/bikeStations.xml';

	var yql = 'https://query.yahooapis.com/v1/public/yql?q='
		+ encodeURIComponent('SELECT * FROM xml WHERE url="' + url + '"')
		+ '&format=json&callback=?';

	// Send an asynchronous HTTP request with jQuery
	$.getJSON(yql, function(jsonData){
		allData = jsonData.query.results.stations.station;

		allData.forEach(function(station) {
			station.id = +station.id;
			station.nbEmptyDocks = +station.nbEmptyDocks;
			station.nbBikes = +station.nbBikes;
			station.lat = +station.lat;
			station.long = +station.long;
			station.install = (station.install === "true");
			station.locked = (station.locked === "true");
			station.public = (station.public === "true");
			station.temporary = (station.temporary === "true");
		});

		console.log(array);

		//  Create vis
		createVis();
	});
}


function createVis() {

	stationMap = new HouseMap("house-map", array, [42.359674, -71.091921]);

}