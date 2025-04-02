import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  RiUserSettingsFill,
  RiUser3Line,
  RiFileHistoryFill,
  RiLogoutCircleRLine,
} from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getCompanyName } from "../../utils/stringFunctions";

export default function TopNavigation({ setToken }) {
  const navigate = useNavigate();
  const { logout, auth } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">GRUPO AVANT</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#" onClick={() => navigate("/")}>
              Busqueda Artículos
            </Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Nav>
              <span style={{ color: "rgba(255,255,255,0.7)", marginTop: 10 }}>
                {getCompanyName(auth.userData.companyDB)}
              </span>
              <NavDropdown
                title={<RiUserSettingsFill size={20} />}
                id="navbarScrollingDropdown"
                drop="start"
                //
              >
                <NavDropdown.Item onClick={() => navigate("/account")}>
                  <ItemContainer color={"#073276"}>
                    <RiUser3Line />{" "}
                    <span
                      style={{
                        paddingLeft: 10,
                      }}
                    >
                      Cuenta
                    </span>
                  </ItemContainer>
                </NavDropdown.Item>

                {auth.userData?.UserName == "manager" && (
                  <NavDropdown.Item onClick={() => navigate("/history")}>
                    <ItemContainer>
                      <RiFileHistoryFill color="#898121" />

                      <span
                        style={{
                          paddingLeft: 10,
                        }}
                      >
                        Historial
                      </span>
                    </ItemContainer>
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="#"
                  onClick={() => {
                    navigate("/");
                    logout();
                    setToken("");
                  }}
                >
                  <ItemContainer>
                    <RiLogoutCircleRLine color="#b25353" />
                    <span
                      style={{
                        paddingLeft: 10,
                        fontWeight: 500,
                      }}
                    >
                      Cerrar Sesión
                    </span>
                  </ItemContainer>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function ItemContainer(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {props.children}
    </div>
  );
}
