(function (window, document) {
    "use strict";
    var ModName = "Drive";
    function OBJ() { }
    OBJ.prototype.Equip = [];
    OBJ.prototype.Users = [];
    OBJ.prototype.Projects = [];
    OBJ.prototype.GeoLong = "";
    OBJ.prototype.GeoLat = "";
    OBJ.prototype.OnGeo = function (obj) {
        console.log("OnGeo");
        var yindex = obj.EquipIndex;
        this.GeoLong = obj.longitude;
        this.GeoLat = obj.latitude;
        //Get The Miles
        var Box = $$$.Dom($$$.Pop(), "div", "Mar Pad Smooth Border HoverWhite");
        var Row = $$$.Dom(Box, "div", "Flow Mar Left GreenFont Bold Big", this.Equip[yindex].Unit);
        Row = $$$.Dom(Box, "div", "Flow");
        //new $$$.XEditText(Row, "Equip", this.Equip[yindex], "Miles", "Current Odometer");


        Row = $$$.Dom(Box, "div");
        var Wrapper = $$$.Dom(Row, "div", "Flow Mar Pad Border Smooth");
        Row = $$$.Dom(Wrapper, "div", "Bold", "Start Mileage");
        Row = $$$.Dom(Wrapper, "div");
        var Input = $$$.Dom(Row, "input");
        Input.type = "text";
        Input.value = this.Equip[yindex].Miles;
        new $$$.Resizer(Input);
        Row = $$$.Dom(Box, "div", "");
        var Notes=$$$.Input(Row, "textarea", "", "Notes");
        function OnBegin() {
            var Project = $$$.MakeNumber($$$.UserData.CurrentProject);
            var Pack = $$$.NewPack();
            Pack.url = "Drive.htm";
            Pack.callback = function () {
                window.location.reload(true);
            }
            Pack.PostData.append("UserRID", $$$.UserData.RID);
            Pack.PostData.append("EquipRID", this.Equip[yindex].RID);
            Pack.PostData.append("GeoLat", this.GeoLat);
            Pack.PostData.append("GeoLong", this.GeoLong);
            Pack.PostData.append("Notes", Notes.value+"<br>");
            Pack.PostData.append("Miles", Input.value);
            Pack.PostData.append("ProjectRID", Project);
            $$$.Server(Pack);
        }
        Row = $$$.Dom(Box, "div","Right");
        $$$.Button(Row, "Begin", OnBegin.bind(this));
    }
    OBJ.prototype.OnDrive = function (yindex) {

        
        var Pack = {};
        Pack.callback = this.OnGeo.bind(this);
        Pack.EquipIndex = yindex;
        $$$.LoadScript("XGeo", Pack);
    }
    OBJ.prototype.DoOutput = function (yindex) {

        var Box = $$$.Dom($$$.Content, "div", "Mar Pad Smooth Border");
        var Unit = $$$.Dom(Box, "div", "Bold GreenFont Big", this.Equip[yindex].Unit);
        $$$.Dom(Box, "div", "Bold Crop", this.Equip[yindex].Year + " " + this.Equip[yindex].Make + " " + this.Equip[yindex].Model);
        var User = $$$.Dom(Box, "div", "Bold BlueFont Big", this.Equip[yindex].ScreenName);
        var Title = $$$.Dom(Box, "div", "Bold OrangeFont Big", this.Equip[yindex].Title);
        var Row = $$$.Dom(Box, "div", "");
        var Left = $$$.Dom(Box, "div", "Split Left");
        var Right = $$$.Dom(Box, "div", "Split Right");



        if ($$$.MakeNumber(this.Equip[yindex].UserRID) === 0) {
            new $$$.XEditText(Left, "Equip", this.Equip[yindex], "Miles", "Odometer");
            $$$.Button(Right, "Go", this.OnDrive.bind(this, yindex)).className += " GreenFont";
            Box.className += " GreenFont";

        }
        else {
            //$$$.Button(Right, "Park", null).className += " RedFont";
            Box.className += " RedFont";
        }
        $$$.LoadScript("XEquipTime", { StartTime: "2000-1-1", EndTime: "2050-1-1", Target: Unit, EquipRID: this.Equip[yindex].RID, EquipUnit: this.Equip[yindex].Unit });
    }

    OBJ.prototype.Output = function () {
        console.dir(this.Equip);
        $$$.Flush($$$.Content);
        var y = this.Equip.length;
        var yindex = 0;

        while (yindex != y) {
            if ($$$.MakeNumber(this.Equip[yindex].UserRID) === 0) {
                this.DoOutput(yindex);
            }
            yindex++;
        }
        yindex = 0;
        while (yindex != y) {
            if ($$$.MakeNumber(this.Equip[yindex].UserRID) > 0) {
                this.DoOutput(yindex);
            }
            yindex++;
        }

    }
    OBJ.prototype.On = function (obj) {

    }
    OBJ.prototype.OnData = function (obj) {
        
        this.Equip = obj.json.Results;
        this.Output();
    }
    OBJ.prototype.GetData = function () {
        var q = "Select *, ";
        q += "(select screenname from users where rid=UserRID) AS ScreenName,";
        q += "(select CurrentProject from users where rid=UserRID) AS CurrentProject,";
        q += "(select Title from Projects where rid=CurrentProject) AS Title";
        //q += "(),";
        q += " from equip where unit like 'E%' AND (Cat='PickUp' or Cat='Semi' or Cat='UtilityTruck' or Cat='Heavy') order by Unit ASC";
        //q = "select * from equip where (Cat='PickUp' or Cat='Semi' or Cat='UtilityTruck' or Cat='Heavy') and UserRID=0";
        $$$.MySql(q, this.OnData.bind(this));
    }
    OBJ.prototype.Init = function (obj) {
        this.GetData();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);
(function (window, document) {
    return;
    "use strict";
    var ModName = "Drive";
    function ModOBJ() { }
    ModOBJ.prototype.Root = null;
    ModOBJ.prototype.Miles = null;
    ModOBJ.prototype.Notes = null;
    ModOBJ.prototype.GeoLong = "0";
    ModOBJ.prototype.GeoLat = "0";
    ModOBJ.prototype.Equip = [];
    ModOBJ.prototype.OnDriveCallback = function (obj) {
        window.location.reload(true);
    }
    ModOBJ.prototype.OnBegin = function (yindex) {

        $$$.UnPop();
        //this.Equip[yindex].Miles
        var DBMiles = $$$.MakeNumber(this.Equip[yindex].Miles);
        var UserMiles = $$$.MakeNumber(this.Miles.Get());
        var NoteBuffer = "";

        if (DBMiles === UserMiles)
        {
            //confirm("Miles Match");
            
        }
        else {
            //Miles are being reset
            //confirm("Miles Are Resetting");
            NoteBuffer += "Mileage Discrepancy!<br>";
            NoteBuffer += "Last Known Mileage: ";
            NoteBuffer += DBMiles;
            NoteBuffer += "<br>";
            NoteBuffer += "Reset To:";
            NoteBuffer += UserMiles;
            NoteBuffer += "<br>";
            NoteBuffer += "Reset By: " + $$$.UserData.ScreenName + "<br>";


        }

        NoteBuffer += this.Notes.value;
        NoteBuffer += "<br>";
        

        var Project = $$$.MakeNumber($$$.UserData.CurrentProject);

        var Pack = $$$.NewPack();
        Pack.url = "Drive.htm";
        Pack.callback = this.OnDriveCallback.bind(this);
        Pack.PostData.append("UserRID", $$$.UserData.RID);
        Pack.PostData.append("EquipRID", this.Equip[yindex].RID);
        Pack.PostData.append("GeoLat", this.GeoLat);
        Pack.PostData.append("GeoLong", this.GeoLong);
        Pack.PostData.append("Notes", NoteBuffer);
        Pack.PostData.append("Miles", this.Miles.Get());
        Pack.PostData.append("ProjectRID", Project);
        $$$.Server(Pack);
        //$$$.Flush($$$.Content);



    }
    ModOBJ.prototype.OnGeo = function (obj) {
        
        this.GeoLong = obj.longitude;
        this.GeoLat = obj.latitude;

        
        if (this.GeoLong === "0") { alert("Access Denied. This feature requires geolocation service."); return; }
        if (this.GeoLat === "0") { alert("Access Denied. This feature requires geolocation service."); return; }


        var yindex = obj.EquipIndex;
        var T = this.Equip[yindex].Unit + " " + this.Equip[yindex].Year + " " + this.Equip[yindex].Make + " " + this.Equip[yindex].Model;
        var Box = $$$.Dom($$$.Pop(), "div", "Mar Pad Smooth Border HoverWhite");
        var Row = $$$.Dom(Box, "div", "Left GreenFont Bold Big", T);
        Row = $$$.Dom(Box, "div", "");

        this.Miles = new $$$.DumbBox(Row, "Odometer Reading", this.Equip[yindex].Miles);
        Row = $$$.Dom(Box, "div", "");
        this.Notes = $$$.Input(Row, "textarea", "", "Notes");
        Row = $$$.Dom(Box, "div", "Right");
        $$$.Button(Row, "Begin", this.OnBegin.bind(this, yindex));
        
    }

    ModOBJ.prototype.OnDrive = function (yindex) {
        var Pack = {};
        Pack.callback = this.OnGeo.bind(this);
        Pack.EquipIndex = yindex;
        $$$.LoadScript("XGeo", Pack);
    }
    ModOBJ.prototype.Output = function (yindex) {
        var T = this.Equip[yindex].Unit + " " + this.Equip[yindex].Year + " " + this.Equip[yindex].Make + " " + this.Equip[yindex].Model;
        var Box = $$$.Dom(this.Root, "div", "Flow Pad Mar Bold Clicky GreenFont", this.Equip[yindex].Unit);
        Box.onclick=this.OnDrive.bind(this,yindex);

           
    }
    ModOBJ.prototype.OnData = function (obj) {
        this.Equip.length = 0;
        if ("json" in obj) {
            if ("Equip" in obj.json) {
                this.Equip = obj.json.Equip;
            }
        }

        var y = this.Equip.length;
        var yindex = 0;
        while (yindex != y) {
            
            if (this.Equip[yindex].Unit[0] === "E")
            {
                this.Output(yindex);
            }
            yindex++;
        }
    }
    ModOBJ.prototype.GetData = function () {
        
        $$$.Flush(this.Root);
        var Pack = $$$.NewPack();
        Pack.url = "GetDrivers.htm";
        Pack.callback = this.OnData.bind(this);
        $$$.Server(Pack);
    }
    ModOBJ.prototype.Init = function (obj) {
        console.log(ModName);
        this.Root = $$$.Dom($$$.Content, "div", "");
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