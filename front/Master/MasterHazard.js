(function () {
    "use strict";

    $$$.EditThis = function (target, table, name, rid, val) {
        this.Target = target;
        this.Table = table;
        this.Name = name;
        this.RID = rid;
        this.Val = val;
        console.dir(val);
        $$$.Button(this.Target, this.Val, null);
       //$$$.EditThis(this.Table, this.Name, this.TaskList[yindex].RID,this.TaskList[yindex].val);
   }

    ////////////////////////////////////////////////////////////////////////////
    function PageOBJ(target, label) {
        this.Target = document.body;
        if (target) { this.Target = target; }
        this.Target.textContent = null;
        this.Label = "";
        if (label) { this.Label = label; }
        this.RootElement = $$$.Dom(this.Target, "div", "Mar Pad Smooth");
        this.Label = $$$.Dom(this.RootElement, "div", "Bold Mar Pad OrangeFont", this.Label);
    }
    PageOBJ.prototype.appendChild = function (child) {
        this.RootElement.appendChild(child);
        return this;
    }
    ////////////////////////////////////////////////////////////////////////////
    function RecordListOBJ(query, callback) {
        this.q = "";
        this.Callback = function () { console.log("noop");};
        this.Sync(query, callback);
    }
    RecordListOBJ.prototype = Object.create(window.Array.prototype);
    RecordListOBJ.prototype.Sync = function (query, callback) {

        if (callback) { this.Callback = callback; }
        if (query) { this.q = query; }
        console.log("Sync=" + this.q);

        let Post = new FormData();
        Post.append("q", this.q);
        $$$.Post("MySql.htm", Post, function (data) {
            let temp = {};
            try { temp = JSON.parse(data) } catch (e) { }
            if ("Results" in temp) {
                this.length = 0;
                let y = temp.Results.length;
                let yindex = 0;
                while (yindex != y) {
                    this.push(temp.Results[yindex]);
                    yindex++;
                }
            }
            console.dir(this);
            this.Callback();
        }.bind(this));
    }
    ////////////////////////////////////////////////////////////////////////////DHA OBJ
    function ListOBJ(target, label, table, name) {
        
        this.Table = "";
        this.Name = "";
        
        if (table) { this.Table = table }
        if (name) { this.Name = name;}
        this.Target = document.body;
        if (target) { this.Target = target; }
        this.Label = "";
        if (label) { this.Label = label; }
        this.RootElement = $$$.Dom(this.Target, "div", "Mar Pad Smooth Border");
        $$$.Dom(this.RootElement, "div", "Bold Mar Pad OrangeFont", this.Label);
        this.TaskList = new RecordListOBJ("select " + this.Name + " from " + this.Table, this.Ondata.bind(this));

        this.Content = $$$.Dom(this.RootElement, "div", "Mar Pad Smooth", "Content");

        let Row = $$$.Dom(this.RootElement, "div", "Right");
        this.AddButton = $$$.Button(Row, "Add", this.OnAddButton.bind(this));


        this.AddWrapper = $$$.Dom(this.RootElement, "div", "");
        Row = $$$.Dom(this.AddWrapper, "div");
        this.Input = $$$.Input(Row, "input", "text", this.Label);
        
        Row = $$$.Dom(this.AddWrapper, "div", "Right");
        this.AddCancel = $$$.Button(Row, "Cancel", this.OnAddCancel.bind(this));
        this.AddSubmit = $$$.Button(Row, "Submit", this.OnAddSubmit.bind(this));
        
        this.AddWrapper.style.display = "none";
    }
    ListOBJ.prototype.OnAddSubmit = function () {
        let q = "insert into " + this.Table + " (" + this.Name + ") values ('"+ this.Input.value + "')";
        let Post = new FormData();
        Post.append("q", q);
        $$$.Post("MySql.htm", Post, function (data) {
            this.TaskList.Sync("select " + this.Name + " from " + this.Table, this.Ondata.bind(this));
        }.bind(this));
        this.AddWrapper.style.display = "none";

    }
    ListOBJ.prototype.OnAddCancel = function () { this.AddWrapper.style.display = "none"; this.Input.value = ""; }
    ListOBJ.prototype.OnAddButton = function () { this.AddWrapper.style.display = "block"; }
    ListOBJ.prototype.Ondata = function () {
        this.Input.value = "";
        this.Content.textContent = null;
        if (this.TaskList.length < 1) { $$$.Dom(this.Content, "div", "Bold Mar Pad OrangeFont", "No Records Found..."); return; }
        let y = this.TaskList.length;
        let yindex = 0;
        while (yindex != y) {
            new $$$.EditThis(this.Content,this.Table, this.Name, this.TaskList[yindex].RID,this.TaskList[yindex].Val);
            yindex++;
        }
        
    }    
    ////////////////////////////////////////////////////////////////////////////
    function HazActOBJ(target, label, table, name) {

        this.Table = "dhahazact";
        this.Name = "*";

        if (table) { this.Table = table }
        if (name) { this.Name = name; }
        this.Target = document.body;
        if (target) { this.Target = target; }
        this.Label = "";
        if (label) { this.Label = label; }
        this.RootElement = $$$.Dom(this.Target, "div", "Mar Pad Smooth Border");
        this.Label = $$$.Dom(this.RootElement, "div", "Bold Mar Pad OrangeFont", "Hazard Action Pair");
        this.TaskList = new RecordListOBJ("select " + this.Name + " from " + this.Table, this.Ondata.bind(this));

        this.Content = $$$.Dom(this.RootElement, "div", "Mar Pad Smooth", "Content");
        let Row = $$$.Dom(this.RootElement, "div", "Right");
        this.AddButton = $$$.Button(Row, "Add", this.OnAddButton.bind(this));
        this.AddWrapper = $$$.Dom(this.RootElement, "div", "");
        this.Hazard = $$$.Input(this.AddWrapper, "input", "text", "Potential Hazard");
        this.Action = $$$.Input(this.AddWrapper, "textarea", "", "Action Plan");

        Row = $$$.Dom(this.AddWrapper, "div", "Right");
        this.AddCancel = $$$.Button(Row, "Cancel", this.OnAddCancel.bind(this));
        this.AddSubmit = $$$.Button(Row, "Submit", this.OnAddSubmit.bind(this));
        this.AddWrapper.style.display = "none";
    }
    HazActOBJ.prototype.Submit = function () {
        let q = "insert into dhahazact ( Hazard , Action ) values (";
        q += "'" + this.Hazard.value + "','" + this.Action.value + "')";
        let Post = new FormData();
        Post.append("q", q);
        $$$.Post("MySql.htm", Post, function () {
            this.TaskList.Sync("select " + this.Name + " from " + this.Table, this.Ondata.bind(this));
        }.bind(this));
        this.AddWrapper.style.display = "none";
    }
    HazActOBJ.prototype.OnActPrep = function (data) {
        this.Action.value = data;
        this.Submit();
    }
    HazActOBJ.prototype.OnHazPrep = function (data) {
        this.Hazard.value = data;

        let Post = new FormData();
        Post.append("Data", this.Action.value);
        this.Action.value = "";
        $$$.Post("Prep.htm", Post, this.OnActPrep.bind(this));
    }
    HazActOBJ.prototype.OnAddSubmit = function () {
        let Post = new FormData();
        Post.append("Data", this.Hazard.value);
        this.Hazard.value = "";
        $$$.Post("Prep.htm", Post, this.OnHazPrep.bind(this));
        
    }
    HazActOBJ.prototype.OnAddCancel = function () { this.AddWrapper.style.display = "none"; }
    HazActOBJ.prototype.OnAddButton = function () { this.AddWrapper.style.display = "block"; }
    HazActOBJ.prototype.Ondata = function () {
        
        
        this.Content.textContent = null;
        if (this.TaskList.length < 1) { $$$.Dom(this.Content, "div", "Bold Mar Pad OrangeFont", "No Records Found..."); return; }
        let y = this.TaskList.length;
        let yindex = 0;
        while (yindex != y) {
            $$$.Button(this.Content, this.TaskList[yindex].Hazard, null);
            yindex++;
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    function MasterHazardOBJ() {
        this.Page = new PageOBJ($$$.Content, "Master Hazard Setup");
        this.Tasks = new ListOBJ(this.Page, "Task List", "DHATASK", "Val");
        this.PPE = new ListOBJ(this.Page, "Personal Protective Equipment (Required)", "DHAPPE", "Val");
        this.PPE2 = new ListOBJ(this.Page, "Personal Protective Equipment (Unique)", "DHAPPE2", "Val");
        this.Steps = new ListOBJ(this.Page, "Steps", "DHASTEP", "Val");

        this.HazAct = new HazActOBJ(this.Page);

        
        //this.Steps = new StepHazardActionOBJ(this.Page);

    }
    ////////////////////////////////////////////////////////////////////////////
    //let Page = new PageOBJ($$$.Content, "Master Hazard Setup");
    //new TaskOBJ(Page, "Tasks");
    ////////////////////////////////////////////////////////////////////////////
    new MasterHazardOBJ();

    
})();
