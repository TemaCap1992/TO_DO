// to do project

let addButton = document.getElementById('add');
let inputTask = document.getElementById('new-task');
let inputDeadLine = document.getElementById('newDeadLine');
let unfinishedTask = document.getElementById('unfinishedTask');
let finishedTask = document.getElementById('finishedTask');
let doneTask = document.getElementById('done');

let d = new Date();
let day = d.getDate();
let month = d.getMonth() + 1;
let year = d.getFullYear();
let today = day + " / " + month + " / " + year;

let todayNumber = document.getElementById('todayNumber');
todayNumber.innerText = 'TODAY - ' + today;

function createNewElement(task, finished) {
    let listItem = document.createElement('li');
    let checkbox = document.createElement('button');

    if (finished) {
        checkbox.className = "material-icons checkbox";
        checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
    } else {
        checkbox.className = "material-icons checkbox";
        checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
    }

    let term = inputDeadLine.value;
    let label = document.createElement('label');
    label.innerText = task;
    let input = document.createElement('input')
    input.type = "text";

    let deadLine = document.createElement('label');
    deadLine.className = "deadLine";
    deadLine.innerText = term;

    let editButton = document.createElement('button');
    editButton.className = "material-icons edit";
    editButton.innerHTML = "<i class='material-icons'>edit</i>";

    let doneButton = document.createElement('button');
    doneButton.className = "material-icons done";
    doneButton.innerHTML = "<i class='material-icons'>done</i>";

    let deleteButton = document.createElement('button');
    deleteButton.className = "material-icons delete";
    deleteButton.innerHTML = "<i class='material-icons'>delete</i>";

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deadLine);
    listItem.appendChild(input);
    listItem.appendChild(doneButton);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

function addTask() {
    if (inputTask.value) {
        let listItem = createNewElement(inputTask.value, false);
        unfinishedTask.appendChild(listItem)
        bindTaskEvents(listItem, finishTask)
        inputTask.value = "";
        inputDeadLine.value = "";
    }
    save();
}
addButton.onclick = addTask;

function editTask() {
    let editButton = this;
    let listItem = this.parentNode;
    let label = listItem.querySelector('label');
    let input = listItem.querySelector('input[type=text]');
    let containsClass = listItem.classList.contains('editMode');

    if (containsClass) {
        label.innerText = input.value;
        editButton.className = "material-icons edit";
        editButton.innerHTML = "<i class = 'material-icons'>edit</i>"
        save();
    } else {
        input.value = label.innerText;
        editButton.className = "material-icons save";
        editButton.innerHTML = "<i class = 'material-icons'>save</i>"
    }
    listItem.classList.toggle('editMode');
}

function deleteTask() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
    save();
}

let delAllTodo = document.getElementById('delAllTodo');
delAllTodo.onclick = deleteAllTaskTodo;
function deleteAllTaskTodo() {
    let listItem = this.parentNode;
    let listUnfinishedTask = listItem.querySelector('#unfinishedTask');
    i = listUnfinishedTask.children.length;
    while (i > 0) {
        i--;
        listUnfinishedTask.children[0].remove();
    };
    save();
}

let delAllInProgress = document.getElementById('delInProgress');
delAllInProgress.onclick = deleteAllInProgress;

function deleteAllInProgress() {
    let listItem = this.parentNode;
    let listFinishedTask = listItem.querySelector('#finishedTask');
    i = listFinishedTask.children.length;
    while (i > 0) {
        i--;
        listFinishedTask.children[0].remove();
    };
    save();
}

let delAllDone = document.getElementById('delDone');
delAllDone.onclick = deleteAllDone;
function deleteAllDone() {
    let listItem = this.parentNode;
    let listDoneTask = listItem.querySelector('#done');
    i = listDoneTask.children.length;
    while (i > 0) {
        i--;
        listDoneTask.children[0].remove();
    };
    save();
}

function unfinishTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class = 'material-icons'>check_box_outline_blank</i>";
    unfinishedTask.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
    save();
}

function finishTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class = 'material-icons'>check_box</i>";
    finishedTask.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
    save();
}

function doneItem() {
    let doneItem = this.parentNode
    doneItem.remove();
    doneTask.appendChild(doneItem);
    bindTaskEvents(doneItem, unfinishTask);
    save();
}

