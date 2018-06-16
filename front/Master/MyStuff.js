(function (window, document) {
    "use strict";
    var ModName = "MyStuff";

    

    function FileOBJ() { }
    FileOBJ.prototype.Data = {};
    FileOBJ.prototype.RootElement = null;


    FileOBJ.prototype.OnSpinDone = function () {
        $$$.LoadScript("MyStuff", {});
    }

    FileOBJ.prototype.OnSpin = function () {
        
        var Pack = $$$.NewPack();
        Pack.callback = this.OnSpinDone.bind(this);
        Pack.url = "SpinImage.htm";
        Pack.PostData.append("RID", this.Data.RID);
        Pack.PostData.append("Table", "useruploads");
        Pack.PostData.append("DataType", this.Data.DataType);
        $$$.Server(Pack);
        
        //useruploads
        
    }

    FileOBJ.prototype.OnJob = function () {
        $$$.LoadScript("SendToJob", this.Data);
    }

    FileOBJ.prototype.OnHole = function () {
        $$$.LoadScript("SendToHole", this.Data);
    }
    FileOBJ.prototype.OnReceipt = function () {
        $$$.LoadScript("SendToReceipt", this.Data);
    }
    FileOBJ.prototype.OnEquip = function () {
        $$$.LoadScript("SendToEquip", this.Data);
    }
    
    FileOBJ.prototype.OnDHA = function () {
        $$$.LoadScript("SendToDHA", this.Data);
    }

    FileOBJ.prototype.OnDelete = function () {
        try { this.RootElement.parentNode.removeChild(this.RootElement); }
        catch (e) { }

        if ($$$.MakeNumber(this.Data.Archive) > 0) {
            var Pack = $$$.NewPack();
            Pack.url = "DeleteUserUploads.htm";
            Pack.PostData.append("RID", this.Data.RID);
            Pack.callback = function () { };
            $$$.Server(Pack);
        }
        else {
            var q = "update useruploads set archive=1 where rid=" + this.Data.RID;
            $$$.MySql(q, function () { });
        }

    }
    FileOBJ.prototype.OnLook = function () {
        var Data = this.Data;

        var Path = $$$.UserUploadsPath + Data.RID + Data.DataType + "?Scale=" + $$$.ScreenWidth();

        switch (Data.DataType.toUpperCase()) {
            case ".JPG":

                window.open(Path, "_blank");
                break;
            case ".JPEG":
                window.open(Path, "_blank");
                break;
            case ".GIF":
                window.open(Path, "_blank");
                break;
            case ".PNG":
                window.open(Path, "_blank");
            default:
                window.open($$$.UserUploadsPath + Data.RID + Data.DataType, "_blank");
                break;
        }
    }
    
    FileOBJ.prototype.Output = function () {
        
        $$$.Flush(this.RootElement);
        var Root = this.RootElement;


        var Row = $$$.Dom(Root, "div", "Bold BlueFont Left", this.Data.ScreenName);
        Row = $$$.Dom(Root, "div");
        new $$$.XEditText(Row, "UserUploads", this.Data, "Name");
        var Row = $$$.Dom(Root, "div", "Center");
        var I = $$$.Dom(Row, "img", "Image Clicky", "");
        I.onclick = this.OnLook.bind(this);
        var Data = this.Data;
        var RotateFlag = false;
        switch (Data.DataType.toUpperCase()) {
            case ".JPG":
                $$$.SetImgSrc(I, $$$.UserUploadsPath + Data.RID + Data.DataType, 300);
                RotateFlag = true;
                break;
            case ".JPEG":
                $$$.SetImgSrc(I, $$$.UserUploadsPath + Data.RID + Data.DataType, 300);
                RotateFlag = true;
                break;
            case ".GIF":
                $$$.SetImgSrc(I, $$$.UserUploadsPath + Data.RID + Data.DataType, 300);
                break;
            case ".PNG":
                $$$.SetImgSrc(I, $$$.UserUploadsPath + Data.RID + Data.DataType, 300);
                RotateFlag = true;
                break;
            case ".PDF":
                $$$.SetImgSrc(I, $$$.ImagePath + "pdf.png", 300);
                break;
            default:
                console.log("Unhandled=" + Data.DataType);
                $$$.SetImgSrc(I, $$$.ImagePath + "unknown.png", 300);
                break;
        }

        var Row = $$$.Dom(Root, "div", "Center");
        $$$.Icon(Row, $$$.ImagePath + "Hole.png", "Hole", this.OnHole.bind(this)).title = "Send To Hole";
        $$$.Icon(Row, $$$.ImagePath + "Job.png", "Job Docs", this.OnJob.bind(this)).title = "Send To Project Documents";
        $$$.Icon(Row, $$$.ImagePath + "Recp.png", "Receipt", this.OnReceipt.bind(this)).title = "Send To Receipt";
        //$$$.Icon(Row, $$$.ImagePath + "Safe.png", "D.H.A.", this.OnDHA.bind(this)).title = "Send To D.H.A";
        $$$.Icon(Row, $$$.ImagePath + "Trash.png", "Remove", this.OnDelete.bind(this)).title = "Delete this File";

        if (RotateFlag) {
            $$$.Icon(Row, $$$.ImagePath + "Rotate.png", "Rotate", this.OnSpin.bind(this)).title = "Rotate";
        }
    }

    FileOBJ.prototype.Init = function (obj) {

        var Archive = false;
        this.Data = obj.Data;
        if ($$$.MakeNumber(this.Data.Archive) > 0) { Archive = true; }

        var Root = $$$.Dom(obj.Target, "div", "Mar Pad Flow Border Smooth");
        
        
        

        if (Archive) { Root.className += " RedFont "; }
        else {
            Root.className += " White ";
        }

        this.RootElement = Root;
        this.Output();

    }
    
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////


    function OBJ() { }
    OBJ.prototype.List = [];
    OBJ.prototype.ToolBar = null;
    OBJ.prototype.ArchiveButt = null;
    OBJ.prototype.AllUserButt = null;
    OBJ.prototype.OutputRow = null;


    OBJ.prototype.Demo = function () {
        $$$.Flush(this.OutputRow);
        var Root = $$$.Dom(this.OutputRow, "div", "Mar Pad Flow Border Smooth White");
        var Row = $$$.Dom(Root, "div", "Bold", "This area is reserved for your personal document uploads.");
        Row = $$$.Dom(Root, "div", "Bold", "You have not uploaded any documents. Push the Cloud Icon above to upload one or more documents.");
        $$$.Dom(Root, "div", "Bold", "Once files are uploaded they will remain in this area waiting for you to apply them to what ever records you want.");
        $$$.Dom(Root, "div", "Bold", "Files stored here can later be sent to: Projects Document Store, Receipts, Hole Images, as well as D.H.A Records. ");


    }
    

    OBJ.prototype.OnData = function (obj) {

        $$$.Flush(this.OutputRow);
        var y = obj.json.Results.length;
        if (y < 1) { return this.Demo();}
        var yindex = 0;
        while (yindex != y) {
            var Temp = new FileOBJ();
            var Pack = {};
            Pack.Target = this.OutputRow;
            Pack.Data = obj.json.Results[yindex];
            //Temp.Init(obj.json.Results[yindex]);
            Temp.Init(Pack);
            yindex++;
        }
    }
    OBJ.prototype.QData = function () {

        var q = "select *, ";
        q += " (select screenname from users where rid=userrid) as ScreenName";
        q+=" from useruploads where ";

        if (this.ArchiveButt.checked) {
            q += " Archive=1 ";

        }
        else {
            q += " Archive=0 ";
        }
        if (this.AllUserButt.checked) {
            q += " and userrid > 0 ";
        }
        else {
            q += " and userrid= " + $$$.UserData.RID;
        }
        //var q = "select * from useruploads where userrid=" + $$$.UserData.RID+" and Archive=0";
        $$$.MySql(q, this.OnData.bind(this));
        console.log(q);
    }

    OBJ.prototype.Init = function (obj) {
        $$$.Flush($$$.Content);
        this.ToolBar = $$$.Dom($$$.Content, "div", "");
        this.OutputRow = $$$.Dom($$$.Content, "div", "");
        this.ArchiveButt = $$$.CheckBox(this.ToolBar, "Archives");
        this.ArchiveButt.onclick = this.QData.bind(this);
        this.AllUserButt= $$$.CheckBox(this.ToolBar, "All Users");
        this.AllUserButt.onclick = this.QData.bind(this);

        switch ($$$.MakeNumber($$$.UserData.Type)) {
            case 1000:
                break;
            default:
                $$$.None(this.ToolBar);
                //$$$.None(this.ArchiveButt);
                break;
        }
        this.QData();
        

    }
    

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);

