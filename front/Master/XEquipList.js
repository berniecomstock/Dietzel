(function (window, document) {
    "use strict";
    var ModName = "XEquipList";

    function XEquipListOBJ() { };
    XEquipListOBJ.prototype.StartTime = "";
    XEquipListOBJ.prototype.EndTime = "";

    XEquipListOBJ.prototype.Target = null;
    XEquipListOBJ.prototype.Equip = [];
    XEquipListOBJ.prototype.OnLess = function (header, target, yindex) {
        console.log("OnLess");
        $$$.Flush(header);
        var Left = $$$.Dom(header, "div", "XSplit");
        var Right = $$$.Dom(header, "div", "XSplit TextRight");
        var Content = $$$.Dom(header, "div", "", "");
        $$$.Dom(Left, "div", "EquipName", this.Equip[yindex].Unit);
        var I = $$$.Dom(Right, "img", "Clicky");
        $$$.SetImgSrc(I, $$$.ImagePath + "More.png", 32);
        I.onclick = this.OnClick.bind(this, header, Content, yindex);

    }
    XEquipListOBJ.prototype.OnClick = function (yindex) {

        

        var Pack = {};
        Pack.StartTime = this.StartTime;
        Pack.EndTime = this.EndTime;
        Pack.EquipRID = this.Equip[yindex].EquipRID;
        Pack.Target = $$$.Dom(this.Target, "div");
        $$$.LoadScript("XEquipTime", Pack);
        //header.onclick = null;
        //I.onclick = this.OnLess.bind(this, header, target, yindex);
    }

    XEquipListOBJ.prototype.ProcessList = function () {
        $$$.Flush(this.Target);
        var y = this.Equip.length;
        var yindex = 0;
        while (yindex != y) {
            
            var Pack = {};
            Pack.StartTime = this.StartTime;
            Pack.EndTime = this.EndTime;
            Pack.EquipUnit = this.Equip[yindex].Unit;
            Pack.EquipRID = this.Equip[yindex].EquipRID;
            Pack.Target = $$$.Dom(this.Target, "div");
            $$$.LoadScript("XEquipTime", Pack);

            //var Temp = $$$.Dom(this.Target, "div", "Border Mar Pad", this.Equip[yindex].Unit);
            //var Content = $$$.Dom(Temp, "div", "", "");
            //Temp.onclick = this.OnClick.bind(this, Temp, Content, yindex);
            //this.OnClick(yindex);
            yindex++;
        }
    }
    XEquipListOBJ.prototype.On = function (obj) { }
    XEquipListOBJ.prototype.OnList = function (obj) {
        console.dir(obj);
        this.Equip = obj.json.Results;
        this.ProcessList();
    }
    XEquipListOBJ.prototype.Init = function (obj) {
        this.EndTime = obj.EndTime;
        this.StartTime = obj.StartTime;
        this.Target = obj.Target;

        var q = "select EquipRID,";
        q += "(select Unit from equip where rid=EquipRID) as Unit";
        q += " from drivetime where StartTime Between '" + obj.StartTime;
        q += "' and '" + obj.EndTime;
        q += "' GROUP BY EquipRID ";
        $$$.MySql(q, this.OnList.bind(this));
        //console.log(q);

    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        //$$$.Flush();
        var Temp = new XEquipListOBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;




})(window, document);