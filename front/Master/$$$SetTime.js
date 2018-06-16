(function (window, document) {
    "use strict";
    const ModName = "$$$SetTime";
    const HoursPerDay = 24;
    const MinPerHour = 60;

    function MinOBJ(input) {
        this.Callback = input.Callback;
        this.Root = $$$.Dom(input.Target, "div", "", input.val + ".");
        var w = 320 / 6;
        this.Root.style.display = "inline-block";
        this.Root.style.width = w + "px";
        this.Root.style.borderStyle = "solid";
        this.Root.style.borderWidth = "1px";
        this.Root.style.borderColor = "black";
        this.Root.style.padding = "5px";
        this.Root.style.margin = "0px";
        this.Root.style.whiteSpace = "nowrap";
        this.Root.style.fontSize = "small";
        this.Root.style.boxSizing = "border-box";
        this.Root.style.fontWeight = "bold";
        this.Root.style.cursor = "pointer";

        this.Value = input.val;
        let Display = this.Value;
        
        $$$.Text(this.Root, Display);
        this.Root.addEventListener("click", this.OnClick.bind(this), false);
        this.UnSelect();
    }
    MinOBJ.prototype.OnClick = function () {
        this.Callback(this.Value);

    }
    MinOBJ.prototype.Select = function () {
        this.Root.style.backgroundColor = "rgb(255,0,0)";
        this.Root.style.color = "rgb(255,255,255)";
    }
    MinOBJ.prototype.UnSelect = function () {

        this.Root.style.backgroundColor = "rgb(0,255,0)";
        this.Root.style.color = "rgb(50,50,50)";

    }
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////



    function HourOBJ(input) {
        this.Callback = input.Callback;
        this.Root = $$$.Dom(input.Target, "div", "", input.val + ".");
        var w = 320 / 6;
        this.Root.style.display = "inline-block";
        this.Root.style.width = w + "px";
        this.Root.style.borderStyle = "solid";
        this.Root.style.borderWidth = "1px";
        this.Root.style.borderColor = "black";
        this.Root.style.padding = "5px";
        this.Root.style.margin = "0px";
        this.Root.style.whiteSpace = "nowrap";
        this.Root.style.fontSize = "small";
        this.Root.style.boxSizing = "border-box";
        this.Root.style.fontWeight = "bold";
        this.Root.style.cursor = "pointer";
        
        this.Value = input.val;
        let Display = "";
        if (this.Value < 10) { Display = "0"; }
        
        if (this.Value === 0) { Display = "12 AM"; }
        if (this.Value === 1) { Display = "1 AM"; }
        if (this.Value === 2) { Display = "2 AM"; }
        if (this.Value === 3) { Display = "3 AM"; }
        if (this.Value === 4) { Display = "4 AM"; }
        if (this.Value === 5) { Display = "5 AM"; }
        if (this.Value === 6) { Display = "6 AM"; }
        if (this.Value === 7) { Display = "7 AM"; }
        if (this.Value === 8) { Display = "8 AM"; }
        if (this.Value === 9) { Display = "9 AM"; }
        if (this.Value === 10) { Display = "10 AM"; }
        if (this.Value === 11) { Display = "11 AM"; }

        if (this.Value === 12) { Display = "Noon"; }
        if (this.Value === 13) { Display = "1 PM"; }
        if (this.Value === 14) { Display = "2 PM"; }
        if (this.Value === 15) { Display = "3 PM"; }
        if (this.Value === 16) { Display = "4 PM"; }
        if (this.Value === 17) { Display = "5 PM"; }
        if (this.Value === 18) { Display = "6 PM"; }
        if (this.Value === 19) { Display = "7 PM"; }
        if (this.Value === 20) { Display = "8 PM"; }
        if (this.Value === 21) { Display = "9 PM"; }
        if (this.Value === 22) { Display = "10 PM"; }
        if (this.Value === 23) { Display = "11 PM"; }
        $$$.Text(this.Root, Display);
        this.Root.addEventListener("click", this.OnClick.bind(this), false);
        this.UnSelect();
    }
    HourOBJ.prototype.OnClick = function () {
        this.Callback(this.Value);
        
    }
    HourOBJ.prototype.Select = function () {
        this.Root.style.backgroundColor = "rgb(255,0,0)";
        this.Root.style.color = "rgb(255,255,255)";
    }
    HourOBJ.prototype.UnSelect = function () {

        this.Root.style.backgroundColor = "rgb(0,255,0)";
        this.Root.style.color = "rgb(50,50,50)";

    }
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////


    function TimeOBJ(input) {
        this.Pending = 0;
        this.Dom();
        this.Name = input.Name;
        this.Table = input.Table;
        this.Pointer = input.Pointer;
        this.Callback = input.Callback;
        this.Year = 0;
        this.Month = 0;
        this.Day = 0;
        this.Hour = 0;
        this.Min = 0;
        this.HOURS = [];
        this.MIN = [];
        this.RefreshData();
        let yindex = 0;
        while (yindex != HoursPerDay) {
            let data = {};
            data.val = yindex;
            data.Target = this.HourBox;
            data.Callback = this.OnHourChange.bind(this);
            this.HOURS.push(new HourOBJ(data));
            
            yindex++;
        }
        yindex = 0;
        let Count = 0;
        let Row = null;// $$$.Dom(this.MinBox, "div", "", "");
        while (yindex != MinPerHour) {
            if (Count === 0) {
                Row = $$$.Dom(this.MinBox, "div", "", "");
            }
            Count++;
            if (Count === 6) { Count = 0;}
            let data = {};
            data.val = yindex;
            data.Target = this.MinBox;
            data.Callback = this.OnMinChange.bind(this);
            this.MIN.push(new MinOBJ(data));
            yindex++;
        }
        

    }
    TimeOBJ.prototype.OnChange = function () {

        if (this.Pending > 0) { console.log("Pending=" + this.Pending); return; }
        this.Pending++;

        let D = this.Year + "-" + this.Month + "-" + this.Day + " " + this.Hour + ":" + this.Min + ":00";
        let Post = new FormData();
        let q = "update " + this.Table + " set " + this.Name + " = '" + D + "' where RID=" + this.Pointer["RID"];
        Post.append("q", q);
        $$$.Post("MySql.htm", Post, this.RefreshData.bind(this));

        
    }

    TimeOBJ.prototype.OnMinChange = function (val) {
        console.log("Min Change=" + val);
        let yindex = 0;
        while (yindex != MinPerHour) {
            this.MIN[yindex].UnSelect();
            yindex++;
        }
        this.Min = val;
        this.MIN[val].Select();
        this.OnChange();
    }
    TimeOBJ.prototype.OnHourChange = function (val) {
        console.log("Hour Change=" + val);
        let yindex = 0;
        while (yindex != HoursPerDay) {
            this.HOURS[yindex].UnSelect();
            yindex++;
        }
        this.Hour = val;
        this.HOURS[val].Select();
        this.OnChange();
    }
    TimeOBJ.prototype.OnDone = function () {
        
        $$$.UnPop();
        this.Callback(this.Pointer);
    }
    

    TimeOBJ.prototype.Dom = function () {
        this.Root = $$$.Pop(true);
        this.Root.style.marginLeft = "auto";
        this.Root.style.marginRight = "auto";
        this.Root.style.width = "320px";
        this.Root.style.boxSizing = "border-box";
        
        this.Display = $$$.Dom(this.Root, "div", "Bold Big OrangeFont", "");

        $$$.Dom(this.Root, "div", "Bold Big", "Select Hours");
        this.HourBox = $$$.Dom(this.Root, "div", "", "");
        this.HourBox.style.marginTop = "5px";
        
        $$$.Dom(this.Root, "div", "Bold Big", "Select Minutes");

        this.MinBox = $$$.Dom(this.Root, "div", "", "");
        this.MinBox.style.marginTop = "5px";
        let Row = $$$.Dom(this.Root, "div", "", "");
        this.DoneButton = $$$.Button(Row, "Done", this.OnDone.bind(this));

    }
    
    TimeOBJ.prototype.FormatData = function () {
        var D = new Date(this.Pointer[this.Name]);
        if (isNaN(D.getFullYear())) {
            D = new Date();
            console.log("Is Bad Date");
        }
        this.Year = D.getFullYear();
        this.Month = D.getMonth() + 1;
        this.Day = D.getDate();
        this.Hour = D.getHours();
        this.Min = D.getMinutes();
        this.HOURS[this.Hour].Select();
        this.MIN[this.Min].Select();
    }
    TimeOBJ.prototype.OnData = function (data) {
        this.Pending--;
        let Temp = {};
        let flag = false;
        try { Temp = JSON.parse(data);}
        catch (e) { }
        if ("Results" in Temp) {
            if (Temp.Results.length > 0) {
                if (this.Name in Temp.Results[0]) {
                    this.Pointer[this.Name] = Temp.Results[0][this.Name];
                    $$$.Text(this.Display, Temp.Results[0]["PrettyTime"]);
                    this.FormatData();
                    flag = true;
                }
            }
        }
        if (!flag) {
            console.log("OnData Failed");
            this.FormatData();
        }
    }
    TimeOBJ.prototype.BuildQ = function () {
        let q1 = "select " + this.Name + " , (SELECT DATE_FORMAT(" + this.Name +  ", '%a %b %D %h:%i %p')) as PrettyTime";
        q1 += " from " + this.Table + " where RID=" + this.Pointer["RID"]
        return q1;
    }
    TimeOBJ.prototype.RefreshData = function () {

        
        let Post = new FormData();
        Post.append("q", this.BuildQ());
        $$$.Post("MySql.htm", Post, this.OnData.bind(this));
    }

    $$$[ModName] = function (input) {
        var Temp = new TimeOBJ(input);
    }

})(window, document);
