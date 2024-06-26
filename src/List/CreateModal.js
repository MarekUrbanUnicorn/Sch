import '../App.css';
import { useState, useEffect, useMemo, useRef } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Box from '@mui/material/Box';
import { useLang } from "../helpers/LangContext.js"
import { useMode } from "../helpers/ModeContext.js"

function CreateModal(props) {
  const { getMsi } = useMode()
  const { OpenCreateModalCallback, createCallback } = props;
  const { getLsi } = useLang()

  const [listName, setListName] = useState("");
  const [modalData, setModalData] = useState({ state: "initial" });

  const handleClose = () => OpenCreateModalCallback.setter(false);

  var disableButtons;
  switch (modalData.state) {
    case "pending":
    case "exit":
      disableButtons = true
      break;
    case "initial":
    case "error":
    default:
      disableButtons = false;
      break;
  }

  return (
    <Modal show={OpenCreateModalCallback.value} onHide={() => { handleClose() }}>
      <Box component="section" sx={getMsi("modalBox")}>
        <Modal.Header closeButton>
          <Modal.Title>{getLsi("listModalHeading")}</Modal.Title>
        </Modal.Header>
        {modalData.error && <Box component="section" sx={{ p: 2, bgcolor: '#fc8279' }}>
          {modalData.error}
        </Box>
        }
        <Modal.Body>
          <Form.Control
            style={getMsi("formControl")}
            type="textarea"
            defaultValue={listName}
            onChange={(event) => setListName(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant={getMsi("buttonSecondary")} disabled={disableButtons} onClick={() => { handleClose() }}>
            {getLsi("listModalClose")}
          </Button>
          <Button variant={getMsi("button")} disabled={disableButtons} onClick={() => {
            async function fetchData() {
              setModalData({ state: "pending" })
              const newState = await createCallback(listName)
              setModalData(newState)
            }
            fetchData()
          }}>
            {getLsi("listModalSave")}
          </Button>
        </Modal.Footer>
      </Box>
    </Modal>
  );
}

export default CreateModal;
