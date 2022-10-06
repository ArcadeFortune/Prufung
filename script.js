

function createCell(text, id) {
    const cell = document.createElement("td");
    cell.innerText = text;
    cell.className = "nr" + id;
    return cell;
}

function delBtn(taskid) {
    const quickBtn = document.createElement("td");
    const btn = document.createElement("button");
    btn.innerText = "✓";
    btn.className = "delBtn"
    btn.onclick = function () {
        delTask(taskid)
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
        const tableRow = document.createElement("tr");
        tableRow.append(
            createCell(tasks.id, tasks.id),
            createCell(tasks.title, tasks.id),
            createCell(tasks.completed, tasks.id),
            delBtn(tasks.id, tasks.id)
        );
        tableBody.appendChild(tableRow);
    })

    tableCaption.append(platzhalter)
    tableCaption.appendChild(addBtn)
}


// , {
//     credentials: "include",
//     headers: {
//         'Content-Type': 'application/json'
//     }}

function indexTasks() {
    fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((data) => renderTasks(data))
}
// fetch("http://localhost:3000/tasks")
//     .then((Response) => { return Response.json()})
//     .then((data) => {tasks = data})
//     console.log("tasks indexed inside data" + tasks.title)



function createTask(task) {
    let daten;
    fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((data) => {
            console.log("The next ID that will be given to the new Task is gonna be: " + (data.length + 1))
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
                    console.log('Success:', daten);

                    const tableBody = document.querySelector("tbody");
                    const tableRow = document.createElement("tr");
                    tableRow.append(createCell(daten.id, daten.id), createCell(daten.title, daten.id), createCell(daten.completed, daten.id));
                    tableBody.appendChild(tableRow);
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

function delTask(taskid) {
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
                .then(data => console.log(data))
                .catch(err => console.log(err))
                console.log(taskid)
                
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