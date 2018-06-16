(function () {
    var ModName = "JQueryTest";

    let God = document.documentElement;
    let Head = document.head;
    let Body = document.createElement("body");
    God.replaceChild(Body, document.body);
   
    let Container = $$$.Dom(Body, "div", "container");
    
    let Row,Col,Card,Left,Right,Content=null;
    Row = $$$.Dom(Container, "div", "row");
    Left = $$$.Dom(Row, "div", "col-3", "Left");
    Content=$$$.Dom(Row, "div", "col", "");
    Right=$$$.Dom(Row, "div", "col-1", "Right");


    $$$.Dom(Left, "div", "card", " A Card");
    $$$.Dom(Right, "div", "card", " A Card");
    $$$.Dom(Content, "div", "card", " A Card");

    

    console.log(ModName);

})();