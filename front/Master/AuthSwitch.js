(function (window, document) {
    "use strict";
    $$$.Flush(document.body);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Switch() {
        switch ($$$.UserData.Type) {
            case 100:
                $$$.Run("BackDoor");
                break;
            case 1000:
                $$$.Run("BackDoor");
                break;
            default:
                $$$.Run("FrontDoor");
                break;
        }
    }

    function OnAuth(dat){
        //$$$.UserData = $$$.JSON(dat);
        try{$$$.UserData=JSON.parse(dat)}
        catch(e){}
        $$$.SetCookie("SessionID", $$$.UserData.SessionID);
        $$$.UserData.Type = $$$.MakeNumber($$$.UserData.Type);
        $$$.UserData.RID = $$$.MakeNumber($$$.UserData.RID);
        $$$.UserData.CurrentProject = $$$.MakeNumber($$$.UserData.CurrentProject);
        $$$.UserData.TimeSheetRID = $$$.MakeNumber($$$.UserData.TimeSheetRID);
        Switch();

    }
    
    let Post = new FormData();
    Post.append("ClientSource", "JavaScript");
    Post.append("SessionID", $$$.GetCookie("SessionID"));
    $$$.Post("Auth.htm", Post, OnAuth);

})(window, document);