document.addEventListener('DOMContentLoaded', ()=>{
    const taskSpan = document.getElementsByClassName('taskSpan');
    const clearBtn = document.getElementById('clearBtn');
    const allBtn = document.getElementsByClassName('allBtn');
    const activeBtn = document.getElementsByClassName('activeBtn');
    const completeBtn = document.getElementsByClassName('completeBtn');
    const list = document.getElementsByTagName('ul')[0];

    for(let btn1 of allBtn){
        btn1.addEventListener('click', ()=>{    
            if(lis){
                list.innerHTML='';
                list.append(...tasksArray);
            } 
        }) 
    }
    
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
    

    let tasksArray = [];

// In JavaScript, variable declarations using var are hoisted to the top of their scope, but the same does not apply to let and const. The var keyword will hoist the declaration but not the initialization, while let and const will not hoist in a way that allows them to be accessed before their declaration.

    clearBtn.addEventListener('click', ()=>{
        list.innerHTML='';
        tasksArray.length = 0;
        tasksNumber();
    })

    const body = document.querySelector('body');
    const modeBtn = document.getElementById('modeBtn');
    const lis = document.getElementsByClassName('tasks');
    //as new lis will get added in dom dynamicaly then it will get updated means lis will also have newly added <li>s. but if here we use querySelectorAll then it wont be updated as it is not live.
    const taskAdder = document.getElementById('taskAdder');
    const bottomMenu = document.getElementById('botton-menu');
    const smallMenu = document.getElementById('smallMenu');
    const addBtn = document.getElementById('addBtn');
    const menuBtn = document.getElementsByClassName('menuBtnA');
    const clickChange = document.getElementsByClassName('clickChange');
    const inputAdder = document.querySelector('.inputAdder');
    const numberOfTasks = document.getElementById('numberOfTasks');

    if(tasksArray.length != 0){
        tasksNumber();
    } 
    //dont use ternery operator to call a function use it to assign value on a condition or perfporm a simple operation
    
    //beleow is wronf=]g because cross buttons dont exist in initilat load the are dynamically created so add event to them only after the are created or simiply add event when you create them. dynamically jo bhi print ho raha hai uske upar koi event tabhi lagega jab wo banega pehele se nahi
    // crossBtn.forEach((btn)=>{
    //     btn.addEventListener('click', (e)=>{
    //         e.target.parentElement.remove();
    //         //learn about parentElement
    //     })
    // });
    // crossBtn.addEventListener('click', (e)=>{
    //     e.target.parentElement.remove();
    //     //learn about parentElement
    // })\

    

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

        if (inputAdder.value === '') {
            alert('Please give a task')
        } else {
            const task = document.createElement('li');
            task.setAttribute('data-status', 'active');
            task.className = `tasks overflow-hidden relative group w-full items-center justify-between flex ${modeOfList} gap-2 py-1.5 px-4 border-b-[0.3px] border-gray-400`;
            
            task.innerHTML = `<div class="innertask w-fit flex gap-2 items-center">
                                <button class="w-[22px] absolute checkBtn h-[22px]  rounded-full border-[0.3px] border-gray-400 flex justify-center items-center "><img class="checkImg hidden" src="./images/icon-check.svg" alt=""></button>
                            <span class="w-full flex items-center ml-8 taskSpan select-none py-2 cursor-pointer border-black outline-none ${modeOfTExt} border-none">${inputAdder.value}</span>
                            </div>
                            <button class="crossBtn md:hidden absolute right-3 md:group-hover:block"><img src="./images/icon-cross.svg" alt=""></button>`;
            inputAdder.value='';
            list.append(task);
            tasksArray.push(task);

            task.querySelector('.crossBtn').addEventListener('click', ()=>{
                let indexoftask = tasksArray.indexOf(task); //wahi task hai jispe click hua hai
                
                if(indexoftask > -1){
                    tasksArray.splice(indexoftask, 1);
                }
                task.remove();
                tasksNumber();
                //learn about parentElement, remove()
                
            })

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
                
                tasksNumber();
            })
            tasksNumber();
            //for appending element(s) use tamplate litterals but create the container element by js properly w/o litterals
            
        }
    })

    function tasksNumber(){    
        if(lis){
            const howManyTasks = tasksArray.filter((li)=>{
                return li.getAttribute('data-status') === 'active';

            })
            const total = howManyTasks.length;
            numberOfTasks.innerText = total;
        }
    }

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

    modeBtn.addEventListener('click', modeChange)

    var mode = 'light';
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
                
                   clearBtn.classList.remove('hover:text-gray-800');
                   clearBtn.classList.add('hover:text-gray-300');

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
    
                clearBtn.classList.remove('hover:text-gray-300');
                clearBtn.classList.add('hover:text-gray-800');

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
    //https://todo-list-fronend-mentor.vercel.app/
})
