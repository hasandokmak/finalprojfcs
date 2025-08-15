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

});

tasklist.addEventListener("click", function(e){
    const ww = e.target.classList;
    if(ww.contains('delete')){
        e.target.parentElement.remove();

    }else if(ww.contains('tomark')){
        e.target.parentElement.classList.toggle('completed');
    }else if(ww.contains('edit')){
        const span = e.target.previousElementSibling;
        const originaltext = span.textContent;

        const input = document.createElement('input');
        input.type='text';
        input.value=originaltext;
        span.replaceWith(input);
        input.focus();
        
        // input.addEventListener('', function() {}
        //const span
        

        input.addEventListener('blur', function(){
            const anotherspan = document.createElement('span');
            anotherspan.classList.add('txtask');
            anotherspan.textContent = input.value   ;
            input.replaceWith(anotherspan);
        });
        input.addEventListener('keypress', function(e){
            if (e.key === 'Enter'){
                input.blur();
            }
        });
        

    }
});