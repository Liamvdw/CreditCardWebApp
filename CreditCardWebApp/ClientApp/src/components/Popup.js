import React, { useState, useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Alert } from 'react-bootstrap';


const Popup = (props) => {
    const message = props.data ? props.data : 'danger';    
    const isPopup = props.isPopup;
    console.log(message, isPopup);
    const [show, setShow] = useState(false);    
    const handleClose = () => setShow(false);
    

    //return (
    //    <div>
    //        <Modal show={show} onHide={handleClose}>
    //            <Modal.Header closeButton>
    //                <Modal.Title>Modal heading</Modal.Title>
    //            </Modal.Header>
    //            <Modal.Body>{message}</Modal.Body>
    //            <Modal.Footer>
    //                <Button variant="secondary" onClick={handleClose}>
    //                    Close
    //                </Button>
    //            </Modal.Footer>
    //        </Modal>
    //    </div>

    //);
    return (
        //<Alert variant={message} show={isPopup}>
        //    <Alert.Heading>Confirm</Alert.Heading>
        //    <p>
        //        Aww yeah, successfully saved!
        //    </p>
        //    <hr />
        //</Alert>
        
        <Alert show={isPopup} variant={message }>
            <Alert.Heading>How's it going?!</Alert.Heading>
            <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                fermentum.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-success">
                    Close me y'all!
                </Button>
            </div>
        </Alert>
        
    );
}
export default Popup;