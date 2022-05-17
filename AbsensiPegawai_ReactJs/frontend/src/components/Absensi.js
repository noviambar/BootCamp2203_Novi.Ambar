import { Card, Row, Container, Image, Table } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

function Absensi() {
  var [date] = useState(new Date());
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = () => {
    axios.get("http://localhost:3001/Absensi/" + id).then((res) => {
      setUsers(res.data);
    });
  };
  return (
    <div>
      <Container>
        <Row>
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
              {users.map((user, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>{moment(user.date).format("DD/MM/YYYY")}</td>
                    <td>{user.time}</td>
                    <td>{user.ket}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
}

export default Absensi;
