(function (window, document) {
    "use strict";
    var ModName = "ProjectMenu";
    function OBJ() { }
    OBJ.prototype.Init = function (obj) {

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);