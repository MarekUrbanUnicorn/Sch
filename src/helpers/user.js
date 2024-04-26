
const USERS = [
  { id: 234, name: "Amelia" },
  { id: 123, name: "James" },
  { id: 345, name: "John" },
  { id: 456, name: "Chloe" }
];


function UserSelector(props) {
  return <select value={props.userId} onChange={props.onChange}>
    {props.users.map(({ id, name }) => (
      <option key={id} value={id}>{name}</option>
    ))}
  </select>
}


/*
* Usage:
* ------
* <UserProvider>
*   ...
*     <UserSelector />
*   ...
*     <SomeComponent />
* </UserProvider>
*
* function SomeComponent() {
*   const user = useUser();
*   return ...;
* }
* */
export { UserSelector, USERS }
export default UserSelector ;
