
(function (window, document) {
    var ModName = "DropZone";


    function DropZoneOBJ() { }
    DropZoneOBJ.prototype.Target = null;
    DropZoneOBJ.prototype.Callback = null;
    DropZoneOBJ.prototype.Ugly = null;
    DropZoneOBJ.prototype.OnDrag = function (e) {
        
        e.stopPropagation();
        e.preventDefault();
    }
    DropZoneOBJ.prototype.OnDrop = function (e) {
        
        e.stopPropagation();
        e.preventDefault();
        var obj = {};
        obj.Files = e.dataTransfer.files;
        this.Callback(obj);
    }
    DropZoneOBJ.prototype.OnSelect = function () {
        //console.dir(this.Ugly);
        //files
        var obj = {};
        obj.Files = this.Ugly.files;
        this.Callback(obj);


    }
    DropZoneOBJ.prototype.Init = function (obj) {
        this.Callback = obj.callback;
        this.Target = obj.Target;

        var DropZone = $$$.Dom(this.Target, "div", "DropZone");
        $$$.Text(DropZone, "Drop Files Here");
        DropZone.ondrop = this.OnDrop.bind(this);
        DropZone.ondragover = this.OnDrag.bind(this);
        DropZone.ondragenter = this.OnDrag.bind(this);

        var Row = $$$.Dom(this.Target, "div", "");
        this.Ugly = $$$.Dom(Row, "input", null);
        this.Ugly.type = "file";
        this.Ugly.onchange = this.OnSelect.bind(this);
        if (obj.Multi === true) {
            this.Ugly.multiple = true;
        }

    }



    function OnCreate(obj) {
        var Temp = new DropZoneOBJ();
        Temp.Init(obj);
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
                        case "Create":
                            OnCreate(obj);
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