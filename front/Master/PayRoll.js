(function (window, document) {
    var ModName = "PayRoll";
    var Root = null;
    function PayRoll() { };
    PayRoll.prototype.Root = null;
    PayRoll.prototype.Header = null;
    PayRoll.prototype.OutPutBucket = null;
    PayRoll.prototype.PayPeriodBegin = null;
    PayRoll.prototype.StartDate = null;
    PayRoll.prototype.picker = null;
    PayRoll.prototype.Format = "YYYY-MM-DD";
    PayRoll.prototype.TimeSheet = [];
    PayRoll.prototype.UserData = {};
    PayRoll.prototype.Menu = null;

    PayRoll.prototype.OnEdit = function (obj) {

        //console.log("Edit Time");
        console.dir(obj);
        $$$.ModPack.EditPayroll = obj;
        $$$.Run("EditPayRoll");
    }

    PayRoll.prototype.OnMap = function (obj) {
        /*
        var Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "Clear";
        $$$.Shout(Pack);
        Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "Show";
        $$$.Shout(Pack);
        */
        let TheUser = obj.UserRID;
        let y = this.TimeSheet.length;
        let yindex = 0;
        let TheDate = "";
        let Mpack = $$$.MapPack({});
        
        if ($$$.ScreenWidth() > 640) { Mpack.Scale = 640; }
        let b = $$$.BodyPop();
        Mpack.target = b.Content();


        //$$$.GoogleMap.go(Mpack);

        while (yindex != y) {
            if (TheUser === this.TimeSheet[yindex].UserRID) {
                //console.dir(this.TimeSheet[yindex]);
                let marker = $$$.MapMarker({});
                marker.GeoLat = this.TimeSheet[yindex].GeoLat;
                marker.GeoLong = this.TimeSheet[yindex].GeoLong;
                marker.GeoMarkup = "";
                marker.GeoMarkup = this.TimeSheet[yindex].ScreenName;
                marker.GeoMarkup += "<br>";
                marker.GeoMarkup += this.TimeSheet[yindex].JobName;
                marker.GeoMarkup += "<br>";
                marker.GeoMarkup += " In: ";
                TheDate = moment(this.TimeSheet[yindex].StartTime).format("dddd hh:mm a");
                marker.GeoMarkup += TheDate;
                Mpack.Markers.push(marker);
                /*
                var Pack = {};
                Pack.Target = obj.Target;
                Pack.Channel = "Map";
                Pack.Event = "AddMarker";
                Pack.GeoLat = this.TimeSheet[yindex].GeoLat;
                Pack.GeoLong = this.TimeSheet[yindex].GeoLong;
                Pack.GeoMarkup = this.TimeSheet[yindex].ScreenName;
                Pack.GeoMarkup += "<br>";
                Pack.GeoMarkup += this.TimeSheet[yindex].JobName;
                Pack.GeoMarkup += "<br>";
                Pack.GeoMarkup += " In: ";
                TheDate = moment(this.TimeSheet[yindex].StartTime).format("dddd hh:mm a");
                Pack.GeoMarkup += TheDate;
                $$$.Shout(Pack);
                Pack = {};
                Pack.Target = obj.Target;
                Pack.Channel = "Map";
                Pack.Event = "AddMarker";
                Pack.GeoLat = this.TimeSheet[yindex].GeoLatOUT;
                Pack.GeoLong = this.TimeSheet[yindex].GeoLongOUT;
                Pack.GeoMarkup = this.TimeSheet[yindex].ScreenName;
                Pack.GeoMarkup += "<br>";
                Pack.GeoMarkup += this.TimeSheet[yindex].JobName;
                Pack.GeoMarkup += "<br>";
                Pack.GeoMarkup += " Out: ";
                TheDate = moment(this.TimeSheet[yindex].EndTime).format("dddd hh:mm a");
                Pack.GeoMarkup += TheDate;
                Pack.GeoMarkup += "<br>";
                Pack.GeoMarkup += this.TimeSheet[yindex].Notes;
                $$$.Shout(Pack);
                */
            }
            yindex++;
        }
        $$$.GoogleMap.go(Mpack);
    };
    PayRoll.prototype.OnDayMap = function (obj) {
        var TimeSheet = obj.TimeSheet;
        let Mpack = $$$.MapPack({});
        let marker = $$$.MapMarker({});
        marker.GeoLat = TimeSheet.GeoLat;
        marker.GeoLong = TimeSheet.GeoLong;
        marker.GeoMarkup = "";
        marker.GeoMarkup = TimeSheet.ScreenName;
        marker.GeoMarkup += "<br>";
        marker.GeoMarkup += TimeSheet.JobName;
        marker.GeoMarkup += "<br>";
        marker.GeoMarkup += " In: ";
        let TheDate = moment(TimeSheet.StartTime).format("dddd MMM Do hh:mm a");
        marker.GeoMarkup += TheDate;
        Mpack.Markers.push(marker);
        if ($$$.ScreenWidth() > 640) { Mpack.Scale = 640; }
        let b=$$$.BodyPop();
        Mpack.target = b.Content();
        $$$.GoogleMap.go(Mpack);

        

        /*
        
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
        Pack.GeoLat = TimeSheet.GeoLat;
        Pack.GeoLong = TimeSheet.GeoLong;
        Pack.GeoMarkup = TimeSheet.ScreenName;
        Pack.GeoMarkup += "<br>";
        Pack.GeoMarkup += TimeSheet.JobName;
        Pack.GeoMarkup += "<br>";
        Pack.GeoMarkup += " In: ";
        TheDate = moment(TimeSheet.StartTime).format("dddd MMM Do hh:mm a");
        Pack.GeoMarkup += TheDate;
        $$$.Shout(Pack);
        Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "AddMarker";
        Pack.GeoLat = TimeSheet.GeoLatOUT;
        Pack.GeoLong = TimeSheet.GeoLongOUT;
        Pack.GeoMarkup = TimeSheet.ScreenName;
        Pack.GeoMarkup += "<br>";
        Pack.GeoMarkup += TimeSheet.JobName;
        Pack.GeoMarkup += "<br>";
        Pack.GeoMarkup += " Out: ";
        TheDate = moment(TimeSheet.EndTime).format("dddd MMM Do hh:mm a");
        Pack.GeoMarkup += TheDate;
        Pack.GeoMarkup += "<br>";
        Pack.GeoMarkup += TimeSheet.Notes;
        $$$.Shout(Pack);
        */
    };
    PayRoll.prototype.Process = function () {
        console.log("PayRoll.prototype.Process");
        var y = this.TimeSheet.length;
        var yindex = 0;
        var Root = this.OutPutBucket;
        var TheDayFormat = "ddd MM-DD";
        var LastName = "";
        var LastJob = "";
        var LastDay = "";
        var ThisName = "";
        var ThisJob = "";
        var ThisDay = "";
        var ThisDayName = "";
        var ThisStart = "";
        var ThisEnd = "";
        var ThisTotal = 0;
        var Min = 0;
        var Hours = 0;
        var UserBucket = null;
        var DayBucket = null;
        var JobBucket = null;
        var PData = this.PeriodBegin + " 12:00 a.m. through ";
        PData += this.PeriodEnd + " 12:00 a.m.";
        $$$.Text(this.Period, PData);
        var Skip = false;
        if (this.UserData.Type === 100) { Skip = true; }
        //if (this.UserData.Type < 1E3) {
         //   Skip = true;
        //}
        console.dir(this.TimeSheet[0]);
        while (yindex != y) {
            ThisName = this.TimeSheet[yindex].ScreenName;
            ThisJob = this.TimeSheet[yindex].JobName;
            ThisDay = moment(this.TimeSheet[yindex].EndTime).format(TheDayFormat);
            ThisDayName = moment(this.TimeSheet[yindex].EndTime).format("dddd MMM. Do");
            ThisStart = moment(this.TimeSheet[yindex].StartTime).format("ddd. hh:mm a");
            ThisEnd = moment(this.TimeSheet[yindex].EndTime).format("ddd. hh:mm a");
            var NewTotal = true;
            var NewUser = true;
            var NewDay = true;
            var NewJob = true;
            if (ThisName === LastName && ThisJob === LastJob && ThisDay === LastDay) {
                NewTotal = false;
            }
            if (ThisName === LastName) {
                NewUser = false;
            }
            if (ThisJob === LastJob) {
                NewJob = false;
            }
            if (ThisDay === LastDay) {
                NewDay = false;
            }
            if (NewTotal) {
                ThisTotal = 0;
            }
            ThisTotal = ThisTotal + Number(this.TimeSheet[yindex].Duration);
            if (NewUser) {
                UserBucket = $$$.Dom(Root, "div", "PayRollUserBucket");
                var Head = $$$.Dom(UserBucket, "div", "Pad Right");
                var Map = $$$.Dom(UserBucket, "div", "");
                var Name = $$$.Dom(UserBucket, "div", "PayRollUserName");
                $$$.Text(Name, ThisName);
                var Params = {};
                Params.UserRID = this.TimeSheet[yindex].UserRID;
                Params.Target = Map;
                //var Button = $$$.Button(Head, "Map", this.OnMap.bind(this, Params));
                $$$.MatIcon(Head, "location_on", "BlueFont").addEventListener("click", this.OnMap.bind(this, Params), false);
                //$$$.Button(Head, "Edit", this.OnEdit.bind(this, Params.UserRID));
                //$$$.Button(Head, "Edit", function () { $$$.ModPack.EditPayroll = Params.UserRID; $$$.Run("EditPayRoll"); }.bind(this));
                NewDay = true;
            }
            if (NewDay) {
                DayBucket = $$$.Dom(UserBucket, "div", "PayRollDayBucket");
                var Day = $$$.Dom(DayBucket, "div", "PayRollDay");
                $$$.Text(Day, ThisDayName);
                var Pack = {};
                Pack.TimeSheet = this.TimeSheet[yindex];
                //TimeBucket.onclick = this.OnDayMap.bind(this, Pack);
                $$$.MatIcon(Day, "location_on", "BlueFont").addEventListener("click", this.OnDayMap.bind(this, Pack), false);
                $$$.MatIcon(Day, "edit", "RedFont").addEventListener("click", this.OnEdit.bind(this, this.TimeSheet[yindex]), false);
                
                NewJob = true;
            }
            if (NewJob) {
                JobBucket = $$$.Dom(DayBucket, "div", "PayRollJobBucket");
                var Job = $$$.Dom(JobBucket, "div", "PayRollJob");
                $$$.Text(Job, ThisJob);
            }
            var TimeBucket = $$$.Dom(JobBucket, "div", "PayRollTimeBucket");
            //let Row = $$$.Dom(TimeBucket, "div", "Left");
            //$$$.MatIcon(Row, "location_on", "BlueFont");
            //$$$.MatIcon(Row, "edit", "RedFont");
            //<i class="material-icons">location_on</i>
            
            var DataBucket = $$$.Dom(TimeBucket, "div", "PayRollDataBucket");

            var Data = "";
            Data += "In: ";
            Data += ThisStart;
            $$$.Text(DataBucket, Data);
            DataBucket = $$$.Dom(TimeBucket, "div", "PayRollDataBucket");
            Data = "Out: ";
            Data += ThisEnd;
            $$$.Text(DataBucket, Data);
            Min = Number(this.TimeSheet[yindex].Duration) / 60;
            Hours = Min / 60;
            var RInt = $$$.decimalAdjust("round", Hours * 4, 0);
            var DInt = $$$.decimalAdjust("round", RInt / 4, -2);
            DataBucket = $$$.Dom(TimeBucket, "div", "PayRollDataBucket");
            Data = "Hours: ";
            Data += DInt;
            $$$.Text(DataBucket, Data);
            Min = ThisTotal / 60;
            Hours = Min / 60;
            RInt = $$$.decimalAdjust("round", Hours * 4, 0);
            DInt = $$$.decimalAdjust("round", RInt / 4, -2);
            DataBucket = $$$.Dom(TimeBucket, "div", "PayRollDataBucket");
            Data = "Job-Day-Sum: ";
            Data += DInt;
            $$$.Text(DataBucket, Data);

            //$$$.MatIcon(DataBucket, "edit", "RedFont").addEventListener("click", this.OnEdit.bind(this, this.TimeSheet[yindex]), false);


            DataBucket = $$$.Dom(TimeBucket, "div", "PayRollNotes");
            $$$.Text(DataBucket, this.TimeSheet[yindex].Notes);
            LastName = ThisName;
            LastDay = ThisDay;
            LastJob = ThisJob;
            if (Skip) {
                if (Number(this.UserData.RID) === Number(this.TimeSheet[yindex].UserRID)) {
                } else {
                    $$$.None(UserBucket);
                }
            }


            yindex++;
        }
    };
    PayRoll.prototype.OnData = function (obj) {
        this.TimeSheet.length = 0;
        if ("json" in obj) {
            this.PeriodBegin = obj.json.StartDate;
            this.PeriodEnd = obj.json.EndDate;
            if ("TimeSheet" in obj.json) {
                this.TimeSheet = obj.json.TimeSheet;
            }
        }
        this.Process();
    };
    PayRoll.prototype.OnDate = function () {
        console.log("OnDate Called");
        $$$.Flush(this.OutPutBucket);
        var Date = moment(this.picker.getDate()).format(this.Format);
        var Pack = $$$.NewPack();
        Pack.callback = this.OnData.bind(this);
        Pack.url = "PayRoll.htm";
        Pack.PostData.append("StartDate", Date);
        $$$.Server(Pack);
    };
    PayRoll.prototype.OnBack = function () {
    };
    PayRoll.prototype.NewDateButton = null;
    PayRoll.prototype.Seed = { Day: 0, Month: 0, Year: 0 };

    $$$.PayRollSeed = {
        Day: 0, Year: 0, Month: 0
    }

    PayRoll.prototype.OnNewDateCallBack = function (obj) {
        this.Reset();
        this.Seed.Day = obj.Day;
        this.Seed.Month = obj.Month;
        this.Seed.Year = obj.Year;
        $$$.PayRollSeed.Day = this.Seed.Day;
        $$$.PayRollSeed.Year = this.Seed.Year;
        $$$.PayRollSeed.Month = this.Seed.Month;

        D = this.Seed.Year + "-" + this.Seed.Month + "-" + this.Seed.Day;
        var Pack = $$$.NewPack();
        Pack.callback = this.OnData.bind(this);
        Pack.url = "PayRoll.htm";
        Pack.PostData.append("StartDate", D);
        $$$.Server(Pack);
        this.NewDateButton = $$$.Dom(this.Header, "div", "Smooth Pad Flow Mar Border Bold Clicky", "Change Date");
        this.NewDateButton.onclick = this.OnNewDate.bind(this);
    };
    $$$.PayRollSeed = {
        Day: 0, Year: 0, Month: 0
    }

    PayRoll.prototype.OnNewDate = function () {
        console.dir(this.Seed);
        $$$.PayRollSeed.Year = 0;//reset trigger
        $$$.LoadScript("XCal", { callback: this.OnNewDateCallBack.bind(this), Seed: this.Seed });
    };
    PayRoll.prototype.Reset = function () {
        $$$.Flush(this.Root);
        this.Header = $$$.Dom(this.Root, "div", "Pad Mar");
        this.Period = $$$.Dom(this.Root, "div", "Pad Mar Bold");
        this.OutPutBucket = $$$.Dom(this.Root, "div", "PayRollWrapper");
    };
    PayRoll.prototype.Init = function (obj) {
        this.UserData = $$$.UserData;
        this.Root = obj.Target;
        this.Reset();
        var D = new Date;
        if ($$$.PayRollSeed.Year > 0) {
            this.Seed.Day = $$$.PayRollSeed.Day;
            this.Seed.Year = $$$.PayRollSeed.Year;
            this.Seed.Month = $$$.PayRollSeed.Month;
        }
        else {

            this.Seed.Day = D.getDate();
            this.Seed.Year = D.getFullYear();
            this.Seed.Month = D.getMonth() + 1;
        }

        D = this.Seed.Year + "-" + this.Seed.Month + "-" + this.Seed.Day;
        var Pack = $$$.NewPack();
        Pack.callback = this.OnData.bind(this);
        Pack.url = "PayRoll.htm";
        Pack.PostData.append("StartDate", D);
        $$$.Server(Pack);
        this.NewDateButton = $$$.Dom(this.Header, "div", "Smooth Pad Flow Mar Border Bold Clicky OrangeFont", "Change Date");
        this.NewDateButton.onclick = this.OnNewDate.bind(this);
    };
    function OnStart(obj) {
        Root = $$$.Content;
        $$$.Flush(Root);
        obj.Target = Root;
        var Temp = new PayRoll;
        Temp.Init(obj);
    }
    function OnCom(obj) {
        switch (obj.Channel) {
            case "Omni":
                switch (obj.Event) {
                    case "Hide":
                        break;
                }
                break;
            case ModName:
                switch (obj.Event) {
                    case "Start":
                        console.log(ModName + " Start");
                        OnStart(obj);
                        break;
                }
                break;
        }
    }
    function OnDepend() {
        $$$.Listen({ Channel: ModName, callback: OnCom });
    }
    $$$.Shout({ Channel: "Moment", Event: "Load", callback: OnDepend });
})(window, document);