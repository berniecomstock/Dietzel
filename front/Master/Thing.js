(function () {
    "use strict";
    let App = {};

    window.$$$ = Object.create(App);

    $$$.Fart = function () { console.log("Pffffferrrrpt");}

    console.dir($$$);

    $$$.Fart();

    
})();