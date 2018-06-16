/*
Trac hours
track miles
part numbers
service interv
*/
(function (window, document) {
    var ModName = "Equip";
    var ModCat = "None";
    var Root = null;
    var UserData = {};
    var Equip = [];
    var PopElement = null;
    function OnPopExit() { }
    function UnPop() {
        OnPopExit();
        if (PopElement) document.body.removeChild(PopElement);
        document.body.style.overflow = "auto";
        PopElement = null;
    }
    function Pop() {

        document.body.style.overflow = "hidden";
        PopElement = $$$.Dom(document.body, "div", "Pop");
        var Target = $$$.Dom(PopElement, "div", "Container");
        var Row = $$$.Dom(Target, "div", "TextLeft Box");
        $$$.Button(Row, "Back", UnPop.bind(this));
        return Target;
    }
    function Iframe(target, path) {
        var I = $$$.Dom(target, "iframe", "");
        I.style.width = "100%";
        I.style.height = $$$.ScreenWidth() + "px";
        I.src = path;

    }

    function EquipOBJ() { }
    EquipOBJ.prototype.Index = 0;
    EquipOBJ.prototype.DocRow = null;
    EquipOBJ.prototype.Docs = [];

    EquipOBJ.prototype.LoadPDF = function () { }
    EquipOBJ.prototype.DocOutput = function () {


        function OnClose() { $$$.Flush(this.DocPre); };

        function OnClick(index) {
            $$$.Flush(this.DocPre);
            var Type = this.Docs[index].DataType.toUpperCase();
            var Path = $$$.EquipPath + this.Docs[index].RID + this.Docs[index].DataType;
            switch (Type) {
                case ".JPG":
                    var Row = $$$.Dom(this.DocPre, "div", "TextRight");
                    $$$.Button(Row, "X", OnClose.bind(this));
                    var I = $$$.Dom(this.DocPre, "img", "Image");
                    I.src = Path;
                    break;
                case ".PNG":
                    var Row = $$$.Dom(this.DocPre, "div", "TextRight");
                    $$$.Button(Row, "X", OnClose.bind(this));
                    var I = $$$.Dom(this.DocPre, "img", "Image");
                    I.src = Path;
                    break;
                case ".PDF":
                    $$$.Shout({ Channel: "PDFLoader", Event: "Start", url: Path, Target: this.DocPre });
                    break;

                default:
                    window.open(Path, '_blank');
                    break;
            }
            console.log("Click=" + Type);
        }
        //$$$.
        var Find = $$$.FindInArray(this.Docs, "Cat", "1");
        if (Find > -1) { $$$.Button(this.DocLinks, "Photo", OnClick.bind(this, Find)); }
        Find = $$$.FindInArray(this.Docs, "Cat", "2");
        if (Find > -1) { $$$.Button(this.DocLinks, "CabCard", OnClick.bind(this, Find)); }
        Find = $$$.FindInArray(this.Docs, "Cat", "3");
        if (Find > -1) { $$$.Button(this.DocLinks, "Insurance", OnClick.bind(this, Find)); }
        Find = $$$.FindInArray(this.Docs, "Cat", "4");
        if (Find > -1) { $$$.Button(this.DocLinks, "Inspection", OnClick.bind(this, Find)); }
        Find = $$$.FindInArray(this.Docs, "Cat", "5");
        if (Find > -1) { $$$.Button(this.DocLinks, "IFTA", OnClick.bind(this, Find)); }

        var y = this.Docs.length;
        var yindex = 0;
        while (yindex != y) {

            if (this.Docs[yindex].Cat === "0") {
                //console.log(this.Docs[yindex].Name);
                $$$.Button(this.DocLinks, this.Docs[yindex].Name, OnClick.bind(this, yindex));
            }

            yindex++;
        }
    }

    EquipOBJ.prototype.OnDocs = function (obj) {
        this.Docs.length = 0;
        if ("json" in obj) {
            if ("EquipUpLoads" in obj.json) {
                this.Docs = obj.json.EquipUpLoads;
            }
        }
        this.DocOutput();
    }

    EquipOBJ.prototype.GetDocs = function () {
        $$$.Flush(this.DocRow);
        this.DocLinks = $$$.Dom(this.DocRow, "div", "");
        this.DocPre = $$$.Dom(this.DocRow, "div", "");

        var Pack = $$$.NewPack();
        Pack.url = "Ajax.htm";
        Pack.callback = this.OnDocs.bind(this);
        Pack.PostData.append("Table", "EquipUpLoads");
        Pack.PostData.append("Offset", 0);
        Pack.PostData.append("Limit", 500);
        Pack.PostData.append("EquipRID", Equip[this.Index].RID);
        $$$.Server(Pack);

    }
    EquipOBJ.prototype.OnClick = function () {
        var Target = $$$.Dom($$$.Pop(), "div", "Mar Pad Border Smooth");
        this.DocRow = $$$.Dom(Target, "div", "");
        var Data = Equip[this.Index];
        this.GetDocs();
        var Row = null;
        var Left = null;
        var Right = null;
        var Input = null;
        var Name = "";
        var Val = "";
        var Inputs = {};
        function Save(name) {

            if (name in Inputs) { }
            else {
                console.log("Not Found=" + name);
                return;
            }

            if (Inputs[name].value === Data[name]) return;
            Data[name] = Inputs[name].value;
            var Pack = $$$.NewPack();
            Pack.url = "AjaxSet.htm";
            Pack.callback = function () { };
            Pack.PostData.append("Table", "Equip");
            Pack.PostData.append("FName", name);
            Pack.PostData.append("RID", Data.RID);
            Pack.PostData.append("FVal", Data[name]);
            $$$.Server(Pack);
        }
        function OnExit() {
            Save("Unit");
            Save("VIN");
            Save("Year");
            Save("Make");
            Save("Model");
            Save("GVW");
            Save("License");
            Save("Register");
            Save("Notes");
            this.Output();
        }
        OnPopExit = OnExit.bind(this);
        Row = $$$.Dom(Target, "div", "");
        Left = $$$.Dom(Row, "div", "Split");
        Right = $$$.Dom(Row, "div", "Split");

        function OnCat(event) {
            var target = event.target || event.srcElement || event.originalTarget;
            var val = $$$.GetSelectVal(target);


            var Pack = $$$.NewPack();
            Pack.url = "AjaxSet.htm";
            Pack.callback = function () { };
            Pack.PostData.append("Table", "Equip");
            Pack.PostData.append("FName", "Cat");
            Pack.PostData.append("RID", Data.RID);
            Pack.PostData.append("FVal", val);
            $$$.Server(Pack);



            Data.Cat = val;
        }
        Input = $$$.Input(Left, "select", "", "Cat");
        $$$.Option(Input, Data.Cat, Data.Cat);
        $$$.Option(Input, "PickUp", "PickUp");
        $$$.Option(Input, "UtilityTruck", "UtilityTruck");
        $$$.Option(Input, "UtilityTrailer", "UtilityTrailer");
        $$$.Option(Input, "OffRoad", "OffRoad");
        $$$.Option(Input, "Drill", "Drill");
        $$$.Option(Input, "Semi", "Semi");
        $$$.Option(Input, "Heavy", "Heavy");
        $$$.Option(Input, "Tooling", "Tooling");
        $$$.Option(Input, "Forms", "Forms");
        $$$.Option(Input, "Casing", "Casing");
        $$$.Option(Input, "Fluid", "Fluid");
        $$$.Option(Input, "Rigging", "Rigging");
        $$$.Option(Input, "None", "None");
        $$$.Option(Input, "DeletedUnits", "DeletedUnits");
        Input.onchange = OnCat.bind(this);



        Row = $$$.Dom(Target, "div", "");
        Left = $$$.Dom(Row, "div", "Split");
        Right = $$$.Dom(Row, "div", "Split");
        Name = "Unit";
        Val = Data[Name];
        Input = $$$.Input(Left, "input", "text", Name); Input.value = Val; Inputs[Name] = Input;
        Name = "VIN";
        Val = Data[Name];
        Input = $$$.Input(Right, "input", "text", Name); Input.value = Val; Inputs[Name] = Input;


        Row = $$$.Dom(Target, "div", "");
        Left = $$$.Dom(Row, "div", "Split");
        Right = $$$.Dom(Row, "div", "Split");
        Name = "Year";
        Val = Data[Name];
        Input = $$$.Input(Left, "input", "text", Name); Input.value = Val; Inputs[Name] = Input;
        Name = "Make";
        Val = Data[Name];
        Input = $$$.Input(Right, "input", "text", Name); Input.value = Val; Inputs[Name] = Input;


        Row = $$$.Dom(Target, "div", "");
        Left = $$$.Dom(Row, "div", "Split");
        Right = $$$.Dom(Row, "div", "Split");
        Name = "Model";
        Val = Data[Name];
        Input = $$$.Input(Left, "input", "text", Name); Input.value = Val; Inputs[Name] = Input;
        Name = "GVW";
        Val = Data[Name];
        Input = $$$.Input(Right, "input", "text", Name); Input.value = Val; Inputs[Name] = Input;
        //Year, Make, Model, License, GVW, Register

        Row = $$$.Dom(Target, "div", "");
        Left = $$$.Dom(Row, "div", "Split");
        Right = $$$.Dom(Row, "div", "Split");
        Name = "License";
        Val = Data[Name];
        Input = $$$.Input(Left, "input", "text", Name); Input.value = Val; Inputs[Name] = Input;


        Row = $$$.Dom(Right, "div", "");

        var DP = new $$$.DatePicker(Row, Data, "Register", "Registration Date");
        Inputs["Register"] = DP.Input;

        //Name = "Register";
        //Val = Data[Name];
        //Input = $$$.Input(Right, "input", "text", Name); Inputs[Name] = Input;
        //new Pikaday({ field: Input });
        //Input.value = Val;

        Row = $$$.Dom(Target, "div", "");
        Name = "Notes";
        Val = Data[Name];
        Input = $$$.Input(Row, "textarea", "", Name); Inputs[Name] = Input;
        Input.value = Val;


        Row = $$$.Dom(Target, "div", "Right");
        $$$.Button(Row, "Save", OnExit.bind(this));

        this.UploadBucket = $$$.Dom(Target, "div", "");
        this.Spinner = $$$.Dom(Target, "div", "");
        this.InitUploads();

    }
    EquipOBJ.prototype.OnUploadDone = function (obj) {
        this.GetDocs();
        $$$.Block(this.UploadBucket);
        $$$.Flush(this.Spinner);
    }

    EquipOBJ.prototype.OnUpload = function (obj) {
        $$$.None(this.UploadBucket);
        //this.Spinner
        var I = $$$.Dom(this.Spinner, "img", "Image");
        I.src = $$$.ImgPath + "Spinner.gif";

        var TheFile = obj.Files[0];

        var Pack = $$$.NewPack();
        Pack.url = "EquipUpload.htm";
        Pack.callback = this.OnUploadDone.bind(this);
        Pack.PostData.append("Type", $$$.GetFileExt(TheFile));
        Pack.PostData.append("Name", TheFile.name);
        Pack.PostData.append("EquipRID", Equip[this.Index].RID);
        Pack.PostData.append("Data", TheFile);
        Pack.PostData.append("Cat", obj.Cat);
        $$$.Server(Pack);
    }
    EquipOBJ.prototype.InitUploads = function () {

        var Ugly = null;
        var Left = $$$.Dom(this.UploadBucket, "div", "Split");
        var Right = $$$.Dom(this.UploadBucket, "div", "Split");
        var Cat = $$$.Input(Left, "select", null, "Select Doc Category");
        $$$.Option(Cat, "", "Select Upload Type");
        $$$.Option(Cat, "1", "Photo");
        $$$.Option(Cat, "2", "CabCard");
        $$$.Option(Cat, "3", "Insurance");
        $$$.Option(Cat, "4", "Inspection");
        $$$.Option(Cat, "5", "IFTA");
        $$$.Option(Cat, "0", "Misc");
        var DropZone = $$$.Dom(Right, "div", "DropZone");
        $$$.Text(DropZone, "Drop Files Or Browse ");
        $$$.None(DropZone);

        var TheCat = "";

        function OnCat() {
            TheCat = $$$.GetSelectVal(Cat);
            if (TheCat === "") return;
            $$$.Block(DropZone);
        }

        Cat.onchange = OnCat.bind(this);


        function OnSelect() {
            var obj = {};
            obj.Files = Ugly.files;
            obj.Cat = TheCat;
            this.OnUpload(obj);
        }

        function OnDrop(e) {
            e.stopPropagation();
            e.preventDefault();
            var obj = {};
            obj.Files = e.dataTransfer.files;
            obj.Cat = TheCat;
            this.OnUpload(obj);
        }
        function OnDrag(e) {
            e.stopPropagation();
            e.preventDefault();
        }
        DropZone.ondrop = OnDrop.bind(this);
        DropZone.ondragover = OnDrag.bind(this);
        DropZone.ondragenter = OnDrag.bind(this);
        Ugly = $$$.Dom(DropZone, "input", null);
        Ugly.type = "file";
        Ugly.onchange = OnSelect.bind(this);

    }

    EquipOBJ.prototype.OnReceiptData = function (obj) { }
    EquipOBJ.prototype.OnReceipt = function (header) {

        var Data = Equip[this.Index];
        var Pack = {};
        Pack.Channel = "ReceiptList";
        Pack.Event = "Start";
        Pack.ProjectRID = 0;
        Pack.UnitRID = Data.RID;
        Pack.UserData = UserData;
        Pack.Header = header;
        $$$.Shout(Pack);

    }
    EquipOBJ.prototype.OnTrouble = function () {
        var Pack = {};
        Pack.Channel = "Omni";
        Pack.Event = "Hide";
        $$$.Shout(Pack);


        Pack = {};
        Pack.UserData = UserData;
        Pack.Channel = "EquipWO";
        Pack.Event = "Start";
        Pack.TroubleTarget = Equip[this.Index];
        Pack.EquipRID = Equip[this.Index].RID;
        $$$.Shout(Pack);

    }
    EquipOBJ.prototype.OnGroupCallback = function (obj) {
        var Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = function () { };
        Pack.PostData.append("Table", "Equip");
        Pack.PostData.append("RID", obj.TableRID);
        Pack.PostData.append("FName", "GroupRID");
        Pack.PostData.append("FVal", obj.RID);
        $$$.Server(Pack);
    }
    EquipOBJ.prototype.OnGroup = function (Data) {
        var T = Data.Unit + " " + Data.Year + " " + Data.Make + " " + Data.Model;
        var Pack = $$$.NewPack();
        Pack.Channel = "GroupSelect";
        Pack.Event = "Start";
        Pack.Header = "Select Group For: " + T;
        Pack.callback = this.OnGroupCallback.bind(this);
        Pack.TableRID = Data.RID;
        $$$.Shout(Pack);
    }

    EquipOBJ.prototype.Output = function () {
        $$$.Flush(this.Box);
        var Data = Equip[this.Index];
        if (Data.Cat === ModCat) { }//check for cat change
        else { Root.removeChild(this.Box); return; }
        var Row = $$$.Dom(this.Box, "div", "GreenFont Bold");
        var T = Data.Unit + " " + Data.Year + " " + Data.Make + " " + Data.Model;
        $$$.Text(Row, T);
        var Row = $$$.Dom(this.Box, "div", "Right");
        $$$.Button(Row, "Details", this.OnClick.bind(this));
        $$$.Button(Row, "Receipts", this.OnReceipt.bind(this, T));
        if (Data.Unit[0] === "E") {
            $$$.Button(Row, "Trouble", this.OnTrouble.bind(this));
        }
        //$$$.Button(Row, "Group", this.OnGroup.bind(this, Data));
    }

    EquipOBJ.prototype.Init = function (index) {
        this.Index = index;
        this.Box = $$$.Dom(Root, "div", "Mar Pad Border Smooth");
        this.Output();
    }
    function Filter() {
        var Box = $$$.Dom(Root, "div", "Pad Mar Border Smooth");
        var Left = $$$.Dom(Box, "div", "Split");
        var Right = $$$.Dom(Box, "div", "Split");
        var One = $$$.Dom(Right, "div", "Split");
        var Two = $$$.Dom(Right, "div", "Split");
        var NewUnit = $$$.Input(One, "input", "text", "Unit");

        function OnCreate() {

            var Pack = $$$.NewPack();
            Pack.url = "NewEquip.htm";
            Pack.callback = GetData.bind(this);
            Pack.PostData = new FormData();
            Pack.PostData.append("Unit", NewUnit.value);
            Pack.PostData.append("Cat", ModCat);
            $$$.Server(Pack);
        }
        $$$.Button(Two, "Create New", OnCreate.bind(this));



        var Select = $$$.Input(Left, "select", "", "Category");
        function OnSelect() {
            ModCat = $$$.GetSelectVal(Select);
            //ModCat = val;
            GetData();

        }
        $$$.Option(Select, ModCat, ModCat);
        $$$.Option(Select, "PickUp", "PickUp");
        $$$.Option(Select, "UtilityTruck", "UtilityTruck");
        $$$.Option(Select, "UtilityTrailer", "UtilityTrailer");
        $$$.Option(Select, "OffRoad", "OffRoad");
        $$$.Option(Select, "Drill", "Drill");
        $$$.Option(Select, "Semi", "Semi");
        $$$.Option(Select, "Heavy", "Heavy");
        $$$.Option(Select, "Tooling", "Tooling");
        $$$.Option(Select, "Forms", "Forms");
        $$$.Option(Select, "Casing", "Casing");
        $$$.Option(Select, "Fluid", "Fluid");
        $$$.Option(Select, "Rigging", "Rigging");
        $$$.Option(Select, "None", "None");
        $$$.Option(Select, "DeletedUnits", "DeletedUnits");
        Select.onchange = OnSelect.bind(this);


    }
    function Output() {
        $$$.Flush(Root);
        Filter();
        var y = Equip.length;
        var yindex = 0;
        while (yindex != y) {
            var Temp = new EquipOBJ();
            Temp.Init(yindex);
            yindex++;
        }
    }

    function OnEquipData(obj) {
        if ("json" in obj) {
            if ("Equip" in obj.json) {
                Equip = obj.json.Equip;
            }
        }
        Output();
    }

    function GetData() {

        var Pack = $$$.NewPack();
        Pack.url = "Ajax.htm";
        Pack.callback = OnEquipData.bind(this);
        Pack.PostData.append("Table", "Equip");
        Pack.PostData.append("Offset", 0);
        Pack.PostData.append("Limit", 500);
        Pack.PostData.append("SortBy", "Unit");
        Pack.PostData.append("SortDirection", "ASC");
        Pack.PostData.append("Cat", ModCat);
        $$$.Server(Pack);
    }

    ////////////////////////////////////////////////////////////////////////////
    function OnStart(obj) {
        //console.dir(obj);
        UserData = $$$.UserData;
        //UserData = obj.UserData;
        GetData();

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
                            Root = $$$.Content;
                            $$$.Flush(Root);
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
