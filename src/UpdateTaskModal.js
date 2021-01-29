import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";


function UpdateTaskModal(props) {
    const {toggle, modal} = props;
    const task = props.task;

    const [newName, setNewName] = useState(task.name);
    const [upService, setUpService] = useState(task.serv);
    const [upPrice, setUpPrice] = useState(task.price);
    const [upPayment, setUpPayment] = useState(task.payment);
    const [upAddress, setUpAddress] = useState(task.address);



    const setPrice = (name) => {
        for (let i=0; i< props.services.length; i++) {
            if (props.services[i].name===name) {
                setUpPrice(props.services[i].price);
                return;
            }
        }
    }

    const upToDateTask = (id) => {
            props.updateTask(id, newName, upService, upPrice, upPayment, upAddress);
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} charCode='X'>Update Card</ModalHeader>
            <ModalBody>
                <table>
                    <tbody>
                    <tr><td>Client Name:</td>
                        <td><input className="input" type="text" value={newName} onChange={(e)=>setNewName(e.target.value)} placeholder={task.name}/></td>
                    </tr>
                    <tr><td>Service:</td>
                        <td><select className="input175" value={upService} onChange={(e)=>setUpService(e.target.value)}>
                            {props.services.map(el =><option>{el.name}</option>)}
                        </select>&nbsp;&nbsp;
                            <button className='buttonUp' style={{verticalAlign: 'top'}} onClick={()=>setPrice(upService)}>Confirm</button>
                            <span>Price:&nbsp; {upPrice} &nbsp;$</span>
                        </td>
                    </tr>
                    <tr><td>Paid:</td>
                        <td><input className="input155" type="number" value={upPayment} onChange={(e)=>setUpPayment(e.target.value)}/>&nbsp;$
                            &nbsp;&nbsp;&nbsp;
                            <span>Remained to pay:</span>&nbsp;{upPrice-upPayment}&nbsp;$
                        </td>
                    </tr>
                    <tr><td>Client address:</td>
                        <td><input className="input" type="text"  value={upAddress} onChange={(e)=>setUpAddress(e.target.value)}/></td>
                    </tr>
                    </tbody>
                </table>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{upToDateTask(task.id); toggle()}}>Update this card</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

const mapStateToProps = (state) => ({
    services: state.services
})

const mapDispatchToProps = (dispatch) =>({
    updateTask: (id, name, serv, price, payment, address) =>dispatch ({type: "UPDATE_TASK", payload: {id: id, name: name, serv: serv, price: price, payment: payment, address: address}})
})


export default connect(mapStateToProps, mapDispatchToProps)(UpdateTaskModal);