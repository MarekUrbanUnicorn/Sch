import react from 'react';
import './App.css';
import Button from "react-bootstrap/Button";
import { useState, useEffect, useMemo } from 'react';
import ManagementModal from "./ManagementModal.js"

function Filter(props) {
  const { ListName,  ShowDoneCallback, OpenManagementCallback, isEditing, ownerFK, updataManagementData, memberList } = props;
  

  return (
    <div className="Filter">
      <h1>{ListName}</h1>
      <label>
        Show completed items: <input
          type="checkbox"
          checked={ShowDoneCallback.value}
          onChange={ShowDoneCallback.setter}
          disabled={isEditing}
        />
      </label>  
      <Button variant="primary" onClick={() => OpenManagementCallback.setter(true)}>
        Launch Management Modal
      </Button>
      <ManagementModal OpenManagementCallback={OpenManagementCallback} ownerFK={ownerFK} listName={ListName} updataManagementData={updataManagementData} memberList={memberList}/>
    </div>
  );
}

export default Filter;
