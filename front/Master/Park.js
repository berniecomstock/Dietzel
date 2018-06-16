
/*
Min Mileage Change
Max Mileage Change
No Mileage Change
Negative Milage change
Notes Required?
*/
(function (window, document) {
    "use strict";
    var ModName = "Park";
    function ModOBJ() { }
    ModOBJ.prototype.Box = null;
    ModOBJ.prototype.GeoLat = "0";
    ModOBJ.prototype.GeoLong = "0";
    ModOBJ.prototype.Equip = [];
    ModOBJ.prototype.DBNotes = "";

    ModOBJ.prototype.Callback = function (obj) {
        //console.log("Callback");
        //console.dir(obj);
        window.location.reload(true);
    }
    ModOBJ.prototype.OnPark = function () {

        //if start and fin are the same
        //if fin is less than start
        var start = $$$.MakeNumber(this.Equip[0].Miles);
        var end = $$$.MakeNumber(this.Miles.Get());

        if (end < 1) {
            alert("Error: Please enter a valid Odomenter reading.");
            return;
        }

        var flag = false;
        if (start === end) {
            if (!confirm("Start and End Miles are the same.\r\n Are you sure you want to submit?")) { return;}
        }
        if (end < start) {
            
            alert("Error: Please enter a valid Odomenter reading.\r\n Unless you drove backwards all day the ending miles should be greater than the starting miles.");
            return;
        }


        this.DBNotes += this.Notes.value;
        
        var Pack = $$$.NewPack();
        Pack.url = "Park.htm";
        Pack.callback = this.Callback.bind(this);
        Pack.PostData.append("DriveTimeRID", $$$.UserData.DriveTimeRID);
        Pack.PostData.append("UserRID", $$$.UserData.RID);
        Pack.PostData.append("EquipRID", this.Equip[0].RID);
        Pack.PostData.append("Miles", this.Miles.Get());
        Pack.PostData.append("Notes", this.DBNotes);
        Pack.PostData.append("GeoLat", this.GeoLat);
        Pack.PostData.append("GeoLong", this.GeoLong);
        $$$.Server(Pack);
    }

    ModOBJ.prototype.Output = function (yindex) {
        var T = this.Equip[yindex].Unit + " " + this.Equip[yindex].Year + " " + this.Equip[yindex].Make + " " + this.Equip[yindex].Model;
        var Row = $$$.Dom(this.Box, "div", "Left Bold Big GreenFont", T);
        Row = $$$.Dom(this.Box, "div", "");
        $$$.Dom(Row, "span", "", "Starting Odometer Reading: ");
        $$$.Dom(Row, "span", "Bold RedFont", this.Equip[yindex].Miles);


        Row = $$$.Dom(this.Box, "div", "");
        this.Miles = new $$$.DumbBox(Row, "Current Odometer Reading", "");


        Row = $$$.Dom(this.Box, "div", "");
        this.Notes = $$$.Input(Row, "textarea", "", "Notes");
        Row = $$$.Dom(this.Box, "div", "Right");
        $$$.Button(Row, "Park", this.OnPark.bind(this));
        Row = $$$.Dom(this.Box, "p", "");

        function OnData(one) {
            if ("json" in one) {
                if ("GetOne" in one.json) {
                    //obj.value = one.json.GetOne;
                    Row.innerHTML = one.json.GetOne;
                    this.DBNotes = one.json.GetOne;
                }
            }
        }
        var Pack = $$$.NewPack();
        Pack.url = "GetOne.htm";
        Pack.callback = OnData.bind(this);
        Pack.PostData.append("Table", "DriveTime");
        Pack.PostData.append("RID", $$$.UserData.DriveTimeRID);
        Pack.PostData.append("FName", "Notes");
        $$$.Server(Pack);

        
    }
    ModOBJ.prototype.OnGeo = function (obj) {
        this.GeoLong = obj.longitude;
        this.GeoLat = obj.latitude;
        this.Output(0);
    }

    ModOBJ.prototype.OnData = function (obj) {
        console.dir(obj);
        this.Equip.length = 0;
        if ("json" in obj) {
            if ("Equip" in obj.json) {
                this.Equip = obj.json.Equip;
            }
        }

        var y = this.Equip.length;
        var yindex = 0;
        if (y != 1) { return; }
        var Pack = $$$.NewPack();
        //Pack.Channel = "Geo";
        //Pack.Event = "Get";
        Pack.callback = this.OnGeo.bind(this);
        //$$$.Shout(Pack);
        $$$.LoadScript("XGeo", Pack);
    }
    ModOBJ.prototype.GetData = function () {
        var Pack = $$$.NewPack();
        Pack.url = "Ajax.htm";
        Pack.callback = this.OnData.bind(this);
        Pack.PostData.append("Table", "Equip");
        Pack.PostData.append("UserRID", $$$.UserData.RID);
        Pack.PostData.append("SortBy", "Unit");
        Pack.PostData.append("SortDirection", "ASC");
        Pack.PostData.append("Limit", "1");
        Pack.PostData.append("Offset", "0");
        $$$.Server(Pack);
    }
    ModOBJ.prototype.Init = function (obj) {
        $$$.Flush($$$.Content);
        this.Box = $$$.Dom($$$.Content, "div", "Mar Pad Border Smooth");
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
