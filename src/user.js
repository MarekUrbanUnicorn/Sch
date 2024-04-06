
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

export default UserSelector ;
