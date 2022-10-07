
function indexTasks() {
    fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((data) => renderTasks(data))
};


function renderTasks(tasks) {
    const tableCaption = document.querySelector("caption");
    const addBtn = document.createElement("button");
    const platzhalter = document.createElement("p");
    addBtn.innerText = "Hinzufügen";
    addBtn.classList.add("login", "btn", "abc")
    platzhalter.className = "platzhalter";
    addBtn.onclick = function () {
        addTask()
    };
    // if (loggedint){}
    tasks.forEach((tasks) => {
        addRow(tasks)
    });
    tableCaption.append(platzhalter);
    tableCaption.appendChild(addBtn); //so the addBtn stays under the list for the whole time
};


function addRow(daten) {
    const tableBody = document.querySelector("tbody");
    tableBody.className = "center"
    const tableRow = document.createElement("tr");
    tableRow.append(
        createCell("○", daten.id),
        createEditBtn(daten),
        createDoneBtn(daten),
        createDelBtn(daten.id));
    tableBody.appendChild(tableRow);
};



























//Einzelne Komponenten für eine ROW
//Cell - Creation
function createCell(text, taskid) {
    const cell = document.createElement("td");
    if (typeof text === 'string') {
        cell.innerText = text;
    }
    cell.classList.add("nr" + taskid);
    cell.style.paddingRight = "20px"
    cell.style.paddingBottom = "3px"
    return cell;
};


//Add Button (created in renderTasks()) - When it's clicked = Task Maker appears
function addTask() {
    console.log("\n\n\n\nI see you desire to create a new task\nSo i prepared a field for you to type in");
    const taskMaker = document.createElement("input");
    taskMaker.placeholder = "Hier Hinzufügen";
    taskMaker.className = "taskMaker";
    taskMaker.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            console.log("Creating your \'", taskMaker.value, "\' task...");
            console.log("This is the taskMaker: ",taskMaker)
            createTask(taskMaker);
            newAddBtn.replaceWith(oldAddBtn)
            console.log("Old Button restored")
        };
    });
    const platzhalter = document.querySelector(".platzhalter");
    platzhalter.append(taskMaker)
    taskMaker.focus();  
    console.log("here is a field to type your change in")

    const oldAddBtn = document.getElementsByClassName("abc")[0]
    const newAddBtn = document.createElement("button")
    newAddBtn.classList.add("login", "btn")
    newAddBtn.addEventListener("click", () => {
        createTask(taskMaker)
        console.log("creating the new task: ", taskMaker.value)

        newAddBtn.replaceWith(oldAddBtn)
        console.log("Old Button restored")
    })
    oldAddBtn.replaceWith(newAddBtn)
    
    // let oldAddBtn = document.getElementsByClassName("abc")[0]
    // let newAddBtn = document.createElement("button")
    // console.log("this is the old Add Button: ", oldAddBtn)
    // newAddBtn.innerText = "Hinzufügen"
    // newAddBtn.classList.add("login", "btn", "abc", "newBtn")

    // if (typeof document.getElementsByClassName("taskMaker")[0] != "undefined") {
    //     console.log("SSSSSSSSSSSSSSSSSSSSSSSSThis should be the second input field")
    //     console.log("is there another input Field?: " ,true);
    //     console.log("Creating your \'", taskMaker.value, "\' task...");
    //     console.log("This is the taskMaker: ",taskMaker)
    //     console.log("This is the taskMaker.value: ",taskMaker.value)
    //     let newAddBtnn = document.getElementsByClassName("newBtn")[0]
    //     console.log(newAddBtnn)
    //     newAddBtnn.addEventListener("click", function () {
    //         alert("you clicked me")
    //     })
        
    // } else {
    //     console.log("This should be the first input field, lets check that")
    //     console.log("is there another input field?: " ,false);
    //     newAddBtn.onclick = function () {
    //         console.log("\n\n\n\n\n\n\n\nyou clicked the new button")
    //         addTask(taskMaker)
    //         taskMaker.remove() 
    //     }
    //     console.log("creating a new button so that it doesn't clone the text field that has a clicked me function: ", newAddBtn)
    //     oldAddBtn.replaceWith(newAddBtn)
    //     console.log("I replaced the old Add Button with the new Add Button and gave you the taskMaker")

    //     test.append(taskMaker);
    //     taskMaker.focus();  
    // }
};

//Add Button - Fetch newly added data
function createTask(taskMaker) {
    console.log("I have to fetch to see what new ID i can give your new Task");
    fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((data) => {
            let newid = (data.length + 1);
            const daten = {
                "id": newid,
                "title": taskMaker.value,
                "completed": false
            };
            console.log("I fetched, the new task is going to have the id: ", newid);
            fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(daten)
            })
                .then((response) => response.json())
                .then((daten) => {
                    console.log('I successfully fetched:', daten);
                    addRow(daten);
                    taskMaker.remove();
                })
        });
};


