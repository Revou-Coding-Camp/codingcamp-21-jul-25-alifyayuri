const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if(inputBox.value === ''){
        alert("Tidak boleh kosong!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00D7"; // Unicode for multiplication sign (×)
        li.appendChild(span);
    }

    inputBox.value = ""; // Clear the input box after adding the task
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTasks() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}

//fitur tanggal

function addTask() {
    const dateBox = document.getElementById("date-box");
    const taskText = inputBox.value.trim();
    const taskDate = dateBox.value;

    if (taskText === '') {
        alert("Tidak boleh kosong!");
        return;
    }

    let li = document.createElement("li");
    li.setAttribute("data-date", taskDate); // untuk filtering nanti

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <span class="task-date">${taskDate ? '(' + taskDate + ')' : ''}</span>
    `;

    let span = document.createElement("span");
    span.innerHTML = "\u00D7";
    li.appendChild(span);

    listContainer.appendChild(li);

    inputBox.value = "";
    dateBox.value = "";
    saveData();
}

// filtertask()
function filterTasks() {
    const filterDate = document.getElementById("filter-date").value;
    const tasks = listContainer.getElementsByTagName("li");

    for (let task of tasks) {
        const taskDate = task.getAttribute("data-date");
        if (!filterDate || taskDate === filterDate) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    }
}



showTasks();



