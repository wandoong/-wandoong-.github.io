const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input"); // toDoForm을 위에서 찾아놨기 때문에 input만 해도 괜찮음.
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = []; // const를 let으로 바꿈으로써 update 가능하도록 변경.

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // 클릭한 li의 id와 다른 toDo는 남겨두고 싶다 !
    // parseInt 는 문자열을 숫자로 바꿔준다 !
    saveToDos();
}

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
      };
      toDos.push(newTodoObj);
      paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit); 
 

const savedToDos = localStorage.getItem(TODOS_KEY);


if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos); // TODOS_KEY에 저장돼있는 값은 string 형태이다.
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}