import './App.css';
import { useState, useEffect, useMemo, useRef } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddableListWithSet from './AddableListWithSet.js';

function ManagementModal(props) {
  const { OpenManagementCallback, isCurrentUserOwner, listName, updataManagementData, memberList, nonOwnerUsers, leaveListCallback, userList } = props;

  const [managementData, setManagementData] = useState({ listName, memberList });


  ///DEBUD use this to change if you are owner





  useEffect(() => {
    setManagementData({ listName, memberList })
  }, [listName, memberList])


  const handleClose = () => OpenManagementCallback.setter(false);

  const childRef = useRef();

  const updateItemList = (newItemList) => {
    updataManagementData({ listName: managementData.listName, memberList: newItemList });
    handleClose();
  }

  return (
    <>
      <Modal show={OpenManagementCallback.value} onHide={() => { setManagementData({ listName, memberList }); handleClose() }}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isCurrentUserOwner ?
          <Form.Control
            style={{ width: 300, height: 30 }}
            type="textarea"
            defaultValue={managementData.listName}
            onChange={(event) => setManagementData({ ...managementData, listName: event.target.value })}
          /> : managementData.listName}
          <br/>
          {isCurrentUserOwner ?
            <>
              <Button variant="primary" onClick={() => { }}>
                Delete List (Nen implementovno)
              </Button>
              <Button variant="primary" onClick={() => { }}>
                Archive List (Nen implementovno)
              </Button>
            </>
            :
            <Button variant="primary" onClick={leaveListCallback}>
              Leave List
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
          <Button variant="secondary" onClick={() => { setManagementData({ listName, memberList }); handleClose() }}>
            Close
          </Button>
          <Button variant="primary" onClick={() => childRef.current.finnishUpdate()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManagementModal;
