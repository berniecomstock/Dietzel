(function (window, document) {
    var ModName = "Smart";
    
    function OnCom(obj) {
        switch (obj.Event) {
            case "Load":
                console.log("Smart Loaded");
                obj.callback(obj);
                break;
        }
    }
    $$$.Listen({ Channel: ModName, callback: OnCom });
})(window, document);