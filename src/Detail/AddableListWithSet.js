import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiPlaylistRemove } from "@mdi/js";
import '../App.css';
import { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import { useLang } from "../helpers/LangContext.js"
import { useMode } from "../helpers/ModeContext.js"
import { Box } from '@mui/material';

const AddableListWithSet = forwardRef((props, ref) => {
  const { getLsi } = useLang()
  const { getMsi } = useMode()
  const { itemList, showAddButton, editable, extraButtonsCreator, updateItemListCallback, StartEditingCallback, UpdateCallback, setOnFinishEdditing, nonOwnerUsers, userList } = props;

  const [list, setList] = useState([]);
  const userOptions = useMemo(() => {
    const filter = list.filter(val => val.delete !== true).map((val) => val.id);
    const selectableData = nonOwnerUsers
      .filter((user) => !filter.includes(user.id));
    const userOptions = selectableData
      .map((data => (<option value={data.id}>{data.name}</option>)));
    return userOptions
  }, [list, nonOwnerUsers]);

  useEffect(() => { setList([...itemList]) }, [itemList])

  useImperativeHandle(ref, () => ({
    finnishUpdate: async () => {
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
    newList.push(nonOwnerUsers.filter((item) => item.id === userId)[0]);
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
  return (
    <Box component="section" sx={getMsi("detailBox")}>
      <Table className={getMsi("detailTable")}>
        <thead>
          <tr>
            <th>{getLsi("detailModalListName")}</th>
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
                  <tr key={item.id}>
                    <td>{editable ? <Form.Select style={getMsi("formControl")} as="elementType" onChange={(event) => UpdateData(index, parseInt(event.target.value))}>
                      <option value={item.id}>{item.name}</option>
                      {userOptions}
                    </Form.Select> : item.name}</td>
                    <td>{extraButtonsCreator(item, editable, (params) =>
                      UpdateData(index, params))}</td>
                    <td>{editable && !item.isOwner && DeleteButton(index)}</td>
                  </tr>
                )
              };
            }).filter(({ item, comp }) => item.delete !== true)
              .map(({ item, comp }) => comp)}
          {editable && showAddButton && (<tr key="add">
            <td>
              <Form.Select style={getMsi("formControl")} as="elementType" value="-1" onChange={(event) => AddItem(parseInt(event.target.value))}>
                <option value="-1">{getLsi("detailModalListAdd")}</option>
                {userOptions}
              </Form.Select>
            </td>
            <td></td>
            <td></td>
          </tr>)}
        </tbody>
      </Table>
    </Box>
  );
})

export default AddableListWithSet;
