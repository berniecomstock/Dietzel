(function () {
    "use strict";
    
    

    function HoleOBJ(data) {
        this.element = new $$$.ElementOBJ();
        this.RID = ""; this.Modified = "";
        this.ProjectRID = "";
        this.HoleDia = ""; this.HoleDepth = ""; this.Notes = ""; this.HoleWet = "";
        this.DepthDirt = ""; this.DepthRock = ""; this.Name = ""; this.Archive = "";
        this.ProjectTitle = "Project";
        if (data) { Object.assign(this, data);}
        this.close();


    };
    HoleOBJ.prototype.GetData = function () {
        let pointer = this;
        return new Promise((yup, nope) => {
            $$$.mysql("select * from holes where rid=" + pointer.RID).then(data=> {
                console.dir(data[0]);
                Object.assign(pointer, data[0]);
                yup();
            });
        });
    }
    HoleOBJ.prototype.close = function () {
        let e = this.element;
        e.Flush().SetClass("Mar Pad Border Smooth OrangeFont White")
        e.div().setClass("Bold OrangeFont Flow").WidthP(80).text(this.ProjectTitle + "." + this.Name).Click(() => { this.open(); });
        if ($$$.Number(this.Archive)) {
            e.BGImage("../IMG/Archive.png");

            e.div().setClass("Flow").WidthP(20).div().setClass("Bold GreenFont").text("Restore")
                .Click(() => { this.active(); });
            return;
        }
        if ($$$.UserData.Type === 1000) {
            e.div().setClass("Flow").WidthP(20).div().setClass("Bold RedFont").text("Archive")
                .Click(() => { this.archive(); });
        }
      
    };
    HoleOBJ.prototype.open = function () {
        this.GetData().then(() => {
            let e = this.element;
            e.Flush().SetClass("Mar Pad Border Smooth OrangeFont White");
            e.div().setClass("Bold OrangeFont").text(this.ProjectTitle + "." + this.Name).Click(() => { this.close(); });
            $$$.editLine(Object.assign({}, this), e.div(), "Name", "Name", "holes").then(() => { this.open(); });
            $$$.editLine(Object.assign({}, this), e.div(), "Diameter", "HoleDia", "holes").then(() => { this.open(); });
            $$$.editLine(Object.assign({}, this), e.div(), "Depth Dirt", "DepthDirt", "holes").then(() => { this.open(); });
            $$$.editLine(Object.assign({}, this), e.div(), "Depth Rock", "DepthRock", "holes").then(() => { this.open(); });
            $$$.editLine(Object.assign({}, this), e.div(), "Total Depth", "HoleDepth", "holes").then(() => { this.open(); });
            $$$.editMLine(Object.assign({}, this), e.div(), "Notes", "Notes", "holes").then(() => { this.open(); });
            let Payload = Object.assign({}, this);
            new $$$.HoleImgList(Object.assign(Payload, { element: e.div() }));

            if ($$$.UserData.Type === 1000) {
                e.div().setClass("Bold RedFont Right").text("Archive").Click(() => { this.archive(); });
            }
            
        });
    };
    HoleOBJ.prototype.archive = function () {
        this.close();
        $$$.mysql("update holes set archive = 1 where rid = " + this.RID).then(data=> {
            this.element.RemoveSelf();
        })
    };
    HoleOBJ.prototype.active = function () {
        this.close();
        $$$.mysql("update holes set archive = 0 where rid = " + this.RID).then(data=> {
            this.element.RemoveSelf();
        })
    };
    $$$.HoleOBJ = HoleOBJ;
})();

