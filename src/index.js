document.addEventListener('DOMContentLoaded', ()=>{
    const taskSpan = document.getElementsByClassName('taskSpan');
    const clearBtn = document.getElementById('clearBtn');
    const allBtn = document.getElementsByClassName('allBtn');
    const activeBtn = document.getElementsByClassName('activeBtn');
    const completeBtn = document.getElementsByClassName('completeBtn');
    const list = document.getElementsByTagName('ul')[0];

    //Adding functionality for All button
    for(let btn1 of allBtn){
        btn1.addEventListener('click', ()=>{    
            if(lis){
                list.innerHTML='';
                list.append(...tasksArray);
            } 
        }) 
    }
    
    //Adding functionality for Active button
    for(let btn2 of activeBtn){
        btn2.addEventListener('click', ()=>{
            if(lis){
                const howManyActiveTasks = tasksArray.filter((li)=>{
                    return li.getAttribute('data-status') === 'active';
                })
                list.innerHTML='';
                list.append(...howManyActiveTasks); 
            }
        })
    }

    //Adding functionality for complete button
    for(let btn3 of completeBtn){
        btn3.addEventListener('click', ()=>{
            if(lis){
                const howManyCompletedTasks = tasksArray.filter((li)=>{
                    return li.getAttribute('data-status') === 'completed';
    
                })
                    list.innerHTML= '';
                    list.append(...howManyCompletedTasks);
            }
        })
    }
    
    //Array to store todos
    let tasksArray = [];

    //Adding functionality for Clear button
    clearBtn.addEventListener('click', ()=>{
        list.innerHTML='';
        tasksArray.length = 0;
        tasksNumber();
    })

    const body = document.querySelector('body');
    const modeBtn = document.getElementById('modeBtn');
    const lis = document.getElementsByClassName('tasks');
    const taskAdder = document.getElementById('taskAdder');
    const bottomMenu = document.getElementById('botton-menu');
    const smallMenu = document.getElementById('smallMenu');
    const addBtn = document.getElementById('addBtn');
    const menuBtn = document.getElementsByClassName('menuBtnA');
    const clickChange = document.getElementsByClassName('clickChange');
    const inputAdder = document.querySelector('.inputAdder');
    const numberOfTasks = document.getElementById('numberOfTasks');

    //adding feature to click add button on enter key press
    inputAdder.addEventListener('keydown', (e)=>{
        if(e.key == 'Enter'){
            addBtn.click();
        }
    })

    //call function to count the number of active todos
    if(tasksArray.length != 0){
        tasksNumber();
    } 

    //Adding todo to DOM and Array
    addBtn.addEventListener('click', () => {

        let modeOfList, modeOfTExt ;
        if(mode){
            if(mode == 'dark'){
                modeOfList='bg-[rgb(37,39,60)]';
                modeOfTExt='text-[rgb(202,205,232)]'
            }else{
                modeOfList='bg-white';
                modeOfTExt='text-black';
            }           
        }

        //if user haven't given any todo and clicked add button
        if (inputAdder.value === '') {
            alert('Please give a task')
        } else {

            //creating li element , adding attributes to it, adding content to it
            const task = document.createElement('li');
            task.setAttribute('data-status', 'active');
            task.setAttribute('draggable', 'true');
            task.className = `tasks overflow-hidden relative group w-full items-center justify-between flex ${modeOfList} gap-2 py-1.5 px-3 border-b-[0.3px] border-gray-400`;
            
            task.innerHTML = `<div class="innertask w-fit flex gap-2 items-center">
                                <button class="w-[22px] absolute checkBtn h-[22px]  rounded-full border-[0.3px] border-gray-400 flex justify-center items-center "><img class="checkImg hidden" src="./images/icon-check.svg" alt=""></button>
                            <span class="w-full flex text-wrap break-all items-center ml-8 mr-4 taskSpan select-none py-2 cursor-pointer border-black outline-none ${modeOfTExt} border-none">${inputAdder.value}</span>
                            </div>
                            <button class="crossBtn md:hidden absolute pl-2  right-2 md:group-hover:block"><img src="./images/icon-cross.svg" alt=""></button>`;
            inputAdder.value='';
            list.append(task);

            //adding task to the array
            tasksArray.push(task);

            //adding feacture to cross button to remove the todo on click
            task.querySelector('.crossBtn').addEventListener('click', ()=>{
                let indexoftask = tasksArray.indexOf(task);
                
                if(indexoftask > -1){
                    tasksArray.splice(indexoftask, 1);
                }
                task.remove();
                tasksNumber();              
            })

            //Adding styl to the todo when check button is clicked
            task.querySelector('.checkBtn').addEventListener('click', () => {
                task.querySelector('.checkImg').classList.toggle('hidden');
                task.querySelector('.checkBtn').classList.toggle('bg-custom-gradient');
                task.querySelector('.checkBtn').classList.toggle('border-[0.3px]');
                task.querySelector('.taskSpan').classList.toggle('line-through')
                task.querySelector('.taskSpan').classList.toggle('text-gray-500')
        
                if(task.getAttribute('data-status') === 'active'){
                    task.setAttribute('data-status', 'completed');
                }else{
                    task.setAttribute('data-status', 'active');
                }
                tasksNumber();
            })

            //Adding styl to the todo when task(written text inside todo) is clicked
            task.querySelector('.taskSpan').addEventListener('click', () => {
                task.querySelector('.checkImg').classList.toggle('hidden');
                task.querySelector('.checkBtn').classList.toggle('bg-custom-gradient');
                task.querySelector('.checkBtn').classList.toggle('border-[0.3px]');
                task.querySelector('.taskSpan').classList.toggle('line-through')
                task.querySelector('.taskSpan').classList.toggle('text-gray-500')
        
                if(task.getAttribute('data-status') === 'active'){
                    task.setAttribute('data-status', 'completed');
                }else{
                    task.setAttribute('data-status', 'active');
                }
                
                //After marking a task completed counting active tasks
                tasksNumber();
            })

            //After adding a new task counting active tasks
            tasksNumber();
            task.addEventListener('dragstart', ()=>{
                task.classList.add('dragged')
            })
            task.addEventListener('dragend', ()=>{
                task.classList.remove('dragged')})         
        }
    })

    //Adding drag and drop feature for desktop
    let draggedItem, nextSibling;
    list.addEventListener('dragover', (e)=>{
        e.preventDefault();
        draggedItem = list.querySelector('.dragged');

        const siblings = [...list.querySelectorAll('.tasks:not(.dragged)')];

        nextSibling = siblings.find((sib)=>{
            return e.clientY <= sib.offsetTop + sib.offsetHeight /2;
        })
    })
    list.addEventListener('drop', ()=>{
        list.insertBefore(draggedItem, nextSibling);

        //Updating array so that items in it get sync with items in ul(list) on DOM
        updateTaskArray();
    })

    //Adding drag and drop feature on touch events for mobile 
    list.addEventListener('touchstart', (event) => {
        const draggedItem = event.target.closest('.tasks');

        if (!draggedItem) return;

        draggedItem.classList.add('dragged');
    });

    list.addEventListener('touchmove', (event) => {
        event.preventDefault();
        const draggedItem = list.querySelector('.dragged');
        
        if (!draggedItem) return;

        const touch = event.touches[0];
        const targetItem = document.elementFromPoint(touch.clientX, touch.clientY).closest('.tasks');

        if (!targetItem) return;

        const targetRect = targetItem.getBoundingClientRect();
        const offsetY = touch.clientY - targetRect.top;
        const offsetHeight = targetRect.height / 2;

        if (offsetY > offsetHeight) {
            list.insertBefore(draggedItem, targetItem.nextElementSibling);
        } else {
            list.insertBefore(draggedItem, targetItem);
        }
    });

    list.addEventListener('touchend', (event) => {
        const draggedItem = list.querySelector('.dragged');
        
        if (!draggedItem) return;

        draggedItem.classList.remove('dragged');
        updateTaskArray();
    });

    //Synchronizing array with ul in DOM
    function updateTaskArray(){
        tasksArray = [...list.getElementsByClassName('tasks')]
    }


    function tasksNumber(){    
            const howManyTasks = tasksArray.filter((li)=>{
                return li.getAttribute('data-status') === 'active';
            })
            const total = howManyTasks.length;
            numberOfTasks.innerText = total;
    }
    
    //Adding blue color to the select/click button in All, Active, Complete
    let selectedBtn = null;
    for (let btns of clickChange) {
        btns.addEventListener('click', () => {

            if (selectedBtn) {
                selectedBtn.classList.remove('text-blue-500');
                selectedBtn.classList.add('text-gray-500');
            }

            btns.classList.remove('text-gray-500');
            btns.classList.add('text-blue-500');

            selectedBtn = btns;
        })
    }

    //Light and Dark mode on mode button click
    modeBtn.addEventListener('click', modeChange)

    var mode = 'light';
    let isLargeScreen;
    function modeChange(){
            if (modeBtn.getAttribute('src') === './images/icon-moon.svg') {
                modeBtn.setAttribute('src', './images/icon-sun.svg')
            } else {
                modeBtn.setAttribute('src', './images/icon-moon.svg')
            }
            if (body.getAttribute('data-bg-mode') === 'light') {
    
                for (let i = 0; i < menuBtn.length; i++) {
                    menuBtn[i].classList.remove('hover:text-gray-800');
                    menuBtn[i].classList.add('hover:text-gray-300');
                }
                
                isLargeScreen = window.matchMedia("(min-width:1024px)").matches;
                if(isLargeScreen){
                    clearBtn.classList.remove('hover:text-gray-800');
                    clearBtn.classList.add('hover:text-gray-300');
                }
                

                inputAdder.classList.add('text-gray-300');
                inputAdder.classList.remove('text-black');
    
                addBtn.classList.remove('bg-[rgb(181,97,237,0.8)]');
                addBtn.classList.add('bg-[rgb(109,59,174,0.8)]');
    
                taskAdder.classList.remove('bg-white');
                taskAdder.classList.add('bg-[rgb(37,39,60)]');
    
                bottomMenu.classList.remove('bg-white');
                bottomMenu.classList.add('bg-[rgb(37,39,60)]');
    
                smallMenu.classList.remove('bg-white');
                smallMenu.classList.add('bg-[rgb(37,39,60)]');
    
                for (let spans of taskSpan) {
                    spans.classList.remove('text-black');
                    spans.classList.add('text-[rgb(202,205,232)]');
                }
    
                for (let lies of lis) {
                    lies.classList.remove('bg-white');
                    lies.classList.add('bg-[rgb(37,39,60)]');
                }
    
                body.classList.remove('bg-[rgb(228,229,241)]');
                body.classList.remove("md:bg-[url('./images/bg-desktop-light.jpg')]");
                body.classList.remove("bg-[url('./images/bg-mobile-light.jpg')]");
    
                body.classList.add('bg-[rgb(22,23,34)]');
                body.classList.add("md:bg-[url('./images/bg-desktop-dark.jpg')]");
                body.classList.add("bg-[url('./images/bg-mobile-dark.jpg')]");
                body.setAttribute('data-bg-mode', 'dark');   
                mode='dark';
            } else {
                for (let i = 0; i < menuBtn.length; i++) {
                    menuBtn[i].classList.remove('hover:text-gray-300');
                    menuBtn[i].classList.add('hover:text-gray-800');
                }
    
                if(isLargeScreen){
                    clearBtn.classList.remove('hover:text-gray-300');
                    clearBtn.classList.add('hover:text-gray-800');
                }
                
                inputAdder.classList.add('text-balck')
                inputAdder.classList.remove('text-gray-300');
    
                addBtn.classList.remove('bg-[rgb(109,59,174,0.8)]');
                addBtn.classList.add('bg-[rgb(181,97,237,0.8)]');
    
                taskAdder.classList.remove('bg-[rgb(37,39,60)]');
                taskAdder.classList.add('bg-white');
    
                bottomMenu.classList.remove('bg-[rgb(37,39,60)]');
                bottomMenu.classList.add('bg-white');
    
                smallMenu.classList.remove('bg-[rgb(37,39,60)]');
                smallMenu.classList.add('bg-white');
    
                for (spans of taskSpan) {
                    spans.classList.remove('text-[rgb(202,205,232)]');
                    spans.classList.add('text-black');
                }
    
                for (let lies of lis) {
                    lies.classList.remove('bg-[rgb(37,39,60)]');
                    lies.classList.add('bg-white');
                }
    
                body.classList.remove('bg-[rgb(22,23,34)]');
                body.classList.remove("md:bg-[url('./images/bg-desktop-dark.jpg')]");
                body.classList.remove("bg-[url('./images/bg-mobile-dark.jpg')]");
    
                body.classList.add('bg-[rgb(228,229,241)]');
                body.classList.add("md:bg-[url('./images/bg-desktop-light.jpg')]");
                body.classList.add("bg-[url('./images/bg-mobile-light.jpg')]");
                body.setAttribute('data-bg-mode', 'light');     
                mode='light';    
        }
    }
})
