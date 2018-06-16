
(function (window, document) {
    var ModName = "Receipt";
    ////////////////////////////////////////////////////////////////////////////
    function NewReceipt() {
        var obj = { RID: 0, ProjectRID: 0, UserRID: 0, Created: "", Amount: 0, Miles: 0, Gallons: 0, Class: "", UnitRID: 0, DataType: "", Notes: "", Vendor: "" };
        return obj;
    }

    function NameVal(target, name, val) {
        var N = $$$.Dom(target, "span", "Pad");
        var V = $$$.Dom(target, "span", "Bold");
        $$$.Text(N, name);
        $$$.Text(V, val);
    }
    
    function ListOBJ() { }
    ListOBJ.prototype.ReceiptData = [];
    ListOBJ.prototype.OpenDoc = function (path) {
        window.open(path, "_blank");
    }
    ListOBJ.prototype.Output = function (obj) {
        //$$$.Text(this.Root, "The List Goes Here");
        $$$.Flush(this.Root);
        var y = this.ReceiptData.length;
        var yindex = 0;
        var Root = $$$.Dom(this.Root, "div", null);
        if (y < 1) {
            $$$.Text(Root, "No Records Found");
            return;
        }
        //console.dir(this.ReceiptData[0]);
        while (yindex != y) {
            var Card = $$$.Dom(Root, "div", "Flow Box TextLeft");
            var Row = $$$.Dom(Card, "div", "Bold"); $$$.Text(Row, this.ReceiptData[yindex].ScreenName);

            Row = $$$.Dom(Card, "div", "Bold"); $$$.Text(Row, "$" + this.ReceiptData[yindex].Amount);
            Row = $$$.Dom(Card, "div", "");
            NameVal(Row, "Vendor", this.ReceiptData[yindex].Vendor);

            Row = $$$.Dom(Card, "div", "");
            NameVal(Row, "Class", this.ReceiptData[yindex].Class);
            Row = $$$.Dom(Card, "div", "");
            NameVal(Row, "Unit", this.ReceiptData[yindex].Unit);
            Row = $$$.Dom(Card, "div", "");
            NameVal(Row, "Mileage", this.ReceiptData[yindex].Miles);
            Row = $$$.Dom(Card, "div", "");
            NameVal(Row, "Gallons", this.ReceiptData[yindex].Gallons);

            Row = $$$.Dom(Card, "div", "Bold");
            var Data = moment(this.ReceiptData[yindex].Created).format("ddd MMM do hh:mm a");
            $$$.Text(Row, Data);

            Row = $$$.Dom(Card, "div", "TextCenter");
            var Button = $$$.Button(Row, "Photo", null);
            var Path = $$$.ReceiptPath + this.ReceiptData[yindex].RID + this.ReceiptData[yindex].DataType;
            
            Button.onclick = this.OpenDoc.bind(this, Path);
            yindex++;
        }
    }
    ListOBJ.prototype.OnData = function (obj) {
        
        this.ReceiptData.length = 0;
        if ("json" in obj) {
            if ("Receipt" in obj.json) {
                this.ReceiptData = obj.json.Receipt;
            }
        }
        this.Output();
    }
    ListOBJ.prototype.GetData = function () {
        
        var Pack = $$$.NewPack();
        Pack.url = "GetReceipt.htm";
        Pack.callback = this.OnData.bind(this);
        Pack.PostData.append("ProjectRID", this.Project.RID);
        $$$.Server(Pack);

    }
    ListOBJ.prototype.Init = function (obj) {
        this.Project = obj.Project;
        this.Target = obj.Target;
        this.UserData = obj.UserData;
        this.Root = $$$.Dom(this.Target, "div", null);
        this.GetData();

    }
    ////////////////////////////////////////////////////////////////////////////
    function CreateOBJ() { }
    //RID, ProjectRID, UserRID, Created, Amount, Miles, Gallons, Class, UnitRID, DataType, Notes, Vendor
    CreateOBJ.prototype.Data = NewReceipt();
    CreateOBJ.prototype.Input = null;
    CreateOBJ.prototype.Preview = null;
    CreateOBJ.prototype.EquipData = [];
    CreateOBJ.prototype.reader = null;
    CreateOBJ.prototype.File = null;
    CreateOBJ.prototype.List = new ListOBJ();
    //this.reader
    CreateOBJ.prototype.Render = function () {
        $$$.Flush(this.Preview);
        var Row = null;
        var Left = null;
        var Right = null;
        Row = $$$.Dom(this.Preview, "div", "TextLeft Bold");
        $$$.Text(Row, "New Receipt Preview");

        Row = $$$.Dom(this.Preview, "div", null);
        Left = $$$.Dom(Row, "span", "Bold");
        Right = $$$.Dom(Row, "span", "");
        $$$.Text(Left, "Class: ");
        $$$.Text(Right, this.Data.Class);
        Row = $$$.Dom(this.Preview, "div", null);
        Left = $$$.Dom(Row, "span", "Bold");
        Right = $$$.Dom(Row, "span", "");
        $$$.Text(Left, "Vendor: ");
        $$$.Text(Right, this.Data.Vendor);

        Row = $$$.Dom(this.Preview, "div", null);
        Left = $$$.Dom(Row, "span", "Bold");
        Right = $$$.Dom(Row, "span", "");
        $$$.Text(Left, "Amount: ");
        $$$.Text(Right, this.Data.Amount);

        Row = $$$.Dom(this.Preview, "div", null);
        Left = $$$.Dom(Row, "span", "Bold");
        Right = $$$.Dom(Row, "span", "");
        $$$.Text(Left, "Gallons: ");
        $$$.Text(Right, this.Data.Gallons);

        Row = $$$.Dom(this.Preview, "div", null);
        Left = $$$.Dom(Row, "span", "Bold");
        Right = $$$.Dom(Row, "span", "");
        $$$.Text(Left, "Unit: ");
        $$$.Text(Right, this.Data.UnitRID);

        Row = $$$.Dom(this.Preview, "div", null);
        $$$.Text(Row, this.Data.Notes);

        Row = $$$.Dom(this.Preview, "div", null);
        if(this.reader)
        {
            //console.dir(this.reader.result);
            var I = $$$.Dom(Row, "img", "ReceiptPreviewImage");
            I.src = this.reader.result;
            I.style.width = 300;
        }
        
    };
    CreateOBJ.prototype.OnCancel = function () { this.OnStart(); }
    CreateOBJ.prototype.OnSubmitCallback = function (obj) {
        
        $$$.Flush(this.Root);
        $$$.Flush(this.Preview);
        this.reader = null;
        this.OnStart();
        this.List.GetData();
    }
    CreateOBJ.prototype.OnSubmit = function () {
        $$$.Flush(this.Root);
        $$$.Flush(this.Preview);
        var I=$$$.Dom(this.Preview, "img", "Image");
        I.src = $$$.ImagePath + "spinner.gif";
        var Pack = $$$.NewPack();
        Pack.url = "NewReceipt.htm";
        Pack.callback = this.OnSubmitCallback.bind(this);
        Pack.PostData.append("ProjectRID", this.Project.RID);
        Pack.PostData.append("UserRID", this.UserData.RID);
        Pack.PostData.append("Vendor", this.Data.Vendor);
        Pack.PostData.append("Amount", this.Data.Amount);
        Pack.PostData.append("Miles", this.Data.Miles);
        Pack.PostData.append("Gallons", this.Data.Gallons);
        Pack.PostData.append("Class", this.Data.Class);
        Pack.PostData.append("UnitRID", this.Data.UnitRID);
        Pack.PostData.append("FileData", this.File);
        Pack.PostData.append("Ext", $$$.GetFileExt(this.File));
        $$$.Server(Pack);
    }
    CreateOBJ.prototype.OnReader = function (obj) {

        $$$.Flush(this.Root);
        var Row = $$$.Dom(this.Root, "div", null);
        $$$.Button(Row, "Cancel", this.OnCancel.bind(this));
        var B = $$$.Button(Row, "Finish", this.OnSubmit.bind(this));
        B.className = "Green Bold";
        this.Render();
    }
    CreateOBJ.prototype.OnPhoto = function () {
        this.File = this.Input.files[0];
        this.reader = new FileReader();
        this.reader.onload = this.OnReader.bind(this);
        this.reader.readAsDataURL(this.File);
    }
    CreateOBJ.prototype.OnNotes = function () {
        this.Data.Notes = this.Input.value;
        $$$.Flush(this.Root);
        this.Input = $$$.Input(this.Root, "input", "file", "Attach Photo");
        this.Input.onchange = this.OnPhoto.bind(this);
        this.Render($$$.Dom(this.Root, "div", null));
    }

    CreateOBJ.prototype.Notes = function () {
        $$$.Flush(this.Root);
        var Row = $$$.Dom(this.Root, "div", null);
        var Left = $$$.Dom(Row, "div", "Split");
        var Right = $$$.Dom(Row, "div", "Split");
        this.Input = $$$.Input(Left, "textarea", "", "Notes");
        $$$.Button(Right, "Cancel", this.OnCancel.bind(this));
        $$$.Button(Right, "Next", this.OnNotes.bind(this));
        this.Render($$$.Dom(this.Root, "div", null));
        this.Input.focus();
    }
    CreateOBJ.prototype.OnUnit = function () {
        this.Data.UnitRID = $$$.GetSelectVal(this.Input);

        this.Notes();
    }
    CreateOBJ.prototype.OnUnitData = function (obj) {
        if ("json" in obj) {
            if ("Equip" in obj.json) {
                this.EquipData = obj.json.Equip;
            }
        }
        $$$.Flush(this.Root);
        var Row = $$$.Dom(this.Root, "div", null);
        var Left = $$$.Dom(Row, "div", "Split");
        var Right = $$$.Dom(Row, "div", "Split");
        this.Input = $$$.Input(Left, "select", null, "Select Unit");
        $$$.Option(this.Input, "", "None");
        var y = this.EquipData.length;
        var yindex = 0;
        while (yindex != y) {
            $$$.Option(this.Input, this.EquipData[yindex].RID, this.EquipData[yindex].Unit);
            yindex++;
        }
        this.Input.onchange = this.OnUnit.bind(this);
        this.Input.focus();
        this.Render($$$.Dom(this.Root, "div", null));
    }
    CreateOBJ.prototype.GetUnit = function () {

        var Pack = $$$.NewPack();
        
        Pack.PostData.append("Table", "Equip");
        Pack.PostData.append("Offset", 0);
        Pack.PostData.append("Limit", 500);
        Pack.PostData.append("SortBy", "Unit");
        Pack.PostData.append("SortDirection", "ASC");
        Pack.url = "Ajax.htm";
        Pack.callback = this.OnUnitData.bind(this);
        $$$.Server(Pack);

    }
    //Hotel,vendor,amount,notes
    //Fuel,vendor,amount,gallon,unit,miles,notes
    //Repair,vendor,amount,unit,miles,notes
    CreateOBJ.prototype.OnGallon = function () {
        //this.Data.Gallons = this.Input.value;
        this.Data.Gallons = Number(this.Input.value);
        if (isNaN(this.Data.Gallons)) this.Data.Gallons = 0;
        if (this.Data.Gallons < 0.01) {
            this.Data.Gallons = 0;
            alert("Invalid Gallons");
            return;
        }
        this.GetUnit();
    }
    CreateOBJ.prototype.GetGallon = function () {
        $$$.Flush(this.Root);
        var Row = $$$.Dom(this.Root, "div", null);
        var Left = $$$.Dom(Row, "div", "Split");
        var Right = $$$.Dom(Row, "div", "Split");
        this.Input = $$$.Input(Left, "input", "text", "Gallons");
        $$$.Button(Right, "Cancel", this.OnCancel.bind(this));
        $$$.Button(Right, "Next", this.OnGallon.bind(this));
        this.Render($$$.Dom(this.Root, "div", null));
        var callback = this.OnGallon.bind(this);
        this.Input.onkeyup = function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                callback();
            }
        }
        this.Input.focus();
    }
    CreateOBJ.prototype.OnAmount = function () {
        this.Data.Amount = Number(this.Input.value);
        if (isNaN(this.Data.Amount)) this.Data.Amount = 0;
        if (this.Data.Amount < 0.01)
        {
            this.Data.Amount = 0;
            alert("Invalid Amount");
            return;
        }
        if (this.Data.Amount.length < 3) {
            this.Data.Amount = 0;
            alert("Invalid Amount");
            return;
        }
        switch (this.Data.Class) {
            case "Repair":
                this.GetUnit();
                break;
            case "Fuel":
                this.GetGallon();
                break;
            default:
                this.Notes();
                break;

        }
        
    }

    CreateOBJ.prototype.OnVendor = function () {
        this.Data.Vendor = this.Input.value;
        if (this.Data.Vendor.length < 1) {
            this.Data.Vendor = "";
            alert("Invalid Vendor");
            return;
        }
        $$$.Flush(this.Root);
        var Row = $$$.Dom(this.Root, "div", null);
        var Left = $$$.Dom(Row, "div", "Split");
        var Right = $$$.Dom(Row, "div", "Split");
        this.Input = $$$.Input(Left, "input", "text", "Amount");
        $$$.Button(Right, "Cancel", this.OnCancel.bind(this));
        $$$.Button(Right, "Next", this.OnAmount.bind(this));
        this.Render($$$.Dom(this.Root, "div", null));
        var callback = this.OnAmount.bind(this);
        this.Input.onkeyup = function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                callback();
            }
        }
        this.Input.focus();
    }
    
    CreateOBJ.prototype.OnClassSelect = function () {
        
        this.Data.Class = $$$.GetSelectVal(this.Input);
        
        $$$.Flush(this.Root);
        var Row = $$$.Dom(this.Root, "div", null);
        var Left = $$$.Dom(Row, "div", "Split");
        var Right = $$$.Dom(Row, "div", "Split");
        this.Input = $$$.Input(Left, "input", "text", "Vendor");
        $$$.Button(Right, "Cancel", this.OnCancel.bind(this));
        $$$.Button(Right, "Next", this.OnVendor.bind(this));
        this.Render($$$.Dom(this.Root, "div", null));
        
        var callback = this.OnVendor.bind(this);
        this.Input.onkeyup = function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if(code == 13)
            {
                callback();
            }
        }
        this.Input.focus();


    }
    CreateOBJ.prototype.OnStart = function () {
        this.reader = null;
        $$$.Flush(this.Root);
        $$$.Flush(this.Preview);
        this.Data = NewReceipt();
        var Row = $$$.Dom(this.Root, "div", null);
        var Left = $$$.Dom(Row, "div", "Split");
        var Right = $$$.Dom(Row, "div", "Split");
        this.Input = $$$.Input(Left, "select", null, "Select Receipt Class");
        $$$.Option(this.Input, "", "Select a class");
        $$$.Option(this.Input, "Hotel", "Hotel");
        $$$.Option(this.Input, "Fuel", "Fuel");
        $$$.Option(this.Input, "Repair", "Repair");
        $$$.Option(this.Input, "Material", "Material");
        $$$.Option(this.Input, "Other", "Other");
        this.Input.onchange = this.OnClassSelect.bind(this);
    }
    CreateOBJ.prototype.Init = function (obj) {
        this.Project = obj.Project;
        this.Target = obj.Target;
        this.UserData = obj.UserData;
        this.Root = $$$.Dom(this.Target, "div", "Box");
        this.Preview = $$$.Dom(this.Target, "div", "Box");
        this.OnStart();
        this.List.Init(obj);

    }
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    
    
    ////////////////////////////////////////////////////////////////////////////
    function OnStart(obj) {
        $$$.Flush(obj.Target);
        var Row = $$$.Dom(obj.Target, "div", "Big Left");
        $$$.Text(Row, "Receipt's");
        var Temp = new CreateOBJ();
        Temp.Init(obj);

        //Temp = new ListOBJ();
        //Temp.Init(obj);


    }
    ////////////////////////////////////////////////////////////////////////////
    function OnCom(obj) {
        switch (obj.Channel) {
            case "Omni":
                switch (obj.Event) {

                }
                break;
            case ModName:
                {
                    switch (obj.Event) {
                        case "Start":
                            OnStart(obj);
                            break;
                    }
                }
                break;
        }
    }
    ////////////////////////////////////////////////////////////////////////////

    function OnDepend() {
        $$$.Listen({ Channel: ModName, callback: OnCom });
    }
    $$$.Shout({ Channel: "Moment", Event: "Load", callback: OnDepend });
})(window, document);
