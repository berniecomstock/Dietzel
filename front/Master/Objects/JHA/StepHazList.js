(function () {
    "use strict";
    let Step = $$$.JHA.SelectedStep;
    let List = new $$$.ListOBJ();
    let Element = new $$$.ElementOBJ($$$.JHA.StepHazListElement);

    Element.Flush();
    Element.setClass("Mar Pad Smooth OrangeFont Block");
    
    let ListElement = Element.div();
    //let OldHazElement = Element.div().setClass("Right");
    //let NewHazElement = Element.div().setClass("Right");
    let ButtonRow = Element.div().setClass("Right");
    let OldHazElement = ButtonRow.div().setClass("Flow");
    let NewHazElement = ButtonRow.div().setClass("Flow");


    console.dir(Step);
    function OnDelete(data) {
        console.dir(data);
        let q = "delete from jhastephazards where RID=" + data.RID;
        $$$.QueryFetch(q).then(data=> { Refresh() });
    }
    function Refresh(listonly) {
        ListElement.Flush();

        let q = "select *, ";
        q += "(select Hazard from jhahazact where RID=JHAHazActID) as Hazard , ";
        q += "(select Action from jhahazact where RID=JHAHazActID) as Action ";
        q += " from jhastephazards where JHAStepID=" + Step.RID;
        
        $$$.QueryFetch(q).then(data=> {
            List.Assign(data);
            List.Loop(data=> {
                let HazData = Object.assign({
                    Element: ListElement.div(),
                    //OnSelect: OnSelect,
                    OnDelete: OnDelete,
                }, data);
                $$$.JHA.HazList.push(HazData);
                $$$.LoadObject("JHA/HazardOBJ");
            });
            
        });

        if (listonly) { return; };
        AddButton();
        NewButton();
    };
    
    function WeHaveThisOne(rid) {
        //console.log(rid);
        let result = false;
        List.Loop(function (data) {
            if (data.JHAHazActID === rid) {
                result = true;
            }
            //console.dir(data);
        });
        return result;
    }
    function HazOut(data) {
        
        if (WeHaveThisOne(data.RID)) {
            return;
        }
        let Wrapper = OldHazElement.div().setClass("Flex Mar Border Smooth OrangeFont");
        Wrapper.div()
            .text("remove_circle_outline")
            .Width(34)
            .setClass("material-icons RedFont Center VTop FlexFixed").Click(function () {
                if (confirm("Are you sure you want to delete?")) {
                    //this.OnDelete(this);
                    let q = "delete from jhahazact where RID=" + data.RID;
                    $$$.QueryFetch(q).then(function () {
                        OnAddButton();
                    });
                };
            });
        Wrapper.div().text(data.Hazard).setClass("OrangeFont Bold");
        Wrapper.div().text(data.Action).setClass("MarAutoRight GreenFont");
        let SelectedList = new $$$.ListOBJ();
        let selected = false;
        let SelectElement = Wrapper.div()
            .text("add_circle_outline")
            .Width(34)
            .setClass("material-icons GreenFont Center VTop FlexFixed").Click(function () {

            }).Click(function () {
                let q = "insert into jhastephazards (JHAStepID, JHAHazActID) values (";
                q += "'" + Step.RID + "',"
                q += "'" + data.RID + "')";
                console.log(q);
                $$$.QueryFetch(q).then(function () {
                    Wrapper.RemoveSelf();
                    Refresh(true);
                });
            });
        
        
    }
    function OnAddButton() {
        OldHazElement.Flush();
        OldHazElement.setClass("Mar Pad Border Smooth OrangeFont");
        let q = "select * from jhahazact order by hazard";
        $$$.QueryFetch(q).then(data=> {
            let list = new $$$.ListOBJ(data);
            list.Loop(data=> { HazOut(data); });
        });
    }
    function AddButton() {
        OldHazElement.Flush();
        OldHazElement.Icon("add_circle_outline", "BlueFont", "ADD HAZARD", OnAddButton);
    }

    function NewButton() {
        NewHazElement.Flush();
        
        NewHazElement.Icon("add_circle_outline", "BlueFont", "CREATE HAZARD", function () {
            let haz, act = "";
            NewHazElement.Flush();
            NewHazElement.setClass("");
            $$$.getLine(NewHazElement, "New Hazard", "New Hazard", "").then(data=> {
                haz = data;
                return $$$.getMLine(NewHazElement, "New Action", "New Action", "");
                
            }).then(data=> {
                act = data;
                let q = "insert into jhahazact (Hazard,Action) values ";
                q += "('" + haz.prepVal + "',";
                q += "'" + act.prepVal + "')";
                console.log(q);
                return $$$.QueryFetch(q);
            }).then(data=> {
                let q = "select RID from jhahazact where hazard='" + haz.prepVal + "'";
                console.log(q);
                return $$$.QueryFetch(q);
            }).then(data=> {
                let q = "insert into jhastephazards (JHAStepID, JHAHazActID) values (";
                q += "'" + Step.RID + "',"
                q += "'" + data[0].RID + "')";
                return $$$.QueryFetch(q);
            }).then(data=> {
                Refresh();
            }).catch(() => {
                Refresh();
            });

        });
    }
    
    Refresh();
})();