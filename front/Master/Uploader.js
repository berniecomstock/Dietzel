(function (window, document) {
    var ModName = "Uploader";
    function DropZoneOBJ() { }
    DropZoneOBJ.prototype.Target = null;
    DropZoneOBJ.prototype.Callback = null;
    DropZoneOBJ.prototype.Ugly = null;
    DropZoneOBJ.prototype.Form = null;

    DropZoneOBJ.prototype.ImagePreview = function (file) {

        //obj.ImageSRC;

        var Temp = $$$.Dom(this.Target, "div", "", "");
        var reader = new FileReader();
        var thecallback = this.Callback;
        function CanvasCallback(obj) {
            obj.Type = $$$.GetFileExt(file);
            obj.Name = file.name;
            thecallback(obj);
        }
        function OnReader() {
            var Pack = {};
            Pack.Target = Temp;
            Pack.ImageSRC = reader.result;
            Pack.callback = CanvasCallback.bind(this);
            Pack.Channel = "Canvas";
            Pack.Event = "Load";
            $$$.Shout(Pack);
        }
        reader.onload = OnReader;
        reader.readAsDataURL(file);

    }
    

    DropZoneOBJ.prototype.ProcessFiles = function (files) {
        var thecallback = this.Callback;
        var y = files.length;
        var yindex = 0;
        console.log("DropZoneOBJ.prototype.ProcessFiles Count="+y);
        while (yindex != y) {
            var Ext = $$$.GetFileExt(files[yindex]);
            Ext = Ext.toUpperCase();
            if (Ext === ".JPG") { this.ImagePreview(files[yindex]); }
            else if (Ext === ".JPEG") { this.ImagePreview(files[yindex]); }
            else if (Ext === ".PNG") { this.ImagePreview(files[yindex]); }
            else {
                var Pack = $$$.NewPack();
                Pack.Type = Ext;
                Pack.Name = files[yindex].name;
                Pack.FileData = files[yindex];
                Pack.Target=$$$.Dom(this.Target, "div", "", "");
                thecallback(Pack);
            }
            yindex++;
        }
        this.Form.reset();
    }

    DropZoneOBJ.prototype.OnDrag = function (e) {

        e.stopPropagation();
        e.preventDefault();
    }
    DropZoneOBJ.prototype.OnDrop = function (e) {

        e.stopPropagation();
        e.preventDefault();
        this.ProcessFiles(e.dataTransfer.files);
    }
    DropZoneOBJ.prototype.OnSelect = function () {

        this.ProcessFiles(this.Ugly.files);
    }
    DropZoneOBJ.prototype.Init = function (obj) {

        this.Target = null;
        this.Callback = null;
        this.Ugly = null;
        this.Form = null;

        this.Callback = obj.callback;
        this.Target = obj.Target;
        this.Form = $$$.Dom(this.Target, "form", "");


        var DropZone = $$$.Dom(this.Form, "div", "DropZone");
        $$$.Text(DropZone, "Drop Files Here");
        DropZone.ondrop = this.OnDrop.bind(this);
        DropZone.ondragover = this.OnDrag.bind(this);
        DropZone.ondragenter = this.OnDrag.bind(this);

        //var Row = $$$.Dom(this.Target, "div", "");
        this.Ugly = $$$.Dom(DropZone, "input", null);
        this.Ugly.type = "file";
        this.Ugly.onchange = this.OnSelect.bind(this);
        //if (obj.Multi === true) {
        //    this.Ugly.multiple = true;
        //}
        this.Ugly.multiple = true;

    }
    function OnCom(obj) {
        switch (obj.Event) {
            case "Start":
                var Temp = new DropZoneOBJ();
                Temp.Init(obj);
                //OnStart(obj);
                break;
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    $$$.Listen({ Channel: ModName, callback: OnCom });
})(window, document);
