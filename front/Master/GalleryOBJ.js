(function () {
    "use strict";
    let ModName = "GalleryOBJ";
    let ExitFlag = false;

    

    
    function ToolBarOBJ(target) {
        let Wrapper, Row = null;
        Wrapper = new $$$.ElementOBJ();
        Wrapper.Mar().Pad().Border().Smooth();
        Wrapper.SetBGroundColor(255, 255, 255);
        Wrapper.Element.style.opacity = "0.8";
        Wrapper.Element.style.maxWidth = "320px";


        Wrapper.Div().Flow().Left().WidthP(33).Bold().Text("Small");
        this.ScaleValue=Wrapper.Div().Flow().Center().WidthP(33).Bold().Text("Scale");
        Wrapper.Div().Flow().Right().WidthP(33).Bold().Text("Large");
        this.Scale = new $$$.SliderOBJ(Wrapper.Element,32, 3200, 1, 320);
        this.Scale.SetInput(this.OnScaleInput.bind(this));
        
        Wrapper.Div().Flow().Left().WidthP(33).Bold().Text("Short");
        this.SpeedValue = Wrapper.Div().Flow().Center().WidthP(33).Bold().Text("Delta");
        Wrapper.Div().Flow().Right().WidthP(33).Bold().Text("Long");
        this.Speed = new $$$.SliderOBJ(Wrapper.Element, 1, 120, 1, 10);
        this.Speed.SetInput(this.OnDeltaInput.bind(this));

        let QuitButton = Wrapper.Div().Right().Button("Exit", function () { ExitFlag = true;}).SetClass("OrangeFont").SetBGroundColor(255, 255, 255);
        QuitButton.Element.style.opacity = "1";

        
        this.Wrapper = Wrapper;
        Wrapper.appendChild(this.ScaleSlider);
        target.appendChild(Wrapper.Element);

        this.OnScaleInput();
    }
    ToolBarOBJ.prototype.OnDeltaInput = function () {
        this.SpeedValue.Text("Delta: " + this.GetDelta());
    }
    ToolBarOBJ.prototype.OnScaleInput = function () {
        this.ScaleValue.Text("Scale: " + this.GetScale());
    }
    ToolBarOBJ.prototype.Show = function () { this.Wrapper.Element.style.display = "block"; };
    ToolBarOBJ.prototype.Hide = function () { this.Wrapper.Element.style.display = "none"; };
    ToolBarOBJ.prototype.GetScale = function () {
        return this.Scale.Element.value;
    }
    ToolBarOBJ.prototype.GetDelta = function () {
        return this.Speed.Element.value * 1000;
    }
    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    function GalleryOBJ() {
        this.State = 0;
        this.Delta = 0;
        this.DeltaTarget = 2000;
        this.LastFrame = $$$.Engine.WorldTime;
        this.Index = 0;
        this.OldBody = document.createElement("body");
        this.Body = document.createElement("body");
        
        this.Busy = false;
        this.Path = "";
        this.Scale = 120;
        this.Img = new Image();
        let Wrapper, Row = null;

        this.ToolBar = new ToolBarOBJ(this.Body);

        
        
        

        $$$.Engine.RegFrameHandler(this.OnFrame.bind(this));

    };
    GalleryOBJ.prototype = Object.create($$$.ListOBJ.prototype);
    GalleryOBJ.prototype.OnStop = function () { };
    
    GalleryOBJ.prototype.OnPause = function () { };
    GalleryOBJ.prototype.OnResume = function () { };
    GalleryOBJ.prototype.OnExit = function () { };

    GalleryOBJ.prototype.OnStart = function () {
        
        new $$$.EventOBJ({ ModName: ModName, Type: "UserAway" });
        this.OldBody = document.documentElement.replaceChild(this.Body, document.body);
        this.Body.appendChild($$$.Footer);
        console.log("UserDelta=" + $$$.Engine.UserDelta);
        let obj = this.Body;
        obj.style.backgroundAttachment = "fixed";
        obj.style.backgroundSize = "cover";
        obj.style.backgroundRepeat = "no-repeat";
        obj.style.backgroundPosition = "center center";
        obj.style.backgroundImage = "url(../img/Splash.gif)";
        this.Set();

    };
    GalleryOBJ.prototype.Exit = function () {
        
        this.State = 0;
        this.Delta = 0;
        this.DeltaTarget = 2000;
        this.LastFrame = $$$.Engine.WorldTime;
        this.Index = 0;
        this.Body = document.documentElement.replaceChild(this.OldBody, document.body);
        $$$.ContainerElement.appendChild($$$.Footer);
        ExitFlag = false;
        

    }

    GalleryOBJ.prototype.OnData = function (A) {
        this.length = 0;
        this.Index = 0;
        this.Assign(A);
        this.State = 1;
        console.dir(this);
    };
    GalleryOBJ.prototype.GetData = function () {
        let q = "select RID,DataType,Modified from holeuploads where datatype like '.jpg' or datatype like '.jpeg' or datatype like '.png' order by modified DESC Limit 0,1000";
        $$$.Query(q, this.OnData.bind(this));
    };

    GalleryOBJ.prototype.DoWork = function () {
        
        if (this.Busy) { return;}
        if (this.State === 0) { return this.GetData(); }
        if (this.State === 1) {
            if ($$$.Engine.UserAway) {
                this.State = 2;
                return this.OnStart();
            }
        }
        if (this.State === 2) {//Run State
            this.Set();
        }
    };

    GalleryOBJ.prototype.OnFrame = function () {
        if (ExitFlag) { return this.Exit(); }
        this.Delta = $$$.Engine.WorldTime - this.LastFrame;
        if ($$$.Engine.UserAway) {
            this.ToolBar.Hide();
        }
        else {
            this.ToolBar.Show();
        }
        if (this.Delta < this.ToolBar.GetDelta()) { return; }
        this.LastFrame = $$$.Engine.WorldTime;
        this.DoWork();
    };
    GalleryOBJ.prototype.Set = function () {
        if (this.Busy) { return; }
        this.Busy = true;
        //this.Splash.style.display = "block";
        this.Path = "../bin/holes/" + this[this.Index].RID + this[this.Index].DataType;
        this.Index++;
        if (this.Index > this.length) { this.Index = 0; }
        let obj = this.Body;
        let Img = this.Img;

        function OnLoad() {
            obj.style.backgroundAttachment = "fixed";
            obj.style.backgroundSize = "cover";
            obj.style.backgroundRepeat = "no-repeat";
            obj.style.backgroundPosition = "center center";
            obj.style.backgroundImage = "url(" + Img.src + ")";
            //this.Splash.style.display = "none";
            this.Busy = false;
            return;
        }
        function OnError() {
            this.Busy = false;
            return;
        }


        Img.onload = OnLoad.bind(this);
        Img.onerror = OnError.bind(this);
        Img.src = this.Path + "?Scale=" + this.ToolBar.GetScale();
    }

    $$$.GalleryOBJ = new GalleryOBJ();
})();
