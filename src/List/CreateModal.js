import '../App.css';
import { useState, useEffect, useMemo, useRef } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function CreateModal(props) {
  const { OpenCreateModalCallback, createCallback } = props;

  const [listName, setListName] = useState("");

  const handleClose = () => OpenCreateModalCallback.setter(false);

  ///DEBUD use this to change if you are owner

  return (
    <>
      <Modal show={OpenCreateModalCallback.value} onHide={() => { handleClose() }}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            style={{ width: 300, height: 30 }}
            type="textarea"
            defaultValue={listName}
            onChange={(event) => setListName(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { handleClose() }}>
            Close
          </Button>
          <Button variant="primary" onClick={() => createCallback(listName)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
