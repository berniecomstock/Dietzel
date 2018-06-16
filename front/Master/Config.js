(function () {
    "use strict";
    if (!window.$$$) { window.$$$ = {}; console.log("$$$ Created"); }
    if (!$$$.Config) { $$$.Config = {}; }
    $$$.Config.ModRoot = "../01262018/";
    $$$.Config.Spaghetti = "../01262018/";
    $$$.Config.CompanyName = "Dietzel Enterprises, Inc.";
    document.title = $$$.Config.CompanyName;



    if (!$$$.Config) { $$$.Config = {}; }
    

    $$$.State = {

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


})();