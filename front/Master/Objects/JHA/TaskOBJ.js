(function () {
    "use strict";
    

    function TaskOBJ(input) {
        
        let self = this;
        this.Element = new $$$.ElementOBJ();
        this.RID = 0;
        this.Val = "";
        this.OnSelect = function (data) { };
        this.OnDelete = function (data) { };

        if (input) { Object.assign(this, input); }
        this.Element.Flush();
        this.Element.setClass("Mar Pad Smooth Border OrangeFont Flex");

        let Delete = this.Element
            .div(document.createElement("i"))
            .setClass("material-icons RedFont Center VTop FlexFixed")
            .Width(34)
            .Title("DELETE")
            .text("remove_circle_outline")
            .Click(() => {
                if (confirm("Are you sure?")) {
                    this.OnDelete(this);
                }
            });


        let Text = this.Element.div().setClass("OrangeFont Bold MarAutoLeft")
            .text(this.Val)
            .Title(this.Val)
            .Click(() => {
                this.OnSelect(this);
            });
       
    }
    new TaskOBJ($$$.JHA.TaskList.shift());
    

})();
