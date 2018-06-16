(function () {
    "use strict";
    var ModName = "Map";
    if ($$$.GoogleMapsAlreadyStarted) {
        return;
    }

    $$$.GoogleMapsAlreadyStarted = true;

    let RETRY = 0;
    let MAXRETRY = 5000;
    function WaitGoogle() {
        return new Promise(function (yup, nope) {
            function Test() {
                if ($$$.State.GoogleMaps) {
                    return yup();
                }
                requestAnimationFrame(Test);
            }
            Test();
        });
    }

    function ShowMapHere(data) {
        let e = new $$$.ElementOBJ(data.Target);
        console.log("Show Map Here");
        console.dir(data);
        e.Flush();
        e.text("Waiting Google...");
        let obj = {};
        WaitGoogle().then(() => {
            
            e.text("Google Ready");
            e.Element.style.width = "300px";
            e.Element.style.height = "300px";
            e.Element.style.marginLeft = "auto";
            e.Element.style.marginRight = "auto";


            var map = null;
            var mapOptions = {};
            var Position = new google.maps.LatLng(data.GeoLat, data.GeoLong);
            mapOptions.center = Position;
            mapOptions.zoom = 15;
            mapOptions.zoom = 10;
            mapOptions.zoom = 5;
            mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
            map = new google.maps.Map(e.Element, mapOptions);
            google.maps.event.trigger(map, 'resize');
            map.setZoom(map.getZoom());
            
            
            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: Position,
                content: data.GeoMarkup
            });
            
        });
        
    }

    let GoogleMap = null;
    let Markers = [];
    function OnClear() {
        Markers.length = 0;
    }
    function OnShow(data) {
        Markers.length = 0;
        //console.dir(data);

    }

    function OnMarker(data) {
        ///if the map is not ready get it ready
        console.dir(data);
    }
    
    function TheSwitch(obj) {
        //console.error("MAP->", obj);
        switch (obj.Event) {
            case "Clear":
                //console.error("MAP->", obj);
                //OnClear();
                break;
            case "Show":
                //console.error("MAP->", obj);
                //OnShow(obj);
                //TheThing.Init(obj);
                break;
            case "AddMarker":
                //OnMarker(obj);
                //console.error("MAP->", obj);
                //Markers.push(obj);
                //console.dir(Markers);
                //TheThing.AddMarker(obj);
                break;
            case "ShowMapHere":
                //ShowMapHere(obj);
                //wait for google
                //MapHere(obj);
                break;
        }
    }
    $$$.Listen({ Channel: ModName, callback: TheSwitch });
    ////////////////////////////////////////////////////////////////////////////
    
})();

(function (window, document) {
    "use strict";
    return;
    var ModName = "Map";
    $$$.NewMapMarker = function () {
        var obj = {};
        obj.GeoLat = "0";
        obj.GeoLong = "0";
        obj.Content = "0";
        return obj;
    }


    function ModOBJ() { }
    ModOBJ.prototype.Box = null;
    ModOBJ.prototype.mapOptions = {};
    ModOBJ.prototype.map = null;
    ModOBJ.prototype.Markers = [];
    ModOBJ.prototype.AddMarker = function (obj) {
        console.dir(obj);
        var Position = new google.maps.LatLng(obj.GeoLat, obj.GeoLong);
        this.map.setCenter(Position);
        var infowindow = new google.maps.InfoWindow({
            map: this.map,
            position: Position,
            content: obj.GeoMarkup
        });
        this.Markers.push(infowindow);
    }
    ModOBJ.prototype.Init = function (obj) {
        console.log(ModName);
        console.dir(obj);
        this.Markers.length = 0;
        this.Box = $$$.Dom($$$.Pop(), "div", "Mar Pad Border Smooth");
        

        this.Box.style.height = ($$$.ScreenWidth() - 64) + "px";

        var Position = new google.maps.LatLng("41.2633844", "-96.0745381");
        this.mapOptions.center = Position;
        this.mapOptions.zoom = 15;
        this.mapOptions.zoom = 10;
        this.mapOptions.zoom = 5;
        this.mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
        this.map = new google.maps.Map(this.Box, this.mapOptions);
        google.maps.event.trigger(this.map, 'resize');
        this.map.setZoom(this.map.getZoom());
        
    }
    function MapHere(obj) {
        
        obj.Target.style.width = "300px";
        obj.Target.style.height = "300px";
        obj.Target.style.marginLeft = "auto";
        obj.Target.style.marginRight = "auto";

        
        var map = null;
        var mapOptions = {};
        var Position = new google.maps.LatLng(obj.GeoLat, obj.GeoLong);
        mapOptions.center = Position;
        mapOptions.zoom = 15;
        mapOptions.zoom = 10;
        mapOptions.zoom = 5;
        mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;
        map = new google.maps.Map(obj.Target, mapOptions);
        google.maps.event.trigger(map, 'resize');
        map.setZoom(map.getZoom());
        var infowindow = new google.maps.InfoWindow({
            map: map,
            position: Position,
            content: obj.GeoMarkup
        });
    }
    let TheThing = new ModOBJ();
    

    function TheSwitch(obj) {
        console.error("MAP->",obj);
        switch (obj.Event) {
            case "Clear":
                break;
            case "Show":
                TheThing.Init(obj);
                break;
            case "AddMarker":
                TheThing.AddMarker(obj);
                break;
            case "ShowMapHere":
                MapHere(obj);
                break;
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    $$$.Listen({ Channel: ModName, callback: TheSwitch });
})(window, document);
