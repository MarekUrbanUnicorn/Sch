
import AddableList from './AddableList.js';
import { useState, useEffect, useMemo } from 'react';
import Filter from './Filter.js';
import '../App.css';
import Icon from "@mdi/react";
import { mdiCheck } from "@mdi/js";
import Button from "react-bootstrap/Button";
import { UserSelector, USERS } from "../helpers/user.js";
import Call from '../helpers/BackendCaller.js';
import { Outlet, useNavigate } from "react-router-dom";
//import { UserProvider, UserSelector, useUser } from "./user.js"// Variable overrides first



function Detail() {
  let navigate = useNavigate();
  const [showDone, setShowDone] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [showManagementModal, setShowManagementModal] = useState(false);
  const [detailData, setDetailData] = useState({
    state: "initial",
  });

  useEffect(() => {
    async function fetchData() {
      setDetailData({
        ...detailData,
        state: "pending"
      })
      const resp = await Call("ShopList/Detail")
      if (resp.error) {
        setDetailData({
          ...resp,
          state: "error",
        })
      }
      else {
        setDetailData({
          ...resp,
          state: "success",
        })
      }
    }
    fetchData()
  }, []); // an empty condition field means that the code will run only once

  const buttonsDisabled = useMemo(() => {
    switch (detailData.state) {

      case "pending":
        return true

      default:
      case "success":
      case "error":
      case "initial":
        return false
    }
  })

  const changeShowDone = () => {
    setShowDone(!showDone);
  };
  const changeEditing = () => {
    setEditing(!isEditing);
  };
  const updateData = () => {
    setEditing(!isEditing);
  };

  const { allItemList, itemList } = useMemo(() => {
    const value = detailData?.data?.itemList?.map((item, index) => { return { ...item, index } }) ?? [];
    if (showDone) {
      return { allItemList: value, itemList: value }
    }
    return { allItemList: value, itemList: value.filter(item => !item.done) }
  }, [detailData, showDone])

  const updateItemList = async (newItemList) => {

    newItemList.forEach(newItem => {
      if (newItem.index !== undefined) {
        allItemList[newItem.index] = { ...newItem, index: undefined }
      }
      else {
        allItemList.push(newItem)
      }
    });


    setDetailData({
      ...detailData,
      state: "pending"
    })
    const resp = await Call("ShopList/Update")
    if (resp.error) {
      setDetailData({
        ...resp,
        state: "error",
      })
    }
    else {
      setDetailData({
        ...resp,
        state: "success",
      })
    }
    // setDetailData({ ...detailData, data: { ...detailData.data, itemList: allItemList.filter(item => item.delete !== true) } })
  }

  const updataManagementData = async (newManagementData) => {
    setDetailData({
      ...detailData,
      state: "pending"
    })
    const resp = await Call("Management/Update")
    if (resp.error) {
      setDetailData({
        ...resp,
        state: "error",
      })
    }
    else {
      setDetailData({
        ...resp,
        state: "success",
      })
    }
    // setDetailData({ ...detailData, data: { ...detailData.data, memberList: newManagementData.memberList.map(member => member.id), listName: newManagementData.listName } })
  }

  const [currentUser, setUser] = useState(USERS[0]);

  const leaveListCallback = async () => {
    setDetailData({
      ...detailData,
      state: "pending"
    })
    const resp = await Call("Management/Leave")
    if (resp.error) {
      setDetailData({
        ...resp,
        state: "error",
      })
    }
    else {
      setDetailData({
        ...resp,
        state: "success",
      })
      navigate("/")
    }
    // setDetailData({ ...detailData, data: { ...detailData.data, memberList: detailData.data.memberList.filter((id) => id != currentUser.id), } })
  }
  const deleteListCallback = async () => {
    setDetailData({
      ...detailData,
      state: "pending"
    })
    const resp = await Call("Management/Delete")
    if (resp.error) {
      setDetailData({
        ...resp,
        state: "error",
      })
    }
    else {
      setDetailData({
        ...resp,
        state: "success",
      })
      navigate("/")
    }
    // setDetailData({ ...detailData, data: { ...detailData.data, memberList: detailData.data.memberList.filter((id) => id != currentUser.id), } })
  }
  const archiveListCallback = async () => {
    setDetailData({
      ...detailData,
      state: "pending"
    })
    const resp = await Call("Management/Archive")
    if (resp.error) {
      setDetailData({
        ...resp,
        state: "error",
      })
    }
    else {
      setDetailData({
        ...resp,
        state: "success",
      })
    }
    // setDetailData({ ...detailData, data: { ...detailData.data, memberList: detailData.data.memberList.filter((id) => id != currentUser.id), } })
  }
  const userPos = USERS.map((user, index) => { return { ...user, index } }).filter(user => user.id === currentUser.id).index;
  const { isCurrentUserOwner, nonOwnerUsers, memberList, isCurentUserMember } = useMemo(() => {
    if (detailData?.data?.ownerId) {
      return {
        isCurentUserMember: detailData.data.memberList.includes(currentUser.id),
        isCurrentUserOwner: detailData.data.ownerId === currentUser.id,
        nonOwnerUsers: USERS?.filter(user => user.userId !== detailData.data.ownerId) ?? [],
        memberList: detailData.data.memberList.map(member => { return { ...USERS.filter(({ id }) => id === member)[0], isOwner: detailData.data.ownerId === member } })
      }
    }
    else {
      return { isCurentUserMember: false, isCurrentUserOwner: false, nonOwnerUsers: [], memberList: [] }
    }
  }, [currentUser.id, detailData, detailData.data])
  return (
    //<UserProvider>
    //  <UserSelector/>
    <div className='Content'>
      <UserSelector userId={userPos} users={USERS} onChange={(e) => {
        setUser(USERS.filter(({ id }) => id === parseInt(e.target.value))[0])
      }
      } />
      {detailData.state !== "initial" && isCurentUserMember && <>
        <Filter
          buttonsDisabled={buttonsDisabled}
          className="mui-container"
          ListName={detailData.data.listName}
          Archived={detailData.data.archived}
          ShowDoneCallback={{ value: showDone, setter: changeShowDone }}
          OpenManagementCallback={{ value: showManagementModal, setter: setShowManagementModal }}
          isEditing={isEditing}
          isCurrentUserOwner={isCurrentUserOwner}
          updataManagementData={updataManagementData}
          memberList={memberList}
          leaveListCallback={leaveListCallback}
          archiveListCallback={archiveListCallback} 
          deleteListCallback={deleteListCallback}
          userList={USERS}
          nonOwnerUsers={nonOwnerUsers}
        />
        <AddableList
          buttonsDisabled={buttonsDisabled}
          itemList={itemList}
          UpdateCallback={{ value: undefined, setter: updateData }} // moved to list to prevent issue with text fields
          StartEditingCallback={{ value: isEditing, setter: changeEditing }}
          showAddButton={true}
          editable={isEditing}
          extraButtonsCreator={
            (item, editable, updateCallback) => {
              const value = item.done ? "Compleate" : "Not Compleate";
              return !editable ? value : <Button disabled={buttonsDisabled} onClick={() => {
                updateCallback({ ...item, done: !item.done })
              }
              }>{value}</Button>
            }
          }
          updateItemListCallback={updateItemList}
          itemCreatorFunction={() => { return { caption: "newItem", done: false } }}
        />
      </>}

      {detailData.state === "success" && !isCurentUserMember && <div className="noAcess">
        <h1 className="noAcessItem">No Acess</h1>
        <p className="noAcessItem">You are not authorised to view this shopping list.</p>
      </div>}
    </div>
    //</UserProvider>
  );
}

export default Detail;
