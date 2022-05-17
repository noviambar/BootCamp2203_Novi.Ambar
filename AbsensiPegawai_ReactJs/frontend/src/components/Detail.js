import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Image } from "react-bootstrap";
import { Container, Row, Table, Card, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Absensi from "./Absensi";

function Detail() {
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
    <div>
      <Navbar />
      {users.map((user, i) => {
        return (
          <Container style={{ marginTop: "15px" }} key={i}>
            <Row>
              <Col>
                <Card style={{ width: "25rem" }}>
                  <Card.Body>
                    <Image
                      src={`http://localhost:3001/singleImage/${user.image}`}
                      alt="image"
                      thumbnail
                      style={{ width: "150px" }}
                    ></Image>
                    <hr />
                    <Card.Text style={{ textAlign: "center" }}>
                      {user.username}
                    </Card.Text>
                    <hr />
                    <Card.Text style={{ textAlign: "center" }}>
                      {user.position}
                    </Card.Text>
                    <hr />
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={{ width: "30rem" }}>
                  <Card.Body>
                    <Row>
                      <Col xs={6} md={4}>
                        <h5>Full Name : </h5>
                      </Col>
                      <Col xs={12} md={8}>
                        <p>{user.name}</p>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col xs={6} md={4}>
                        <h5>Email : </h5>
                      </Col>
                      <Col xs={12} md={8}>
                        <p>{user.email}</p>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col xs={6} md={4}>
                        <h5>Mobile : </h5>
                      </Col>
                      <Col xs={12} md={8}>
                        <p>{user.mobile}</p>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col xs={6} md={4}>
                        <h5>Address : </h5>
                      </Col>
                      <Col xs={12} md={8}>
                        <p>{user.address}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <br />
            <h1>Detail Absensi</h1>
            <Absensi />
          </Container>
        );
      })}
    </div>
  );
}

export default Detail;
