(function () {
    "use strict";
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
        e.setClass("Flow Mar Pad Smooth Border OrangeFont Center").Width(120);
        let label = e.div().setClass("Tiny Crop").text(Cats[$$$.Number(this.Cat)]);
        $$$.image(Path, e.div(), 120).then(data=> {
            let I = new $$$.ElementOBJ(data);
            I.setClass("Smooth");
            I.Click(() => {
                window.open(Path + "?Scale=" + $$$.ScreenWidth(), "_blank");
            });

        });
        console.dir(this);
    }
    function OnNewImage(pointer, target) {
        return new Promise((yup, nope) => {
            let e = new $$$.ElementOBJ(target);
            e.Flush();
            let row = e.div().setClass("");
            let l = new $$$.ListOBJ(Cats);
            l.Loop(data=> {
                row.div().setClass("Mar Pad Smooth Border BlueFont Bold").text(data).Click(() => {
                    let fileinput = document.createElement("input");
                    fileinput.type = "file";
                    fileinput.className = "None";
                    row.appendChild(fileinput);
                    fileinput.addEventListener("change", (files) => {
                        if (fileinput.files.length > 0) {
                            let PostData = new FormData();
                            let TheFile = fileinput.files[0];
                            //NEED To Do A DELETE HERE ON THE OLD ONES
                            PostData.append("Type", $$$.GetFileExt(TheFile));
                            PostData.append("Name", TheFile.name);
                            PostData.append("HoleRID", pointer["RID"]);
                            PostData.append("Data", TheFile);
                            PostData.append("Cat", Cats.indexOf(data));
                            let conn = new XMLHttpRequest();
                            conn.open("POST", "HoleUpload.htm", true);
                            conn.addEventListener("load", (e) => {
                                console.log("load", conn.responseText);
                                //this.open();
                                yup();
                            });
                            conn.addEventListener("progress", (e) => {
                                console.log("progress", e);
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
        });
        
    }

    function List (data) {
        this.element = new $$$.ElementOBJ();
        if (data) { Object.assign(this, data); }
        this.refresh();
    }
    List.prototype.refresh = function () {
        let pointer = this;
        let target = pointer.element;
        target.Flush();
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
                    //pointer.onNewImage(e.div());
                    OnNewImage(pointer, target.div()).then(() => { console.log("OnNewImage yup"); pointer.refresh();});
                });
            });
        });
    }

    $$$.HoleImgList = List;
})();