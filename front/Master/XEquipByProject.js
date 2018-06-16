//XEquipByProject
(function (window, document) {
    "use strict";
    var ModName = "XEquipByProject";


    function OBJ() { };
    OBJ.prototype.Target = null;
    OBJ.prototype.ProjectRID = 0;
    OBJ.prototype.UserRID = 0;
    OBJ.prototype.EquipRID = 0;
    OBJ.prototype.StartTime = "";
    OBJ.prototype.EndTime = "";
    OBJ.prototype.DriveTime = [];
    OBJ.prototype.Unit = "";
    OBJ.prototype.Seconds = 0;
    OBJ.prototype.Distance = 0;

    
    OBJ.prototype.Output = function () {

        //$$$.Flush(this.Target);
        //$$$.Text(this.Target, this.Unit);
        $$$.Flush(this.Target);
        var Row = null;
        var Left = null;
        var Right = null;
        Row = $$$.Dom(this.Target, "div", "");
        Left = $$$.Dom(Row, "div", "Split");
        Right = $$$.Dom(Row, "div", "Split");
        var R1 = $$$.Dom(Right, "div", "Split");
        var R2 = $$$.Dom(Right, "div", "Split");
        //Row = $$$.Dom(Left, "div", "GreenFont Bold Clicky", this.Unit);
        var Pack = {};
        Pack.StartTime = this.StartTime;
        Pack.EndTime = this.EndTime;
        Pack.EquipRID = this.EquipRID;
        Pack.EquipUnit = this.Unit;
        Pack.Target = Left;
        $$$.LoadScript("XEquipTime", Pack);

        $$$.Dom(R1, "div", "Left RedFont", "Hours: " + $$$.SecToHours(this.Seconds));
        $$$.Dom(R2, "div", "Left RedFont", "Miles: " + this.Distance);
        //Row = $$$.Dom(Right, "div", "Left", "Hours: " + $$$.SecToHours(this.Seconds) + " Miles:" + this.Distance);
    }
    OBJ.prototype.ProcessData = function () {

        var y = this.DriveTime.length;
        var yindex = 0;
        while (yindex != y) {
            if ($$$.MakeNumber(this.DriveTime[yindex].Duration) === 0) {
                this.Seconds = this.Seconds + $$$.MakeNumber(this.DriveTime[yindex].SecToNow);
            }
            else {
                this.Seconds = this.Seconds + $$$.MakeNumber(this.DriveTime[yindex].Duration);
                this.Distance = this.Distance + $$$.MakeNumber(this.DriveTime[yindex].Distance);
            }
            

            this.Unit = this.DriveTime[yindex].Unit;
            yindex++;
        }
        this.Output();
    }

    OBJ.prototype.OnData = function (obj) {
        this.DriveTime = obj.json.Results;
        this.ProcessData();
    }
    OBJ.prototype.GetData = function () {
        var q = "select *, ";
        q += " (SELECT ABS(UNIX_TIMESTAMP(StartTime) - UNIX_TIMESTAMP(Now()))) as SecToNow, ";
        q += " (MilesOut - Miles) as Distance, ";
        q += "(Select Unit from Equip where rid=EquipRID) AS Unit";
        q += " from drivetime where ProjectRID=" + this.ProjectRID;
        q += " AND EquipRID=" + this.EquipRID;
        q += " AND StartTime BETWEEN '" + this.StartTime + "' AND '" + this.EndTime + "'";
        //console.log(q);
        $$$.MySql(q, this.OnData.bind(this));

    }
    OBJ.prototype.Init = function (obj) {
        this.StartTime = obj.StartTime;
        this.EndTime = obj.EndTime;
        this.Target = obj.Target;
        this.EquipRID = obj.EquipRID;
        this.ProjectRID = obj.ProjectRID;
        this.GetData();
        

    }
    ///////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;
})(window, document);