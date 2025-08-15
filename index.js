const inputuser = document.querySelector('.userinput');
const addtk = document.querySelector('.taskadder');
const tasklist = document.querySelector('.tasklist-display');

addtk.addEventListener('click', function(){
    const ttxt = inputuser.value;

    if (ttxt === ''){
        window.alert("Error. Please Enter a TASK");
        return;
    }

    const li = document.createElement("li");
    li.classList.add('eachtask')
    li.innerHTML = ` 
    <input type="checkbox" class="tomark"/>
    <span class="txtask">${ttxt}</span>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>


    `;
    tasklist.appendChild(li);
    inputuser.value="";

    saving();

});

tasklist.addEventListener("click", function(e){
    const ww = e.target.classList;
    if(ww.contains('delete')){
        e.target.parentElement.remove();
        saving()

    }else if(ww.contains('tomark')){
        e.target.parentElement.classList.toggle('completed');
        saving()
    }else if(ww.contains('edit')){
        const span = e.target.previousElementSibling;
        const originaltext = span.textContent;

        const input = document.createElement('input');
        input.type='text';
        input.value=originaltext;
         input.classList.add('edit-box');
        span.replaceWith(input);
        input.focus();
        
        // input.addEventListener('', function() {}
        //const span
        

        input.addEventListener('blur', function(){
            const anotherspan = document.createElement('span');
            anotherspan.classList.add('txtask');
            anotherspan.textContent = input.value   ;
            input.replaceWith(anotherspan);
            saving()

        });
        input.addEventListener('keypress', function(e){
            if (e.key === 'Enter'){
                input.blur();
            }
        });
        

    }
});


const filterbuttons = document.querySelectorAll(".filters button");
filterbuttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        const tasks = document.querySelectorAll('.eachtask');

        tasks.forEach(function(task) {
            if (btn.classList.contains('filterAll')) {
                task.style.display = '';
            } 
            else if (btn.classList.contains('filterCompleted')) {
                task.style.display = task.classList.contains('completed') ? '' : 'none';
            } 
            else if (btn.classList.contains('filterPending')) {
                task.style.display = !task.classList.contains('completed') ? '' : 'none';
            }
        });
    });
});


function saving(){
    const tasks = []
    for (const task of document.querySelectorAll('.eachtask')) {

        const obj  = {};
        obj.text = task.querySelector('.txtask').textContent;
        obj.completed = task.classList.contains('completed');
        tasks.push(obj);

    }
    localStorage.setItem('tasks', JSON.stringify(tasks));


}
function loadtasks(){
    let saved = localStorage.getItem('tasks')
    if(!saved){return;}
    let savedTasks= JSON.parse(saved);
    savedTasks.forEach(function(e){
        //text/completed
        const li = document.createElement("li");
        li.classList.add('eachtask');

        if(e.completed){
            li.classList.add('completed');
            
        }
        li.innerHTML=  `
            <input type="checkbox" class="tomark" ${e.completed ? 'checked' : ''}>
            <span class="txtask">${e.text}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>

        `;
        tasklist.appendChild(li);
    });
}
//function  {}
window.onload = loadtasks;