(function () {
    "use strict";
    return;
    /*
    this.RID, Modified, GeoLat, GeoLong, ProjectRID, 
    DrillDate, MobeDate, HoleDia, HoleDepth, LocateNumber, LocateDate, 
    InspectionCity, InspectionState, InspectionContact, InspectionNotice, InspectionAgency, 
    InspectionAgencyContact, InspectionAgencyPhone, InspectionAgencyNotice,
    Notes, HoleWet, DepthDirt, DepthRock, Name, GeoTime, OfficeGeoLong, OfficeGeoLat="";
    */
    let Cats = [
        "Rebar Vertical",
        "Form and Rebar In Place",
        "Anchor Bolts Set",
        "Anchor Bolts Centered A",
        "Vibrating",
        "Stripped",
        "Anchor Bolts Centered B",
        "Anchor Bolts Centered C",
        "Anchor Bolts Centered D"];


    function HoleImageOBJ(data) {
        this.element = new $$$.ElementOBJ();
        this.Cat = 0;
        this.RID = 0;
        this.DataType = "";
        this.HoleRID = 0;
        if (data) { Object.assign(this, data); }
        let e = this.element;
        let Path = "../bin/holes/" + this.RID + this.DataType;
        e.setClass("Flow Mar Pad Smooth Border OrangeFont").Width(100);
        let label = e.div().setClass("Tiny Left").text(Cats[$$$.Number(this.Cat)]);
        $$$.image(Path, e.div(), 100).then(data=> {
            let I = new $$$.ElementOBJ(data);
            I.Click(() => {
                window.open(Path + "?Scale=" + $$$.ScreenWidth(), "_blank");
            });

        });
        console.dir(this);
    }
   
    /*
    this.RID, Modified, GeoLat, GeoLong, ProjectRID, 
    DrillDate, MobeDate, HoleDia, HoleDepth, LocateNumber, LocateDate, 
    InspectionCity, InspectionState, InspectionContact, InspectionNotice, InspectionAgency, 
    InspectionAgencyContact, InspectionAgencyPhone, InspectionAgencyNotice,
    Notes, HoleWet, DepthDirt, DepthRock, Name, GeoTime, OfficeGeoLong, OfficeGeoLat="";
    */
    function HoleOBJ(data) {

        this.Name = "no-name";
        Object.assign(this, data);
        this.project = new $$$.ProjectOBJ(data.project);
        this.element = new $$$.ElementOBJ(data.element);
        this.reset();
    };
    HoleOBJ.prototype.reset = function () {
        let e = this.element;
        e.Flush();
        e.setClass("Mar Pad Smooth Border White OrangeFont");

        e.div().setClass("Bold Crop OrangeFont").text(this.Name);
        let row = e.div().setClass("Right");

        row.div(document.createElement("i")).setClass("MIcon RedFont Center").text("remove_circle_outline")
       .Click(this.archive.bind(this));
        row.div(document.createElement("i")).setClass("MIcon GreenFont Center").text("add_circle_outline")
        .Click(this.open.bind(this));

    };

    function Thing(pointer,e,label,Name,table) {
        
        let wrapper = e.div().setClass("Flow Mar Pad Smooth Border").Width(300);
        wrapper.div().setClass("Tiny Left").text(label);
        wrapper.div().setClass("Bold OrangeFont Flow Left").text(pointer[Name]).WidthP(80);
        let iconwrapper = wrapper.div().setClass("Flow Right").WidthP(20)
        let icon = iconwrapper.div(document.createElement("i")).setClass("MIcon BlueFont Center").text("edit");
        let editBox = wrapper.div().setClass("None");
        icon.Click(() => {
            editBox.Flush();
            let result = $$$.getlineOBJ({});

            function OnChange() {
                pointer[Name] = result.inputVal;
                pointer.open();
            }
            $$$.getLine(editBox, "Hole-Structure Name", "Hole-Structure Name", pointer[Name]).then(data=> {
                result = $$$.getlineOBJ(data);
                let q = "update " + table + " set " + Name + " = '" + result.prepVal + "' where rid=" + pointer["RID"];
                $$$.mysql(q);
                OnChange();
            }).catch(data=> {
                result = $$$.getlineOBJ(data);
                OnChange();
            });

        });
    }

    HoleOBJ.prototype.open = function () {
        let pointer = this;
        let table = "holes";
        let e = pointer.element;
        e.Flush();
        e.setClass("Mar Pad Smooth Border White OrangeFont Center");
        let label = "Hole-Structure Name";
        let Name = "Name";
        
        Thing(pointer, e, label, Name, table);

        Name = "HoleDia";
        label = "Target Diameter.";
        Thing(pointer, e, label, Name, table);

        Name = "DepthDirt";
        label = "Depth Dirt.";
        Thing(pointer, e, label, Name, table);

        Name = "DepthRock";
        label = "Depth Rock.";
        Thing(pointer, e, label, Name, table);

        Name = "HoleDepth";
        label = "Total Depth.";
        Thing(pointer, e, label, Name, table);



        this.UploadOutput(e.div());
        
    }
    
    
    HoleOBJ.prototype.onNewImage = function (target) {
        let e = new $$$.ElementOBJ(target);
        e.Flush();
        let row = e.div().setClass("");
        let l = new $$$.ListOBJ(Cats);
        let pointer = this;
        l.Loop(data=> {
            row.div().setClass("Mar Pad Smooth Border OrangeFont Bold").text(data).Click(() => {
                let fileinput = document.createElement("input");
                fileinput.type = "file";
                fileinput.className = "None";
                row.appendChild(fileinput);
                fileinput.addEventListener("change", (files) => {
                    if (fileinput.files.length > 0) {
                        let PostData = new FormData();
                        let TheFile = fileinput.files[0];
                        PostData.append("Type", $$$.GetFileExt(TheFile));
                        PostData.append("Name", TheFile.name);
                        PostData.append("HoleRID", pointer["RID"]);
                        PostData.append("Data", TheFile);
                        PostData.append("Cat", Cats.indexOf(data));
                        let conn = new XMLHttpRequest();
                        conn.open("POST", "HoleUpload.htm", true);
                        conn.addEventListener("load", (e) => {
                            console.log("load", conn.responseText);
                            this.open();
                        });
                        conn.addEventListener("progress", (e) => {
                            console.log("progress",e);
                        });

                        conn.upload.addEventListener("progress", (e) => {
                            console.log("Uprogress", e);
                        });
                        conn.send(PostData);
                    }
                });
                fileinput.click();
            });
        });


    }
    HoleOBJ.prototype.UploadOutput = function (target) {
        let e = new $$$.ElementOBJ(target);
        e.Flush();
        let pointer = this;
        
        

        let q = "select * from holeuploads where holerid=" + pointer["RID"];
        q += " order by cat asc";
        $$$.mysql(q).then(data=> {
            let l = new $$$.ListOBJ(data);
            l.Loop(data=> {
                new HoleImageOBJ(Object.assign(data, { element: target.div() }));
            });
            $$$.image("../img/camera.png", target.div().setClass("Flow").Width(64), 64).then(data=> {
                let i = new $$$.ElementOBJ(data);
                i.Click(() => {
                    pointer.onNewImage(e.div());
                });
            });
        });
        

        
    }
    HoleOBJ.prototype.archive = function () {
        this.element.RemoveSelf();

    }

    $$$.HoleOBJ = HoleOBJ;

})();
/*
        name
        diam
        depth
            dirt
            rock
            totlal
        geo
            lat
            long
        Notes
        modified
        setgeo
        gallery
        exit
        */