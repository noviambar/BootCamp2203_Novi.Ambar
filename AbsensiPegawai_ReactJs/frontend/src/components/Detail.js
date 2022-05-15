import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Image } from "react-bootstrap";
import { Container, Row, Table, Card, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { moment } from "moment";

function Detail() {
  const [users, setUsers] = useState([0]);
  const { id } = useParams();

  useEffect(() => {
    getDetail();
  }, [0]);

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
            <Table striped bordered hover style={{ margin: "20px" }}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Ket</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.date}</td>
                  <td>{user.time}</td>
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
