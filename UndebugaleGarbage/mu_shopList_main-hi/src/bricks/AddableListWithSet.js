// // import Icon from "@mdi/react";
// // import { mdiPlaylistRemove } from "@mdi/js";
// // import './App.css';
// import { Utils, createVisualComponent, PropTypes, useScreenSize, useState, useEffect, useMemo } from "uu5g05";
// import "uu5g04-forms";
// import "uu5g04-bricks";
// import UU5 from "uu5g04";

// const AddableListWithSet = createVisualComponent({
//   render(props) {
//     const { itemList, userList, showAddButton, editable, extraButtonsCreator, updateItemListCallback, StartEditingCallback, UpdateCallback, setOnFinishEdditing } = props;

//     const [list, setList] = useState([]);
//     const userOptions = useMemo(() => {
//       const filter = list.filter(val => val.delete !== true).map((val) => val.userId);
//       const selectableData = userList
//         .filter((user) => !filter.includes(user.userId));
//       const userOptions = selectableData
//         .map((data => (<option key={data.userId} value={data.userId}>{data.userName}</option>)));
//       return userOptions
//     }, [list, userList]);

//     useEffect(() => { setList([...itemList]) }, [itemList])

//     // useImperativeHandle(ref, () => ({
//     //   finnishUpdate: () => {
//     //     updateItemListCallback(list);
//     //     UpdateCallback.setter()
//     //   },
//     // }));

//     const UpdateData = (index, data) => {
//       const newList = [...list]
//       newList[index] = data;
//       setList(newList)
//     };
//     const AddItem = (userId) => {
//       const newList = [...list]
//       newList.push(userList.filter((item) => item.userId === userId)[0]);
//       setList(newList)
//     }

//     const DeleteItem = (index) => {
//       const newList = [...list]
//       newList[index] = { ...newList[index], delete: true };
//       setList(newList)
//     }

//     const DeleteButton = index => (<UU5.Bricks.Button
//       style={{ padding: "4px", paddingTop: "1px" }}
//       variant="outline-danger"
//       onClick={() => DeleteItem(index)}>
//       {/* <Icon size={1} path={mdiPlaylistRemove} /> */}
//     </UU5.Bricks.Button>);
//     return (<>
//       <UU5.Bricks.Table>
//       <UU5.Bricks.Table.THead>
//     <UU5.Bricks.Table.UU5.Bricks.Table.Tr>
//       <UU5.Bricks.Table.Th content='Name' />
//       <UU5.Bricks.Table.Th content='' />
//       <UU5.Bricks.Table.Th content='' />
//     </UU5.Bricks.Table.UU5.Bricks.Table.Tr>
//   </UU5.Bricks.Table.THead>
//   <UU5.Bricks.Table.TBody>

//           {
//             list.map((item, index) => {
//               //format prep time
//               return {
//                 item: item, comp: (
//                   <UU5.Bricks.Table.Tr key={item.caption}>
//                     <UU5.Bricks.Table.Td>{editable ? <UU5.Forms.Select as="elementType" onChange={(event) => UpdateData(index, parseInt(event.target.value))}>
//                       <option value={item.userId}>{item.userName}</option>
//                       {userOptions}
//                     </UU5.Forms.Select> : item.userName}</UU5.Bricks.Table.Td>
//                     <UU5.Bricks.Table.Td>{extraButtonsCreator(item, editable, (params) =>
//                       UpdateData(index, params))}</UU5.Bricks.Table.Td>
//                     <UU5.Bricks.Table.Td>{editable && DeleteButton(index)}</UU5.Bricks.Table.Td>
//                   </UU5.Bricks.Table.Tr>
//                 )
//               };
//             }).filter(({ item, comp }) => item.delete !== true)
//               .map(({ item, comp }) => comp)}
//           {editable && showAddButton && (<UU5.Bricks.Table.UU5.Bricks.Table.Tr key="add">
//             <UU5.Bricks.Table.Td>
//               <UU5.Forms.Select as="elementType" value="-1" onChange={(event) => AddItem(parseInt(event.target.value))}>
//                 <option value="-1">Přidat uživatele</option>
//                 {userOptions}
//               </UU5.Forms.Select>
//             </UU5.Bricks.Table.Td>
//             <UU5.Bricks.Table.Td></UU5.Bricks.Table.Td>
//             <UU5.Bricks.Table.Td></UU5.Bricks.Table.Td>
//             </UU5.Bricks.Table.UU5.Bricks.Table.Tr>)}
//           </UU5.Bricks.Table.TBody>

//       </UU5.Bricks.Table>
//     </>
//     );
//   }
// })


// export default AddableListWithSet;
