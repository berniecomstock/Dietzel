(function (window, document) {
    "use strict";
    var ModName = "TheServer";
    console.log(ModName + " Loading");
    $$$.QOBJ = function () { };
    $$$.QOBJ.prototype = Object.create(Array.prototype);
    $$$.QOBJ.prototype.PutBottom = function (obj) {
        this.push(obj);
    }
    $$$.QOBJ.prototype.GetTop = function () {
        return this.shift();
    }
    var Q = new $$$.QOBJ();
    var ConnID = 0;
    var Threads = 0;
    var MaxThreads = 1;



    function Short(obj) {
        //console.log("Short...");
        Threads++;
        var Connection = new XMLHttpRequest();
        function Event(e) {
            switch (e.type) {
                case "error":
                    Threads--;
                    window.location.reload(true);
                    break;
                case "load":
                    Threads--;
                    try { obj.json = JSON.parse(Connection.responseText); }
                    catch (e) { obj.ServerRaw = Connection.responseText; }
                    obj.callback(obj);
                    break;
                default:
                    //console.log("***Down->" + e.type);
                    break;
            }
        }

        Connection.onload = Event.bind(this);
        Connection.onerror = Event.bind(this);
        Connection.onprogress = Event.bind(this);
        Connection.open("POST", obj.url, true, null, null);
        Connection.send(obj.PostData);
        

    }

    function Loop() {
        if (Q.length < 1) { return requestAnimationFrame(Loop); }
        if (Threads > MaxThreads) { return requestAnimationFrame(Loop); }
        Short(Q.GetTop());
        requestAnimationFrame(Loop);
    }
    Loop();

    function Run(obj) {
        
        Q.PutBottom(obj);

    }
    $$$[ModName] = Run;




})(window, document);




