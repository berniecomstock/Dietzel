(function () {
    "use strict";
    
    //let RID = $$$.JHA.SelectedHazard;
    

    function HazOBJ(input) {
        
        this.RID = 0;
        let self = this;
        this.Element = new $$$.ElementOBJ();
        this.RID = 0;
        this.Hazard = "";
        this.Action = "";
        this.OnSelect = function (data) { };
        this.OnDelete = function (data) { };

        if (input) { Object.assign(this, input); }
        this.Element.Flush();
        this.Element.setClass("Mar Pad Smooth Border Block OrangeFont");

        let Header = this.Element.div().setClass("Flex");
        let SubHeader = this.Element.div().setClass("");
        

        let Delete = Header
            .div(document.createElement("i"))
            .Width(34)
            .setClass("material-icons RedFont Center VTop FlexFixed")
            .text("remove_circle_outline")
            .Click(() => {

                if (confirm("Are you sure you want to delete?")) {
                    this.OnDelete(this);
                }

            });


        let Haz = Header.div()
            .setClass("OrangeFont Bold FlexGrow")
            .text(this.Hazard)
        let Act = SubHeader.div()
            .setClass("GreenFont")
            .text(this.Action)
        
    }


    new HazOBJ($$$.JHA.HazList.shift());

})();