//Edit Button - Creation
function createEditBtn(daten) {
    const editBtnTd = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.innerText = daten.title;
    editBtn.classList.add("nr" + daten.id, "myBtn")
    editBtn.onclick = function () {
        editTask(daten);
    };
    editBtn.style.width = "200px"
    editBtnTd.appendChild(editBtn)
    return editBtnTd;
};

//Edit Button - When it's clicked
function editTask(daten) {
    console.log("\n\n\n\nI see you would like to edit this task? \'", daten.title, "\' with the ID: ", daten.id);
    newTitle = window.prompt("What would you like to edit Task #" + daten.id + " to?")

    const newDaten = {
        id: daten.id,
        title: newTitle,
        completed: daten.completed
    }
    console.log(newDaten)
    fetch("http://localhost:3000/tasks", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newDaten)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Task has been updated to: ", data);
            console.log(document.getElementsByClassName("nr" + data.id))
            document.getElementsByClassName("nr" + data.id)[1].innerText = data.title
        })

};


//Done Button - Creation
function createDoneBtn(daten) {
    const doneBtnTd = document.createElement("td");
    const doneBtn = document.createElement("button");
    doneBtn.innerText = "✓";
    doneBtn.classList.add("nr" + daten.id)
    daten.completed ? doneBtn.classList.add("myDoneBtnChecked") : doneBtn.classList.add("myDoneBtnUnchecked"); //make it colorful, do it also for the delete button
    doneBtn.onclick = function () {
        console.log("\n\n\n\nbefore it gets clicked, we need to fetch");
        fetch("http://localhost:3000/tasks")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const specificData = data.find(haha => haha.id === daten.id);
                console.log("I saw which button you pressed so i will to the doneClicker", specificData);
                done(doneBtn, specificData);
            })
    };
    doneBtnTd.appendChild(doneBtn)
    return doneBtnTd;
};

//Done Button - When it's clicked
function done(doneBtn, daten) {
    console.log("done has been clicked: here are its values:", daten);
    if (daten.completed) {
        console.log("Meaning this task is completed");
        const datenf = {
            id: daten.id,
            title: daten.title,
            completed: false
        }
        console.log("I am going to fetch:", datenf, " with a put method");
        fetch("http://localhost:3000/tasks", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datenf)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Task has been updated to: UNCOMPLETED\nHere is the current data now", data);
                console.log("Task is UNCOMPLETED so it needs to be checked off / white");
                doneBtn.classList.remove("myDoneBtnChecked")
                doneBtn.classList.add("myDoneBtnUnchecked")
                //make it colorful, do it also for the delete button
            })
    }

    else {
        console.log("Meaning this task is not completed yet\nI will mark it as COMPLETED✓");
        const datent = {
            id: daten.id,
            title: daten.title,
            completed: true
        };
        console.log("I am going to fetch:", datent, " with a put method");
        fetch("http://localhost:3000/tasks", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datent)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Task has been updated to: COMPLETED\nHere is the current data now", data);
                console.log("Task is now COMPLETED, meaning it should be checked on / green ");
                doneBtn.classList.add("myDoneBtnChecked")
                doneBtn.classList.remove("myDoneBtnUnchecked")
                //make it colorful, do it also for the delete button
            })
    };
};


//Delete Button - creation
function createDelBtn(taskid) {
    const quickBtn = document.createElement("td");
    const btn = document.createElement("button");
    btn.innerText = "🗑️";
    btn.classList.add('nr' + taskid, "myDeleteBtn");
    btn.onclick = function () {
        console.log("\n\n\n\nYou clicked the delete button with the ID: ", taskid)
        delTask(taskid);
    };
    btn.onmouseover = function () {
        btn.style.backgroundColor = "red";
    };
    btn.onmouseout = function () {
        btn.style.backgroundColor = "white";
    };
    quickBtn.appendChild(btn);
    return quickBtn;
};

//Delete Button - When it's clicked
function delTask(taskid) {
    const mull = document.getElementsByClassName("nr" + taskid);
    console.log("deleting the row with the id: ", taskid);
    mull[0].remove();
    mull[0].remove(); //idk why but it delets the whole row
    mull[0].remove();
    mull[0].remove();

    fetch('http://localhost:3000/task/' + taskid, {
        method: 'DELETE',
        credentials: "include",
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(response => {
            response.json();
            console.log("Also fetched a delete so it stays deleted :^)");
        })
        .catch(err => console.log(err));
};



document.addEventListener("DOMContentLoaded", () => {
    //uberall bei /taksks ersetzen mit /auth/cookie/!!!!!!!!!!!!!!!!!\
    //uberall credentials include!
    indexTasks();

    document.getElementById("login").addEventListener("click", () => {
        window.open("login.html", "_blank", "popup");
    });

    //isUserLoggedIn() (mit dem GET request!!!)
});