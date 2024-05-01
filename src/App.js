import { Outlet, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, createContext } from "react";
import { UserSelector, USERS } from "./helpers/user.js";
import { useUser } from "./helpers/UserContext.js"
import { useMode } from "./helpers/ModeContext.js"
import { useLang } from "./helpers/LangContext.js"

function App() {
  let navigate = useNavigate();
  const { setUser, currentUser } = useUser();
  const { getModeSelector, getMsi } = useMode();
  const { getLangSelector } = useLang();

  const userPos = USERS.map((user, index) => { return { ...user, index } }).filter(user => user.id === currentUser.id).index;


  return (
    <div className={styles.App}>
      <Navbar
        fixed="top"
        expand={"sm"}
        className="mb-3"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          <div class="AppDave">
            <Navbar.Brand onClick={() => navigate("/")}>
              UUShopList
            </Navbar.Brand>
          </div>
        </Container>
        {getModeSelector(getMsi("selector"))}
        {getLangSelector(getMsi("selector"))}
        <UserSelector className={getMsi("selector")} userId={userPos} users={USERS} onChange={(e) => {
          setUser(USERS.filter(({ id }) => id === parseInt(e.target.value))[0])
        }
        } />
      </Navbar>
      <Outlet />
    </div>);
}

export default App;
