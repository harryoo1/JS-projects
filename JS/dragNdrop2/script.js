const todos = document.querySelectorAll('.todo');
const all_status = document.querySelectorAll('.status');
let draggableTodo = null;
todos.forEach(todo => {
    todo.addEventListener('dragstart', dragStart);
    todo.addEventListener('dragend', dragEnd);

    // todo.addEventListener('dragend', () => {
    //     draggableTodo = null;
    // });

    function dragStart(){
        draggableTodo = this;
        setTimeout(() => {
            this.style.display = 'none';
        });
    }
    function dragEnd(){
        draggableTodo = null;
        setTimeout(() => {
            this.style.display = 'block';
        });
    }

    all_status.forEach(status => {
        status.addEventListener('dragover', dragOver);
        status.addEventListener('dragenter', dragEnter);
        status.addEventListener('dragleave', dragLeave);
        status.addEventListener('drop', dragDrop);
    });
    function dragOver(e){
        e.preventDefault();
    }
    function dragEnter(){
        this.style.border = '1px dashed #00b3b3';
    }
    function dragLeave(){
        this.style.border = 'none';
    }
    function dragDrop(){
        this.appendChild(draggableTodo);
        this.style.border = 'none';
    }

    
})
//--------Modal---------//
const btns = document.querySelectorAll('[data-target-modal]');
const close_modal = document.querySelectorAll('.close-modal');
const overlay = document.getElementById('overlay');

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelector(btn.dataset.targetModal).classList.add('active');
        overlay.classList.add('active');
    });
});
close_modal.forEach((btn) =>{
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        modal.classList.remove('active');
        overlay.classList.remove('active');
    });
});
window.onclick = (event) => {
    if(event.target == overlay){
        const modalS = document.querySelectorAll('.modal');
        modalS.forEach((modal) => modal.classList.remove('active'));
        overlay.classList.remove('active');
    }
};
//--------CREATE TODO--------//
const todo_submit = document.getElementById('todo-submit');
todo_submit.addEventListener('click', createTodo);

function createTodo(){
    const todo_div = document.createElement('div');
    const input_val = document.getElementById('todo-input').value;
    const txt = document.createTextNode(input_val);
    todo_div.appendChild(txt);
    todo_div.classList.add('todo');
    todo_div.setAttribute('draggable', 'true');

    const span = document.createElement('span');
    const span_txt = document.createTextNode('\u00D7');
    span.appendChild(span_txt);
    span.classList.add('close');

    todo_div.appendChild(span);

    no_status.appendChild(todo_div);

    todo_div.addEventListener('dragstart', dragStart);
    todo_div.addEventListener('dragend', dragEnd);

    document.getElementById('todo-input').value = '';

    span.addEventListener('click', () => {
        span.parentElement.style.display = 'none';
    });

    document.querySelector('#todo-form').classList.remove('active');
    overlay.classList.remove('active');
}
function dragStart(){
    draggableTodo = this;
}
function dragEnd(){
    draggableTodo = null;
}

const close_btns = document.querySelectorAll('.close');
close_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.style.display = 'none';
    });
});