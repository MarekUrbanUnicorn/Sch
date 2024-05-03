import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiPlaylistRemove } from "@mdi/js";
import '../App.css';
import { useState, useEffect, useMemo } from 'react';
import { useLang } from "../helpers/LangContext.js"
import Box from '@mui/material/Box'
import { useMode } from "../helpers/ModeContext.js"

function AddableList(props) {
  const { getLsi } = useLang()
  const { getMsi } = useMode()
  const { buttonsDisabled, itemList, showAddButton, editable, extraButtonsCreator, updateItemListCallback, itemCreatorFunction, StartEditingCallback, UpdateCallback } = props;

  const [list, setList] = useState([]);

  useEffect(() => { setList([...itemList]) }, [itemList])
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
    newList[index] = { ...newList[index], delete: true };
    setList(newList)
  }

  const DeleteButton = index => (<Button
    disabled={buttonsDisabled}
    style={{ padding: "4px", paddingTop: "1px" }}
    variant="outline-danger"
    onClick={() => DeleteItem(index)}><Icon size={1} path={mdiPlaylistRemove} /></Button>);
  return (<>
    <Button disabled={buttonsDisabled}  variant={getMsi("button")} onClick={ChanageEditable}>{StartEditingCallback.value ? getLsi("detailCancelEdit") : getLsi("detailEditList")}</Button>
    {StartEditingCallback.value && (<Button disabled={buttonsDisabled}  variant={getMsi("button")}  onClick={finnishUpdate}>Save Chenges</Button>)}
    <Box component="section" sx={getMsi("detailBox")}>
      <Table className={getMsi("detailTable")}>
        <thead>
          <tr>
            <th>{getLsi("detailListName")}</th>
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
                    <td>{editable ? <Form.Control  //THIS IS GARBAGE THAT KEEPS LOOSING FOCUS AFTER SINGLE likely cause; update data upadtes state outside compomennt causing rerender
                      style={getMsi("formControl")}
                      type="textarea"
                      defaultValue={item.caption}
                      onChange={(event) => UpdateData(index, { ...item, caption: event.target.value })}
                    /> : item.caption}</td>
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
              <Button
                disabled={buttonsDisabled}
                style={{ padding: "4px", paddingTop: "1px" }}
                variant={getMsi("buttonOutline")} 
                onClick={() => AddItem()}>{getLsi("detailListAddItem")}</Button>
            </td>
            <td></td>
            <td></td>
          </tr>)}
        </tbody>
      </Table>
    </Box>
  </>
  );
}

export default AddableList;
