



    function createCell(text) {
        const cell = document.createElement("td");
        cell.innerText = text;
        return cell;
    }

    function renderTasks(tasks) {
        const tableBody = document.querySelector("tbody");
        const TableFoot = document.querySelector("foot");
        tasks.forEach((tasks) => {
            const tableRow = document.createElement("tr");
            tableRow.append(createCell(tasks.id), createCell(tasks.title), createCell(tasks.completed));
            tableBody.appendChild(tableRow); 
        })
        
    }



    function getTasks(){
        fetch("https//localhost:3000/tasks")
            .then((Response) => Response.json())
            .then((data) => renderTasks(data))
    }



    function indexTasks() {
        fetch("http://localhost:3000/tasks")
            .then((response) => response.json())
            .then((data) => renderTasks(data))
    }
        // fetch("http://localhost:3000/tasks")
        //     .then((Response) => { return Response.json()})
        //     .then((data) => {tasks = data})
        //     console.log("tasks indexed inside data" + tasks.title)
                



    // function createTask(task) {
    //     fetch("https://localhost:3000", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
            
    //         },
    //         body: JSON.stringify(task)
    //     }).then(alert("hallo"))
    // }








document.addEventListener("DOMContentLoaded", () => {


    indexTasks();
    // getTasks();
    // createTask(title, "Bei fortnite das nächste Level erreichen");
    // renderTasks();
    console.log("checkpoint 1")
    const thead = document.getElementById("todonormal")
    const tableRow = document.createElement("tr");
    tableRow.append("1", "2", "3asdf");







    const loginBtn = document.getElementById("login");

    loginBtn.addEventListener("click", () => {
        window.open("login.html", "_blank", "popup")
    })
});