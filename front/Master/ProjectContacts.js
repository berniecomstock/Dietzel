(function (window, document) {
    "use strict";
    function VCardOBJ() {
        this.Name = "";
        this.Phone = "";
        this.Email = "";
        this.Address = "";
        this.Company = "";
        this.Title = "";
        
    }
    VCardOBJ.prototype.Val = function () {
        let VCard = "BEGIN:VCARD\r\n";
        VCard += "VERSION:2.1\r\n";
        VCard += "N:" + this.Name + ";;;; \r\n";
        VCard += "FN:" + this.Name + "\r\n";
        VCard += "EMAIL;WORK:" + this.Email + "\r\n";
        VCard += "TEL;WORK:" + this.Phone + "\r\n";
        VCard += "ADR;HOME:;;" + this.Address + ";;;;\r\n";
        VCard += "ORG:"+this.Company+"\r\n";
        VCard += "TITLE:" + this.Title + "\r\n";
        VCard += "END:VCARD\r\n";
        return VCard;
        
    }

    
    function VCardHere(target, vdata) {
        //console.log(vdata);
        let Form = target.appendChild(document.createElement("form"));
        Form.target = "_blank";
        Form.enctype = "multipart/form-data";
        Form.action = "VCard.htm?r=" + Math.floor(Math.random() * 80000);
        Form.method = "POST";

        let Input = Form.appendChild(document.createElement("input"));
        Input.type = "hidden";
        Input.name = "Data";
        Input.value = vdata;

        let Butt = Form.appendChild(document.createElement("input"));
        Butt.type = "submit";
        Butt.value = "VCard";
    }


    var ModName = "ProjectContacts";
    function ContactOBJ(obj) {
        let VCard = new VCardOBJ();
        var Row,Group = null;
        this.Callback = obj.callback;
        this.UserData = obj.UserData;
        this.Project = obj.Project;
        this.Form = $$$.Dom($$$.Pop(), "div", "Pad Mar Border Smooth");
        this.Form.style.marginLeft = "auto";
        this.Form.style.marginRight = "auto";

        Row = $$$.Dom(this.Form, "div", "Big Bold OrangeFont", this.Project.Title + " Contacts");


        Row = $$$.Dom(this.Form, "div", "Big Bold", "Contractor Office");
        Group = $$$.Dom(this.Form, "div", "Border Smooth Mar");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "Contractor", "Contractor", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "ContractorContact", "Contact", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "ContractorPhone", "Phone", "PHONE");

        VCard = new VCardOBJ()
        VCard.Company = this.Project.Contractor;
        VCard.Name = this.Project.ContractorContact;
        VCard.Phone = this.Project.ContractorPhone;
        VCard.Title = "Office Contact";
        Row = $$$.Dom(Group, "div", "Right", "");
        VCardHere(Row, VCard.Val());
       


        Row = $$$.Dom(this.Form, "div", "Big Bold", "Contractor Field");
        Group = $$$.Dom(this.Form, "div", "Border Smooth Mar");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "ContractorContact2", "Field Contact", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "ContractorPhone2", "Field Phone", "PHONE");


        VCard = new VCardOBJ()
        VCard.Company = this.Project.Contractor;
        VCard.Name = this.Project.ContractorContact2;
        VCard.Phone = this.Project.ContractorPhone2;
        VCard.Title = "Field Contact";
        Row = $$$.Dom(Group, "div", "Right", "");
        VCardHere(Row, VCard.Val());

        
        Row = $$$.Dom(this.Form, "div", "Big Bold", "Testing Agency");
        Group = $$$.Dom(this.Form, "div", "Border Smooth Mar");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "TestingAgency", "Testing Agency", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "TestingAgencyContact", "Testing Agency Contact", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "TestingAgencyPhone", "Testing Agency Phone", "PHONE");


        VCard = new VCardOBJ()
        VCard.Company = this.Project.TestingAgency;
        VCard.Name = this.Project.TestingAgencyContact;
        VCard.Phone = this.Project.TestingAgencyPhone;
        VCard.Title = "Testing Agency";
        Row = $$$.Dom(Group, "div", "Right", "");
        VCardHere(Row, VCard.Val());

        
        Row = $$$.Dom(this.Form, "div", "Big Bold", "Rebar");
        Group = $$$.Dom(this.Form, "div", "Border Smooth Mar");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "RebarSource", "Rebar Source", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "RebarLaborContact", "Labor Contact", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "RebarContact", "Labor Phone", "PHONE");

        VCard = new VCardOBJ()
        VCard.Company = this.Project.RebarSource;
        VCard.Name = this.Project.RebarLaborContact;
        VCard.Phone = this.Project.RebarContact;
        VCard.Title = "Rebar";
        Row = $$$.Dom(Group, "div", "Right", "");
        VCardHere(Row, VCard.Val());


        Row = $$$.Dom(this.Form, "div", "Big Bold", "Anchor Bolts");
        Group = $$$.Dom(this.Form, "div", "Border Smooth Mar");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "AnchorBoltsLocation", "Anchor Bolts Location", "LINE");
        


        Row = $$$.Dom(this.Form, "div", "Big Bold", "Concrete");
        Group = $$$.Dom(this.Form, "div", "Border Smooth Mar");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "Concrete", "Concrete Company", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "ConcreteContact", "Concrete Contact", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "ConcretePhone", "Phone", "PHONE");
        
        VCard = new VCardOBJ()
        VCard.Company = this.Project.Concrete;
        VCard.Name = this.Project.ConcreteContact;
        VCard.Phone = this.Project.ConcretePhone;
        VCard.Title = "Concrete";
        Row = $$$.Dom(Group, "div", "Right", "");
        VCardHere(Row, VCard.Val());





        Row = $$$.Dom(this.Form, "div", "Big Bold", "Water");
        Group = $$$.Dom(this.Form, "div", "Border Smooth Mar");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "WaterLocation", "Water Location", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "WaterContact", "Water Contact", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "WaterPhone", "Phone", "PHONE");
        VCard = new VCardOBJ()
        VCard.Company = this.Project.WaterLocation;
        VCard.Name = this.Project.WaterContact;
        VCard.Phone = this.Project.WaterPhone;
        VCard.Title = "Water";
        Row = $$$.Dom(Group, "div", "Right", "");
        VCardHere(Row, VCard.Val());



        Row = $$$.Dom(this.Form, "div", "Big Bold", "Pump");
        Group = $$$.Dom(this.Form, "div", "Border Smooth Mar");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "Pump", "Pump", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "PumpContact", "Pump Contact", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "PumpPhone", "Phone", "PHONE");
        VCard = new VCardOBJ()
        VCard.Company = this.Project.Pump;
        VCard.Name = this.Project.PumpContact;
        VCard.Phone = this.Project.PumpPhone;
        VCard.Title = "Pump";
        Row = $$$.Dom(Group, "div", "Right", "");
        VCardHere(Row, VCard.Val());



        Row = $$$.Dom(this.Form, "div", "Big Bold", "Crane");
        Group = $$$.Dom(this.Form, "div", "Border Smooth Mar");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "Crane", "Crane", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "CraneContact", "Crane Contact", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "CranePhone", "Phone", "PHONE");
        VCard = new VCardOBJ()
        VCard.Company = this.Project.Crane;
        VCard.Name = this.Project.CraneContact;
        VCard.Phone = this.Project.CranePhone;
        VCard.Title = "Crane";
        Row = $$$.Dom(Group, "div", "Right", "");
        VCardHere(Row, VCard.Val());


        Row = $$$.Dom(this.Form, "div", "Big Bold", "Misc, Dirt, Ect...");
        Group = $$$.Dom(this.Form, "div", "Border Smooth Mar");

        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "OtherTitle", "For", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "Other", "Company", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "OtherContact", "Contact", "LINE");
        new $$$.DataPoint($$$.Dom(Group, "div"), this.Project, "Projects", "OtherPhone", "Phone", "PHONE");

        VCard = new VCardOBJ()
        VCard.Company = this.Project.Other;
        VCard.Name = this.Project.OtherContact;
        VCard.Phone = this.Project.OtherPhone;
        VCard.Title = this.Project.OtherTitle;
        Row = $$$.Dom(Group, "div", "Right", "");
        VCardHere(Row, VCard.Val());

    }

    

    $$$[ModName] = function (obj) {
        var test = new ContactOBJ(obj);

    }
    

})(window, document);
/*
this.VCard = "BEGIN:VCARD\r\n";
this.VCard += "VERSION:2.1\r\n";
this.VCard += "N:" + this.Data.ScreenName + ";;;; \r\n";
this.VCard += "FN:" + this.Data.ScreenName + "\r\n";
this.VCard += "EMAIL;WORK:" + this.Data.Email + "\r\n";
this.VCard += "TEL;WORK:" + this.Data.Phone + "\r\n";
this.VCard += "ADR;HOME:;;" + this.Data.Address + ";;;;\r\n";
this.VCard += "ORG:Dietzel Enterprises, Inc.\r\n";

if (this.Data.Type === "1000") {
    this.VCard += "TITLE:Office.\r\n";
}
else {
    this.VCard += "TITLE:Crew.\r\n";
}
this.VCard += "END:VCARD\r\n";
*/