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
    const tableRow = document.createElement("tr");
    tableRow.append(
        createCell(daten.id, daten.id),
        createCell(daten.title, daten.id),
        createDoneBtn(daten),
        createDelBtn(daten.id));
    tableBody.appendChild(tableRow);
};



























//Einzelne Komponenten für eine ROW
//Cell - Creation
function createCell(text, taskid) {
    const cell = document.createElement("td");
    cell.innerText = text;
    cell.className = "nr" + taskid;
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
            createTask(taskMaker.value);
            taskMaker.remove();
        };
    });
    const test = document.querySelector(".platzhalter");
    test.append(taskMaker);
    taskMaker.focus();
};

//Add Button - Fetch newly added data
function createTask(task) {
    console.log("I have to fetch to see what new ID i can give your new Task");
    fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((data) => {
            let newid = (data.length + 1);

            const daten = {
                "id": newid,
                "title": task,
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

                })
        });
};


//Done Button - Creation
function createDoneBtn(daten) {
    const doneBtn = document.createElement("button");
    doneBtn.innerText = "✓";
    doneBtn.className = "nr" + daten.id;
    daten.completed ? doneBtn.style.backgroundColor = "green" : doneBtn.style.backgroundColor = "inhreit"; //make it colorful, do it also for the delete button
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
    return doneBtn;
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
                doneBtn.style.backgroundColor = "white";
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
                doneBtn.style.backgroundColor = "green";
                //make it colorful, do it also for the delete button
            })
    };
};


//Delete Button - creation
function createDelBtn(taskid) {
    const quickBtn = document.createElement("td");
    const btn = document.createElement("button");
    btn.innerText = "🗑️";
    btn.classList.add('nr' + taskid);
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
    indexTasks();

    document.getElementById("login").addEventListener("click", () => {
        window.open("login.html", "_blank", "popup");
    });
});