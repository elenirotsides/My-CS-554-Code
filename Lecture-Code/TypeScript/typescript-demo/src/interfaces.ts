interface Todo {
    title: string;
    text: string;
}

function showTodo(todo: Todo) {
    return `Title: ${todo.title} Todo: ${todo.text}`;
}

let myTodo = { title: 'Pay cable bill', text: 'Make sure you pay the cable bill by the 5th' };
console.log(showTodo(myTodo));
