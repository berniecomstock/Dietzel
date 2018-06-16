(function (window, document) {
    "use strict";
    var ModName = "ProjectState";
    function OBJ() { }
    OBJ.prototype.Target = null;
    OBJ.prototype.Project = {};
    OBJ.prototype.Locates = [];
    OBJ.prototype.ProjectRID = "";
    OBJ.prototype.State = 0;
    //RID, Title, SubTitle, Description, Modified, Type, Born, CrewCount, GeoLat, GeoLong, EquipRID, 
    //Address, Carrier, Contractor, ContractorContact, ContractorPhone, ContractorContact2, ContractorPhone2, 
    //AnchorBoltsLocation, AnchorBoltsDate, DrillDate, MobeDate, HoleDia, HoleDepth, 
    //RebarSource, RebarDate, RebarContact, RebarLaborContact, LocateNumber, LocateDate, 
    //WaterLocation, WaterContact, WaterPhone, 
    //Concrete, ConcreteContact, ConcretePhone, ConcreteDate, 
    //Pump, PumpContact, PumpPhone, Crane, CraneContact, CranePhone, 
    //InspectionCity, InspectionState, InspectionContact, InspectionNotice, InspectionAgency, InspectionAgencyContact, InspectionAgencyPhone, InspectionAgencyNotice, 
    //Notes, Hotel, Medical, Food, HoleWet, GroupRID, TestingAgency, TestingAgencyContact
    OBJ.prototype.Output = function () {
        $$$.Flush(this.Target);
        console.log("Output "+this.Project.Title + " State=" + this.State);
        if (this.State === 0) {
            var Box = $$$.Dom(this.Target, "div", "Red Dot");
            return;
        }
        if (this.State === 1) {
            var Box = $$$.Dom(this.Target, "div", "Yellow Dot");
            return;
        }
        var Box = $$$.Dom(this.Target, "div", "Green Dot");

    }
    
    OBJ.prototype.Process = function (obj) {
        
        this.State = 0;

        var D = new Date(this.Project.RebarDate);
        if (isNaN(D.getFullYear())) {
            console.log("Invalid Date Format");
            this.State = 0;
            this.Output();
            return;
        }

        var y = this.Locates.length;
        var yindex = 0;
        
        if (y < 1) {
            
            this.State = 1;
            this.Output();
            console.log(this.Project.Title + "FAIL Locates.length=" + y);
            return;
        }
        while (yindex != y) {
            
            if (!$$$.IsAlphaNumSpace(this.Locates[yindex].Number)) {
                this.State = 1;
                this.Output();
                console.log(this.Project.Title + "FAIL LocateNumber");
                return;
            }
            yindex++;
        }

        //Contractor, ContractorContact, ContractorPhone, ContractorContact2, ContractorPhone2
        if (!$$$.IsAlphaNumSpace(this.Project.Contractor)) {
            this.State = 1;
            this.Output();
            console.log(this.Project.Title + "FAIL Contractor");
            return;
        }
        if (!$$$.IsAlphaNumSpace(this.Project.ContractorContact)) {
            this.State = 1;
            this.Output();
            console.log(this.Project.Title + "FAIL ContractorContact");
            return;
        }
        if (!$$$.IsPhone(this.Project.ContractorPhone)) {
            this.State = 1;
            this.Output();
            console.log(this.Project.Title + "FAIL ContractorPhone");
            return;
        }
        if (!$$$.IsAlphaNumSpace(this.Project.ContractorContact2)) {
            this.State = 1;
            this.Output();
            console.log(this.Project.Title + "FAIL ContractorContact2");
            return;
        }
        if (!$$$.IsPhone(this.Project.ContractorPhone2)) {
            this.State = 1;
            this.Output();
            console.log(this.Project.Title + "FAIL ContractorPhone2");
            return;
        }



        if (!$$$.IsAlphaNumSpace(this.Project.Concrete)) {
            this.State = 1;
            this.Output();
            console.log(this.Project.Title + "FAIL Concrete");
            return;
        }
        if (!$$$.IsAlphaNumSpace(this.Project.ConcreteContact)) {
            this.State = 1;
            this.Output();
            console.log(this.Project.Title + "FAIL ConcreteContact");
            return;
        }
        if (!$$$.IsPhone(this.Project.ConcretePhone)) {
            this.State = 1;
            this.Output();
            console.log(this.Project.Title + "FAIL ConcretePhone");
            return;
        }


        if (!$$$.IsAlphaNumSpace(this.Project.TestingAgency)) {
            this.State = 1;
            this.Output();
            console.log(this.Project.Title + "FAIL TestingAgency");
            return;
        }
        if (!$$$.IsAlphaNumSpace(this.Project.TestingAgencyContact)) {
            this.State = 1;
            this.Output();
            console.log(this.Project.Title + "FAIL TestingContact");
            return;
        }
        if (!$$$.IsPhone(this.Project.TestingAgencyPhone)) {
            this.State = 1;
            this.Output();
            console.log(this.Project.Title + "FAIL TestingAgencyPhone");
            return;
        }
        
        if (this.Project.AnchorBoltsLocation.length<3) {
            this.State = 1;
            this.Output();
            console.log(this.Project.Title + "FAIL AnchorBoltsLocation");
            return;
        }
        /*
        Y=Ancor bolts complete
        console.log("State=" + this.Project.RebarDate);
        */

        this.State = 2;
        this.Output();
        
    }
    OBJ.prototype.OnLocates = function (obj) {
        this.Locates = obj.json.Results;

        this.Process();
    }
    OBJ.prototype.OnProjectData = function (obj) {
        this.Project = obj.json.Results[0];
        //this.Process();
        var q = "select * from locate where ProjectRID=" + this.ProjectRID;
        $$$.MySql(q, this.OnLocates.bind(this));
    }
    OBJ.prototype.GetData = function () {
        
        //this.Target.className = "Mar Pad Border Smooth HoverWhite";
        var q = "select * from projects where rid=" + this.ProjectRID;
        $$$.MySql(q, this.OnProjectData.bind(this));
    }

    
    OBJ.prototype.Init = function (obj) {
        this.Target = obj.Target;
        this.ProjectRID = obj.ProjectRID;
        this.GetData();
        
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);