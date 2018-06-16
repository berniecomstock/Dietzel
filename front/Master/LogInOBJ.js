
(function () {

    "use strict";
    let ModName = "LogInOBJ";
    //new $$$.EventOBJ({ Source: ModName, Msg: "Sleeping", Type: 101 });
    //102 Login Page
    //103 Login Button
    //103 Login Fail
    //104 Login OK

    new $$$.EventOBJ({ Source: ModName, Type: "LoginPage" });

    let Body = $$$.BodyPop();
    let Root = Body.Content();

    Body.OnExit = function () {
        $$$.Run("FrontDoor");
    }

    let Form = $$$.Dom(Root, "form", "", "");
    let Row = $$$.Dom(Form, "div", "", "");
    let Email = $$$.Input(Row, "input", "text", "Email");
    let Pass = $$$.Input(Row, "input", "text", "Password");
    Row = $$$.Dom(Form, "div", "Right", "");
    let Cancel = $$$.Button(Row, "Cancel", Body.OnExit);
    let Ok = $$$.Button(Row, "Ok", OnPassEnter);
    
    Email.focus();
    function OnEmailEnter() {
        Pass.focus();
    }
    $$$.OnEnter(Email, OnEmailEnter);
    $$$.OnEnter(Pass, OnPassEnter);
    function OnCancel() {
        Body.Exit();
    }

    function Fail() {
        alert("Bad username and or password. Passwords ARE case-sensitive.");
    }
    function OnData(dat) {
        
        try { $$$.UserData = JSON.parse(dat);}
        catch (e) { return Fail();}
        $$$.SetCookie("SessionID", $$$.UserData.SessionID);
        $$$.UserDataFormat();
        if ($$$.UserData.Type < 1) {
            new $$$.EventOBJ({ Source: ModName, Type: "LoginFail" });
            return Fail();
        }
        Body.OnExit = function () { }
        Body.Exit();
        new $$$.EventOBJ({ Source: ModName, Type: "LoginOK" });
        $$$.AuthUser();
    }
    function OnPassEnter() {
        new $$$.EventOBJ({ Source: ModName, Type: "LoginButton" });
        let Post = new FormData();
        Post.append("Email", Email.value);
        Post.append("Pass", Pass.value);
        Post.append("ClientSource", "JavaScript");
        $$$.Post("Login.htm", Post, OnData);
    }
    
    
})();
