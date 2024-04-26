
import ItemList from './ItemList.js';
import { useState, useEffect, useMemo } from 'react';
import Filter from './Filter.js';
import '../App.css';
import Icon from "@mdi/react";
import { mdiCheck } from "@mdi/js";
import Button from "react-bootstrap/Button";
import { USERS, UserSelector } from "../helpers/user.js";
import CreateModal from './CreateModal.js';
import { Outlet, useNavigate } from "react-router-dom";
import Call from '../helpers/BackendCaller.js';
//import { UserProvider, UserSelector, useUser } from "./user.js"// Variable overrides first




function List() {
  let navigate = useNavigate();
  const [currentUser, setUser] = useState(USERS[0]);
  const userPos = USERS.map((user, index) => { return { ...user, index } }).filter(user => user.id === currentUser.id).index;
  const [filterData, setFilterData] = useState({ showArchived: false, showOnlyOwned: false });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [usedFilter, setUsedFilter] = useState({ filterData });
  const [listData, setListData] = useState({
    state: "initial",
  });

  useEffect(() => {
    async function fetchData() {
      setListData({
        ...listData,
        state: "pending"
      })
      const resp = await Call("ShopList/List")
      if (resp.error) {
        setListData({
          ...resp,
          state: "error",
        })
      }
      else {
        setListData({
          ...resp,
          state: "success",
        })
      }
    }
    fetchData()
  }, []); // an empty condition field means that the code will run only once


  const changeFilterData = (newData) => {
    setFilterData({ showArchived: newData.showArchived ?? filterData.showArchived, showOnlyOwned: newData.showOnlyOwned ?? filterData.showOnlyOwned });
  };

  const changeShowCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const CallBackendListCommand = () => {
    async function fetchData() {
      setListData({
        ...listData,
        state: "pending"
      })
      const resp = await Call("ShopList/List")
      if (resp.error) {
        setListData({
          ...resp,
          state: "error",
        })
      }
      else {
        setUsedFilter(filterData)
        setListData({
          ...resp,
          state: "success",
        })
      }
    }
    fetchData()
  }
  const createCallback = async () => {
    const resp = await Call("ShopList/Create")
    if(resp.error)
    {
      return { ...resp, state: "error"}
    }
    else
    {
      navigate("/detail/" + resp.id)
      return { state: "exit" }
    }
  }

  const itemList = useMemo(() => {
    if (listData.state != "success") {
      return [];
    }
    else {
      var list = listData.itemList;
      if (usedFilter.showOnlyOwned) {
        list = list.filter(item => item.ownerId === currentUser.id)
      }
      if (!usedFilter.showArchived) {
        list = list.filter(item => !item.archived)
      }
      return list.map((item) => { return { ...item, ownerName: USERS.filter(usr => item.ownerId === usr.id)[0].name } })
    }
  }, [listData, usedFilter, currentUser])


  var content;
  switch (listData.state) {
    case "success":
      content = <>
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
      </>
      break;
    case "error":
      content = <></>
      break;
    case "pending":
      content = <>
        <Filter
          changeFilter={changeFilterData}
          filterValue={filterData}
          applyFilter={CallBackendListCommand}
          createList={changeShowCreateModal}
        />
        <CreateModal
          OpenCreateModalCallback={{ value: showCreateModal, setter: changeShowCreateModal }}
          createCallback={createCallback}
        />
      </>
      break;
    case "initial":
    default:
      break;
  }

  return (
    <div className='Content'>
      <UserSelector userId={userPos} users={USERS} onChange={(e) => {
        setUser(USERS.filter(({ id }) => id === parseInt(e.target.value))[0])
      }
      } />
      {content}
    </div>
  );
}

export default List;
