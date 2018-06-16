(function () {
    "use strict";
    if (!window.$$$) { window.$$$ = {}; }

    function checkEmail(email) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email)) {
            return false;
        }
        return true;
    }

    function ContactsOBJ() {
        this.Root = $$$.ContentElement;
        this.GetUsers();
    };
    ContactsOBJ.prototype = Object.create($$$.ListOBJ.prototype);

    ContactsOBJ.prototype.Output = function (data) {
        let User = new $$$.UserOBJ(data);
        let Box = this.Root.Box().BGColor(255, 255, 255);
        Box.Width(320);
        Box.Div().Text(User.ScreenName).SetClass("BlueFont Bold");
        User.FetchJobName(Box.Div().SetClass("Bold OrangeFont"));
        
        if (User.Phone === "0") {
            Box.Div().Text("No Phone!").SetClass("RedFont Blink");
        }
        else {
            $$$.ClickToCall(Box.Div().Element, User.Phone);

        }


        if (checkEmail(User.Email)) {
            $$$.ClickToEmail(Box.Div().Element, User.Email);
        }
        else {
            Box.Div().Text(User.Email + "->InValid Email").SetClass("Red Blink");
        }
        
        

        
        if ((User.Address === "0") || (User.Address === "")) {
            Box.Div().Text("No Address!").SetClass("RedFont Blink");
        }
        else {
            Box.Div().Text(User.Address);
        }

        let LastSeen = new Date(User.LastClockIn);
        Box.Labeled("Last Seen", LastSeen.toLocaleDateString() + " " + LastSeen.toLocaleTimeString());
        LastSeen = new Date(User.Modified);
        Box.Labeled("Last Change", LastSeen.toLocaleDateString() + " " + LastSeen.toLocaleTimeString());

        $$$.MatIcon(Box.Div(), "location_on", "BlueFont").addEventListener("click", function () {
            var Pack = {};
            Pack.Channel = "Map";
            Pack.Event = "Clear";
            $$$.Shout(Pack);

            Pack = {};
            Pack.Channel = "Map";
            Pack.Event = "Show";
            $$$.Shout(Pack);

            Pack = {};
            Pack.Channel = "Map";
            Pack.Event = "AddMarker";
            Pack.GeoLat = User.GeoLat;
            Pack.GeoLong = User.GeoLong;
            Pack.GeoMarkup = User.ScreenName;
            $$$.Shout(Pack);

        }.bind(this), false);




        User.GetVCard(Box.Div().Right());
        
        
        
    };

    ContactsOBJ.prototype.OnData = function (A) {
        this.Assign(A);
        this.Root.Flush();
        this.Loop(this.Output.bind(this));

    };

    ContactsOBJ.prototype.GetUsers = function () {
        let q = "select * from Users WHERE Archive=0 AND Type > 0 order by ScreenName ASC";
        $$$.Query(q, this.OnData.bind(this));
        
    };


    $$$.ContactsOBJ = new ContactsOBJ();

})();