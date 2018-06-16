(function (window, document) {
    "use strict";
    var ModName = "UserMessageOBJ";
    function OBJ() { }
    OBJ.prototype.Data = {};
    OBJ.prototype.Root = null;
    OBJ.prototype.OnRead = function () {
        var Box = $$$.Dom($$$.Pop(), "div", "Mar Pad Border Smooth");
        $$$.Dom(Box, "div", "Bold Left BlueFont", this.Data.FromName);
        $$$.Dom(Box, "div", "", this.Data.Title);
        $$$.Dom(Box, "div", "", this.Data.SubTitle);
        $$$.Dom(Box, "div", "", this.Data.Data);
    }
    OBJ.prototype.Init = function (obj) {
        this.Data = obj;
        this.Root = $$$.Dom(this.Data.Target, "div", "Mar Pad Smooth Border Flow");
        $$$.Dom(this.Root, "div", "Mar Pad Flow Bold BlueFont", this.Data.FromName);
        $$$.Dom(this.Root, "div", "Mar Pad Flow Bold Clicky", this.Data.Title).onclick = this.OnRead.bind(this);
    }
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;
})(window, document);