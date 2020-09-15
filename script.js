


let addButton = document.getElementById('add');
let inputTask = document.getElementById('new-task');
let inputDeadLine = document.getElementById('newDeadLine');
let unfinishedTask = document.getElementById('unfinishedTask');
let finishedTask = document.getElementById('finishedTask');


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
    let deleteButton = document.createElement('button');
    deleteButton.className = "material-icons delete";
    deleteButton.innerHTML = "<i class='material-icons'>delete</i>";



    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deadLine);

    listItem.appendChild(input);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;

}


//console.log(inputDeadLine.value);


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

let dbl = document.querySelector('#finishedTask');
console.log(dbl.children);


function finishTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class = 'material-icons'>check_box</i>";
    finishedTask.appendChild(listItem);
    bindTaskEvents(listItem, unfinishTask);
    save();
}

function unfinishTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.checkbox');
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class = 'material-icons'>check_box_outline_blank'</i>";
    unfinishedTask.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
    save();
}

function bindTaskEvents(listItem, checkboxEvent) {
    let checkbox = listItem.querySelector('button.checkbox');
    let editButton = listItem.querySelector('button.edit');
    let deleteButton = listItem.querySelector('button.delete');

    checkbox.onclick = checkboxEvent;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
}


function save() {
    let unfinishedTaskArr = [];
    let finishedTaskArr = [];

    for (let i = 0; i < unfinishedTask.children.length; i++) {
        unfinishedTaskArr.push(unfinishedTask.children[i].getElementsByTagName('label')[0].innerText);
    }
    for (let i = 0; i < finishedTask.children.length; i++) {
        finishedTaskArr.push(finishedTask.children[i].getElementsByTagName('label')[0].innerText);
    }

    let curentUnfinished = unfinishedTaskArr.length;
    let todoTitle = document.getElementById('todoTitle');
    todoTitle.innerText = 'To DO (' + curentUnfinished + ')';

    let curentFinished = finishedTaskArr.length;
    let inProgressTitle = document.getElementById('inProgressTitle');
    inProgressTitle.innerText = 'In progress (' + curentFinished + ')';

    localStorage.removeItem('todo');
    localStorage.setItem('todo', JSON.stringify({
        unfinishedTask: unfinishedTaskArr,
        finishedTask: finishedTaskArr

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
