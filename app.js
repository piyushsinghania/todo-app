const list = document.querySelector(".todos");
const addForm = document.querySelector(".add");
const search = document.querySelector(".search input");

const generateTemplate = (todo) => {
  const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

  list.innerHTML += html;
};

//! Event listener for adding new todos
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = e.target.add.value.trim();

  if (todo) {
    generateTemplate(todo);
  }

  addForm.reset();
});

//! Event listener for deleting selected todo
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

//! Event listener for searching todos
search.addEventListener("keyup", () => {
  const term = search.value.toLowerCase().trim();
  filterTodos(term);
});
