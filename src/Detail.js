import AddableList from './AddableList.js';
import { useState, useEffect, useMemo } from 'react';
import Filter from './Filter.js';
import './App.css';
import Icon from "@mdi/react";
import { mdiCheck } from "@mdi/js";
import Button from "react-bootstrap/Button";
import UserSelector from "./user.js";
//import { UserProvider, UserSelector, useUser } from "./user.js"

const USERS = [
  { id: 234, name: "Amelia" },
  { id: 123, name: "James" },
  { id: 345, name: "John" },
  { id: 456, name: "Chloe" }
];

function Detail() {
  const [showDone, setShowDone] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [showManagementModal, setShowManagementModal] = useState(false);
  const [detailData, setDetailData] = useState({
    state: "pending",
  });

  useEffect(() => {
    if (false) { //code for creation
      setDetailData({
        state: "success",
        data: {
          name: "",
          description: "",
          portionAmount: 1,
          preparationTime: 1,
          favorite: false,
          imageUrl: "",
          ingredients: []
        }
      });
      setEditing(true);
    }
    else {
      //no BE exist at this time
      setDetailData({
        state: "success",
        data: {
          ownerId: 234,
          listName: "Dave's List",
          itemList: [
            {
              caption: "Item 1",
              done: false
            }
          ],
          memberList: [234]
        }
      })
    };
  }, []); // an empty condition field means that the code will run only once


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

  const updateItemList = (newItemList) => {

    newItemList.forEach(newItem => {
      if (newItem.index !== undefined) {
        allItemList[newItem.index] = { ...newItem, index: undefined }
      }
      else {
        allItemList.push(newItem)
      }
    });
    //later add be call
    setDetailData({ ...detailData, data: { ...detailData.data, itemList: allItemList.filter(item => item.delete !== true) } })
  }

  const updataManagementData = (newManagementData) => {
    //later add be call
    setDetailData({ ...detailData, data: { ...detailData.data, memberList: newManagementData.memberList.map(member => member.id), listName: newManagementData.listName } })
  }

  const [currentUser, setUser] = useState(USERS[0]);

  const leaveListCallback = () => {
    setDetailData({ ...detailData, data: { ...detailData.data, memberList: detailData.data.memberList.filter((id) => id != currentUser.id), } })
  }
  const userPos = USERS.map((user, index) => { return { ...user, index } }).filter(user => user.id === currentUser.id).index;
  const { isCurrentUserOwner, nonOwnerUsers, memberList, isCurentUserMember } = useMemo(() => {
    if (detailData?.data?.ownerId) {
      return {
        isCurentUserMember: detailData.data.memberList.includes(currentUser.id),
        isCurrentUserOwner: detailData.data.ownerId === currentUser.id,
        nonOwnerUsers: USERS?.filter(user => user.userId !== detailData.data.ownerId) ?? [],
        memberList: detailData.data.memberList.map(member => { return { ...USERS.filter(({id}) => id === member)[0], isOwner: detailData.data.ownerId === member } })
      }
    }
    else {
      return { isCurentUserMember: false, isCurrentUserOwner: false, nonOwnerUsers: [], memberList: [] }
    }
  }, [currentUser.id, detailData, detailData.data])
  return (
    //<UserProvider>
    //  <UserSelector/>
    <>
      <UserSelector userId={userPos} users={USERS} onChange={(e) =>
        { 
          setUser(USERS.filter(({ id }) => id === parseInt(e.target.value))[0])}
       } />
      {detailData.state === "success" && isCurentUserMember && <>
        <Filter
          ListName={detailData.data.listName}
          ShowDoneCallback={{ value: showDone, setter: changeShowDone }}
          OpenManagementCallback={{ value: showManagementModal, setter: setShowManagementModal }}
          isEditing={isEditing}
          isCurrentUserOwner={isCurrentUserOwner}
          updataManagementData={updataManagementData}
          memberList={memberList}
          leaveListCallback={leaveListCallback}
          userList={USERS}
          nonOwnerUsers={nonOwnerUsers}
        />
        <AddableList
          itemList={itemList}
          UpdateCallback={{ value: undefined, setter: updateData }} // moved to list to prevent issue with text fields
          StartEditingCallback={{ value: isEditing, setter: changeEditing }}
          showAddButton={true}
          editable={isEditing}
          extraButtonsCreator={
            (item, editable, updateCallback) => {
              const value = item.done ? "Compleate" : "Not Compleate";
              return !editable ? value : <Button onClick={() => {
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
    </>
    //</UserProvider>
  );
}

export default Detail;
