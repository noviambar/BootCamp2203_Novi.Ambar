import { Card, Row, Container, Image, Table } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Absensi(props) {
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
            <tr key={props.id}>
              <td>{props + 1}</td>
              <td>{props.name}</td>
              <td>{props.date}</td>
              <td>{props.ket}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default Absensi;
