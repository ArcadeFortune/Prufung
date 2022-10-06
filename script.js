function doneBtn(completed, taskid) {
    const doneBtn = document.createElement("button");
    doneBtn.innerText = "✓";
    doneBtn.className = "nr" + taskid;
    doneBtn.onclick = function () {
        done()
    }
    return doneBtn

}





function done() {
    alert("done")
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
        doneBtn(daten.completed, daten.id),
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