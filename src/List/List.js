
import ItemList from './ItemList.js';
import { useState, useEffect, useMemo } from 'react';
import Filter from './Filter.js';
import '../App.css';
import Icon from "@mdi/react";
import { mdiCheck } from "@mdi/js";
import Button from "react-bootstrap/Button";
import UserSelector from "../user.js";
import CreateModal from './CreateModal.js';
import { Outlet, useNavigate } from "react-router-dom";
//import { UserProvider, UserSelector, useUser } from "./user.js"// Variable overrides first



const USERS = [
  { id: 234, name: "Amelia" },
  { id: 123, name: "James" },
  { id: 345, name: "John" },
  { id: 456, name: "Chloe" }
];

function List() {
  let navigate = useNavigate();
  const [currentUser, setUser] = useState(USERS[0]);
  const userPos = USERS.map((user, index) => { return { ...user, index } }).filter(user => user.id === currentUser.id).index;
  const [filterData, setFilterData] = useState({ showArchived: false, showOnlyOwned: false});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [usedFilter, setUsedFilter] = useState({ filterData});
  const [listData, setListData] = useState({
    state: "pending",
  });

  useEffect(() => {
    //no BE exist at this time
    setListData({
      state: "success",
      itemList: [
        {name: "list1", ownerId: 234, doneParts: 4, totalParts: 6, id: 1, archived: false}, 
        {name: "list2", ownerId: 123, doneParts: 4, totalParts: 6, id: 1, archived: true}
      ]                        
    })
  }, []); // an empty condition field means that the code will run only once


  const changeFilterData = (newData) => {
    setFilterData({ showArchived: newData.showArchived ?? filterData.showArchived, showOnlyOwned: newData.showOnlyOwned ?? filterData.showOnlyOwned});
  };

  const changeShowCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const CallBackendListCommand = () => {
    setUsedFilter(filterData)
  }
  const createCallback = () => {
    //callbackend cant do that right now
    const newItem = { id: 5}
    navigate("/detail/" + newItem.id)
  }
  
  const itemList = useMemo(() => {
    if (listData.state != "success")
    {
      return [];
    }
    else
    {
      var list = listData.itemList;
      if(usedFilter.showOnlyOwned)
      {
        list = list.filter(item => item.ownerId === currentUser.id)
      }
      if(!usedFilter.showArchived)
      {
        list = list.filter(item => !item.archived)
      }
      return list.map((item) => { return { ...item, ownerName: USERS.filter(usr => item.ownerId === usr.id)[0].name}})
    }
  }, [listData, usedFilter, currentUser])


  return (
    <div className='Content'>
      <UserSelector userId={userPos} users={USERS} onChange={(e) => {
        setUser(USERS.filter(({ id }) => id === parseInt(e.target.value))[0])
      }
      } />
      {listData.state === "success" && <>
        <Filter
          changeFilter={changeFilterData}
          filterValue={filterData} 
          applyFilter={CallBackendListCommand}
          createList={changeShowCreateModal}
        />
        <ItemList
          listItems={itemList}
        />
        <CreateModal
          OpenCreateModalCallback={{ value: showCreateModal, setter: changeShowCreateModal }}
          createCallback={createCallback}
        />
      </>}
    </div>
  );
}

export default List;
