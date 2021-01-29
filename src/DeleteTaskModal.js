import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";


function DeleteTaskModal(props) {
    const {toggle, modal} = props;
    const {key, task} = props;

    const ToDelTask = (id) => {
        if (task.price !== task.payment) {
            alert("This task is not possible to delete, because task payment is not complete");
            return;
        } else if (task.status !== 'Received by client') {
            alert("Update client's status");
            return;
        }
        props.deleteThisTask(id);
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} charCode='X'>Deleting Card</ModalHeader>
            <ModalBody>
                <div>
                    <div>
                        Do you really want to delete this card?
                    </div>

                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=> {
                    ToDelTask(task.id, task.price, task.payment, task.status); toggle()
                }}>Delete this card</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

const mapStateToProps = (state) => ({
    services: state.services,
    priority: state.priority,
})

const mapDispatchToProps = (dispatch) => ({
    deleteThisTask: (id) =>dispatch ({type: "DELETE_TASK", payload: {id: id}})
})


export default connect(mapStateToProps, mapDispatchToProps)(DeleteTaskModal);