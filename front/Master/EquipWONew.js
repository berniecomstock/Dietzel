
(function (window, document) {
    "use strict";
    var ModName = "EquipWONew";


    var UserData = {};
    function ModOBJ() { }
    ModOBJ.prototype.UnitSelect = null;
    ModOBJ.prototype.ReasonSelect = null;
    ModOBJ.prototype.ODO = null;
    ModOBJ.prototype.Notes = null;
    ModOBJ.prototype.Unit = null;
    ModOBJ.prototype.Box = null;
    ModOBJ.prototype.EquipData = [];
    ModOBJ.prototype.TroubleTarget = null;
    
    ModOBJ.prototype.OnUnitData = function (obj) {
        if ("json" in obj) {
            if ("Equip" in obj.json) {
                this.EquipData = obj.json.Equip;
            }
        }
        //console.dir(this.EquipData);
        var y = this.EquipData.length;
        var yindex = 0;
        while (yindex != y) {
            var T = this.EquipData[yindex].Unit;
            T += " ";
            T += this.EquipData[yindex].Year;
            T += " ";
            T += this.EquipData[yindex].Make;
            T += " ";
            T += this.EquipData[yindex].Model;

            if (T[0] === "E") {
                $$$.Option(this.UnitSelect, yindex, T);
            }
            yindex++;
        }
        
    }
    ModOBJ.prototype.GetUnitData = function () {
        var Pack = $$$.NewPack();
        Pack.url = "Ajax.htm";
        Pack.callback = this.OnUnitData.bind(this);
        Pack.PostData.append("Table", "Equip");
        Pack.PostData.append("Offset", 0);
        Pack.PostData.append("Limit", 500);
        Pack.PostData.append("SortBy", "Unit");
        Pack.PostData.append("SortDirection", "ASC");
        $$$.Server(Pack);

    }
    ModOBJ.prototype.OnCallback = function () {
        var Pack = {};
        Pack.Channel = "EquipWO";
        Pack.Event = "Start";
        Pack.UserData = UserData;
        $$$.Shout(Pack);
    }

    ModOBJ.prototype.OnCreate = function () {

        var NTest = $$$.MakeNumber(this.ODO.value);
        if (NTest === 0)
        {
            alert("Please enter the Odometer reading.");
            return;
        }
        $$$.UnPop();
        var Pack = $$$.NewPack();
        Pack.url = "NewTroubleTicket.htm";
        Pack.callback = this.OnCallback.bind(this);
        Pack.PostData.append("Reason", $$$.GetSelectVal(this.ReasonSelect));
        var I = $$$.GetSelectVal(this.UnitSelect);
        I = $$$.MakeNumber(I);
        Pack.PostData.append("EquipRID", this.EquipData[I].RID);
        Pack.PostData.append("ODO", this.ODO.value);

        var TheData = "";
        TheData += "<h5>";
        TheData += UserData.ScreenName;
        TheData += " @ ";
        TheData += moment(new Date()).format("ddd, MMM. Do, YYYY. h:mm a");
        TheData += "</h5>";

        TheData += "<p>";
        TheData += this.Notes.value;
        TheData += "</p>";
        Pack.PostData.append("Notes", TheData);
        Pack.PostData.append("CreatedBy", UserData.RID);
        $$$.Server(Pack);
                
    }
    ModOBJ.prototype.Init = function (obj) {
        
        UserData = obj.UserData;
        //console.dir(obj);
        this.Box = $$$.Dom($$$.Pop(), "div", "Box");
        this.UnitSelect = $$$.Input(this.Box, "select", "", "Select Unit");
        this.ReasonSelect = $$$.Input(this.Box, "select", "", "Select Reason");
        $$$.Option(this.ReasonSelect, "BreakDown", "BreakDown");
        $$$.Option(this.ReasonSelect, "DriversReport", "DriversReport");
        $$$.Option(this.ReasonSelect, "Inspection", "Inspection");
        $$$.Option(this.ReasonSelect, "P.M.", "P.M.");
        $$$.Option(this.ReasonSelect, "Other", "Other");
        this.ODO = $$$.Input(this.Box, "input", "text", "Odometer");
        this.Notes = $$$.Input(this.Box, "textarea", "", "Notes");
        var Row = $$$.Dom(this.Box, "div", "TextRight", "");
        $$$.Button(Row, "Create", this.OnCreate.bind(this));

        if ("TroubleTarget" in obj) {
            this.TroubleTarget = obj.TroubleTarget;
            console.log("Has Target=" + this.TroubleTarget.Unit);
            this.EquipData.length = 0;
            this.EquipData.push(this.TroubleTarget);
            var T = this.EquipData[0].Unit;
            T += " ";
            T += this.EquipData[0].Year;
            T += " ";
            T += this.EquipData[0].Make;
            T += " ";
            T += this.EquipData[0].Model;

            $$$.Option(this.UnitSelect, 0, T);
        }
        else {
            this.GetUnitData();
        }
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