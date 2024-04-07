import react from 'react';
import './App.css';
import Button from "react-bootstrap/Button";
import { useState, useEffect, useMemo } from 'react';
import ManagementModal from "./ManagementModal.js"

function Filter(props) {
  const { ListName, userList,  ShowDoneCallback, OpenManagementCallback, isEditing, isCurrentUserOwner, updataManagementData, memberList, nonOwnerUsers, leaveListCallback } = props;
  

  return (
    <div className="card">
      <h1>{ListName}</h1>
      <label>
        Show completed items: <input
          type="checkbox"
          checked={ShowDoneCallback.value}
          onChange={ShowDoneCallback.setter}
          disabled={isEditing}
        />
      </label>  
      <Button className="modalButton" variant="primary" onClick={() => OpenManagementCallback.setter(true)}>
        Launch Management Modal
      </Button>
      <ManagementModal OpenManagementCallback={OpenManagementCallback} isCurrentUserOwner={isCurrentUserOwner} listName={ListName} updataManagementData={updataManagementData} memberList={memberList} userList={userList} nonOwnerUsers={nonOwnerUsers} leaveListCallback={leaveListCallback}/>
    </div>
  );
}

export default Filter;
