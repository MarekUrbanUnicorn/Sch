import AddableList from './AddableList.js';
import { useState, useEffect, useMemo } from 'react';
import Filter from './Filter.js';
import './App.css';
import Icon from "@mdi/react";
import { mdiCheck } from "@mdi/js";
import Button from "react-bootstrap/Button";

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
          ownerFK: 1,
          listName: "Dave's List",
          itemList: [
            {
              caption: "Item 1",
              done: false
            }
          ],
          memberList: []
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
      if(newItem.index !== undefined)
      {
        allItemList[newItem.index] = { ...newItem, index: undefined }
      }
      else
      {
        allItemList.push(newItem)
      }
    });
    //later add be call
    setDetailData({ ...detailData, data: { ...detailData.data, itemList: allItemList.filter(item => item.delete !== true) } })
  }
  
  const updataManagementData = (newManagementData) => {
    //later add be call
    setDetailData({ ...detailData, data: { ...detailData.data, memberList: newManagementData.memberList, listName: newManagementData.listName } })
  }

  return (
    <div>
      {detailData.state === "success" && <>
        <Filter
          ListName={detailData.data.listName}
          ShowDoneCallback={{ value: showDone, setter: changeShowDone }}
          OpenManagementCallback={{ value: showManagementModal, setter: setShowManagementModal }}
          isEditing={isEditing}
          ownerFK={detailData.data.ownerFK}
          updataManagementData={updataManagementData}
          memberList={detailData.data.memberList}
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
    </div>
  );
}

export default Detail;
