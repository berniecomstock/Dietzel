
(function (window, document) {
    "use strict";
    var ModName = "SendToReceipt";
    function OBJ() { }
    OBJ.prototype.Data = {};
    OBJ.prototype.OnDone = function () {
        console.log("Done");
        $$$.UnPop();
        $$$.LoadScript("MyStuff", {});
    }

    OBJ.prototype.OnGo = function () {

        var PRID = $$$.MakeNumber($$$.GetSelectVal(this.SelProject));
        var ERID = $$$.MakeNumber($$$.GetSelectVal(this.SelEquip));
        //RID, ProjectRID, UserRID, Created, , , Gallons, Class, UnitRID, DataType, Notes, Vendor
        var Pack = $$$.NewPack();
        Pack.url = "XRecp.htm";
        Pack.callback = this.OnDone.bind(this);
        Pack.PostData.append("UserRID", $$$.UserData.RID);
        Pack.PostData.append("ProjectRID", PRID);
        Pack.PostData.append("UnitRID", ERID);
        Pack.PostData.append("UploadRID", this.Data.RID);
        Pack.PostData.append("UploadDataType", this.Data.DataType);
        Pack.PostData.append("UploadName", this.Data.Name);
        
        Pack.PostData.append("Amount", this.Amount.value);
        Pack.PostData.append("Vendor", this.Vendor.value);
        Pack.PostData.append("Gallons", this.Gallons.value);
        Pack.PostData.append("Miles", this.Miles.value);
        Pack.PostData.append("Class", $$$.GetSelectVal(this.SelectClass));
        Pack.PostData.append("Notes", this.Notes.value);

        $$$.LoadScript("TheServer", Pack);

        

    }

    
    OBJ.prototype.OnEquipData = function (obj) {

        var y = obj.json.Results.length;
        var yindex = 0;
        $$$.Option(this.SelEquip, "0", "Select Unit");
        while (yindex != y) {
            $$$.Option(this.SelEquip, obj.json.Results[yindex].RID, obj.json.Results[yindex].Unit);
            yindex++;
        }
       
    }
    OBJ.prototype.OnJobsData = function (obj) {

        var y = obj.json.Results.length;
        var yindex = 0;
        $$$.Option(this.SelProject, "0", "Select Project");
        while (yindex != y) {
            $$$.Option(this.SelProject, obj.json.Results[yindex].RID, obj.json.Results[yindex].Title);
            yindex++;
        }
       
    }
    OBJ.prototype.Demo = function (target) {
        var Row = $$$.Dom(target, "div", "Bold Big OrangeFont", "Send To Receipt.");
        Row = $$$.Dom(target, "div", "Dent OrangeFont", "This tool will allow you to create a Receipt from any of your documents.");
        Row = $$$.Dom(target, "div", "OrangeFont", "You may attach a receipt to a Project, a Vehicle, or Both.");
        Row = $$$.Dom(target, "div", "OrangeFont", "All fields are OPTIONAL.");
        Row = $$$.Dom(target, "div", "OrangeFont", "The more information you provide the better the office will be able to sort them out.");
        

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
            alert("This Does not look like an Image document. Only images can be applied to Receipt records.");
            return;
        }

        var Root = $$$.Pop();
        Root.className = "Smooth White Border Pad W300 MCenter";

        var Row = $$$.Dom(Root, "div");
        this.Demo(Row);
        Row = $$$.Dom(Root, "div");

        this.SelProject = $$$.Input(Row, "select", "", "Project");
        this.SelEquip = $$$.Input(Row, "select", "", "Unit");
        this.Miles = $$$.Input(Row, "input", "text", "Miles");
        this.Vendor = $$$.Input(Row, "input", "text", "Vendor");
        this.Amount = $$$.Input(Row, "input", "text", "$Amount");
        this.Gallons = $$$.Input(Row, "input", "text", "Gallons");

        this.SelectClass = $$$.Input(Row, "select", "", "Select Class");
        $$$.Option(this.SelectClass, "None", "Select a class");
        $$$.Option(this.SelectClass, "Hotel", "Hotel");
        $$$.Option(this.SelectClass, "Fuel", "Fuel");
        $$$.Option(this.SelectClass, "Repair", "Repair");
        $$$.Option(this.SelectClass, "Material", "Material");
        $$$.Option(this.SelectClass, "Travel", "Travel");
        $$$.Option(this.SelectClass, "Other", "Other");
        this.Notes = $$$.Input(Row, "textarea", "", "Notes");

        Row = $$$.Dom(Root, "div", "Right");
        $$$.Button(Row, "Send", this.OnGo.bind(this));
        



        Row = $$$.Dom(Root, "div", "Bold", this.Data.Name);
        Row = $$$.Dom(Root, "div");
        var I = $$$.Dom(Row, "img", "Image", "");
        
        var q = "select Title,RID from projects where type=200 order by modified desc";
        $$$.MySql(q, this.OnJobsData.bind(this));

        var q = "select Unit,RID from Equip order by Unit asc";
        $$$.MySql(q, this.OnEquipData.bind(this));


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