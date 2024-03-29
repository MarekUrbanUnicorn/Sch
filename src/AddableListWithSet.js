import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiPlaylistRemove } from "@mdi/js";
import './App.css';
import { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';

const AddableListWithSet = forwardRef((props, ref) => {
  const { itemList, userList, showAddButton, editable, extraButtonsCreator, updateItemListCallback, StartEditingCallback, UpdateCallback, setOnFinishEdditing } = props;

  const [list, setList] = useState([]);
  const userOptions = useMemo(() => {
    const filter = list.filter(val => val.delete !== true).map((val) => val.userId);
    const selectableData = userList
      .filter((user) => !filter.includes(user.userId));
    const userOptions = selectableData
      .map((data => (<option value={data.userId}>{data.userName}</option>)));
    return userOptions
  }, [list, userList]);

  useEffect(() => { setList([...itemList]) }, [itemList])
  
  useImperativeHandle(ref, () => ({
    finnishUpdate: () => {
      updateItemListCallback(list);
      UpdateCallback.setter()
    },
  }));

  const UpdateData = (index, data) => {
    const newList = [...list]
    newList[index] = data;
    setList(newList)
  };
  const AddItem = (userId) => {
    const newList = [...list]
    newList.push(userList.filter((item)=> item.userId === userId)[0]);
    setList(newList)
  }

  const DeleteItem = (index) => {
    const newList = [...list]
    newList[index] = { ...newList[index], delete: true };
    setList(newList)
  }

  const DeleteButton = index => (<Button
    style={{ padding: "4px", paddingTop: "1px" }}
    variant="outline-danger"
    onClick={() => DeleteItem(index)}><Icon size={1} path={mdiPlaylistRemove} /></Button>);
  return (<>
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          list.map((item, index) => {
            //format prep time
            return {
              item: item, comp: (
                <tr key={item.caption}>
                  <td>{editable ? <Form.Select as="elementType" onChange={(event) => UpdateData(index, parseInt(event.target.value))}>
                    <option value={item.userId}>{item.userName}</option>
                    {userOptions}
                  </Form.Select> : item.userName}</td>
                  <td>{extraButtonsCreator(item, editable, (params) =>
                    UpdateData(index, params))}</td>
                  <td>{editable && DeleteButton(index)}</td>
                </tr>
              )
            };
          }).filter(({ item, comp }) => item.delete !== true)
            .map(({ item, comp }) => comp)}
        {editable && showAddButton && (<tr key="add">
          <td>
            <Form.Select as="elementType" value="-1" onChange={(event) => AddItem(parseInt(event.target.value))}>
              <option value="-1">Přidat uživatele</option>
              {userOptions}
            </Form.Select>
          </td>
          <td></td>
          <td></td>
        </tr>)}
      </tbody>
    </Table>
  </>
  );
})

export default AddableListWithSet;
