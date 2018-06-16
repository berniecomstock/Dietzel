//Its a dance, not a race to the finish. 

(function (window, document) {
    var ModName = "AdminMenu";
    function OnClick() {
        MenuDown();
    }
    function OnDocs() {
        //MenuDown();
        //$$$.LoadScript("Docs", {});
        //$$$.Shout({ Channel: "ProjectList", Event: "Start" });
    }
    function OnProjects() {
        MenuDown();
        console.log("ProjectList");
        $$$.Shout({ Channel: "ProjectList", Event: "Start" });
    }
    function OnNewProjects() {
        MenuDown();
        $$$.Shout({ Channel: "Project.Create", Event: "Start" });
    }
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
    function OnGroups() {
        MenuDown();
        var Pack = {};
        Pack.Channel = "GroupList";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    }
    function OnDrive() {
        //MenuDown();
        //var Pack = {};
        //Pack.Channel = "Drive";
        //Pack.Event = "Start";
        //$$$.Shout(Pack);
        //$$$.LoadScript("Drive", {});
    }
    function OnPark() {
        //MenuDown();
        ///var Pack = {};
        //Pack.Channel = "Park";
        //Pack.Event = "Start";
        //$$$.Shout(Pack);
    }
    function OnDash() {
        MenuDown();
        var Pack = {};
        Pack.Channel = "Dash";
        Pack.Event = "Start";
        $$$.Shout(Pack);
    }
    function OnBirdsEye() {
        MenuDown();
        //var Pack = {};
        //Pack.Channel = "BirdsEye";
        //Pack.Event = "Start";
        //$$$.Shout(Pack);
        $$$.LoadScript("SandBox", {});
    }
    function OnTruckMap() {
        //var Pack = {};
        //Pack.Channel = "TruckMap";
        //Pack.Event = "Start";
        //.Shout(Pack);
    }
    
    function OnGPSLink() {
        var url = "https://portal.gpsinsight.com/d/menu.php";
        window.open(url, "_blank");
    }
    function OnGPSLink2() {
        var url = "http://login.intouchgps.com/users/sign_in";
        window.open(url, "_blank");
    }
    function Logout() {
        console.log("Admin Logout");
        MenuDown();
        $$$.LogOut();
    }
    function JustPark() {
        //var Pack = {};
        //Pack.Channel = "Park";
        //Pack.Event = "Start";
        //$$$.Shout(Pack);
    }
    function OnTalk() {
        $$$.LoadScript("UserMessage", {});
        
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
        
        //var M = $$$.Dom(Row, "div", "Flow Mar Pad Clicky", "");
        //var MI = $$$.Dom(M, "img", "");
        //MI.src = $$$.ImagePath + "Talk.png?Scale=32";
        //MI.onclick = OnTalk.bind(this);



        

    }
    function MenuUp() {
        var Temp = null;
        $$$.Flush($$$.Menu);
        $$$.Flush($$$.Header);
        $$$.Flush($$$.Content);
        var Style = "Smooth Mar Pad Bold Clicky TextLeft W300 OrangeFont Flow ";
        Temp = $$$.Dom($$$.Menu, "div", Style, "Projects");
        Temp.onclick = OnProjects;

        //Temp = $$$.Dom($$$.Menu, "div", Style, "Project Docs");
        //Temp.onclick = OnDocs;


        //var N = $$$.MakeNumber($$$.UserData.EquipRID);
       // if (N === 0) {
     //       Temp = $$$.Dom($$$.Menu, "div", Style, "Drive");
       //     Temp.onclick = OnDrive;
       // } else {
        //    Temp = $$$.Dom($$$.Menu, "div", Style, "Park");
        //    Temp.onclick = OnPark;
       // }
        Temp = $$$.Dom($$$.Menu, "div", Style, "DashBoard");
        Temp.onclick = OnBirdsEye;
        //Temp = $$$.Dom($$$.Menu, "div", Style, "Drive Records");
        //Temp.onclick = OnDash;
        Temp = $$$.Dom($$$.Menu, "div", Style, "Create New Project");
        Temp.onclick = OnNewProjects;
        Temp = $$$.Dom($$$.Menu, "div", Style, "Archived Project");
        Temp.onclick = OnArchive;
        Temp = $$$.Dom($$$.Menu, "div", Style, "Trouble Tickets");
        Temp.onclick = OnTrouble;
        Temp = $$$.Dom($$$.Menu, "div", Style, "Equipment List");
        Temp.onclick = OnEquip;
        Temp = $$$.Dom($$$.Menu, "div", Style, "User List");
        Temp.onclick = OnUsers;
        Temp = $$$.Dom($$$.Menu, "div", Style, "Pay Roll");
        Temp.onclick = OnPayRoll;
        Temp = $$$.Dom($$$.Menu, "div", Style, "My Profile");
        Temp.onclick = OnProfile;
        //Temp = $$$.Dom($$$.Menu, "div", Style, "Truck Map");
        //Temp.onclick = OnTruckMap;
        Temp = $$$.Dom($$$.Menu, "div", Style, "GPS Insite");
        Temp.onclick = OnGPSLink;
        Temp = $$$.Dom($$$.Menu, "div", Style, "GPS In Touch");
        Temp.onclick = OnGPSLink2;

        Temp = $$$.Dom($$$.Menu, "div", Style, "Receipts");
        Temp.addEventListener("click", function () {
            $$$.LoadScript("$ReceiptList", {});
        }, false);

        Temp = $$$.Dom($$$.Menu, "div", Style, "Shout");
        Temp.addEventListener("click", function () {
            MenuDown();
            $$$.LoadScript("$NewShout", {});
        }, false);


        Temp = $$$.Dom($$$.Menu, "div", Style, "Contacts");
        Temp.addEventListener("click", function () {
            MenuDown();
            //$$$.LoadScript("$$$Contacts", {});
            $$$.LoadMod("ContactsOBJ");
        }, false);

        Temp = $$$.Dom($$$.Menu, "div", Style, "Log Out: " + $$$.UserData.ScreenName);
        Temp.onclick = Logout;
        

        Temp = $$$.Dom($$$.Menu, "div", Style, "Experimental Ledger");
        Temp.addEventListener("click", function () {
            MenuDown();
            //$$$.LoadScript("$$$Contacts", {});
            $$$.LoadMod("TestingOBJ");
        }, false);

        
    }

    function ModOBJ() {
    }
    ModOBJ.prototype.Init = function (obj) {
        console.log(ModName);
        $$$.Flush($$$.Menu);
        MenuDown();
        //OnBirdsEye();
        //$$$.LoadScript("SandBox", {});
        OnProjects();
    };

    function Run(obj) {
        var Temp = new ModOBJ;
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

    /*

    function OnCom(obj) {
        switch (obj.Event) {
            case "Load":
                var Temp = new ModOBJ;
                Temp.Init(obj);
                break;
        }
    }
    $$$.Listen({ Channel: ModName, callback: OnCom });
    */

})(window, document);