import react from 'react';
import '../App.css';
import Button from "react-bootstrap/Button";
import { useState, useEffect, useMemo } from 'react';
import ManagementModal from "./ManagementModal.js"
import {useLang} from "../helpers/LangContext.js"

function Filter(props) {
  const { getLsi } = useLang()
  const { Archived, archiveListCallback, deleteListCallback, buttonsDisabled, ListName, userList, ShowDoneCallback, OpenManagementCallback, isEditing, isCurrentUserOwner, updataManagementData, memberList, nonOwnerUsers, leaveListCallback } = props;


  return (
    <div className="card">
      <h1>{ListName}  {Archived && "Archived"}</h1>
      <label>
        {getLsi("detailFilterShowDone")}: <input
          type="checkbox"
          checked={ShowDoneCallback.value}
          onChange={ShowDoneCallback.setter}
          disabled={isEditing}
        />
      </label>
      <Button className="modalButton" variant="primary" onClick={() => OpenManagementCallback.setter(true)}>
        {getLsi("detailFilterLaunchModal")}
      </Button>
      <ManagementModal
        Archived={Archived}
        buttonsDisabled={buttonsDisabled}
        OpenManagementCallback={OpenManagementCallback}
        isCurrentUserOwner={isCurrentUserOwner}
        listName={ListName}
        updataManagementData={updataManagementData}
        memberList={memberList} userList={userList}
        nonOwnerUsers={nonOwnerUsers}
        leaveListCallback={leaveListCallback}
        archiveListCallback={archiveListCallback}
        deleteListCallback={deleteListCallback} />
    </div>
  );
}

export default Filter;
