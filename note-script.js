const addBtn = document.getElementById("addBtn");
const inp = document.getElementById("inp");
const taskList = document.querySelector(".task-list");

// Step-3
const displayData = () => {
    const getTask = JSON.parse(localStorage.getItem("toDoTask")) ?? [];
    let html = "";

    getTask.map(item => {
        html += `<li>
                <p>${item.data}</p>
                <div class="btns">
                    <i onClick="updateItem(${item.id})" class="fa-solid fa-pen-to-square"></i>
                    <i onClick="deleteItem(${item.id})" class="fa-solid fa-trash"></i>
                </div>
            </li>`
    })

    taskList.innerHTML = html;
}

displayData();

// step-5
// Update Function
const updateItem = (id) => {
    const getTask = JSON.parse(localStorage.getItem("toDoTask")) ?? [];
    getTask.map(item => {
        if (item.id == id) {
            const editTask = prompt("Edit Your Task", item.data);
            item.data = editTask;
        }
    })

    localStorage.setItem("toDoTask", JSON.stringify(getTask));
    displayData();
}

// step-4
// Delete Function
const deleteItem = (id) => {
    const getTask = JSON.parse(localStorage.getItem("toDoTask")) ?? [];
    let newData = getTask.filter(item => item.id != id);
    localStorage.setItem("toDoTask", JSON.stringify(newData));
    displayData();
}

// step-2
// Save Tsk List In LocalStroage
const saveTask = (task) => {
    const getTask = JSON.parse(localStorage.getItem("toDoTask")) ?? [];

    getTask.push({
        id: Date.now(),
        data: task
    })

    localStorage.setItem("toDoTask", JSON.stringify(getTask));
    inp.value = "";
    displayData()

}



// Step-1
// Button ke on Click Par Function
addBtn.addEventListener("click", () => {
    let inpValue = inp.value.trim();

    if (!inpValue) {
        return alert("Input Is Empty")
    }

    saveTask(inpValue)

})
