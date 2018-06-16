
(function (window, document) {
    "use strict";
    var ModName = "ReceiptList";

    $$$.NameVal = function (t, n, v) {
        var Name = $$$.Dom(t, "div", "Flow", n);
        var Val = $$$.Dom(t, "div", "Flow Bold", v);
        //$$$.Dom(t, "dt", "", n);
        //$$$.Dom(t, "dd", "", v);

    }
    function ModOBJ() { }
    ModOBJ.prototype.FormRoot = null;
    ModOBJ.prototype.ListRoot = null;
    ModOBJ.prototype.UserData = {};
    ModOBJ.prototype.ProjectRID = 0;
    ModOBJ.prototype.UnitRID = 0;
    ModOBJ.prototype.Data = [];
    ModOBJ.prototype.ShowImage = function (url) {

        window.open(url+"?Scale="+$$$.ScreenWidth(), "_blank");
        
    }
    

    ModOBJ.prototype.Output = function (yindex) {
        var Data = this.Data[yindex];
        
        var TheDate = moment(Data.Created).format("ddd, MMM. Do, YYYY. h:mm a");
        var T = Data.Unit + " " + Data.Year + " " + Data.Make + " " + Data.Model;
        var Row = null;
        var Name = null;
        var Val = null;
        var Box = $$$.Dom(this.ListRoot, "div", "Flow Mar Pad Border Smooth");
        Row = $$$.Dom(Box, "div", "Right");
        var Ebutt = $$$.MatIcon(Row, "edit");

        Ebutt.addEventListener("click", function () {
            $$$.LoadScript("$EditReceipt", { Target: Box, Data: this.Data[yindex],callback:this.RunOutput.bind(this) });
        }.bind(this), false);

        Row = $$$.Dom(Box, "div", "Right Bold", TheDate);
        $$$.Dom(Box, "div", "Bold OrangeFont", Data.ProjectTitle);
        


        $$$.Dom(Box, "div", "Bold GreenFont", T);
        $$$.Dom(Box, "div", "Bold BlueFont", Data.ScreenName);
        Row = $$$.Dom(Box, "div", "", "");
        Name = $$$.Dom(Row, "span", "", "Class : ");
        Val = $$$.Dom(Row, "span", "Bold", Data.Class);
        Row = $$$.Dom(Box, "div", "", "");
        Name = $$$.Dom(Row, "span", "", "Vendor : ");
        Val = $$$.Dom(Row, "span", "Bold", Data.Vendor);
        Row = $$$.Dom(Box, "div", "", "");
        Name = $$$.Dom(Row, "span", "", "Amount : $");
        Val = $$$.Dom(Row, "span", "Bold RedFont", Data.Amount);
        Row = $$$.Dom(Box, "div", "Right", "");

        var url = $$$.ReceiptPath + Data.RID + Data.DataType;
        $$$.Button(Row, "View Receipt", this.ShowImage.bind(this, url));

        Row = $$$.Dom(Box, "div", "OrangeFont Bold W300", Data.Notes);
    }

    ModOBJ.prototype.RunOutput = function () {
        $$$.Flush(this.ListRoot);
        var y = this.Data.length;
        var yindex = 0;
        while (yindex != y) {
            this.Output(yindex);
            yindex++;
        }

    }
    ModOBJ.prototype.OnData = function (obj) {
        
        
        this.Data.length = 0;
        if ("json" in obj) {
            if ("Receipt" in obj.json) {
                this.Data = obj.json.Receipt;
            }
        }
        this.RunOutput();
        
    }
    ModOBJ.prototype.GetData = function () {
        
        var Pack = $$$.NewPack();
        Pack.callback = this.OnData.bind(this);
        Pack.url = "GetReceipt.htm";
        Pack.PostData.append("ProjectRID", this.ProjectRID);
        Pack.PostData.append("UnitRID", this.UnitRID);
        $$$.Server(Pack);
        
    }
    ModOBJ.prototype.OnForm = function () {
        var Pack = $$$.NewPack();
        Pack.Channel = "ReceiptForm";
        Pack.Event = "Start";
        Pack.ProjectRID = this.ProjectRID;
        Pack.UnitRID = this.UnitRID;
        Pack.UserData = this.UserData;
        Pack.callback = this.GetData.bind(this);
        $$$.Shout(Pack);

    }
    ModOBJ.prototype.Init = function (obj) {
        
        console.log(ModName);
        this.Header = obj.Header;
        this.ProjectRID = obj.ProjectRID;
        this.UnitRID = obj.UnitRID;
        this.UserData = obj.UserData;
        var Pop = $$$.Pop();
        this.FormRoot = $$$.Dom(Pop, "div", "Mar Pad Border Smooth");
        this.ListRoot = $$$.Dom(Pop, "div", "");
        this.GetData();

        $$$.Dom(this.FormRoot, "div", "Bold Big",this.Header);
        var Row = $$$.Dom(this.FormRoot, "div", "Right");
        $$$.Button(Row, "Add New Receipt", this.OnForm.bind(this));

    }
    function OnCom(obj) {
        switch (obj.Event) {
            case "Start":
                var Temp = new ModOBJ();
                Temp.Init(obj);
                break;
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    
    function OnMoment() {
        $$$.Listen({ Channel: ModName, callback: OnCom });
    }
    var Pack = {};
    Pack.Channel = "Moment";
    Pack.Event = "Load";
    Pack.callback = OnMoment;
    $$$.Shout(Pack);
})(window, document);