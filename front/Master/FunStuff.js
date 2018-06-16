(function (window, document) {
    "use strict";

    

    function Find(findthis, lookhere) {

        var needle = findthis.toLowerCase();
        var haystack = lookhere.toLowerCase();
        var Result = haystack.indexOf(needle);
        if (Result < 0) {
            //console.log(needle + " NOT FOUND IN " + haystack);
        }
        return Result;
        
    }

    String.prototype.replaceAll = function (search, replacement) {
        console.log(search + "-->" + replacement);
        var target = this;
        
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    
    var ModName = "FunStuff";
    function OBJ() { }
    OBJ.prototype.Root = document.createElement("div");
    OBJ.prototype.Server = "board.freeones.com";
    OBJ.prototype.DoNode = function (obj) {
        
        if (obj.href.length < 3) { return; }
        
        if (Find("javascript:", obj.href) > -1) {return; }        
        var New = obj.href.replaceAll(document.location.hostname, this.Server);

        var Row = document.createElement("div");
        Row.className = "Mar Pad Bold Clicky Crop";
        Row.appendChild(document.createTextNode(New));

        Row.onclick = function () {
            window.open(New, "-blank");
        }
        this.Root.appendChild(Row);
    }

    OBJ.prototype.OnLoad = function (obj) {
        console.log("OnLoad");
        
        
        var New = obj.ServerRaw;//.replaceAll(document.location.hostname, this.Server);
        var Start = Find("<body", New);
        var Stop = Find("</body>", New);
        console.log("Body At=" + Start + " " + Stop);
        if ((Start > 0) && (Stop > 0)) {

            var Frag = document.createDocumentFragment();
            var Data = document.createElement("div");
            Frag.appendChild(Data);
            Data.innerHTML = New.substring(Start, Stop);
            
            var List = Data.getElementsByTagName("a");
            var y = List.length;
            var yindex = 0;
            while (yindex != y) {
                this.DoNode(List[yindex]);
                yindex++;
            }
        }

        document.body.appendChild(this.Root);


    }
    OBJ.prototype.Init = function (obj) {
        $$$.Flush(document.body);

        $$$.LoadCSS("x.css");
        var Pack = $$$.NewPack();
        Pack.url = "HttpFetch.htm";
        Pack.callback = this.OnLoad.bind(this);
        Pack.PostData.append("Server", "omaha.craigslist.org");
        Pack.PostData.append("Doc", "/search/zip/");
        Pack.PostData.append("Param", "?");
        //https://omaha.craigslist.org/search/zip

        //Pack.PostData.append("Doc", "/showthread.php");
        //Pack.PostData.append("Param", "?185736-Videoclips-of-Girls-Masturbating-6/page216");
        $$$.LoadScript("Server", Pack);
        

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Run(obj) {
        console.log(ModName + ".Run");
        var Temp = new OBJ();
        Temp.Init(obj);
    }
    $$$[ModName] = Run;

})(window, document);
