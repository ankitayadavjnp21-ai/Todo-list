let tasks = [];


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


    task.completed =
        !task.completed;


    renderTasks();
}


// IMPORTANT TASK
function toggleImportant(id) {

    let task =
        tasks.find(function(item) {

            return item.id === id;

        });


    task.important =
        !task.important;


    renderTasks();
}


// DELETE TASK
function deleteTask(id) {

    tasks =
        tasks.filter(function(item) {

            return item.id !== id;

        });


    renderTasks();
}


// TASK HTML
function createTaskHTML(task) {

    return `

        <div class="task">

            <input
                type="checkbox"

                ${task.completed
                    ? "checked"
                    : ""}

                onchange="
                    toggleComplete(${task.id})
                "
            >


            <span
                class="
                    task-name
                    ${task.completed
                        ? "completed"
                        : ""}
                "
            >
                ${task.name}
            </span>


            <button
                class="star"
                onclick="
                    toggleImportant(${task.id})
                "
            >
                ${task.important
                    ? "⭐"
                    : "☆"}
            </button>


            <button
                class="delete"
                onclick="
                    deleteTask(${task.id})
                "
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
        document.getElementById(
            "dashboardTasks"
        );

    let importantTasks =
        document.getElementById(
            "importantTasks"
        );


    allTasks.innerHTML = "";

    dashboardTasks.innerHTML = "";

    importantTasks.innerHTML = "";


    // ALL TASKS
    tasks.forEach(function(task) {

        allTasks.innerHTML +=
            createTaskHTML(task);

    });


    // IMPORTANT TASKS
    tasks.forEach(function(task) {

        if (task.important) {

            dashboardTasks.innerHTML +=
                createTaskHTML(task);

            importantTasks.innerHTML +=
                createTaskHTML(task);

        }

    });


    // PROGRESS

    let total = tasks.length;


    let completed =
        tasks.filter(function(task) {

            return task.completed;

        }).length;


    let pending =
        total - completed;


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


    document
        .getElementById(
            "completedPercent"
        )
        .innerText =
            completedPercent + "%";


    document
        .getElementById(
            "pendingPercent"
        )
        .innerText =
            pendingPercent + "%";


    document
        .getElementById(
            "progressBar"
        )
        .style.width =
            completedPercent + "%";


    document
        .getElementById(
            "taskInfo"
        )
        .innerText =
            total + " tasks";
      }
