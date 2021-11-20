var myInput = document.getElementById('title');
var btn = document.getElementById('submit');
var output = document.querySelector(".output");

var arrayOfTask = [];


if(window.localStorage.getItem("tasks")){
    var arrayOfTask = JSON.parse(window.localStorage.getItem("tasks"));
}

getItemFromLocalStorage();



output.addEventListener("click",(e)=>{

if(e.target.classList.contains("del")){


removeItem(e.target.parentElement.getAttribute("data-id"));
e.target.parentElement.remove();
}



if(e.target.classList.contains("task")){
    e.target.classList.toggle("done");
}




});






// start here

btn.onclick = function (){
    if(myInput.value !== ""){
        addTaskToArray(myInput.value);
    }

    myInput.value = "";
};


function addTaskToArray(taskText){

var task = {
    id : Date.now(),
    title : taskText,
    completed : false,

};

arrayOfTask.push(task);

addArrayToPage(arrayOfTask);
addItemToLocalStorage(arrayOfTask);

};

function addArrayToPage(myArray){
    output.innerHTML = "";
    myArray.forEach((task)=>{

    let myDiv = document.createElement("div");
    myDiv.classList.add("task");
    myDiv.innerHTML = task.title;

        if(task.completed){
            myDiv.classList.add("task done");
        }



    myDiv.setAttribute("data-id",task.id)
    output.appendChild(myDiv);

    let span = document.createElement("span");
    span.classList.add("del");

    span.appendChild(document.createTextNode("Delet"));
    myDiv.appendChild(span);

    })

};

function addItemToLocalStorage(arrayOfTask){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTask));
}


function getItemFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addArrayToPage(tasks);
    }
    
}


function removeItem(taskId){
   arrayOfTask = arrayOfTask.filter((task) => task.id != taskId );
    addItemToLocalStorage(arrayOfTask);
}
