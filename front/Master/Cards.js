(function () {
    "use strict";
    let Body = $$$.BodyPop();
    let Root = Body.Content();
    Body.Header("");
    Body.OnExit = function () {

        $$$.Run("$NewShout");
    }
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    function CardOBJ(input) {
        this.Suit = input.Suit;
        this.Rank = input.Rank;
        this.Number = input.Number;
        this.Element = document.createElement("div");
        this.Element.style.width = "64px";
        this.Element.className = "Mar Pad Border Smooth Flow";
        let Row = $$$.Dom(this.Element, "div", "Center Bold", this.Rank);
    }
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    function DealerOBJ(input) {
        this.input = input;
        this.Cards = [];
        this.Pointer = 0;
        this.Init();
        this.Players = [];
        
    }
    DealerOBJ.prototype.Deal = function () { }
    DealerOBJ.prototype.Hit = function () {
        let Return = this.Cards[this.Pointer];
        this.Pointer++;
        return Return;
    }
    DealerOBJ.prototype.Shuffle = function () { this.Cards = _.shuffle(this.Cards); }
    DealerOBJ.prototype.Init = function () {
        this.Cards.length = 0;
        let yindex = 0;
        while (yindex != this.input.DeckCount) {
            this.AddSuit("S");
            this.AddSuit("H");
            this.AddSuit("D");
            this.AddSuit("C");
            yindex++;
        }
        console.dir(this.Cards);
    }
    DealerOBJ.prototype.AddSuit = function (input) {

        this.Cards.push(new CardOBJ({ Suit: input, Rank: "A", Number: 11 })); this.Shuffle();
        this.Cards.push(new CardOBJ({ Suit: input, Rank: "K", Number: 10 })); this.Shuffle();
        this.Cards.push(new CardOBJ({ Suit: input, Rank: "Q", Number: 10 })); this.Shuffle();
        this.Cards.push(new CardOBJ({ Suit: input, Rank: "J", Number: 10 })); this.Shuffle();
        this.Cards.push(new CardOBJ({ Suit: input, Rank: "10", Number: 10 })); this.Shuffle();
        this.Cards.push(new CardOBJ({ Suit: input, Rank: "9", Number: 9 })); this.Shuffle();
        this.Cards.push(new CardOBJ({ Suit: input, Rank: "8", Number: 8 })); this.Shuffle();
        this.Cards.push(new CardOBJ({ Suit: input, Rank: "7", Number: 7 })); this.Shuffle();
        this.Cards.push(new CardOBJ({ Suit: input, Rank: "6", Number: 6 })); this.Shuffle();
        this.Cards.push(new CardOBJ({ Suit: input, Rank: "5", Number: 5 })); this.Shuffle();
        this.Cards.push(new CardOBJ({ Suit: input, Rank: "4", Number: 4 })); this.Shuffle();
        this.Cards.push(new CardOBJ({ Suit: input, Rank: "3", Number: 3 })); this.Shuffle();
        this.Cards.push(new CardOBJ({ Suit: input, Rank: "2", Number: 2 })); this.Shuffle();
    }
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    let Dealer = new DealerOBJ({ DeckCount: 8 });

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    function PlayerOBJ() {
    }
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    Dealer.Players.pus(new PlayerOBJ);

    

    /////////////////////////////////////////////////////////////////////////////
    
})();
