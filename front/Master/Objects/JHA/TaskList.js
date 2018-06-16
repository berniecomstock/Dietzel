(function () {
    "use strict";

    let List = new $$$.ListOBJ();
    let Element = new $$$.ElementOBJ($$$.JHA.TaskListElement);
    let Header = new $$$.ElementOBJ();
    Element.Flush();
    Element.setClass("Mar Pad Smooth White");

    function MakeHeader() {
        Header = Element.div().setClass("Flex Mar Pad Smooth White");
        Header.div().setClass("BlueFont Bold MarAutoRight").text("Select Primary Task:");
        
    }
    
    MakeHeader();
    
    let ListElement = Element.div();
    let NewTaskElement = Element.div().setClass("Right");

    //help_outline
    

    function NewButton() {
        NewTaskElement.Flush().setClass("Right");
        
        NewTaskElement.Icon("add_circle_outline", "BlueFont", "ADD", function () {
            NewTaskElement.Flush();
            NewTaskElement.setClass("");
            $$$.getLine(NewTaskElement, "New Task", "New Task", "").then(data=> {
                let Result = $$$.getlineOBJ(data);
                let q = "insert into jhatask (Val) values ('" + Result.prepVal + "')";
                return $$$.QueryFetch(q);
            }).then(data=> {
                return Refresh();
            }).then(data=> {
                return NewButton();
            }).catch(Refresh);

        });
    }
    

    function OnSelect(data) {
        Element.Flush();
        Element.setClass("Mar Pad Smooth White");
        let Wrapper = Element.div().setClass("");
        Wrapper.div().setClass("Flow Mar BlueFont Bold").text("Task:");
        Wrapper.div().setClass("Bold OrangeFont Bold Flow").text(data.Val);
        $$$.JHA.Task = data;
        $$$.LoadObject("JHA/PPE");
        
       
    }
    function OnDelete(data) {
        let q = "delete from jhatask where rid=" + data.RID;
        $$$.QueryFetch(q).then(() => {
            Refresh();
        });
    }
    function Refresh() {
        ListElement.Flush();

        $$$.QueryFetch("select * from jhatask").then(data=> {
            List.Assign(data);
            List.Loop(data=> {
                let TaskData = Object.assign({ Element: ListElement.div(),OnSelect:OnSelect,OnDelete:OnDelete }, data);
                $$$.JHA.TaskList.push(TaskData);
                $$$.LoadObject("JHA/TaskOBJ");
            });
        });
        NewButton();
    };

    
    Refresh();
    
})();