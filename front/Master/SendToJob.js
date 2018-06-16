(function (window, document) {
    "use strict";
    var ModName = "SendToJob";
    function OBJ() { }
    OBJ.prototype.Data = {};
    OBJ.prototype.OnDone = function () {
        console.log("Done");
        $$$.UnPop();
        $$$.LoadScript("MyStuff", {});
    }

    

    OBJ.prototype.OnJobsChange = function (obj) {

        var RID = $$$.MakeNumber($$$.GetSelectVal(this.SelProject));
        if (RID < 1) { return; }

        var Pack = $$$.NewPack();
        Pack.url = "XProjectDoc.htm";
        Pack.callback = this.OnDone.bind(this);
        Pack.PostData.append("UserRID", $$$.UserData.RID);
        Pack.PostData.append("ProjectRID", RID);
        Pack.PostData.append("UploadRID", this.Data.RID);
        Pack.PostData.append("UploadDataType", this.Data.DataType);
        Pack.PostData.append("UploadName", this.Data.Name);
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
        this.SelProject.onchange = this.OnJobsChange.bind(this);
    }
    OBJ.prototype.Demo = function (target) {
        var Row = $$$.Dom(target, "div", "Bold Big OrangeFont", "Send To Project Docs.");
        Row = $$$.Dom(target, "div", "Dent OrangeFont", "This tool will allow you to transfer any of your documents to any active Project Folder.");
        Row = $$$.Dom(target, "div", "OrangeFont", "Step1, Select the Project from the list.");
        Row = $$$.Dom(target, "div", "OrangeFont", "Done.");

    }

    OBJ.prototype.Init = function (obj) {

        this.Data = obj;
        console.log("Send To Job");
        console.dir(this.Data);

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


    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);