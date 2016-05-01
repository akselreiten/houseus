
//	Helping functions

function styleLines(line) {
    return { color: line.properties.LINE.toLowerCase()};
}


/*
 *  StationMap - Object constructor function
 *  @param _parentElement   -- HTML element in which to draw the visualization
 *  @param _data            -- Array with all stations of the bike-sharing network
 */

HouseMap = function(_parentElement, _data, _center) {
    this.parentElement = _parentElement;
    this.data = _data;
    this.center = _center;
    //	Specifying path to the leaflet images in /img
    L.Icon.Default.imagePath = '../img';
    this.initVis();
}


/*
 *  Initialize station map
 */

HouseMap.prototype.initVis = function() {
    var vis = this;
    this.Lmap = L.map(this.parentElement).setView(this.center, 14);

    this.Lmap.on('popupopen', function (e) {
        console.log(e)
    });

    vis.wrangleData();
}


/*
 *  Data wrangling
 */

HouseMap.prototype.wrangleData = function() {
    var vis = this;

    // Currently no data wrangling/filtering needed
    // vis.displayData = vis.data;

    // Update the visualization
    vis.updateVis();
}


/*
 *  The drawing function
 */

HouseMap.prototype.updateVis = function() {
    var vis = this;

    var openStreetMap = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'

    L.tileLayer(openStreetMap, {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> Aksel Reiten'}).addTo(this.Lmap);

    var mitCampus = L.circle(vis.center, 100, {
        color: 'red',
        fillColor: '#ddd',
        fillOpacity: 0.5
    }).bindPopup("MIT Campus").addTo(vis.Lmap);

    //	Adding Mouse listeners
    mitCampus
        .on('mouseover', function (e) {this.openPopup();})
        .on('mouseout', function (e) {this.closePopup();});

    var popupContent =  "MIT Campus";
    L.marker(this.center).bindPopup(popupContent).addTo(this.Lmap);

    var stationMarkers = L.layerGroup().addTo(vis.Lmap);

    vis.data.forEach(function(station) {
        popupContent = station.name;
        stationMarkers.addLayer(L.marker([station.lat, station.long]).bindPopup(popupContent));
    });

}
