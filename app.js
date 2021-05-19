const list = document.querySelector(".todos");
const addForm = document.querySelector(".add");
const search = document.querySelector(".search input");

//! generateTemplate function for generating todo templates
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

    //! localStorage setup for adding todos
    let todos = [];
    if (localStorage.getItem("todos")) {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  addForm.reset();
});

//! Event listener for deleting selected todo
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    //! Removing todo from localStorage
    let todos = [];
    todos = JSON.parse(localStorage.getItem("todos"));

    let todoToDelete = e.target.previousElementSibling.innerText;

    todos = todos.filter((todo) => {
      return todo !== todoToDelete;
    });

    localStorage.setItem("todos", JSON.stringify(todos));

    //! Removing the todo from the DOM
    e.target.parentElement.remove();
  }
});

//! Function to filterTodos
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

//! Checking for todos in localStorage
if (localStorage.getItem("todos")) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todo) => {
    generateTemplate(todo);
  });
}
