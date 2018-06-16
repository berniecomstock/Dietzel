(function () {
    "use strict";

    let Body = $$$.BodyPop();
    let Element = new $$$.ElementOBJ(Body.Content());
    Element.setClass("Mar Pad Smooth");
    let Header=Element.div().setClass("Mar Smooth White").Icon("remove_circle_outline", "RedFont", "CANCEL", () => {
        Body.Exit();
        $$$.LoadObject("JHA/JHA");

    });
    let Name = Header.div();



    $$$.JHA.ProjectElement = Element.div().setClass("Mar Pad Smooth White OrangeFont Bold")
        .text("Project: " + $$$.JHA.Project.Title);
    $$$.JHA.UserElement = Element.div().setClass("Mar Pad Smooth White BlueFont Bold")
        .text("By: " + $$$.JHA.User.ScreenName);
    $$$.JHA.TaskListElement = Element.div();
    $$$.JHA.PPEListElement = Element.div();
    $$$.JHA.PPE2ListElement = Element.div();
    $$$.JHA.StepListElement = Element.div();

    function GetName() {
        $$$.getLine(Name, "Template Name", "Enter a Name for this Template", "").then(function (data) {
            let result = $$$.getlineOBJ(data);
            let q = "select rid from jha where name = '" + result.prepVal + "'";
            console.log(q);
            $$$.QueryFetch(q).then(function (data) {
                let list = new $$$.ListOBJ(data);
                if (list.length > 0) {
                    alert("Sorry that template name already exist...Enter somthing different.");
                    GetName();
                    return;
                }
                $$$.JHA.Name = result;
                $$$.JHA.Modified="", $$$.JHA.Created="", $$$.JHA.CreatedBy="",
                $$$.JHA.Task= {},
                $$$.JHA.ppe= new $$$.ListOBJ(),
                $$$.JHA.ppe2= new $$$.ListOBJ(),
                $$$.JHA.Steps= new $$$.ListOBJ(),
                $$$.JHA.Val= {}
                console.dir($$$.JHA);
                Name.setClass("Big BlueFont Flow").text(data.inputVal);
                $$$.LoadObject("JHA/TaskList");
                return;
                
            });


        }).catch(function () {
            $$$.LoadObject("JHA/JHA");
        });
    }

    GetName();
    /*
    $$$.getLine(Name, "Template Name", "Enter a Name for this Template", "DEFAULT").then(function (data) {


        $$$.JHA.Name = data;
        Name.setClass("Big BlueFont Flow").text(data.inputVal);
        $$$.LoadObject("JHA/TaskList");

    }).catch(function () { $$$.LoadObject("JHA/JHA"); });
    */
    
    

})();