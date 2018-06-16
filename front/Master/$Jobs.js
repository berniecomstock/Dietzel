
(function (window, document) {
    "use strict";
    var ModName = "$Jobs";
    $$$[ModName] = function () {

        var Body, OldBody, Container, Form, Menu, Text, Spam, Name, Email, Phone, CDL, About, File, Post,row = null;
        Body = document.createElement("body");
        OldBody = document.documentElement.replaceChild(Body, document.body);

        Container = $$$.Dom(Body, "div", "Container");
        Form = $$$.Dom(Container, "form", "White Pad", "");
        Menu = $$$.Dom(Form, "div", "Right", "");
        $$$.Button(Menu, "Back", function () {
            document.documentElement.replaceChild(OldBody, document.body);
        });
        Text = "Dietzel Enterprises, Inc.";
        Spam = $$$.Dom(Form, "div", "Big Bold Center", Text);
        
        Text = "Truck Driver - Equipment Operator - Welders - Mechanics";
        Spam = $$$.Dom(Form, "div", "Bold Center", Text);
        Text = "Dietzel Enterprises Is looking for Driver / Operators to work on our Augered Foundation Crews. The Work is scattered all over the Mid USA. Our main Office is in Omaha Nebraska but we work everywhere.";
        Spam = $$$.Dom(Form, "p", "Dent", Text);

        Text = "Our Crews operate as teams, so when we travel we are drivers, but on the job we are operators, Rod busters, Concrete finishers, Mechanics, and whatever else is needed. We are looking for all levels of skill but you must have a CDL, (Class A with air brakes) . Industrial Concrete Construction experience will help you greatly but we will train as needed based on what skills you have.";
        Spam = $$$.Dom(Form, "p", "Dent", Text);

        Text = "The minimum wage with a CDL will be $20 and we can negotiate from there. Most full time guys with our crews make between 65K and 85K and leaders make even more. Our show up is in Omaha NE and we will transport you from there to the locations.";
        Spam = $$$.Dom(Form, "p", "Dent", Text);
        Text = "We pay weekly through direct deposit we cover all travel expenses up front plus give $20 per day Per-diem and Health insurance after probation period.";
        Spam = $$$.Dom(Form, "p", "Dent", Text);
        

        Name = $$$.Input(Form, "input", "text", "Name");
        Email = $$$.Input(Form, "input", "text", "Email");
        Phone = $$$.Input(Form, "input", "text", "Phone");
        CDL = $$$.CheckBox(Form, "I have a valid CDL");
        About = $$$.Input(Form, "textarea", "", "Your skills...");
        About.placeholder = "What assets do you bring to Dietzel Inc. ?";
        Spam = $$$.Dom(Form, "p", "", "If you would like to attach your resume the recomended formats are:");
        Spam = $$$.Dom(Form, "p", "", "Portable Document Format (.Pdf)");
        Spam = $$$.Dom(Form, "p", "", "MS Word Format (.Doc, .DocX)");
        Spam = $$$.Dom(Form, "p", "", "Plain Text (.Txt).");
        File = $$$.Input(Form, "input", "file", "Attachment");
        row = $$$.Dom(Form, "div", "Right");

        function Sending() {
            console.log("Sending");
            $$$.Flush(Form);
            Spam = $$$.Dom(Form, "div", "Center");
            $$$.Image(Spam, "../IMG/GPS.gif", 300);
            Spam = $$$.Dom(Form, "div", "Center Bold","Sending...");
        }
        function Done() {
            alert("Your application has been sent. We will be in contact with you shortly.");
            document.documentElement.replaceChild(OldBody, document.body);

        }

        $$$.Button(row, "Send", function () {

            Post = new FormData();
            if (CDL.checked) { Post.append("CDL", "1"); }
            else { Post.append("CDL", "0"); }
            Post.append("Name", Name.value);
            Post.append("Email", Email.value);
            Post.append("Phone", Phone.value);
            Post.append("About", About.value);
            if (File.files.length > 0) {
                Post.append("Data", File.files[0]);
                Post.append("FileName", File.files[0].name);
                Post.append("FileType", $$$.GetFileExt(File.files[0]));
            }

            Sending();
            $$$.Post("JobApp.htm", Post, function (data) {
                console.log("JobApp=" + data);
                Done();
            });

        });

    };
    

})(window, document);


