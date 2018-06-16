(function (window, document) {
    "use strict";
    /*
BEGIN:VCARD
VERSION:3.0
N:Dietzel;Andrew
FN:Andrew Dietzel
ORG:Dietzel Enterprises, Inc.
URL:https://www.Dietzelinc.Com/
EMAIL:andrew@Dietzelinc.Com
TEL;TYPE=voice,work,pref:+1-402-510-1362 
ADR;TYPE=intl,work,postal,parcel:;;15825 Patrick Ave;Omaha;NE;68124;United States
LABEL;TYPE=work,dom,postal: Wallstr.1\n Berlin\nGermany

TEL;CELL;VOICE:(555)555-4868
TEL;WORK;FAX:(704)555-4864
ADR;WORK:;Tirhakah Corporation;3131 Sunstone Dr;Charleton;NC;28083;USA

END:VCARD

    */

    let Modname = "$$$Contacts";

    function VCardOBJ() {
        this.N = "";
        this.FN = "";
        this.ORG = "";
        this.URL = "";
        this.EMAIL = "";
        this.TEL = "";
        this.ADR = "";
        this.TITLE = "";

    }
    function SmartLine(dom,table,pointer, name, label) {
        this.Root = dom;
        this.Table = table;
        this.Pointer = pointer;
        this.Name = name;
        this.Label = label;
        let L = this.Root.appendChild(document.createElement("div"));
        this.Input = this.Root.appendChild(document.createElement("input"));
        L.textContent = label;
        this.Input.value = this.Pointer[this.Name];
        this.Input.style.width = "100%";
        this.Input.placeholder = label;
        if (this.Pointer[this.Name] === "0") {
            this.Input.value = "";
        }
        this.Root.style.marginBottom = "13px";
       
        this.Input.addEventListener("input", this.OnInput.bind(this), false);
        this.TimerID = 0;
    }
    SmartLine.prototype.OnUpdate = function () {
        console.log("Update Done");
    }
    SmartLine.prototype.OnPrep = function (data) {
        let Post = new FormData();
        Post.append("q", "update " + this.Table + " set " + this.Name + " = '" + data + "' WHERE RID = " + this.Pointer["RID"]);
        $$$.Post("MySql.htm", Post, this.OnUpdate.bind(this));
    }
    SmartLine.prototype.OnInputTimeOut = function () {
        console.log("Input!");
        this.Pointer[this.Name] = this.Input.value;
        let Post = new FormData();
        Post.append("Data", this.Input.value);
        $$$.Post("Prep.htm", Post, this.OnPrep.bind(this));
    }
    SmartLine.prototype.OnInput = function () {
        if (this.TimerID) {
            clearTimeout(this.TimerID);
        }
        this.TimerID = setTimeout(this.OnInputTimeOut.bind(this), 500);
        
    }

    function UserOBJ(pointer) {
        this.Data = pointer;
        this.Root = document.createElement("div")
        
        this.Root.style.marginTop = "13px";
        this.Root.style.backgroundColor = "rgb(255,255,255)";
        this.Root.style.padding = "5px";
        this.Root.style.borderRadius = "10px 10px 10px 10px";

        this.ScreenName = this.Root.appendChild(document.createElement("div"));
        this.ScreenName.textContent = this.Data.ScreenName;

        this.Phone = this.Root.appendChild(document.createElement("div"));
        let link = document.createElement("a");
        link.href = "tel:+1-" + this.Data.Phone;
        link.textContent = this.Data.Phone;
        this.Phone.appendChild(link);


        this.Email = this.Root.appendChild(document.createElement("div"));
        
        link = document.createElement("a");
        link.href = "mailto:" + this.Data.Email;
        link.textContent = this.Data.Email;
        link.target = "_blank";
        this.Email.appendChild(link);





        this.VCard = "BEGIN:VCARD\r\n";
        this.VCard += "VERSION:2.1\r\n";
        this.VCard += "N:" + this.Data.ScreenName + ";;;; \r\n";
        this.VCard += "FN:" + this.Data.ScreenName + "\r\n";
        this.VCard += "EMAIL;WORK:" + this.Data.Email + "\r\n";
        this.VCard += "TEL;WORK:" + this.Data.Phone + "\r\n";
        this.VCard += "ADR;HOME:;;"+this.Data.Address+";;;;\r\n";
        this.VCard += "ORG:Dietzel Enterprises, Inc.\r\n";
        
        if (this.Data.Type === "1000") {
            this.VCard += "TITLE:Office.\r\n";
        }
        else {
            this.VCard += "TITLE:Crew.\r\n";
        }
        this.VCard += "END:VCARD\r\n";
        

        this.Form = this.Root.appendChild(document.createElement("form"));
        this.Form.target = "_blank";
        this.Form.enctype = "multipart/form-data";
        this.Form.action = "VCard.htm?r=" + Math.floor(Math.random() * 80000);
        this.Form.method = "POST";

        let Input = this.Form.appendChild(document.createElement("input"));
        Input.type = "hidden";
        Input.name = "Data";
        Input.value = this.VCard;


        let Butt = this.Form.appendChild(document.createElement("input"));
        Butt.type = "submit";
        Butt.value = "VCard";
        this.Data.DomTarget.appendChild(this.Root);
    }

    function ContactListOBJ() {
        this.Body = document.createElement("body");
        this.OldBody = document.documentElement.replaceChild(this.Body, document.body);
        this.Exit = this.Body.appendChild(document.createElement("input"));
        this.Exit.type = "button";
        this.Exit.value = "Done";
         
        this.Container = this.Body.appendChild(document.createElement("div"));
        this.Container.style.marginRight = "auto";
        this.Container.style.marginLeft = "auto";
        this.Container.style.width = "320px";
        
        this.UserList = [];
        this.GetUserList();
        this.UserListDom = this.Container.appendChild(document.createElement("div"));
        this.Exit.addEventListener("click", this.OnExit.bind(this), false);

    }
    ContactListOBJ.prototype.OnExit = function () {
        document.documentElement.replaceChild(this.OldBody, document.body);
    };

    ContactListOBJ.prototype.UserOutput = function (yindex) {
        
    }
    ContactListOBJ.prototype.UserListOutput = function () {
        let y = this.UserList.length;
        let yindex = 0;
        $$$.Flush(this.UserListDom);
        while (yindex != y) {
            this.UserList[yindex].DomTarget = this.UserListDom.appendChild(document.createElement("div"));
            new UserOBJ(this.UserList[yindex]);
            yindex++;
        }
    }
    ContactListOBJ.prototype.OnUserList = function (data) {
        let Temp = {};
        let Results = [];
        try { Temp = JSON.parse(data);}
        catch (e) { }
        if ("Results" in Temp) {
            this.UserList = Temp.Results;
        }
        this.UserListOutput();

        //console.dir(this.UserList);
    }
    ContactListOBJ.prototype.GetUserList = function () {
        let q = "select * from Users WHERE Archive=0 order by ScreenName ASC";
        let Post = new FormData();
        Post.append("q", q);
        $$$.Post("MySql.htm", Post, this.OnUserList.bind(this));

    }

    $$$[Modname] = function (input) {
        console.log(Modname);
        new ContactListOBJ();
    }

})(window, document);
