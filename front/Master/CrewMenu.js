
(function (window, document) {
    "use strict";
    var ModName = "CrewMenu";


    function OnClick() { MenuDown(); }
    function OnProjects() {
      MenuDown();
        var Pack = {};
        Pack.Channel = "ProjectList";
        Pack.Event = "Start";
        Pack.ProjectType = 200;
        $$$.Shout(Pack); 
    }
    function OnNewProjects() { MenuDown(); $$$.Shout({ Channel: "Project.Create", Event: "Start" }); }
    function OnTrouble() {
        MenuDown();
        var Pack = {};
        Pack.Channel = "EquipWO";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    }
    function OnArchive() {
        MenuDown();
        var Pack = {};
        Pack.Channel = "ProjectList";
        Pack.Event = "Start";
        Pack.ProjectType = 300;
        $$$.Shout(Pack);
    }
    function OnEquip() {
        MenuDown();
        var Pack = {};
        Pack.Channel = "Equip";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    }
    function OnDayLog() {

        MenuDown();
        var Pack = {};
        Pack.Channel = "DayLog";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    }
    function OnUsers() {

        MenuDown();
        var Pack = {};
        Pack.Channel = "UserList";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    }
    function OnPayRoll() {

        MenuDown();
        var Pack = {};
        Pack.Channel = "PayRoll";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    }
    function OnVendor() {

        MenuDown();
        var Pack = {};
        Pack.Channel = "EditVendor";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    }
    function OnProfile() {

        MenuDown();
        var Pack = {};
        Pack.Channel = "Profile";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    }
    function OnDrive() {

        MenuDown();
        //var Pack = {};
        //Pack.Channel = "Drive";
        //Pack.Event = "Start";
        //$$$.Shout(Pack);
        $$$.LoadScript("Drive", {});
    }

    function OnPark() {

        MenuDown();
        var Pack = {};
        Pack.Channel = "Park";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    }


    function Logout() {
        MenuDown();
        $$$.LogOut();
    }
    function JustPark() {
        var Pack = {};
        Pack.Channel = "Park";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    }
    function OnMystuff() {
        $$$.LoadScript("MyStuff", {});
    }
    function MenuDown() {

        
        $$$.Flush($$$.Menu);
        var Box = $$$.Dom($$$.Menu, "div", "Bottom", "");
        var Row = $$$.Dom(Box, "div", "Left", "");
        var I = $$$.Dom(Row, "img", "");
        I.src = $$$.IconPath + "Menu.png?Scale=48";
        I.onclick = MenuUp;
        var U = $$$.Dom(Row, "span", "Pad Mar Bold BlueFont Clicky ", $$$.UserData.ScreenName);
        /*
        var N = $$$.MakeNumber($$$.UserData.EquipRID);
        if (N === 0) {
        } else {
            var ThisThing = $$$.Button(Row, "Park", JustPark);
            ThisThing.className += " Blink";
            $$$.GetOne("Equip", $$$.UserData.EquipRID, "Unit", ThisThing);
        }
        */

        var Pack = {};
        Pack.Target = $$$.Dom(Row, "div", "Flow Mar Pad", "");
        $$$.LoadScript("Search", Pack);



        $$$.LoadScript("UserUploads", { Target: $$$.Dom(Row, "div", "Flow Mar Pad", "") });


        U.onclick = function () {
            $$$.LoadScript("MyStuff", {});
        }

        
        

    }
    function MenuUp() {
        var Temp = null;
        $$$.Flush($$$.Menu);
        $$$.Flush($$$.Header);
        $$$.Flush($$$.Content);
        var Style = "Smooth Mar Pad Bold Clicky TextLeft W300 OrangeFont Big";

        Temp = $$$.Dom($$$.Menu, "div", Style, "Projects");
        Temp.onclick = OnProjects;
        

        Temp = $$$.Dom($$$.Menu, "div", Style, "Trouble Tickets");
        Temp.onclick = OnTrouble;
        Temp = $$$.Dom($$$.Menu, "div", Style, "Equipment List");
        Temp.onclick = OnEquip;
        
        Temp = $$$.Dom($$$.Menu, "div", Style, "Pay Roll");
        Temp.onclick = OnPayRoll;
        Temp = $$$.Dom($$$.Menu, "div", Style, "My Profile");
        Temp.onclick = OnProfile;


        Temp = $$$.Dom($$$.Menu, "div", Style, "Contacts");
        Temp.addEventListener("click", function () {
            MenuDown();
            $$$.LoadMod("ContactsOBJ");
        }, false);


        Temp = $$$.Dom($$$.Menu, "div", Style, "Log Out: " + $$$.UserData.ScreenName);
        Temp.onclick = Logout;


    }
    function ModOBJ() { }
    ModOBJ.prototype.Init = function (obj) {
        console.log(ModName);
        $$$.Flush($$$.Menu);
        MenuDown();
        var Pack = {};
        Pack.Channel = "ProjectList";
        Pack.Event = "Start";
        Pack.ProjectType = 200;
        $$$.Shout(Pack);

    }
    function Run(obj) {
        var Temp = new ModOBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

    
})(window, document);