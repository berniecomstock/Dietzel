(function (window, document) {
    "use strict";
    var ModName = "$EditReceipt";
    
    

    function Run(payload) {
        //RID, ProjectRID, UserRID, Created, Amount, Miles, Gallons, Class, UnitRID, DataType, Notes, Vendor

        var OldBody = null;
        var Data = payload.Data;
        var Body = document.createElement("body");
        var Container = $$$.Dom(Body, "div", "Container GradOrange Max Pad");
        var Name = "Amount";
        var Table = "Receipt";
        var Row = $$$.Dom(Container, "div", "Row Left");
        var Back = $$$.MatIcon(Row, "reply");

        Row = $$$.Dom(Container, "div", "Row BlueFont Bold Big", Data.ScreenName);


        Name = "Vendor";
        Row = $$$.Dom(Container, "div", "Row");
        new $$$.SmartBox(Row, Data, Name, Table, Name);
        Name = "Amount";
        Row = $$$.Dom(Container, "div", "Row");
        new $$$.SmartBox(Row, Data, Name, Table, Name);
        Name = "Miles";
        Row = $$$.Dom(Container, "div", "Row");
        new $$$.SmartBox(Row, Data, Name, Table, Name);
        Name = "Gallons";
        Row = $$$.Dom(Container, "div", "Row");
        new $$$.SmartBox(Row, Data, Name, Table, Name);

        Name = "Class";
        Row = $$$.Dom(Container, "div", "Row");
        var TheClass = new $$$.SmartSelect(Row, Data, Name, Table, Name);
        TheClass.Option(Data.Class, Data.Class);
        TheClass.Option("Fuel", "Fuel");
        TheClass.Option("Hotel", "Hotel");
        TheClass.Option("Material", "Material");
        TheClass.Option("Repair", "Repair");
        TheClass.Option("Travel", "Travel");
        TheClass.Option("Other", "Other");
        TheClass.Option("None", "None");
        
        //
        //Fuel Hotel Material None Other Repair, Travel
        
        //Row = $$$.Dom(Container, "div", "Row");
        Row = $$$.Dom(Container, "div", "Row");
        var SelectProject = $$$.Dom(Row, "select", "");
        $$$.Option(SelectProject, Data.ProjectRID, Data.ProjectTitle);



        
        ////////////////////////////Job Name
        //TheClass.Option(Data.ProjectTitle, Data.ProjectName);
        var q = "Select Title,RID FROM Projects order by modified DESC";
        var Post = new FormData();
        Post.append("q", q);
        $$$.Post("MySql.htm", Post, function (data) {
            var Temp = [];
            var A = [];
            try { Temp = JSON.parse(data);}
            catch (e) { }
            if ("Results" in Temp) {
                A = Temp.Results;
                //
               
            }
            var y = A.length;
            var yindex = 0;
            while (yindex != y) {
                $$$.Option(SelectProject, A[yindex].RID, A[yindex].Title);
                yindex++;
            }
            $$$.Option(SelectProject, "0","None");


        }.bind(this), false);


        SelectProject.addEventListener("change", function () {
            
            var val = $$$.GetSelectVal(SelectProject);
            var tval = $$$.GetSelectText(SelectProject);
            console.log("Change=" + val + " " + tval);
            Data.ProjectRID = val;
            Data.ProjectTitle = tval;
            var Post = new FormData();
            Post.append("q", "update receipt set ProjectRID=" + val + " WHERE RID=" + Data.RID);
            $$$.Post("MySql.htm", Post, function () { });


        }.bind(this), false);
        
        ///////////////////////////////////Unit Number Unit UnitRID
        Row = $$$.Dom(Container, "div", "Row");
        var SelectUnit = $$$.Dom(Row, "select", "");
        $$$.Option(SelectUnit, Data.UnitRID, Data.Unit);

        
        var q = "Select Unit,RID FROM Equip where Unit like 'E%' order by Unit ";
        var Post = new FormData();
        Post.append("q", q);
        $$$.Post("MySql.htm", Post, function (data) {
            var Temp = [];
            var A = [];
            try { Temp = JSON.parse(data); }
            catch (e) { }
            if ("Results" in Temp) {
                A = Temp.Results;
            }
            var y = A.length;
            var yindex = 0;
            while (yindex != y) {
                $$$.Option(SelectUnit, A[yindex].RID, A[yindex].Unit);
                yindex++;
            }
            $$$.Option(SelectUnit, "0", "None");


        }.bind(this), false);

        
        SelectUnit.addEventListener("change", function () {

            var val = $$$.GetSelectVal(SelectUnit);
            var tval = $$$.GetSelectText(SelectUnit);
            console.log("Change=" + val + " " + tval);
            Data.UnitRID = val;
            Data.Unit = tval;
            var Post = new FormData();
            Post.append("q", "update receipt set UnitRID=" + val + " WHERE RID=" + Data.RID);
            $$$.Post("MySql.htm", Post, function () { });


        }.bind(this), false);
        
        ///////////////////////////////////////////////////End Unit Number
        
        Name = "Notes";
        Row = $$$.Dom(Container, "div", "Row");
        new $$$.SmartArea(Row, Data, Name, Table);


        Row = $$$.Dom(Container, "div", "Row Right");
        var Back2 = $$$.MatIcon(Row, "save");



        OldBody = document.documentElement.replaceChild(Body, document.body);
        console.dir(Data);

        Back.addEventListener("click", function () {
            document.documentElement.replaceChild(OldBody, document.body);
            payload.callback();
        }.bind(this), false);
        Back2.addEventListener("click", function () {
            document.documentElement.replaceChild(OldBody, document.body);
            payload.callback();
        }.bind(this), false);
        
    }
    $$$[ModName] = Run;
})(window, document);