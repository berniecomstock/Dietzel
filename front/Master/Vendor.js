


(function (window, document) {
    var ModName = "Vendor";
    
    var Root = null;
    var Header = null;
    
    var UserData = {};
    
    

    function VendorOBJ() { }
    VendorOBJ.prototype.Data = [];
    VendorOBJ.prototype.Output = function (yindex) {
        var url = $$$.BinPath + this.Data[yindex].DocRID + this.Data[yindex].DataType;
        var Row = $$$.Dom(Root, "div", "Box TextLeft Bold");
        var A = $$$.Dom(Row, "a", "");
        A.href = url;
        A.target = "_blank";
        $$$.Text(A, this.Data[yindex].DocName);
    }

    VendorOBJ.prototype.OnData = function (obj) {

        this.Data.length = 0;
        if ("json" in obj) {
            if ("UserDocs" in obj.json) {
                this.Data = obj.json.UserDocs;
            }
        }
        var y = this.Data.length;
        var yindex = 0;
        while (yindex != y) {
            if (UserData.RID === this.Data[yindex].UserRID) {
                this.Output(yindex);
            }
            yindex++;
        }
        
    }

    
    VendorOBJ.prototype.Init = function () {
        
        $$$.Text(Header, UserData.ScreenName);
        var Pack = $$$.NewPack();
        Pack.url = "GetUserDocs.htm";
        Pack.callback = this.OnData.bind(this);
        $$$.Server(Pack);
    }

    function OnStart(obj) {
        
        Root = $$$.Content;
        Header = $$$.Dom(Root, "div", "Box");
        UserData = $$$.UserData;
        var Temp = new VendorOBJ();
        Temp.Init();

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
                            OnStart(obj);
                            
                            break;
                    }
                }
                break;
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    function RunOnce() {
        var Pack = {};
        Pack.Channel = ModName;
        Pack.callback = OnCom;
        $$$.Listen(Pack);
    }


    RunOnce();


})(window, document);