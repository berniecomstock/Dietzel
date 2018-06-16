
(function (window, document) {
    "use strict";
    var ModName = "OpenHole";

    $$$.Yards = function (feetheight, dia) {
        var R = dia / 2;
        var Result = (feetheight * 12) * Math.PI * R * R;
        return Result / 46656;
    }


    function OBJ() { }
    OBJ.prototype.Project = {};
    OBJ.prototype.Hole = {};
    OBJ.prototype.Target = null;
    OBJ.prototype.SetGeoTime = function () {
        var Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = function () { };
        Pack.PostData.append("Table", "Holes");
        Pack.PostData.append("FName", "GeoTime");
        Pack.PostData.append("RID", this.Hole.RID);
        Pack.PostData.append("FVal", "Now()");
        Pack.PostData.append("NoQuote", 1);
        $$$.Server(Pack);

        Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = function () { };
        Pack.PostData.append("Table", "Holes");
        Pack.PostData.append("FName", "GeoLat");
        Pack.PostData.append("RID", this.Hole.RID);
        Pack.PostData.append("FVal", this.Hole.GeoLat);
        $$$.Server(Pack);

        Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = function () { };
        Pack.PostData.append("Table", "Holes");
        Pack.PostData.append("FName", "GeoLong");
        Pack.PostData.append("RID", this.Hole.RID);
        Pack.PostData.append("FVal", this.Hole.GeoLong);
        $$$.Server(Pack);
        
    }
    OBJ.prototype.SetGeoCallback = function (obj) {


        if ("latitude" in obj) {
            this.Hole.GeoLat = obj.latitude;
            this.Hole.GeoLong = obj.longitude;
            //this.GeoLong.value = obj.longitude;
            //this.GeoLat.value = obj.latitude;
            this.SetGeoTime();
        }
    }
    OBJ.prototype.OnSetGeo = function () {
        var Pack = {};
        Pack.callback = this.SetGeoCallback.bind(this);
        $$$.LoadScript("XGeo", Pack);

    }
    
    
    OBJ.prototype.Init = function (obj) {
        this.Project = obj.Project;
        this.Hole = obj.Hole;
        this.Target = $$$.Pop();
        var Row, Box, Left, Right,TheName,TheTable = null;
        
        TheName = "Name";
        TheTable = "Holes";

        Row = $$$.Dom(this.Target, "div", "Bold Mar Pad Big OrangeFont", this.Project.Title);
        Row = $$$.Dom(this.Target, "div", "Bold Mar Pad Big GreenFont");
        new $$$.SmartText(Row, this.Hole, TheName, TheTable);
        
        


        //Edit Diam Depth Geo Notes
        Row = $$$.Dom(this.Target, "div", "");
        new $$$.XEditText(Row, "Holes", this.Hole, "Name", "Hole Name");
        Row = $$$.Dom(this.Target, "div", "VTop");
        new $$$.XEditText(Row, TheTable, this.Hole, "HoleDia", "Diameter");
        new $$$.XEditText(Row, TheTable, this.Hole, "HoleDepth", "Depth");
        new $$$.XEditText(Row, TheTable, this.Hole, "DepthDirt", "Dirt");
        new $$$.XEditText(Row, TheTable, this.Hole, "DepthRock", "Rock");


        Row = $$$.Dom(this.Target, "div", "");
        new $$$.XText(Row, TheTable, this.Hole, "GeoLat", "GeoLat");
        new $$$.XText(Row, TheTable, this.Hole, "GeoLong", "GeoLong");
        $$$.Button(Row, "Set Geo", this.OnSetGeo.bind(this));
        
        
        Row = $$$.Dom(this.Target, "div", "");
        new $$$.XEditArea(Row,TheTable, this.Hole, "Notes", "Notes");
        //$$$.XEditArea = function (target, table, pointer, dataname, name) {

        Row = $$$.Dom(this.Target, "div", "Right");
        $$$.Button(Row, "Save", $$$.UnPop.bind(this));
        /*
        //////////////////////////////////////////////////////////
        Row = $$$.Dom(this.Target, "div", "Bold Big", "Office Use");
        Row = $$$.Dom(this.Target, "div", "");
        new $$$.XEditText(Row, TheTable, this.Hole, "LocateNumber", "Locate Number");
        new $$$.DatePicker(Row, this.Hole, "LocateDate", "Loc Date", TheTable);
        new $$$.XEditText(Row, TheTable, this.Hole, "OfficeGeoLat", "GeoLat");
        new $$$.XEditText(Row, TheTable, this.Hole, "OfficeGeoLong", "GeoLong");
        console.dir(this.Hole);
        //////////////////////////////////////////////////////////////
        */
        Row = $$$.Dom(this.Target, "div", "Bold Big", "Gallery");
        $$$.LoadScript("XHoleImage", { Data: this.Hole, Target: $$$.Dom(this.Target, "div", "", ""), Project: this.Project });
        /////////////////////////////////////////////////////////////////////////////
        //Loc Number Loc Date Drill Date HoleWet Geo
        

       
        
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);