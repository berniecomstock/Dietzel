(function (window, document) {
    "use strict";
    var ModName = "$ReceiptList";
    

    function ElementOBJ(parent) {
        //<i class="material-icons">settings_backup_restore</i>
    }

    function PageOBJ() {
        this.Land = false;
        this.Frag = document.createDocumentFragment();
        this.Body = document.createElement("body");
        this.Container = document.createElement("div");
        
        this.Old = document.documentElement.replaceChild(this.Body, document.body);
        this.Container.style.marginRight = "auto";
        this.Container.style.marginLeft = "auto";
        this.Container.style.backgroundColor = "white";
        this.Container.className = "GradOrange";
        this.Body.appendChild(this.Container);
        window.addEventListener("resize", this.onresize.bind(this), false);
        this.onresize();
    }
    PageOBJ.prototype.exit = function () {
        document.documentElement.replaceChild(this.Old, document.body);
        $$$.MenuOBJ.OnProjects();

    }
    PageOBJ.prototype.onresize = function () {
        /*<!--[0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]-->*/
        var Html = document.documentElement;
        if (Html.clientWidth > Html.clientHeight) {this.Land = true; }
        if (Html.clientWidth === Html.clientHeight) { this.Land = true; }
        if (Html.clientWidth > 320-1) { this.Container.style.width = "320px"; }
        if (Html.clientWidth > 377-1) { this.Container.style.width = "377px"; }
        if (Html.clientWidth > 610-1) { this.Container.style.width = "610px"; }
        if (Html.clientWidth > 987 - 1) { this.Container.style.width = "987px"; }
        if (Html.clientWidth > 1597 - 1) { this.Container.style.width = "1597px"; }
    }
    PageOBJ.prototype.Div = function (parent) {
        var obj = null;
        if (parent) { obj = parent.appendChild(document.createElement("div")); }
        else { obj = this.Container.appendChild(document.createElement("div")); }
        return obj;
    }
    PageOBJ.prototype.Row = function (parent) {
        var obj = null;
        if (parent) { obj = parent.appendChild(document.createElement("div")); }
        else { obj = this.Container.appendChild(document.createElement("div")); }
        obj.style.display = "flex";
        obj.style.flexDirection = "row";
        obj.style.flexWrap = "nowrap";
        obj.style.justifyContent = "center";
        obj.style.alignItems = "center";
        obj.style.alignContent = "center";
        obj.style.marginBottom = "5px";
        obj.style.minHeight = "21px";

        return obj;
    }
    PageOBJ.prototype.Col = function (parent,size, classdata) {
        var obj = parent.appendChild(document.createElement("div"));
        obj.style.flexGrow = "0";
        obj.style.minHeight = "21px";
        if (size === 0) { obj.style.width = "5%"; }
        if (size === 1) { obj.style.width = "8%"; }
        if (size === 2) { obj.style.width = "13%"; }
        if (size === 3) { obj.style.width = "21%"; }
        if (size === 4) { obj.style.width = "34%"; }
        if (size === 5) { obj.style.width = "55%"; }
        if (size === 6) { obj.style.width = "89%"; }
        if (size === 7) { obj.style.width = "100%"; }
        if (classdata) { obj.className = classdata; }

        return obj;
    }
    PageOBJ.prototype.ColGrow = function (parent, size, classdata) {
        var obj = parent.appendChild(document.createElement("div"));
        obj.style.flexGrow = "1";
        obj.style.minHeight = "21px";
        if (size === 0) { obj.style.width = "5%"; }
        if (size === 1) { obj.style.width = "8%"; }
        if (size === 2) { obj.style.width = "13%"; }
        if (size === 3) { obj.style.width = "21%"; }
        if (size === 4) { obj.style.width = "34%"; }
        if (size === 5) { obj.style.width = "55%"; }
        if (size === 6) { obj.style.width = "89%"; }
        if (size === 7) { obj.style.width = "100%"; }
        if (classdata) { obj.className = classdata; }

        return obj;
    }
    
    function ResultOBJ(data) { }
    
    function ListOBJ() {
        
        this.Page = new PageOBJ();
        this.Table = "receipt";
        this.SelectProjectRID = null;
        this.SelectedProjectRID = 0;
        this.SelectUserRID = null;
        this.SelectedUserRID = 0;
        this.SelectVendor = null;
        this.SelectedVendor = "";

        this.SelectUnit = null;
        this.SelectedUnit = "";

        this.SelectClass = null;
        this.SelectedClass = "";

        var Row, Col, Icon = null;
        Row = this.Page.Row();
        Col = this.Page.Col(Row, 1, "");

        var Butt=$$$.MatIcon(Col, "reply");
        //Col.appendChild(document.createTextNode("Close"));
        Butt.addEventListener("click", function () { this.Page.exit(); }.bind(this), false);


        Col = this.Page.Col(Row, 6, " Center ");
        Col.appendChild(document.createTextNode(""));


        Row = this.Page.Row();
        Col = this.Page.Col(Row, 3, "");
        this.SelectProjectRID = document.createElement("select");
        Col.appendChild(this.SelectProjectRID);
        Col = this.Page.Col(Row, 3, "");
        this.SelectUserRID = document.createElement("select");
        Col.appendChild(this.SelectUserRID);
        Col = this.Page.Col(Row, 3, "");
        this.SelectVendor= document.createElement("select");
        Col.appendChild(this.SelectVendor);

        Col = this.Page.Col(Row, 3, "");
        this.SelectUnit = document.createElement("select");
        Col.appendChild(this.SelectUnit);

        Col = this.Page.Col(Row, 3, "");
        this.SelectClass = document.createElement("select");
        Col.appendChild(this.SelectClass);

        this.SelectProjectRID.addEventListener("change", this.OnSelectChange.bind(this), false);
        this.SelectUserRID.addEventListener("change", this.OnSelectChange.bind(this), false);
        this.SelectVendor.addEventListener("change", this.OnSelectChange.bind(this), false);
        this.SelectUnit.addEventListener("change", this.OnSelectChange.bind(this), false);
        this.SelectClass.addEventListener("change", this.OnSelectChange.bind(this), false);


        Col = this.Page.Col(Row, 1, "Right CW"); $$$.Text(Col, "Clear-->");
        Col = this.Page.Col(Row, 1, "Right CW");
        
        var rbutt = $$$.MatIcon(Col, "settings_backup_restore");
        rbutt.addEventListener("click", this.OnReset.bind(this), false);

        //settings_backup_restore

        this.ResultsDOM = this.Page.Div();
        this.Filters();
    }
    ListOBJ.prototype.OnReset = function () {
        
        $$$.Flush(this.SelectProjectRID);
        $$$.Flush(this.SelectUserRID);
        $$$.Flush(this.SelectVendor);
        $$$.Flush(this.SelectUnit);
        $$$.Flush(this.SelectClass);
        this.SelectedProjectRID = 0;
        this.SelectedUserRID = 0;
        this.SelectedVendor = "";
        this.SelectedUnit = 0;
        this.SelectedClass = "";
        this.Filters();
        //this.SelectedProjectRID = $$$.MakeNumber($$$.GetSelectVal(this.SelectProjectRID));
        //this.SelectedUserRID = $$$.MakeNumber($$$.GetSelectVal(this.SelectUserRID));
        //this.SelectedVendor = $$$.GetSelectVal(this.SelectVendor);
    }
    var Flip = true;
    ListOBJ.prototype.List = function (data) {
        var Row, Col = null;
        Row = this.Page.Row(this.ResultsDOM);

        if (Flip) { Flip = false; Row.className += " C3bg"; }
        else { Flip = true; }

        Row.className += " ";

        Col = this.Page.Col(Row, 2, "truncate");
        $$$.Text(Col, data.PrettyDate); Col.title = data.PrettyDate;

        Col = this.Page.Col(Row, 2, "truncate");
        $$$.Text(Col, data.Title); Col.title = data.Title;

        Col = this.Page.Col(Row, 2, "truncate");
        $$$.Text(Col, data.ScreenName);

        Col = this.Page.Col(Row, 1, "truncate");
        $$$.Text(Col, data.Unit);

        Col = this.Page.Col(Row, 1, "truncate");
        $$$.Text(Col, data.Class);

        Col = this.Page.Col(Row, 1, "truncate");
        $$$.Text(Col, data.Vendor);

        Col = this.Page.Col(Row, 1, "truncate");
        $$$.Text(Col, data.Amount);

        if (data.Notes.length > 0) {
            Col = this.Page.Col(Row, 1, "");
            var F = $$$.MatIcon(Col, "speaker_notes");
            F.addEventListener("click", function () {
                alert(data.ScreenName + "\r\n" + data.Title + "\r\n"+data.Unit+"\r\n" + data.Notes);
            }, false);
        }
        else {
            //<i class="material-icons">chat_bubble_outline</i>
            Col = this.Page.Col(Row, 1, "");
            var F = $$$.MatIcon(Col, "chat_bubble_outline");
            
        }
        


        Col = this.Page.Col(Row, 1, "");
        var F=$$$.MatIcon(Col, "attachment");
        var Path = "../Bin/Receipt/" + data.RID + data.DataType + "?Scale=" + $$$.ScreenWidth();
        F.addEventListener("click", function () {
            window.open(Path, "_blank");
        }, false);

    }
    ListOBJ.prototype.ListHeader = function () {
        var Row, Col = null;
        Row = this.Page.Row(this.ResultsDOM);

        Row.className += " ";

        Col = this.Page.Col(Row, 2, "truncate Bold CW");
        $$$.Text(Col, "Date");

        Col = this.Page.Col(Row, 2, "truncate Bold CW");
        $$$.Text(Col, "Project");

        Col = this.Page.Col(Row, 2, "truncate Bold CW");
        $$$.Text(Col, "Person");

        Col = this.Page.Col(Row, 1, "truncate Bold CW");
        $$$.Text(Col, "Unit");

        Col = this.Page.Col(Row, 1, "truncate Bold CW");
        $$$.Text(Col, "Class");

        Col = this.Page.Col(Row, 1, "truncate Bold CW");
        $$$.Text(Col, "Vendor");

        Col = this.Page.Col(Row, 1, "truncate Bold CW");
        $$$.Text(Col, "$");

        Col = this.Page.Col(Row, 1, "truncate Bold CW");
        $$$.Text(Col, "Notes");

        Col = this.Page.Col(Row, 1, "truncate Bold CW");
        $$$.Text(Col, "Data");
        
    }
    ListOBJ.prototype.GetList = function () {
        $$$.Flush(this.ResultsDOM);
        this.ListHeader();
        
        var q = "select *, ";//,(select title from projects where rid=ProjectRID) as Title ";
        q += " (select screenname from users where rid=UserRID) as ScreenName, ";
        q += " (select Title from Projects where rid=ProjectRID) as Title, ";
        q += " (SELECT DATE_FORMAT(Created,'%a %b %D %h:%i %p')) as PrettyDate, ";
        q += " (select unit from equip where rid=UnitRID) as Unit ";


        q += " from " + this.Table + " ";
        q += " where RID > 0 ";
        if ($$$.MakeNumber(this.SelectedProjectRID) > 0) { q += " and ProjectRID=" + this.SelectedProjectRID + " "; }
        if ($$$.MakeNumber(this.SelectedUserRID) > 0) { q += " and UserRID = " + this.SelectedUserRID + " "; }

        if (this.SelectedVendor.length > 0) { q += " and Vendor = '" + this.SelectedVendor + "' "; }
        if ($$$.MakeNumber(this.SelectedUnit) > 0) { q += " and UnitRID = " + this.SelectedUnit + " "; }
        if (this.SelectedClass.length > 0) { q += " and Class = '" + this.SelectedClass + "' "; }


        q += " ORDER BY Created DESC";
        console.log(q);
        $$$.MySql(q, function (data) {
            
            var y = data.json.Results.length;
            var yindex = 0;
            while (yindex != y) {
                this.List(data.json.Results[yindex]);
                yindex++;
            }
        }.bind(this));
    }
    ListOBJ.prototype.OnSelectChange = function () {
        this.SelectedProjectRID = $$$.MakeNumber($$$.GetSelectVal(this.SelectProjectRID));
        this.SelectedUserRID = $$$.MakeNumber($$$.GetSelectVal(this.SelectUserRID));
        this.SelectedVendor = $$$.GetSelectVal(this.SelectVendor);
        this.SelectedUnit = $$$.MakeNumber($$$.GetSelectVal(this.SelectUnit));
        this.SelectedClass = $$$.GetSelectVal(this.SelectClass);
        

        this.Filters();
    }
    ListOBJ.prototype.Filters = function () {
        this.FillSelectProjectRID();
        this.FillSelectUserRID();
        this.FillSelectVendor();
        this.FillSelectUnit();
        this.FillSelectClass();
        this.GetList();
    }

    ListOBJ.prototype.FillSelectProjectRID = function () {
        
        $$$.Flush(this.SelectProjectRID);
        

        var q = "select ProjectRID,(select title from projects where rid=ProjectRID) as Title ";
        q += " from " + this.Table + " ";
        q += " where RID > 0 ";
        if ($$$.MakeNumber(this.SelectedProjectRID) > 0) { q += " and ProjectRID=" + this.SelectedProjectRID + " "; }
        if ($$$.MakeNumber(this.SelectedUserRID) > 0) { q += " and UserRID = " + this.SelectedUserRID + " "; }
        if (this.SelectedVendor.length > 0) { q += " and Vendor = '" + this.SelectedVendor + "' "; }

        if ($$$.MakeNumber(this.SelectedUnit) > 0) { q += " and UnitRID = " + this.SelectedUnit + " "; }
        if (this.SelectedClass.length > 0) { q += " and Class = '" + this.SelectedClass + "' "; }

        q += " GROUP BY ProjectRID ORDER BY Created DESC";
        $$$.MySql(q, function (data) {
            var y = data.json.Results.length;
            var yindex = 0;
            if (y > 1) { $$$.Option(this.SelectProjectRID, 0, "Any Project"); }
            if (y === 0) { $$$.Option(this.SelectProjectRID, 0, "Any Project"); }
            while (yindex != y) {
                
                if (y === 1) { $$$.Option(this.SelectProjectRID, data.json.Results[yindex].ProjectRID, data.json.Results[yindex].Title).selected = true; }
                else { $$$.Option(this.SelectProjectRID, data.json.Results[yindex].ProjectRID, data.json.Results[yindex].Title); }

                yindex++;
            }

            if (y === 1) { $$$.Option(this.SelectProjectRID, 0, "Any Project"); }
        }.bind(this));
    }
    ListOBJ.prototype.FillSelectUserRID = function () {
        $$$.Flush(this.SelectUserRID);
        //$$$.Option(this.SelectUserRID, 0, "Any Person");
        var q = "select UserRID,(select ScreenName from users where rid=UserRID) as ScreenName ";
        q += " from " + this.Table + " ";
        q += " where RID > 0 ";
        if ($$$.MakeNumber(this.SelectedProjectRID) > 0) { q += " and ProjectRID = " + this.SelectedProjectRID + " "; }
        if ($$$.MakeNumber(this.SelectedUserRID) > 0) { q += " and UserRID = " + this.SelectedUserRID + " "; }
        if (this.SelectedVendor.length > 0) { q += " and Vendor = '" + this.SelectedVendor + "' "; }
        if ($$$.MakeNumber(this.SelectedUnit) > 0) { q += " and UnitRID = " + this.SelectedUnit + " "; }
        if (this.SelectedClass.length > 0) { q += " and Class = '" + this.SelectedClass + "' "; }
        q += " GROUP BY UserRID ORDER BY ScreenName";
        
        $$$.MySql(q, function (data) {
            var y = data.json.Results.length;
            var yindex = 0;
            if (y > 1) { $$$.Option(this.SelectUserRID, 0, "Any Person"); }
            if (y === 0) { $$$.Option(this.SelectUserRID, 0, "Any Person"); }

            while (yindex != y) {
                
                if (y === 1) { $$$.Option(this.SelectUserRID, data.json.Results[yindex].UserRID, data.json.Results[yindex].ScreenName).selected = true;}
                else { $$$.Option(this.SelectUserRID, data.json.Results[yindex].UserRID, data.json.Results[yindex].ScreenName); }

                yindex++;
            }
            if (y === 1) { $$$.Option(this.SelectUserRID, 0, "Any Person"); }
        }.bind(this));
    }
    ListOBJ.prototype.FillSelectVendor = function () {
        $$$.Flush(this.SelectVendor);
        //$$$.Option(this.SelectUserRID, 0, "Any Person");
        var q = "select Vendor";
        q += " from " + this.Table + " ";
        q += " where RID > 0 ";
        q += " And Vendor != '' ";
        if ($$$.MakeNumber(this.SelectedProjectRID) > 0) { q += " and ProjectRID = " + this.SelectedProjectRID + " "; }
        if ($$$.MakeNumber(this.SelectedUserRID) > 0) { q += " and UserRID = " + this.SelectedUserRID + " "; }
        if (this.SelectedVendor.length > 0) { q += " and Vendor = '" + this.SelectedVendor + "' "; }
        if ($$$.MakeNumber(this.SelectedUnit) > 0) { q += " and UnitRID = " + this.SelectedUnit + " "; }
        if (this.SelectedClass.length > 0) { q += " and Class = '" + this.SelectedClass + "' "; }
        q += " GROUP BY Vendor ORDER BY Vendor";
        //console.log(q);
        $$$.MySql(q, function (data) {
            var y = data.json.Results.length;
            var yindex = 0;
            if (y > 1) { $$$.Option(this.SelectVendor, "", "Any Vendor"); }
            if (y === 0) { $$$.Option(this.SelectVendor, "", "Any Vendor"); }

            while (yindex != y) {
                var v = data.json.Results[yindex].Vendor;
                if (y === 1) { $$$.Option(this.SelectVendor, v, v).selected = true; }
                else { $$$.Option(this.SelectVendor, v,v); }

                yindex++;
            }
            if (y === 1) { $$$.Option(this.SelectVendor, "", "Any Vendor"); }
        }.bind(this));
    }
    ListOBJ.prototype.FillSelectUnit = function () {
        $$$.Flush(this.SelectUnit);
        
        var q = "select UnitRID,(select Unit from equip where rid=UnitRID) as Unit";
        q += " from " + this.Table + " ";
        q += " where RID > 0 ";
        q += " and UnitRID > 0 ";
        if ($$$.MakeNumber(this.SelectedProjectRID) > 0) { q += " and ProjectRID = " + this.SelectedProjectRID + " "; }
        if ($$$.MakeNumber(this.SelectedUserRID) > 0) { q += " and UserRID = " + this.SelectedUserRID + " "; }
        if (this.SelectedVendor.length > 0) { q += " and Vendor = '" + this.SelectedVendor + "' "; }
        if ($$$.MakeNumber(this.SelectedUnit) > 0) { q += " and UnitRID = " + this.SelectedUnit + " "; }
        if (this.SelectedClass.length > 0) { q += " and Class = '" + this.SelectedClass + "' "; }
        q += " GROUP BY UnitRID ORDER BY Unit";
        //console.log(q);
        $$$.MySql(q, function (data) {
            //console.dir(data);
            //return;
            var y = data.json.Results.length;
            var yindex = 0;
            if (y > 1) { $$$.Option(this.SelectUnit, "", "Any Unit"); }
            if (y === 0) { $$$.Option(this.SelectUnit, "", "Any Unit"); }

            while (yindex != y) {
                var v = data.json.Results[yindex].UnitRID;
                var T = data.json.Results[yindex].Unit;
                if (y === 1) { $$$.Option(this.SelectUnit, v, T).selected = true; }
                else { $$$.Option(this.SelectUnit, v, T); }

                yindex++;
            }
            if (y === 1) { $$$.Option(this.SelectUnit, "", "Any Unit"); }
        }.bind(this));
    }
    ListOBJ.prototype.FillSelectClass = function () {
        $$$.Flush(this.SelectClass);
        
        var q = "select Class";
        q += " from " + this.Table + " ";
        q += " where RID > 0 ";
        if ($$$.MakeNumber(this.SelectedProjectRID) > 0) { q += " and ProjectRID = " + this.SelectedProjectRID + " "; }
        if ($$$.MakeNumber(this.SelectedUserRID) > 0) { q += " and UserRID = " + this.SelectedUserRID + " "; }
        if (this.SelectedVendor.length > 0) { q += " and Vendor = '" + this.SelectedVendor + "' "; }
        if ($$$.MakeNumber(this.SelectedUnit) > 0) { q += " and UnitRID = " + this.SelectedUnit + " "; }
        if (this.SelectedClass.length > 0) { q += " and Class = '" + this.SelectedClass + "' "; }
        q += " GROUP BY Class ORDER BY Class";
        console.log(q);
        $$$.MySql(q, function (data) {
            var y = data.json.Results.length;
            var yindex = 0;
            if (y > 1) { $$$.Option(this.SelectClass, "", "Any Class"); }
            if (y === 0) { $$$.Option(this.SelectClass, "", "Any Class"); }

            while (yindex != y) {
                var v = data.json.Results[yindex].Class;
                if (y === 1) { $$$.Option(this.SelectClass, v, v).selected = true; }
                else { $$$.Option(this.SelectClass, v, v); }

                yindex++;
            }
            if (y === 1) { $$$.Option(this.SelectClass, "", "Any Class"); }
        }.bind(this));
    }
    ////////////////////////////////////////////////////////////////////////////////////////////
    function Run() {
        var Temp = new ListOBJ();
    }
    $$$[ModName] = Run;



})(window, document);
