//For the preloader
(function (window, document) {
    "use strict";
    var ModName = "Template";

    

    console.log(ModName + " Loaded");
})(window, document);
//New Simple Load as needed then Run
(function (window, document) {
    "use strict";
    var ModName = "Template";
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

///Old Style Pub AND Sub...lets dump this crap
(function (window, document) {
    "use strict";
    var ModName = "Template";
    function ModOBJ() { }
    ModOBJ.prototype.Init = function (obj) {
        console.log(ModName);
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
