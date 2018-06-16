(function (window, document) {
    

    

    

    function OBJ() { }
    
    OBJ.prototype.Init = function () {
        $$$.LoadScript("$Shout", {
            callback: function () {
                $$$.LoadScript("BackGround", {});
                if ($$$.UserData.Type === 1E3) {
                    $$$.LoadScript("AdminMenu", {});
                    return;
                }
                if ($$$.UserData.Type === 100) {
                    $$$.LoadScript("CrewMenu", {});
                    return;
                }
            }
        });
    }
    
    function Dev() {
        //$$$.Run("MasterHazard");
        //$$$.Run("cards");
        //$$$.Run("$NewShout");
        //$$$.LoadScript("$NewShout", {});
        
    }

    new OBJ().Init();

    
    
})(window, document);