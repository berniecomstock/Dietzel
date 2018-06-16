(function (window, document) {
    "use strict";
    var ModName = "TruckMap";
    function ModOBJ() { }
    ModOBJ.prototype.Data = [];
    ModOBJ.prototype.OutPut = function () {
        //console.dir(this.Data);
        var Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "Clear";
        $$$.Shout(Pack);

        Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "Show";
        $$$.Shout(Pack);

        //'DeletedUnits'
        var y = this.Data.length;
        var yindex = 0;
        while (yindex != y) {
            if ((this.Data[yindex].Unit[0] === "E")
                && (this.Data[yindex].GeoLat != "0")
                && (this.Data[yindex].GeoLong != "0")
                && (this.Data[yindex].Cat != "DeletedUnits")
                ) {
                var Pack = {};
                Pack.Channel = "Map";
                Pack.Event = "AddMarker";
                Pack.GeoLat = this.Data[yindex].GeoLat;
                Pack.GeoLong = this.Data[yindex].GeoLong;
                Pack.GeoMarkup = this.Data[yindex].Unit;
                Pack.GeoMarkup += "<br>";
                Pack.GeoMarkup += "Odo: "+this.Data[yindex].Miles;
                $$$.Shout(Pack);
            }
            yindex++;
        }
    }
    ModOBJ.prototype.OnData = function (obj) {
        //console.dir(obj);
        this.Data.length = 0;
        if ("json" in obj) {
            if ("Equip" in obj.json) {
                this.Data = obj.json.Equip;
            }
        }
        this.OutPut();
    }
    ModOBJ.prototype.GetData = function () {
        var Pack = $$$.NewPack();
        Pack.url = "Ajax.htm";
        Pack.callback = this.OnData.bind(this);
        Pack.PostData.append("Table", "Equip");
        Pack.PostData.append("Offset", 0);
        Pack.PostData.append("Limit", 500);
        Pack.PostData.append("SortBy", "Unit");
        Pack.PostData.append("SortDirection", "ASC");
        //Pack.PostData.append("Cat", ModCat);
        $$$.Server(Pack);
    }
    ModOBJ.prototype.Init = function (obj) {
        console.log(ModName);
        this.GetData();
    }
    function OnCom(obj) {
        switch (obj.Event) {
            case "Start":
                var Temp = new ModOBJ();
                Temp.Init(obj);
                break;
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    $$$.Listen({ Channel: ModName, callback: OnCom });
})(window, document);