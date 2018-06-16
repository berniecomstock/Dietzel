(function (window, document) {
    "use strict";
    /*Data Structures*/
    
    function ContentOBJ(parent) {
        this.Element = document.createElement("div");
        parent.appendChild(this.Element);
        this.Element.className = "Content";

    }
    function MenuOBJ(parent) {
        this.Element = document.createElement("div");
        parent.appendChild(this.Element);
        this.Element.className = "Menu";
    }

    function HeadOBJ() {
        this.Element = document.head;
    }

    function BodyOBJ() {
        this.Element = document.body;
        while (this.Element.children.length > 0) { this.Element.removeChild(this.Element.children[0]);}
        this.Menu = new MenuOBJ(this.Element);
        this.Content = new ContentOBJ(this.Element);   
    }

    function PageOBJ() {
        this.Body = new BodyOBJ();
        this.Head = new HeadOBJ();
    }
    function DataOBJ(table,name,rid,val) {
        this.Table = "";
        this.RID = 0;
        this.Name = null;
        this.Val = null;
        if (table) { this.Table = table; }
        if (name) { this.Name = name }
        if (rid) { this.RID = rid }
        if (val) { this.Val = val; }
        this.FetchVal();

    }
    DataOBJ.prototype.FetchVal = function () {
        console.log("Begin Data Fetch");
        if (this.RID === 0) { console.log("RID===0 No Data"); return; }
        var q = "select " + this.Name + " from " + this.Table + " ";
    }
    DataOBJ.prototype.FetchRID = function () {
    }

    function UserOBJ() {
        this.Table = "Users";
        this.SessionID = new DataOBJ(this.Table, "SessionID");
        var Val = null;
        var value_end = 0;
        var value_start = 0;
        var cookie = "; " + document.cookie + ";";
        var search = "; " + encodeURIComponent(this.SessionID.Name) + "=";
        value_start = cookie.indexOf(search);
        if (cookie.indexOf(search) == -1) { }
        else {
            value_start += search.length;
            value_end = cookie.indexOf(";", value_start);
            Val = decodeURIComponent(cookie.substring(value_start, value_end));
        }
        console.log(Val);
    }

    function AppOBJ() {
        this.Page = new PageOBJ();
        this.User = new UserOBJ();
    }

    var App = new AppOBJ();
    


    
    //console.log("Entity");
    //console.dir(App);

})(window, document);