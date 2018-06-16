(function (window, document) {
    "use strict";
    var ModName = "Shout";
    if ($$$.FrontDoorOBJ) {
        $$$.FrontDoorOBJ.Stop();
    }
    let Callback = function () {
        if ($$$.UserData.Type === 1000) {
            $$$.LoadScript("AdminMenu", {});
            return;
        }
        if ($$$.UserData.Type === 100) {
            $$$.LoadScript("CrewMenu", {});
            return;
        }
    }

    function OnOldStyle(dat) {
        let Box = $$$.Dom($$$.Content, "div", "Mar Pad Border Smooth");
        $$$.Dom(Box, "div", "Bold Crop Pad", dat.Title);
        $$$.Dom(Box, "div", "Bold Crop Pad", dat.SubTitle);
        $$$.Dom(Box, "div", "Dent Pad", dat.Data);
        let Row = $$$.Dom(Box, "div", "Right");
        $$$.Button(Row, "Close", OnClose.bind(this));
        $$$.Button(Row, "Delete", OnDelete.bind(this));
        function OnClose() { Box.style.display = "none"; }
        function OnDelete() {
            Box.style.display = "none";
            $$$.Query("delete from shout where rid=" + dat.RID, Refresh);
        }

    }

    function OnLoop(dat) {

        let Data = {};
        let OldStyle = false;
        try { Data = JSON.parse(dat.Data); }
        catch (e) { OldStyle = true; }
        if (OldStyle) { return OnOldStyle(dat); }
        let Box = $$$.Dom($$$.Content, "div", "Mar Pad Border Smooth");
        $$$.Dom(Box, "div", "Bold", dat.Title);
        $$$.Dom(Box, "div", "Bold", dat.SubTitle);

        function OnElement(element) {
            let Style = "";
            let Temp = $$$.Dom(Box, "div", "", element.Content);
            if (element.Bold) { Style += " Bold"; }
            if (element.Type === "LINE") {
                Style += " Crop Pad";
            }
            if (element.Type === "BLOB") {
                Style += " Dent Pad";
            }

            Temp.className = Style;
            //console.dir(element);
        }

        $$$.Loop(Data, OnElement);

        let Row = $$$.Dom(Box, "div", "Right");
        $$$.Button(Row, "Close", OnClose.bind(this));
        $$$.Button(Row, "Delete", OnDelete.bind(this));

        function OnClose() { Box.style.display = "none"; }
        function OnDelete() {
            Box.style.display = "none";
            $$$.Query("delete from shout where rid=" + dat.RID, Refresh);
        }
    }

    function OnData(dat) {
        if (dat.length === 0) { return Callback(); }

        $$$.Loop(dat, OnLoop);
        let Row = $$$.Dom($$$.Content, "div", "Right");
        $$$.Button(Row, "Continue to Site-->", Callback);
    }
    function Refresh() {
        $$$.Flush($$$.Content);
        var q = "select * from shout where UserRID=" + $$$.UserData.RID;
        $$$.Query(q, OnData);
    }

    Refresh();
    
    

})(window, document);