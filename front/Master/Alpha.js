/*
    Admin Spin Image
    Admin Move Pic Out of DHA to Docs
    */


(function (window, document) {
    window.$$$ = {};


    

    
    

    $$$.LoadCSS=function(url) {
        url = url.toUpperCase();
        var y = StyleLoadList.length;
        var yindex = 0;
        while (y != yindex) {
            if (StyleLoadList[yindex] === url) {
                return;
            }
            yindex++;
        }
        StyleLoadList.push(url);
        var CSS = document.createElement("link");
        var rnd = Math.floor(Math.random() * 8E4);
        CSS.href = $$$.CSSPath + url + "?r=" + rnd;
        CSS.rel = "stylesheet";
        document.head.appendChild(CSS);
        console.log("Style Load->>" + url);
    }

    
    //////////////////////////////////////////////////////////////////New Loaders
    var Scripts = [];
    var ScriptBackLog = [];
    var ScriptBackLogOBJ = [];
    function ScriptIsLoaded(name) {
        if (name in $$$) {
            return true;
        }
        return false;
    }
    function ScriptIsPending(name) {
        var y = Scripts.length;
        var yindex = 0;
        while (yindex != y) {
            if (Scripts[yindex] === name) {
                return true;
            }
            yindex++;
        }
        return false;
    }
    function RealeaseScript(name) {
        var y = ScriptBackLog.length;
        var yindex = 0;
        while (yindex != y) {
            if (ScriptBackLog[yindex] === name) {
                $$$[name](ScriptBackLogOBJ[yindex]);
                ScriptBackLog[yindex] = "";
                ScriptBackLogOBJ[yindex] = {};
            }
            yindex++;
        }
    }
    $$$.LoadScript = function (name, obj) {
        //console.log("Load=" + name);
        if (ScriptIsLoaded(name)) {
            if (name in $$$) {
                $$$[name](obj);
            } else {
                console.log(name + " Not Found on $$$");
            }
            return;
        }
        if (ScriptIsPending(name)) {
            ScriptBackLog.push(name);
            ScriptBackLogOBJ.push(obj);
            return;
        }
        Scripts.push(name);
        ScriptBackLog.push(name);
        ScriptBackLogOBJ.push(obj);
        function OnLoad() {
            RealeaseScript(name);
        }
        var rnd = Math.floor(Math.random() * 8E4);
        var url = $$$.JSPath + name + ".js?r=" + rnd;
        var script = document.createElement("script");
        script.onload = OnLoad.bind(this);
        script.src = url;
        document.head.appendChild(script);
    };
    
    $$$.PreLoadScript = function (name, callback) {
        if (ScriptIsLoaded(name)) {return;}
        Scripts.push(name);
        function OnLoad() {
            callback();
        }
        var rnd = Math.floor(Math.random() * 8E4);
        var url = $$$.JSPath + name + ".js?r=" + rnd;
        var script = document.createElement("script");
        script.onload = OnLoad.bind(this);
        script.src = url;
        document.head.appendChild(script);
    };
    //////////////////////////////////////////////////////////////////Loaders

    $$$.Shout = Shout;
    $$$.Listen = Listen;

    

    

    $$$.RunOnce = function (obj) {
        
    };
})(window, document);