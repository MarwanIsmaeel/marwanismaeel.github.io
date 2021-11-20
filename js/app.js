let  input = document.getElementById('title');
let btn = document.getElementById('submit');
let output = document.querySelector('.output');





let taskArray = [];

if(window.localStorage.getItem("tasks")){
    taskArray = JSON.parse(window.localStorage.getItem("tasks"));
};


output.addEventListener('click',(e)=>{
    if(e.target.classList.contains("del")){
      let id =   e.target.parentElement.getAttribute("data-id");
      console.log(id);
      removeItem(e,id);
    }
});

function removeItem(e,id){
 console.log(e.target.parentElement.getAttribute("data-id"));
 if(e.target.parentElement.getAttribute("data-id") == id){
    console.log("this item should be removed")
    e.target.parentElement.remove();  
    removeItemFromLocalStorage(id) 
 }
}


function removeItemFromLocalStorage(id){
   taskArray =  taskArray.filter((task)=> task.id != id)
            addArrayToStorage(taskArray);

}






btn.onclick = function(){
    if( input.value !== ""  ){
        createTask(input.value);
        input.value = "";
    } 
};




function createTask(taskTitle){
let task = {
    title: taskTitle,
    id: Date.now(),
    done: false,
};

// create array of tasks
taskArray.push(task);
// add the array to localStorage
addArrayToStorage(taskArray);
// add the array to html page
addToPage(taskArray);
};

function addArrayToStorage(taskArray){
window.localStorage.setItem('tasks',JSON.stringify(taskArray));
};


function addToPage(array){

    output.innerHTML = "" ;
   array.forEach((ele)=>{

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("data-id",ele.id);
    let taskTitle = document.createTextNode(ele.title);
    taskDiv.appendChild(taskTitle);
    let span = document.createElement("span");
    span.classList.add("del");
    spanText = document.createTextNode("Delet");
    span.appendChild(spanText);
    taskDiv.appendChild(span);
    output.appendChild(taskDiv);

   });
}



function getArrayFromLocalStorage(){
let data = window.localStorage.getItem("tasks");
if(data){
    let parsedData = JSON.parse(data);
    addToPage(parsedData);
}

};


getArrayFromLocalStorage();