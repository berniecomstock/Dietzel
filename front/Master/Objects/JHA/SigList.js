(function () {
    "use strict";
    let body = $$$.BodyPop();
    let element = new $$$.ElementOBJ(body.Content());
    

    let project = new $$$.ProjectOBJ($$$.SelectedProject);
    let q = "select *, ";
    q += " (select ScreenName from users where RID=UserRID) as ScreenName , ";
    q += "(SELECT DATE_FORMAT(Created,'%h:%i %p')) as TheTime , ";
    q += "(SELECT DATE_FORMAT(Created,'%a %b %D ')) as TheDay  ";
    q += " from jhasig where ProjectRID=" + project.RID;
    q += " order by created desc";

    element.div().setClass("Mar Pad Smooth White OrangeFont Big").text("Signed JHA List: "+project.Title);


    
    function SigOBJ(input) {
        let result = {
            Created: "", JHARID: 0, ProjectRID: 0, UserRID: 0, ScreenName: "", TheTime: "", TheDay: "",
            Weather: new $$$.WeatherOBJ({}),
        }
        return Object.assign(result, input);
    }


    function WeatherOut(element,data) {
        let e = new $$$.ElementOBJ(element);
        let w = $$$.WeatherOBJ(data);
        e.div().setClass("Flow MRight").text("Station: ");
        e.div().setClass("Flow MRight Bold").text(w.name);

        e.div().setClass("Flow MRight").text("Temp: ");
        e.div().setClass("Flow MRight Bold").text(w.main.temp);

        e.div().setClass("Flow MRight").text("Humidity: ");
        e.div().setClass("Flow MRight Bold").text(w.main.humidity + "%");

        e.div().setClass("Flow MRight").text("Pressure: ");
        e.div().setClass("Flow MRight Bold").text(w.main.pressure);

        e.div().setClass("Flow MRight").text("Cloud Cover: ");
        e.div().setClass("Flow MRight Bold").text(w.clouds.all + "%");

        let stuff = new $$$.ListOBJ(w.weather);

        stuff.Loop(function (data) {
            e.div().setClass("Flow MRight Bold").text(" "+data.description+",");
        })

        console.dir(stuff);
        console.dir(w);

    }
    function OnGeo(data) {
        //let w = data;
        let w=SigOBJ(data);
        //w.GeoLat
        //w.GeoLong
        
        console.dir(w);
        //return;
        var Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "Clear";
        $$$.Shout(Pack);
        Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "Show";
        $$$.Shout(Pack);
        Pack = {};
        Pack.Channel = "Map";
        Pack.Event = "AddMarker";
        Pack.GeoLat = w.Weather.GeoLat;
        Pack.GeoLong = w.Weather.GeoLong;
        Pack.GeoMarkup = w.ScreenName;
        //Pack.GeoMarkup += "<br>";
        //Pack.GeoMarkup += TimeSheet.JobName;
        //Pack.GeoMarkup += "<br>";
        //Pack.GeoMarkup += " In: ";
        //TheDate = moment(TimeSheet.StartTime).format("dddd MMM Do hh:mm a");
        //Pack.GeoMarkup += TheDate;
        $$$.Shout(Pack);
    }
    function OnSig(data) {

        let w = JSON.parse(data.Weather);
        data.Weather = $$$.WeatherOBJ(w);
        let sig = SigOBJ(data);
        let e = element.div().setClass("Mar Pad Smooth White");
        e.div().setClass("Flow  MRight RedFont").text(sig.TheTime);
        e.div().setClass("Flow  MRight Bold").text(sig.TheDay);
        e.div().setClass("Flow BlueFont Bold MRight").text(sig.ScreenName);
        e.div(document.createElement("i")).setClass("MIcon BlueFont Flow").text("location_on").Click(function () {
            OnGeo(sig);
        });
        WeatherOut(e.div().setClass("Flow"), data.Weather);
    };

    $$$.QueryFetch(q).then(function (data) { new $$$.ListOBJ(data).Loop(OnSig); });
})();