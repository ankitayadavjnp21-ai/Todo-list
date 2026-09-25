let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];


// SHOW ADD TASK
function showAddTask() {

    document
        .getElementById("addTaskBox")
        .classList.remove("hidden");

    document
        .getElementById("taskInput")
        .focus();
}


// HIDE ADD TASK
function hideAddTask() {

    document
        .getElementById("addTaskBox")
        .classList.add("hidden");

    document
        .getElementById("taskInput")
        .value = "";
}


// SAVE TASK
function saveTask() {

    let input =
        document.getElementById("taskInput");

    let taskName =
        input.value.trim();

    if (taskName === "") {

        input.focus();

        return;
    }


    tasks.push({

        id: Date.now(),

        name: taskName,

        completed: false,

        important: false

    });


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    hideAddTask();

    renderTasks();
}


// CHANGE PAGE
function showPage(pageName) {

    document
        .querySelectorAll(".page")
        .forEach(function(page) {

            page.classList.add("hidden");

        });


    document
        .getElementById(pageName)
        .classList.remove("hidden");


    if (pageName === "dashboard") {

        document
            .getElementById("pageTitle")
            .innerText = "Dashboard";

    }


    if (pageName === "tasks") {

        document
            .getElementById("pageTitle")
            .innerText = "My Tasks";

    }


    if (pageName === "important") {

        document
            .getElementById("pageTitle")
            .innerText = "Important";

    }


    renderTasks();
}


// COMPLETE TASK
function toggleComplete(id) {

    let task =
        tasks.find(function(item) {

            return item.id === id;

        });


    if (!task) {
        return;
    }


    task.completed =
        !task.completed;


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    renderTasks();
}


// IMPORTANT TASK
function toggleImportant(id) {

    let task =
        tasks.find(function(item) {

            return item.id === id;

        });


    if (!task) {
        return;
    }


    task.important =
        !task.important;


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    renderTasks();
}


// DELETE TASK
function deleteTask(id) {

    tasks =
        tasks.filter(function(item) {

            return item.id !== id;

        });


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    renderTasks();
}


// TASK HTML
function createTaskHTML(task) {

    return `

        <div class="task">

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleComplete(${task.id})"
            >

            <span
                class="task-name
                ${task.completed ? "completed" : ""}"
            >
                ${task.name}
            </span>

            <button
                class="star"
                onclick="toggleImportant(${task.id})"
            >
                ${task.important ? "⭐" : "☆"}
            </button>

            <button
                class="delete"
                onclick="deleteTask(${task.id})"
            >
                Delete
            </button>

        </div>

    `;
}


// RENDER TASKS
function renderTasks() {

    let allTasks =
        document.getElementById("allTasks");

    let dashboardTasks =
        document.getElementById("dashboardTasks");

    let importantTasks =
        document.getElementById("importantTasks");


    allTasks.innerHTML = "";

    dashboardTasks.innerHTML = "";

    importantTasks.innerHTML = "";


    // ALL TASKS
    tasks.forEach(function(task) {

        allTasks.innerHTML +=
            createTaskHTML(task);

    });


    // DASHBOARD + IMPORTANT
    
// DASHBOARD
tasks.forEach(function(task) {

    dashboardTasks.innerHTML +=
        createTaskHTML(task);

});

// IMPORTANT
tasks.forEach(function(task) {

    if (task.important) {

        importantTasks.innerHTML +=
            createTaskHTML(task);

    }

});

    // TOTAL
    let total = tasks.length;


    // COMPLETED
    let completed =
        tasks.filter(function(task) {

            return task.completed;

        }).length;


    // PENDING
    let pending =
        total - completed;


    // PERCENTAGE
    let completedPercent =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    let pendingPercent =
        total === 0
            ? 0
            : Math.round(
                (pending / total) * 100
            );


    // PERCENTAGE TEXT
    document
        .getElementById("completedPercent")
        .innerText =
            completedPercent + "%";


    document
        .getElementById("pendingPercent")
        .innerText =
            pendingPercent + "%";


    // PROGRESS BAR
    document
        .getElementById("progressBar")
        .style.width =
            completedPercent + "%";


    // TASK INFO
    document
        .getElementById("taskInfo")
        .innerText =
            total + " tasks";


    // TASK COUNTER
    document
        .getElementById("totalCount")
        .innerText =
            total;


    document
        .getElementById("completedCount")
        .innerText =
            completed;


    document
        .getElementById("pendingCount")
        .innerText =
            pending;
}


// DARK MODE
function toggleDarkMode() {

    document
        .body
        .classList
        .toggle("dark-mode");
}


// SEARCH
function searchTasks() {

    let input =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    let taskElements =
        document
            .querySelectorAll("#allTasks .task");


    taskElements.forEach(function(task) {

        let name =
            task
                .querySelector(".task-name")
                .innerText
                .toLowerCase();


        if (name.includes(input)) {

            task.style.display = "flex";

        } else {

            task.style.display = "none";

        }

    });
}


// FIRST LOAD
renderTasks();setTimeout(function () {
    document.getElementById("welcomeScreen").style.display = "none";
}, 2000);
