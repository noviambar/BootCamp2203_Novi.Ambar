import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Image } from "react-bootstrap";
import { Container, Row, Table, Card, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

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
          <Container style={{ margin: "10px" }} key={user.id}>
            <Row>
              <Col>
                <Card style={{ width: "25rem" }} key={user.id}>
                  <Card.Body>
                    <Image
                      src="{image}"
                      alt="image"
                      shape="rounded"
                      style={{ width: "150px" }}
                    ></Image>
                    <hr />
                    <Card.Text style={{ textAlign: "center" }}>
                      {user.name}
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
                <Card style={{ width: "30rem" }} key={user.id}>
                  <Card.Body>
                    <Row>
                      <Col xs={6} md={4}>
                        <h5>Full Name : </h5>
                      </Col>
                      <Col xs={12} md={8}>
                        <h5>{user.name}</h5>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col xs={6} md={4}>
                        <h5>Email : </h5>
                      </Col>
                      <Col xs={12} md={8}>
                        <h5>{user.email}</h5>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col xs={6} md={4}>
                        <h5>Mobile : </h5>
                      </Col>
                      <Col xs={12} md={8}>
                        <h5>{user.mobile}</h5>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col xs={6} md={4}>
                        <h5>Address : </h5>
                      </Col>
                      <Col xs={12} md={8}>
                        <h5>{user.address}</h5>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <br />
            <h1>Detail Absensi</h1>
            <Table striped bordered hover style={{ margin: "20px" }}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Ket</th>
                </tr>
              </thead>
              <tbody>
                <tr key={user.id}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.date}</td>
                  <td>{user.ket}</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        );
      })}
    </div>
  );
}

export default Detail;
