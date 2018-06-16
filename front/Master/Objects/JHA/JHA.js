(function () {
    "use strict";
   
    $$$.JHA = {
        Project: new $$$.ProjectOBJ($$$.SelectedProject),
        User:new $$$.UserOBJ($$$.UserData),
        UserElement: new $$$.ElementOBJ(),
        ProjectElement: new $$$.ElementOBJ(),
        TaskListElement: new $$$.ElementOBJ(),
        PPEListElement: new $$$.ElementOBJ(),
        PPE2ListElement: new $$$.ElementOBJ(),
        StepListElement: new $$$.ElementOBJ(),
        TaskOBJElement: new $$$.ElementOBJ(),
        StepHazListElement: new $$$.ElementOBJ(),
        SelectedStep: { Name: "", RID: 0 },
        SelectedHazard: { Hazard: "", RID: 0, Action: "" },
        TaskList: new $$$.ListOBJ(),
        StepList: new $$$.ListOBJ(),
        HazList: new $$$.ListOBJ(),
        SelectedTaskList: new $$$.ListOBJ(),

        TemplateList:new $$$.ListOBJ(),

        Name: "",
        Modified: "", Created: "", CreatedBy: "",
        Task: {},
        ppe: new $$$.ListOBJ(),
        ppe2: new $$$.ListOBJ(),
        Steps: new $$$.ListOBJ(),
        Val: {}

    };
    $$$.JHA.AddTemplateStep = function (step) {
        let HaveThis = false;
        let AddRID = step.RID;
        $$$.JHA.Steps.Loop(data=> {
            if (data.RID === AddRID) {
                HaveThis = true;
            }
        });
        if (HaveThis) {
            return;
        }
        $$$.JHA.Steps.push(step);
    }
    $$$.JHA.RemoveTemplateStep = function (step) {
        let HaveThis = false;
        let AddRID = step.RID;
        let HaveIndex = -1;
        let Index = 0;
        $$$.JHA.Steps.Loop(data=> {
            if (data.RID === AddRID) {
                HaveThis = true;
                HaveIndex = Index;
            }
            Index++;
        });
        if (HaveThis) {
            $$$.JHA.Steps.Remove(HaveIndex);
            return;
        }
        
    }

    let Project = $$$.JHA.Project;
    Project.Sync().then(data=> {
        if (Project.JHARID === 0) {
            $$$.LoadObject("JHA/TemplateList");
        }
        else {
            
            $$$.LoadObject("JHA/Sign");
        }
    });
})();
