(function (window, document) {
    "use strict";
    var ModName = "DriveDetail";
    function ModOBJ() { }
    ModOBJ.prototype.Status = null;
    ModOBJ.prototype.Data = [];
    ModOBJ.prototype.Index = 0;
    ModOBJ.prototype.Root = null;
    ModOBJ.prototype.Content = null;
    ModOBJ.prototype.Miles = null;
    ModOBJ.prototype.MilesOUT = null;
    ModOBJ.prototype.NewNote = null;
    ModOBJ.prototype.OnNext = function () {

        var New = this.Index;
        New++;
        if (New > this.Data.length - 1) {
            this.Index = 0;
            this.Output();
            return;
        }
        this.Index++;
        this.Output();



    }
    ModOBJ.prototype.OnBack = function () {
        if (this.Index < 1) {
            this.Index = this.Data.length - 1;
            this.Output();
            return;
        }
        this.Index--;
        this.Output();

    }
    ModOBJ.prototype.OnMap = function (yindex) {

        var Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "Clear";
        $$$.Shout(Pack);

        Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "Show";
        $$$.Shout(Pack);

        Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "AddMarker";
        Pack.GeoLat = this.Data[yindex].GeoLat;;
        Pack.GeoLong = this.Data[yindex].GeoLong;;
        Pack.GeoMarkup = this.Data[yindex].ScreenName;
        Pack.GeoMarkup += "<br>";
        Pack.GeoMarkup += this.Data[yindex].ProjectTitle;
        Pack.GeoMarkup += "<br>";
        Pack.GeoMarkup += this.Data[yindex].Unit;
        Pack.GeoMarkup += "<br>";
        Pack.GeoMarkup += " Rolling: ";
        var TheDate = moment(this.Data[yindex].StartTime).format("dddd MMM Do hh:mm a");
        Pack.GeoMarkup += TheDate;

        Pack.GeoMarkup += "<br>";
        Pack.GeoMarkup += " Start Miles: ";
        Pack.GeoMarkup += this.Data[yindex].Miles;

        $$$.Shout(Pack);


        var D = $$$.MakeNumber(this.Data[yindex].Duration);
        if (D > 0) {
            Pack = {};
            Pack.Channel = "Map";
            Pack.Event = "AddMarker";
            Pack.GeoLat = this.Data[yindex].GeoLatOUT;
            Pack.GeoLong = this.Data[yindex].GeoLongOUT;
            Pack.GeoMarkup = this.Data[yindex].ScreenName;
            Pack.GeoMarkup += "<br>";
            Pack.GeoMarkup += " Parked: ";
            var TheDate = moment(this.Data[yindex].EndTime).format("dddd MMM Do hh:mm a");
            Pack.GeoMarkup += TheDate;

            //Pack.GeoMarkup += "<br>";
            //Pack.GeoMarkup += " Start Miles: ";
            //Pack.GeoMarkup += this.Data[yindex].Miles;

            Pack.GeoMarkup += "<br>";
            Pack.GeoMarkup += " Stop Miles: ";
            Pack.GeoMarkup += this.Data[yindex].MilesOUT;

            Pack.GeoMarkup += "<br>";
            Pack.GeoMarkup += " Distance: ";
            Pack.GeoMarkup += this.Data[yindex].MilesOUT - this.Data[yindex].Miles;

            $$$.Shout(Pack);
        }
    }
    
    ModOBJ.prototype.OnSave = function () {
        var Pointer = this.Data[this.Index];
        Pointer.Miles = Number(this.Miles.Get());
        Pointer.MilesOUT = Number(this.MilesOUT.Get());
        this.Output();
        $$$.PutOne("DriveTime", Pointer.RID, "Miles", Pointer.Miles);
        $$$.PutOne("DriveTime", Pointer.RID, "MilesOUT", Pointer.MilesOUT);

        
    }
    ModOBJ.prototype.OnAddNotes = function () {
        var Pointer = this.Data[this.Index];
        var NoteBuffer = Pointer.Notes;
        NoteBuffer += "<br>" + $$$.UserData.ScreenName + ":<br>";
        NoteBuffer += this.NewNote.value;
        NoteBuffer += "<br>";
        Pointer.Notes = NoteBuffer;
        this.Output();
        $$$.PutOne("DriveTime", Pointer.RID, "Notes", Pointer.Notes);
        
    }
    ModOBJ.prototype.Output = function () {

        var T = "Record ";
        T += this.Index + 1;
        T += " Of ";
        T += this.Data.length;
        $$$.Text(this.Status, T);

        var Pointer = this.Data[this.Index];
        var Seconds = $$$.MakeNumber(Pointer.Duration);

        var Box = this.Content;
        $$$.Flush(Box);
        Box.className = "Box";
        //Unit User Job
        var Header = $$$.Dom(Box, "div", "");
        var Row = $$$.Dom(Header, "div", "Split4 Bold TextLeft", Pointer.Unit);
        Row = $$$.Dom(Header, "div", "Split4 TextLeft", Pointer.ScreenName);
        Row = $$$.Dom(Header, "div", "Split4 TextLeft", Pointer.ProjectTitle);
        Row = $$$.Dom(Header, "div", "Split4 TextRight Bold Clicky", "Map");
        Row.onclick = this.OnMap.bind(this,this.Index);
        
        //Start Stop Distance
        Row = $$$.Dom(Box, "div", "Split4");
        this.Miles = new $$$.DumbBox(Row, "Begin Miles", Pointer.Miles);
        Row = $$$.Dom(Box, "div", "Split4");
        this.MilesOUT = new $$$.DumbBox(Row, "End Miles", Pointer.MilesOUT);
        var Distance = $$$.Dom(Box, "div", "Split4 TextLeft");
        Row = $$$.Dom(Box, "div", "Split4");
        $$$.Button(Row, "Save", this.OnSave.bind(this));
        

        Row = $$$.Dom(Box, "div", "Split3 TextLeft");
        var Top = $$$.Dom(Row, "div", "", "Start: " + moment(Pointer.StartTime).fromNow());
        var Bottom = $$$.Dom(Row, "div", "", moment(Pointer.StartTime).format("dddd MMM Do hh:mm a"));

        Row = $$$.Dom(Box, "div", "Split3 TextLeft");
        Top = $$$.Dom(Row, "div", "", "Stop: " + moment(Pointer.EndTime).fromNow());
        Bottom = $$$.Dom(Row, "div", "", moment(Pointer.EndTime).format("dddd MMM Do hh:mm a"));


        
        var Min = Seconds / 60;
        var Hours = Min / 60;
        var RInt = $$$.decimalAdjust("round", Hours * 4, 0);
        var DInt = $$$.decimalAdjust("round", RInt / 4, -2);
        Row = $$$.Dom(Box, "div", "Split3 TextLeft", "Time: " + DInt);

        //Row = $$$.Dom(Box, "div", "Split3 TextLeft", "Stop: "+moment(Pointer.EndTime).fromNow());
        //Row = $$$.Dom(Box, "div", "Split3 TextLeft", "Total");

        Row = $$$.Dom(Box, "div", "TextLeft Bold", "Notes:");
        Row = $$$.Dom(Box, "p", "", "");
        Row.innerHTML = Pointer.Notes;


        if (Seconds > 0) {
            //this.MilesOUT.Set();
            $$$.Text(Distance,"Distance: " + (Pointer.MilesOUT - Pointer.Miles));
        }
        else {
            $$$.Text(Distance, "Distance: Pending");
            //Box.className = "Box Red";
            Header.className += " Red";

        }

        Row = $$$.Dom(Box, "div", "", "");
        this.NewNote=$$$.Input(Row, "textarea", "", "Add Notes");
        Row = $$$.Dom(Box, "div", "TextRight ", "");
        $$$.Button(Row, "Add", this.OnAddNotes.bind(this));

        ///////////////debug
        //Row = $$$.Dom(Box, "div", "");
        //var Temp = new $$$.FetchBox(Row, "Users", this.Data[this.Index].UserRID, "DriveTimeRID", "DriveTimeRID");
        


    }
    ModOBJ.prototype.DoNav = function (target) {
        var Row = $$$.Dom(target, "div", "TextRight", "");
        var Back = $$$.Button(Row, "<-", this.OnBack.bind(this));
        this.Status = $$$.Dom(Row, "div", "Bold Flow Pad", "Hello World");
        var Next = $$$.Button(Row, "->", this.OnNext.bind(this));
    }
    ModOBJ.prototype.Init = function (obj) {
        console.log(ModName);
        this.Data = obj.Data;
        this.Index = obj.Index;
        console.dir(this.Data[this.Index]);
        this.Root = $$$.Pop();
        this.Nav = $$$.Dom(this.Root, "div", "Box");
        this.Content = $$$.Dom(this.Root, "div", "Box");
        this.DoNav(this.Nav);
        this.Output();
        
        
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

(function (window, document) {
    return;
    "use strict";
    var ModName = "DriveDetail";
    function ModOBJ() { }
    ModOBJ.prototype.Root = null;
    ModOBJ.prototype.Content = null;
    ModOBJ.prototype.Status = null;
    ModOBJ.prototype.Index = 0;
    ModOBJ.prototype.Data = [];
    ModOBJ.prototype.OnMap = function (yindex) {

        var Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "Clear";
        $$$.Shout(Pack);

        Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "Show";
        $$$.Shout(Pack);

        Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "AddMarker";
        Pack.GeoLat = this.Data[yindex].GeoLat;;
        Pack.GeoLong = this.Data[yindex].GeoLong;;
        Pack.GeoMarkup = this.Data[yindex].ScreenName;
        Pack.GeoMarkup += "<br>";
        Pack.GeoMarkup += this.Data[yindex].ProjectTitle;
        Pack.GeoMarkup += "<br>";
        Pack.GeoMarkup += this.Data[yindex].Unit;
        Pack.GeoMarkup += "<br>";
        Pack.GeoMarkup += " Rolling: ";
        var TheDate = moment(this.Data[yindex].StartTime).format("dddd MMM Do hh:mm a");
        Pack.GeoMarkup += TheDate;

        Pack.GeoMarkup += "<br>";
        Pack.GeoMarkup += " Start Miles: ";
        Pack.GeoMarkup += this.Data[yindex].Miles;

        $$$.Shout(Pack);


        var D = $$$.MakeNumber(this.Data[yindex].Duration);
        if (D > 0) {
            Pack = {};
            Pack.Channel = "Map";
            Pack.Event = "AddMarker";
            Pack.GeoLat = this.Data[yindex].GeoLatOUT;
            Pack.GeoLong = this.Data[yindex].GeoLongOUT;
            Pack.GeoMarkup = this.Data[yindex].ScreenName;
            Pack.GeoMarkup += "<br>";
            Pack.GeoMarkup += " Parked: ";
            var TheDate = moment(this.Data[yindex].EndTime).format("dddd MMM Do hh:mm a");
            Pack.GeoMarkup += TheDate;

            Pack.GeoMarkup += "<br>";
            Pack.GeoMarkup += " Start Miles: ";
            Pack.GeoMarkup += this.Data[yindex].Miles;

            Pack.GeoMarkup += "<br>";
            Pack.GeoMarkup += " Stop Miles: ";
            Pack.GeoMarkup += this.Data[yindex].MilesOUT;

            Pack.GeoMarkup += "<br>";
            Pack.GeoMarkup += " Distance: ";
            Pack.GeoMarkup += this.Data[yindex].MilesOUT - this.Data[yindex].Miles;

            $$$.Shout(Pack);
        }
    }
    ModOBJ.prototype.OnNext = function () {
        
        var New = this.Index;
        New++;
        if (New > this.Data.length - 1)
        {
            this.Index = 0;
            this.Output();
            return;
        }
        this.Index++;
        this.Output();


        
    }
    ModOBJ.prototype.OnBack = function () {
        if (this.Index < 1) {
            this.Index = this.Data.length - 1;
            this.Output();
            return;
        }
        this.Index--;
        this.Output();
        
    }
    ModOBJ.prototype.Nav = function (target) {
        var Row = $$$.Dom(target, "div", "TextRight", "");
        var Back = $$$.Button(Row, "<-", this.OnBack.bind(this));
        this.Status = $$$.Dom(Row, "div", "Bold Flow Pad", "Hello World");
        var Next = $$$.Button(Row, "->", this.OnNext.bind(this));
    }
    ModOBJ.prototype.Output = function () {
        var yindex = this.Index;
        var T = "Record ";
        T += this.Index+1;
        T += " Of ";
        T += this.Data.length;
        $$$.Text(this.Status, T);
        

        T = "";
        var Box = this.Content;
        $$$.Flush(Box);
        Box.className = "";
        var Left = $$$.Dom(Box, "div", "");

        var Seconds = $$$.MakeNumber(this.Data[yindex].Duration);
        var Row = $$$.Dom(Left, "div", "TextLeft Bold");
        T = this.Data[yindex].ScreenName + " (" + this.Data[yindex].Unit + ")";
        $$$.Text(Row, T);
        Row = $$$.Dom(Left, "div", "TextLeft Bold", this.Data[yindex].ProjectTitle);

        if (Seconds > 0) {

            T = moment(this.Data[yindex].StartTime).fromNow();
            Row = $$$.Dom(Left, "div", "TextLeft", "Rolling: " + T);
            T = moment(this.Data[yindex].StartTime).format("dddd MMM Do hh:mm a");
            Row = $$$.Dom(Left, "div", "TextLeft", "(" + T + ")");

            T = moment(this.Data[yindex].EndTime).fromNow();
            Row = $$$.Dom(Left, "div", "TextLeft", "Parked: " + T);
            T = moment(this.Data[yindex].EndTime).format("dddd MMM Do hh:mm a");
            Row = $$$.Dom(Left, "div", "TextLeft", "(" + T + ")");


            Row = $$$.Dom(Left, "div", "TextLeft", "Start Miles: " + this.Data[yindex].Miles);
            Row = $$$.Dom(Left, "div", "TextLeft", "Stop Miles: " + this.Data[yindex].MilesOUT);
            var Start = $$$.MakeNumber(this.Data[yindex].Miles);
            var Stop = $$$.MakeNumber(this.Data[yindex].MilesOUT);
            var Distance = Stop - Start;
            Row = $$$.Dom(Left, "div", "TextLeft", "Distance: " + Distance);
            var Min = Seconds / 60;
            var Hours = Min / 60;
            var RInt = $$$.decimalAdjust("round", Hours * 4, 0);
            var DInt = $$$.decimalAdjust("round", RInt / 4, -2);
            Row = $$$.Dom(Left, "div", "TextLeft", "Time: " + DInt);
        }
        else {
            Box.className += " Red ";
            var T = moment(this.Data[yindex].StartTime).fromNow();
            Row = $$$.Dom(Left, "div", "TextLeft", "Rolling: " + T);
            T = moment(this.Data[yindex].StartTime).format("dddd MMM Do hh:mm a");
            Row = $$$.Dom(Left, "div", "TextLeft", "(" + T + ")");
            Row = $$$.Dom(Left, "div", "TextLeft", "Start Miles: " + this.Data[yindex].Miles);

        }

        Row = $$$.Dom(Left, "p", "");
        Row.innerHTML = "Notes:<br> " + this.Data[yindex].Notes;
        Row = $$$.Dom(Left, "div", "TextRight Bold Clicky", "Map");
        Row.onclick = this.OnMap.bind(this, yindex);
    }

    ModOBJ.prototype.Init = function (obj) {
        this.Root = $$$.Pop();
        var Box = $$$.Dom(this.Root, "div", "Box");
        this.Nav(Box);
        this.Content = $$$.Dom(Box, "div", "");

        this.Data = obj.Data;
        this.Index = obj.Index;
        this.Output();
        //Pack.Index = yindex;
        //Pack.Data = this.Data;
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