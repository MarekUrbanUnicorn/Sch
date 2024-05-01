import '../App.css';
import { useState, useEffect, useMemo, useRef } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddableListWithSet from './AddableListWithSet.js';
import { Box } from '@mui/material';
import { useLang } from "../helpers/LangContext.js"

function ManagementModal(props) {
  const { getLsi } = useLang()
  const { Archived, buttonsDisabled, deleteListCallback, archiveListCallback, OpenManagementCallback, isCurrentUserOwner, listName, updataManagementData, memberList, nonOwnerUsers, leaveListCallback, userList } = props;

  const [managementData, setManagementData] = useState({ listName, memberList });


  useEffect(() => {
    setManagementData({ listName, memberList })
  }, [listName, memberList])


  const handleClose = () => OpenManagementCallback.setter(false);

  const childRef = useRef();

  const updateItemList = async (newItemList) => {
    await updataManagementData({ listName: managementData.listName, memberList: newItemList });
    handleClose(); //For some reasone the modal closes before this gets called maybe some state issue
  }

  return (
    <>
      <Modal show={OpenManagementCallback.value} onHide={() => { handleClose() }}>
        <Modal.Header closeButton>
          <Modal.Title>{getLsi("detailModalHeading")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isCurrentUserOwner ?
            <Form.Control
              style={{ width: 300, height: 30 }}
              type="textarea"
              defaultValue={managementData.listName}
              onChange={(event) => setManagementData({ ...managementData, listName: event.target.value })}
            /> : managementData.listName}  {Archived && "Archived"}
          <br />
          {isCurrentUserOwner ?
            <>
              <Button disabled={buttonsDisabled} variant="primary" onClick={deleteListCallback}>
                {getLsi("detailModalDelete")}
              </Button>
              <Button disabled={buttonsDisabled} variant="primary" onClick={archiveListCallback}>
                {Archived ? getLsi("detailModalArchive") : getLsi("detailModalUnArchive")}
              </Button>
            </>
            :
            <Button disabled={buttonsDisabled} variant="primary" onClick={leaveListCallback}>
              {getLsi("detailModalLeave")}
            </Button>
          }
          <AddableListWithSet
            ref={childRef}
            userList={userList}
            nonOwnerUsers={nonOwnerUsers}
            itemList={memberList}
            UpdateCallback={{ value: undefined, setter: handleClose }} // moved to list to prevent issue with text fields
            StartEditingCallback={{ value: true, setter: handleClose }}
            showAddButton={isCurrentUserOwner}
            editable={isCurrentUserOwner}
            extraButtonsCreator={() => { }}
            updateItemListCallback={updateItemList}
            itemCreatorFunction={() => { return { caption: "newItem", done: false } }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={buttonsDisabled} variant="secondary" onClick={() => { handleClose() }}>
            {getLsi("detailModalClose")}
          </Button>
          <Button disabled={buttonsDisabled} variant="primary" onClick={() => childRef.current.finnishUpdate()}>
            {getLsi("detailModalSave")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManagementModal;
