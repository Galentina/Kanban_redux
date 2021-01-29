import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Column from "./Column";
import './App.css';
import CreateOrderModel from './CreateOrderModel'
import {connect} from "react-redux";



function App(props) {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    return (
        <div className="App">
            <h1>Kanban board</h1>
            <button type="button" onClick={() => setModal(!modal)} className="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                Insert New Client
            </button>
            <CreateOrderModel
                modal={modal}
                toggle={toggle}
            />

            <hr/>
            <div className="row">
                {props.statuses.map((el, i) =>
                    <Column status={el} key={i} />)}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    statuses: state.statuses
})


export default connect(mapStateToProps)(App);
