import { v4 as uuid } from 'uuid';

const initialState = [
    {
        id: uuid(),
        task: 'Pay the cable bill',
        taskDesc: 'Pay the cable by the 15th',
        completed: false,
    },
];

let copyState = null;
let index = 0;

// Reducer is what updates/changes the state. Will never manually update the current state. Instead, it takes in the current state
// and returns a new state

const todoReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'CREATE_TODO':
            console.log('payload', payload);
            return [...state, { id: uuid(), task: payload.task, taskDesc: payload.taskDesc, completed: false }];
        case 'DELETE_TODO':
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState.splice(index, 1);
            return [...copyState];
        case 'COMPLETE_TODO':
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState[index].completed = true;
            return [...copyState];
        case 'UNCOMPLETE_TODO':
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState[index].completed = false;
            return [...copyState];
        default:
            return state;
    }
};

export default todoReducer;
