(function (window, document) {

    "use strict";
    var ModName = "Docs";
    function DocOBJ() { }
    DocOBJ.prototype.Root = false;
    DocOBJ.prototype.Data = [];

    DocOBJ.prototype.Init = function (obj) {
        this.Data = obj;
        this.Root = $$$.Dom(obj.Target, "div", "Mar Pad Border Smooth Flow");
        var Row = null;
        Row = $$$.Dom(this.Root, "div", "Flow Mar Pad");        
        ////RID, DataType, UserID, Modified, ProjectRID, Name, ACL, Archive
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
        Row = $$$.Dom(this.Root, "div", "Bold TextLeft OrangeFont Flow Mar Pad", this.Data.Title);
        Row = $$$.Dom(this.Root, "div", "Flow Mar Pad");
        new $$$.XEditText(Row, "binuploads", this.Data, "Name", "Name");

    }


    function OBJ() { }
    OBJ.prototype.RID = 0;
    OBJ.prototype.Admin = false;
    OBJ.prototype.Root = false;
    OBJ.prototype.Data = [];
    OBJ.prototype.Output = function () {
        $$$.Flush(this.Root);
        ////RID, DataType, UserID, Modified, ProjectRID, Name, ACL, Archive
        var y = this.Data.length;
        var yindex = 0;
        while (yindex != y) {
            var Temp = new DocOBJ();
            var Pack = this.Data[yindex];
            Pack.Target = this.Root;

            Temp.Init(Pack);
            yindex++;
        }
    }
    OBJ.prototype.OnData = function (obj) {
        
        this.Data = obj.json.Results;
        this.Output();

    }

    OBJ.prototype.Init = function (obj) {
        $$$.Flush($$$.Content);
        this.Root = $$$.Dom($$$.Content, "div", "", "");
        if ("Project" in obj) {
            this.RID = $$$.MakeNumber(obj.Project.RID);
        }
        if ("Admin" in obj) {
            this.Admin = true;
        }
        

        var q = "select *, ";
        q += " (select Title from projects where rid=ProjectRID) As Title ";
        q+=" from binuploads order by modified desc";
        $$$.MySql(q, this.OnData.bind(this));
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);