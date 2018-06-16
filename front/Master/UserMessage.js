(function (window, document) {
    "use strict";
    var ModName = "UserMessage";
    function OBJ() { }
    OBJ.prototype.Root = null;
    OBJ.prototype.MsgRoot = null;
    OBJ.prototype.SelectTo = null;
    OBJ.prototype.Title = null;
    OBJ.prototype.SubTitle = null;
    OBJ.prototype.Data = null;
    OBJ.prototype.Users = [];
    OBJ.prototype.MsgData = [];
    

    OBJ.prototype.Everyone = function () {
        var To = $$$.GetMSelect(this.SelectTo);
        var y = To.length;
        var yindex = 0;
        while (yindex != y) {
            if ($$$.MakeNumber(To[yindex].RID)===0) {
                return true;
            }
            yindex++;
        }
        return false;
    }
    //RID, From, To, Title, SubTitle, Data, Data2, Doc1, Doc2

    OBJ.prototype.Send = function () {
        if (this.Everyone()) {
            console.log("Yup");
            var y = this.Users.length;
            var yindex = 0;
            while (yindex != y) {
                var Pack = $$$.NewPack();
                Pack.url = "UserMessage.htm";
                Pack.callback = function () { };
                Pack.PostData.append("To", this.Users[yindex].RID);
                Pack.PostData.append("From", $$$.UserData.RID);
                Pack.PostData.append("Title", this.Title.value);
                Pack.PostData.append("SubTitle", this.SubTitle.value);
                Pack.PostData.append("Data", this.Data.value);
                $$$.Server(Pack);
                yindex++;
            }
            return;
        }
        console.log("Nope");
        return;
        var To = $$$.GetMSelect(this.SelectTo);
        var y = To.length;
        var yindex = 0;
        while (yindex != y) {
            var Pack = $$$.NewPack();
            Pack.url = "UserMessage.htm";
            Pack.callback = function () { };
            Pack.PostData.append("To", To[yindex].RID);
            Pack.PostData.append("From", $$$.UserData.RID);
            Pack.PostData.append("Title", this.Title.value);
            Pack.PostData.append("SubTitle", this.SubTitle.value);
            Pack.PostData.append("Data", this.Data.value);
            yindex++;
        }
    }

    OBJ.prototype.OnTalk = function () {
        var Box = $$$.Dom($$$.Pop(), "div", "Mar Pad Smooth Border White");
        var Form = $$$.Dom(Box, "form", "");
        var Row = $$$.Dom(Form, "div", "");
        this.SelectTo = $$$.Input(Row, "select", "", "To:");
        this.SelectTo.multiple = true;
        $$$.Option(this.SelectTo, "0", "Everyone");
        Row = $$$.Dom(Form, "div", "");
        this.Title = $$$.Input(Row, "input", "text", "Title");
        Row = $$$.Dom(Form, "div", "");
        this.SubTitle = $$$.Input(Row, "input", "text", "SubTitle");
        Row = $$$.Dom(Form, "div", "");
        this.Data = $$$.Input(Row, "textarea", "", "Data");
        var q = "select RID,ScreenName from users where Type > 0 Order By ScreenName ASC";
        $$$.MySql(q, this.OnUsers.bind(this));
        Row = $$$.Dom(Form, "div", "Right");
        $$$.Button(Row, "Send", this.Send.bind(this));
    }
    OBJ.prototype.OnUsers = function (obj) {
        //console.dir(obj);

        var A = [];
        //var 
        A = obj.json.Results;
        this.Users = A;
        var y = A.length;
        var yindex = 0;
        while (yindex != y) {
            $$$.Option(this.SelectTo, A[yindex].RID, A[yindex].ScreenName);
            //console.log(A[yindex].ScreenName);
            yindex++;
        }
    }
    OBJ.prototype.MsgOutput = function () {
        var y = this.MsgData.length;
        var yindex = 0;
        while (yindex != y) {
            this.MsgData[yindex].Target = this.MsgRoot;
            $$$.LoadScript("UserMessageOBJ", this.MsgData[yindex]);
            yindex++;
        }

    }
    OBJ.prototype.OnData = function (obj) {
        $$$.Flush(this.MsgRoot);
        this.MsgData = obj.json.Results;
        this.MsgOutput();

    }
    
    OBJ.prototype.Init = function (obj) {
        this.Root = $$$.Dom($$$.Content, "div", "");
        var Row = $$$.Dom(this.Root, "div", "Right");
        $$$.Button(Row, "Talk", this.OnTalk.bind(this));

        this.MsgRoot = $$$.Dom(this.Root, "div", "");
        var q = "select *,";
        q += "(select screenname from users where RID=usermessage.From) As FromName";
        q += " from usermessage where usermessage.to=" + $$$.UserData.RID;

        $$$.MySql(q, this.OnData.bind(this));
    }

    ///////////////////////////////////////
    function Run(obj) {
        $$$.Flush($$$.Content);
        //console.log(ModName + ".Run");
        //$$$.Dom($$$.Content, "div", "Mar Pad Smooth Border White OrangeFont Bold Big", "Coming Soon");
        //return;
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;
    

})(window, document);