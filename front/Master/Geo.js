
(function (window, document) {
    var ModName = "Geo";

    function GeoOBJ() { }
    GeoOBJ.prototype.CallingObj = null;
    GeoOBJ.prototype.PopElement = null;
    GeoOBJ.prototype.UnPop = function () {
        if (this.PopElement) document.body.removeChild(this.PopElement);
        document.body.style.overflow = "auto";
        this.PopElement = null;
    }
    GeoOBJ.prototype.Pop = function () {
        document.body.style.overflow = "hidden";
        this.PopElement = $$$.Dom(document.body, "div", "Geo", "Geo Spinner");
    }
    GeoOBJ.prototype.Return = function () {

        this.UnPop();
        this.CallingObj.callback(this.CallingObj);
    }
    GeoOBJ.prototype.OnError = function () {
        //alert("Your browser does not support Geoloacation, Or you have Denied this site access to the GeoLoaction Service ");
        this.CallingObj.GeoOff = true;
        this.Return();
    }
    GeoOBJ.prototype.OnGeo = function (pos) {
        if (!"coords" in pos) { this.Return(); return; }
        this.CallingObj.latitude = pos.coords.latitude;
        this.CallingObj.longitude = pos.coords.longitude;
        this.Return();
    }
    GeoOBJ.prototype.Init=function(obj)
    {
        this.CallingObj = obj;
        this.CallingObj.latitude = "0";
        this.CallingObj.longitude = "0";

        
        if (!"geolocation" in window.navigator) { console.log("No geolocation"); this.OnError(); return; }
        var Geo = window.navigator.geolocation;
        this.Pop();
        var PosOpts = {};
        PosOpts.enableHighAccuracy = true;
        PosOpts.timeout = 60000;//60 secs
        PosOpts.maximumAge = 0;
        Geo.getCurrentPosition(this.OnGeo.bind(this), this.OnError.bind(this), PosOpts);

    }


    function Get(obj) {
        console.log("Get Geo");
        var Temp = new GeoOBJ();
        Temp.Init(obj);
    }
    function OnCom(obj) {
        switch (obj.Channel) {
            case "Omni":
                switch (obj.Event) {
                    case "Hide":
                        break;
                }
                break;
            case ModName:
                {
                    switch (obj.Event) {
                        case "Get":
                            Get(obj);
                            break;
                    }
                }
                break;
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    function RunOnce() {
        var Pack = {};
        Pack.Channel = ModName;
        Pack.callback = OnCom;
        $$$.Listen(Pack);
    }
    RunOnce();
})(window, document);