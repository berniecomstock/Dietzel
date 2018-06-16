
(function (window, document) {
    "use strict";
    var ModName = "EquipWODetail";
    var UserData = {};
    

    

    function ModOBJ() { }
    ModOBJ.prototype.Data = {};

    
    ModOBJ.prototype.OnReceipt = function () { }
    ModOBJ.prototype.OnNewNotes = function () {
        console.log("New Notes");

        var TheData = this.Data.Notes;
        TheData += "<h5>";
        TheData += UserData.ScreenName;
        TheData += " @ ";
        TheData += moment(new Date()).format("ddd, MMM. Do, YYYY. h:mm a");
        TheData += "</h5>";

        TheData += "<p>";
        TheData += this.NewNote.value;
        TheData += "</p>";

        
        this.Data.Notes = TheData;
        this.NoteOutput.innerHTML = TheData;
        this.NewNote.value = "";

        var Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = function () { };
        Pack.PostData.append("Table", "EquipWO");
        Pack.PostData.append("FName", "Notes");
        Pack.PostData.append("RID", this.Data.RID);
        Pack.PostData.append("FVal", TheData);
        $$$.Server(Pack);
        
        
    }
    ModOBJ.prototype.Init = function (obj) {
        
        UserData = obj.UserData;
        this.Data = obj.Data;
        this.Box = $$$.Dom($$$.Pop(), "div", "Mar Pad Border Smooth");
        var Row = null;
        var T = null;
        var Left, Right = null;

        T = moment(this.Data.Created).fromNow();
        Row = $$$.Dom(this.Box, "div", "Right Bold", T);
        Row = $$$.Dom(this.Box, "div", "Right Bold BlueFont", this.Data.ScreenName);
        var T = this.Data.Unit + " " + this.Data.Year + " " + this.Data.Make + " " + this.Data.Model
        Row = $$$.Dom(this.Box, "div", "GreenFont Bold", T);

        Left = $$$.Dom(this.Box, "div", "Split");
        new $$$.SmartBox(Left, this.Data, "ODO", "EquipWO", "Odometer");
        Right = $$$.Dom(this.Box, "div", "Split");

        var Reason = new $$$.SmartSelect(Right, this.Data, "Reason", "EquipWO", "Reason");
        Reason.Option("Select Reason For Trouble Ticket", "");
        Reason.Option("BreakDown", "BreakDown");
        Reason.Option("DriversReport", "DriversReport");
        Reason.Option("Inspection", "Inspection");
        Reason.Option("P.M.", "P.M.");
        Reason.Option("Other", "Other");

        
        this.NoteOutput = $$$.Dom(this.Box, "div", "", "");
        this.NoteOutput.innerHTML = this.Data.Notes;
        

        this.NewNote = $$$.Dom(this.Box, "textarea", "", "");
        Row = $$$.Dom(this.Box, "div", "TextRight");
        $$$.Button(Row, "Add Note", this.OnNewNotes.bind(this));
        
        
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
