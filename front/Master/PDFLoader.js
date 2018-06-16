(function (window, document) {
    var ModName = "PDFLoader";
    function Run(obj) {

        //<span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>
        var url = obj.url;
        var Stats = $$$.Dom(obj.Target, "div", "");
        var page_num = $$$.Dom(Stats, "div", "Flow");
        var page_count = $$$.Dom(Stats, "div", "Flow");

        function OnDownload() { window.open(url, '_blank'); }
        function OnClose() { $$$.Flush(obj.Target);}
        var ToolRow = $$$.Dom(obj.Target, "div", "TextRight");
        var Download = $$$.Button(ToolRow, "Download", OnDownload.bind(this));
        var Close = $$$.Button(ToolRow, "Close", OnClose.bind(this));

        var PageRow = $$$.Dom(obj.Target, "div", "");
        var Pre = $$$.Button(PageRow, "Prev", null);
        var Next = $$$.Button(PageRow, "Next", null);


        var canvas = $$$.Dom(obj.Target, "canvas", "");
        canvas.style.width = "100%";
        canvas.style.height = "auto";
        var pdfDoc = null,
            pageNum = 1,
            pageRendering = false,
            pageNumPending = null,
            scale = 0.8,
            ctx = canvas.getContext('2d');

        scale = 1;

       function renderPage(num) {
            pageRendering = true;
           
            pdfDoc.getPage(num).then(function (page) {
                var viewport = page.getViewport(scale);
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);

           
                renderTask.promise.then(function () {
                    pageRendering = false;
                    if (pageNumPending !== null) {
                        renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                });
            });
            page_num.textContent = "Page " + pageNum + " o";
       }
       function queueRenderPage(num) {
            if (pageRendering) {
                pageNumPending = num;
            } else {
                renderPage(num);
            }
       }
       function onPrevPage() {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            queueRenderPage(pageNum);
        }
        //document.getElementById('prev').addEventListener('click', onPrevPage);
       Pre.onclick = onPrevPage;
        function onNextPage() {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            queueRenderPage(pageNum);
        }
        //document.getElementById('next').addEventListener('click', onNextPage);
        Next.onclick = onNextPage;

        
        PDFJS.getDocument(url).then(function (pdfDoc_) {
            pdfDoc = pdfDoc_;
            //document.getElementById('page_count').textContent = pdfDoc.numPages;
            page_count.textContent = "f " + pdfDoc.numPages;
            renderPage(pageNum);
        });

    }
    

    function OnStart(obj) {
        //console.log(ModName + "->Start");
        //console.dir(obj);
        Run(obj);
        //var Temp = new PDFOBJ();
        //Temp.Init(obj);
    }
    function OnCom(obj) {
        switch (obj.Channel) {
            case ModName:
                {
                    switch (obj.Event) {
                        case "Start":
                            OnStart(obj);
                            break;
                    }
                }
                break;
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    function RunOnce() {
        var Pack = {};
        Pack.Channel = ModName;
        Pack.callback = OnCom;
        $$$.Listen(Pack);
    }
    $$$.Shout({ Channel: "PDF", Event: "Load", callback: RunOnce });
})(window, document);


