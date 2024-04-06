// // import './App.css';
// import { Utils, createVisualComponent, PropTypes, useScreenSize, useState, useEffect, useMemo } from "uu5g05";
// import "uu5g04-forms";
// import "uu5g04-bricks";
// import UU5 from "uu5g04";
// import AddableListWithSet from './AddableListWithSet.js';

// function ManagementModal(props) {
//   const { OpenManagementCallback, ownerFK, listName, updataManagementData, memberList } = props;

//   const [userList, setUserList] = useState([]);
//   const [managementData, setManagementData] = useState({ listName, memberList });


//   ///DEBUD use this to change if you are owner
//   const currentUserId = 1




//   const { isOwner, nonOwnerUsers } = useMemo(() => {
//     if (ownerFK) {
//       return { isOwner: ownerFK === currentUserId, nonOwnerUsers: userList?.data?.userList?.filter(user => user.userId !== ownerFK) ?? [] }
//     }
//     else {
//       return { isOwner: false, nonOwnerUsers: [] }
//     }
//   }, [userList, currentUserId, ownerFK])

//   useEffect(() => {
//     setManagementData({ listName, memberList })
//   }, [listName, memberList])


//   useEffect(() => {
//     if (false) { //code for creation
//       setUserList({
//         state: "success",
//         data: {
//           name: "",
//           description: "",
//           portionAmount: 1,
//           preparationTime: 1,
//           favorite: false,
//           imageUrl: "",
//           ingredients: []
//         }
//       });
//     }
//     else {
//       //no BE exist at this time
//       // fetch(`https://uucoffeeapi.hudatec.cz/api/recipes/` + id, {
//       //   method: "GET",
//       // }).then(async (response) => {
//       //   const responseJson = await response.json();
//       //   if (response.status >= 400) {
//       //     setDetailCall({ state: "error", error: responseJson });
//       //   } else {
//       //     setDetailCall({ state: "success", data: responseJson });
//       //   }
//       // })
//       setUserList({
//         state: "success",
//         data: {
//           userList: [
//             {
//               userId: 1,
//               userName: "Dave"
//             },
//             {
//               userId: 2,
//               userName: "Bob"
//             },
//             {
//               userId: 3,
//               userName: "Steve"
//             }
//           ]
//         }
//       })
//     };
//   }, []); // an empty condition field means that the code will run only once

//   const handleClose = () => OpenManagementCallback.setter(false);

//   const updateItemList = (newItemList) => {
//     updataManagementData({ listName: managementData.listName, memberList: newItemList })

//   }

//   return (
//     <>
//       <UU5.Bricks.Modal ref_={modal => Page.modal = modal} show={OpenManagementCallback.value} onHide={() => { setManagementData({ listName, memberList }); handleClose() }}>

//       {isOwner ?
//         <UU5.Forms.Control
//           style={{ width: 300, height: 30 }}
//           type="textarea"
//           defaultValue={managementData.listName}
//           onChange={(event) => setManagementData({ ...managementData, listName: event.target.value })}
//         /> : managementData.listName}
//       <br />
//       {isOwner ?
//         <>
//           <UU5.Bricks.Button variant="primary" onClick={() => { }}>
//             Delete List (Nen implementovno)
//           </UU5.Bricks.Button>
//           <UU5.Bricks.Button variant="primary" onClick={() => { }}>
//             Archive List (Nen implementovno)
//           </UU5.Bricks.Button>
//         </>
//         :
//         <UU5.Bricks.Button variant="primary" onClick={() => updataManagementData({ listName: managementData.listName, memberList: managementData.memberList.filter(item => item.userId !== currentUserId) })}>
//           Leave List
//         </UU5.Bricks.Button>
//       }
//       <AddableListWithSet
//         userList={nonOwnerUsers}
//         itemList={memberList}
//         UpdateCallback={{ value: undefined, setter: handleClose }} // moved to list to prevent issue with text fields
//         StartEditingCallback={{ value: true, setter: handleClose }}
//         showAddButton={isOwner}
//         editable={isOwner}
//         extraButtonsCreator={() => { }}
//         updateItemListCallback={updateItemList}
//         itemCreatorFunction={() => { return { caption: "newItem", done: false } }}
//       />
//       <UU5.Bricks.Button variant="secondary" onClick={() => { setManagementData({ listName, memberList }); handleClose() }}>
//         Close
//       </UU5.Bricks.Button>
//     </UU5.Bricks.Modal >
//     </>
//   );
// }

// export default ManagementModal;
