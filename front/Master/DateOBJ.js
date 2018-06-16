(function () {
    /////////////////////////////////////////////////////////////ModHeader
    /////////////////////////////////////////////////////////////ModHeader
    /////////////////////////////////////////////////////////////ModHeader
    "use strict";
    let ModName = "DateOBJ";
    if (!window.$$$) { window.$$$ = {}; }
    
    /////////////////////////////////////////////////////////////ModHeader
    /////////////////////////////////////////////////////////////ModHeader
    /////////////////////////////////////////////////////////////ModHeader

   

    function DateOBJ(input) {
        //stay in native format internally
        //deal with the input and output formats
        this.Date = new Date();if (input) this.Date = this.DateFromInput(input);   
    }
    DateOBJ.prototype.DateFromInput = function (input) {
        let Return = new Date();
        if ($$$.IsNumber(input)) {return new Date(input);}
        else if (input instanceof Date) { return new Date(input.getTime()); }
        else if (input instanceof DateOBJ) { return new Date(input.getTime()); }


        else if ($$$.IsString(input)) {
            return new Date(input);
            console.log("Fix This");
        }
        else {
            return new Date();
        }
    }
    
    DateOBJ.prototype.DeltaTime = function (input) {
        let Input2 = this.Date.getTime();
        let Input = this.DateFromInput(input).getTime();
        if (Input === Input2) { return 0; }
        if (Input > Input2) { return Input - Input2; }
        if (Input < Input2) { return Input2 - Input; }


    }
    DateOBJ.prototype.HMS = function () {

       
        let H = this.Date.getHours();
        let M = this.Date.getMinutes();
        let Sec = this.Date.getSeconds();
        let PM = false;
        if (H > 12) {
            PM = true;
            H = H - 12;
        }
        let S = $$$.Pad(H, 2) + ":" + $$$.Pad(M, 2) + ":" + $$$.Pad(Sec, 2);
        return S;

        
    }
    DateOBJ.prototype.MySql = function () {
        let y = this.Date.getFullYear();
        let m = this.Date.getMonth() + 1;
        let d = this.Date.getDate();
        let h = this.Date.getHours();
        let min = this.Date.getMinutes();
        let sec = this.Date.getSeconds();
        let ms = this.Date.getMilliseconds();
        // Year=Month-Day hour min sec
        // 1999-01-31 HH:MM:SS
        //'0000-00-00 00:00:00'
        let s = y + "-";
        s += $$$.LeadZero(m);
        s += "-";
        s += $$$.LeadZero(d);
        s += " "+$$$.LeadZero(h)+":"+$$$.LeadZero(min)+":"+$$$.LeadZero(sec);
        return s;
        
    }
    DateOBJ.prototype.getSeconds = function () {
        return this.Date.getSeconds();
    }
    DateOBJ.prototype.getMinutes = function () {
        return this.Date.getMinutes();
    }
    DateOBJ.prototype.getTime = function () {
        return this.Raw();
    }
    DateOBJ.prototype.Raw = function () {
        return this.Date.getTime();
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $$$.DateOBJ = DateOBJ;

    
   
    //let First = new DateOBJ("2018-01-01 00:00:00");
    //let Next = new DateOBJ();
    //First.TryDiff(Next);

    
    //let Test = new $$$.DeltaOBJ(First.DeltaTime(Next));

    //console.dir(Test);


})();