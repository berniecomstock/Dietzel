
(function (window, document) {
    
    
    var ModName = "ProjectList";
    function OBJ() { }
    OBJ.prototype.ProjectType = 200;
    OBJ.prototype.Data = [];
    OBJ.prototype.Open = function (yindex,target) {
        var Pack = {};
        target.onclick = null;
        target.className = "Mar Pad Border Smooth HoverWhite";
        Pack.UserData = $$$.UserData;
        Pack.Project = this.Data[yindex];
        Pack.Target = target;
        $$$.LoadScript("Project.View", Pack);
    }
    OBJ.prototype.OnNew = function () {
        
    };
    OBJ.prototype.NewButton = function () {
        //let row = $$$.Content.div().setClass("").text("NewButton");
        let p = new $$$.ElementOBJ($$$.Content);
        let t = p.div();
        let e = p.div().setClass("Right");
        let self = this;
        if ($$$.UserData.Type === 1000) {
            e.Icon("add_circle_outline", "BlueFont", "New Project", () => {
                e.Flush();
                $$$.getLine(e, "Project Name", "Project Name", "").then(data=> {
                    let result = $$$.getlineOBJ(data);
                    let q = "insert into projects (born,title,type) values (now(),";
                    q += "'" + result.prepVal + "',";
                    q += "200)";
                    return $$$.mysql(q);
                }).then(data=> {
                    console.log("Project Created");
                    self.Reset();

                }).catch(() => {
                    console.log("User Canceled");
                    self.Reset();
                });
            });
        }

    };
    OBJ.prototype.OutputList = function () {
        $$$.Flush($$$.Content);
        this.NewButton();
        var y = this.Data.length;
        var yindex = 0;
        while (yindex != y) {
            var Temp = $$$.Dom($$$.Content, "div", "Bold Mar Pad Big OrangeFont Clicky", this.Data[yindex].Title);
            
            if ($$$.MakeNumber($$$.UserData.CurrentProject) === $$$.MakeNumber(this.Data[yindex].RID)) {
                this.Open(yindex, Temp);
            }
            else {
                Temp.onclick = this.Open.bind(this, yindex, Temp);
            }
            
            yindex++;
        }
        
    }
    OBJ.prototype.OnData = function (obj) {
        this.Data = obj.json.Results;
        this.OutputList();
    }
    OBJ.prototype.Reset = function (obj) {
        $$$.Flush($$$.Content);
        var q = "select * From Projects where Type=" + this.ProjectType;
        q += " order by modified desc,Title Asc";
        $$$.MySql(q, this.OnData.bind(this));
    }

    OBJ.prototype.Init = function (obj) {
        
        if ($$$.Has(obj, "ProjectType")) {
            this.ProjectType = Number(obj.ProjectType);
            if (isNaN(this.ProjectType)) this.ProjectType = 200;
        }
        else {
            this.ProjectType = 200;
        }
        this.Reset();
        
    }

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
                            var Temp = new OBJ();
                            Temp.Init(obj);
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
