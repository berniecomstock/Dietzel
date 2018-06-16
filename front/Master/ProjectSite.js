(function (window, document) {
    var ModName = "ProjectSite";
    function ModOBJ() {
    }
    ModOBJ.prototype.Project = {};
    ModOBJ.prototype.UserData = {};
    ModOBJ.prototype.LocOutput = null;
    ModOBJ.prototype.DataBlock = null;
    ModOBJ.prototype.Callback = null;
    ModOBJ.prototype.OnArchiveCallback = function () {
        $$$.UnPop();
        Pack = $$$.NewPack();
        Pack.Channel = "ProjectList";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    };
    ModOBJ.prototype.OnArchive = function () {
        var Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = this.OnArchiveCallback.bind(this);
        Pack.PostData.append("Table", "Projects");
        Pack.PostData.append("FName", "Type");
        Pack.PostData.append("RID", this.Project.RID);
        Pack.PostData.append("FVal", 300);
        $$$.Server(Pack);
    };
    ModOBJ.prototype.SaveHelper = function (name, val) {
        var Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = function () {
        };
        Pack.PostData.append("Table", "Projects");
        Pack.PostData.append("FName", name);
        Pack.PostData.append("RID", this.Project.RID);
        Pack.PostData.append("FVal", val);
        $$$.Server(Pack);
    };
    ModOBJ.prototype.OnSave = function (obj) {
        this.Project.Title = this.Title.value;
        this.Project.SubTitle = this.SubTitle.value;
        this.Project.Description = this.Description.value;
        this.Project.Address = this.Address.value;
        this.Project.Carrier = this.Carrier.value;
        this.SaveHelper("Title", this.Title.value);
        this.SaveHelper("SubTitle", this.SubTitle.value);
        this.SaveHelper("Description", this.Description.value);
        this.SaveHelper("Address", this.Address.value);
        this.SaveHelper("Carrier", this.Carrier.value);
        this.SaveHelper("DrillDate", this.Project.DrillDate);
        this.SaveHelper("MobeDate", this.Project.MobeDate);
        this.Callback();
        $$$.UnPop();
    }
    
    ModOBJ.prototype.OnCreateLoc = function () {
        console.log("OnCreateLoc");
        $$$.UnPop();
        this.GetLocData();
    }
    ModOBJ.prototype.CreateLoc = function (name, number) {
        console.log("CreateLoc");
        console.dir(name.value);

        var q = "insert into locate (ProjectRID,Name,Number) values (";
        q += "'" + this.Project.RID + "',";
        q += "'" + name.value + "',";
        q += "'" + number.value + "')";

        $$$.MySql(q, this.OnCreateLoc.bind(this));
    }
    ModOBJ.prototype.OnNewLoc = function () {
        console.log("OnNewLoc");
        var Root = $$$.Pop();
        var Container = $$$.Dom(Root, "div", "Container Center");
        var Box = $$$.Dom(Container, "div", "W300 Flow Pad Mar Border Smooth");

        //var Box = $$$.Dom(Root, "div", "W300");
        var Row = $$$.Dom(Box, "div", "");
        var Name = $$$.Input(Row, "input", "text", "Name");
        Row = $$$.Dom(Box, "div", "");
        var Number = $$$.Input(Row, "input", "text", "Number");
        Row = $$$.Dom(Box, "div", "Right");
        $$$.Button(Row, "Cancel", function () { $$$.UnPop(); });
        $$$.Button(Row, "Ok", this.CreateLoc.bind(this,Name,Number));
        

    }
    ModOBJ.prototype.Loc = [];
    ModOBJ.prototype.OutPutLocData = function () {
        console.log("OutPutLocData");
        $$$.Flush(this.LocOutput);
        var y = this.Loc.length;
        var yindex = 0;
        while (yindex != y) {
            var Box = $$$.Dom(this.LocOutput, "div", "Mar Pad Flow Border Smooth Shadow");
            var Row = $$$.Dom(Box, "div");
            new $$$.XEditText(Row, "Locate", this.Loc[yindex], "Name", "Name");
            new $$$.XEditText(Row, "Locate", this.Loc[yindex], "Number", "Number");
            yindex++;
        }
    }
    
    ModOBJ.prototype.OnLocData = function (obj) {
        console.log("OnLocData");
        console.dir(obj);
        this.Loc = obj.json.Results;
        //this.OutPutLocData();
    }
    ModOBJ.prototype.GetLocData = function () {
        console.log("GetLocData");
        var q = "Select * from locate where projectrid=" + this.Project.RID;
        $$$.MySql(q, this.OnLocData.bind(this));
    }
    ModOBJ.prototype.Init = function (obj) {
        this.Callback = obj.callback;
        

        this.UserData = obj.UserData;
        this.Project = obj.Project;
        var Row = null;
        var TheTable = "Projects";
        var Wrapper = $$$.Dom($$$.Pop(), "div", "Pad Mar Border Smooth");
        Row = $$$.Dom(Wrapper, "div","Mar Pad Big Bold OrangeFont");
        new $$$.SmartText(Row, this.Project, "Title", TheTable);
        //new $$$.SmartText(Row, this.Hole, TheName, TheTable);
        //new $$$.XEditText(Row, TheTable, this.Hole, "HoleDia", "Diameter");
        
        if($$$.MakeNumber($$$.UserData.Type)===1000)
        {
            Row = $$$.Dom(Wrapper, "div", "VTop");
            new $$$.XEditText(Row, TheTable, this.Project, "Title", "Title");
            new $$$.XEditText(Row, TheTable, this.Project, "SubTitle", "Sub Title");
            new $$$.XEditText(Row, TheTable, this.Project, "Address", "Address");
            new $$$.XEditText(Row, TheTable, this.Project, "Carrier", "Carrier");
            new $$$.DatePicker(Row, this.Project, "MobeDate", "Mobe Date", "Projects");
            new $$$.DatePicker(Row, this.Project, "DrillDate", "Drill Date", "Projects");
            Row = $$$.Dom(Wrapper, "div", "VTop");
            new $$$.XEditArea(Row, "Projects", this.Project, "Description", "Description");


            Row = $$$.Dom(Wrapper, "div", "VTop");
            new $$$.XEditArea(Row, TheTable, this.Project, "GeoLink", "GeoLink");


            Row = $$$.Dom(Wrapper, "div", "VTop");
            new $$$.XEditText(Row, TheTable, this.Project, "Perdiem", "Perdiem");
            new $$$.XEditText(Row, TheTable, this.Project, "Lodging", "Lodging");
            

            Row = $$$.Dom(Wrapper, "div", "");
            Button = $$$.Button(Row, "Archive This Site", this.OnArchive.bind(this));
        }
        else {
            Row = $$$.Dom(Wrapper, "div", "VTop");
            new $$$.XText(Row, TheTable, this.Project, "Title", "Title");
            new $$$.XText(Row, TheTable, this.Project, "SubTitle", "Sub Title");
            new $$$.XText(Row, TheTable, this.Project, "Address", "Address");
            new $$$.XText(Row, TheTable, this.Project, "Carrier", "Carrier");

            var D = new $$$.XDumbText(Row, "MobeDate", this.Project.MobeDate, "MobeDate");
            $$$.PrettyDate(D.TextElement, this.Project.MobeDate);

            D = new $$$.XDumbText(Row, "DrillDate", this.Project.DrillDate, "DrillDate");
            $$$.PrettyDate(D.TextElement, this.Project.DrillDate);
            Row = $$$.Dom(Wrapper, "div", "Dent Left Smooth Shadow", this.Project.Description);
            //Row = $$$.Dom(Wrapper, "div", "Bold Big Left", "Locates");
            //this.LocOutput = $$$.Dom(Wrapper, "div", "");
        }
        
        //this.GetLocData();
        
    }

    
    function OnStart(obj) {
        console.log(ModName + " Start");
        var Temp = new ModOBJ;
        Temp.Init(obj);
    }
    function OnCom(obj) {
        switch (obj.Event) {
            case "Start":
                OnStart(obj);
                break;
        }
    }

    $$$.Listen({ Channel: ModName, callback: OnCom });

})(window, document);