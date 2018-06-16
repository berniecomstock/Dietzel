(function (window, document) {
    "use strict";
    var ModName = "BackGround";

    

    var IdleTrigger = 1000;
    
    function OBJ() {
        this.DisplayIndex = 0;
    }
    OBJ.prototype.Counter = 0;
    OBJ.prototype.List = [];

    OBJ.prototype.Event = function (e) {
        this.Counter = 0;
    }
    

    OBJ.prototype.DoWork = function () {
        
        if (this.List.length < 1) { return; }
        if (this.DisplayIndex > this.List.length-1) { this.DisplayIndex = 0; }
        console.log("Index=" + this.DisplayIndex + " Count=" + this.List.length);
        var Path = $$$.HolePath + this.List[this.DisplayIndex].RID + this.List[this.DisplayIndex].DataType;
        $$$.BGImage(document.body, Path);
        this.DisplayIndex++;
        //var y = this.List.length;
        //var yindex = 0;
        //if (y < 1) { return; }
        //var R = $$$.RandNumber(0, y-1);
        //
        //$$$.BGImage(document.body, Path);
        
        

    }
    OBJ.prototype.Loop = function () {
        if (this.Counter > IdleTrigger) {
            this.DoWork();
            this.Counter = 0;
        }
        this.Counter++;
        requestAnimationFrame(this.Loop.bind(this));
    }
    OBJ.prototype.OnData = function (obj) {
        this.List = obj.json.Results;
        console.dir(this.List);
    }
    OBJ.prototype.Init = function (obj) {
        document.body.addEventListener("mousemove", this.Event.bind(this), false);
        document.body.addEventListener("keypress", this.Event.bind(this), false);
        this.Loop();
        var q = "select RID,DataType,Modified from holeuploads where datatype like '.jpg' or datatype like '.jpeg' or datatype like '.png' order by modified DESC Limit 0,1000";
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