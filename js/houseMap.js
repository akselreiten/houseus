




//	Helping functions

function styleLines(line) {
    return { color: line.properties.LINE.toLowerCase()};
}

function hideContainers(){
    $("#355616").hide();
    $("#351925").hide();

    $("#welcome-statement").hide();

}

function showContainer(lat) {
    $("#" + lat).show();
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

    this.Lmap.on('click', function (e) {
        hideContainers();
        $("#welcome-statement").show();
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

    var stationMarkers = L.layerGroup().addTo(vis.Lmap);

    vis.data.forEach(function(station) {
        popupContent = station.name;
        var marker = L.marker([station.lat, station.long]);
        marker.bindPopup(popupContent);
        marker.on("click",function(e){
            var id = ("" + e.latlng.lat).split(".")[1];
            if ($("#" + id).is(":visible")){
                hideContainers();
                showContainer("welcome-statement");
            }else{
                hideContainers();
                showContainer(("" + e.latlng.lat).split('.')[1]);
            }
            console.log(("" + e.latlng.lat).split(".")[1])
        });
        stationMarkers.addLayer(marker);
        //stationMarkers.addLayer(L.marker([station.lat, station.long]).bindPopup(popupContent));
        /*stationMarkers.addLayer(L.marker([station.lat, station.long]).on("click", function(e){
            console.log(e);
            $("#alt2").toggle();
            $("#alt1").toggle();
        }));*/
    });

}
