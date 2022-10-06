function createDoneBtn(daten) {
    const doneBtn = document.createElement("button");
    doneBtn.innerText = "✓";
    doneBtn.className = "nr" + daten.id;
    daten.completed ? doneBtn.style.backgroundColor = "green" : doneBtn.style.backgroundColor = "inhreit"; //make it colorful, do it also for the delete button
    doneBtn.onclick = function () {
        console.log("before it gets clicked, it needs to be fetched")
        fetch("http://localhost:3000/tasks")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                console.log("data.id: ", data.id)
                console.log("datEN.id: ", daten.id)
                const indegs = daten.id - 1
                console.log(indegs)
                const testint = data.find(car => car.id === daten.id)
                console.log("this is what i belive the correct selector: ", testint)
                done(doneBtn, testint)
            })
    }
    return doneBtn
}


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
                console.log("Task has been updated to: UNCOMPLETED\nHere is the current data now", data, "\n\n\n\n")
                console.log("Task is UNCOMPLETED so it needs to be checked off / white")
                doneBtn.style.backgroundColor = "white"
                //make it colorful, do it also for the delete button
            })
    }

    else {
        console.log("Meaning this task is not completed yet\nI will mark it as COMPLETED✓");
        const datent = {
            id: daten.id,
            title: daten.title,
            completed: true
        }
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
                console.log("Task has been updated to: COMPLETED\nHere is the current data now", data, "\n\n\n\n") 
                console.log("Task is now COMPLETED, meaning it should be checked on / green")
                doneBtn.style.backgroundColor = "green"
            //make it colorful, do it also for the delete button
            })
    }
}


function createCell(text, taskid) {
    const cell = document.createElement("td");
    cell.innerText = text;
    cell.className = "nr" + taskid;
    return cell;
}


function delBtn(taskid) {
    const quickBtn = document.createElement("td");
    const btn = document.createElement("button");
    btn.innerText = "🗑️";    
    btn.classList.add('nr' + taskid);
    btn.onclick = function () {
        delTask(taskid)
    }
    btn.onmouseover = function () {
        btn.style.backgroundColor = "red"
    }
    btn.onmouseout = function () {
        btn.style.backgroundColor = "white"
    }
    quickBtn.appendChild(btn)
    return quickBtn
}


function renderTasks(tasks) {
    const tableBody = document.querySelector("tbody");
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
    })

    tableCaption.append(platzhalter)
    tableCaption.appendChild(addBtn)
}


function indexTasks() {
    fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((data) => renderTasks(data))
}


function createTask(task) {
    let daten;
    fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((data) => {
            let newid = (data.length + 1)

            const daten = {
                "id": newid,
                "title": task,
                "completed": false
            };
            fetch('http://localhost:3000/tasks', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(daten),
            })
                .then((response) => response.json())
                .then((daten) => {
                    console.log('Successfully added:', daten);
                addRow(daten)
                    
                })



        })
}

function addTask() {
    const taskMaker = document.createElement("input");
    taskMaker.placeholder = "Hier Hinzufügen";
    taskMaker.className = "taskMaker";
    taskMaker.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            createTask(taskMaker.value)
            taskMaker.remove()
        }
    })
    const test = document.querySelector(".platzhalter");
    test.append(taskMaker);
    taskMaker.focus();
}

function addRow(daten) {
    const tableBody = document.querySelector("tbody");
    const tableRow = document.createElement("tr");
    tableRow.append(
        createCell(daten.id, daten.id),
        createCell(daten.title, daten.id),
        createDoneBtn(daten),
        delBtn(daten.id));
    tableBody.appendChild(tableRow);
} 
function delTask(taskid) {
    
    const mull = document.getElementsByClassName("nr" + taskid);
    const a = document.createElement("input")
    mull[0].remove();
    mull[0].remove(); //idk why but it delets the whole row
    mull[0].remove();
    mull[0].remove();
    // fetch('http://localhost:3000/tasks/' + taskid, {
    //     method: 'DELETE',
    //   })
    //   .then(res => res.text()) // or res.json()
    //   .then(res => console.log(res))

    fetch('http://localhost:3000/task/' + taskid, {
        method: 'DELETE',
        credentials: "include",
        headers: {
            'Content-type': 'application/json'}})
                .then(response => response.json())
                .catch(err => console.log(err))
                
        };





document.addEventListener("DOMContentLoaded", () => {


            indexTasks();
            // getTasks();
            // createTask(title, "Bei fortnite das nächste Level erreichen");
            // renderTasks();
            console.log("checkpoint 1")
            const thead = document.getElementById("todonormal")
            const tableRow = document.createElement("tr");
            tableRow.append("1", "2", "3asdf");





            document.getElementById("login").addEventListener("click", () => {
                window.open("login.html", "_blank", "popup")
            });
        })