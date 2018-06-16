(function () {
    "use strict";

    if (!"geolocation" in window.navigator) {
        alert("This Feature Requires Geolocation Service Enabled.");
         return;
    }

    let Geo = window.navigator.geolocation;
    let PosOpts = {};
    PosOpts.enableHighAccuracy = true;
    PosOpts.timeout = 60000;//60 secs
    PosOpts.maximumAge = 0;
    let GeoData = {};

    let Body = $$$.BodyPop();
    let Root = Body.Content();
    let Data = [];
    Body.Header("Multi User Clockin (" + $$$.SelectedProject.Title + ")");
    let Row = $$$.Dom(Root, "div", "Bold OrangeFont", $$$.SelectedProject.Title);
    
    

    let Results = $$$.Dom(Root, "div", "", "");

    Row = $$$.Dom(Root, "div", "Right", "");
    $$$.Button(Row, "Next", OnNext);

    
    ////////////////////////////////////////////////////////////////////////////////////////////
    function ClockInUser(dat) {
        
        let Post = new FormData();
        Post.append("GeoLat", GeoData.coords.latitude);
        Post.append("GeoLong", GeoData.coords.longitude);
        Post.append("UserRID", dat.RID);
        Post.append("ProjectRID", $$$.SelectedProject.RID);
        $$$.Post("ClockIn.htm", Post, function (reply) {
            //console.dir(reply);
        });
        
    }
    ////////////////////////////////////////////////////////////////////////////////////////////
    function OnNextLoop(dat) {
        if (dat.CheckBox.checked === true) {
            ClockInUser(dat);
        }
        //
       
        
    }
    function OnNext() {
        //console.dir(Data);
        //if(Data[yindex].CheckBox.Checked===true){}
        $$$.Loop(Data, OnNextLoop);
        Body.Exit();
        
        $$$.AuthUser();
        //window.location.reload(true);
        //$$$.Shout({ Channel: "ProjectList", Event: "Start" });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////
    function OnLoop(dat) {
        let Box = $$$.Dom(Results, "div", "Mar Pad Border Smooth", "");
        Row = $$$.Dom(Box, "div", "", "");
        dat.CheckBox = $$$.CheckBox(Row, dat.ScreenName);


        //let ScreenName = $$$.Dom(Row, "div", "Flow Bold OrangeFont", dat.ScreenName);
        //console.log(dat);
    }
    function OnData(A) {
        Data = A;
        $$$.Flush(Results);
        $$$.Loop(Data, OnLoop);
    }
    function Refresh() {
        $$$.Query("select * from users where Archive=0 and email !='Anonymous' and CurrentProject=0 order by screenname", OnData);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////
    Refresh();

    function OnGeoError() { Refresh();}
    function OnGeo(geodat) {
        GeoData = geodat;
        Refresh();
    }
    Geo.getCurrentPosition(OnGeo, OnGeoError, PosOpts);
})();