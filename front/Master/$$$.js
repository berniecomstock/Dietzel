//console.log = function () { };
//console.dir = function () { };

(function () {
    "use strict";
    window.$$$ = Object.create({
        BUILD: document.body.id,
        LOGGING: false,
        CACHE_SCRIPT: true,
        //how do we know the cache is up to date?
        //we need to add the build number to the save name.
        //how do we clean old cache?
        //delete anything that doesnt have this build in it


        
        
        Config: {
            BUILD: document.body.id,
            Company: "DIETZEL",
            CompanyName: "Dietzel Enterprises, Inc.",
            ModRoot: "../" + document.body.id + "/",
            Spaghetti: "../" + document.body.id + "/",
        },
        GetRootPath: function () { return this.Config.ModRoot },
        storeSet: function (n, v) {
            let savename = n + "." + this.BUILD;
            localStorage.setItem(savename, JSON.stringify(v));
        },
        storeGet: function (n) {
            let savename = n + "." + this.BUILD;
            return JSON.parse(localStorage.getItem(savename));
        },
        storeFlushOld: function(){
            //if the key does not have this build number in it...delete it
            //localStorage.key();
            console.log("clearing old cache");
            
            let y = localStorage.length;
            let keys = [];
            
            let yindex = 0;
            while (yindex != y) {
                keys.push(localStorage.key(yindex))
                yindex++;
            }
            y = keys.length;
            yindex = 0;
            while (yindex != y) {
                if (keys[yindex].indexOf(this.BUILD) !== -1) {
                }
                else {
                    console.log("Found a stinker!", keys[yindex]);
                    localStorage.removeItem(keys[yindex]);
                }
                yindex++;
            }
        },

        State: {
            Network: false,
            NetworkJobQ: [],
            NetworkBusy: true,
            EventSystem: false,
            Frame: 1,
            StartTime: Date.now(),
            WorldTime: 0, DeltaTime: 0, LastFrameTime: 0, LastFrameDelta: 0,
            Dependants: [],
            EndTime: 0, FPS: 0, DeltaTarget: 60,
            Auth: false,
            GoogleMaps: false,
            BootStrap: 0,
            Questions: 0,
            Answers: 0,
            IdleTime: 0,
            LastUserInput: 0,
        },
        
        formData: function (data) {
            let result = new FormData();
            let keys = Object.keys(data);
            let y = keys.length;
            let yindex = 0;
            while (yindex != y) {
                result.append(keys[yindex], data[keys[yindex]]);
                yindex++;
            }
            return result;
        },
        responceText: function (data) { return new Promise(function (yup, nope) { yup(data.text()); }); },
        responceJson: function (data) { return new Promise(function (yup, nope) { yup(data.json()); }); },
        responceBlob: function (data) { return new Promise(function (yup, nope) { yup(data.blob()); }); },
        fetchBusy: false,
        fetchPending: 0,
        fetchlog:[],
        fetch: function (url, method, body, responceType) {

            
            let self = this;
            return new Promise(function (yup, nope) {
                function Go() {
                    if (self.fetchPending > 1) {
                        console.log("fetch backlog", self.fetchPending);
                        requestAnimationFrame(Go);
                        return;
                    }

                    self.fetchPending++;
                    self.fetchBusy = true;
                    //console.log("Network->" + url);
                    self.fetchlog.push(url);
                    fetch(url, { method: method, body: body }).then(data=> {
                        if (data.ok) {
                            
                            self.fetchPending--;
                            

                            if (responceType) {
                                if (responceType === "text") { return self.responceText(data); }
                                else if (responceType === "json") { return self.responceJson(data); }
                                else if (responceType === "blob") {
                                    return data;
                                }
                                else {
                                    return self.responceText(data);
                                }
                            }
                            else {
                                return self.responceText(data);
                            }
                        }
                    }).then(data=> {
                        self.fetchBusy = false;
                        yup(data);

                    });
                }

                
                Go();

            });


        },
        get: function (url, responceType) {

            let self = this;
            let rtype = "text";
            if (responceType) { rtype = responceType }
            return new Promise(function (yup, nope) {
                self.fetch(url, "GET", null, rtype).then(data=> {
                    yup(data);
                });
            });
        },
        image: function (url, target, scale) {

            let self = this;
            let rtype = "blob";
            let path = url;
            if (scale) {
                path += "?Scale=" + scale;
            }
            else {
                path += "?Scale=" + $$$.ScreenWidth();
            }
            //console.log(path);
            return new Promise(function (yup, nope) {
                self.fetch(path, "GET", null, rtype).then(data=> {
                    let type = "application";
                    if (data.headers) {

                        if (data.headers.get) {
                            console.log("headers.get OK");
                            type = data.headers.get("content-type");
                            console.log(type);
                        }
                    }
                    data.blob().then(data=> {
                        
                        let result = URL.createObjectURL(data, { type: type });
                        let i = new Image();
                        i.src = result;
                        requestAnimationFrame(() => {
                            target.appendChild(i);
                        });
                        yup(i);
                    });
                    
                });
            });
        },
        post: function (url, data, responceType) {

            let self = this;
            let rtype = "text";
            if (responceType) { rtype = responceType }
            return new Promise(function (yup, nope) {
                self.fetch(url, "POST", self.formData(data), rtype).then(data=> {
                    yup(data);
                });
            });
        },
        fetchRemote: function (server, doc, param) {
            let result = {
                Server: server, Doc: doc, Param: param,
            };
            return this.post("HttpFetch.htm", result, "text");

        },
        mysql: function (q) {
            let self = this;
            return new Promise(function (yup, nope) {
                self.post("MySql.htm", { q: q }, "json").then(data=> {
                    if ("Results" in data) { yup(data.Results); } else { yup([]); }
                });
            });
        },
        scriptbuffer: "",
        scriptbufferDump: function () {
            let self = this;
            let s = document.createElement("script");
            s.textContent = this.scriptbuffer;
            this.scriptbuffer = "";
            return new Promise(function (yup, nope) {
                document.head.appendChild(s);
                yup();
            });

        },

        script: function (n, nowait) {
            let self = this;
            let path = "../" + this.BUILD + "/" + n + ".js?r=" + Date.now().toString();
            return new Promise(function (yup, nope) {

                self.get(path).then(data=> {
                    if (nowait) {
                        let s = document.createElement("script");
                        s.textContent = data;
                        requestAnimationFrame(() => {
                            document.head.appendChild(s);
                            yup(n);
                        });
                    }
                    else {
                        self.scriptbuffer += data;
                        self.scriptbuffer += "\r\n";
                        self.scriptbuffer += "\r\n";
                        yup(n);
                    }



                });
            });
        },
        style: function (data) {
            

            let cash = this.storeGet("STYLE");
            if (cash !== null) {
                console.log("Found Some Cash");
                let s = document.createElement("style");
                s.textContent = cash;
                requestAnimationFrame(() => {
                    document.head.appendChild(s);
                });
                return;
            }

            let self = this;
            let list = data;
            let buffer = "";
            function Load() {
                if (list.length < 1) {
                    //if we have data in the buffer push to the doc
                    self.storeSet("STYLE", buffer);
                    console.log("Style Ready", buffer.length);
                    let s = document.createElement("style");
                    s.textContent = self.storeGet("STYLE");
                    requestAnimationFrame(() => {
                        document.head.appendChild(s);
                        //yup(s);
                        return;
                    });
                    return;
                }
                let name = list.shift();
                let path = self.Config.ModRoot + "style/" + name + ".css?r=" + Date.now().toString();
                //console.log("style." + name, path);
                self.get(path).then(data=> {
                    buffer += data;
                    Load();
                });
            }
            Load();
            return this;
        },

        
        MakeNumber: function (obj) {
            obj = Number(obj);
            if (isNaN(obj)) {
                obj = 0;
            }
            return obj;
        },
        Query: function (q, callback) {

            console.log(q);
            this.mysql(q).then(data=> {
                callback(data);
            });

        },
        


        frontLoadlist: [
            "$$$",
            "Company",
            "FeatureCheck", "Poly", "Define", "Utility", "ListOBJ", "EventOBJ",
            "EngineOBJ",
            "ConnectionOBJ",
            "DeltaOBJ",
            "GeoOBJ",
            "ElementOBJ",
            "getLine",
            "DocumentOBJ",
            "OldNetworkStuff",
            "BodyPop",
            "Utility2",
            "Utility3",
            "BodyOBJ",
            "GoogleMaps",
        ],
        backLoadlist: [
            "$$$",
            "Company",
            "FeatureCheck", "Poly", "Define", "Utility", "ListOBJ", "EventOBJ",
            "EngineOBJ", "ConnectionOBJ", "DeltaOBJ", "GeoOBJ", "TimeClockOBJ", "ElementOBJ",
            "getLine",
            "DocumentOBJ",
            "OldNetworkStuff",
            "BodyPop",
            "Utility2",
            "Utility3",
            "DataPoint",
            "DatePicker",
            "Smart",
            "WeatherOBJ",
            "ProjectDOCOBJ",
            "ProjectDOCUploadObj",
            "ProjectObj",
            "BodyOBJ",//this is hacked
            "GoogleMaps",
            "project/holes/HoleOBJ",
            "DashOBJ",
            "UserUploads",
            "MenuOBJ",//this is hacked
            "project/holes/img",
            //"JournalOBJ",
        ],
        ListLoader: function (list) {
            let t = document.createElement("div");
            t.textContent = "Installing...";
            let d = document.createElement("div");
            let prog = document.createElement("progress");
            d.appendChild(prog);
            prog.max = list.length;
            prog.value = 0;
            document.body.appendChild(t);
            document.body.appendChild(d);
            
            let self = this;
            return new Promise(function (yup, nope) {
                function Load() {
                    if (list.length < 1) {
                        yup();
                        return;
                    }
                    $$$.script("Objects/" + list.shift()).then(() => {
                        Load();
                    });
                    requestAnimationFrame(() => {
                        prog.value++;
                    });
                }
                Load();
            });
        },
        PayWall: function () {
            this.scriptbuffer = "";
            console.log("PayWall");
            console.log("Type", this.UserData.Type);
            //$$$.LoadObject(this.Config.Company);
            let WALL = this.storeGet("WALL");
            if (WALL === null) {
                this.ListLoader(this.frontLoadlist).then(data=> {
                    console.log("Download done");
                    this.storeSet("WALL", this.scriptbuffer);
                    let s = document.createElement("script");
                    s.textContent = this.storeGet("WALL");
                    document.head.appendChild(s);
                    document.head.removeChild(s);
                    return $$$.Body.flip();
                }).then(data=> {
                    //return $$$.script("Objects/GetShouts", true);
                    console.log("Paywall Ready");
                    $$$.LoadObject(this.Config.Company);
                });
            }
            else {
                console.log("Wall Already Installeded");
                let s = document.createElement("script");
                s.textContent = WALL
                document.head.appendChild(s);
                document.head.removeChild(s);
                $$$.Body.flip().then(data=> {
                    $$$.LoadObject(this.Config.Company);
                    //return $$$.script("Objects/GetShouts", true);
                });
            }
            
        },
        Application: function () {
            this.scriptbuffer = "";
            console.log("App");
            let APP = this.storeGet("APP");
            if (APP === null) {
                this.ListLoader(this.backLoadlist).then(data=> {
                    console.log("Download done");
                    this.storeSet("APP", this.scriptbuffer);
                    let s = document.createElement("script");
                    s.textContent = this.storeGet("APP");
                    document.head.appendChild(s);
                    document.head.removeChild(s);
                    return $$$.Body.flip();
                }).then(data=> {
                    return $$$.script("Objects/GetShouts", true);
                });
            }
            else {
                console.log("App Already Installeded");
                let s = document.createElement("script");
                s.textContent = APP;
                document.head.appendChild(s);
                document.head.removeChild(s);
                $$$.Body.flip().then(data=> {
                    return $$$.script("Objects/GetShouts", true);
                });
            }
        },
        AuthUser: function () {
            this.script("Objects/UserOBJ", true).then(() => {
                return $$$.UserData.auth();
            }).then((data) => {
                $$$.UserData.Assign(data);
                requestAnimationFrame(() => {
                    let s = "<style>div{text-align:center;}img{margin-right:auto;margin-left:auto;width:320px;}</style>";
                    s += "<div><img src=\"../IMG/Splash.gif\" /></div>";
                    let body = document.createElement("body");
                    body.innerHTML = s;
                    document.documentElement.replaceChild(body, document.body);
                    switch (this.UserData.Type) {
                        case 1000:
                        case 101:
                        case 100:
                            this.Application();
                            break;
                        default:
                            this.PayWall();
                            break;
                    }

                });
            });

        },

        EXE: function () {
            if (!this.CACHE_SCRIPT) {
                localStorage.clear();
                console.log("local storage cleared");
            }
            this.storeFlushOld();
            let stylelist = ["elements", "class", "media", "color", "blink", ];
            this.style(stylelist);
            if (!this.LOGGING) {//
                console.log("LOGGING DISABLED");
                console.log = function () { };
                console.dir = function () { };
                console.error = function () { };
            }
            
            this.AuthUser();
            return this;
        },

    }).EXE();


    


    console.dir($$$.fetchlog);

})();