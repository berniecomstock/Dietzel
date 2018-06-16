(function () {
    "use strict";
    let element = new $$$.ElementOBJ($$$.JHA.PPEListElement);
    element.Flush();
    element.setClass("Mar Pad Smooth White");
    let list = new $$$.ListOBJ();
    let q = "select * from jhappe";

    let ListElement = element.div();
    let FootElement = element.div().setClass("Right");


    function PPEOBJ(data) {
        this.self = this;
        this.RID = 0;
        this.Val = "";
        this.selected = false;
        this.OnSelect = function (data) { };
        this.OnAdd = function (data) { };
        this.OnRemove = function (data) { };
        Object.assign(this, data);
        this.Element = new $$$.ElementOBJ(ListElement.div());
        
        let e = this.Element;
        e.setClass("Flow  Smooth Pad Mar Border OrangeFont");
        let remove = e.div().setClass("MIcon RedFont Flow MRight").text("remove_circle_outline");
        let text = e.div().setClass("Flow MRight").text(data.Val);
        let select = e.div().setClass("MIcon GreyFont Flow").text("check_circle_outline")
            .Click(() => {
                if (this.selected) {
                    this.selected = false;
                    this.OnRemove(this);
                }
                else {
                    this.selected = true;
                    this.OnAdd(this);
                }
                if (this.selected) {
                    select.setClass("MIcon GreenFont Flow");
                }
                else {
                    select.setClass("MIcon GreyFont Flow");
                }
                //this.OnSelect(this);
            });


        //console.dir(data);

    }
    

    let SelectList = new $$$.ListOBJ();
    let NextButton = FootElement.div();
    NextButton.setClass("None").text("add_circle_outline").Click(OnNextButton);
    function OnNextButton() {
        console.log("PPE DONE", SelectList);
        $$$.JHA.ppe.Assign(SelectList);
        $$$.LoadObject("JHA/PPE2");

    }
    function UpDateNextButton() {
        if (SelectList.length > 0) {
            NextButton.setClass("MIcon GreenFont Flow");
            return;
        }
        NextButton.setClass("None");
        
    }
    function OnAdd(data) {
        SelectList.push({RID:data.RID,Val:data.Val});
        UpDateNextButton();
    }
    function OnRemove(data) {
        let TheIndex = -1;
        let y=SelectList.length;
        let yindex=0;
        while (yindex != y) {
            if (SelectList[yindex].RID === data.RID) {
                console.log("MATCH");
                SelectList.Remove(yindex);
                break;
            }
            yindex++;
        }
        
        UpDateNextButton();
    }
    
    function DataOut(data) {
        data.OnAdd = OnAdd;
        data.OnRemove = OnRemove;
        new PPEOBJ(data);
        
    }
    
    
    let Refresh = function () {
        
        $$$.QueryFetch(q).then(function (data) {
            list.Assign(data);
            list.Loop(DataOut);
            //element.appendChild(NextButton);
        });
    }();
})();