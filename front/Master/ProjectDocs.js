
(function (window, document) {
    var ModName = "ProjectDocs";


    ////////////////////////////////////////////////////////////////////////////
    function Docs() { }
    Docs.prototype.UserData = {};
    Docs.prototype.Project = {};
    Docs.prototype.Docs = [];
    Docs.prototype.Target = null;
    Docs.prototype.FullContent = null;
    


    Docs.prototype.SendToVendor = function (obj) {
        console.dir(obj);

        
        var Users = [];
        document.body.style.overflow = "hidden";
        var Pop = $$$.Dom(document.body, "div", "Pop");
        var Content = $$$.Dom(Pop, "div", "Container");
        var Row = $$$.Dom(Content, "div", "TextLeft");
        var Box = $$$.Dom(Content, "div", "Box");
        var DocName = $$$.Dom(Box, "h3", "");
        var DocRID = obj.Doc.RID;

        $$$.Text(DocName, obj.Doc.Name);
        var Select = $$$.Dom(Box, "select", "");
        var OkButton = $$$.Button(Box, "Ok", null);
        function OnDestroy() {
            if (Pop) document.body.removeChild(Pop);
            document.body.style.overflow = "auto";
            
        }
        $$$.Button(Row, "Back", OnDestroy.bind(this));

        function CallBack(obj) {
            
            OnDestroy();
            

        }
        function OnOk() {
            var VendorRID = $$$.GetSelectVal(Select);
            
            if (VendorRID === 0)
            {
                alert("Select a Vendor First");
                return;
            }
            if (VendorRID === "0") {
                alert("Select a Vendor First");
                return;
            }
            var Pack = $$$.NewPack();
            Pack.url = "SetUserDoc.htm";
            Pack.callback = CallBack.bind(this);
            Pack.PostData.append("UserRID", VendorRID);
            Pack.PostData.append("DocRID", DocRID);
            $$$.Server(Pack);
        }
        function OnUsers(data) {
            
            if ("json" in data) {
                if ("Users" in data.json) {
                    Users = data.json.Users;
                }
            }
            console.dir(Users);
            var y = Users.length;
            var yindex = 0;
            $$$.Option(Select, 0,"Select A Vendor");
            while (yindex != y) {
                $$$.Option(Select, Users[yindex].RID, Users[yindex].ScreenName);
                yindex++;
            }
            OkButton.onclick = OnOk.bind(this);

        }
        var Pack = $$$.NewPack();
        
        Pack.url = "Ajax.htm";
        Pack.callback = OnUsers.bind(this);
        Pack.PostData.append("Table", "Users");
        Pack.PostData.append("Type", 50);
        Pack.PostData.append("Limit", 100);
        Pack.PostData.append("SortBy", "Modified");
        Pack.PostData.append("SortDirection", "DESC");
        $$$.Server(Pack);
    }


    Docs.prototype.OpenDoc = function (obj) {
        $$$.Flush(obj.Target);
        
        var url = $$$.BinPath + obj.Doc.RID + obj.Doc.DataType;
        function OnClose() {
            $$$.Flush(obj.Target);
        }
        function DoImage() {
            var Row = $$$.Dom(obj.Target, "div", null);
            var Button = $$$.Button(Row, "Close", null);
            Button.onclick = OnClose;
            

            Row = $$$.Dom(obj.Target, "div", null);
            var Img = $$$.Dom(Row, "img", "Image Clicky");
            
            $$$.SetImgSrc(Img, url);
            Img.onclick = function () { window.open(url, "_blank"); }
        }
        

        switch (obj.Doc.DataType.toUpperCase()) {
            case ".JPG":
                DoImage();
                break;
            case ".PNG":
                DoImage();
                break;
            case ".PDF":
                $$$.Shout({ Channel: "PDFLoader", Event: "Start", url: url, Target: obj.Target });
                break;
            default:
                window.open(url, "_blank");
                break;
        }
        return;
        if ((obj.Doc.DataType.toUpperCase() === ".JPG") || (obj.Doc.DataType.toUpperCase() === ".PNG")) {
            var Row = $$$.Dom(obj.Target, "div", null);
            var Button = $$$.Button(Row, "Close", null);
            Button.onclick = OnClose;
            Row = $$$.Dom(obj.Target, "div", null);
            $$$.Text(Row, "Tap for full size.");

            Row = $$$.Dom(obj.Target, "div", null);
            var Img = $$$.Dom(Row, "img", "Image Clicky");
            Img.src = url;
            Img.onclick = function () { window.open(url, "_blank"); }
            return;
        }
        window.open(url, "_blank");

    }
    Docs.prototype.OnDelete = function (TheDoc) {
        if (this.UserData.Type === 1000) {
            if (!confirm("Are you sure you want to delete this doc?")) { return; }
            var Pack = $$$.NewPack();
            Pack.url = "DeleteBinUpload.htm";
            Pack.callback = this.GetList.bind(this);
            Pack.PostData.append("RID", TheDoc.RID);
            $$$.Server(Pack);
            return;
        }
        alert("Access Denied");

    }
    Docs.prototype.OnMove = function (obj) {
        var N = Number(obj.Doc.ACL);
        if (isNaN(N)) N = 0;

        var Pack = $$$.NewPack();
        Pack.callback = this.GetList.bind(this);
        Pack.url = "AjaxSet.htm";
        Pack.PostData.append("Table", "BinUploads");
        Pack.PostData.append("RID", obj.Doc.RID);
        Pack.PostData.append("FName", "ACL");
        if (N === 1000) {
            Pack.PostData.append("FVal", 0);
        }
        else {
            Pack.PostData.append("FVal", 1000);
        }
        $$$.Server(Pack);
    }
    Docs.prototype.OnArchive = function (obj) {
        var N = Number(obj.Doc.Archive);
        if (isNaN(N)) N = 0;

        var Pack = $$$.NewPack();
        Pack.callback = this.GetList.bind(this);
        Pack.url = "AjaxSet.htm";
        Pack.PostData.append("Table", "BinUploads");
        Pack.PostData.append("RID", obj.Doc.RID);
        Pack.PostData.append("FName", "Archive");
        if (N === 0) {
            Pack.PostData.append("FVal", 1);
        }
        else {
            Pack.PostData.append("FVal", 0);
        }
        $$$.Server(Pack);

    }
    Docs.prototype.OnTools = function (obj) {
        var Root = obj.Target;
        var Button = null;
        $$$.Flush(Root);
        if (this.Admin === true) {
            Button = $$$.Button(Root, "Move To Crew", null);
        }
        else {
            Button = $$$.Button(Root, "Move To Admin", null);

        }
        Button.onclick = this.OnMove.bind(this, obj);

        Button = $$$.Button(Root, "Archive", null);
        Button.onclick = this.OnArchive.bind(this, obj);

        
        

        Button = $$$.Button(Root, "Delete", null);
        Button.onclick = this.OnDelete.bind(this, obj.Doc);


    }
    Docs.prototype.Output = function (TheDoc) {

        if (this.UserData.Type < 1000) {
            var Card = $$$.Dom(this.Target, "div", "Pad Mar Border Smooth HoverWhite");
            var Name = $$$.Dom(Card, "div","Clicky BlueFont Bold");
            $$$.Text(Name, TheDoc.Name);
            var Target = $$$.Dom(Card, "div", "");
            var Params = {};
            Params.Doc = TheDoc;
            Params.Target = Target;
            Name.onclick = this.OpenDoc.bind(this, Params);
            return;
        }


        var Card = $$$.Dom(this.Target, "div", "Pad Mar Border Smooth HoverWhite BlueFont");
        if (this.Admin === true) {
            Card.className += " RedFont";
        }

        var N = Number(TheDoc.Archive);
        if (isNaN(N)) N = 0;

        var Name = $$$.Dom(Card, "div", "DocName Flow Split90 BlueFont Bold Clicky");
        if (N === 1) {
            $$$.Text(Name, "(Archive)" + TheDoc.Name);
        }
        else {
            $$$.Text(Name, TheDoc.Name);
        }
        if (this.Admin === true) {
            Name.className += " RedFont";
        }


        var Row = $$$.Dom(Card, "div", "DocTools Flow Split10 Right Clicky");
        var EditButton = $$$.Dom(Row, "img", "Img");
        EditButton.src = $$$.ImgPath + "Edit.png?Scale=32";


        var Target = $$$.Dom(Card, "div", "");
        var Params = {};
        Params.Doc = TheDoc;
        Params.Target = Target;
        Name.onclick = this.OpenDoc.bind(this, Params);

        EditButton.onclick = this.OnTools.bind(this, Params);



    }
    Docs.prototype.ProcessData = function () {
        var y = this.Docs.length;
        var yindex = 0;
        if (y < 1) {

            $$$.Text(this.Target, "No Docs Found...");
            return;
        }
        $$$.Flush(this.Target);
        while (yindex != y) {
            this.Output(this.Docs[yindex]);
            yindex++;
        }
    }
    Docs.prototype.OnData = function (obj) {

        this.Docs.length = 0;
        if ("json" in obj) {
            if ("BinUploads" in obj.json) {
                this.Docs = obj.json.BinUploads;

            }
        }
        this.ProcessData();

    }
    Docs.prototype.UploadStatus = null;
    Docs.prototype.PendingUploads = 0;
    Docs.prototype.OnFileDone = function (obj) {
        console.log("Done");
        if (this.PendingUploads > 0) this.PendingUploads--;
        $$$.Text(this.UploadStatus, "Uploading " + this.PendingUploads);
        this.GetList();
        if (this.PendingUploads == 0) {
            $$$.Text(this.UploadStatus, "Idle ");
            $$$.None(this.UploadStatus);
            $$$.Block(this.DropZone);
        }
    }
    Docs.prototype.OnDrop = function (obj) {
        console.dir(obj);
        var y = 0;
        var yindex = 0;
        var Files = [];
        if ("Files" in obj) {
            Files = obj.Files;
            y = Files.length;
        }
        if (y < 1) return;
        this.PendingUploads = y;
        $$$.Text(this.UploadStatus, "Uploading " + this.PendingUploads);
        $$$.None(this.DropZone);
        while (yindex != y) {
            var Pack = $$$.NewPack();
            Pack.url = "BinUpload.htm";
            Pack.callback = this.OnFileDone.bind(this);
            Pack.PostData = new FormData();
            Pack.PostData.append("Type", $$$.GetFileExt(Files[yindex]));
            Pack.PostData.append("Name", Files[yindex].name);
            Pack.PostData.append("ProjectRID", this.Project.RID);
            Pack.PostData.append("Data", Files[yindex]);
            if (this.Admin) {
                if (this.UserData.Type === 1000) {
                    Pack.PostData.append("ACL", 1000);
                }
            }
            $$$.Server(Pack);
            yindex++;
        }
    }
    Docs.prototype.GetList = function () {
        
        var Pack = $$$.NewPack();
        Pack.url = "Ajax.htm";
        Pack.callback = this.OnData.bind(this);
        Pack.PostData.append("Table", "BinUploads");
        Pack.PostData.append("Offset", 0);
        Pack.PostData.append("Limit", 100);
        Pack.PostData.append("SortBy", "Modified");
        Pack.PostData.append("SortDirection", "ASC");
        Pack.PostData.append("ProjectRID", this.Project.RID);
        Pack.PostData.append("Archive", this.Archive);
        if (this.Admin) {
            if (this.UserData.Type === 1000) {
                Pack.PostData.append("ACL", 1000);
            }
        }
        else {
            Pack.PostData.append("ACL", 0);
        }
        $$$.Server(Pack);
    }
    Docs.prototype.Admin = false;
    Docs.prototype.Archive = 0;
    Docs.prototype.OnArchiveToggle = function () {
        if (this.Archive === 0) {
            this.Archive = 1;
            this.OnArchiveToggleButton.value = "Hide Archive";
            this.GetList();
            return;
        }
        this.Archive = 0;
        this.OnArchiveToggleButton.value = "Show Archive";
        this.GetList();

    }
    Docs.prototype.Init = function (obj) {
        this.Project = obj.Project;
        this.UserData = obj.UserData;

        if ("Admin" in obj) {
            if (this.UserData.Type === 1000) {
                this.Admin = true;
                console.log("Admin Docs");
            }

        }
        var Root = $$$.Dom($$$.Pop(), "div", "Pad Mar Smooth Border");
        this.DropZone = $$$.Dom(Root, "div", "Left");
        this.UploadStatus = $$$.Dom(Root, "div", "DropStatus");
        var Row = $$$.Dom(Root, "div", "Right");
        this.OnArchiveToggleButton = $$$.Button(Row, "Show Archive", this.OnArchiveToggle.bind(this));
        this.Target = $$$.Dom(Root, "div");
        var Pack = {};
        Pack.Target = this.DropZone;
        Pack.Channel = "DropZone";
        Pack.Event = "Create";
        Pack.Multi = true;
        Pack.callback = this.OnDrop.bind(this);
        $$$.Shout(Pack);
        this.GetList();
    }

    ////////////////////////////////////////////////////////////////////////////
    function OnStart(obj) {
        var Temp = new Docs();
        Temp.Init(obj);
    }
    ////////////////////////////////////////////////////////////////////////////
    function OnCom(obj) {
        switch (obj.Channel) {
            case "Omni":
                switch (obj.Event) {

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
    $$$.Listen({ Channel: ModName, callback: OnCom });
})(window, document);