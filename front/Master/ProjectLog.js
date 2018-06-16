(function (window, document) {
    "use strict";
    var ModName = "ProjectLog";
    var InputId = 0;
    function OBJ() { }
    OBJ.prototype.UploadRoot = null;
    OBJ.prototype.Root = null;
    OBJ.prototype.ProjectRID = 0;
    OBJ.prototype.Title = "";
    
    OBJ.prototype.UpLoadTypeImage = null;

    OBJ.prototype.FileData = null;
    OBJ.prototype.TextInput = null;
    OBJ.prototype.Connection = new XMLHttpRequest();
    //OBJ.prototype.Progress = null;

    OBJ.prototype.Progress = document.createElement("progress");
    OBJ.prototype.StatusText = document.createElement("div");
    OBJ.prototype.CountText = document.createElement("div");
    OBJ.prototype.NameText = document.createElement("div");
    OBJ.prototype.Spinner = document.createElement("img");

    OBJ.prototype.Callback = function (obj) { }


    OBJ.prototype.Down = function (e) {
        console.log("Down->" + e.type);
        switch (e.type) {
            case "load":
                //$$$.Text(this.StatusText, "Done");
                //$$$.Block(this.Progress);
                //$$$.None(this.Spinner);
                $$$.UnPop();
                this.Go();
                break;
            case "progress":
                $$$.Text(this.StatusText, "Downloading...");
                $$$.Block(this.Progress);
                $$$.None(this.Spinner);
                this.Progress.max = e.total;
                this.Progress.value = e.loaded;

                break;
        }
    }
    OBJ.prototype.Up = function (e) {
        console.log("  Up->" + e.type);
        switch (e.type) {
            case "load":
                $$$.Text(this.StatusText, "Processing...");
                $$$.None(this.Progress);
                $$$.Block(this.Spinner);
                break;
            case "progress":
                this.Progress.max = e.total;
                this.Progress.value = e.loaded;
                break;
        }
    }


    OBJ.prototype.OnPost = function () {
        $$$.LoadScript("XGeo", {callback:this.OnGeo.bind(this)});
    }
    OBJ.prototype.OnGeo = function (obj) {
        //this.UploadRoot = $$$.Dom($$$.Pop(), "form", "MCenter Pad Smooth Border White");
        //var Row = $$$.Dom(this.UploadRoot, "div", "", "");
        //this.Progress = $$$.Dom(Row, "progress", "", "");


        var Box = $$$.Dom($$$.Pop(true), "div", "Smooth Border Mar Pad W300 MCenter", "");
        var Row = $$$.Dom(Box, "div", "");
        Row.appendChild(this.NameText);
        this.NameText.className = "Bold OrangeFont Right";

        Row = $$$.Dom(Box, "div", "");
        Row.appendChild(this.Progress);
        Row.appendChild(this.Spinner);
        Row = $$$.Dom(Box, "div", "");
        Row.appendChild(this.StatusText);
        Row = $$$.Dom(Box, "div", "");
        Row.appendChild(this.CountText);
        this.Spinner.src = $$$.ImagePath + "Spinner.gif";
        $$$.None(this.Spinner);
        //Row = $$$.Dom(Box, "div", "Right");
        //$$$.Button(Row, "Cancel", this.OnCancel.bind(this));
        this.StatusText.className = "Bold";
        this.CountText.className = "";
        $$$.Text(this.CountText, "");
        $$$.Text(this.StatusText, "");


        this.Progress.max = 100;
        this.Progress.value = 0;


        this.Connection.onload = this.Down.bind(this);
        this.Connection.onabort = this.Down.bind(this);
        this.Connection.onerror = this.Down.bind(this);
        this.Connection.onprogress = this.Down.bind(this);
        this.Connection.onreadystatechange = this.Down.bind(this);
        this.Connection.ontimeout = this.Down.bind(this);
        this.Connection.upload.onload = this.Up.bind(this);
        this.Connection.upload.onabort = this.Up.bind(this);
        this.Connection.upload.onerror = this.Up.bind(this);
        this.Connection.upload.onprogress = this.Up.bind(this);
        this.Connection.upload.ontimeout = this.Up.bind(this);
        this.Connection.open("POST", "ProjectLog.htm", true, null, null);
        var Post = new FormData();
        var TheFile = this.FileData;
        if (TheFile) {
            Post.append("Data", TheFile);
            Post.append("DataType", $$$.GetFileExt(TheFile));
        }
        Post.append("GeoLong", obj.longitude);
        Post.append("GeoLat", obj.latitude);
        Post.append("UserRID", $$$.UserData.RID);
        Post.append("ProjectRID", this.ProjectRID);
        Post.append("Notes", this.TextInput.value);
        this.Connection.timeout = 0;
        this.Connection.send(Post);

    }

    OBJ.prototype.OnGetImage = function (theinput) {
        this.FileData = theinput.files[0];
        $$$.Flow(this.UpLoadTypeImage);
        $$$.SetImgSrc(this.UpLoadTypeImage, $$$.ImagePath + "Job.png", 32);
        return;

        var Type = $$$.GetFileExt(this.FileData);
        
        switch (Type.toUpperCase()) {
            case ".PDF":
                $$$.SetImgSrc(this.UpLoadTypeImage, $$$.ImagePath + "PDF.png", 32);
                break;
            default:
                $$$.SetImgSrc(this.UpLoadTypeImage, $$$.ImagePath + "UnKnown.png", 32);
                break;
        }

        //$$$.None(this.UpLoadTypeImage);
        return;
        /*
        var y = theinput.files.length;
        if (y < 1) { return; }
        var reader = new FileReader();
        $$$.Flush(this.ImgRow);
        this.FileData = theinput.files[0];
        var I = this.Image;
        reader.onload = function (e) {
            console.log("Reader Loaded");
            I.src = e.target.result;
            
        }
        reader.readAsDataURL(this.FileData);
        */

    }
    OBJ.prototype.TheForm = function () {

        var Row = $$$.Dom(this.Root, "div", "Bold Left Big OrangeFont", this.Title);
        var Form = $$$.Dom(this.Root, "form");

        var Row = $$$.Dom(Form, "div");

        this.TextInput = $$$.Input(Row, "textarea", "", "Say Something...");
        Row = $$$.Dom(Form, "div", "Right");


        var Box = $$$.Dom(Row, "div", "Flow Mar Pad", "");

        var Butt = $$$.Dom(Box, "input", "inputfile", "");
        Butt.type = "file";
        Butt.name = "file";
        Butt.id = "ProjectLog" + InputId;
        Butt.multiple = false;
        Butt.onchange = this.OnGetImage.bind(this, Butt);
        var L = $$$.Dom(Box, "label", "UploadLabel", "");
        L.htmlFor = "ProjectLog" + InputId;
        InputId++;
        var Image = $$$.Image(L, $$$.ImagePath + "Upload.png", 32);
        Image.className += " Clicky ";

        this.UpLoadTypeImage = $$$.Image(Row, $$$.ImagePath + "Unknown.png", 32);
        $$$.None(this.UpLoadTypeImage);
        //Row = $$$.Dom(Form, "div", "Right");
        $$$.Button(Row, "Post", this.OnPost.bind(this));
    }
    OBJ.prototype.List = [];

    //AAC

    OBJ.prototype.HandleFile = function (Data) {

        var Path = $$$.ProjectLogUploadsPath + Data.RID + Data.DataType;

        function DoPic() {
            var I = $$$.Image(Data.Target, Path, $$$.ScreenWidth());
            I.className = "Clicky";
            I.onclick = function () {
                window.open(Path + "?Scale=" + $$$.ScreenWidth(), "_blank");
            }

        }
        function DoPDF() {
            var I = $$$.Image(Data.Target, $$$.ImagePath + "PDF.png", "100");
            I.className = "Clicky";
            I.onclick = function () {
                window.open(Path,"_blank");
            }

        }
        
        function DoVid() {
            var Link = $$$.Dom(Data.Target, "a", "", "Download");
            Link.target = "_blank";
            Link.href = Path;


            var V = $$$.Dom(Data.Target, "video", "", "");

            V.controls = true;
            V.width = 320;
            var S = $$$.Dom(V, "source", "", "");
            S.src = Path;
            S.type = "video/mp4";

            $$$.Block(V);

        }
        function DoNone() {
            var I = $$$.Image(Data.Target, $$$.ImagePath + "unknown.png", "100");
            I.className = "Clicky";
            I.onclick = function () {
                window.open(Path, "_blank");
            }

        }

        switch (Data.DataType.toUpperCase()) {
            case ".JPG":
                DoPic();
                break;
            case ".JPEG":
                DoPic();
                break;
            case ".GIF":
                DoPic();
                break;
            case ".PNG":
                DoPic();
                break;
            case ".PDF":
                DoPDF();
                //$$$.Image(Data.Target, $$$.ImagePath + "PDF.png", "100");
                break;
            case ".MP4":
                DoVid();
                break;
            default:
                DoNone();
                console.log("Unhandled=" + Data.DataType);
                break;
        }
    }

    /*
    switch (this.Data.DataType.toUpperCase()) {
        case ".JPG":
            $$$.Image(Row, $$$.ImagePath + "Camera.png", "32").className = "Clicky";
            break;
        case ".JPEG":
            $$$.Image(Row, $$$.ImagePath + "Camera.png", "32").className = "Clicky";
            break;
        case ".GIF":
            $$$.Image(Row, $$$.ImagePath + "Camera.png", "32").className = "Clicky";
            break;
        case ".PNG":
            $$$.Image(Row, $$$.ImagePath + "Camera.png", "32").className = "Clicky";
            break;
        case ".PDF":
            $$$.Image(Row, $$$.ImagePath + "PDF.png", "32").className = "Clicky";
            break;
        default:
            $$$.Image(Row, $$$.ImagePath + "Unknown.png", "32").className = "Clicky";
            break;
    }
    */
    OBJ.prototype.Output = function () {
        var y = this.List.length;
        var yindex = 0;
        while (yindex != y) {
            var Box = $$$.Dom(this.Root, "div", "Mar Pad Border Smooth White Max MCenter");
            var Row = $$$.Dom(Box, "div", "");
            $$$.Dom(Row, "div", "Flow Mar Pad Bold BlueFont", this.List[yindex].ScreenName);
            $$$.Dom(Row, "div", "Flow Mar Pad Bold RedFont", this.List[yindex].PrettyDate);
            
            Row = $$$.Dom(Box, "div", "Dent", this.List[yindex].Notes);
            if (this.List[yindex].IFlag === "1") {
                //Row = $$$.Dom(Box, "div", "");
                this.List[yindex].Target = $$$.Dom(Box, "div", "");
                this.HandleFile(this.List[yindex]);
                //$$$.Image(Row, $$$.ProjectLogUploadsPath + this.List[yindex].RID + this.List[yindex].DataType, $$$.ScreenWidth());

            }

            yindex++;
        }
    }
    OBJ.prototype.OnData = function (obj) {    
        this.List = obj.json.Results;
        this.Output();
    }

    OBJ.prototype.Go = function () {
        $$$.Flush(this.Root);
        
        this.TheForm();
        //q += " (SELECT DATE_FORMAT(Created,'%a %b %D %h:%i %p')) as PrettyDate, ";
        var q = "select *,";
        q += "(SELECT DATE_FORMAT(Created,'%a %b %D %h:%i %p')) as PrettyDate, ";
        q += "(select screenname from users where rid=userrid) as ScreenName ";
        q += " from projectlog where projectrid=" + this.ProjectRID+" order by created DESC";
        $$$.MySql(q, this.OnData.bind(this));

        
    }
    OBJ.prototype.Click = function () {
        this.Root = $$$.Dom($$$.Pop(), "div", "Mar Pad Smooth Border White");
        this.Go();
    }
    OBJ.prototype.Init = function (obj) {
        this.ProjectRID = obj.ProjectRID;
        this.Title = obj.Title;
        this.Root = $$$.Dom($$$.Pop(), "div", "Mar Pad Smooth Border White");
        this.Go();
        //this.Root = $$$.Dom(obj.Target, "div", "");
        //$$$.Icon(this.Root, $$$.ImagePath + "Talk.png", "Log", this.Click.bind(this));
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);