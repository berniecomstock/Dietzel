(function () {
    "use strict";
    let template = {
        Name: "",
        Task: {},
        Steps: [],
        ppe: [],
        ppe2: [],

    };
    let project = new $$$.ProjectOBJ($$$.JHA.Project);
    let body = $$$.BodyPop();
    let element = new $$$.ElementOBJ(body.Content());
    //element.div().text(project.JHARID);

    let SigData = {
        RID: 0, Created: "", UserRID: 0, ProjectRID: 0, JHARID: 0, Weather: $$$.WeatherOBJ({})
    };

    function Sign() {
        console.dir(SigData);
        let q = "insert into JHASIG (Created, UserRID, ProjectRID, JHARID, Weather) values (now(),";
        q += $$$.JHA.User.RID + ",";
        q += $$$.JHA.Project.RID + ",";
        q += template.RID + ",";
        q += "'" + JSON.stringify(SigData.Weather) + "')";
        //q += "'0')";

        console.log(q);
        $$$.QueryFetch(q).then(function () { body.Exit(); });
    }


    function HazOut(element, data) {
        let list = new $$$.ListOBJ(data);
        let e = new $$$.ElementOBJ(element);
        e.Flush();
        e.setClass("Mar Pad");
        
        function Out(data) {
            e.div().setClass("Mar Pad Border Smooth")
            .div().setClass("RedFont Bold").text(data.Hazard)
            .div().setClass("GreenFont NotBold").text(data.Action)
        }
        
        list.Loop(Out);
    }
    function StepOut(element, data) {
        let e = new $$$.ElementOBJ(element);
        e.Flush();
        e.setClass("Border Mar Pad Smooth");
        e.div().setClass("BlueFont Bold").text(data.Val);
        let q = "select * from jhastephazards where JHAStepID=" + data.RID;
        q = "select *, ";
        q += " (select Hazard from jhahazact where RID = JHAHazActID ) as Hazard , ";
        q += " (select Action from jhahazact where RID = JHAHazActID ) as Action";
        q += " from jhastephazards where JHAStepID=" + data.RID;

        //e.div().setClass("").text(q)

        $$$.QueryFetch(q).then(function (data) { HazOut(e.div(), data); });


        
    }

    function clearJHARID() {
        
        let q = "update projects set JHARID = 0 where RID=" + $$$.JHA.Project.RID;
        $$$.QueryFetch(q).then(function (data) {
            body.Exit();
            $$$.LoadObject("JHA/JHA");
        });
    }


    function PPEOUT(e){
        let y = template.ppe.length;
        let yindex = 0;
        while (yindex != y) {
            e.div().setClass("Flow MRight Bold").text(template.ppe[yindex].Val+", ");
            yindex++;

        }
    }
    function PPE2OUT(e) {
        let y = template.ppe2.length;
        let yindex = 0;
        while (yindex != y) {
            e.div().setClass("Flow MRight Bold").text(template.ppe2[yindex].Val + ", ");
            yindex++;

        }
    }
    function Output() {
        element.Flush();
        let e = element.div();
        e.setClass("Mar Pad Smooth White Flex");
        e.div().setClass("MRight").text("Project: ");
        e.div().setClass("OrangeFont Bold").text(project.Title);

        e = element.div();
        e.setClass("Mar Pad Smooth White");
        e.div().setClass("MRight Flow").text("Template: ");
        e.div().setClass("Flow BlueFont Bold MRight").text(template.Name);
        e.div().text("clear").setClass("Flow RedFont").Click(clearJHARID);

        e = element.div();
        e.setClass("Mar Pad Smooth White Flex");
        e.div().setClass("MRight").text("Primary Task: ");
        e.div().setClass("BlueFont Bold").text(template.Task.Val);

        e = element.div();
        e.setClass("Mar Pad Smooth White Flex");
        e.div().setClass("MRight").text("Time:");
        e.div().setClass("BlueFont Bold MRight").text(new Date().toLocaleTimeString());
        e.div().setClass("MRight").text("Date:");
        e.div().setClass("BlueFont Bold").text(new Date().toLocaleDateString());


        //Geo
        e = element.div();
        e.setClass("Mar Pad Smooth White Flex");
        e.div().setClass("BlueFont Bold MarRight").text("GeoLocation:");

        //Weather
        e = element.div();
        e.setClass("Mar Pad Smooth White");
        let weather=e.div().setClass("")

        $$$.WeatherReport().then(function (data) {
            let result = $$$.WeatherOBJ(data);
            SigData.Weather = result;
            weather.div().setClass("BlueFont Bold Flow MRight").text("Weather:");
            weather.div().setClass("Flow MRight").text("Temp:" + result.main.temp);
            weather.div().setClass("Flow MRight").text("Humidity:" + result.main.humidity);
            weather.div().setClass("Flow MRight").text("Pressure:" + result.main.pressure);
            weather.div().setClass("Flow MRight").text("Clouds:" + result.clouds.all+"%");
            weather.div().setClass("Flow MRight").text("Station:" + result.name);


            //weather.div().setClass("BlueFont Bold Flow").text("Weather:");
            //weather.div().setClass("BlueFont Bold Flow").text("Weather:");

            console.dir(result);
        });
        

        

        //OverHead
        e = element.div();
        e.setClass("Mar Pad Smooth White Flex");
        e.div().setClass("BlueFont Bold MarRight").text("Overhead Obstructions:");


        //PPE Required
        e = element.div();
        e.setClass("Mar Pad Smooth White Flex");
        let ppeout=e.div().setClass("BlueFont Bold MarRight").text("PPE Required:");
        PPEOUT(ppeout);
        
       

        //Unique PPE
        e = element.div();
        e.setClass("Mar Pad Smooth White Flex");
        let ppe2out=e.div().setClass("BlueFont Bold MarRight").text("Unique PPE:");
        PPE2OUT(ppe2out);

        //Sign
        e = element.div();
        e.setClass("Mar Pad Smooth White Right");
        e.div().setClass("").Button("Sign", Sign).setClass("RedFont");


        //Sequence of steps
        e = element.div();
        e.setClass("Mar Pad Smooth White");
        e.div().setClass("BlueFont Bold MarRight").text("Sequence of steps:");
        let y = template.Steps.length;
        let yindex = 0;
        while (yindex != y) {
            StepOut(e.div(),template.Steps[yindex])
            yindex++;
        }
        

    }

    function OnData(data) {
        
        
        let val = JSON.parse(data[0].Val);
        data[0].Val = {};
        Object.assign(template, val);
        Object.assign(template, data[0]);
        //Steps: new $$$.ListOBJ(),
        //template.Steps.Assign(template.Steps);
        //val = template.Steps;
        //template.Steps = new $$$.ListOBJ(val);
       
        Output();
    }
    let q = "select *,"
    q += "(select ScreenName from users where rid=CreatedBY) as Creator ";
    q+=" from jha where rid=" + project.JHARID;
    
    $$$.QueryFetch(q)
        .then(function (data) { OnData(data); });
})();