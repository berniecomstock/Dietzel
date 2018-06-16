(function (window, document) {
    "use strict";
    var ModName = "SendToDHA";
    function OBJ() { }
    OBJ.prototype.Data = {};
    OBJ.prototype.OnDone = function () {
        console.log("Done");
        $$$.UnPop();
        $$$.LoadScript("MyStuff", {});
    }



    OBJ.prototype.OnGo = function (obj) {

        var RID = $$$.MakeNumber($$$.GetSelectVal(this.SelProject));
        if (RID < 1) { alert("Please Select a Project"); return; }

        var Pack = $$$.NewPack();
        Pack.url = "XDHA.htm";
        Pack.callback = this.OnDone.bind(this);
        //Pack.PostData.append("UserRID", $$$.UserData.RID);
        Pack.PostData.append("UserRID", this.Data.UserRID);
        Pack.PostData.append("ProjectRID", RID);
        Pack.PostData.append("UploadRID", this.Data.RID);
        Pack.PostData.append("UploadDataType", this.Data.DataType);
        Pack.PostData.append("UploadName", this.Data.Name);
        Pack.PostData.append("GeoLat", this.Data.Lat);
        Pack.PostData.append("GeoLong", this.Data.Long);
        $$$.LoadScript("TheServer", Pack);


    }
    OBJ.prototype.OnJobsData = function (obj) {

        var y = obj.json.Results.length;
        var yindex = 0;
        $$$.Option(this.SelProject, "0", "Select Project");
        while (yindex != y) {
            $$$.Option(this.SelProject, obj.json.Results[yindex].RID, obj.json.Results[yindex].Title);
            yindex++;
        }
        //this.SelProject.onchange = this.OnJobsChange.bind(this);
    }
    OBJ.prototype.Demo = function (target) {
        var Row = $$$.Dom(target, "div", "Bold Big OrangeFont", "Daily Hazard Analysis.");
        Row = $$$.Dom(target, "div", "Dent OrangeFont", "This tool will allow you to create a D.H.A record from any of your Images.");
        Row = $$$.Dom(target, "div", "OrangeFont", "Select a Project, Push Send, Done.");
        


    }

    OBJ.prototype.OnGeo = function (obj) {

        this.Data.Lat = obj.latitude;
        this.Data.Long = obj.longitude;

        //this.Data.Lat=obj.la
        var Root = $$$.Pop();
        Root.className = "Smooth White Border Mar Pad W300 MCenter";
        var Row = $$$.Dom(Root, "div");
        this.Demo(Row);
        Row = $$$.Dom(Root, "div");
        this.SelProject = $$$.Input(Row, "select", "", "Project");
        Row = $$$.Dom(Root, "div", "Bold", this.Data.Name);
        Row = $$$.Dom(Root, "div");
        var I = $$$.Dom(Row, "img", "Image", "");
        //$$$.SetImgSrc(I, $$$.UserUploadsPath + this.Data.RID + this.Data.DataType, 0);
        var q = "select Title,RID from projects where type=200 order by modified desc";
        $$$.MySql(q, this.OnJobsData.bind(this));
        var Data = this.Data;

        switch (Data.DataType.toUpperCase()) {
            case ".JPG":
                $$$.SetImgSrc(I, $$$.UserUploadsPath + Data.RID + Data.DataType, 300);
                break;
            case ".JPEG":
                $$$.SetImgSrc(I, $$$.UserUploadsPath + Data.RID + Data.DataType, 300);
                break;
            case ".GIF":
                $$$.SetImgSrc(I, $$$.UserUploadsPath + Data.RID + Data.DataType, 300);
                break;
            case ".PNG":
                $$$.SetImgSrc(I, $$$.UserUploadsPath + Data.RID + Data.DataType, 300);
                break;
            case ".PDF":
                $$$.SetImgSrc(I, $$$.ImagePath + "pdf.png", 300);
                break;
            default:
                console.log("Unhandled=" + Data.DataType);
                $$$.SetImgSrc(I, $$$.ImagePath + "unknown.png", 300);
                break;
        }

        Row = $$$.Dom(Root, "div", "Right");
        $$$.Button(Row, "Send", this.OnGo.bind(this));
    }

    OBJ.prototype.Init = function (obj) {
        this.Data = obj;
        $$$.LoadScript("XGeo", { callback: this.OnGeo.bind(this) });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);