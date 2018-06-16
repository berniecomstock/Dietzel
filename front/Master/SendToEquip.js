
(function (window, document) {
    "use strict";
    var ModName = "SendToEquip";
    function OBJ() { }
    OBJ.prototype.Data = {};
    OBJ.prototype.OnDone = function () {
        console.log("Done");
        $$$.UnPop();
        $$$.LoadScript("MyStuff", {});
    }

    OBJ.prototype.OnGo = function () {

        
        var ERID = $$$.MakeNumber($$$.GetSelectVal(this.SelEquip));
        var CAT = $$$.MakeNumber($$$.GetSelectVal(this.SelectCat));
        if (CAT === 6) {
            alert("Please select a upload Category");
        }

        var Pack = $$$.NewPack();
        Pack.url = "XEquipUpload.htm";
        Pack.callback = this.OnDone.bind(this);
        //Pack.PostData.append("UserRID", $$$.UserData.RID);
        Pack.PostData.append("UserRID", this.Data.UserRID);
        //Pack.PostData.append("ProjectRID", PRID);
        Pack.PostData.append("EquipRID", ERID);
        Pack.PostData.append("UploadRID", this.Data.RID);
        Pack.PostData.append("UploadDataType", this.Data.DataType);
        Pack.PostData.append("UploadName", this.Data.Name);
        Pack.PostData.append("Cat", CAT);
        $$$.LoadScript("TheServer", Pack);

        /*
        //XEquipUpload.htm
	Post.FIND("UserRID", UserRID); if (UserRID.empty()) { return; }
	Post.FIND("UploadDataType", UploadDataType); if (UploadDataType.empty()) { return; }
	Post.FIND("UploadName", UploadName); if (UploadName.empty()) { UploadName = "No Name"; }
	Post.FIND("Cat", Cat); if (Cat.empty()) { Cat = "0"; }
	Post.FIND("EquipRID", EquipRID); if (EquipRID.empty()) { EquipRID = "0"; }
	

        var Pack = $$$.NewPack();
        Pack.url = "EquipUpload.htm";
        Pack.callback = this.OnUploadDone.bind(this);
        Pack.PostData.append("Type", $$$.GetFileExt(TheFile));
        Pack.PostData.append("Name", TheFile.name);
        Pack.PostData.append("EquipRID", Equip[this.Index].RID);
        Pack.PostData.append("Data", TheFile);
        Pack.PostData.append("Cat", obj.Cat);
        $$$.Server(Pack);
        */


    }


    OBJ.prototype.OnEquipData = function (obj) {

        var y = obj.json.Results.length;
        var yindex = 0;
        $$$.Option(this.SelProject, "0", "Select Unit");
        while (yindex != y) {
            $$$.Option(this.SelEquip, obj.json.Results[yindex].RID, obj.json.Results[yindex].Unit);
            yindex++;
        }

    }
   
    OBJ.prototype.Init = function (obj) {

        this.Data = obj;
        var Root = $$$.Pop();
        Root.className = "Smooth White Border Pad W300 MCenter";

        var Row = $$$.Dom(Root, "div", "Bold", "Send To Equip.");
        Row = $$$.Dom(Root, "div");

        
        this.SelEquip = $$$.Input(Row, "select", "", "Unit");
        this.SelectCat = $$$.Input(Row, "select", "", "Select Class");
        $$$.Option(this.SelectCat, "6", "Select Type");
        $$$.Option(this.SelectCat, "1", "Photo");
        $$$.Option(this.SelectCat, "2", "CabCard");
        $$$.Option(this.SelectCat, "3", "Insurance");
        $$$.Option(this.SelectCat, "4", "Inspection");
        $$$.Option(this.SelectCat, "5", "IFTA");
        $$$.Option(this.SelectCat, "0", "Misc");
        /*
        var Cat = $$$.Input(Left, "select", null, "Select Doc Category");
        
        
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
        $$$.Option(this.SelectClass, "Other", "Other");
        this.Notes = $$$.Input(Row, "textarea", "", "Notes");
        */
        Row = $$$.Dom(Root, "div", "Right");
        $$$.Button(Row, "Send", this.OnGo.bind(this));




        Row = $$$.Dom(Root, "div", "Bold", this.Data.Name);
        Row = $$$.Dom(Root, "div");
        var I = $$$.Dom(Row, "img", "Image", "");

        

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