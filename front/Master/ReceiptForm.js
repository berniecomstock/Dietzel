(function (window, document) {
    "use strict";
    var ModName = "ReceiptForm";
    function ModOBJ() { }
    ModOBJ.prototype.Box = null;
    ModOBJ.prototype.SelectProject = null;
    ModOBJ.prototype.SelectUnit = null;
    ModOBJ.prototype.SelectClass = null;
    ModOBJ.prototype.Miles = null;
    ModOBJ.prototype.Gallons = null;
    ModOBJ.prototype.Amount = null;
    ModOBJ.prototype.Notes = null;
    ModOBJ.prototype.Vendor = null;
    ModOBJ.prototype.ProjectRID = null;
    ModOBJ.prototype.UnitRID = null;
    ModOBJ.prototype.UserRID = null;
    ModOBJ.prototype.UserData = {};
    ModOBJ.prototype.OnExit =null;

    ModOBJ.prototype.OnCreate = function (obj) {
    }
    ModOBJ.prototype.OnFile = function (obj) {
        
        $$$.Flush(this.Box);
        var Row = $$$.Dom(this.Box, "div", "","Sending to server");

        function Callback(obj) {
            $$$.UnPop();
            this.OnExit();
        }
        var Pack = $$$.NewPack();
        Pack.callback = Callback.bind(this);
        Pack.url = "NewReceipt.htm";
        Pack.PostData.append("ProjectRID", $$$.GetSelectVal(this.SelectProject));
        Pack.PostData.append("UserRID", this.UserRID);
        Pack.PostData.append("Vendor", this.Vendor.value);
        Pack.PostData.append("Amount", this.Amount.value);
        Pack.PostData.append("Miles", this.Miles.value);
        Pack.PostData.append("Gallons", this.Gallons.value);
        Pack.PostData.append("Class", $$$.GetSelectVal(this.SelectClass));
        Pack.PostData.append("UnitRID", $$$.GetSelectVal(this.SelectUnit));
        Pack.PostData.append("FileData", obj.FileData);
        Pack.PostData.append("Ext", obj.Type);
        Pack.PostData.append("Notes", this.Notes.value);
        $$$.Server(Pack);


    }
    //RID, ProjectRID, UserRID, Amount, Miles, Gallons, Class, UnitRID, DataType, Notes, Vendor
    ModOBJ.prototype.OnForm = function () {
        var Pack = null;
        var Root = $$$.Pop();
        this.Box = $$$.Dom(Root, "div", "Pad Mar Border Smooth");
        var Row = $$$.Dom(this.Box, "div", "");

        


        this.SelectProject = $$$.Input(Row, "select", "", "Select Project");
        this.SelectUnit = $$$.Input(Row, "select", "", "Select Unit");
        this.SelectClass = $$$.Input(Row, "select", "", "Select Class");
        $$$.Option(this.SelectClass, "", "Select a class");
        $$$.Option(this.SelectClass, "Hotel", "Hotel");
        $$$.Option(this.SelectClass, "Fuel", "Fuel");
        $$$.Option(this.SelectClass, "Repair", "Repair");
        $$$.Option(this.SelectClass, "Material", "Material");
        $$$.Option(this.SelectClass, "Travel", "Travel");
        $$$.Option(this.SelectClass, "Other", "Other");
        this.Miles = $$$.Input(Row, "input", "text", "Odometer Reading");
        this.Vendor = $$$.Input(Row, "input", "text", "Vendor");
        this.Gallons = $$$.Input(Row, "input", "text", "Gallons");
        this.Amount = $$$.Input(Row, "input", "text", "Amount");
        this.Notes = $$$.Input(Row, "textarea", "", "Notes");


        Row = $$$.Dom(this.Box, "div", "");
        Pack = $$$.NewPack();
        Pack.callback = this.OnFile.bind(this);
        Pack.Channel = "Uploader";
        Pack.Event = "Start";
        Pack.Target = Row;
        $$$.Shout(Pack);

        Pack = $$$.NewPack();
        function OnProjectData(obj) {
            var Data = [];

            if ("json" in obj) {
                if ("Projects" in obj.json) {
                    Data = obj.json.Projects;
                }
            }
            var y = Data.length;
            var yindex = 0;
            $$$.Flush(this.SelectProject);
            var FirstOpt = $$$.Option(this.SelectProject, "0", "Select");
            while (yindex != y) {
                if (Number(Data[yindex].RID) === Number(this.ProjectRID)) {
                    FirstOpt.value = Data[yindex].RID;
                    FirstOpt.textContent = Data[yindex].Title;
                }
                $$$.Option(this.SelectProject, Data[yindex].RID, Data[yindex].Title);
                yindex++;
            }
        }

        Pack.callback = OnProjectData.bind(this);
        Pack.url = "Ajax.htm";
        Pack.PostData.append("Table", "Projects");
        Pack.PostData.append("Type", "200");
        Pack.PostData.append("SortBy", "Modified");
        Pack.PostData.append("SortDirection", "DESC");
        Pack.PostData.append("Limit", "100");
        Pack.PostData.append("Offset", "0");
        $$$.Server(Pack);
        function OnUnitData(obj) {
            var Data = [];

            if ("json" in obj) {
                if ("Equip" in obj.json) {
                    Data = obj.json.Equip;
                }
            }
            var y = Data.length;
            var yindex = 0;
            $$$.Flush(this.SelectUnit);
            var FirstOpt = $$$.Option(this.SelectUnit, "0", "Select");
            while (yindex != y) {
                var T = Data[yindex].Unit + " " + Data[yindex].Year + " " + Data[yindex].Make + " " + Data[yindex].Model;
                if (Number(Data[yindex].RID) === Number(this.UnitRID)) {
                    FirstOpt.value = Data[yindex].RID;
                    FirstOpt.textContent = T;
                }
                $$$.Option(this.SelectUnit, Data[yindex].RID, T);
                yindex++;
            }
        }
        Pack = $$$.NewPack();
        Pack.callback = OnUnitData.bind(this);
        Pack.url = "Ajax.htm";
        Pack.PostData.append("Table", "Equip");
        Pack.PostData.append("SortBy", "Unit");
        Pack.PostData.append("SortDirection", "ASC");
        Pack.PostData.append("Limit", "500");
        Pack.PostData.append("Offset", "0");
        $$$.Server(Pack);
    }
    ModOBJ.prototype.Init = function (obj) {
        console.dir(obj);
        this.UserData = obj.UserData;
        this.UserRID = this.UserData.RID;
        this.ProjectRID = obj.ProjectRID;
        this.UnitRID = obj.UnitRID;
        this.OnExit = obj.callback;
        this.OnForm();
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