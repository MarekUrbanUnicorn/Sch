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
import { useEffect, useState } from "react";

function App() {
  let navigate = useNavigate();

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
            UUCofee
          </Navbar.Brand>
    </div>
        </Container>
      </Navbar>
      <Outlet />
    </div>);
}

export default App;
