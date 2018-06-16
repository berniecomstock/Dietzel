(function (window, document) {
    "use strict";
    var ModName = "UserDetail";
    //RID, Email, Pass, ScreenName, Modified, HTTP_USER_AGENT, SessionID, GeoLat, GeoLong, Type, Phone, Address, AnnDate, TermDate, CDLDate, MedDate, CurrentProject, LastClockIn, LastClockOut, TimeSheetRID, GroupRID, Archive, EquipRID, DriveTimeRID
    //RID, ProjectRID, UserRID, StartTime, Notes, EndTime, Duration, GeoLat, GeoLong, GeoLatOUT, GeoLongOUT
    function ModOBJ() { }
    ModOBJ.prototype.Box = null;
    ModOBJ.prototype.RID = 0;
    ModOBJ.prototype.StartTime = "";
    ModOBJ.prototype.EndTime = "";
    ModOBJ.prototype.UserData = {};
    ModOBJ.prototype.TimeSheet = [];
    ModOBJ.prototype.Seconds = 0;
    ModOBJ.prototype.Today = 0;

    ModOBJ.prototype.OnGrouped = function () {
        this.Reset();
    }
    ModOBJ.prototype.OnGroupCallback = function (obj) {
        
        
        var Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = this.OnGrouped.bind(this);
        Pack.PostData.append("Table", "Users");
        Pack.PostData.append("RID", obj.TableRID);
        Pack.PostData.append("FName", "GroupRID");
        Pack.PostData.append("FVal", obj.RID);
        $$$.Server(Pack);
    }

    ModOBJ.prototype.OnGroup = function (yindex) {
        var Pack = $$$.NewPack();
        Pack.Channel = "GroupSelect";
        Pack.Event = "Start";
        Pack.Header = "Select Group For: " + this.UserData.ScreenName;
        Pack.Table = "Users";
        Pack.TableRID = this.UserData.RID;

        Pack.callback = this.OnGroupCallback.bind(this);
        $$$.Shout(Pack);
    }


    ModOBJ.prototype.MakeRow = function (n, v, alertflag) {
        var Row = $$$.Dom(this.Box, "div", "", "");
        var Left = $$$.Dom(Row, "div", "TextLeft Flow", n);
        var Right = $$$.Dom(Row, "div", "TextLeft Flow Bold", v);
        Left.style.width = "50%";
        Right.style.width = "50%";
        if (alertflag) {
            Right.className += " RedFont";
        }
        return Right;
    }
    ModOBJ.prototype.OutPut = function () {
        var Row = $$$.Dom(this.Box, "div", "Bold TextLeft", this.UserData.ScreenName);
        var y = this.TimeSheet.length;
        var yindex = 0;
        while (yindex != y) {
            var Data = this.TimeSheet[yindex];
            var Duration = $$$.MakeNumber(Data.Duration);
            if (Duration === 0) {
                
                var Now = moment(new Date());
                var Start = moment(Data.StartTime);
                var Diff = Now.diff(Start, 'seconds');
                //console.log("Diff=" + Diff);
                this.Today = $$$.MakeNumber(Diff);
                this.Seconds = this.Seconds + this.Today;
                //console.log(this.Today);
            }
            else {
                this.Seconds = this.Seconds + Duration;
            }
            yindex++;
        }

        var Hours=$$$.SecToHours(this.Today);
        if (Hours > 8) { this.MakeRow("Today", Hours, true); }
        else {
            
            this.MakeRow("Today", Hours);
        }

        Hours = $$$.SecToHours(this.Seconds);
        if (Hours > 39.9) { this.MakeRow("W.T.D", Hours, true); }
        else {
            
            this.MakeRow("W.T.D", Hours);
        }
        
        //this.MakeRow("W.T.D", $$$.SecToHours(this.Seconds));


        var Row = this.MakeRow("Project", "...");
        this.UserData.CurrentProject = $$$.MakeNumber(this.UserData.CurrentProject);
        if (this.UserData.CurrentProject > 0) {
            new $$$.FetchText("Projects", this.UserData.CurrentProject, "Title", Row);
        }
        Row = this.MakeRow("Driving", "...");
        this.UserData.EquipRID = $$$.MakeNumber(this.UserData.EquipRID);
        if (this.UserData.EquipRID > 0) {
            new $$$.FetchText("Equip", this.UserData.EquipRID, "Unit", Row);
        }

        
        this.UserData.GroupRID = $$$.MakeNumber(this.UserData.GroupRID);
        if (this.UserData.GroupRID > 0) {
            Row = this.MakeRow("Group", "...");
            new $$$.FetchText("Groups", this.UserData.GroupRID, "Name", Row);
            Row.className += " Clicky";
            Row.onclick = this.OnGroup.bind(this);
        }
        else {
            Row = this.MakeRow("Group", "Solo", true);
            Row.className += " Clicky";
            Row.onclick = this.OnGroup.bind(this);

        }

        var Tag = "";
        var TestDate = "";
        var Now = moment(new Date());
        var Diff = 0;
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        Tag = "CDL Expiration:";
        TestDate = moment(this.UserData.CDLDate);
        var ClickTarget = null;
        function OnNewCDLDate() {
            ClickTarget.onclick = null;
            var Row = $$$.Dom(this.Box, "div", "", "");
            new $$$.SmartDate(Row, this.UserData, "CDLDate", "Users", "CDL",this.Reset.bind(this));
        }
        
        
        if (TestDate === "Invalid date") {
            ClickTarget=this.MakeRow(Tag, "Expired", true);
        }
        else {
            Diff = TestDate.diff(Now, 'seconds');
            Diff = $$$.MakeNumber(Diff);
            if (Diff === 0) { ClickTarget=this.MakeRow(Tag, "Expired", true); }
            if (Diff > 0) { ClickTarget = this.MakeRow(Tag, moment(TestDate).from()); }
            if (Diff < 0) { ClickTarget = this.MakeRow(Tag, "Expired", true); }
        }
        ClickTarget.onclick = OnNewCDLDate.bind(this);
        /////////////////////////////////////////////////////////////////////////////////////////

        var ClickTarget2 = null;
        function OnNewMedDate() {
            ClickTarget2.onclick = null;
            var Row = $$$.Dom(this.Box, "div", "", "");
            new $$$.SmartDate(Row, this.UserData, "MedDate", "Users", "Medical", this.Reset.bind(this));
        }

        Tag = "Medical:";
        TestDate = moment(this.UserData.MedDate);
        if (TestDate === "Invalid date") {
            //this.MakeRow(Tag, "Expired", true);
            ClickTarget2 = this.MakeRow(Tag, "Expired", true);
        }
        else {
            Diff = TestDate.diff(Now, 'seconds');
            Diff = $$$.MakeNumber(Diff);
            if (Diff === 0) { ClickTarget2 = this.MakeRow(Tag, "Expired", true); }
            if (Diff > 0) { ClickTarget2 = this.MakeRow(Tag, moment(TestDate).from()); }
            if (Diff < 0) { ClickTarget2 = this.MakeRow(Tag, "Expired", true); }
        }
        ClickTarget2.onclick = OnNewMedDate.bind(this);
        
        
        //CDLDate, MedDate, CurrentProject, LastClockIn, LastClockOut, TimeSheetRID, GroupRID, Archive, EquipRID, DriveTimeRID
        

    }
    ModOBJ.prototype.OnTimeSheet = function (obj) {
        this.TimeSheet = obj.json.Results;
        this.OutPut();
        
    }
    ModOBJ.prototype.OnUserData = function (obj) {
        //console.dir(obj);
        this.UserData = obj.json.Results[0];
        var q = "select * from timesheet where UserRID=";
        q += this.RID;
        q += " and StartTime between '";
        q += this.StartTime;
        q += "' and '";
        q += this.EndTime;
        q += "' order by starttime desc";

        
        var Pack = $$$.NewPack();
        Pack.url = "MySql.htm";
        Pack.PostData.append("q", q);
        Pack.callback = this.OnTimeSheet.bind(this);
        $$$.Server(Pack);
    }
    ModOBJ.prototype.GetUserData = function () {
        var Pack = $$$.NewPack();
        Pack.url = "MySql.htm";
        Pack.PostData.append("q", "select * from users where rid="+this.RID);
        Pack.callback = this.OnUserData.bind(this);
        $$$.Server(Pack);
    }
    ModOBJ.prototype.Reset = function () {
        $$$.Flush(this.Box);
        this.UserData = {};
        this.TimeSheet = [];
        this.Seconds = 0;
        this.Today = 0;
        this.GetUserData();
    }
    ModOBJ.prototype.Init = function (obj) {
        console.log(ModName);
        this.StartTime = obj.StartTime;
        this.EndTime = obj.EndTime;
        this.RID = obj.RID;
        //this.Box = $$$.Dom($$$.Content, "div", "Card");
        this.Box = obj.Target;
        this.Reset();
        
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
    function OnDepend2() {
        $$$.Listen({ Channel: ModName, callback: OnCom });
    }

    function OnDepend() {
        $$$.Shout({ Channel: "Pikaday", Event: "Load", callback: OnDepend2 });
    }

    //$$$.LoadCSS($$$.CSSPath + "pikaday.css");
    $$$.LoadCSS("PayRoll.css");
    $$$.LoadCSS("pikaday.css");
    $$$.Shout({ Channel: "Moment", Event: "Load", callback: OnDepend });
})(window, document);
