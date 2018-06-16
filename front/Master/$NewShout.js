(function (window, document) {
    "use strict";
    
    var ModName = "$NewShout";

    if (!$$$.Config.Chrome) {
        $$$[ModName] = function () {
            let Body = $$$.BodyPop();
            let Root = Body.Content();
            Root.textContent = "New Shouts can only be created in Chrome...Sorry, It's on my list.";
        }
        return;
    }



    let Collection = [];
    let Body = $$$.BodyPop();
    let Root = Body.Content();
    let Row = $$$.Dom(Root, "div", "Right");
    $$$.Button(Row, "New Line", NewLine);
    $$$.Button(Row, "New Paragraph", NewBlob);
    //$$$.Button(Row, "Link", null);
    //$$$.Button(Row, "Image", null);
    //$$$.Button(Row, "Document", null);

    let Output = $$$.Dom(Root, "div", "");
    Row = $$$.Dom(Root, "div", "Right");
    $$$.Button(Row, "New Line", NewLine);
    $$$.Button(Row, "New Paragraph", NewBlob);
    let Demo = $$$.Dom(Root, "div", "");

    Row = $$$.Dom(Root, "div", "Right");
    $$$.Button(Row, "Ok", OnOk);
    $$$.Button(Row, "Cancel", function () {
        Body.Exit();
        location.reload(true);
    });

    function UserContent() {
        this.MoveUp = false;
        this.MoveDown = false;
        this.Delete = false;
        this.Type = "LINE";
        this.Content = "";
        this.Bold = false;
        this.Url = "";
        this.LineInput = document.createElement("input");
        this.LineInput.type = "text";
        this.LineInput.placeholder = "Enter a single line of text here...";
        this.BlobInput = document.createElement("textarea");
        this.BlobInput.placeholder = "Enter paragraph text...";
        this.LineDisplay = document.createElement("div");
        this.Toolbox = document.createElement("div");
        this.Toolbox.className = "Right";
        $$$.MatIcon(this.Toolbox, "arrow_upward").addEventListener("click", this.OnMoveUp.bind(this), false);
        $$$.MatIcon(this.Toolbox, "arrow_downward").addEventListener("click", this.OnMoveDown.bind(this), false);
        $$$.MatIcon(this.Toolbox, "format_bold").addEventListener("click", this.OnBold.bind(this), false);
        $$$.MatIcon(this.Toolbox, "delete").addEventListener("click", this.OnDelete.bind(this), false);
        this.LineInput.addEventListener("input", this.OnInput.bind(this), false);
        this.BlobInput.addEventListener("input", this.OnInput.bind(this), false);



    }
    UserContent.prototype.OnMoveDown = function () {
        this.MoveDown = true;
        OnMoveDown();
    }
    UserContent.prototype.OnMoveUp = function () {
        this.MoveUp = true;
        OnMoveUp();
    }
    UserContent.prototype.OnBold = function () {
        if (this.Bold) { this.Bold = false; return Refresh(); }
        this.Bold = true;
        Refresh();
    }
    UserContent.prototype.OnDelete = function () {
        this.Delete = true;
        OnDelete();
    }
    UserContent.prototype.OnInput = function () {
        if (this.Type === "LINE") { this.Content = this.LineInput.value; this.LineDisplay.textContent = this.Content; }
        if (this.Type === "BLOB") { this.Content = this.BlobInput.value; this.LineDisplay.textContent = this.Content; }
    }
    UserContent.prototype.Line = function () {
        let Box = $$$.Dom(Output, "div", "Mar Pad Border Smooth");
        $$$.Push(Box, this.LineInput);
        $$$.Push(Box, this.Toolbox);
        this.LineDisplay.className = "Crop Pad";
        if (this.Bold) { this.LineDisplay.className += " Bold"; }
        $$$.Push(Demo, this.LineDisplay);
    }
    UserContent.prototype.Blob = function () {
        let Box = $$$.Dom(Output, "div", "Mar Pad Border Smooth");
        $$$.Push(Box, this.BlobInput);
        $$$.Push(Box, this.Toolbox);
        this.LineDisplay.className = "Dent Pad";
        if (this.Bold) { this.LineDisplay.className += " Bold"; }
        $$$.Push(Demo, this.LineDisplay);
    }
    UserContent.prototype.Output = function () {
        if (this.Type === "LINE") { return this.Line(); }
        if (this.Type === "BLOB") { return this.Blob(); }
        
    }
    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    function NewLine() {
        let Temp = new UserContent(Collection.length);
        Temp.Type = "LINE";
        Collection.push(Temp);
        Refresh();
    }
    function NewBlob() {
        let Temp = new UserContent(Collection.length);
        Temp.Type = "BLOB";
        Collection.push(Temp);
        Refresh();
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    
    function OnOk() {
        let UserList = [];
        function OnPost() {
            Body.Exit();
            location.reload(true);
        }
        function OnPrep(dat) {

            let q = "insert into shout (UserRID, Title, SubTitle, Data) values ";
            let y = UserList.length;
            let yindex = 0;
            while (yindex != y) {
                q += "('" + UserList[yindex].RID + "'," + "'" + $$$.UserData.ScreenName + "','" + new Date().toLocaleString() + "','" + dat + "') ";
                if (yindex === (y - 1)) {

                }
                else {
                    q += ", ";
                }

                yindex++;
            }
            console.log(q);
            
            $$$.Query(q, OnPost);
        }
        
        function OnUsers(dat) {
            UserList = dat;
            $$$.Prep(JSON.stringify(Collection), OnPrep);
        }
        $$$.Query("select RID from users where archive=0", OnUsers);

        
    }
    function OnMoveDown() {
        let y = Collection.length;
        let yindex = 0;
        while (yindex != y) {
            if (Collection[yindex].MoveDown) {
                Collection[yindex].MoveDown = false;

                if (yindex < Collection.length-1) {
                    let TargetBackUp = Collection[yindex + 1];
                    let SourceBackup = Collection[yindex];
                    Collection[yindex + 1] = SourceBackup;
                    Collection[yindex] = TargetBackUp;
                    return Refresh();
                }
            }
            yindex++;
        }
        Refresh();
    }
    function OnMoveUp() {
        
        let y = Collection.length;
        let yindex = 0;
        while (yindex != y) {
            if (Collection[yindex].MoveUp) {
                Collection[yindex].MoveUp = false;
                if (yindex > 0) {
                    let TargetBackUp = Collection[yindex - 1];
                    let SourceBackup = Collection[yindex];
                    Collection[yindex - 1] = SourceBackup;
                    Collection[yindex] = TargetBackUp;
                    return Refresh();
                }
            }
            yindex++;
        }
        Refresh();
    }
    function OnDelete() {
        let Temp = [];
        let y = Collection.length;
        let yindex = 0;
        while (yindex != y) {
            if (Collection[yindex].Delete) { }
            else { Temp.push(Collection[yindex]) }
            yindex++;
        }
        Collection = Temp;
        Refresh();
    }
    function RefreshLoop(dat) {
        dat.Output();
    }
    function Refresh() {
        
        $$$.Flush(Output);
        $$$.Flush(Demo);
        $$$.Loop(Collection, RefreshLoop);
    }
    
    NewLine();
    NewLine();
    NewBlob();
    NewLine();
    Refresh();
    $$$[ModName] = function () {
        
        Refresh();
        
    }

})(window, document);
