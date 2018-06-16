
(function () {
    return;
    "use strict";
    let Body = $$$.BodyPop();
    let Root = Body.Content();
    Body.Header("");
    Body.OnExit = function () {

        $$$.Run("$NewShout");
    }
    /////////////////////////////////////////////////////////////////////////////
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


        //this.Element.textContent = this.Rank;

    }
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    function HandOBJ(input) {
        this.Cards = [];
    }
    HandOBJ.prototype.Hit = function () {
        let Card = Shoe.Hit();
        this.Cards.push(Card);
    }
    HandOBJ.prototype.Dom = function (input) {
        input.DomTarget
        let y = this.Cards.length;
        let yindex = 0;
        while (yindex != y) {
            //this.Cards[yindex].
            $$$.Push(input.DomTarget, this.Cards[yindex].Element);
            yindex++;
        }
    }

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    function ShoeOBJ(input) {
        this.input = input;
        this.Cards = [];
        this.BuildDecks();
        this.Pointer = 0;


    }
    ShoeOBJ.prototype.Hit = function () {
        let Return = this.Cards[this.Pointer];
        this.Pointer++;
        return Return;
    }
    ShoeOBJ.prototype.Shuffle = function () {
        this.Cards = _.shuffle(this.Cards);
    }
    ShoeOBJ.prototype.BuildDecks = function () {
        this.Cards.length = 0;
        let yindex = 0;
        while (yindex != this.input.DeckCount) {
            this.AddSuit("Spades");
            this.AddSuit("Hearts");
            this.AddSuit("Diamonds");
            this.AddSuit("Clubs");
            yindex++;
        }
    }
    ShoeOBJ.prototype.AddSuit = function (input) {
        
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
    /////////////////////////////////////////////////////////////////////////////
    function PlayerOBJ(input) {
        this.DealerFlag = input.DealerFlag;
        this.Hand = new HandOBJ();
        this.Element = document.createElement("div");

    }
    PlayerOBJ.prototype.Reset = function () {
        this.Hand.Cards.length = 0;
        $$$.Push(Root, this.Element);
    }

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    let Shoe = new ShoeOBJ({ DeckCount: 8 });
    let Dealer = new PlayerOBJ({ DealerFlag: 1 });
    let Player = new PlayerOBJ({ DealerFlag: 0 });



    function Controls() {
        let Row = $$$.Dom(Root, "div", "Right", "");
        $$$.Button(Row, "Deal", Deal);
    }

    function Deal() {
        $$$.Flush(Root);
        Dealer.Reset();
        Player.Reset();
        Player.Hand.Hit();
        Dealer.Hand.Hit();
        Player.Hand.Hit();
        Dealer.Hand.Hit();

        Dealer.Hand.Dom({ DomTarget: Dealer.Element });
        Player.Hand.Dom({ DomTarget: Player.Element });
        Controls();

    }
    Deal();



})();
(function () {
    return;
    "use strict";
    const STAND = 0;
    const HIT = 1;
    const SPLIT = 2;

    let Body = $$$.BodyPop();
    let Root = Body.Content();
    Body.Header("");
    Body.OnExit = function () {

        $$$.Run("$NewShout");
    }
    let Wrapper = $$$.Dom(Root, "div", "", "Dealer");
    let DealerBox = $$$.Dom(Wrapper, "div", "", "");
    Wrapper = $$$.Dom(Root, "div", "", "Player");
    let PlayerBox = $$$.Dom(Wrapper, "div", "", "");
    Wrapper = $$$.Dom(Root, "div", "", "Control");
    let ControlBox = $$$.Dom(Wrapper, "div", "Right", "");
    $$$.Button(ControlBox, "Deal", OnDeal);
    $$$.Button(ControlBox, "Hit", OnHit);
    $$$.Button(ControlBox, "Stand", OnStand);
    let Hint = $$$.Dom(Wrapper, "div", "Left", "");


    //////////////////////////////Per Shoe-game
    let DECKCOUNT = 8;
    let ShoeIndex = 0;
    let Shoe = [];

    //////////////////////////////Per Hand
    let HoleCard = false;
    let PlayerBust = false;
    let DealerBust = false;
    let PlayerBlackJack = false;
    let DealerBlackJack = false;
    let PlayerHand = [];
    let PlayerSplit = [];
    let DealerHand = [];

    function NewHand() {
        let obj = {};
        obj.HoleCard = false;
        obj.PlayerBust = false;
        obj.DealerBust = false;
        obj.PlayerBlackJack = false;
        obj.DealerBlackJack = false;
        obj.PlayerHand = [];
        obj.PlayerSplit = [];
        obj.DealerHand = [];
    }


    function SoftSum(A) {
        let ACE = false;
        let Hard = 0;
        let Soft = 0;
        let y = A.length;
        let yindex = 0;
        while (yindex != y) {
            Soft = Soft + A[yindex];
            yindex++;
        }
        return Soft;


    }
    function HardSum(A) {
        let ACE = false;
        let Hard = 0;

        let y = A.length;
        let yindex = 0;
        while (yindex != y) {
            if (A[yindex] === 11) {
                Hard = Hard + 1;
            }
            else {
                Hard = Hard + A[yindex];
            }
            yindex++;
        }
        return Hard;


    }



    function PlayBasic() {
        let DealerCard = DealerHand[0];
        let Hard = HardSum(PlayerHand);
        let Soft = SoftSum(PlayerHand);

        if (DealerCard > 6) {
            Hint.textContent = "DealerCard > 6";
            if (Soft < 17) {
                PlayerHand.push(NextCard());
                return PlayBasic();
            }

        }
        else {
            Hint.textContent = "DealerCard < 7";
        }


    }

    function OnHit() { }
    function OnStand() { }

    function OnDeal() {
        HoleCard = false;
        PlayerHand.length = 0;
        DealerHand.length = 0;
        PlayerHand.push(NextCard());
        DealerHand.push(NextCard());
        PlayerHand.push(NextCard());
        DealerHand.push(NextCard());
        PlayBasic();
        PaintPlayer();
        PaintDealer();
    }

    function Shuffle() { Shoe = _.shuffle(Shoe); }
    function InitShoe() {
        Shoe.length = 0;
        let yindex = 0;

        while (yindex != DECKCOUNT) {
            Shoe.push(11, 11, 11, 11);
            Shoe.push(10, 10, 10, 10);
            Shoe.push(10, 10, 10, 10);
            Shoe.push(10, 10, 10, 10);
            Shoe.push(10, 10, 10, 10);
            Shoe.push(9, 9, 9, 9);
            Shoe.push(8, 8, 8, 8);
            Shoe.push(7, 7, 7, 7);
            Shoe.push(6, 6, 6, 6);
            Shoe.push(5, 5, 5, 5);
            Shoe.push(4, 4, 4, 4);
            Shoe.push(3, 3, 3, 3);
            Shoe.push(2, 2, 2, 2);
            Shuffle();
            yindex++;
        }
        Shuffle();

    }
    function PaintPlayer() {
        let Hand = PlayerHand;
        let yindex = 0;
        $$$.Flush(PlayerBox);
        while (yindex != Hand.length) {
            $$$.Button(PlayerBox, Hand[yindex], null);
            yindex++;
        }
        let Soft = SoftSum(PlayerHand);
        let Hard = HardSum(PlayerHand);

        if (Hard === Soft) {
            $$$.Button(PlayerBox, "= " + Soft, null);
        }
        else {
            $$$.Button(PlayerBox, "= Soft " + SoftSum(PlayerHand), null);
            $$$.Button(PlayerBox, "= Hard " + HardSum(PlayerHand), null);
        }


    }
    function PaintDealer() {
        let Hand = DealerHand;
        let yindex = 0;
        $$$.Flush(DealerBox);
        while (yindex != Hand.length) {
            if (yindex === 0) {
                if (HoleCard) {
                    $$$.Button(DealerBox, Hand[yindex], null);
                }
                else {
                    $$$.Button(DealerBox, "*", null);
                }
            }
            else {
                $$$.Button(DealerBox, Hand[yindex], null);
            }

            yindex++;
        }
    }
    function NextCard() {
        ShoeIndex++;
        return Shoe[ShoeIndex - 1];
    }
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    InitShoe();
    OnDeal();



})();
(function () {
    return;
    "use strict";
    let Body = $$$.BodyPop();
    let Root = Body.Content();
    Body.Header("");
    let Wrapper = $$$.Dom(Root, "div", "", "Dealer");
    let DealerBox = $$$.Dom(Wrapper, "div", "", "");
    Wrapper = $$$.Dom(Root, "div", "", "Player");
    let PlayerBox = $$$.Dom(Wrapper, "div", "", "");
    Wrapper = $$$.Dom(Root, "div", "", "Control");
    let ControlBox = $$$.Dom(Wrapper, "div", "Right", "");



    /////////////////////////////////////////////////////
    function CardOBJ(v) {
        this.Val = v;
    }
    /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    function SumHand(A) {
        let Return = {
            Soft: 0, Hard: 0, Hole: 0, Bust: false
        }
        Return.Hole = A[0].Val;
        let y = A.length;
        let yindex = 0;
        while (yindex != y) {
            //soft total
            if (A[yindex].Val === 11) {
                Return.Hard += 1;
            }
            else { Return.Hard += A[yindex].Val; }
            //hard total
            Return.Soft += A[yindex].Val;
            yindex++;
        }

        return Return;
    }
    /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    function ShoeOBJ(numdecks) {
        this.DeckCount = numdecks;
        this.Cards = [];
        this.Index = 0;
        this.Init();
        this.DealerHand = [];
        this.PlayerHand = [];
    }
    ShoeOBJ.prototype.NextCard = function () {
        let Return = new CardOBJ();
        Return.Val = this.Cards[this.Index].Val;
        this.Index++;
        return Return;
    }

    ShoeOBJ.prototype.Init = function () {
        console.log("Decks=" + this.DeckCount);
        let Temp = [];
        let yindex = 0;
        while (yindex != this.DeckCount) {
            let yindex2 = 0;
            let y = 4;
            while (yindex2 != y) {
                Temp.push(new CardOBJ(11));
                Temp.push(new CardOBJ(10));
                Temp.push(new CardOBJ(10));
                Temp.push(new CardOBJ(10));
                Temp.push(new CardOBJ(10));
                Temp.push(new CardOBJ(9));
                Temp.push(new CardOBJ(8));
                Temp.push(new CardOBJ(7));
                Temp.push(new CardOBJ(6));
                Temp.push(new CardOBJ(5));
                Temp.push(new CardOBJ(4));
                Temp.push(new CardOBJ(3));
                Temp.push(new CardOBJ(2));
                yindex2++;
            }

            yindex++
        }
        let a = _.shuffle(Temp);
        let b = _.shuffle(a);
        let c = _.shuffle(b);
        this.Cards = _.shuffle(c);

    }
    /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    function DealerOBJ() {
        this.Hand = [];
    }
    DealerOBJ.prototype.ClearHand = function () { this.Hand.length = 0; }
    DealerOBJ.prototype.Hit = function (v) {
        this.Hand.push(v)
    }
    DealerOBJ.prototype.Playout = function () {
        $$$.Flush(DealerBox);
        $$$.Button(DealerBox, this.Hand[0].Val, null);
        $$$.Button(DealerBox, this.Hand[1].Val, null);


        let Sum = SumHand(this.Hand);
        $$$.Button(DealerBox, "Hard " + Sum.Hard, null);
        $$$.Button(DealerBox, "Soft " + Sum.Soft, null);
    }
    DealerOBJ.prototype.Paint = function () {
        $$$.Flush(DealerBox);
        $$$.Button(DealerBox, "00", null);
        $$$.Button(DealerBox, this.Hand[1].Val, null);
    }
    /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    function PlayerOBJ() {
        this.Hand = [];
    }
    PlayerOBJ.prototype.ClearHand = function () { this.Hand.length = 0; }
    PlayerOBJ.prototype.Hit = function (v) { this.Hand.push(v) }
    PlayerOBJ.prototype.Paint = function () {
        $$$.Flush(PlayerBox);
        let y = this.Hand.length;
        let yindex = 0;
        while (yindex != y) {
            $$$.Button(PlayerBox, this.Hand[yindex].Val, null);
            yindex++;
        }
        let Sum = SumHand(this.Hand);
        $$$.Button(PlayerBox, "Hard " + Sum.Hard, null);
        $$$.Button(PlayerBox, "Soft " + Sum.Soft, null);
    }

    /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    function GameOBJ() {

        this.Shoe = new ShoeOBJ(8);
        this.Dealer = new DealerOBJ();
        this.Player = new PlayerOBJ();
        $$$.Button(ControlBox, "Deal", this.OnDeal.bind(this));
        $$$.Button(ControlBox, "Hit", this.OnHit.bind(this));
        $$$.Button(ControlBox, "Stand", this.OnStand.bind(this));
        this.OnDeal();


    }
    GameOBJ.prototype.OnStand = function () {
        this.Dealer.Playout();
    }

    GameOBJ.prototype.OnDeal = function () {
        this.Dealer.ClearHand();
        this.Player.ClearHand();
        this.Player.Hit(this.Shoe.NextCard());
        this.Dealer.Hit(this.Shoe.NextCard());
        this.Player.Hit(this.Shoe.NextCard());
        this.Dealer.Hit(this.Shoe.NextCard());
        this.Dealer.Paint();
        this.Player.Paint();
    }
    GameOBJ.prototype.OnHit = function () {
        this.Player.Hit(this.Shoe.NextCard());
        this.Player.Paint();
    }
    /////////////////////////////////////////////////////

    let Test = new GameOBJ();


})();