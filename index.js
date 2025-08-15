const inputuser = document.querySelector('.userinput');
const addtk = document.querySelector('.taskadder');


addtk.addEventListener('click', function(){
    const ttxt = inputuser.value;

    if (ttxt === ''){
        window.alert("Error. Please Enter a TASK");
        return;
    }

    const li = document.createElement("li");
    li.classList.add('eachtask')
    li.innerHTML = ` 
    <span class="txtask">${ttxt}</span>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>


    `;
    
});