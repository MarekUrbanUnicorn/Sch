import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiPlaylistRemove } from "@mdi/js";
import '../App.css';
import { useState, useEffect, useMemo } from 'react';

function AddableList(props) {
  const { buttonsDisabled, itemList, showAddButton, editable, extraButtonsCreator, updateItemListCallback, itemCreatorFunction, StartEditingCallback, UpdateCallback } = props;

  const [list, setList] = useState([]);

  useEffect(() => {setList([...itemList])}, [itemList])
  const finnishUpdate = () => {
    updateItemListCallback(list);
    UpdateCallback.setter()
  }
  const ChanageEditable = () => {
    if (editable) {
      setList([...itemList])
    }
    StartEditingCallback.setter()
  }
  const UpdateData = (index, data) => {
    const newList = [...list]
    newList[index] = data;
    setList(newList)
  };
  const AddItem = () => {
    const newList = [...list]
    newList.push(itemCreatorFunction());
    setList(newList)
  }

  const DeleteItem = (index) => {
    const newList = [...list]
    newList[index] = {...newList[index], delete: true};
    setList(newList)
  }

  const DeleteButton = index => (<Button
    disabled={buttonsDisabled}
    style={{ padding: "4px", paddingTop: "1px" }}
    variant="outline-danger"
    onClick={() => DeleteItem(index)}><Icon size={1} path={mdiPlaylistRemove} /></Button>);
  return (<>
    <Button disabled={buttonsDisabled} onClick={ChanageEditable}>{StartEditingCallback.value ? "Cancel Edits" : "Edit List"}</Button>
    {StartEditingCallback.value && (<Button disabled={buttonsDisabled} onClick={finnishUpdate}>Save Chenges</Button>)}
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
            return { item: item, comp:(
              <tr key={item.caption}>
                <td>{editable ? <Form.Control  //THIS IS GARBAGE THAT KEEPS LOOSING FOCUS AFTER SINGLE likely cause; update data upadtes state outside compomennt causing rerender
                  style={{ width: 100, height: 30 }}
                  type="textarea"
                  defaultValue={item.caption}
                  onChange={(event) => UpdateData(index, { ...item, caption: event.target.value })}
                /> : item.caption}</td>
                <td>{extraButtonsCreator(item, editable, (params) =>
                  UpdateData(index, params))}</td>
                <td>{editable && DeleteButton(index)}</td>
              </tr>
            )};
          }).filter(({item, comp}) => item.delete !== true)
          .map(({item, comp}) => comp)}
        {editable && showAddButton && (<tr key="add">
          <td>
            <Button
              disabled={buttonsDisabled}
              style={{ padding: "4px", paddingTop: "1px" }}
              variant="outline"
              onClick={() => AddItem()}>Add Item</Button>
          </td>
          <td></td>
          <td></td>
        </tr>)}
      </tbody>
    </Table>
  </>
  );
}

export default AddableList;
