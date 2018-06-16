/// <reference path="$$$.js" />
/// <reference path="Objects/ElementOBJ.js" />
/// <reference path="Objects/ProjectOBJ.js" />


(function (window, document) {
    "use strict";
    var ModName = "Project.View";
    
    
    function OBJ() { }
    OBJ.prototype.Data = {};
    OBJ.prototype.Root = null;
    OBJ.prototype.Archive = false;

    OBJ.prototype.On = function () { }
    OBJ.prototype.OnHole = function () {
        //var Pack = {};
        //Pack.Project = this.Data;
        //Pack.UserData = $$$.UserData;
        //$$$.LoadScript("Hole", Pack);
        $$$.holeproject = new $$$.ProjectOBJ(this.Data);
        $$$.script($$$.Config.ModRoot+"Objects/project/holes/list", true);

    }
    OBJ.prototype.OnReceipt = function () {
        var Pack = {};
        Pack.Channel = "ReceiptList";
        Pack.Event = "Start";
        Pack.ProjectRID = this.Data.RID;
        Pack.UnitRID = 0;
        Pack.UserData = $$$.UserData;
        Pack.Header = this.Data.Title;
        $$$.Shout(Pack);
    }
    
    OBJ.prototype.OnDocs = function () {
        
        let P = new $$$.ProjectOBJ(this.Data);
        P.DocList.Output(this.DocRow);
    }
    OBJ.prototype.OnPopBack = function () { this.Output(); }
    OBJ.prototype.OnContacts = function () {
        var Pack = {};
        Pack.Project = this.Data;
        Pack.UserData = $$$.UserData;
        Pack.Target = this.DataBlock;
        Pack.callback = this.OnPopBack.bind(this);
        $$$.LoadScript("ProjectContacts", Pack);
    }
    OBJ.prototype.OnSite = function () {
        var Pack = {};
        Pack.Channel = "ProjectSite";
        Pack.Event = "Start";
        Pack.Project = this.Data;
        Pack.UserData = $$$.UserData;
        Pack.callback = this.OnPopBack.bind(this);
        $$$.Shout(Pack);
    }
    OBJ.prototype.OnDHA = function () {
        $$$.SelectedProject = this.Data;
        $$$.Run("JHA");

    }
   
    OBJ.prototype.OnMultiClockIn = function () {
        $$$.SelectedProject = this.Data;
        $$$.Run("MultiClockIn");
    }
    OBJ.prototype.ButtonOutput = function (obj, Row) {
        $$$.Button(Row, "Site", this.OnSite.bind(this));
        $$$.Button(Row, "Contacts", this.OnContacts.bind(this));
        $$$.Button(Row, "JobDocs", this.OnDocs.bind(this));
        $$$.Button(Row, "Receipt", this.OnReceipt.bind(this));
        $$$.Button(Row, "Holes", this.OnHole.bind(this));
        $$$.SelectedProject = new $$$.ProjectOBJ(this.Data);
        $$$.Button(Row, "JHA", function () {
            $$$.LoadObject("JHA/JHA");
        });
        $$$.Button(Row, "JHA List", function () {
            $$$.LoadObject("JHA/SigList");
        });
        if ($$$.MakeNumber($$$.UserData.Type) === 1000) {

            $$$.Button(Row, "MultiClockIn", this.OnMultiClockIn.bind(this));
        }

        if ($$$.MakeNumber(this.Data.Type) === 300) {
            $$$.Button(Row, "Make Active", this.OnMakeActive.bind(this));
        }


        if (this.Data.GeoLink) {
            $$$.Button(Row, "Map", function () {
                window.open(this.Data.GeoLink, "_blank");
            }.bind(this));
        }
    }
    OBJ.prototype.Output = function (obj) {
        $$$.Flush(this.Root);
        var Row = null;
        var Title = $$$.Dom(this.Root, "div", "Big Bold OrangeFont Clicky", this.Data.Title);
        Row = $$$.Dom(this.Root, "div", "Bold");
        new $$$.SmartText(Row, this.Data, "SubTitle", "Projects");
        Row = $$$.Dom(this.Root, "div", "Dent");
        new $$$.SmartText(Row, this.Data, "Description", "Projects");
        
        
        new $$$.TimeClockOBJ({ DomTarget: this.Root, ProjectRID: this.Data.RID, UserRID: $$$.UserData.RID });



        var Row = $$$.Dom(this.Root, "div", "Left", "");
        this.ButtonOutput(obj, Row);

        this.DocRow = $$$.Dom(this.Root, "div", "", "");

        if ($$$.MakeNumber($$$.UserData.Type) === 1000) {
            Row = $$$.Dom(this.Root, "div", "Mar Pad Border Smooth", "");
            $$$.ModPack.Project = this.Data;
            $$$.ModPack.DomTarget = Row;
            $$$.Run("MultiClockOut");

        }
        
        Title.addEventListener("click", this.Output.bind(this, obj), false);

        
    }

    OBJ.prototype.OnMakeActiveCallback = function () {
        $$$.Shout({ Channel: "ProjectList", Event: "Start" });
    }
    OBJ.prototype.OnMakeActive = function () {
        var Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = this.OnMakeActiveCallback.bind(this);
        Pack.PostData.append("Table", "Projects");
        Pack.PostData.append("FName", "Type");
        Pack.PostData.append("RID", this.Data.RID);
        Pack.PostData.append("FVal", 200);
        $$$.Server(Pack);
    }
    OBJ.prototype.ArchiveOutput = function () {
        $$$.Flush(this.Root);
        var Row = null;
        var Title = $$$.Dom(this.Root, "div", "Big Bold OrangeFont", this.Data.Title);
        var SubTitle = $$$.Dom(this.Root, "div", "Bold", this.Data.SubTitle);
        var Description = $$$.Dom(this.Root, "p", "Dent", this.Data.Description);


        var Row = $$$.Dom(this.Root, "div", "Right");
        var Button = $$$.Button(Row, "Make Active ", this.OnMakeActive.bind(this));

    }
    OBJ.prototype.Init = function (obj) {
        this.Data = obj.Project;
        this.Root = obj.Target;

        if ($$$.MakeNumber(this.Data.Type) === 300) {
                        this.Output();
        }
        else {
            this.Output();
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

