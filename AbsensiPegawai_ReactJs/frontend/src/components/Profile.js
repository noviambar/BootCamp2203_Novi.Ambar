import { Container, Row, Table, Card, Col, Image } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile(props) {
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = () => {
    axios.get("http://localhost:3001/Detail/" + id).then((res) => {
      setUsers(res.data);
    });
  };
  return (
    <Container>
      <Row>
        <Card style={{ width: "25rem" }} key={props.id}>
          <Card.Body>
            <Image
              src="{user.image}"
              alt="image"
              shape="rounded"
              style={{ width: "150px" }}
            ></Image>
            <hr />
            <Card.Text style={{ textAlign: "center" }}>{props.name}</Card.Text>
            <hr />
            <Card.Text style={{ textAlign: "center" }}>
              {props.position}
            </Card.Text>
            <hr />
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default Profile;
