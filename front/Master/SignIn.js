(function (window, document) {
    "use strict";
    var ModName = "SignIn";
    function SetCookie(Name, Val) {

        var exp = new Date();
        exp.setTime(exp.getTime() + (1000 * 60 * 60 * 24 * 7));
        document.cookie = encodeURIComponent(Name) + "=" + encodeURIComponent(Val) + "; path=/" + ((exp == null) ? "" : "; expires=" + exp.toGMTString());
    }
    function GetCookie(Name) {
        var Val = null;
        var value_end = 0;
        var value_start = 0;
        var cookie = "; " + document.cookie + ";";
        var search = "; " + encodeURIComponent(Name) + "=";
        value_start = cookie.indexOf(search);
        if (cookie.indexOf(search) == -1) {
            return Val;
        }
        else {
            value_start += search.length;
            value_end = cookie.indexOf(';', value_start);
            Val = decodeURIComponent(cookie.substring(value_start, value_end));
            return Val;
        }
    }

    function OBJ() { }
    OBJ.prototype.OnLoginCallback = function (obj) {
        
        var Type = Number(obj.json.Type);
        if (isNaN(Type)) { Type = 0; }

        if (Type > 0) {
            SetCookie("SessionID", obj.json.SessionID);
            window.location.reload(true);
            return;
        }
        alert("Bad Email, and or Password.");
    }
    OBJ.prototype.OnLoginButton = function () {

        var Pack = $$$.NewPack();
        Pack.PostData.append("Email", this.Email.value);
        Pack.PostData.append("Pass", this.Pass.value);
        Pack.PostData.append("ClientSource", "JavaScript");
        Pack.callback = this.OnLoginCallback.bind(this);
        Pack.url = "Login.htm";
        $$$.Server(Pack);
    }

    OBJ.prototype.OnEmailEnter = function () {
        if (this.Email.value.length > 0) {
            this.Pass.focus();
        }
    }
    OBJ.prototype.OnPassEnter = function () {

        if (this.Email.value.length > 0) {
            if (this.Pass.value.length > 0) {
                this.OnLoginButton();
            }
        }
    }
    OBJ.prototype.Init = function (obj) {
        $$$.Flush($$$.Content);
        var Row = $$$.Dom($$$.Content, "div", "Center");
        var Form = $$$.Dom(Row, "div", "Flow W300 Border Mar Pad Smooth White SeeThru", "");

        this.Email = $$$.Input(Form, "input", "text", "Email");
        this.Pass = $$$.Input(Form, "input", "text", "Password");
        Row = $$$.Dom(Form, "div", "Right");
        $$$.Button(Row, "Log In", this.OnLoginButton.bind(this));
        this.Email.name = "Email";
        this.Pass.name = "Password";

        $$$.OnEnter(this.Email, this.OnEmailEnter.bind(this));
        $$$.OnEnter(this.Pass, this.OnPassEnter.bind(this));
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
        
    }
    $$$[ModName] = Run;

})(window, document);