(function (window, document) {
    "use strict";
    var ScriptLoad = [];
    var LoadPendingShouts = [];
    var Listeners = [];
    var StyleLoadList = [];
    function LoadScript(obj) {
        var y = ScriptLoad.length;
        var yindex = 0;
        while (y != yindex) {
            if (ScriptLoad[yindex] === obj.Channel) {
                return;
            }
            yindex++;
        }
        ScriptLoad.push(obj.Channel);
        obj.LoadPending = 1;
        var rnd = Math.floor(Math.random() * 8E4);
        var url = $$$.JSPath + obj.Channel + ".js?r=" + rnd;
        var script = document.createElement("script");
        script.src = url;
        document.head.appendChild(script);
    }
    function ReleaseChannel(channel) {
        if (LoadPendingShouts.length < 1) {
            return;
        }
        var ToBeReleased = [];
        while (1) {
            var Result = $$$.FindInArray(LoadPendingShouts, "Channel", channel);
            if (Result < 0) {
                break;
            }
            ToBeReleased.push(LoadPendingShouts[Result]);
            LoadPendingShouts.splice(Result, 1);
        }
        var y = ToBeReleased.length;
        var yindex = 0;
        while (yindex != y) {
            ToBeReleased[yindex].LoadPending = 0;
            $$$.Shout(ToBeReleased[yindex]);
            yindex++;
        }
    }

    function Listen(obj) {
        Listeners.push(obj);
        ReleaseChannel(obj.Channel);
    }
    function Dispatch(obj) {
        var y = Listeners.length;
        var yindex = 0;
        switch (obj.Channel) {
            case "Omni":
                while (yindex != y) {
                    Listeners[yindex].callback(obj);
                    yindex++;
                }
                break;
            default:
                while (yindex != y) {
                    if (Listeners[yindex].Channel === obj.Channel) {
                        Listeners[yindex].callback(obj);
                    }
                    yindex++;
                }
                break;
        }
    }
    function Shout(obj) {
        console.log("Fix This************************************************************************");
        console.dir(obj);
        if (obj.Channel === "Omni") {
            Dispatch(obj);
            return;
        }
        LoadScript(obj);
        if (obj.LoadPending === 1) {
            LoadPendingShouts.push(obj);
            return;
        }
        var Find = $$$.FindInArray(LoadPendingShouts, "Channel", obj.Channel);
        if (Find > -1) {
            LoadPendingShouts.push(obj);
            return;
        }
        Dispatch(obj);
    }
    $$$.FindInArray = function (arr, name, val) {
        var y = arr.length;
        var yindex = 0;
        while (yindex != y) {
            if (name in arr[yindex] && arr[yindex][name] == val) {
                return yindex;
            }
            yindex++;
        }
        return -1;
    };

    $$$.Shout = Shout;
    $$$.Listen = Listen;

})(window, document);
