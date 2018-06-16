(function () {
    /////////////////////////////////////////////////////////////ModHeader
    /////////////////////////////////////////////////////////////ModHeader
    /////////////////////////////////////////////////////////////ModHeader
    "use strict";
    let ModName = "ListOBJ";
    if (!window.$$$) { window.$$$ = {}; }
    /////////////////////////////////////////////////////////////ModHeader
    /////////////////////////////////////////////////////////////ModHeader
    /////////////////////////////////////////////////////////////ModHeader
    

    function ListOBJ(input) {

    };
    ListOBJ.prototype = Object.create(Array.prototype);
    ListOBJ.prototype.Assign = function (input) {
        this.length = 0;
        if (!$$$.IsArray(input)) { return; }
        let y = input.length;
        let yindex = 0;
        while (yindex != y) {
            this.push(input[yindex]);
            yindex++;
        }
    }
    ListOBJ.prototype.Loop = function (callback, options) {
        let y = this.length;
        let yindex = 0;
        if (!options) { options = {}; }
        while (yindex != y) {
            callback(this[yindex], options);
            yindex++;
        }

    }
    ListOBJ.prototype.LoopReverse = function (callback, options) {
        if (this.length < 1) { return; }
        let y = this.length - 1;

        while (y > -1) {
            callback(this[y], options);
            y--;
        }
    }
    ListOBJ.prototype.Remove = function (input) {
        //console.log("Broken");
        //return;
        if (!$$$.IsNumber(input)) { return {}; }
        let Target = Number(input);
        if (isNaN(Target)) { Target = 0; }
        if (Target > this.length) { return; }
        let Thing = this.splice(Target, 1);
        return Thing;
        //let Thing = this.splice(input, 1);
    }
    $$$.ListOBJ = ListOBJ;

    
})();