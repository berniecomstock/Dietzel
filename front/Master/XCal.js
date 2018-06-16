(function (window, document) {
    "use strict";
    var ModName = "XCal";
    var CalMin, CalHours, CalAmPm = null;

    function DayOBJ() { }
    DayOBJ.prototype.Box = null;
    DayOBJ.prototype.Day = 0;
    DayOBJ.prototype.Month = 0;
    DayOBJ.prototype.Year = 0;
    DayOBJ.prototype.callback = null;
    DayOBJ.prototype.OnClick = function () {
        if (!this.Day) { return; }//no clicking dead cells
        var Return = { Month: this.Month + 1, Day: this.Day, Year: this.Year };
        //Return.Hour = CalHours.value;
        //Return.Min = CalMin.value;

        this.callback(Return);
    }
    //
    DayOBJ.prototype.Set = function (obj) {
        this.Day = obj.Day;
        this.Month = obj.Month;
        this.Year = obj.Year;
        $$$.Text(this.Box, this.Day);
        this.Box.className = "Split7 Pad Clicky Bold OrangeFont";

        var D = new Date();
        D.setFullYear(obj.Year);
        D.setMonth(obj.Month);
        D.setDate(obj.Day);

        if (D.getDay() === 0) { this.Box.className = "Split7 Pad Clicky"; }
        if (D.getDay() === 6) { this.Box.className = "Split7 Pad Clicky"; }
        
    }
    DayOBJ.prototype.Reset = function () {
        $$$.Text(this.Box, "");
        this.Box.className = "Split7 Pad";
    }
    DayOBJ.prototype.Select = function () {
        this.Box.className = "Split7 Pad RedFont Bold Big Clicky Blink";
    }
    //var Style = "Flow Pad Mar Border";
    DayOBJ.prototype.Init = function (target) {
        this.Box = $$$.Dom(target, "div", "Split7", "");
        this.Box.onclick = this.OnClick.bind(this);
    }


    function CalOBJ() { }
    CalOBJ.prototype.callback = null;
    CalOBJ.prototype.Box = null;
    CalOBJ.prototype.GridRoot = null;
    CalOBJ.prototype.MonthRoot = null;
    CalOBJ.prototype.SelectedDay = 1;
    CalOBJ.prototype.SelectedYear = 1900;
    CalOBJ.prototype.SelectedMonth = 0;
    CalOBJ.prototype.Days = [];
    //CalOBJ.prototype.Pack = $$$.NewCalPack();

    CalOBJ.prototype.On = function (obj) { }
    CalOBJ.prototype.On = function (obj) { }
    CalOBJ.prototype.On = function (obj) { }
    CalOBJ.prototype.OnNextMonth = function () {
        var NewMonth = this.SelectedMonth + 1;
        var NewYear = this.SelectedYear;
        if (NewMonth === 12) {
            NewMonth = 0;
            NewYear = this.SelectedYear + 1;
        }
        this.SelectedDay = 1;
        this.FillGrid(NewYear, NewMonth, this.SelectedDay);
    }
    CalOBJ.prototype.OnPrevMonth = function () {
        var NewMonth = this.SelectedMonth - 1;
        var NewYear = this.SelectedYear;
        if (NewMonth === -1) {//year change
            NewMonth = 11;
            NewYear = NewYear - 1;
        }
        this.SelectedDay = 1;
        this.FillGrid(NewYear, NewMonth, this.SelectedDay);
    }
    CalOBJ.prototype.OnNextYear = function () {
        
        this.SelectedYear++;
        this.SelectedDay = 1;
        this.FillGrid(this.SelectedYear, this.SelectedMonth, this.SelectedDay);
    }
    CalOBJ.prototype.OnPrevYear = function () {
        this.SelectedYear--;
        this.SelectedDay = 1;
        this.FillGrid(this.SelectedYear, this.SelectedMonth, this.SelectedDay);
    }

    CalOBJ.prototype.OnToday = function () {

        //this.SelectedYear--;
        //this.SelectedDay = 1;
        //this.FillGrid(this.SelectedYear, this.SelectedMonth, this.SelectedDay);
        var D = new Date();
        console.log(D.getFullYear());
        console.log(D.getMonth());
        console.log(D.getDate());
        this.SelectedYear = D.getFullYear();
        this.SelectedMonth = D.getMonth();
        this.SelectedDay = D.getDate();

        this.FillGrid(this.SelectedYear, this.SelectedMonth, this.SelectedDay);


    }

    CalOBJ.prototype.SelectMonth = function () {
        $$$.Flush(this.MonthRoot);
        var Row = $$$.Dom(this.MonthRoot, "div", "", "");
        var DisplayBar = $$$.Dom(this.MonthRoot, "div", "Center Bold GreenFont Big", "");
        var Style = "Flow Border Smooth Mar Pad Clicky Bold";
        var B = $$$.Dom(Row, "div", Style+" OrangeFont", "< - Year");
        B.onclick = this.OnPrevYear.bind(this);
        B = $$$.Dom(Row, "div", Style+" BlueFont", "< - Month");
        B.onclick=this.OnPrevMonth.bind(this);
        B = $$$.Dom(Row, "div", Style+" GreenFont", "Today");
        B.onclick = this.OnToday.bind(this);
        B = $$$.Dom(Row, "div", Style+" BlueFont", "Month - >");
        B.onclick = this.OnNextMonth.bind(this);
        B = $$$.Dom(Row, "div", Style+" OrangeFont", "Year - >");
        B.onclick = this.OnNextYear.bind(this);


        var MonthName = "";
        if (this.SelectedMonth === 0) MonthName = "Jan";
        if (this.SelectedMonth === 1) MonthName = "Feb";
        if (this.SelectedMonth === 2) MonthName = "Mar";
        if (this.SelectedMonth === 3) MonthName = "Apr";
        if (this.SelectedMonth === 4) MonthName = "May";
        if (this.SelectedMonth === 5) MonthName = "Jun";
        if (this.SelectedMonth === 6) MonthName = "Jly";
        if (this.SelectedMonth === 7) MonthName = "Aug";
        if (this.SelectedMonth === 8) MonthName = "Sep";
        if (this.SelectedMonth === 9) MonthName = "Oct";
        if (this.SelectedMonth === 10) MonthName = "Nov";
        if (this.SelectedMonth === 11) MonthName = "Dec";

        MonthName += " " + this.SelectedDay;
        MonthName += " " + this.SelectedYear;

        $$$.Text(DisplayBar, MonthName);

        

    }
    CalOBJ.prototype.ResetDays = function () {
        var y = this.Days.length;
        var yindex = 0;
        while (yindex != y) {
            this.Days[yindex].Reset();
            yindex++;
        }
    }

    CalOBJ.prototype.FillGrid = function (pYear, pMonth, pDay) {
        this.SelectedMonth = pMonth;
        this.SelectedYear = pYear;

        this.SelectMonth();

        this.ResetDays();
        var date = new Date();
        date.setFullYear(pYear);
        date.setMonth(pMonth);
        date.setDate(1);
        var StartOffset = date.getDay();
        var LastDay = $$$.LastDayOfMonth(pYear, pMonth);
        var yindex = StartOffset;
        var Theday = 1;
        while (1) {
            this.Days[yindex].Set({ Day: Theday, Month: this.SelectedMonth, Year: this.SelectedYear });
            if (Theday === pDay) { this.Days[yindex].Select(); }
            yindex++;
            Theday++;
            if (Theday - 1 === LastDay) { break; }
        }
    }
    
    
    
    CalOBJ.prototype.Init = function (obj) {
        //this object uses a zero based month, So covert Month when it come in and goes out
        if ("Target" in obj) {
            console.log("Target Found");
            this.Box = $$$.Dom(obj.Target, "div", "", "");
        }
        else {
            $$$.Flush($$$.Content);
            this.Box = $$$.Dom($$$.Content, "div", "", "");
        }
        
        
        this.callback = obj.callback;
        this.SelectedDay = obj.Seed.Day;
        this.SelectedMonth = obj.Seed.Month - 1;
        this.SelectedYear = obj.Seed.Year;

        this.MonthRoot = $$$.Dom(this.Box, "div", "");
        this.GridRoot = $$$.Dom(this.Box, "div", "Cal");
        var Row = $$$.Dom(this.GridRoot, "div", "CalHeader");

        var Style = "Split7 Pad BlueFont Bold";
        var Style2 = "Split7 Pad";

        var Temp = $$$.Dom(Row, "div", Style2, "Sun");
        Temp = $$$.Dom(Row, "div", Style, "Mon");
        Temp = $$$.Dom(Row, "div", Style, "Tue");
        Temp = $$$.Dom(Row, "div", Style, "Wed");
        Temp = $$$.Dom(Row, "div", Style, "Thur");
        Temp = $$$.Dom(Row, "div", Style, "Fri");
        Temp = $$$.Dom(Row, "div", Style2, "Sat");

        this.Days.length = 0;
        var yindex = 0;
        var y = 42;
        while (yindex != y) {
            var Temp = new DayOBJ();
            Temp.Init(this.GridRoot);
            Temp.callback = this.callback;
            this.Days.push(Temp);
            yindex++;
        }
        this.FillGrid(this.SelectedYear, this.SelectedMonth, this.SelectedDay);
        
        
    }

    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new CalOBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);
