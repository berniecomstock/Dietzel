(function () {
    /////////////////////////////////////////////////////////////ModHeader
    /////////////////////////////////////////////////////////////ModHeader
    /////////////////////////////////////////////////////////////ModHeader
    "use strict";
    
    if (!window.$$$) { window.$$$ = {}; console.log("$$$ Created"); }
    if (!$$$.Config) { $$$.Config = {}; }
    if (!$$$.State) { $$$.State = {}; }
    
    window.$$$.State = {

        Network: false,
        NetworkJobQ: [],
        NetworkBusy: true,
        EventSystem: false,
        Frame: 1,
        StartTime: Date.now(),
        WorldTime: 0,
        DeltaTime: 0,
        LastFrameTime: 0,
        LastFrameDelta: 0,
        Dependants: [],
        EndTime: 0,

        FPS: 0,
        DeltaTarget: 60,
        Auth: false,
        GoogleMaps: false,
        BootStrap: 0,
        Questions: 0,
        Answers: 0,
        IdleTime: 0,
        LastUserInput: 0,



    };
    $$$.Config.Chrome = false;
    $$$.Config.UID = $$$.State.StartTime;

    $$$.now = function () { return $$$.State.DeltaTime; };
    $$$.seconds = function () { return $$$.State.DeltaTime / 1000; };

    

    $$$.IsEvent = function (input) { };
    $$$.GetEventProperties = function (input) { };
    
    $$$.IsGoogleChrome = function () {
        let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        return isChrome;
    }
    $$$.Config.Chrome = $$$.IsGoogleChrome();
    $$$.IsString = function (obj) { if (typeof obj === "string") { return true; } return false; }
    $$$.IsNumber = function (obj) { if (typeof obj === "number") { return true; } return false; }
    $$$.IsBool = function (obj) { if (typeof obj === "boolean") { return true; } return false; }
    $$$.IsFunc = function (obj) { if (typeof obj === "function") { return true; } return false; }
    $$$.IsFormData = function (obj) { if (obj instanceof FormData) { return true; } return false; }
    $$$.IsArray = function (obj) { if (obj instanceof Array) { return true; } return false; }
    $$$.IsElement = function (obj) { if (obj instanceof Element) { return true; } return false; }
    $$$.IsObject = function (obj) { if (obj instanceof Object) { return true; } return false; }
    $$$.AppendLog = function (input) { $$$.Log.push(input); };
    function Log(input) { $$$.Log.push(input); };

   
    
    function Insert (name, callback) {

        let Path = $$$.Config.ModRoot + name + ".js?r=" + $$$.Config.UID;
        let s = document.createElement("script");
        function OnLoad() {
            callback(name);
        }
        s.addEventListener("load", OnLoad, false);
        s.src = Path;
        document.head.appendChild(s);
    }
    
    $$$.LoadList = [
        "PolyOBJ", "UtilityOBJ", "ListOBJ", "EventOBJ",
        "EngineOBJ", "ConnectionOBJ",
        "DeltaOBJ", "GeoObJ",
        "TimeClockOBJ", "ElementOBJ", "DocumentOBJ", "OldShit",
        "UserOBJ", "ProjectDOCOBJ", "ProjectDOCListOBJ", "ProjectOBJ", "ClientOBJ",
        "BodyOBJ", "JournalOBJ",
    ];

    /*
    $$$.LoadList = [
        "PolyOBJ", "UtilityOBJ", "ListOBJ", "EventOBJ",
        "EngineOBJ", "ConnectionOBJ",
        "DeltaOBJ", "LocationOBJ", "ElementOBJ", "GeoObJ",
        "TimeClockOBJ", "DocumentOBJ", "OldShit", "UserOBJ", "ProjectOBJ", "ClientOBJ",
        "BodyOBJ", "JournalOBJ",
    ];*/
    function OnLoaded(name) {
        Load();
    };
    
    function Load() {
        if ($$$.LoadList.length < 1) { console.log("Load List Empty");return; };
        let mod = $$$.LoadList.shift();
        Insert(mod, OnLoaded);
        
    }
    Load();
    
    
    
    

})();