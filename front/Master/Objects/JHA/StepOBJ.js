
(function () {
    "use strict";
    function StepOBJ(input) {

        let self = this;
        this.Element = new $$$.ElementOBJ();
        this.RID = 0;
        this.Val = "";
        this.OnSelect = function (data) { };
        this.OnDelete = function (data) { };

        if (input) { Object.assign(this, input); }
        this.Element.Flush();
        this.Element.setClass("Mar Pad Smooth Border Block OrangeFont");
        
        let Header = this.Element.div().setClass("Flex")
        let Hazbox = this.Element.div();
        
        let showHaz = false;
        function HazToggle() {
            if (showHaz) {
                showHaz = false;
                //Hazbox.setClass("None");
                return;
            }
            showHaz = true;
            //Hazbox.setClass("None");
        }
        let Text = Header.div()
            .setClass("OrangeFont Bold Flow MarAutoRight")
            .text(this.Val)
            .Click(() => {

                HazToggle();
                if (showHaz) {
                    $$$.JHA.StepHazListElement = Hazbox;
                    $$$.JHA.SelectedStep = this;
                    $$$.LoadObject("JHA/StepHazList");
                }
                else {
                    Hazbox.Flush();
                }
                
                
            });
        
        let Check = Header
            .div(document.createElement("i"))
            .setClass("material-icons GreenFont Center VTop FlexFixed")
            .text("check_circle_outline")
            .Click(() => {
                Toggle();
                this.OnSelect(this);
            });

        this.Selected = true;

        function Toggle() {
            if (self.Selected) {
                self.Selected = false;
                Check.setClass("material-icons GreyFont Center VTop FlexFixed");
                
                return;
            }
            self.Selected = true;
            Check.setClass("material-icons GreenFont Center VTop FlexFixed");
            
            
        }
        Toggle();


    }
    new StepOBJ($$$.JHA.StepList.shift());


})();
