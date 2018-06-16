(function (window, document) {
    "use strict";
    var ModName = "Hole";

    function HoleOBJ() { }
    HoleOBJ.prototype.Project = {};
    HoleOBJ.prototype.Hole = {};
    HoleOBJ.prototype.Target = null;
    HoleOBJ.prototype.Open = function () {

        $$$.LoadScript("OpenHole", {Project:this.Project,Hole:this.Hole,Target:this.Target});
    }

    HoleOBJ.prototype.Init = function (obj) {
        this.Project = obj.Project;
        this.Hole = obj.Hole;
        this.Target = obj.Target;
        //$$$.Text(this.Target, this.Hole.Name);
        this.Target.className = "Mar Pad Border Smooth Flow Bold Clicky";
        this.Target.onclick = this.Open.bind(this);
        new $$$.SmartText(this.Target, this.Hole, "Name", "Hole");
    }
    ///////////////////////////////////////////////////////////////////////
    function OBJ() { }
    OBJ.prototype.List = [];
    OBJ.prototype.Project = {};
    OBJ.prototype.Root = null;
    OBJ.prototype.FormRoot = null;
    OBJ.prototype.ListRoot = null;
    OBJ.prototype.Form = function (obj) {
        
    }
    OBJ.prototype.ListHoles = function (obj) {
        $$$.Flush(this.ListRoot);
        var y = this.List.length;
        var yindex = 0;
        while (yindex != y) {
            var Target = $$$.Dom(this.ListRoot, "div", "");
            var Temp = new HoleOBJ();
            Temp.Init({ Project: this.Project, Hole: this.List[yindex], Target: Target });
            yindex++;

        }
    }
    OBJ.prototype.OnList = function (obj) {
        //console.dir(obj);
        this.List = obj.json.Results;
        this.ListHoles();
    }
    OBJ.prototype.GetList = function (obj) {
        var q = "Select * from holes where projectrid=" + this.Project.RID;
        $$$.MySql(q, this.OnList.bind(this));
    }
    /*
    
    */
    OBJ.prototype.NewHoleInput = null;
    OBJ.prototype.OnNewHole = function () {

        if (this.NewHoleInput.value.length < 2) { alert("Please Enter a Name"); return;}
        $$$.UnPop();
        var Pack = $$$.NewPack();
        Pack.url = "NewHole.htm";
        Pack.callback = this.GetList.bind(this);
        Pack.PostData.append("ProjectRID", this.Project.RID);
        Pack.PostData.append("Name", this.NewHoleInput.value);
        $$$.Server(Pack);
        
    }
    OBJ.prototype.OnNewButton = function () {
        
        var Root = $$$.Pop();
        var Container = $$$.Dom(Root, "div", "Container Center");
        var Box = $$$.Dom(Container, "div", "W300 Flow Pad Mar Border Smooth");

        //var Box = $$$.Dom(Root, "div", "W300");
        var Row = $$$.Dom(Box, "div", "");
        this.NewHoleInput = $$$.Input(Row, "input", "text", "Name");
        Row = $$$.Dom(Box, "div", "Right");
        $$$.Button(Row, "Cancel", function () { $$$.UnPop(); });
        $$$.Button(Row, "Ok", this.OnNewHole.bind(this));

    }
    OBJ.prototype.Init = function (obj) {
        this.Root = $$$.Pop();
        this.Project = obj.Project;
        var Row = $$$.Dom(this.Root, "div", "OrangeFont Bold Big", this.Project.Title);
        Row = $$$.Dom(this.Root, "div", "Right");
        $$$.Button(Row, "New Hole", this.OnNewButton.bind(this));
        this.FormRoot = $$$.Dom(this.Root, "div", "");
        this.ListRoot = $$$.Dom(this.Root, "div", "");
        this.GetList();

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);
