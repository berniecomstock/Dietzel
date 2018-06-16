/*
Edit time
if startdate
*/


(function () {
    "use strict";
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    function DateOBJ(input) {
        this.D = new Date(input);
    }
    DateOBJ.prototype.ToMySql = function () {
        let Return = "";
        Return += this.D.getFullYear() + "-" + (this.D.getMonth() + 1) + "-" + this.D.getDate() + " ";
        Return += this.D.getHours() + ":";
        Return += this.D.getMinutes() + ":";
        Return += this.D.getSeconds();
        return Return;
    }
    DateOBJ.prototype.ToYearMonthDay = function () {
        let Return = "";
        Return += this.D.getFullYear() + "-" + (this.D.getMonth() + 1) + "-" + this.D.getDate();
        return Return;
    }
    DateOBJ.prototype.ToHourMin = function () {
        return this.D.getHours() + ":" + this.D.getMinutes();
    }
    DateOBJ.prototype.PlusDay = function () {
        let Return = new DateOBJ(this.D);
        Return.D.setDate(Return.D.getDate() + 1);
        return Return;
    }
    DateOBJ.prototype.GetOffset = function () {

        let Morning = new Date(this.D);
        Morning.setHours(0);
        Morning.setMinutes(0);
        Morning.setSeconds(0);
        Morning.setMilliseconds(0);
        let Return = (this.D.getTime() - Morning.getTime()) / 1000;
        return Return;
    }
    DateOBJ.prototype.SetOffset = function (secondsPastMidnight) {


        this.D.setHours(0);
        this.D.setMinutes(0);
        this.D.setSeconds(0);
        this.D.setMilliseconds(0);
        let yindex = 0;
        while (yindex != secondsPastMidnight) {
            this.D.setSeconds(this.D.getSeconds() + 1);
            yindex++;
        }

    }
    DateOBJ.prototype.DiffInSeconds = function (input) {

        let Start = this.D.getTime();
        let End = input.getTime();
        let Diff = 0;
        if (Start === End) { return 0; }
        if (End > Start) {
            Diff = (End - Start);
        }
        if (Start > End) {
            Diff = (Start - End);
        }
        return Diff / 1000;
    }
    $$$.NewDate = function (input) {
        return new DateOBJ(input);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////

})();
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
(function () {
    "use strict";
    //10pm-5am is RedFlag Time

    let TheRecord = $$$.ModPack.EditPayroll;
    let Body = $$$.BodyPop();
    let Root = Body.Content();
    let TheDay = $$$.NewDate(TheRecord.StartTime);
    let EventArray = [];
    $$$.Dom(Root, "div", "Bold", TheDay.D.toDateString());
    let ScreenNameDisplay = $$$.Dom(Root, "div", "Bold BlueFont", "Anonymous");
    let Header = $$$.Dom(Root, "div", "Bold RedFont", "");
    let DomResults = $$$.Dom(Root, "div");
    let Footer = $$$.Dom(Root, "div", "Right", "");



    function EventOBJ(input) {

        //console.dir(input);
        Object.assign(this, input);
        this.Index = input.Index;
        this.DomRoot = $$$.Dom(DomResults, "div", "Mar Pad Border Smooth", "");
        $$$.Dom(this.DomRoot, "div", "Bold OrangeFont", input.JobName);
        this.StartDisplay = $$$.Dom(this.DomRoot, "div", "Bold GreenFont", "");


        this.StartTime = $$$.NewDate(input.StartTime);
        this.EndTime = $$$.NewDate(input.EndTime);

        this.StartSlider = $$$.Dom(this.DomRoot, "input");
        this.StartSlider.type = "range";
        this.StartSlider.min = 0;
        this.StartSlider.max = 86399;
        this.StartSlider.value = this.StartTime.GetOffset();
        this.StartSlider.style.display = "block";
        this.StartSlider.style.width = "100%";

        this.Duration = $$$.Dom(this.DomRoot, "div", "Bold WhiteFont Center", "Total");

        this.EndDisplay = $$$.Dom(this.DomRoot, "div", "Bold RedFont Right", "");
        this.EndSlider = $$$.Dom(this.DomRoot, "input");
        this.EndSlider.type = "range";
        this.EndSlider.min = 0;
        this.EndSlider.max = 86399;
        this.EndSlider.value = this.EndTime.GetOffset();
        this.EndSlider.style.display = "block";
        this.EndSlider.style.width = "100%";


        this.StartSlider.addEventListener("input", this.OnStart.bind(this), false);
        this.EndSlider.addEventListener("input", this.OnEnd.bind(this), false);
        this.Paint();

    }
    EventOBJ.prototype.SumDiff = function () {
        let Start = this.StartTime.D.getTime();
        let End = this.EndTime.D.getTime();
        let Diff = (End - Start);
        let Sec = Diff / 1000;
        let Min = Sec / 60;
        let Hours = Min / 60;
        let RInt = $$$.decimalAdjust("round", Hours * 4, 0);
        let DInt = $$$.decimalAdjust("round", RInt / 4, -2);
        this.Duration.textContent = DInt + " : Hour(s)";
    }
    EventOBJ.prototype.DaySum = function () {
        let Sum = 0;
        let y = EventArray.length;
        let yindex = 0;
        while (yindex != y) {
            let Start = EventArray[yindex].StartTime.D.getTime();
            let End = EventArray[yindex].EndTime.D.getTime();
            let Diff = (End - Start);
            let Sec = Diff / 1000;
            Sum = Sum + Sec;
            yindex++;
        }

        let Min = Sum / 60;
        let Hours = Min / 60;
        let RInt = $$$.decimalAdjust("round", Hours * 4, 0);
        let DInt = $$$.decimalAdjust("round", RInt / 4, -2);
        Header.textContent = DInt + " : Total Hour(s)";

    }
    EventOBJ.prototype.Paint = function () {
        this.StartTime.SetOffset(this.StartSlider.value);
        this.EndTime.SetOffset(this.EndSlider.value);

        this.StartDisplay.textContent = this.StartTime.D.toLocaleTimeString();
        this.EndDisplay.textContent = this.EndTime.D.toLocaleTimeString();
        this.SumDiff();
        this.DaySum();
    }
    EventOBJ.prototype.OnStart = function () {
        let Max = this.EndTime.GetOffset();
        let Min = 0;
        let Val = this.StartSlider.value;
        if (this.Index === 0) {///Is First
            Min = 0;
        }
        else {//Not First

            let AboveMe = EventArray[this.Index - 1];
            Min = AboveMe.EndTime.GetOffset();
        }
        if (Val > Max) {
            this.StartSlider.value = Max;
        }
        if (Val < Min) {
            this.StartSlider.value = Min;
        }
        this.Paint();

    }
    EventOBJ.prototype.OnEnd = function () {
        let Max = 86399;//depends on next event StartTime
        let Min = this.StartTime.GetOffset();//always
        let Val = this.EndSlider.value;
        console.log(this.Index + " Of " + EventArray.length)
        ///////////////////////////////////////////////////
        if (EventArray.length > 1) {//has more than one event
            if (this.Index < EventArray.length - 1) {//has next event-not the last
                let BelowMe = EventArray[this.Index + 1];
                Max = BelowMe.StartTime.GetOffset();
            }
        }
        ///////////////////////////////////////////////////
        if (Val > Max) {
            this.EndSlider.value = Max;
        }
        if (Val < Min) {
            this.EndSlider.value = Min;
        }
        this.Paint();
    }

    let SyncCount = 0;
    function OnSyncLoop(dat) {

        let Now = new Date();
        let NewNotes = dat.Notes;
        NewNotes += "***Record edited by:" + $$$.UserData.ScreenName + " On:" + Now.toLocaleString() + " ****";


        function OnPrep(prepdata) {

            let q = "update timesheet set starttime='" + dat.StartTime.ToMySql() + "', endtime='" + dat.EndTime.ToMySql() + "', ";
            q += "Duration='" + dat.StartTime.DiffInSeconds(dat.EndTime.D) + "', ";
            q += "Notes='" + prepdata + "' ";//really should prep this
            q += " where RID=" + dat.RID;

            $$$.Query(q, function () { SyncCount++; });
        }

        $$$.Prep(NewNotes, OnPrep.bind(this));




    }
    function WaitSync() {
        if (SyncCount < EventArray.length) { return requestAnimationFrame(WaitSync); }
        Exit();
    }
    function OnSync() {
        SyncCount = 0;
        $$$.Loop(EventArray, OnSyncLoop);
        WaitSync();

    }

    function Exit() {
        Body.Exit();
        var Pack = {};
        Pack.Channel = "PayRoll";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    }

    function OnLoop(dat) {
        ScreenNameDisplay.textContent = dat.ScreenName;
        dat.Index = EventArray.length;
        EventArray.push(new EventOBJ(dat));
    }
    function OnData(A) {
        EventArray.length = 0;

        $$$.Loop(A, OnLoop);
        console.dir(EventArray);
    }
    function Refresh() {
        let Tomorrow = TheDay.PlusDay();
        let q = "select * ";
        q += ",(select Title from projects where rid=ProjectRID) as JobName ";
        q += ",(select ScreenName from users where rid=UserRID) as ScreenName ";
        q += " from timesheet where userrid=" + TheRecord.UserRID;
        q += " and StartTime BETWEEN '" + TheDay.ToYearMonthDay() + " 00:00:00' and '";
        q += Tomorrow.ToYearMonthDay() + " 00:00:00'";
        q += " order by starttime ASC";
        $$$.Query(q, OnData);
    }

    Refresh();
    $$$.Button(Footer, "Sync", OnSync);
    //console.dir(TheRecord);
})();
