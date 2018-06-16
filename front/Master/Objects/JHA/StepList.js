/*
List Step
New Step
Delete Selected
Use Selected


*/

(function () {
    "use strict";

    let List = new $$$.ListOBJ();
    let Element = new $$$.ElementOBJ($$$.JHA.StepListElement);
    Element.Flush();
    Element.setClass("Mar Pad Smooth White");
    Element.div().setClass("BlueFont Big").text("Select Steps.");
    let ListElement = Element.div();
    let Footer = Element.div().setClass("Right");
    
    let NextElement = new $$$.ElementOBJ();
    let DeleteElement = new $$$.ElementOBJ();
    $$$.JHA.Steps.length = 0;


    function OnNextButton() {

        
        
        let result = {
            Task: $$$.JHA.Task,
            ppe: $$$.JHA.ppe,
            ppe2: $$$.JHA.ppe2,
            Steps:$$$.JHA.Steps,
        };
        let Val = JSON.stringify(result);
        let q = "insert into jha (Created, Name, CreatedBy, Val) values ("
        q += "now() , '" + $$$.JHA.Name.prepVal + "' , " + $$$.JHA.User.RID + " , '" + Val + "')";
        $$$.QueryFetch(q).then(function () {
            $$$.JHA.NewTemplateExit();
            $$$.LoadObject("JHA/JHA");
        });
        



    };


    function OnSelect(data) {
        let LIST = $$$.JHA.Steps;
        if (data.Selected) {
            $$$.JHA.AddTemplateStep(data);
        }
        else {
            $$$.JHA.RemoveTemplateStep(data);
        }

        if (LIST.length > 0) {
            NextElement.setClass("Center Mar Flow");
            DeleteElement.setClass("Center Mar Flow");
        }
        else {
            NextElement.setClass("None");
            DeleteElement.setClass("None");
        }
    }
    function OnDelete(data) {
        let TheObject = data;
        console.log("Delete", TheObject);
        let q = "delete from jhastephazards where JHAStepID=" + TheObject.RID;
        console.log(q);
        $$$.QueryFetch(q).then(data=> {
            let q = "delete from jhastep where RID=" + TheObject.RID;
            console.log(q);
            return $$$.QueryFetch(q);
        }).then(data=>{
            Refresh();
        });
    }
    function OnNew() {
        Footer.Flush();
        Footer.setClass("");
        $$$.getLine(Footer, "New Step Name", "New Step Name", "").then(data=> {
            let Result = $$$.getlineOBJ(data);
            let q = "insert into jhastep (Val) values ('" + Result.prepVal + "')";
            return $$$.QueryFetch(q);
        }).then(Refresh).catch(Refresh);
    }
    function NewButton() {
        let Wrapper, Butt = null;
        Wrapper = Footer.div();
        Wrapper.setClass("Center Mar Flow");
        Wrapper.Width(55);
        Butt = Wrapper.div(document.createElement("i"));
        Butt.setClass("MIcon BlueFont Center");
        Butt.text("add_circle_outline");
        Wrapper.div().setClass("").text("New Step").TinyFont();
        Wrapper.Click(OnNew);
    }
    
    function NextButton(){
        let Wrapper, Butt = null;
        Wrapper = Footer.div();
        Wrapper.Width(55);
        Butt = Wrapper.div(document.createElement("i"));
        Butt.setClass("MIcon GreenFont");
        Butt.text("add_circle_outline");
        Wrapper.div().setClass("").text("Next").TinyFont();
        Wrapper.Click(OnNextButton);

        let LIST = $$$.JHA.Steps;
        NextElement = Wrapper;
        if (LIST.length > 0) {
            NextElement.setClass("Center Mar Flow");
        }
        else {
            NextElement.setClass("None");
        }
    }
    function OnDeleteButton() {
        if (!confirm()) { return;}
        let LIST = $$$.JHA.Steps;
        let y = LIST.length;
        let yindex = 0;
        let q = "";
        let TheObject = null;
        let Qlist = new $$$.ListOBJ();
        let Sent = 0;
        let Returned = 0;
        let Recv = 0;
        while (yindex != y) {
            TheObject = LIST[yindex];
            q = "delete from jhastephazards where JHAStepID=" + TheObject.RID;
            Qlist.push(q);
            q = "delete from jhastep where RID=" + TheObject.RID;
            Qlist.push(q);
            yindex++;
        }
        console.dir(Qlist);
        
        Qlist.Loop(function (data) {
            Sent++;
            $$$.QueryFetch(data).then(data=> { Recv++; });
            
        });
        function Wait() {
            if (Sent === Recv) {
                return Refresh();
            }
            requestAnimationFrame(Wait);
        }
        Wait();
    }
    function DeleteButton() {
        let Wrapper, Butt = null;
        let LIST = $$$.JHA.Steps;
        Wrapper = Footer.div();
        Wrapper.setClass("Center Mar Flow");
        Wrapper.Width(55);
        Butt = Wrapper.div(document.createElement("i"));
        Butt.setClass("MIcon RedFont");
        Butt.text("remove_circle_outline");
        Wrapper.div().setClass("").text("DELETE").TinyFont();
        Wrapper.Click(OnDeleteButton);
        DeleteElement = Wrapper;
        if (LIST.length > 0) {
            DeleteElement.setClass("Center Mar Flow");
        }
        else {
            DeleteElement.setClass("None");
        }
    }
    function Tools() {
        Footer.Flush().setClass("Right Mar Pad Smooth Border OrangeFont White");
        DeleteButton();
        NewButton();
        NextButton();
    }
    function Refresh() {
        $$$.JHA.Steps.length = 0;
        List.length = 0;
        ListElement.Flush();
        $$$.QueryFetch("select * from jhastep").then(data=> {
            List.Assign(data);
            List.Loop(data=> {
                let StepData = Object.assign({
                    Element: ListElement.div(),
                    OnSelect: OnSelect,
                    OnDelete: OnDelete
                }, data);
                
                $$$.JHA.StepList.push(StepData);
                $$$.LoadObject("JHA/StepOBJ");
            });
        });
        Tools();
    };
    Refresh();

    
    
    
    

})();