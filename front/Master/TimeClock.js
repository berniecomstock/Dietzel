
(function (window, document) {
    var ModName = "TimeClock";
    //////////////////////////////////////////
    //////////////////////////////////////////
    //////////////////////////////////////////
    // Yes or no Perdiem Default, then Lodgng option
    //perdieum amount 20.00
    //..lodging amount

    function PerdiemOBJ(input) {
        this.UserRID = 0;
        this.ProjectRID = 0;
        this.GeoLat = "";
        this.GeoLong = "";
        this.Date = 0;
    }
    PerdiemOBJ.prototype.Assign = function (input) {

        Object.assign(this, input);
    }
    PerdiemOBJ.prototype.Form = function (target) {
    };
    $$$.PerdiemOBJ = PerdiemOBJ;
    //////////////////////////////////////////
    //////////////////////////////////////////
    //////////////////////////////////////////


    function TimeClockOBJ() { }
    TimeClockOBJ.prototype.CallingOBJ = {};
    /*
    TimeClockOBJ.prototype.WaitScreen = null;
    TimeClockOBJ.prototype.WaitMessage = null;
    TimeClockOBJ.prototype.CreateWaitScreen = function () {
        this.WaitScreen = $$$.Dom(document.body, "div", "Container PopTop");
        var Row = $$$.Dom(this.WaitScreen, "div", null);
        var Img = $$$.Dom(Row, "img", "Image");
        Img.src = $$$.ImgPath + "gps.gif";
        this.WaitMessage = $$$.Dom(this.WaitScreen, "div", null);
        $$$.None(this.WaitScreen);
        $$$.Text(this.WaitMessage, "Please Wait...");
    }
    */

    TimeClockOBJ.prototype.OnClockInCallback = function () {
        //$$$.None(this.WaitScreen);
        //$$$.Block($$$.Container);
        window.location.reload(true);
    }
    TimeClockOBJ.prototype.OnClockInGeo = function (obj) {


        if (obj.GeoOff === true) {
            //alert("Access Denied.\r\nYou must enable geolocation to Clock In to a Job site.");
            //this.OnClockInCallback();
            window.location.reload(true);
            return;
        }


        //$$$.Text(this.WaitMessage, "Location Found! Sending Position To The Server...If this Screen Does Not go away Refresh And try again.");
        var Pack = $$$.NewPack();
        Pack.PostData.append("GeoLat", obj.latitude);
        Pack.PostData.append("GeoLong", obj.longitude);
        Pack.PostData.append("UserRID", this.CallingOBJ.UserData.RID);
        Pack.PostData.append("ProjectRID", this.CallingOBJ.Project.RID);
        Pack.url = "ClockIn.htm";
        Pack.callback = this.OnClockInCallback.bind(this);
        $$$.Server(Pack);

    }
    TimeClockOBJ.prototype.OnClockIn = function () {
        
        var TheJob = this.CallingOBJ.Project.Title;
        
        if (TheJob === "Office") {

            if ($$$.ClientInfo.ClientIP === "174.77.77.138") { }
            else {
                alert("Clocking in to the Office requires you to be within the Office wireless range.\r\n Connect to the wireless and try again.");
                return;
            }
        }
        
        var Pack = {};
        Pack.callback = this.OnClockInGeo.bind(this);

        $$$.LoadScript("XGeo", Pack);

        

        
    }
    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    TimeClockOBJ.prototype.ClockOutTextArea = null;
    TimeClockOBJ.prototype.OnClockOutCallback = function (obj) {
        //$$$.None(this.WaitScreen);
        //$$$.Block($$$.Container);
        window.location.reload(true);
    }
    TimeClockOBJ.prototype.OnClockOutGeo = function (obj) {

        var TheNotes = this.ClockOutTextArea.value;
        TheNotes += " Ip:" + $$$.ClientInfo.ClientIP;
        var Pack = $$$.NewPack();
        Pack.url = "ClockOut.htm";
        Pack.callback = this.OnClockOutCallback.bind(this);
        Pack.PostData.append("GeoLat", obj.latitude);
        Pack.PostData.append("GeoLong", obj.longitude);
        Pack.PostData.append("ProjectRID", this.CallingOBJ.Project.RID);
        Pack.PostData.append("UserRID", this.CallingOBJ.UserData.RID);
        Pack.PostData.append("Notes", TheNotes);
        $$$.Server(Pack);

    }


    TimeClockOBJ.prototype.OnClockOutButton = function () {

        if (this.ClockOutTextArea.value.length < 5) {
            alert("Error: Please provide a valid description of what you did during this time period.");
            return;
        }
        var Pack = {};
        Pack.callback = this.OnClockOutGeo.bind(this);
        $$$.LoadScript("XGeo", Pack);

        
    }
    TimeClockOBJ.prototype.OnClockOutCancel = function () {
        
        $$$.UnPop();
    }
    TimeClockOBJ.prototype.ClockOutRoot = null;
    TimeClockOBJ.prototype.ClockOutWrapper = null;
    
    TimeClockOBJ.prototype.OnPreClockOut = function () {
        

        var Con = $$$.Dom($$$.Pop(), "div", "Container");
        //var Con = $$$.Dom(this.ClockOutWrapper, "div", "Container");
        var Box = $$$.Dom(Con, "div", "Border Smooth Mar Pad");
        var Row = $$$.Dom(Box, "div", "OrangeFont Bold Big", this.CallingOBJ.Project.Title);
        Row = $$$.Dom(Box, "div", "BlueFont Bold Big", $$$.UserData.ScreenName);
        var ETime = $$$.Dom(Box, "div", "RedFont Bold Big", "Hours");
        this.ClockOutTextArea = $$$.Input(Box, "textarea", null, "What did you do?", null, null, "Full");

        Row = $$$.Dom(Box, "div", "", "Perdiem for " + this.CallingOBJ.Project.Title + ": $" + this.CallingOBJ.Project.Perdiem);
        Row = $$$.Dom(Box, "div", "", "Lodging for " + this.CallingOBJ.Project.Title + ": $" + this.CallingOBJ.Project.Lodging);

        Row = $$$.Dom(Box, "div", "Right");
        var Button = $$$.Button(Row, "Claim Perdiem", null);
        var Button = $$$.Button(Row, "Finish", null);
        /*
        Row = $$$.Dom(Box, "div", "Right");
        var Button = $$$.Button(Row, "Cancel", null);
        Button.className += " GreenFont";

        Button.onclick = this.OnClockOutCancel.bind(this);
        Button = $$$.Button(Row, "Finish", null);
        Button.className += " RedFont";
        Button.onclick = this.OnClockOutButton.bind(this);
        */

        /*
        Row = $$$.Dom(Box, "div", "Center Bold Big Blink RedFont", "Perdiem");

        let radio, label, wrapper, home, camper, motel = null;
        Row = $$$.Dom(Box, "div", "Center", "");

        wrapper = $$$.Dom(Row, "div", "Flow", "");
        label = $$$.Dom(wrapper, "label");
        label.htmlfor = "perdiemhome";
        $$$.Text(label, "Home");
        radio = $$$.Dom(wrapper, "input");
        radio.type = "radio";
        radio.name = "Perdiem";
        radio.id = "perdiemhome";
        radio.value = 0;
        radio.checked = true;

        wrapper = $$$.Dom(Row, "div", "Flow Mar Pad", "");
        label = $$$.Dom(wrapper, "label");
        label.htmlfor = "perdiemhome";
        $$$.Text(label, "Hotel");
        radio = $$$.Dom(wrapper, "input");
        radio.type = "radio";
        radio.name = "Perdiem";
        radio.id = "perdiemhome";
        radio.value = 1;


        wrapper = $$$.Dom(Row, "div", "Flow Mar Pad", "");
        label = $$$.Dom(wrapper, "label");
        label.htmlfor = "perdiemhome";
        $$$.Text(label, "Camper");
        radio = $$$.Dom(wrapper, "input");
        radio.type = "radio";
        radio.name = "Perdiem";
        radio.id = "perdiemhome";
        radio.value = 2;
        
       
       */
        


        function OnData(obj) {
            console.dir(obj);
            $$$.Text(ETime, "Hours: "+$$$.SecToHours($$$.MakeNumber(obj.json.Results[0].SecToNow)));
        }
        var q = "SELECT ABS(UNIX_TIMESTAMP(StartTime) - UNIX_TIMESTAMP(Now())) as SecToNow ";
        q += " from timesheet where rid=" + $$$.UserData.TimeSheetRID;
        $$$.MySql(q, OnData.bind(this));

        Box = $$$.Dom(Con, "div", "Mar Pad");
        var Header = $$$.Dom(Box, "div", "Bold Left Big", "Out Of Service Area:");

        var P = $$$.Dom(Box, "div", "Bold Mar Pad", "If you are out in the sticks and can not get a working signal.");
        P = $$$.Dom(Box, "div", "Bold Mar Pad", "Make a paper or digital note that you can retrieve later when you do have a signal.");
        P = $$$.Dom(Box, "div", "Bold Pad", "Make Note Of:");
        P = $$$.Dom(Box, "div", "Bold Pad", "The Time.");
        P = $$$.Dom(Box, "div", "Bold Pad", "Your Location.");
        P = $$$.Dom(Box, "div", "Bold Pad", "The Project Name.");
        P = $$$.Dom(Box, "div", "Bold Pad", "The Unit Number You Are Driving.");
        P = $$$.Dom(Box, "div", "Bold Pad", "The Unit Milage");
        P = $$$.Dom(Box, "div", "Bold Pad", "The tasks you performed.");

        P = $$$.Dom(Box, "div", "Bold Mar Pad Dent", " Once signal is restored clock in or out as needed, including the above noted information. It is ok to Clock In and Out of a Project for the sole purpose of adding notes to clarify reality.");

        
        $$$.CallOffice($$$.Dom(Box, "div", ""));

    }

    TimeClockOBJ.prototype.Init = function (obj) {
        console.log("TimeClockOBJ.prototype.Init");

        this.CallingOBJ = obj;
        var Button = null;
        var Row = $$$.Dom(obj.Target, "div", "Right");
        var CurrentProject = Number(obj.UserData.CurrentProject);
        if (isNaN(CurrentProject)) CurrentProject = 0;
        switch (true) {
            case (CurrentProject === Number(obj.Project.RID)):
                Button = $$$.Button(Row, "Clock Out", null);
                Button.className += " BlueFont Blink";
                Button.onclick = this.OnPreClockOut.bind(this);
                break;

            case (CurrentProject === 0):
                Button = $$$.Button(Row, "Clock In", null);
                Button.className += " GreenFont";
                Button.onclick = this.OnClockIn.bind(this);
                break;
        }
    }
    function OnStart(obj) {
        var Temp = new TimeClockOBJ();
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
                {
                    switch (obj.Event) {
                        case "Start":
                            OnStart(obj);
                            break;
                    }
                }
                break;
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    function RunOnce() {
        var Pack = {};
        Pack.Channel = ModName;
        Pack.callback = OnCom;
        $$$.Listen(Pack);
    }
    RunOnce();
})(window, document);