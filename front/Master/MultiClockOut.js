
(function () {
    "use strict";
    let Root = $$$.ModPack.DomTarget;
    let Project = $$$.ModPack.Project;
    if (!"geolocation" in window.navigator) {
        alert("This Feature Requires Geolocation Service Enabled.");
        return;
    }
    let Data = [];
    let Geo = window.navigator.geolocation;
    let PosOpts = {};
    PosOpts.enableHighAccuracy = true;
    PosOpts.timeout = 60000;//60 secs
    PosOpts.maximumAge = 0;
    let GeoData = {};

    

    function OnGeoError() { alert("This Feature Requires Geolocation Service Enabled."); }
    function OnGeo(geodat) {
        GeoData = geodat;
        let Body = $$$.BodyPop();
        let Root = Body.Content();
        
        Body.Header("Multi User Clock Out (" + Project.Title + ")");
        let Row = $$$.Dom(Root, "div", "Bold OrangeFont", Project.Title);

        Row = $$$.Dom(Root, "div", "Left", "");
        function OnLoop(dat) {

            $$$.Dom(Row, "div", "Mar Pad Bold Flow BlueFont", dat.ScreenName);
        }
        $$$.Loop(Data, OnLoop);

        let Input = $$$.Input(Root, "textarea", "", "Task Notes");
        Row = $$$.Dom(Root, "div", "Right", "");
        $$$.Button(Row, "Finish", OnFinish);
        console.dir(GeoData);
        
        function OnFinIshLoop(dat) {
            let TheNotes = Input.value;
            TheNotes += " -> Multi Clock Out By:" + $$$.UserData.ScreenName;
            let Post = new FormData();
            Post.append("GeoLat", GeoData.coords.latitude);
            Post.append("GeoLong", GeoData.coords.longitude);
            Post.append("ProjectRID", Project.RID);
            Post.append("UserRID", dat.RID);
            Post.append("Notes", TheNotes);
            $$$.Post("ClockOut.htm", Post, function (stuff) {
                console.log("done");
            });
        }

        function OnFinish() {
            $$$.Loop(Data, OnFinIshLoop);
            Body.Exit();
            $$$.AuthUser();
        }
    }
    

    function OnClockOut() {
        Geo.getCurrentPosition(OnGeo, OnGeoError, PosOpts);
    }
    

    function OnSingleClockOut(dat) {
        
        function OnSingleGeo(geodat) {
            GeoData = geodat;
            let Body = $$$.BodyPop();
            let Root = Body.Content();

            Body.Header("Single User Clock Out (" + Project.Title + ")");
            let Row = $$$.Dom(Root, "div", "Bold OrangeFont", Project.Title);
            Row = $$$.Dom(Root, "div", "Bold BlueFont", dat.ScreenName);

            Row = $$$.Dom(Root, "div", "Left", "");
            let Input = $$$.Input(Root, "textarea", "", "Task Notes");
            Row = $$$.Dom(Root, "div", "Right", "");
            $$$.Button(Row, "Finish", function () {
                let TheNotes = Input.value;
                TheNotes += " -> Single Clock Out By:" + $$$.UserData.ScreenName;
                let Post = new FormData();
                Post.append("GeoLat", GeoData.coords.latitude);
                Post.append("GeoLong", GeoData.coords.longitude);
                Post.append("ProjectRID", Project.RID);
                Post.append("UserRID", dat.RID);
                Post.append("Notes", TheNotes);
                $$$.Post("ClockOut.htm", Post, function (stuff) {
                    Body.Exit();
                    $$$.AuthUser();
                });
            });
            
        }
        Geo.getCurrentPosition(OnSingleGeo, OnGeoError, PosOpts);
        
    }
    function OnLoop(dat) {
        
        let Target = $$$.Dom(Root, "div", "Mar Pad Bold Flow BlueFont Clicky", dat.ScreenName);
        Target.addEventListener("click", OnSingleClockOut.bind(this, dat));

    }
    function OnData(A) {

        if (A.length < 1) { return; }
        Data = A;
        $$$.Flush(Root);
        $$$.Loop(Data, OnLoop);
        $$$.Button(Root, "ClockOut All",OnClockOut);
    }
    function Refresh() {
        
        $$$.Query("select * from users where CurrentProject=" + Project.RID, OnData);

    }
    ////////////////////////////////////////////////////////////////////////////////////////////
    Refresh();

    
})();