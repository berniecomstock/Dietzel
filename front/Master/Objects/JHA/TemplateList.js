(function () {
    "use strict";

    let Body = $$$.BodyPop();
    let Element = new $$$.ElementOBJ(Body.Content());
    Element.div().setClass("Mar Pad Smooth White BlueFont").text($$$.JHA.Project.Title+" Does not have a JHA Templated assigned. Please Select one from the list, or create a new one as needed.");
    let ListBox = Element.div();
    let ToolBox = Element.div().setClass("Right Mar Smooth White");
    let List = new $$$.ListOBJ();

    $$$.JHA.NewTemplateExit = function () {
        Body.Exit();
    }

    ToolBox.Icon("add_circle_outline", "BlueFont", "CREATE TEMPLATE", OnNew);

    function OnNew() {
        Body.Exit();
        $$$.LoadObject("JHA/NewTemplate");
    }
    function Exit() {
        Body.Exit();
    }

    function Template(data) {
        let result = {};
        Object.assign(result, data);
        Object.assign(result, JSON.parse(data.Val));
        result.Element = ListBox.div();
        result.Exit = Exit;
        $$$.JHA.TemplateList.push(result);
        $$$.LoadObject("JHA/TemplateOBJ");
        
    }

    function OnData() {
        ListBox.Flush();
        $$$.JHA.TemplateList.length = 0;
        List.Loop(data=> {
            Template(data);
        });
    }
    let q = "select *, ";
    q += " (select ScreenName from users where rid=CreatedBy) as ScreenName ";
    q += " from jha order by Name";

    List.Query(q).then(OnData);

})();