import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

var toDoWork = {};
var toDoHome = {};
var nrOfToDoWork = 0;
var nrOfToDoHome = 0;

app.get("/", (req,res) => {
    res.redirect('/work-list')
} )


app.get("/work-list", (req,res) => {
    res.render("index.ejs", {
        workList:toDoWork,
        Title:'This is the WORK To Do List',
        linkForCheck: "/check-done/",
        linkForAdd: "/add-task"
    })
} )

app.get("/home-list", (req,res) => {
    res.render("index.ejs", {
        workList:toDoHome,
        Title:'This is the HOME To Do List',
        linkForCheck: "/check-done-home/",
        linkForAdd: "/add-task-home"
    })
} )

app.post("/add-task", (req, res) => {
    var taskToAdd = req.body["task"]
    var task = {}
    
    task [taskToAdd] = "notDone"
    
    toDoWork[nrOfToDoWork] = task;
    nrOfToDoWork ++
    res.redirect("/");
})

app.post("/add-task-home", (req, res) => {
    var taskToAdd = req.body["task"]
    var task = {}
    
    task [taskToAdd] = "notDone"
    
    toDoHome[nrOfToDoHome] = task;
    nrOfToDoHome ++
    res.redirect("/home-list");
})

app.get("/check-done/:id", (req, res) => {
    var nr = req.params.id
    if (toDoWork[nr][Object.keys(toDoWork[nr])] == "notDone"){
        toDoWork[nr][Object.keys(toDoWork[nr])] = "Done"
    } else {
        toDoWork[nr][Object.keys(toDoWork[nr])] = "notDone"
    }
    console.log(nr)
    res.redirect("/");
})

app.get("/check-done-home/:id", (req, res) => {
    var nr = req.params.id
    if (toDoHome[nr][Object.keys(toDoHome[nr])] == "notDone"){
        toDoHome[nr][Object.keys(toDoHome[nr])] = "Done"
    } else {
        toDoHome[nr][Object.keys(toDoHome[nr])] = "notDone"
    }
    console.log(nr)
    res.redirect("/home-list");
})

app.get("/contacts", (req, res) => {
    res.render("index.ejs", {
        workList:toDoHome,
        Title:'You can contact us:',
        linkForCheck: "#",
        linkForAdd: "#",
    })  
})

app.listen(port, () => {
    console.log("The server runs on port: " + port);
})