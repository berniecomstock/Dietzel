(function (window, document) {
    "use strict";
    var ModName = "UserList";
    var ArchiveFlag = 0;
    function ModOBJ() { }
    ModOBJ.prototype.FormRoot = null;
    ModOBJ.prototype.FilterRoot = null;
    ModOBJ.prototype.ListRoot = null;
    ModOBJ.prototype.Data = [];
    ModOBJ.prototype.ScreenName = null;
    ModOBJ.prototype.Email = null;
    ModOBJ.prototype.Pass = null;
    ModOBJ.prototype.Type = null;
    ModOBJ.prototype.ArchiveToggle = null;

    ModOBJ.prototype.OnSaveCallback = function (obj) {
        $$$.UnPop();
    }
    ModOBJ.prototype.OnSave = function (yindex) {
        
        this.Data[yindex].ScreenName = this.ScreenName.Get();
        this.Data[yindex].Email = this.Email.Get();
        this.Data[yindex].Pass = this.Pass.Get();
        this.Data[yindex].Type = this.Type.Get();


        var Pack = $$$.NewPack();
        Pack.url = "UpdateUser.htm";
        Pack.callback = this.OnSaveCallback.bind(this);
        Pack.PostData.append("RID", this.Data[yindex].RID);
        Pack.PostData.append("ScreenName", this.ScreenName.Get());
        Pack.PostData.append("Email", this.Email.Get());
        Pack.PostData.append("Pass", this.Pass.Get());
        Pack.PostData.append("Type", this.Type.Get());
        $$$.Server(Pack);

    }
    ModOBJ.prototype.SetAnon = function (yindex) {
        var Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = function () { };
        Pack.PostData.append("Table", "Users");
        Pack.PostData.append("RID", this.Data[yindex].RID);
        Pack.PostData.append("FName", "Type");
        Pack.PostData.append("FVal", 0);
        $$$.Server(Pack);
    }
    ModOBJ.prototype.OnMakeActive = function (yindex) {
        var Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = function () {
            $$$.UnPop();
            ArchiveFlag = 0;
            var Pack = {};
            Pack.Channel = "UserList";
            Pack.Event = "Start";
            $$$.Shout(Pack);
        };
        Pack.PostData.append("Table", "Users");
        Pack.PostData.append("RID", this.Data[yindex].RID);
        Pack.PostData.append("FName", "Archive");
        Pack.PostData.append("FVal", 0);
        $$$.Server(Pack);
    }
    ModOBJ.prototype.OnArchive = function (yindex) {
        this.SetAnon(yindex);

        var Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = function () {
            $$$.UnPop();
            var Pack = {};
            Pack.Channel = "UserList";
            Pack.Event = "Start";
            $$$.Shout(Pack);
        };
        Pack.PostData.append("Table", "Users");
        Pack.PostData.append("RID", this.Data[yindex].RID);
        Pack.PostData.append("FName", "Archive");
        Pack.PostData.append("FVal", 1);
        $$$.Server(Pack);
    }
    
    ModOBJ.prototype.Detail = function (yindex) {
        
        
        var Pointer = this.Data[yindex];
        var Root = $$$.Dom($$$.Pop(), "div", "Mar Pad Border Smooth");

        
        $$$.Dom(Root, "div", "Big Bold BlueFont", this.Data[yindex].ScreenName);

        this.ScreenName = new $$$.DumbBox($$$.Dom(Root, "div", "Split"), "Full Name", this.Data[yindex].ScreenName);
        this.Email = new $$$.DumbBox($$$.Dom(Root, "div", "Split"), "Email", this.Data[yindex].Email);
        this.Pass = new $$$.DumbBox($$$.Dom(Root, "div", "Split"), "Password", this.Data[yindex].Pass);
        
        Pointer.Type = $$$.MakeNumber(Pointer.Type);

        this.Type = new $$$.DumbSelect($$$.Dom(Root, "div", "Split"), "Access Level");
        if (Pointer.Type === 0) {
            this.Type.SetSelected("Anonymous(none)", 0);
            this.Type.Option("Crew Leader", 101);
            this.Type.Option("Crew", 100);
            this.Type.Option("Admin", 1000);
        }
        
        if (Pointer.Type === 101) {
            this.Type.SetSelected("Crew Leader", 101);
            this.Type.Option("Anonymous(none)", 0);
            this.Type.Option("Crew", 100);
            this.Type.Option("Admin", 1000);
        }
        if (Pointer.Type === 100) {
            this.Type.SetSelected("Crew", 100);
            this.Type.Option("Anonymous(none)", 0);
            this.Type.Option("Crew Leader", 101);
            this.Type.Option("Admin", 1000);
        }
        if (Pointer.Type === 1000) {
            this.Type.SetSelected("Admin", 1000);
            this.Type.Option("Anonymous(none)", 0);
            this.Type.Option("Crew Leader", 101);
            this.Type.Option("Crew", 100);
            
        }
        var Row = $$$.Dom(Root, "div", "Right");
        $$$.Button(Row, "Save", this.OnSave.bind(this,yindex));

        Row = $$$.Dom(Root, "div", "");
        

        new $$$.SmartBox($$$.Dom(Row, "div", "Flow Mar Pad"), Pointer, "Phone", "Users", "Phone");
        Row = $$$.Dom(Root, "div", "");
        new $$$.SmartBox($$$.Dom(Row, "div", "Mar Pad"), Pointer, "Address", "Users", "Address");
        
        


        Row = $$$.Dom(Root, "div", "Split TextRight");

        if (Pointer.Archive === "0") {
            $$$.Button(Row, "Archive", this.OnArchive.bind(this, yindex));
        }
        if (Pointer.Archive === "1") {
            $$$.Button(Row, "Make Active", this.OnMakeActive.bind(this, yindex));
        }
        
        
        
    }
    ModOBJ.prototype.OnGroupCallback = function (obj) {
        
        var Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = function () { };
        Pack.PostData.append("Table", "Users");
        Pack.PostData.append("RID", obj.TableRID);
        Pack.PostData.append("FName", "GroupRID");
        Pack.PostData.append("FVal", obj.RID);
        $$$.Server(Pack);
    }
    
    ModOBJ.prototype.OnGroup = function (yindex) {
        var Pack = $$$.NewPack();
        Pack.Channel = "GroupSelect";
        Pack.Event = "Start";
        Pack.Header = "Select Group For: " + this.Data[yindex].ScreenName;
        Pack.Table = "Users";
        Pack.TableRID = this.Data[yindex].RID;
        Pack.callback = this.OnGroupCallback.bind(this);
        $$$.Shout(Pack);
    }

    ModOBJ.prototype.OutPut = function (yindex) {
        var Root = $$$.Dom(this.ListRoot, "div", "");
        var Row = $$$.Dom(Root, "div", "Pad Mar Border Smooth BlueFont HoverWhite Bold Big Clicky");
        new $$$.SmartText(Row, this.Data[yindex], "ScreenName", "Users");
        Row.onclick = this.Detail.bind(this, yindex);
        
    }
    ModOBJ.prototype.OnData = function (obj) {
        
        this.Data.length = 0;
        
        if ("json" in obj) {
            if ("Users" in obj.json) {
                this.Data = obj.json.Users;
            }
        }
        $$$.Flush(this.ListRoot);
        var y = this.Data.length;
        var yindex = 0;
        while (yindex != y) {
            this.OutPut(yindex);
            yindex++;
        }
    }
    ModOBJ.prototype.GetData = function () {
        var Pack = $$$.NewPack();
        Pack.url = "Ajax.htm";
        Pack.callback = this.OnData.bind(this);
        Pack.PostData.append("Table", "Users");
        Pack.PostData.append("SortBy", "ScreenName");
        Pack.PostData.append("SortDirection", "Asc");
        Pack.PostData.append("Archive", ArchiveFlag);
        $$$.Server(Pack);
    }
    ModOBJ.prototype.New = function () {
        //name,email,pass

        var Row = $$$.Dom(this.FormRoot, "div", "");
        var ScreenName = new $$$.DumbBox($$$.Dom(Row, "div", "Split3"), "Full Name", "");
        var Email = new $$$.DumbBox($$$.Dom(Row, "div", "Split3"), "Email", "");
        var Pass = new $$$.DumbBox($$$.Dom(Row, "div", "Split3"), "Password", "");
        Row = $$$.Dom(this.FormRoot, "div", "Right");
        function CallBack() {
            this.GetData();
            ScreenName.Set("");
            Email.Set("");
            Pass.Set("");
        }
        function OnNewUser() {
            var Pack = $$$.NewPack();
            Pack.url = "CreateUser.htm";
            Pack.callback = CallBack.bind(this);
            Pack.PostData.append("Email", Email.Get());
            Pack.PostData.append("ScreenName", ScreenName.Get());
            Pack.PostData.append("Pass",Pass.Get());
            $$$.Server(Pack);
        }
        $$$.Button(Row, "Create New User", OnNewUser.bind(this));
    }
    ModOBJ.prototype.OnToggle = function () {
        if (ArchiveFlag === 0) {
            this.ArchiveToggle.checked = true;
            ArchiveFlag = 1;
            this.GetData();
            return;
        }
        if (ArchiveFlag === 1) {
            this.ArchiveToggle.checked = false;
            ArchiveFlag = 0;
            this.GetData();
            return;
        }
    }
    ModOBJ.prototype.Filter = function () {
        
        this.ArchiveToggle = $$$.CheckBox(this.FilterRoot, "Archives");
        this.ArchiveToggle.onclick = this.OnToggle.bind(this);
        if (ArchiveFlag === 0) {
            this.ArchiveToggle.checked = false;
            return;
        }
        if (ArchiveFlag === 1) {
            this.ArchiveToggle.checked = true;
            return;
        }
    }
    ModOBJ.prototype.Init = function () {
        console.log(ModName);
        var Root = $$$.Content;
        $$$.Flush(Root);
        this.FormRoot = $$$.Dom(Root, "div", "Mar Pad Border Smooth");
        this.FilterRoot = $$$.Dom(Root, "div", "Mar Pad Right");
        this.ListRoot = $$$.Dom(Root, "div", "");
        this.GetData();
        this.New();
        this.Filter();
    }
    function OnCom(obj) {
        switch (obj.Event) {
            case "Start":
                var Temp = new ModOBJ();
                Temp.Init();
                break;
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    function Onpik() {
        $$$.Listen({ Channel: ModName, callback: OnCom });
    }
    


    function OnMoment() {
        $$$.Listen({ Channel: ModName, callback: OnCom });
        //var Pack = {};
        //Pack.Channel = "Pikaday";
        //Pack.Event = "Load";
        //Pack.callback = Onpik;
        //$$$.Shout(Pack);
    }

    var Pack = {};
    Pack.Channel = "Moment";
    Pack.Event = "Load";
    Pack.callback = OnMoment.bind(this);
    $$$.Shout(Pack);

})(window, document);