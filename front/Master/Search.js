(function (window, document) {
    "use strict";
    var ModName = "Search";

    function SearchOBJ() { }
    SearchOBJ.prototype.Header = null;
    SearchOBJ.prototype.ResultsTarget = null;
    SearchOBJ.prototype.SearchInput = null;
    SearchOBJ.prototype.Projects = [];

    SearchOBJ.prototype.OutputResults = function (obj) {
        $$$.Flush($$$.Content);
        var y = this.Projects.length;
        if (y === 0)
        {
            $$$.Dom($$$.Content, "div", "Mar Pad Border Smooth RedFont Blink Big Bold", "Zero, Zilch, Zip, Nothing, Nada.");
            return;
        }
        var yindex = 0;
        while (yindex != y) {
            var Pack = {};
            //Pack.Channel = "Project.View";
            //Pack.Event = "Start";
            Pack.Target = $$$.Dom($$$.Content, "div", "Mar Pad Border Smooth");
            Pack.UserData = $$$.UserData;
            Pack.Project = this.Projects[yindex];
            //$$$.Shout(Pack);

            $$$.LoadScript("Project.View", Pack);
            yindex++;
        }
        

        /*
        var Pack = {};
        Pack.Target = $$$.Dom(this.ResultsTarget, "div");
        this.Project = obj.Project;
        this.UserData = obj.UserData;
        this.Root = obj.Target;
        */
    }
    SearchOBJ.prototype.OnResults = function (obj) {
        console.dir(obj);
        this.Projects = obj.json.Results;
        this.OutputResults();
    }
    SearchOBJ.prototype.OnSearch = function () {
        
        var S = this.SearchInput.value;

        var q = "Select * FROM Projects Where ";
        q += " LOWER(Title) like LOWER('%" + S + "%') or ";
        q += " LOWER(SubTitle) like LOWER('%" + S + "%') or ";
        q += " LOWER(Description) like LOWER('%" + S + "%') or ";
        q += " LOWER(Address) like LOWER('%" + S + "%') or ";
        q += " LOWER(Carrier) like LOWER('%" + S + "%') or ";
        q += " LOWER(Contractor) like LOWER('%" + S + "%') or ";
        q += " LOWER(ContractorContact) like LOWER('%" + S + "%') or ";
        q += " LOWER(ContractorPhone) like LOWER('%" + S + "%') or ";
        q += " LOWER(ContractorContact2) like LOWER('%" + S + "%') or ";
        q += " LOWER(ContractorPhone2) like LOWER('%" + S + "%') or ";
        q += " LOWER(AnchorBoltsLocation) like LOWER('%" + S + "%') or ";
        q += " LOWER(RebarSource) like LOWER('%" + S + "%') or ";
        q += " LOWER(RebarContact) like LOWER('%" + S + "%') or ";
        q += " LOWER(RebarLaborContact) like LOWER('%" + S + "%') or ";
        q += " LOWER(LocateNumber) like LOWER('%" + S + "%') or ";
        q += " LOWER(WaterLocation) like LOWER('%" + S + "%') or ";
        q += " LOWER(WaterContact) like LOWER('%" + S + "%') or ";
        q += " LOWER(WaterPhone) like LOWER('%" + S + "%') or ";
        q += " LOWER(Concrete) like LOWER('%" + S + "%') or ";
        q += " LOWER(ConcreteContact) like LOWER('%" + S + "%') or ";
        q += " LOWER(ConcretePhone) like LOWER('%" + S + "%') or ";
        q += " LOWER(ConcreteDate) like LOWER('%" + S + "%') or ";
        q += " LOWER(Pump) like LOWER('%" + S + "%') or ";
        q += " LOWER(PumpContact) like LOWER('%" + S + "%') or ";
        q += " LOWER(PumpPhone) like LOWER('%" + S + "%') or ";
        q += " LOWER(Crane) like LOWER('%" + S + "%') or ";
        q += " LOWER(CraneContact) like LOWER('%" + S + "%') or ";
        q += " LOWER(CranePhone) like LOWER('%" + S + "%') or ";
        q += " LOWER(InspectionCity) like LOWER('%" + S + "%') or ";
        q += " LOWER(InspectionState) like LOWER('%" + S + "%') or ";
        q += " LOWER(InspectionContact) like LOWER('%" + S + "%') or ";
        q += " LOWER(InspectionAgency) like LOWER('%" + S + "%') or ";
        q += " LOWER(InspectionAgencyContact) like LOWER('%" + S + "%') or ";
        q += " LOWER(InspectionAgencyPhone) like LOWER('%" + S + "%') or ";
        q += " LOWER(InspectionAgencyNotice) like LOWER('%" + S + "%') or ";
        q += " LOWER(HoleWet) like LOWER('%" + S + "%') or ";
        q += " LOWER(TestingAgency) like LOWER('%" + S + "%') or ";
        q += " LOWER(TestingAgencyContact) like LOWER('%" + S + "%') or ";
        q += " CONVERT(LOWER(Description) USING latin1) like LOWER('%" + S + "%') ";
        q += " Group By RID order by Modified DESC Limit 0,100";
        $$$.MySql(q, this.OnResults.bind(this));
    }
    SearchOBJ.prototype.Params = {};
    SearchOBJ.prototype.Reset = function () {
        //$$$.Flush($$$.Content);

        if ("Target" in this.Params) {
            $$$.Flush(this.Params.Target);
            this.Header = $$$.Dom(this.Params.Target, "div", "Mar Pad Smooth HoverWhite", "");
            this.SearchInput = $$$.Dom(this.Header, "input", "Image Flow Pad Smooth VTop", "");
            this.SearchInput.type = "text";

            //var I = $$$.Dom(this.Header, "img", "Flow Pad Smooth VTop Clicky", "");
            //$$$.SetImgSrc(I, $$$.ImagePath + "Search.png", 32);
            $$$.OnEnter(this.SearchInput, this.OnSearch.bind(this));
            //I.onclick = this.OnSearch.bind(this);

        }
        
        
        
        
        

    }
    
    SearchOBJ.prototype.Init = function (obj) {
        this.Params = obj;
        this.Reset();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        //console.log(ModName + ".Run");
        //var Temp = new SearchOBJ();
        //Temp.Init(obj);
        new SearchOBJ().Init(obj);
        
    }
    $$$[ModName] = Run;

})(window, document);
