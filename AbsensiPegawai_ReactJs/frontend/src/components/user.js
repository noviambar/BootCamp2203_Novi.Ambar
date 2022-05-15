import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Form,
  Container,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

function User(props) {
  const [tanggal] = useState(new Date());
  const [user_id, setUserId] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [ket, setKet] = useState("");
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);
  const [image, setImage] = useState();
  const [filename, setFileName] = useState();
  const [disable, setDisable] = useState(0);
  let Navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleTimeIn = () => {
    let user_id = props.id;
    let date = tanggal.toLocaleDateString();
    let time = tanggal.toLocaleTimeString();
    let ket = "Time In";
    axios
      .post("http://localhost:3001/TimeIn", {
        user_id: user_id,
        date: date,
        time: time,
        ket: ket,
      })
      .then((user) => {
        console.log(user);
        setMsg(user.data.msg);
        Navigate("/Dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTimeOut = () => {
    let user_id = props.id;
    let date = tanggal.toLocaleDateString();
    let time = tanggal.toLocaleTimeString();
    let ket = "Time Out";
    axios
      .post("http://localhost:3001/TimeOut", {
        user_id: user_id,
        date: date,
        time: time,
        ket: ket,
      })
      .then((user) => {
        console.log(user);
        setMsg(user.data.msg);
        Navigate("/Dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [formContact, setFormContact] = useState({
    username: "",
    name: "",
    email: "",
    mobile: "",
    position: "",
    address: "",
    image: "",
  });

  const handleView = (id) => {
    let data = [...users];
    let checkData = data.find((contact) => contact.id === id);
    setFormContact({
      name: checkData.name,
      email: checkData.email,
      mobile: checkData.mobile,
      position: checkData.position,
      address: checkData.address,
    });
    Navigate(`/Detail/${id}`);
  };

  return (
    <div>
      <Container style={{ margin: "10px" }}>
        <Row>
          <Card style={{ width: "65rem" }}>
            <Card.Body>
              <Row>
                <Col>
                  <Image
                    src={props.image}
                    alt="image"
                    shape="rounded"
                    style={{ width: "150px" }}
                  ></Image>
                  <Card.Title>{props.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {props.position}
                  </Card.Subtitle>
                  <Button
                    variant="success"
                    onClick={() => handleView(props.id)}
                  >
                    Detail
                  </Button>
                </Col>
                <Col>
                  <Form onSubmit={handleTimeIn}>
                    <h5>{msg}</h5>
                    <Form.Control
                      type="hidden"
                      id="user_id"
                      name="user_id"
                      value={props.id}
                      onChange={(e) => setUserId(e.target.value)}
                    ></Form.Control>
                    <Form.Label htmlFor="dates">Date</Form.Label>
                    <Form.Control
                      typeof="date"
                      id="date"
                      name="date"
                      value={tanggal.toLocaleDateString()}
                      onChange={(e) => setDate(e.target.value)}
                    ></Form.Control>
                    <Form.Label htmlFor="date">Time</Form.Label>
                    <Form.Control
                      typeof="time"
                      id="time"
                      name="time"
                      value={tanggal.toLocaleTimeString()}
                      onChange={(e) => setTime(e.target.value)}
                    ></Form.Control>
                    <Form.Control
                      type="hidden"
                      id="ket"
                      name="ket"
                      value={"Time In"}
                      onChange={(e) => setKet(e.target.value)}
                    ></Form.Control>
                    <br />
                    <Button
                      variant="primary"
                      // onClick={handleTimeIn}
                      onClick={() => {
                        handleTimeIn();
                        setDisable(1);
                      }}
                      style={{ margin: "5px" }}
                      disable={1}
                      disabled={disable !== 0}
                    >
                      Time In
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleTimeOut();
                        setDisable(false);
                      }}
                      disable={2}
                      disabled={disable !== 1}
                    >
                      Time Out
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default User;
