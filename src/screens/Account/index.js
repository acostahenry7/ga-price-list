import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import "./Account.css";
import { RiUser2Fill } from "react-icons/ri";

import useAuth from "../../hooks/useAuth";

export default function Account() {
  const [isLoaded, setIsLoaded] = useState(false);

  const { auth } = useAuth();

  setTimeout(() => {
    setIsLoaded(true);
  }, 1000);

  return (
    <div className="container pt-3 account-container">
      {isLoaded ? (
        <Card style={{ width: "18rem" }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}

          <Card.Body>
            <RiUser2Fill size={40} />
            <Card.Title style={{ fontSize: 14, marginTop: 15 }}>
              {auth?.userData.UserName}
            </Card.Title>
            <Card.Text>
              <div>
                <p className="section-title">email</p>
                {auth?.userData.eMail || "sap@grupoavant.com.do"}
              </div>
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
      ) : (
        <Card style={{ width: "18rem" }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
              <Placeholder xs={8} />
            </Placeholder>
            {/* <Placeholder.Button variant="primary" xs={6} /> */}
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
