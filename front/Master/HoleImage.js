
(function (window, document) {
    "use strict";
    var ModName = "HoleImage";
    function ModOBJ() { }
    ModOBJ.prototype.Root = null;
    ModOBJ.prototype.FormRoot = null;
    ModOBJ.prototype.UploadRoot = null;
    ModOBJ.prototype.ListRoot = null;
    ModOBJ.prototype.Data = [];
    ModOBJ.prototype.Pics = [];
    ModOBJ.prototype.OnOpen = function (target, url) {
        $$$.Flush(target);
        var I = $$$.Dom(target, "img", "Img");
        $$$.SetImgSrc(I,url);
    }
    ModOBJ.prototype.OnData = function (obj) {
        $$$.Flush(this.ListRoot);
        this.Pics.length = 0;
        if ("json" in obj) {
            if ("HoleUploads" in obj.json) {
                this.Pics = obj.json.HoleUploads;
            }
        }
        var y = this.Pics.length;
        var yindex = 0;
        while (yindex != y) {
            var Target = $$$.Dom(this.ListRoot, "div", "Mar Pad Border Smooth");
            var Row = $$$.Dom(Target, "div", "Bold");
            if (this.Pics[yindex].Cat === "5") { $$$.Text(Row, "Stripped"); }
            if (this.Pics[yindex].Cat === "4") { $$$.Text(Row, "Vibrating"); }
            if (this.Pics[yindex].Cat === "3") { $$$.Text(Row, "Anchor Bolts Centered A"); }
            if (this.Pics[yindex].Cat === "6") { $$$.Text(Row, "Anchor Bolts Centered B"); }
            if (this.Pics[yindex].Cat === "7") { $$$.Text(Row, "Anchor Bolts Centered C"); }
            if (this.Pics[yindex].Cat === "8") { $$$.Text(Row, "Anchor Bolts Centered D"); }
            if (this.Pics[yindex].Cat === "2") { $$$.Text(Row, "Anchor Bolts Set"); }
            if (this.Pics[yindex].Cat === "1") { $$$.Text(Row, "Form and Rebar In Place"); }
            if (this.Pics[yindex].Cat === "0") { $$$.Text(Row, "Rebar Vertical"); }
            if (this.Pics[yindex].Cat === "99") { $$$.Text(Row, this.Pics[yindex].Title); }
            var URL = $$$.HolePath + this.Pics[yindex].RID + this.Pics[yindex].DataType;
            
            Row = $$$.Dom(Target, "div", "Split");
            var Link = $$$.Dom(Row, "a", "", "Download");
            Link.href = URL;
            Link.target = "_blank";


            Row = $$$.Dom(Target, "div", "Split Right");
            var Photo = $$$.Dom(Target, "div", "");
            $$$.Button(Row, "Open Here", this.OnOpen.bind(this, Photo, URL));


            yindex++;
        }
    }
    ModOBJ.prototype.GetData = function () {
        var Pack = $$$.NewPack();
        Pack.url = "Ajax.htm";
        Pack.callback = this.OnData.bind(this);
        Pack.PostData.append("SortDirection", "DESC");
        Pack.PostData.append("SortBy", "Modified");
        Pack.PostData.append("Table", "HoleUploads");
        Pack.PostData.append("Limit", 100);
        Pack.PostData.append("Offset", 0);
        Pack.PostData.append("HoleRID", this.Data.RID);
        //Pack.PostData.append("Cat", this.Cat);
        $$$.Server(Pack);
    }
    ModOBJ.prototype.OnUploadDone = function (obj) {
        this.GetData();
        this.DoForm();
    }
    ModOBJ.prototype.OnUpload = function () {

        var y = this.Ugly.files.length;
        var yindex = 0;
        var TheFile = null;
        var Pack = {};

        while (yindex != y) {
            var TheFile = this.Ugly.files[0];
            var Pack = $$$.NewPack();
            Pack.url = "HoleUpload.htm";
            Pack.callback = this.OnUploadDone.bind(this);
            Pack.PostData = new FormData();
            Pack.PostData.append("Type", $$$.GetFileExt(TheFile));
            Pack.PostData.append("Name", TheFile.name);
            Pack.PostData.append("HoleRID", this.Data.RID);
            Pack.PostData.append("Data", TheFile);
            Pack.PostData.append("Cat", $$$.GetSelectVal(this.CatSelect));
            if ($$$.GetSelectVal(this.CatSelect) === "99") {
                Pack.PostData.append("Title", this.NewImageTitle.value);
            }

            $$$.Server(Pack);
            yindex++;
        }
        


        $$$.Flush(this.FormRoot);
        var I = $$$.Dom(this.FormRoot, "img", "Image");
        I.src = $$$.ImagePath + "Spinner.gif";
    }
    ModOBJ.prototype.OnCat = function () {
        $$$.Flush(this.UploadRoot);
        var Cat = $$$.GetSelectVal(this.CatSelect);
        if (Cat === "99") {
            this.NewImageTitle=$$$.Input(this.UploadRoot, "input", "text", "Optional Name");
        }

        var DropZone = $$$.Dom(this.UploadRoot, "div", "", "");
        this.Ugly = $$$.Dom(DropZone, "input", null);
        this.Ugly.type = "file";
        this.Ugly.onchange = this.OnUpload.bind(this);
        //if (Cat === "99") { this.Ugly.multiple = "multiple"; }
        

        
    }
    ModOBJ.prototype.DoForm = function () {
        $$$.Flush(this.FormRoot);
        
        this.CatSelect = $$$.Input(this.FormRoot, "select", "", "Select New Image Upload Type");
        $$$.Option(this.CatSelect, "99", "Select Image Type");
        $$$.Option(this.CatSelect, "0", "Rebar Vertical");
        $$$.Option(this.CatSelect, "1", "Form and Rebar In Place");
        $$$.Option(this.CatSelect, "2", "Anchor Bolts Set");
        $$$.Option(this.CatSelect, "3", "Anchor Bolts Centered (A)");
        $$$.Option(this.CatSelect, "6", "Anchor Bolts Centered (B)");
        $$$.Option(this.CatSelect, "7", "Anchor Bolts Centered (C)");
        $$$.Option(this.CatSelect, "8", "Anchor Bolts Centered (D)");
        $$$.Option(this.CatSelect, "4", "Vibrating");
        $$$.Option(this.CatSelect, "5", "Stripped");
        $$$.Option(this.CatSelect, "99", "Other");
        this.CatSelect.onchange = this.OnCat.bind(this);
        this.UploadRoot = $$$.Dom(this.FormRoot);

    }
    ModOBJ.prototype.Init = function (obj) {
        console.log(ModName);
        this.Data = obj.Data;
        this.Project = obj.Project;
        

        this.Root = $$$.Pop();
        var Title = $$$.Dom(this.Root, "div", "Box");
        var Row = $$$.Dom(Title, "div", "OrangeFont Big Bold", this.Project.Title);
        //Row = $$$.Dom(Title, "div", "Bold", this.Data.Name);

        Row = $$$.Dom(this.Root, "div", "");
        $$$.Dom(Row, "span", "", "Hole Id/Name: ");
        $$$.Dom(Row, "span", "Bold", this.Data.Name);


        this.FormRoot = $$$.Dom(this.Root, "div", "Mar Pad Border Smooth");
        this.ListRoot = $$$.Dom(this.Root, "div", "");
        
        this.GetData();
        this.DoForm();
    }
    function OnCom(obj) {
        switch (obj.Event) {
            case "Start":
                var Temp = new ModOBJ();
                Temp.Init(obj);
                break;
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    $$$.Listen({ Channel: ModName, callback: OnCom });
})(window, document);

