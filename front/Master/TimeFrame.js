(function (window, document) {
    "use strict";
    var ModName = "TimeFrame";
    function TimeOBJ() { }
    TimeOBJ.prototype.Today = "";
    TimeOBJ.prototype.Tomorrow = "";
    TimeOBJ.prototype.YesterDay = "";
    TimeOBJ.prototype.LastWeekBegin = "";
    TimeOBJ.prototype.LastWeekEnd = "";
    TimeOBJ.prototype.LastMonthBegin = "";
    TimeOBJ.prototype.LastMonthEnd = "";
    TimeOBJ.prototype.LastYearBegin = "";
    TimeOBJ.prototype.LastYearEnd = "";
    TimeOBJ.prototype.WeekBegin = "";
    TimeOBJ.prototype.WeekEnd = "";
    TimeOBJ.prototype.MonthBegin = "";
    TimeOBJ.prototype.MonthEnd = "";
    TimeOBJ.prototype.YearBegin = "";
    TimeOBJ.prototype.YearEnd = "";
    TimeOBJ.prototype.callback = "";
    TimeOBJ.prototype.OnToday = function (obj) {
        console.dir(obj.json.Results[0]);
    }
    TimeOBJ.prototype.OnData = function (obj) {
        console.dir(obj.json.Results[0]);
        var Data = obj.json.Results[0];
        this.DAYOFWEEK = "";
        this.Today = Data.Today;
        this.YesterDay = Data.YesterDay;
        this.Tomorrow = Data.Tomorrow;
        this.WeekBegin = Data.WeekBegin;
        this.WeekEnd = Data.WeekEnd;
        this.MonthBegin = Data.MonthBegin;
        this.MonthEnd = Data.MonthEnd;
        this.YearBegin = Data.YearBegin;
        this.YearEnd = Data.YearEnd;

        this.YesterDay = Data.YesterDay;
        this.LastWeekBegin = Data.LastWeekBegin;
        this.LastWeekEnd = Data.LastWeekEnd;
        this.LastMonthBegin = Data.LastMonthBegin;
        this.LastMonthEnd = Data.LastMonthEnd;
        this.LastYearBegin = Data.LastYearBegin;
        this.LastYearEnd = Data.LastYearEnd;

        this.callback();
    }
    TimeOBJ.prototype.Init = function (callback) {

        console.log("TimeOBJ.Init()***************************************************************************************");

        this.callback = callback;
        var q = "SELECT DAYOFWEEK(now()) as DAYOFWEEK,";
        q += "(SELECT DATE_FORMAT(Now() , '%Y-%m-%d')) as Today,";
        q += "(SELECT DATE_FORMAT(DATE_ADD(Now() ,INTERVAL 1 DAY ) , '%Y-%m-%d') ) as Tomorrow,";
        q += "(SELECT Today - INTERVAL DAYOFWEEK DAY ) AS WeekBegin,";
        q += "(SELECT WeekBegin + INTERVAL 7 DAY ) AS WeekEnd,";
        q += "(SELECT Today - INTERVAL 1 DAY ) AS YesterDay,";
        q += "(SELECT WeekBegin - INTERVAL 7 DAY ) AS LastWeekBegin,";
        q += "(SELECT WeekEnd - INTERVAL 7 DAY ) AS LastWeekEnd,";
        q += "(SELECT DATE_SUB(CURRENT_DATE, INTERVAL DAYOFMONTH(CURRENT_DATE)-1 DAY)) AS MonthBegin,";
        q += "(SELECT LAST_DAY(Now()) ) AS MonthEnd,";
        q += "(SELECT DATE_FORMAT(NOW() ,'%Y-01-01')) AS YearBegin,";
        q += "( SELECT DATE_ADD(YearBegin ,INTERVAL 12 MONTH ) ) AS YearEnd,";
        q += "(SELECT MonthBegin - INTERVAL 1 MONTH ) AS LastMonthBegin,";
        q += "(SELECT LAST_DAY(LastMonthBegin) )  AS LastMonthEnd,";
        q += "(SELECT YearBegin - INTERVAL 1 Year ) AS LastYearBegin,";
        q += "(SELECT LastYearBegin + INTERVAL 12 MONTH ) AS LastYearEnd";
        //var Pack = $$$.NewPack();
        //Pack.callback = this.OnData.bind(this);
        //Pack.PostData.append("q", q);
        //$$$.LoadScript("Server", Pack);
        $$$.MySql(q, this.OnData.bind(this));
        return;

    }
    $$$.Time = new TimeOBJ();
    $$$.GetTimeFrame = function () {
        console.log($$$.SelectedTime);
        var StartTime, EndTime = "";
        if ($$$.SelectedTime === "Today") { StartTime = $$$.Time.Today; EndTime = $$$.Time.Tomorrow; }
        if ($$$.SelectedTime === "Week") { StartTime = $$$.Time.WeekBegin; EndTime = $$$.Time.WeekEnd; }
        if ($$$.SelectedTime === "Month") { StartTime = $$$.Time.MonthBegin; EndTime = $$$.Time.MonthEnd; }
        if ($$$.SelectedTime === "All") { StartTime = "2000-01-01"; EndTime = $$$.Time.Tomorrow; }

        if ($$$.SelectedTime === "Yesterday") { StartTime = $$$.Time.YesterDay; EndTime = $$$.Time.Today; }

        if ($$$.SelectedTime === "LastWeek") { StartTime = $$$.Time.LastWeekBegin; EndTime = $$$.Time.LastWeekEnd; }
        if ($$$.SelectedTime === "LastMonth") { StartTime = $$$.Time.LastMonthBegin; EndTime = $$$.Time.LastMonthEnd; }
        if ($$$.SelectedTime === "LastYear") { StartTime = $$$.Time.LastYearBegin; EndTime = $$$.Time.LastYearEnd; }

        return { StartTime: StartTime, EndTime: EndTime };
    }


    function DoStuff() {
        
        var TheTime = $$$.GetTimeFrame();
        console.dir(TheTime);
    }

    
    
    function Run(obj) {

        console.log(ModName + ".Run");
        //$$$.SelectedTime = "Today";
        $$$.Time.Init(DoStuff.bind(this));
    }
    $$$[ModName] = Run;

})(window, document);
