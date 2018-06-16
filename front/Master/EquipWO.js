
(function (window, document) {
    "use strict";
    var ModName = "EquipWO";
    //var Root = $$$.Dom(document.body, "div", "Container");
    //var ToolBar = $$$.Dom(Root, "div", "");
    //var ListRoot = $$$.Dom(Root, "div", "");
    var Root = null;
    var ToolBar = null;
    var ListRoot = null;
    var UserData = {};
    var EquipWO = [];
    var TroubleTarget = {};
    var Flag = 0;
    var EquipRID = 0;

    function ModOBJ() { }

    ModOBJ.prototype.OnClose = function (yindex) {
        var Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = this.GetList.bind(this);
        Pack.PostData.append("Table", "EquipWO");
        Pack.PostData.append("RID", EquipWO[yindex].RID);
        Pack.PostData.append("FName", "Flag");
        Pack.PostData.append("FVal", 1);
        $$$.Server(Pack);
    }
    ModOBJ.prototype.OnOpen = function (yindex) {
        var Pack = $$$.NewPack();
        Pack.url = "AjaxSet.htm";
        Pack.callback = this.GetList.bind(this);
        Pack.PostData.append("Table", "EquipWO");
        Pack.PostData.append("RID", EquipWO[yindex].RID);
        Pack.PostData.append("FName", "Flag");
        Pack.PostData.append("FVal", 0);
        $$$.Server(Pack);
    }
    ModOBJ.prototype.Output = function (yindex) {
        var Box = $$$.Dom(ListRoot, "div", "Mar Pad Border Smooth");
        var Row = null;
        var T = null;
        T = moment(EquipWO[yindex].Created).fromNow();
        Row = $$$.Dom(Box, "div", "Right Bold", T);
        Row = $$$.Dom(Box, "div", "Right Bold BlueFont", EquipWO[yindex].ScreenName);
        var T = EquipWO[yindex].Unit + " " + EquipWO[yindex].Year + " " + EquipWO[yindex].Make + " " + EquipWO[yindex].Model
        Row = $$$.Dom(Box, "div", "Bold GreenFont", T);
        function OnClick() {
            var Pack = {};
            Pack.Channel = "EquipWODetail";
            Pack.Event = "Start";
            Pack.Data = EquipWO[yindex];
            Pack.UserData = UserData;
            $$$.Shout(Pack);
        }
        function OnReceipt() {
            var Pack = {};
            Pack.Channel = "ReceiptList";
            Pack.Event = "Start";
            Pack.ProjectRID = 0;
            Pack.Header = T;
            Pack.UnitRID = EquipWO[yindex].EquipRID;
            Pack.UserData = UserData;
            $$$.Shout(Pack);
        }
        Row = $$$.Dom(Box, "div", "Right");
        $$$.Button(Row, "More", OnClick.bind(this));
        $$$.Button(Row, "Receipt", OnReceipt.bind(this));
        if(EquipWO[yindex].Flag==="0")
        {
            $$$.Button(Row, "Close", this.OnClose.bind(this, yindex));
        }
        if (EquipWO[yindex].Flag === "1") {
            $$$.Button(Row, "Re-Open", this.OnOpen.bind(this, yindex));
        }
    }
    ModOBJ.prototype.OnList = function (obj) {
        $$$.Flush(ListRoot);
        EquipWO.length = 0;
        if ("json" in obj) {
            if ("EquipWO" in obj.json) {
                EquipWO = obj.json.EquipWO;
            }
        }
        var y = EquipWO.length;
        var yindex = 0;
        while (yindex != y) {
            this.Output(yindex);
            yindex++;
        }
        if(EquipWO.length===0)
        {
            $$$.Dom(ListRoot, "div", "Box TextLeft", "The query returned zero Results. There may not be any Trouble Tickets for that Unit number or the filters you have set. Push the NEW button above to create one.");
        }
    }
    ModOBJ.prototype.GetList = function () {
        var Pack = $$$.NewPack();
        Pack.url = "GetEquipWO.htm";
        Pack.callback = this.OnList.bind(this);
        if (Flag === 0)
        {
            Pack.PostData.append("Flag", "0");
        }
        if (Flag === 1) {
            Pack.PostData.append("Flag", "1");
        }
        if (EquipRID > 0) {
            Pack.PostData.append("EquipRID", EquipRID);
        }
        $$$.Server(Pack);
    }
    ModOBJ.prototype.SetOpenFlag = function () {
        Flag = 0;
        this.GetList();
    }
    ModOBJ.prototype.SetCloseFlag = function () {
        Flag = 1;
        this.GetList();
    }
    ModOBJ.prototype.SetAllFlag = function () {
        Flag = 2;
        this.GetList();
    }
    ModOBJ.prototype.ToolBar = function () {
        
        $$$.Flush(ToolBar);
        var Box = $$$.Dom(ToolBar, "div", "Mar Pad Border Smooth Right");
        $$$.Button(Box, "View Open Tickets", this.SetOpenFlag.bind(this));
        $$$.Button(Box, "View Closed Ticket", this.SetCloseFlag.bind(this));
        $$$.Button(Box, "View All Tickets", this.SetAllFlag.bind(this));
        function OnNew() {
            var Pack = $$$.NewPack();
            Pack.Channel = "EquipWONew";
            Pack.Event = "Start";
            if (EquipRID > 0) {
                Pack.TroubleTarget = TroubleTarget;
            }
            Pack.UserData = UserData;
            $$$.Shout(Pack);
        }
        $$$.Button(Box, "New", OnNew.bind(this));

    }
    ModOBJ.prototype.Init = function (obj) {
        
        Root = $$$.Content;
        $$$.Flush(Root);
        ToolBar = $$$.Dom(Root, "div", "");
        ListRoot = $$$.Dom(Root, "div", "");
        
        if ("EquipRID" in obj) {
            EquipRID = $$$.MakeNumber(obj.EquipRID);
        }
        else {
            EquipRID = 0;
        }
        if ("TroubleTarget" in obj) {
            TroubleTarget = obj.TroubleTarget;
        }
        else {
            TroubleTarget = {};
        }

        
        //TroubleTarget = null;
        //UserData = obj.UserData;
        UserData = $$$.UserData;
        this.ToolBar();
        this.GetList();
        
    }
    function OnCom(obj) {
        switch (obj.Channel) {
            case "Omni":
                switch (obj.Event) {
                    case "Hide":
                        //$$$.Flush(ListRoot);
                        //$$$.Flush(ToolBar);
                        break;
                }
                break;
            case ModName:
                {
                    switch (obj.Event) {
                        case "Start":
                            var Temp = new ModOBJ();
                            Temp.Init(obj);
                            break;
                    }
                }
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
    Pack.callback = OnMoment.bind(this);
    $$$.Shout(Pack);

})(window, document);







