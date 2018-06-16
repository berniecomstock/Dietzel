
(function (window, document) {
    var ModName = "Contact";
    var Root = null;
    var Name = null;
    var Email = null;
    var Message = null;

    function OnSendCallback() {
        
        Name.value = "";
        Email.value = "";
        Message.value = "";
        alert("Your message has been sent. Thank You.");

    }
    function OnSend() {
        
        
        var Pack = $$$.NewPack();
        Pack.callback = OnSendCallback;
        Pack.url = "ContactUs.htm";
        Pack.PostData.append("Name", Name.value);
        Pack.PostData.append("Email", Email.value);
        Pack.PostData.append("Message", Message.value);
        $$$.Server(Pack);
    }
    function OnStart()
    {
        Root = $$$.Content;
        $$$.Flush(Root);
        //var Wrapper = $$$.Dom(Root, "div");
        var Row = $$$.Dom(Root, "div", "");
        var L = $$$.Dom(Row, "div", "Split");
        var R = $$$.Dom(Row, "div", "Split");

        var Left = $$$.Dom(L, "div", "Pad Mar White SeeThru Smooth");
        var Right = $$$.Dom(R, "div", "Pad Mar White SeeThru Smooth");

        var Form = $$$.Dom(Left, "form", "");
        $$$.Dom(Form, "div", "Bold Left", "Send a Message");
        Name = $$$.Input(Form, "input", "text", "Name");
        Email = $$$.Input(Form, "input", "text", "Email");
        Message = $$$.Input(Form, "textarea", "", "Your message...");
        Row = $$$.Dom(Form, "div", "Right");
        $$$.Button(Row, "Send", OnSend.bind(this));

        var AddBucket = $$$.Dom(Right, "div", "BottomMargin Center Bold");
        $$$.ClickToCall($$$.Dom(AddBucket, "div", ""), "402-333-9700");
        $$$.Dom(AddBucket, "div", "", "Dietzel Enterprises, Inc");
        $$$.Dom(AddBucket, "div", "", "15825 Patrick Avenue");
        $$$.Dom(AddBucket, "div", "", "Omaha, NE 68116");

        
        let pack = $$$.MapPack({});
        let Marker = $$$.MapMarker();
        Marker.GeoLat = "41.278233";
        Marker.GeoLong = "-96.162750";
        Marker.GeoMarkup = "<h3>Dietzel Enterprises, Inc.</h3>15825 Patrick Avenue<br>Omaha, NE 68116";
        pack.Markers.push(Marker);
        pack.target = $$$.Dom(Right, "div", "");
        $$$.GoogleMap.go(pack);
        //$$$.GoogleMap.test(pack);

        /*
        
        */

        /*
        var Pack = $$$.NewPack();
        Pack.Channel = "Map";
        Pack.Event = "ShowMapHere";
        Pack.Target = $$$.Dom(Right, "div", "");
        Pack.GeoLat = "41.278233";
        Pack.GeoLong = "-96.162750";
        Pack.GeoMarkup = "<h3>Dietzel Enterprises, Inc.</h3>15825 Patrick Avenue<br>Omaha, NE 68116";
        $$$.Shout(Pack);
        */
    }
    ////////////////////////////////////////////////
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
                            OnStart();
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