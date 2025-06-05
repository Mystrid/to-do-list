const list = document.querySelector("main");
const form = document.querySelector("#new-item-form");
const input = document.querySelector("form > input");
const overlay = document.querySelector("#overlay");
const deleteModal = document.querySelector(".modal");
const deleteModalText = document.querySelector("#delete-modal-text");
const deleteButton = document.querySelector(".confirm-delete-button");
const cancelButton = document.querySelector(".cancel-button");

form.addEventListener("submit", e => {
  e.preventDefault();

  if (input.value === "") return;

  const item = document.createElement("div");
  item.classList.add("list-item");

  const text = document.createElement("div");
  text.classList.add("list-item-text");
  text.innerText = input.value;

  const button = document.createElement("button");

  const img = document.createElement("img");
  img.className = "delete-icon";
  img.src = "icons/delete.png";

  button.appendChild(img);
  item.appendChild(text);
  item.appendChild(button);
  list.appendChild(item);

  button.addEventListener("click", () => {
    overlay.style.display = "block";
    deleteModal.style.display = "block";
    deleteModalText.innerText = `"${item.innerText}" will be permanently deleted.`;

    deleteButton.addEventListener("click", () => {
      list.removeChild(item);
      hideModal();
    });
  });
  input.value = "";
});

overlay.addEventListener("click", hideModal);
cancelButton.addEventListener("click", hideModal);

function hideModal() {
  overlay.style.display = "none";
  deleteModal.style.display = "none";
}
