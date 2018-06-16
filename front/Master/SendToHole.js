(function (window, document) {
    "use strict";
    var ModName = "SendToHole";
    function OBJ() { }
    OBJ.prototype.Data = {};
    OBJ.prototype.OnDone = function () {
        console.log("Done");
        $$$.UnPop();
        $$$.LoadScript("MyStuff", {});
    }

    OBJ.prototype.OnGo = function () {


        var ProjectRID = $$$.MakeNumber($$$.GetSelectVal(this.SelProject));
        if (ProjectRID < 1) {
            alert("Please make a valid Project Selection");
            return;
        }
        var HoleRID = $$$.MakeNumber($$$.GetSelectVal(this.SelHole));
        if (HoleRID < 1) {
            alert("Please make a valid Hole Selection");
            return;
        }

        var Pack = $$$.NewPack();
        Pack.url = "XSetHoleImage.htm";
        Pack.callback = this.OnDone.bind(this);
        Pack.PostData.append("ProjectRID", ProjectRID);
        Pack.PostData.append("Cat", $$$.MakeNumber($$$.GetSelectVal(this.SelCat)));
        //Pack.PostData.append("UserRID", $$$.UserData.RID);
        Pack.PostData.append("UserRID", this.Data.UserRID);
        Pack.PostData.append("UploadRID", this.Data.RID);
        Pack.PostData.append("UploadDataType", this.Data.DataType);
        Pack.PostData.append("HoleRID", HoleRID);
        Pack.PostData.append("UploadName", this.Data.Name);
        $$$.Server(Pack);

    }
    OBJ.prototype.OnHoleData = function (obj) {
        $$$.Flush(this.SelHole);
        var y = obj.json.Results.length;
        var yindex = 0;
        $$$.Option(this.SelHole, "0", "Select a Hole");
        while (yindex != y) {
            $$$.Option(this.SelHole, obj.json.Results[yindex].RID, obj.json.Results[yindex].Name);
            yindex++;
        }
        
    }

    OBJ.prototype.OnJobsChange = function (obj) {
        
        var RID = $$$.MakeNumber($$$.GetSelectVal(this.SelProject));
        if (RID < 1) { return; }
        var q = "select Name,RID from holes where ProjectRID=" + RID + " order by Name";//200 order by modified desc";
        $$$.MySql(q, this.OnHoleData.bind(this));
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
        var Row = $$$.Dom(target, "div", "Bold Big OrangeFont", "Send To Hole.");
        Row = $$$.Dom(target, "div", "Dent OrangeFont", "This tool will allow you to apply an image to any Hole In Any Project. The hole MUST already exist. Step 1, Select the Project you are working on. Step 2, Select the Hole Name. Step 3, Select The Image Catagory. Step 4, Push the Apply button. Done.");
        
    }
    OBJ.prototype.Init = function (obj) {
        
        this.Data = obj;

        var Data = this.Data;
        var IsImage = false;
        switch (Data.DataType.toUpperCase()) {
            case ".JPG":
                IsImage = true;
                break;
            case ".JPEG":
                IsImage = true;
                break;
            case ".GIF":
                IsImage = true;
                break;
            case ".PNG":
                IsImage = true;
                break;
            default:
                break;
        }
        if (!IsImage) {
            alert("This Does not look like an Image document. Only images can be applied to Hole records.");
            return;
        }


        var Root = $$$.Pop();
        Root.className = "Smooth White Border Mar Pad W300 MCenter";


        var Row = $$$.Dom(Root, "div");
        this.Demo(Row);
        Row = $$$.Dom(Root, "div");
        
        this.SelProject=$$$.Input(Row, "select", "", "Project");
        this.SelHole=$$$.Input(Row, "select", "", "Hole");
        this.SelCat = $$$.Input(Row, "select", "", "Category");


        Row = $$$.Dom(Root, "div");
        var I = $$$.Dom(Row, "img", "Image", "");
        $$$.SetImgSrc(I, $$$.UserUploadsPath + this.Data.RID + this.Data.DataType, 0);
        var q = "select Title,RID from projects where type=200 order by modified desc";
        $$$.MySql(q, this.OnJobsData.bind(this));


        
        $$$.Option(this.SelCat, "0", "Rebar Vertical");
        $$$.Option(this.SelCat, "1", "Form and Rebar In Place");
        $$$.Option(this.SelCat, "2", "Anchor Bolts Set");
        $$$.Option(this.SelCat, "3", "Anchor Bolts Centered A");
        $$$.Option(this.SelCat, "6", "Anchor Bolts Centered B");
        $$$.Option(this.SelCat, "7", "Anchor Bolts Centered C");
        $$$.Option(this.SelCat, "8", "Anchor Bolts Centered D");
        $$$.Option(this.SelCat, "4", "Vibrating");
        $$$.Option(this.SelCat, "5", "Stripped");

        Row = $$$.Dom(Root, "div","Right");

        $$$.Button(Row, "Apply", this.OnGo.bind(this));
        

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);