

(function () {
    "use strict";
    //let user = $$$.UserOBJ($$$.UserData);
    
    let body = $$$.BodyPop();
    body.OnExit = function () { $$$.MenuOBJ.OnProjects(); }
    let e = new $$$.ElementOBJ(body.Content());
    let project = new $$$.ProjectOBJ($$$.holeproject);
    let Archives = 0;
    const table = "dietzel.holes";
    let buttrow = e.div();
    let newrow = e.div().setClass("None");
    if ($$$.UserData.Type === 1000) {
        let abutt = buttrow.div().setClass("Bold OrangeFont Mar Pad Smooth Flow").text("Show Archives").Click(() => {

            if (Archives === 0) {
                Archives = 1;
                Refresh();
                abutt.text("Show Active");
                return;
            }
            abutt.text("Show Archives");
            Archives = 0;
            Refresh();
        });
    }
    let newbutt = buttrow.div().setClass("Bold BlueFont Mar Pad Smooth Flow").text("New").Click(() => {
        newrow.Flush().setClass("");
        $$$.getLine(newrow, "New Hole Name", "New Hole Name", "").then(data=> {
            newrow.Flush().setClass("None");
            let result = $$$.getlineOBJ(data);
            let q = "insert into holes (Name,ProjectRID) values ('" + result.prepVal + "'," + project.RID + ")";
            $$$.mysql(q).then(data=> { Refresh(); });
        }).catch(data=> {
            newrow.Flush().setClass("None");
            console.log("cancel");
        });

    });
    
    let resultBucket = e.div();
    let holes = [];
    function BuildQ() {
        let result = [];
        result.push("select *, ");
        result.push("(select title from projects where RID=ProjectRID) as ProjectTitle, ");
        result.push("(select now()) as Now ");
        result.push(" from " + table.toString() + " ");
        result.push(" where ProjectRID = " + project.RID.toString());
        result.push(" and archive= "+Archives.toString()+" ");
        result.push(" order by name asc");
        return result.join("");
    }
    function Refresh() {
        holes.length = 0;
        resultBucket.Flush();
        $$$.mysql(BuildQ()).then(data=> {
            data.forEach(data=> { new $$$.HoleOBJ(Object.assign(data, { project: project, element: resultBucket.div() })); });
        });
    }
    Refresh();
})();
