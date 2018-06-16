
(function (window, document) {
    var ModName = "Project.Create";
    var Root = null;
    var TypeSelect = null;
    var Title = null;
    var SubTitle = null;
    var Description = null;
    var DoneButton = null;
    
    function OnDone() {
        var Pack = $$$.NewPack();
        Pack.url = "NewProject.htm";
        Pack.callback = function () { };
        Pack.PostData.append("Title", Title.value);
        Pack.PostData.append("SubTitle", SubTitle.value);
        Pack.PostData.append("Description", Description.value);
        Pack.PostData.append("Type", 200);
        $$$.Server(Pack);

        Pack = $$$.NewPack();
        Pack.Channel = "ProjectList";
        Pack.Event = "Start";
        $$$.Shout(Pack);

        
    }
    function OnCancel() {
        Pack = $$$.NewPack();
        Pack.Channel = "ProjectList";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    }
    function Run() {
        
        $$$.Flush($$$.Content);
        Root = $$$.Content;
        
        var Form = $$$.Dom(Root, "form", "Mar Pad Border Smooth");
        var Row = null;
        var Button = null;
        Title = $$$.Input(Form, "input", "text", "Title");
        SubTitle = $$$.Input(Form, "input", "text", "SubTitle");
        Description = $$$.Input(Form, "textarea", "", "Description");
        Row = $$$.Dom(Form, "div", "Right");
        DoneButton = $$$.Button(Row, "Ok", OnDone);
        $$$.Button(Row, "Cancel", OnCancel);
        
    }

    function OnCom(obj) {
        switch (obj.Channel) {
            case "Omni":
                switch (obj.Event) {
                    case "Hide":
                        break;
                }
                break;
            case ModName:
                {
                    switch (obj.Event) {
                        case "Start":
                            Run();
                            break;
                    }
                }
                break;
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    function RunOnce() {
        var Pack = {};
        Pack.Channel = ModName;
        Pack.callback = OnCom;
        $$$.Listen(Pack);
    }
    RunOnce();
})(window, document);