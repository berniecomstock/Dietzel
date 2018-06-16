
(function (window, document) {
    "use strict";
    var ModName = "SandBox";
    
    //Day,Week,Month,Quarter,Year,All
    function SandBoxOBJ() { }
    SandBoxOBJ.prototype.SelectedDay = {};
    SandBoxOBJ.prototype.SelectedDay.Year = 0;
    SandBoxOBJ.prototype.SelectedDay.Month = 0;
    SandBoxOBJ.prototype.SelectedDay.Day = 0;
    SandBoxOBJ.prototype.TimeFrame = {};
    SandBoxOBJ.prototype.Header = null;
    SandBoxOBJ.prototype.Content = null;
    SandBoxOBJ.prototype.SelectedRange = "Day";
    SandBoxOBJ.prototype.SelectedType = "Projects";
    SandBoxOBJ.prototype.StartTime = "";
    SandBoxOBJ.prototype.EndTime = "";
    SandBoxOBJ.prototype.FirstRun = true;
    SandBoxOBJ.prototype.StartDateButton = null;

    SandBoxOBJ.prototype.RangeDay = null;
    SandBoxOBJ.prototype.RangeWeek = null;
    SandBoxOBJ.prototype.RangeMonth = null;
    SandBoxOBJ.prototype.RangeQuarter = null;
    SandBoxOBJ.prototype.RangeYear = null;
    SandBoxOBJ.prototype.RangeAll = null;


    SandBoxOBJ.prototype.TypeProjects = null;
    SandBoxOBJ.prototype.TypePeople = null;
    SandBoxOBJ.prototype.TypeEquip = null;


    SandBoxOBJ.prototype.UpdateButtons = function () {
        console.log("UpdateButtons");

        //console.dir(this.RangeDay);
        var Style = "Flow Bold Clicky Pad Mar";
        
        this.RangeDay.className = Style;
        this.RangeWeek.className = Style;
        this.RangeMonth.className = Style;
        this.RangeQuarter.className = Style;
        this.RangeYear.className = Style;
        this.RangeAll.className = Style;

        this.TypeProjects.className = Style;
        this.TypePeople.className = Style;
        this.TypeEquip.className = Style;



        Style = "Flow Bold Clicky Pad Border Smooth Mar Border ";

        if (this.SelectedRange === "Day") { this.RangeDay.className = Style; }
        if (this.SelectedRange === "Week") { this.RangeWeek.className = Style; }
        if (this.SelectedRange === "Month") { this.RangeMonth.className = Style; }
        if (this.SelectedRange === "Quarter") { this.RangeQuarter.className = Style; }
        if (this.SelectedRange === "Year") { this.RangeYear.className = Style; }
        if (this.SelectedRange === "All") { this.RangeAll.className = Style; }

        if (this.SelectedType === "Projects") {
            this.TypeProjects.className = Style+" OrangeFont";
        }
        if (this.SelectedType === "People") {
            this.TypePeople.className = Style + " BlueFont";   
        }
        if (this.SelectedType === "Equip") {
            this.TypeEquip.className = Style + " GreenFont";
        }
    }

    SandBoxOBJ.prototype.StartMod = function () {
        console.log("StartMod");
        console.log(this.StartTime + " - " + this.EndTime);

        var Pack = {};
        Pack.StartTime = this.StartTime;
        Pack.EndTime = this.EndTime;
        Pack.Target = this.Content;
        
        if (this.SelectedType === "Projects") {
            $$$.LoadScript("XProjectList", Pack);
        }
        if (this.SelectedType === "People") {
            $$$.LoadScript("XUserList", Pack);
        }
        if (this.SelectedType === "Equip") {
            $$$.LoadScript("XEquipList", Pack);
        }
        this.UpdateButtons();   
    }
    SandBoxOBJ.prototype.ProcessTimeFrame = function () {
        console.log("ProcessTimeFrame");
        $$$.Text(this.StartDateButton, this.TimeFrame.PrettyToday);
        this.OnRangeChange(this.SelectedRange);
        //this.StartMod();
    }
    SandBoxOBJ.prototype.OnTimeFrame = function (obj) {
        console.log("OnTimeFrame");
        this.TimeFrame = obj;
        console.dir(this.TimeFrame);
        if (this.FirstRun) {
            this.FirstRun = false;
            this.SelectedRange = "Day";
            this.StartTime = this.TimeFrame.Today;
            this.EndTime = this.TimeFrame.Tomorrow;
        }
        else {
            if (this.SelectedRange === "Day") { }
            if (this.SelectedRange === "Week") { }
            if (this.SelectedRange === "Month") { }
            if (this.SelectedRange === "Quarter") { }
            if (this.SelectedRange === "Year") { }
            if (this.SelectedRange === "All") { }

        }
        this.ProcessTimeFrame();
    }
    SandBoxOBJ.prototype.OnRangeChange = function (tag) {
        console.log("OnRangeChange "+tag);
        this.SelectedRange = tag;
        if (this.SelectedRange === "Day") { this.StartTime = this.TimeFrame.Today; this.EndTime = this.TimeFrame.Tomorrow; }
        if (this.SelectedRange === "Week") { this.StartTime = this.TimeFrame.WeekBegin; this.EndTime = this.TimeFrame.WeekEnd; }
        if (this.SelectedRange === "Month") { this.StartTime = this.TimeFrame.MonthBegin; this.EndTime = this.TimeFrame.MonthEnd; }
        if (this.SelectedRange === "Quarter") {
            if (this.TimeFrame.Qtr === "1") { this.StartTime = this.TimeFrame.Year + "-01-01"; this.EndTime = this.TimeFrame.Year + "-04-01"; }
            if (this.TimeFrame.Qtr === "2") { this.StartTime = this.TimeFrame.Year + "-04-01"; this.EndTime = this.TimeFrame.Year + "-07-01"; }
            if (this.TimeFrame.Qtr === "3") { this.StartTime = this.TimeFrame.Year + "-07-01"; this.EndTime = this.TimeFrame.Year + "-10-01"; }
            if (this.TimeFrame.Qtr === "4") { this.StartTime = this.TimeFrame.Year + "-10-01"; this.EndTime = this.TimeFrame.NextYear + "-01-01"; }
        }
        if (this.SelectedRange === "Year") { this.StartTime = this.TimeFrame.Year + "-01-01"; this.EndTime = this.TimeFrame.NextYear + "-01-01"; }
        if (this.SelectedRange === "All") { this.StartTime = "2000-01-01"; this.EndTime = this.TimeFrame.NextYear + "-12-01"; }

        this.StartMod();
    }
    SandBoxOBJ.prototype.OnTypeChange = function (NewType) {
        this.SelectedType = NewType;
        this.StartMod();
    }
    
    SandBoxOBJ.prototype.OnNow = function () {
        $$$.LoadScript("Now", {});
    }
    SandBoxOBJ.prototype.OnNewStartDate = function (obj) {
        console.log("OnNewStartDate");
        this.SelectedDay.Year = obj.Year;
        this.SelectedDay.Month = obj.Month;
        this.SelectedDay.Day = obj.Day;
        $$$.Flush($$$.Content);

        this.Header = $$$.Dom($$$.Content, "div", "Bottom");
        this.Content = $$$.Dom($$$.Content, "div", "");
        var Row = $$$.Dom(this.Header, "div", "");
        this.StartDateButton = $$$.Dom(Row, "div", "Flow Smooth Pad Mar Bold Clicky Border", "Today");
        this.StartDateButton.onclick = this.OnStartDateButton.bind(this);
        $$$.Button(Row, "Now", this.OnNow.bind(this));

        //this.HelpButton = $$$.Dom(Row, "div", "Flow Smooth Pad Mar Bold Clicky Border Blink GreenFont", "Help");
        //this.HelpButton.onclick = this.OnHelp.bind(this);

        var Seed = "'" + obj.Year + "-" + obj.Month + "-" + obj.Day + "'";
        $$$.GetTimeFrame({ callback: this.OnTimeFrame.bind(this), Seed: Seed });
        Row = $$$.Dom(this.Header, "div", "");
        
        //Day,Week,Month,Quarter,Year,All this.Range = 
        this.RangeDay = $$$.Dom(Row, "div", "", "Day");
        this.RangeDay.onclick = this.OnRangeChange.bind(this, "Day");
        this.RangeWeek = $$$.Dom(Row, "div", "", "Week");
        this.RangeWeek.onclick = this.OnRangeChange.bind(this, "Week");
        this.RangeMonth = $$$.Dom(Row, "div", "", "Month");
        this.RangeMonth.onclick = this.OnRangeChange.bind(this, "Month");
        this.RangeQuarter = $$$.Dom(Row, "div", "", "1/4");
        this.RangeQuarter.onclick = this.OnRangeChange.bind(this, "Quarter");
        this.RangeYear = $$$.Dom(Row, "div", "", "Year");
        this.RangeYear.onclick = this.OnRangeChange.bind(this, "Year");
        this.RangeAll = $$$.Dom(Row, "div", "", "All");
        this.RangeAll.onclick = this.OnRangeChange.bind(this, "All");

        //this.TypeProjects = 


        Row = $$$.Dom(this.Header, "div", "");
        this.TypeProjects = $$$.Dom(Row, "div", "", "Projects");
        this.TypeProjects.onclick = this.OnTypeChange.bind(this, "Projects");
        this.TypePeople = $$$.Dom(Row, "div", "", "People");
        this.TypePeople.onclick = this.OnTypeChange.bind(this, "People");
        this.TypeEquip = $$$.Dom(Row, "div", "", "Equipment");
        this.TypeEquip.onclick = this.OnTypeChange.bind(this, "Equip");


    }
    SandBoxOBJ.prototype.OnStartDateButton = function () {

        $$$.LoadScript("XCal", { callback: this.OnNewStartDate.bind(this),Seed:this.SelectedDay });   
    }
    SandBoxOBJ.prototype.Init = function () {
        var D = new Date();
        var Temp = { Year: D.getFullYear(), Month: D.getMonth()+1, Day: D.getDate() };
        this.OnNewStartDate(Temp);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new SandBoxOBJ();
        Temp.Init();
    }
    $$$[ModName] = Run;

})(window, document);

/*
*/
