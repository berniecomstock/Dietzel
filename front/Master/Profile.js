

(function (window, document) {
    var ModName = "Profile";
    var UserData = {};
    var Email = null;
    var Pass = null;
    var Root = null;

    

    function SetCookie(Name, Val) {

        var exp = new Date();
        exp.setTime(exp.getTime() + (1000 * 60 * 60 * 24 * 7));
        document.cookie = encodeURIComponent(Name) + "=" + encodeURIComponent(Val) + "; path=/" + ((exp == null) ? "" : "; expires=" + exp.toGMTString());
    }
    
    /////////////////////////////////////////////////////////////////////////////////

    function UserOBJ() { }
    UserOBJ.prototype.Index = -1;
    UserOBJ.prototype.User = {};
    UserOBJ.prototype.EditToggle = false;
    UserOBJ.prototype.Wrapper = null;
    UserOBJ.prototype.EditUserForm = null;
    UserOBJ.prototype.OnSaveCallback = function (obj) {
        $$$.UserData = obj.json;
        $$$.UserData.Type = $$$.MakeNumber($$$.UserData.Type);
        $$$.UserData.RID = $$$.MakeNumber($$$.UserData.RID);
        $$$.UserData.CurrentProject = $$$.MakeNumber($$$.UserData.CurrentProject);
        $$$.UserData.TimeSheetRID = $$$.MakeNumber($$$.UserData.TimeSheetRID);
        SetCookie("SessionID", $$$.UserData.SessionID);
        SetCookie("Email", $$$.UserData.Email);
        this.User = $$$.UserData;
        this.ScreenName.value = this.User.ScreenName;
        this.Email.value = this.User.Email;
        this.Pass.value = this.User.Pass;
        this.Phone.value = this.User.Phone;

        new $$$.InfoBox(this.Wrapper, "Your changes were saved...");
        

        
    }
    UserOBJ.prototype.OnSave = function () {
        var Pack = $$$.NewPack();
        Pack.url = "UpdateUser.htm";
        Pack.callback = this.OnSaveCallback.bind(this);
        Pack.PostData.append("ScreenName", this.ScreenName.value);
        Pack.PostData.append("Pass", this.Pass.value);
        Pack.PostData.append("Email", this.Email.value);
        Pack.PostData.append("Phone", this.Phone.value);
        Pack.PostData.append("RID", this.User.RID);
        $$$.Server(Pack);

    }
    UserOBJ.prototype.CreateEditUserForm = function () {
        var Row = null;
        var Left = null;
        var Right = null;

        Row = $$$.Dom(this.EditUserForm, "div", null);
        Left = $$$.Dom(Row, "div", "Split");
        Right = $$$.Dom(Row, "div", "Split");


        
       
        this.ScreenName = $$$.Input(Left, "input", "text", "Full Name");
        this.Email=$$$.Input(Right, "input", "text", "Email");

        Row = $$$.Dom(this.EditUserForm, "div", null);
        Left = $$$.Dom(Row, "div", "Split");
        Right = $$$.Dom(Row, "div", "Split");
        
        this.Pass = $$$.Input(Left, "input", "text", "Password");
        
        this.Phone=$$$.Input(Right, "input", "text", "Phone");

        this.ScreenName.value = this.User.ScreenName;
        this.Email.value = this.User.Email;
        this.Pass.value = this.User.Pass;
        this.Phone.value = this.User.Phone;
        Row = $$$.Dom(this.EditUserForm, "div", "TextRight");
        var Button = $$$.Button(Row, "Save", this.OnSave.bind(this));
    }
    
    UserOBJ.prototype.Init = function () {
        this.User = $$$.UserData;
        this.Wrapper = $$$.Dom(Root, "div", "Box");
        this.EditUserForm = $$$.Dom(this.Wrapper, "div", null);
        this.CreateEditUserForm();
    }

    
    function Create() {
        Root = $$$.Content;
        $$$.Flush(Root);
        if ($$$.UserData.Type > 49)
        {
            var U = new UserOBJ();
            U.Init(UserData);
            return;
        }

    }
    function OnStart() {
        UserData = $$$.UserData;
        Create();
        
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
                            OnStart();
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