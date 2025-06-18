const main = document.querySelector("main");
const greeting = document.querySelector(".greeting-text");
const list = document.querySelector("main > .incomplete");
const divider = document.querySelector(".task-divider");
const completeTasks = document.querySelector("main > .complete");
const form = document.querySelector("#new-item-form");
const input = document.querySelector("form > input");
const overlay = document.querySelector("#overlay");
const deleteModal = document.querySelector(".modal");
const deleteModalText = document.querySelector("#delete-modal-text");
const deleteButton = document.querySelector(".confirm-delete-button");
const cancelButton = document.querySelector(".cancel-button");

const LOCAL_STORAGE_PREFIX = "TODO_LIST";
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}_STORAGE`;
let toDos = loadToDos();
toDos.forEach(renderToDo);

let taskToDelete;
let taskToDeleteId;

form.addEventListener("submit", e => {
  e.preventDefault();
  if (input.value === "") return;

  const toDo = {
    task: input.value,
    complete: false,
    id: new Date().valueOf().toString(),
  };
  toDos.push(toDo);

  renderToDo(toDo);
  saveToDos();
  input.value = "";
});

main.addEventListener("change", e => {
  if (!e.target.matches(".list-item input")) return;

  const listItem = e.target.parentElement;
  const toDoId = listItem.dataset.id;
  const toDo = toDos.find(toDo => toDo.id === toDoId);
  toDo.complete = e.target.checked;
  toDos = toDos.filter(toDo => toDo.id !== toDoId);
  toDos.push(toDo);

  listItem.remove();
  renderToDo(toDo);
  saveToDos();
});

main.addEventListener("click", e => {
  if (!e.target.matches(".list-item button, .delete-icon")) return;

  taskToDelete = e.target.closest(".list-item");
  taskToDeleteId = taskToDelete.dataset.id;
  overlay.style.display = "block";
  deleteModal.style.display = "block";
  deleteModalText.innerText = `"${taskToDelete.innerText}" will be permanently deleted.`;
});

divider.addEventListener("click", () => {
  completeTasks.classList.toggle("hide");
});

deleteButton.addEventListener("click", () => {
  taskToDelete.remove();
  toDos = toDos.filter(toDo => toDo.id !== taskToDeleteId);
  saveToDos();
  hideModal();
  showDivider();

  // show message
  if (toDos.length === 0) greeting.classList.remove("hide");
});
cancelButton.addEventListener("click", hideModal);
overlay.addEventListener("click", hideModal);

function hideModal() {
  overlay.style.display = "none";
  deleteModal.style.display = "none";
}

function renderToDo(toDo) {
  // seek answer here
  const toDoTemplate = document
    .querySelector("#todo-item-template")
    .content.cloneNode(true);
  const listItem = toDoTemplate.querySelector(".list-item");
  listItem.dataset.id = toDo.id;
  listItem.querySelector(".list-item > input").checked = toDo.complete;
  listItem.querySelector(".list-item-text").innerText = toDo.task;

  // hide message
  greeting.classList.add("hide");

  if (toDo.complete) completeTasks.prepend(listItem);
  else list.prepend(listItem);

  showDivider();
}

function showDivider() {
  if (completeTasks.innerHTML === "") divider.classList.remove("show");
  else divider.classList.add("show");
}

function saveToDos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(toDos));
}

function loadToDos() {
  const toDos = localStorage.getItem(TODOS_STORAGE_KEY);
  return JSON.parse(toDos) || [];
}
