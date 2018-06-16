
(function () {

    "use strict";


    function TemplateOBJ(data) {
        console.dir(data);
        let self = this;
        this.Element = new $$$.ElementOBJ();
        this.Name = "FartKnocker";
        this.RID = 0;
        this.Task = {};
        this.Exit = function () { };
        Object.assign(this, data);

        this.Element.Flush();
        this.Element.setClass("Mar Pad Smooth White Flex");
        let Element = this.Element;

        let Open = function () {
            let q = "update projects set JHARID = " + self.RID + " where RID=" + $$$.JHA.Project.RID;
            $$$.QueryFetch(q).then(function () {
                self.Exit();
                $$$.LoadObject("JHA/JHA");
            });
        };

        function OnDelete() {
            let q = "select Title from projects where JHARID=" + self.RID;
            
            $$$.QueryFetch(q).then(data=>{
                let list = new $$$.ListOBJ(data);
                if (list.length > 0) {
                    let s = "You can not delete a Template that is in use. The following projects use this template...";
                    list.Loop(data=> {
                        console.dir(data);
                        s += data.Title + ", ";
                    })

                    alert(s);
                }
                else {
                    if (confirm("Are you sure?")) {
                        $$$.QueryFetch("delete from jha where rid=" + self.RID)
                            .then(function () { $$$.LoadObject("JHA/TemplateList"); });
                    }
                }
                

            })
        }
        

        let Delete = this.Element
            .div(document.createElement("i"))
            .setClass("material-icons RedFont Center VTop FlexFixed")
            .Width(34)
            .Title("DELETE")
            .text("remove_circle_outline")
            .Click(OnDelete);


        let Text = this.Element.div().setClass("OrangeFont Bold MarAutoLeft")
            .text(this.Name)
            .Title(this.Name)
            .Click(Open);
        
    }


    new TemplateOBJ($$$.JHA.TemplateList.shift());

})();