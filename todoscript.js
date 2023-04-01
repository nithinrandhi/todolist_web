const taskInput = document.querySelector(".place"),
filters=document.querySelectorAll(".filters span"),
taskbox=document.querySelector(".taskbox");
// task=document.querySelector(".tt");
save=document.querySelector(".save");
textInput=document.querySelector(".area");
let editId;
let isEditedTask=false;
let todos=JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter){
    let li="";
    if(todos){
    todos.forEach((todo,id)=>{
        let isCompleted=todo.status=="completed"? "checked":"";
        if(filter== todo.status|| filter=="all"){
        li+=`<li class="task">
              <label for="${id}" class="tt">
                  <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                   <p class="${isCompleted}">${todo.name}</p>
               </label>
               <div class="edit">
                 <button class="btn1" onclick="editTask(${id}, '${todo.name}')"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                 <button class="btn2" onclick="deleteTask(${id})"><i class="fa fa-trash" aria-hidden="true"></i></button>
              </div>
            </li>`;
       }
    });
    }
    taskbox.innerHTML=li|| `<span> No tasks`;
    taskbox.offsetHeight >= 300 ? taskbox.classList.add("overflow") : taskbox.classList.remove("overflow");
    // task.offsetWidth >= 10 ? task.classList.add("overflow") : task.classList.remove("overflow");
}
showTodo("all");
function updateStatus(selectedTask){
    let taskName= selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status="completed";
    } else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status="pending";
    }
}

function deleteTask(deleteId){
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");
}

function editTask(taskId,taskName){
    editId=taskId;
    isEditedTask=true;
    textInput.value=taskName;
}
taskInput.addEventListener("keyup",e=>{
    let userTask = taskInput.value.trim();
    let Ttask=textInput.value.trim();
    if(e.key =="Enter" && (userTask||Ttask)){
        if(!isEditedTask){
            if(!todos){
                todos=[];
            }
            let taskInfo ={name: userTask, status:"pending"};
            todos.push(taskInfo);
        }
        // let todos=JSON.parse(localStorage.getItem("todo-list"));
        else{
            isEditedTask=false;
            todos[editId].name=Ttask;
        }
        taskInput.value="";
        textInput.value="";
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
});

save.addEventListener("click",()=>{
    let userTask = taskInput.value.trim();
    let Ttask=textInput.value.trim();
    if(userTask||Ttask){
        if(!isEditedTask){
            if(!todos){
                todos=[];
            }
            let taskInfo ={name: userTask, status:"pending"};
            todos.push(taskInfo);
        }
        // let todos=JSON.parse(localStorage.getItem("todo-list"));
        else{
            isEditedTask=false;
            todos[editId].name=Ttask;
        }
        taskInput.value="";
        textInput.value="";
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
});