function bindTaskEvents(listItem, checkboxEvent) {

    // if (finishedTask.childElementCount < 6) {
    let checkbox = listItem.querySelector('button.checkbox');
    let editButton = listItem.querySelector('button.edit');
    let deleteButton = listItem.querySelector('button.delete');
    let donesButton = listItem.querySelector('button.done');
    donesButton.onclick = doneItem;
    checkbox.onclick = checkboxEvent;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;

    save();
}



function save() {
    let unfinishedTaskArr = [];
    let finishedTaskArr = [];
    let doneTaskArr = [];


    for (let i = 0; i < unfinishedTask.children.length; i++) {
        unfinishedTaskArr.push(unfinishedTask.children[i].children[1].innerText + ' ' + unfinishedTask.children[i].children[2].innerText);
    }

    for (let i = 0; i < finishedTask.children.length; i++) {
        finishedTaskArr.push(finishedTask.children[i].children[1].innerText + ' ' + finishedTask.children[i].children[2].innerText);
    }
    for (let i = 0; i < doneTask.children.length; i++) {
        doneTaskArr.push(doneTask.children[i].children[1].innerText + ' ' + doneTask.children[i].children[2].innerText);
    }

    let curentUnfinished = unfinishedTaskArr.length;
    let todoTitle = document.getElementById('todoTitle');
    todoTitle.innerText = 'To Do (' + curentUnfinished + ')';

    let curentFinished = finishedTaskArr.length;
    let inProgressTitle = document.getElementById('inProgressTitle');
    inProgressTitle.innerText = 'In progress (' + curentFinished + ')';

    let curentDone = doneTaskArr.length;
    let doneTitle = document.getElementById('doneTitle');
    doneTitle.innerText = 'Done (' + curentDone + ')';

    if (curentDone !== 0) {
        let hiddenButton = document.querySelector('#delDone')
        hiddenButton.className = 'allNotDel';
    } else {
        let hiddenButton = document.querySelector('#delDone')
        hiddenButton.className = 'allDel'
    }

    if (curentFinished !== 0) {
        let hiddenButton = document.querySelector('#delInProgress')
        hiddenButton.className = 'allNotDel';
    } else {
        let hiddenButton = document.querySelector('#delInProgress')
        hiddenButton.className = 'allDel'
    }

    if (curentUnfinished !== 0) {
        let hiddenButton = document.querySelector('#delAllTodo')
        hiddenButton.className = 'allNotDel';
    } else {
        let hiddenButton = document.querySelector('#delAllTodo')
        hiddenButton.className = 'allDel'
    }

    localStorage.removeItem('todo');
    localStorage.setItem('todo', JSON.stringify({
        unfinishedTask: unfinishedTaskArr,
        finishedTask: finishedTaskArr,
        doneTask: doneTaskArr
    }));
}


function load() {
    return JSON.parse(localStorage.getItem('todo'));
}

let data = load();
for (let i = 0; i < data.unfinishedTask.length; i++) {
    let listItem = createNewElement(data.unfinishedTask[i], false);
    unfinishedTask.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
}

for (let i = 0; i < data.finishedTask.length; i++) {
    let listItem = createNewElement(data.finishedTask[i], true);
    finishedTask.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
}

for (let i = 0; i < data.doneTask.length; i++) {
    let listItem = createNewElement(data.doneTask[i], true);
    doneTask.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
}


// modal window


// const btns = document.querySelectorAll('.btn');
// const modalOverlay = document.querySelector('.modal-overlay');
// const modals = document.querySelectorAll('.modal')

// btns.forEach((el) => {
//     el.addEventListener('click', (e) => {
//         let path = e.currentTarget.getAttribute('data-path');

//         modals.forEach((el) => {
//             el.classList.remove('modal--visible');
//         });

//         document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
//         modalOverlay.classList.add('modal-overlay--visible');
//     });
// });

// modalOverlay.addEventListener('click', (e) => {
//     if (e.target == modalOverlay) {
//         modalOverlay.classList.remove('modal-overlay--visible');
//         modals.forEach((el) => {
//             el.classList.remove('modal-overlay--visible');
//         });
//     }
// });



let btns = document.querySelector('.btn');
let modalOverlay = document.querySelector('.modal-overlay');
let modals = document.querySelector('.modal')



btns.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');

    modals => {
        modals.classList.remove('modal--visible');
    }

    document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
    modalOverlay.classList.add('modal-overlay--visible');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target == modalOverlay) {
        modalOverlay.classList.remove('modal-overlay--visible');
        modals => {
            modals.classList.remove('modal-overlay--visible');
        };
    }
});



showModal();



