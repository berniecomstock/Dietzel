(function () {
    "use strict";
    let ModName = "TestingOBJ";
    function TestingOBJ() {
        this.State = 0;
        this.Delta = 0;
        this.TargetDelta = 1000;
        this.LastFrame = $$$.Engine.WorldTime;
        

        $$$.Engine.RegFrameHandler(this.OnFrame.bind(this));
    }
    TestingOBJ.prototype.OnEvent = function (E) {
        
        let Row = $$$.FooterElement.Row();
        let D = new Date();
        D.setTime(E.Created);
        Row.Text(D.toLocaleTimeString()+" "+E.ScreenName + ":" + E.Type + ":" + E.Msg);

    }
    TestingOBJ.prototype.OnData = function (A) {
        $$$.FooterElement.Flush();
        $$$.Loop(A, this.OnEvent.bind(this));
    }
    TestingOBJ.prototype.GetData = function () {
        let q = "select *,";
        q += "(select screenname from users where rid=userrid) as ScreenName, ";
        q += "(select title from projects where rid=projectrid) as JobName ";
        q+=" from ledger order by RID desc limit 0,25";
        $$$.Query(q,this.OnData.bind(this));
    }
   
    

    TestingOBJ.prototype.OnFrame = function () {
        ////////////////////////////////////////////////////EveryFrame
        this.Delta = $$$.Engine.WorldTime - this.LastFrame;
        if (this.Delta < this.TargetDelta) { return; }
        //////////////////////////////////////////DeltaFrame
        
        this.LastFrame = $$$.Engine.WorldTime;
        if (this.State === 0) {
            this.GetData();
            this.State = 1;
            this.TargetDelta = 5000;
            return;
        }
        if (this.State === 1) {//run state
            //console.log(ModName+"->"+this.Delta);
            this.GetData();
        }


    }
   
    new TestingOBJ();

})();