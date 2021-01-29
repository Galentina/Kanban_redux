import {v4 as uuid4v} from "uuid";

const inStateTasks = {
    tasks: [],
    services: [
        {name: '--', price: 0},
        {name: 'Antiviral prophylaxis', price: 150},
        {name: 'Installing Windows 7, 8, 10', price: 100},
        {name: 'Motherboard replacing', price: 50},
        {name: 'Power supply replacing', price: 80},
        {name: 'Video card replacing', price: 120},
        {name: 'Hard drive replacing', price: 130}
    ],
    statuses: ['Received from client', 'In processing', 'On verification', 'Ready for delivery', 'Delivered', 'Received by client'],
    priority: [1, 2, 3, 4, 5]
}

// const inStateServices = {
//     services: [
//         {name: '--', price: 0},
//         {name: 'Antiviral prophylaxis', price: 150},
//         {name: 'Installing Windows 7, 8, 10', price: 100},
//         {name: 'Motherboard replacing', price: 50},
//         {name: 'Power supply replacing', price: 80},
//         {name: 'Video card replacing', price: 120},
//         {name: 'Hard drive replacing', price: 130}
//     ]
// };

// const inStateStatuses = {
//     statuses: ['Received from client', 'In processing', 'On verification', 'Ready for delivery', 'Delivered', 'Received by client']
// }



// const inStatePriority = {
//     priority: [1, 2, 3, 4, 5]
// }

const kanban = (state = inStateTasks, action) => {

    switch (action.type) {
        case 'ADD_TASK': {
                const newTasks = [...state.tasks];
                newTasks.push({
                    id: uuid4v(),
                    number: action.payload.order,
                    name: action.payload.name,
                    serv: action.payload.serv,
                    price: Number(action.payload.price),
                    payment: Number(action.payload.paid),
                    address: action.payload.address,
                    status: action.payload.status,
                    priority: Number(action.payload.priority)
                });
                return {...state, tasks: newTasks}
            }

        case 'UPDATE_TASK': {
                const newTasks = [...state.tasks];
                newTasks.map(el => {
                    if (el.id === action.payload.id) {
                        el.name = action.payload.name;
                        el.serv = action.payload.serv;
                        el.price = Number(action.payload.price);
                        el.payment = Number(action.payload.payment);
                        el.address = action.payload.address;
                    }
                });
                return {...state, tasks: newTasks};
            }

        case 'DELETE_TASK': {
            const newTasks = state.tasks.filter(el => el.id !== action.payload.id);
            return {...state, tasks: newTasks};
        }

        case 'CHANGE_STATUS': {
                const newTasks = [...state.tasks];
                newTasks.map(el => {
                    if (el.id === action.payload.id) {
                        for (let i = 0; i < state.statuses.length; i++) {
                            if (el.status === state.statuses[i]) {
                                switch (action.payload.arrow) {
                                    case '+': {
                                        el.status = (i !== state.statuses.length - 1) ? state.statuses[i + 1] : el.status;
                                        return;
                                    }
                                    case '-': {
                                        el.status = (i !== 0) ? state.statuses[i - 1] : el.status;
                                        return;
                                    }
                                }
                            }
                        }
                    }
                });
                return {...state, tasks: newTasks};
        }
        case 'CHANGE_PRIORITY': {
                const newTasks = [...state.tasks];
                newTasks.map(el => {
                    if (el.id === action.payload.id) {
                        for (let i = 0; i < state.priority.length; i++) {
                            if (el.priority === state.priority[i]) {
                                switch (action.payload.arrow) {
                                    case '+': {
                                        el.priority = (i !== state.priority.length - 1) ? state.priority[i + 1] : el.priority;
                                        return el.priority;
                                    }
                                    case '-': {
                                        el.priority = (i !== 0) ? state.priority[i - 1] : el.priority;
                                        return el.priority;
                                    }
                                }
                            }
                        }
                    }
                });
                return {...state, tasks: newTasks};
             }
        default:
            return state;
    }
}

export default kanban;

