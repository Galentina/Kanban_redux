import {applyMiddleware, createStore} from "redux";
import kanban from './reducers';
import {composeWithDevTools} from "redux-devtools-extension";


const store = createStore(kanban, composeWithDevTools(applyMiddleware()));

export default store;