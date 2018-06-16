(function (window, document) {
    "use strict";
    var ModName = "Now";
    function OBJ() { }
    OBJ.prototype.Users = [];
    OBJ.prototype.DriveTime = [];
    OBJ.prototype.TimeFrame = {};

    /*
    this.EndTime = obj.EndTime;
    this.StartTime = obj.StartTime;
    this.Target = obj.Target;
    this.ProjectRID = obj.ProjectRID;
    this.TargetStyleBackup = this.Target.className;
    this.Title = obj.ProjectTitle;
    */

    OBJ.prototype.OutputEquip = function () {



        var y = this.DriveTime.length;
        var yindex = 0;
        while (yindex != y) {
            var Row = $$$.Dom($$$.Content, "div", "Border Smooth Mar Pad");
            var Pack = {};

            var Left = $$$.Dom(Row, "div", "Split3 ", this.DriveTime[yindex].Unit);
            //var Right = $$$.Dom(Row, "div", "Split");
            var One = $$$.Dom(Row, "div", "Split3 BlueFont Bold", this.DriveTime[yindex].ScreenName);
            var Two = $$$.Dom(Row, "div", "Split3 OrangeFont Bold", this.DriveTime[yindex].Title);
            //var Job = $$$.Dom(Right, "div", "Split OrangeFont Bold", this.Users[yindex].Title);
            //var Unit = $$$.Dom(Right, "div", "Split GreenFont Bold", this.Users[yindex].Unit);


            Pack = {};
            Pack.EndTime = this.TimeFrame.WeekEnd;
            Pack.StartTime = this.TimeFrame.WeekBegin;
            Pack.EndTime = "2050-1-1";
            Pack.StartTime = "2000-1-1";

            Pack.EquipRID = this.DriveTime[yindex].EquipRID;
            Pack.EquipUnit = this.DriveTime[yindex].Unit
            Pack.Target = Left;
            $$$.LoadScript("XEquipTime", Pack);

            //this.EquipRID = obj.EquipRID;
            //this.Unit = obj.EquipUnit;

            yindex++;
        }
        console.dir(this.DriveTime[0]);
       
    }
    OBJ.prototype.OnDriveTime = function (obj) {
        this.DriveTime = obj.json.Results;
        this.OutputEquip();
    }
    OBJ.prototype.GetDriveTime = function () {
        var q = "Select *, ";
        q += "(select title from projects where rid=ProjectRID) As Title,";
        q += "(select screenname from users where rid=UserRID) As ScreenName,";
        q += "(select Unit from equip where rid=EquipRID) As Unit ";
        q += " from drivetime where duration=0 order by Unit ASC";
        $$$.MySql(q, this.OnDriveTime.bind(this));
    }
    OBJ.prototype.OnJob = function (yindex,target) {
    }
    OBJ.prototype.OnUser = function (yindex, target) {
        var Pack = {};
        Pack.EndTime = this.TimeFrame.WeekEnd;
        Pack.StartTime = this.TimeFrame.WeekBegin;
        Pack.UserRID = this.Users[yindex].RID;
        Pack.ScreenName = this.Users[yindex].ScreenName;
        Pack.Target = target;
        $$$.LoadScript("XUserTime", Pack);
    }
    OBJ.prototype.OutputUsers = function () {

        
        
        var y = this.Users.length;
        var yindex = 0;
        while (yindex != y) {
            var Row = $$$.Dom($$$.Content, "div", "Border Smooth Mar Pad");
            var Pack = {};

            var Left = $$$.Dom(Row, "div", "Split3 ", this.Users[yindex].ScreenName);
            //var Right = $$$.Dom(Row, "div", "Split");
            var Job = $$$.Dom(Row, "div", "Split3 OrangeFont Bold", this.Users[yindex].Title);
            var Unit = $$$.Dom(Row, "div", "Split3 GreenFont Bold", this.Users[yindex].Unit);
            
            
            Pack = {};
            Pack.EndTime = this.TimeFrame.WeekEnd;
            Pack.StartTime = this.TimeFrame.WeekBegin;
            Pack.UserRID = this.Users[yindex].RID;
            Pack.ScreenName = this.Users[yindex].ScreenName;
            Pack.Target = Left;
            $$$.LoadScript("XUserTime", Pack);
            

            yindex++;
        }
        this.GetDriveTime();
    }
    OBJ.prototype.OnData = function (obj) {
        //console.dir(obj);
        this.Users = obj.json.Results;
        this.OutputUsers();
    }
    
    OBJ.prototype.OnTime = function (obj) {
        this.TimeFrame = obj;
        
        //WeekBegin
        //WeekEnd
        var q = "Select *,";
        q += "(select title from projects where rid=CurrentProject) As Title,";
        q += "(select Unit from equip where rid=EquipRID) As Unit ";
        q += " from Users where CurrentProject > 0 order by Title ASC,ScreenName ASC";
        $$$.MySql(q, this.OnData.bind(this));
    }
    OBJ.prototype.Init = function (obj) {
        $$$.Flush($$$.Content);

        $$$.GetTimeFrame({callback:this.OnTime.bind(this)})

        
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);