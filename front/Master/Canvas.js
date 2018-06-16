
(function (window, document) {
    var ModName = "Canvas";
    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    }
    
    function CanvasOBJ() { }
    CanvasOBJ.prototype.Canvas = null;
    CanvasOBJ.prototype.Context = null;
    CanvasOBJ.prototype.Init = function (obj) {
        this.Canvas = $$$.Dom(obj.Target, "canvas", "", "");
        this.Canvas.style.width = "100%";
        this.Canvas.style.height = "auto";
        this.Context = this.Canvas.getContext('2d');
        var I = new Image();
        function OnLoad() {

            var Max = 800;
            var r = 0;
            var sx = I.width;
            var sy = I.height;
            var dx = Max;
            var dy = Max;
            if (sx === sy) {
                r = 1;
                console.log("Square");
                dx = Max;
                dy = Max;
            }
            if (sx > sy) {

                r = sy / sx;
                console.log("Landscape");
                dx = Max;
                dy = Math.floor(Max * r);
            }
            if (sy > sx) {

                r = sx / sy;
                console.log("Portrait");
                dy = Max;
                dx = Max * r;
                dx=Math.floor(Max * r);
            }
            
            console.log(I.width + " X " + I.height + " - " + dx + " X " + dy);
            this.Canvas.width = dx;
            this.Canvas.height = dy;
            this.Context.drawImage(I, 0, 0, sx, sy, 0, 0, dx, dy);
            obj.FileData = dataURItoBlob(this.Canvas.toDataURL("image/png", 1));
            obj.Target.removeChild(this.Canvas);
            obj.callback(obj);
            

        }
        I.onload = OnLoad.bind(this);
        I.src = obj.ImageSRC;
    }

    function Load(obj) {
        
        var Temp = new CanvasOBJ();
        Temp.Init(obj);
    }
    function OnCom(obj) {
        switch (obj.Event) {
            case "Load":
                Load(obj);
                break;
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    $$$.Listen({ Channel: ModName, callback: OnCom });
})(window, document);