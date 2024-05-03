import react from 'react';
import '../App.css';
import Button from "react-bootstrap/Button";
import { useState, useEffect, useMemo } from 'react';
import ManagementModal from "./ManagementModal.js"
import {useLang} from "../helpers/LangContext.js"
import { useMode } from "../helpers/ModeContext.js"
import Box from '@mui/material/Box'

function Filter(props) {
  const { getLsi } = useLang()
  const { getMsi } = useMode()
  const { Archived, archiveListCallback, deleteListCallback, buttonsDisabled, ListName, userList, ShowDoneCallback, OpenManagementCallback, isEditing, isCurrentUserOwner, updataManagementData, memberList, nonOwnerUsers, leaveListCallback } = props;


  return (
    <Box component="section" sx={getMsi("listBox")}>
      <h1>{ListName}  {Archived && "Archived"}</h1>
      <label>
        {getLsi("detailFilterShowDone")}: <input
          type="checkbox"
          checked={ShowDoneCallback.value}
          onChange={ShowDoneCallback.setter}
          disabled={isEditing}
        />
      </label>
      <Button className="modelButton"  variant={getMsi("button")} onClick={() => OpenManagementCallback.setter(true)}>
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
    </Box>
  );
}

export default Filter;
