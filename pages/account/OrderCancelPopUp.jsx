import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const OrderCancelPopUp = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modelForCancel d-flex align-items-center justify-content-center"
      backdrop="static"
    >
      <Modal.Body className="p-4">
        <Form>
          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="message"
              style={{ resize: "none" }}
              value={props?.message}
              onChange={props?.onChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onHide();
            props.handleConfirm(props?.orderNumber, "cancel");
          }}
          style={{ minWidth: "60px" }}
        >
          Submit
        </Button>
        <Button
          style={{
            background: "#ee3124",
            borderColor: "#ee3124",
            minWidth: "60px",
          }}
          onClick={() => {
            props.onHide();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderCancelPopUp;
