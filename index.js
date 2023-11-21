let ul = document.getElementById("todo-list")
let input = document.getElementById("todo-input")
let addItem = document.getElementById("add-todo")
 let body = document.getElementById("body");
let updateText = document.createElement("p");
 body.appendChild(updateText);
 
let todoList = JSON.parse(localStorage.getItem("todos")) || []

//functions

let handlePrintTodo = (itemList) => {

    itemList.forEach((item) => {
        let checkBox = document.createElement("input")
        let eachTodo = document.createElement("div");
        let li = document.createElement("li");
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete"
        let todoItem = document.createElement("p");


        todoItem.innerHTML = item;

        checkBox.setAttribute("type", "checkbox")
        checkBox.classList.add("checkbox")
        todoItem.classList.add("unchecked")
        deleteBtn.classList.add("delete-btn")
        eachTodo.classList.add("each-todo");
        eachTodo.appendChild(li);
        eachTodo.appendChild(deleteBtn);
       li.appendChild(checkBox)
        li.appendChild(todoItem)
        ul.appendChild(eachTodo)



        //event listeners

        checkBox.addEventListener("click", () => {
            checkTodo(todoItem)
        })

        deleteBtn.addEventListener("click", (e) => {
            deleteTodo(e.target)
        })

    })

    updateText.innerText = `There are ${itemList.length} items in your List.`

}

let updateItems = () => {

    location.reload()
  let updatedList = JSON.parse(localStorage.getItem("todos"));

  handlePrintTodo(updatedList);
};

let addTodo = () => {
    if (input.value !== "") {

        let newList = [...todoList, input.value];

        let eachTodo = document.createElement("div");
        let li = document.createElement("li");
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        let todoItem = document.createElement("p");
        let checkBox = document.createElement("input");

        todoItem.innerHTML = input.value;
        checkBox.setAttribute("type", "checkbox");
        checkBox.classList.add("checkbox");
        todoItem.classList.add("unchecked");
        deleteBtn.classList.add("delete-btn");
        eachTodo.classList.add("each-todo");
        eachTodo.appendChild(li);
        eachTodo.appendChild(deleteBtn);

        li.appendChild(checkBox);
        li.appendChild(todoItem);
        ul.appendChild(eachTodo);

         localStorage.setItem("todos", JSON.stringify(newList));

        input.value = "";

        checkBox.addEventListener("click", () => {
          checkTodo(todoItem);
        });

        deleteBtn.addEventListener("click", (e) => {
          deleteTodo(e.target);
        });

        location.reload()
    }
}

let checkTodo = (todo) => {
    if (todo.classList.contains("checked")) {
            todo.classList.remove("checked");
          } else {
            todo.classList.add("checked");
          }
      
};

let deleteTodo = (el) => {
 if (el.closest("div").children[0].children[1].classList.contains("checked")) {
   el.closest("div").remove();
     let removedItem = el.closest("div").children[0].children[1].innerText;
     let updatedList = todoList.filter((item) => item !== removedItem);
     
     console.log(updatedList)
   localStorage.setItem("todos", JSON.stringify(updatedList))

   updateItems();
 } else {
   alert("This item is not checked");
 }
}


//prints the inital list

handlePrintTodo(todoList);

//Event listeners

addItem.addEventListener("click", () => {
    addTodo()
})

document.onkeydown = (e) => {
    if (e.keyCode == "13") {
        addTodo()
    }
}


