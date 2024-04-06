// // import Icon from "@mdi/react";
// // import { mdiPlaylistRemove } from "@mdi/js";
// // import './App.css';
// import { Utils, createVisualComponent, PropTypes, useScreenSize, useState, useEffect, useMemo } from "uu5g05";
// import "uu5g04-forms";
// import "uu5g04-bricks";
// import UU5 from "uu5g04";

// const AddableList = createVisualComponent({
//   render(props) {
//     const {
//       itemList,
//       showAddButton,
//       editable,
//       extraButtonsCreator,
//       updateItemListCallback,
//       itemCreatorFunction,
//       StartEditingCallback,
//       UpdateCallback,
//     } = props;

//     const [list, setList] = useState([]);

//     useEffect(() => {
//       setList([...itemList]);
//     }, [itemList]);
//     const finnishUpdate = () => {
//       updateItemListCallback(list);
//       UpdateCallback.setter();
//     };
//     const ChanageEditable = () => {
//       if (editable) {
//         setList([...itemList]);
//       }
//       StartEditingCallback.setter();
//     };
//     const UpdateData = (index, data) => {
//       const newList = [...list];
//       newList[index] = data;
//       setList(newList);
//     };
//     const AddItem = () => {
//       const newList = [...list];
//       newList.push(itemCreatorFunction());
//       setList(newList);
//     };

//     const DeleteItem = (index) => {
//       const newList = [...list];
//       newList[index] = { ...newList[index], delete: true };
//       setList(newList);
//     };

//     const DeleteButton = (index) => (
//       <UU5.Bricks.Button style={{ padding: "4px", paddingTop: "1px" }} variant="outline-danger" onClick={() => DeleteItem(index)}>
//         {/* <Icon size={1} path={mdiPlaylistRemove} /> */}
//       </UU5.Bricks.Button>
//     );
//     return (
//       <>
//         <UU5.Bricks.Button onClick={ChanageEditable}>{StartEditingCallback.value ? "Cancel Edits" : "Edit List"}</UU5.Bricks.Button>
//         {StartEditingCallback.value && <UU5.Bricks.Button onClick={finnishUpdate}>Save Chenges</UU5.Bricks.Button>}
//         <UU5.Bricks.Table  header='Table' footer='Table footer'>
//           <UU5.Bricks.Table.THead>
//             <UU5.Bricks.Table.UU5.Bricks.Table.Tr>
//               <UU5.Bricks.Table.Th content='Name' />
//               <UU5.Bricks.Table.Th content='' />
//               <UU5.Bricks.Table.Th content='' />
//             </UU5.Bricks.Table.UU5.Bricks.Table.Tr>
//           </UU5.Bricks.Table.THead>
//           <UU5.Bricks.Table.TBody>
//             {list
//               .map((item, index) => {
//                 //format prep time
//                 return {
//                   item: item,
//                   comp: (
//                     <UU5.Bricks.Table.Tr key={item.caption}>
//                       <UU5.Bricks.Table.Td content=
//                         {editable ? (
//                           <UU5.Forms.Control //THIS IS GARBAGE THAT KEEPS LOOSING FOCUS AFTER SINGLE likely cause; update data upadtes state outside compomennt causing rerender
//                             style={{ width: 100, height: 30 }}
//                             type="textarea"
//                             defaultValue={item.caption}
//                             onChange={(event) => UpdateData(index, { ...item, caption: event.target.value })}
//                           />
//                         ) : (
//                           item.caption
//                         )}
//                       />
//                       <UU5.Bricks.Table.Td content={extraButtonsCreator(item, editable, (params) => UpdateData(index, params))} />
//                       <UU5.Bricks.Table.Td content={editable && DeleteButton(index)} />
//                     </UU5.Bricks.Table.Tr>
//                   ),
//                 };
//               })
//               .filter(({ item, comp }) => item.delete !== true)
//               .map(({ item, comp }) => comp)}
//             {editable && showAddButton && (
//               <UU5.Bricks.Table.Tr key="add">
//                 <UU5.Bricks.Table.Td content={<UU5.Bricks.Button style={{ padding: "4px", paddingTop: "1px" }} variant="outline" onClick={() => AddItem()}>
//                   Add Item
//                 </UU5.Bricks.Button>} />
//                 <UU5.Bricks.Table.Td />
//                 <UU5.Bricks.Table.Td />
//               </UU5.Bricks.Table.Tr>
//             )}
//           </UU5.Bricks.Table.TBody>
//         </UU5.Bricks.Table>
//       </>
//     );
//   },
// });

// export default AddableList;
