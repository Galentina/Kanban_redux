import React from 'react';
import Task from "./task";
import {connect} from "react-redux";

function Column(props) {
    const {status, key} = props;

    return (
        <div className="col-sm">
            <h5>{status}</h5>
            {props.tasks.filter(el => el.status === status).sort((a, b) => a.priority - b.priority).map((el, index) =>
                <Task
                    task={el}
                    key={index}
                    id={el.id}
                    priority={el.priority}

                />)}
        </div>

    );
}

const mapStateToProps = (state) => ({
    tasks: state.tasks,
    services: state.services,
    priority: state.priority,
    statuses: state.statuses
})


export default connect(mapStateToProps)(Column);